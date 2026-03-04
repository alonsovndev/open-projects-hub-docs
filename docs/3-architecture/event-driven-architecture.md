# Event-Driven Architecture Patterns

| Attribute        | Value                           |
| ---------------- | ------------------------------- |
| **Project**      | Open Freelancer Project Hub     |
| **Version**      | 1.0                             |
| **Status**       | Accepted (Incremental Adoption) |
| **Last Updated** | 2026-02-28                      |

## Scope and Adoption Strategy

Event-driven architecture is **not required as a full platform style for MVP**.  
It is adopted incrementally for workflows that need asynchronous reliability, decoupling, or eventual consistency.

Primary initial use cases:

- post-approval requirement processing,
- export generation and notifications,
- long-running AI refinement enrichment tasks.

## Fundamentals

- **Event**: immutable fact (`RequirementApproved`, `ExportRequested`).
- **Producer**: module that emits an event after state change.
- **Consumer**: module/service that reacts to event.
- **Broker**: transport layer for decoupled asynchronous delivery.
- **Schema**: versioned event contract with metadata (`event_id`, `occurred_at`, `version`, `correlation_id`).

Reference flow: [`diagrams/event-driven-flow.mmd`](./diagrams/event-driven-flow.mmd)

## Outbox Pattern (Required for Reliable Publishing)

Use Outbox for any business event emitted from transactional writes.

Why:

- prevents dual-write inconsistency,
- guarantees at-least-once event delivery,
- supports safe retries and replay.

Operational model:

1. Domain write and outbox record are committed in one database transaction.
2. Outbox publisher polls pending records.
3. Publisher sends events to broker and marks records as published.
4. Consumers process idempotently.

Reference diagram: [`diagrams/outbox-pattern.mmd`](./diagrams/outbox-pattern.mmd)

## Saga Pattern (Conditional)

Use saga only when a workflow spans multiple services and cannot be handled in one local transaction.

- **Choreography**: services react to each other's events.
- **Orchestration**: central coordinator controls state transitions.
- **Compensations**: explicit rollback actions for failed steps.

MVP guidance:

- prefer local transactions inside modular monolith modules,
- introduce saga during/after service extraction when distributed consistency is required.

Reference diagram: [`diagrams/saga-pattern.mmd`](./diagrams/saga-pattern.mmd)

## Event Sourcing and CQRS (Selective, Not Default)

Use only where audit/history replay and temporal reconstruction provide clear value.

- **Event Sourcing**: events become source of truth.
- **CQRS**: separate command write model and read projections.

Current recommendation:

- keep CRUD + audit metadata for MVP,
- adopt event-sourced aggregate(s) only for bounded contexts that need replayability and timeline reconstruction.

Reference diagram: [`diagrams/event-sourcing-flow.mmd`](./diagrams/event-sourcing-flow.mmd)

## Message Broker Selection

**Selected initial broker: Redis Streams** (aligned with existing optional Redis footprint).

Rationale:

- sufficient throughput for MVP and Phase 1 async workloads,
- lower operational overhead than Kafka for current team size,
- straightforward consumer group model and retry handling.

Re-evaluate to Kafka when:

- event volume and retention requirements increase significantly,
- multiple independent services require high-scale replay and partitioned throughput.

## Pattern Implementation Guidelines

1. **Event contract versioning**
   - add `event_version` and maintain backward-compatible payload evolution.
2. **Idempotency**
   - consumers must deduplicate by `event_id`.
3. **Ordering**
   - preserve per-aggregate ordering key where required.
4. **Error handling**
   - retries with exponential backoff; dead-letter handling for poison messages.
5. **Observability**
   - track publish failures, consumer lag, retry count, dead-letter rate.
6. **Security**
   - avoid sensitive payloads; send references/IDs and fetch secure data on read side.

## MVP Fit and Evolution

- Keeps MVP implementation simple while avoiding future dead ends.
- Introduces only patterns with immediate business value (Outbox first).
- Preserves path to distributed workflows as architecture evolves to selective microservices.

## Related ADRs

- [ADR-010: Event-Driven Architecture](./adrs/adr-010-event-driven-architecture.md)
- [ADR-011: Message Broker Selection](./adrs/adr-011-message-broker.md)

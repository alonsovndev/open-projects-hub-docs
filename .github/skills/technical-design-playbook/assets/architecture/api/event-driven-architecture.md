# Event-Driven Architecture Patterns Template (AI-Ready)

| Attribute        | Value                                       |
| ---------------- | ------------------------------------------- |
| **Project**      | [Project Name]                              |
| **Version**      | [vX.Y]                                      |
| **Status**       | [Draft \| Accepted \| Incremental Adoption] |
| **Last Updated** | [YYYY-MM-DD]                                |

## How to Use (AI Agent Instructions)

- Use this document to define which async patterns apply and under what conditions.
- Start with Outbox if any business event must be reliably published from a transactional write.
- Add Saga only when flows span independent service boundaries.
- Link to ADRs for broker selection and any pattern adoption decisions.

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [API Design Standards](./api-design-standards.md)

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

**Selected initial broker: [Broker Name, e.g., Redis Streams / RabbitMQ / Kafka]**

Rationale:

- [Reason 1: throughput fit]
- [Reason 2: operational overhead vs team size]
- [Reason 3: retry/consumer model]

Re-evaluate when:

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

- Keeps initial implementation simple while avoiding future architectural dead ends.
- Introduces only patterns with immediate business value (start with Outbox).
- Preserves path to distributed workflows as architecture evolves.

## Related ADRs

- [ADR: Event-Driven Architecture](../adrs/adr-template.md) — replace with actual ADR link
- [ADR: Message Broker Selection](../adrs/adr-template.md) — replace with actual ADR link

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

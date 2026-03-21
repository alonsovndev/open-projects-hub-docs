# ADR-011: Message Broker Selection (Redis Streams)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The architecture requires a low-overhead broker for initial asynchronous workflows while preserving a migration path to higher-throughput event infrastructure if scale grows.

## Decision

Select **Redis Streams** as the initial message broker for event-driven workflows, with explicit re-evaluation criteria for Kafka adoption at higher scale.

## Consequences

### Positive

- Low operational overhead for MVP and Phase 1.
- Fits existing Redis usage plans (cache + async workloads).
- Supports consumer groups and practical retry patterns.

### Negative

- Weaker long-term event-retention/replay ergonomics than Kafka.
- May require migration for high-throughput multi-service event ecosystems.

## Alternatives Considered

1. **Apache Kafka**
   - Considered for high-throughput and replay-first architecture.
   - Not selected due to operational complexity and over-capacity for MVP demand.
2. **No broker (DB polling only)**
   - Considered for minimal infrastructure.
   - Not selected because brokered async processing provides cleaner decoupling and consumer scalability.

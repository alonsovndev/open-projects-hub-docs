# ADR-011: Message Broker Selection (Redis Streams)

- **Status**: Rejected (Out of Scope)
- **Date**: 2026-02-28
- **Updated**: 2026-03-24

## Context

A dedicated message broker was previously considered for asynchronous event workflows.

## Decision

Do **not** include a message broker in current project scope.

All MVP workflows are documented as synchronous API and database interactions.

## Consequences

### Positive

- Removes broker operations and consumer management complexity.
- Reduces infrastructure cost and platform surface area.

### Negative

- Asynchronous decoupling patterns are deferred.
- High-throughput event use cases require future re-evaluation.

## Alternatives Considered

1. **Redis Streams broker**
   - Considered as low-overhead broker option.
   - Not selected because broker functionality is out of scope.
2. **Apache Kafka**
   - Considered for high-throughput event architecture.
   - Not selected due to significant operational overhead for MVP.

# ADR-010: Event-Driven Architecture (Incremental Adoption)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

Some workflows (exports, long-running AI processing, cross-module notifications) require asynchronous processing and decoupled reaction patterns, but full event-driven architecture is unnecessary for MVP.

## Decision

Adopt event-driven patterns incrementally:

- Outbox pattern for reliable event publishing from transactional writes,
- asynchronous consumers for non-blocking workflows,
- saga/event sourcing/CQRS only when distributed complexity and audit needs justify them.

## Consequences

### Positive

- Improves reliability for async workflows without over-complicating MVP.
- Reduces coupling between modules and future services.
- Keeps synchronous core flows simple while enabling gradual scaling.

### Negative

- Introduces eventual consistency in selected workflows.
- Requires idempotency, retries, and dead-letter operational discipline.

## Alternatives Considered

1. **Synchronous-only integration**
   - Considered for implementation simplicity.
   - Not selected because it increases coupling and latency for long-running tasks.
2. **Full event-driven platform from day one**
   - Considered for long-term consistency.
   - Not selected because it adds unnecessary complexity for MVP constraints.

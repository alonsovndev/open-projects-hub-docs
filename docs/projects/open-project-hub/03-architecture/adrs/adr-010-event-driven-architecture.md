# ADR-010: Event-Driven Architecture (Incremental Adoption)

- **Status**: Rejected (Out of Scope)
- **Date**: 2026-02-28
- **Updated**: 2026-03-24

## Context

Event-driven patterns were previously evaluated for async workflow reliability and future service extraction.

## Decision

Do **not** include event-driven architecture patterns in the current project scope.

The project will use synchronous request/response workflows for MVP and near-term phases.

## Consequences

### Positive

- Reduces implementation and operational complexity.
- Keeps architecture easier to reason about for a small team.

### Negative

- Long-running tasks may require simpler synchronous/background alternatives.
- Event-driven capabilities may need a new ADR if scale requirements change.

## Alternatives Considered

1. **Incremental event-driven adoption**
   - Considered for future decoupling and async reliability.
   - Not selected because it exceeds current scope.
2. **Full event-driven platform from day one**
   - Considered for long-term architecture consistency.
   - Not selected due to significant overhead for MVP.

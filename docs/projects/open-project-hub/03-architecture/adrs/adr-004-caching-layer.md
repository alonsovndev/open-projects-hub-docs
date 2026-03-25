# ADR-004: Caching Layer (Redis)

- **Status**: Rejected (Out of Scope)
- **Date**: 2026-02-28
- **Updated**: 2026-03-24

## Context

Caching with Redis was previously considered to improve repeated-read latency and reduce database pressure.

## Decision

Do **not** include a dedicated caching layer in current project scope.

The project will run without Redis and will rely on:

- PostgreSQL query/index optimization,
- efficient pagination and payload shaping,
- synchronous API workflows.

## Consequences

### Positive

- Reduces infrastructure and operational complexity for MVP.
- Avoids cache invalidation/consistency failure modes.
- Keeps delivery focused on core product workflows.

### Negative

- Less headroom for burst read optimization.
- Future scaling may require revisiting this decision.

## Alternatives Considered

1. **Redis cache in MVP**
   - Considered for performance headroom.
   - Not selected because it adds avoidable complexity for current scope.
2. **Memcached**
   - Considered as a simpler cache option.
   - Not selected because caching itself is out of scope.

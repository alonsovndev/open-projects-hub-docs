# ADR-004: Caching Layer (Redis)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

NFR targets require low-latency reads and protection of database resources under repeated query and authentication patterns.

## Decision

Adopt **Redis 7.x** for cache and ephemeral state use cases (hot reads, rate-limit counters, short-lived workflow data).

## Consequences

### Positive

- Improves response time on repeated queries.
- Reduces database pressure for burst traffic.
- Enables future lightweight async patterns via Redis Streams.

### Negative

- Cache invalidation and consistency logic adds complexity.
- Additional managed service cost and monitoring requirements.

## Alternatives Considered

1. **No cache in MVP**
   - Considered for simplicity.
   - Not selected because performance headroom and abuse protection would be limited.
2. **Memcached**
   - Considered for pure caching simplicity.
   - Not selected due to weaker support for stream/event and richer data structures.

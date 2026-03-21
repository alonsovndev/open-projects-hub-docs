# ADR-007: ORM Choice (SQLAlchemy)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

Backend persistence must support repository abstractions, transactional consistency, and complex relational queries while staying aligned with Python ecosystem tooling.

## Decision

Adopt **SQLAlchemy 2.x** as ORM/data-mapping technology in infrastructure layer, with domain-level repository interfaces remaining framework-agnostic.

## Consequences

### Positive

- Mature ORM with broad PostgreSQL support.
- Supports Clean Architecture separation through repository implementations.
- Enables explicit transaction management for critical workflows.

### Negative

- ORM abstractions can hide inefficient queries without monitoring.
- Team must maintain disciplined mapping and session patterns.

## Alternatives Considered

1. **Django ORM**
   - Considered for developer productivity.
   - Not selected due to tighter coupling to Django framework stack.
2. **Raw SQL + query builder only**
   - Considered for performance control.
   - Not selected due to higher implementation and maintenance overhead for MVP.

# ADR-009: Architecture Style (Modular Monolith First)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The MVP must be delivered by a small team within 1 to 1.5 months while supporting clear domain boundaries, security controls, and a future scaling path.

## Decision

Adopt a **Modular Monolith** backend architecture (with separated frontend deployment), enforcing bounded-context modules and Clean Architecture boundaries from day one.

## Consequences

### Positive

- Faster MVP delivery with lower operational complexity.
- Strong internal module boundaries support maintainability.
- Clear path to selective service extraction when needed.

### Negative

- Single deployable can become a bottleneck if module boundaries erode.
- Requires architectural governance to avoid tight coupling across modules.

## Alternatives Considered

1. **Layered monolith**
   - Considered for simplicity and speed.
   - Not selected because long-term domain boundary protection is weaker.
2. **Microservices from day one**
   - Considered for independent scaling.
   - Not selected due to higher DevOps/coordination overhead for MVP scope and team size.

# ADR-001: High-Level Architecture Pattern

- **Status**: Accepted
- **Date**: 2026-02-28

> **Amended by [ADR-020](./adr-020-client-review-by-access-code.md) (2026-10-02):** the `viewer` role mentioned here was removed; roles are `admin` and `member`, and clients review a project through its access code.

## Context

The project requires an architecture that supports:

- AI-assisted requirement refinement workflows,
- strict role-based access control for Admin and Viewer,
- maintainable boundaries for a small team delivering an MVP in 1 to 1.5 months,
- future growth without premature distributed-system complexity.

The team has explicit expertise in Clean Architecture and Domain-Driven Design, and requirements call for clear frontend/backend separation for scalability and maintainability.

## Decision

Adopt a **Modular Monolith backend with Clean Architecture and DDD**, paired with a **separate frontend project**.

- Backend modules are aligned to bounded contexts and interact through application-level contracts.
- Domain and application layers remain framework-agnostic.
- Infrastructure concerns (persistence, external integrations) are kept in outer layers.
- Frontend and backend are independently deployable projects to preserve separation of concerns and scaling flexibility.

## Consequences

### Positive

- Supports rapid MVP delivery with lower operational overhead than microservices.
- Preserves maintainability through explicit domain boundaries and dependency rules.
- Aligns with current team expertise, reducing delivery risk.
- Provides a pragmatic path to future service extraction if scale or domain complexity increases.

### Negative

- Requires active governance to prevent module coupling and architecture drift.
- Independent scaling at bounded-context level is more limited than full microservices.
- Future extraction to microservices still incurs migration and operational cost.

## Alternatives Considered

1. **Traditional Layered Monolith**
   - Considered for simplicity and speed.
   - Rejected due to higher long-term risk of coupling and weaker domain boundary enforcement.
2. **Microservices from Day One**
   - Considered for independent scaling and service isolation.
   - Rejected for MVP due to team size, delivery timeline, and higher operational complexity.

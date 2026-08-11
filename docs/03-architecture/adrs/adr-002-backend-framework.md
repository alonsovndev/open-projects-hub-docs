# ADR-002: Backend Framework (FastAPI)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The backend must deliver MVP scope quickly, support clear API contracts, and align with team expertise in Python while respecting Clean Architecture boundaries.

## Decision

Adopt **FastAPI** as the backend framework, using Python 3.12 and Pydantic-based schema validation.

## Consequences

### Positive

- Strong alignment with team skills and MVP timeline.
- Async request handling and generated OpenAPI contracts improve delivery speed.
- Fits Clean Architecture when framework dependencies are constrained to presentation/infrastructure.

### Negative

- Risk of framework leakage into domain/application layers if boundaries are not enforced.
- Async misuse can introduce subtle runtime issues.

## Alternatives Considered

1. **Express (Node.js)**
   - Considered for ecosystem breadth.
   - Not selected due to lower team backend expertise versus Python/FastAPI.
2. **Spring Boot (Java)**
   - Considered for mature enterprise patterns.
   - Not selected due to higher complexity and slower MVP delivery for current team profile.

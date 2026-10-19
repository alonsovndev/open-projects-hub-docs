# ADR-003: Frontend Framework (React + TypeScript)

- **Status**: Accepted
- **Date**: 2026-02-28

> **Amended by [ADR-020](./adr-020-client-review-by-access-code.md) (2026-10-02):** the `viewer` role mentioned here was removed; roles are `admin` and `member`, and clients review a project through its access code.

## Context

The frontend must provide responsive Admin and Viewer workflows with maintainable components and strong developer velocity.

## Decision

Adopt **React 18 + TypeScript 5** with **Ant Design** for UI and **Redux Toolkit** for state orchestration in multi-step planning flows.

## Consequences

### Positive

- Team expertise directly matches selected stack.
- Type-safe contracts reduce UI integration defects.
- Rich component ecosystem accelerates MVP UI delivery.

### Negative

- Added complexity in managing global state boundaries.
- Ant Design customization may require additional styling effort.

## Alternatives Considered

1. **Vue 3 + TypeScript**
   - Considered for approachable composition API.
   - Not selected due to lower team familiarity.
2. **Angular**
   - Considered for integrated enterprise tooling.
   - Not selected due to higher framework complexity for MVP scope.

# ADR-003: Frontend Framework (React + TypeScript)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The frontend must provide responsive Admin and Member workflows, and a read-only Client Review page, with maintainable components and strong developer velocity.

## Decision

Adopt **React 19 + TypeScript 5**, built with **Vite**, with **Ant Design v6** for UI and **Redux Toolkit (RTK Query)** for client state and server data in multi-step planning flows.

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

# ADR-010: Testing Framework Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

NFR-X03 sets a target of at least 70% automated coverage for core logic, with maintainable testing across backend and frontend workflows. Per [ADR-015](./adr-015-code-quality-tooling.md) the target is not a merge-blocking gate.

## Decision

Use **Pytest** for backend unit/integration testing, **Vitest + React Testing Library** for frontend unit/component testing, and **Playwright** for critical-path end-to-end tests.

CI runs the non-integration API tests and the web unit tests. API integration tests (which need PostgreSQL) and web Playwright tests run locally and are excluded from those CI jobs. See [verification boundaries](../00-context/evidence-and-limitations.md#verification-boundaries).

## Consequences

### Positive

- Balanced test pyramid across layers.
- Fast unit feedback plus high-confidence E2E validation.
- Good CI compatibility with GitHub Actions matrix jobs.

### Negative

- E2E suites can become flaky without controlled test data and fixtures.
- Multiple frameworks increase maintenance overhead.
- Integration and E2E suites do not gate merges, so regressions they would catch can reach `dev`.

## Alternatives Considered

1. **Backend-only automated testing**
   - Considered for reduced setup effort.
   - Not selected because UI regressions on critical workflows would be under-detected.
2. **Cypress instead of Playwright**
   - Considered as common E2E option.
   - Not selected because Playwright offers stronger multi-browser and parallelization capabilities for planned workflows.

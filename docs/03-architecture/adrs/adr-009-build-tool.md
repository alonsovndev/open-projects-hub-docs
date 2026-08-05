# ADR-008: Build Tooling (Vite + Docker)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The project needs fast local development loops and reproducible production artifacts for frontend and backend.

## Decision

Use **Vite** for frontend build/dev workflows and **Docker multi-stage builds** for backend packaging/deployment.

## Consequences

### Positive

- Faster frontend feedback loop and optimized bundles.
- Consistent backend runtime across development and Render deployments.
- Improves deployment predictability via immutable images.

### Negative

- Requires maintenance of Docker layering and image hardening practices.
- Build/toolchain upgrades need compatibility validation.

## Alternatives Considered

1. **Webpack for frontend**
   - Considered as widely adopted option.
   - Not selected because Vite offers faster default developer experience.
2. **No containerization for backend**
   - Considered for simpler initial setup.
   - Not selected because Render deployment model and environment parity favor Docker.

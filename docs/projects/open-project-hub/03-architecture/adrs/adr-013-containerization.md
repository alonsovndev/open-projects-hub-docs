# ADR-013: Containerization Approach for Render Services

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The backend must run reliably across development, staging, and production with minimal environment drift. The platform target for backend deployment is Render, which supports Docker-based workloads and rolling deployments.

## Decision

Use **Docker multi-stage builds** for backend API services, with:

- minimal runtime images,
- non-root runtime user,
- explicit health checks,
- immutable versioned images per release.

## Consequences

### Positive

- Strong environment parity across lifecycle stages.
- Predictable deployment artifacts for Render.
- Better security posture via image hardening and non-root execution.

### Negative

- Additional effort for Dockerfile maintenance and image optimization.
- Need governance for base image updates and vulnerability patch cadence.

## Alternatives Considered

1. **Direct runtime deployment without containers**
   - Considered for simplicity.
   - Not selected because environment drift risk is higher and portability is lower.
2. **Kubernetes-first orchestration**
   - Considered for advanced scaling/control.
   - Not selected because operational complexity is unnecessary for MVP scale.

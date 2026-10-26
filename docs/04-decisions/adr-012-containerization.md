# ADR-012: Containerization Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The backend must run reliably across development, CI and production with minimal environment drift. The deployed system is one EC2 host running Docker Compose ([ADR-021](./adr-021-low-cost-single-host-deployment.md)).

**Constraints:**

- Must run under Docker Compose on a single small host (1 GB of RAM)
- Must keep registry and hosting cost at $0
- Must ensure environment parity between local, CI and production
- Must support immutable deployments and rollback by redeploying a previous tag

**Requirements:**

- Reproducible builds across environments
- Security-hardened container runtime
- Health check integration for deployment validation
- Minimal image size for faster deployments
- Support for CI automation

## Decision

Package the API as a **Docker image** with the following characteristics:

- **Base image**: `python:3.12-slim` for minimal footprint
- **Security**: Non-root runtime user, minimal dependencies
- **Health checks**: `/health/live` and `/health/ready` endpoints, used by Docker health checks and the deploy script
- **Versioning**: Immutable images tagged with the release version (`vX.Y.Z`)
- **Registry**: Public GitHub Container Registry (`ghcr.io/alonsovndev/open-projects-hub-api:<tag>`), pushed by GitHub Actions on a release tag
- **Runtime**: Docker Compose on one EC2 host, with Caddy and PostgreSQL as sibling containers

## Consequences

### Positive

- Strong environment parity: development, CI, and production run the same image.
- Predictable deployment artifacts: immutable, tagged images eliminate environment drift.
- Better security posture: the slim base image reduces attack surface; the non-root user limits privilege escalation.
- Rollback is a redeploy of the previous tag.
- No registry cost: a public GHCR package needs no credentials on the host.
- Portability: the same Docker image works locally, in CI, and in production.

### Negative

- Build time overhead: Docker builds add 2-5 minutes to the CI pipeline (mitigated by layer caching).
- Image management burden: governance is needed for vulnerability scanning and base image updates.
- Local development complexity: developers must run Docker (Compose simplifies this).
- A deploy briefly restarts the API; there is no rolling update on a single host.
- A public image means the image contents are public; secrets must never be baked in.

## Alternatives Considered

### 1. AWS Lambda with Container Support

- Considered for the serverless cost model (pay-per-request pricing)
- Not selected because:
  - FastAPI is designed for long-running processes, not Lambda cold starts
  - Cold start latency (500ms-2s) impacts user experience for REST APIs
  - The API runs migrations at start and uses long-lived database connections, which fit a Lambda adapter poorly

### 2. Kubernetes on Amazon EKS

- Considered for advanced orchestration, multi-service deployments, fine-grained control
- Not selected because:
  - Operational complexity is unnecessary for MVP scale
  - The EKS control plane costs $75/month, which violates the $0 cost constraint
  - The team lacks Kubernetes expertise; the learning curve is too steep for the MVP timeline

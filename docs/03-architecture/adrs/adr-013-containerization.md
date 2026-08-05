# ADR-012: Containerization Strategy

**Status**: Accepted  
**Date**: 2026-02-28  
**Updated**: 2026-08-03 (AWS migration)

## Context

The backend must run reliably across development, staging, and production with minimal environment drift. The platform is deployed to AWS App Runner, which requires Docker-based workloads with auto-scaling and health check capabilities.

**Constraints:**

- Must support AWS App Runner deployment model
- Must work with Amazon ECR for image storage
- Must maintain $0 cost during MVP phase (use AWS Free Tier)
- Must ensure environment parity between dev and production
- Must support immutable deployments and rollback capability

**Requirements:**

- Reproducible builds across environments
- Security-hardened container runtime
- Health check integration for deployment validation
- Minimal image size for faster deployments
- Support for CI/CD automation

## Decision

Use **Docker multi-stage builds** with the following characteristics:

- **Base image**: `python:3.12-slim` for minimal footprint
- **Security**: Non-root runtime user, minimal dependencies
- **Health checks**: Explicit health check endpoint for App Runner validation
- **Versioning**: Immutable images tagged with Git commit SHA
- **Registry**: Amazon Elastic Container Registry (ECR) for image storage
- **Multi-stage**: Build dependencies in separate stage, copy only runtime artifacts

## Consequences

### Positive

- Strong environment parity — Docker ensures development, CI, and production environments are identical
- Predictable deployment artifacts — immutable images stored in ECR eliminate environment drift
- Better security posture — multi-stage builds reduce image size and attack surface; non-root user limits privilege escalation
- AWS App Runner native support — direct ECR integration with auto-deploy triggers
- Zero-downtime deployments — App Runner rolling updates ensure availability during deploys
- Health check integration — App Runner validates deployment success via health endpoint
- Image caching — ECR layer caching accelerates rebuilds (only changed layers re-uploaded)
- Portability — same Docker image works locally, in CI, and in production

### Negative

- Build time overhead — Docker builds add 2-5 minutes to CI/CD pipeline (mitigated by layer caching)
- Image management burden — need governance for image cleanup, vulnerability scanning, base image updates
- Local development complexity — developers must run Docker (docker-compose simplifies this)
- Storage costs — ECR images consume storage (~$0.10/GB/month after 12-month Free Tier: 500 MB)
- Operational learning curve — team must understand Docker concepts, debugging containerized apps

## Alternatives Considered

### 1. AWS Lambda with Container Support

- Considered for serverless cost model (pay-per-request pricing)
- Not selected because:
  - FastAPI designed for long-running processes, not Lambda cold starts
  - Cold start latency (500ms-2s) impacts user experience for REST APIs
  - API Gateway + Lambda integration more complex than App Runner for HTTP APIs
  - Free Tier better for App Runner (predictable costs vs. per-request)

### 2. Kubernetes on Amazon EKS\*\*

- Considered for advanced orchestration, multi-service deployments, fine-grained control
- Not selected because:
  - Operational complexity unnecessary for MVP scale
  - EKS control plane costs $75/month (not Free Tier eligible, violates $0 cost constraint)
  - App Runner provides sufficient container orchestration for single-service backend
  - Team lacks Kubernetes expertise; learning curve too steep for MVP timeline

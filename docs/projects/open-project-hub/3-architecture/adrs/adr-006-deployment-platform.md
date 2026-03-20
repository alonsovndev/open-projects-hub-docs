# ADR-006: Deployment Platform (Vercel + Render)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The project requires fast iteration, preview environments, and low-operations hosting for separate frontend and backend deployments.

## Decision

Deploy frontend on **Vercel** and backend containers on **Render**, with **GitHub Actions** orchestrating validation and environment promotion.

## Consequences

### Positive

- Excellent frontend DX with preview deployments and edge delivery.
- Docker-based backend deployment with autoscaling and health checks.
- Reduced infrastructure operations overhead for small team.

### Negative

- Multi-platform configuration governance is required.
- Less low-level infrastructure control than self-managed orchestration.

## Alternatives Considered

1. **Single provider (all services on one platform)**
   - Considered to reduce platform spread.
   - Not selected because selected split better matches frontend/backend hosting strengths.
2. **Kubernetes self-managed**
   - Considered for maximum control.
   - Not selected due to operational complexity and MVP timeline risk.

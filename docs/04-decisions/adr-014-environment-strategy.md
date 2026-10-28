# ADR-014: Environment Strategy

- **Status**: Accepted
- **Date**: 2026-08-03

## Context

The project requires an environment progression strategy that balances developer productivity, CI validation, and production stability while keeping infrastructure cost near zero during the MVP phase.

**Challenges:**

- The hosting budget allows only one cloud environment
- A small team (1-3 developers) needs simple, maintainable environment management
- No budget for dedicated staging infrastructure during MVP
- Production deployments must be validated first
- Local development must iterate quickly without cloud dependencies

**Constraints:**

- Cannot afford separate dev/staging/prod environments during MVP
- Must support CI validation before production deployment
- Must provide a realistic testing environment (database, API, frontend)
- Must enable offline local development

**Requirements:**

- Fast local development with hot reload
- Automated CI validation in an isolated environment
- A production environment serving real MVP users
- Clear deployment progression with quality gates
- Path to add staging when budget allows

## Decision

Adopt a **three-tier environment strategy** for the MVP phase:

**1. Local Environment**: developer workstations with Docker Compose

- Purpose: development, debugging, unit tests
- Infrastructure: Docker Compose on the developer machine
- Data: synthetic test data, isolated per developer
- Access: developers only
- Cost: $0 (runs on developer hardware)

**2. Container Environment**: the deployed image run outside production (CI and the `container` configuration)

- Purpose: build validation and pre-release smoke tests with the same Docker image that is deployed
- Infrastructure: GitHub Actions runners and Docker Compose with ephemeral containers
- Data: ephemeral test database destroyed after each run
- Access: CI pipeline and developers
- Cost: $0 (GitHub Actions free tier)

**3. Production Environment**: the only deployed cloud environment

- Purpose: MVP production serving real users
- Infrastructure: one EC2 host running Docker Compose behind Cloudflare ([ADR-021](./adr-021-low-cost-single-host-deployment.md), [ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md))
- Data: real user data
- Access: MVP users (a handful initially)

**Deployment Progression:**

```
Local Development → Container Tests (CI) → Production (EC2)
```

**Key Trade-off:**
No separate staging environment during MVP, to minimize cost and operational complexity. Container tests serve as the pre-production validation gate.

## Consequences

### Positive

- Cost-effective: a single cloud environment.
- Fast iteration: local and container environments don't require cloud resources or network latency.
- Realistic testing: container tests use the same Docker image as production, reducing environment drift.
- Clear progression: Local → CI → Production provides obvious quality gates.
- Low operational complexity: no multi-environment networking, data synchronization, or promotion workflows.
- Upgrade path: staging can be added later with the same Terraform modules.

### Negative

- Production risk: no staging buffer; bugs that pass CI reach real users immediately.
- Limited load testing: production-scale traffic cannot be simulated.
- Single point of failure: one host in one availability zone, with no backups ([ADR-021](./adr-021-low-cost-single-host-deployment.md)).
- Manual rollback: no blue/green deployment; rollback redeploys the previous image tag.
- Real user data lives in the only environment; no legal-compliance assessment has been performed.
- No preview environments: infrastructure changes cannot be tried in isolation before affecting production.

## Alternatives Considered

### 1. Four-Tier (Local / Dev / Staging / Prod)

- Considered for production safety with a dedicated staging validation layer
- Not selected because:
  - It doubles hosting cost beyond the budget
  - It adds operational complexity (environment promotion, data sync, network configuration)
  - It is overkill for a small team during the MVP phase
  - Container tests provide sufficient pre-production validation for MVP

### 2. Preview Environments per Pull Request (Vercel-style)

- Considered for a better PR review workflow with a live environment per branch
- Not selected because:
  - Ephemeral environments are not covered by the hosting budget
  - They add infrastructure complexity (Terraform workspace management, DNS routing)
  - Web preview deployments run on other origins and cannot sign in to the API (credentialed CORS allows only the production web origin)

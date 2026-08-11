# ADR-014: Environment Strategy

**Status**: Accepted  
**Date**: 2026-08-03

## Context

The project requires an environment progression strategy that balances developer productivity, CI validation, and production stability while maintaining $0 infrastructure cost during the MVP phase.

**Challenges:**

- AWS Free Tier limits the number of cloud environments economically viable
- Small team (1-3 developers) needs simple, maintainable environment management
- No budget for dedicated staging infrastructure during MVP
- Must prevent production deployments without validation
- Need fast local development iteration without cloud dependencies

**Constraints:**

- Must operate within AWS Free Tier ($0 target cost for 12 months)
- Cannot afford separate dev/staging/prod AWS environments during MVP
- Must support CI/CD validation before production deployment
- Must provide realistic testing environment (database, API, frontend)
- Must enable offline local development

**Requirements:**

- Fast local development with hot reload
- Automated CI validation in isolated environment
- Production environment serving real MVP users
- Clear deployment progression with quality gates
- Path to add staging when budget allows

## Decision

Adopt a **three-tier environment strategy** for the MVP phase:

**1. Local Environment** — Developer workstations with Docker Compose

- Purpose: Development, debugging, unit tests
- Infrastructure: Docker Compose on developer machine
- Data: Synthetic test data, isolated per developer
- Access: Developers only
- Cost: $0 (runs on developer hardware)

**2. Container Environment** — GitHub Actions CI pipeline

- Purpose: Automated integration tests, build validation
- Infrastructure: GitHub Actions runners with ephemeral Docker containers
- Data: Ephemeral test database destroyed after each run
- Access: CI pipeline only
- Cost: $0 (GitHub Actions free tier: 2,000 minutes/month)

**3. Dev Environment (serves as initial Production)** — AWS Free Tier

- Purpose: MVP production serving real users
- Infrastructure: AWS App Runner (backend), RDS PostgreSQL (database), S3 + CloudFront (frontend)
- Data: Real production data with GDPR-compliant handling
- Access: MVP users (~10-30 initially)
- Cost: $0 target (AWS Free Tier for 12 months)
- Availability Target: 99% uptime

**Deployment Progression:**

```
Local Development → Container Tests (CI) → Dev/Production (AWS)
```

**Key Trade-off:**  
No separate staging environment during MVP to minimize cost and operational complexity. Container tests serve as pre-production validation gate.

## Consequences

### Positive

- Cost-effective — single AWS environment stays within Free Tier ($0 for 12 months)
- Fast iteration — local and container environments don't require cloud resources or network latency
- Realistic testing — container tests use same Docker image as production, reducing environment drift
- Clear progression — Local → CI → Production provides obvious quality gates with automated checks
- Low operational complexity — no multi-environment networking, data synchronization, or promotion workflows
- Upgrade path — easy to add staging later; Terraform modules reusable across environments
- Developer productivity — Docker Compose enables offline development after initial setup
- Automated validation — GitHub Actions catches issues before production deployment

### Negative

- Production risk — no staging buffer; bugs that pass CI reach real users immediately
- Limited load testing — can't test production-scale traffic or multi-region failover scenarios
- Single point of failure — Single-AZ RDS has downtime risk during AWS maintenance or outages
- Manual rollback — no blue/green deployment initially; rollback requires redeploying previous image
- Data sensitivity — real user data in "Dev" environment requires GDPR-compliant handling from day one
- No preview environments — can't test infrastructure changes in isolation before affecting production
- Deployment confidence gap — moving from container tests directly to production lacks gradual rollout capability

## Alternatives Considered

### 1. Four-Tier (Local / Dev / Staging / Prod)

- Considered for production safety with dedicated staging validation layer
- Not selected because:
  - Doubles AWS costs beyond Free Tier (~$30-50/month for separate staging infrastructure)
  - Adds operational complexity (environment promotion, data sync, network configuration)
  - Overkill for small team (1-3 developers) during MVP phase
  - Can add staging later when team size and budget grow
  - Container tests provide sufficient pre-production validation for MVP

### 2. Preview Environments per Pull Request (Vercel-style)

- Considered for better PR review workflow with live environment per branch
- Not selected because:
  - AWS Free Tier doesn't cover ephemeral environments (CloudFront, App Runner costs per instance)
  - Estimated cost: $1-5/month per active PR (10 PRs = $10-50/month)
  - Adds infrastructure complexity (Terraform workspace management, DNS routing)
  - Can add post-MVP if budget allows and team size increases

# Architectural Decision Records (ADRs)

This folder contains the Architectural Decision Records (ADRs) for the Open Projects Hub. An ADR captures a significant architectural decision, the context that led to it, and the consequences.

## Reading historical decisions

An ADR records the decision at the time it was made. “Accepted” does not mean every original detail was implemented or remains current. Read amendments and partial supersession alongside the original rationale; use the [current architecture](../03-architecture/README.md) and [evidence page](../00-context/evidence-and-limitations.md) for the reviewed implementation. Costs, schedules, staffing assumptions, and compliance intentions in older records are historical planning statements, not current measurements or certifications.

## Decision Log

| ADR ID | Title | Status | Amended or superseded by |
|--------|-------|--------|--------------------------|
| [ADR-001](./adr-001-high-level-architecture.md) | High-Level Architecture Pattern (Modular Monolith) | Accepted; amended | [ADR-020](./adr-020-client-review-by-access-code.md) (roles) |
| [ADR-002](./adr-002-backend-framework.md) | Backend Framework (FastAPI) | Accepted | - |
| [ADR-003](./adr-003-frontend-framework.md) | Frontend Framework (React + TypeScript) | Accepted | [ADR-020](./adr-020-client-review-by-access-code.md) (roles); the app now runs React 19 |
| [ADR-004](./adr-004-database.md) | Database (PostgreSQL; RDS replaced by a container) | Accepted; amended | [ADR-021](./adr-021-low-cost-single-host-deployment.md) (runs as a container, not RDS) |
| [ADR-005](./adr-005-authentication.md) | Authentication and Authorization Strategy (Custom Auth + JWT) | Accepted; amended | [ADR-020](./adr-020-client-review-by-access-code.md) (roles) |
| [ADR-006](./adr-006-deployment-platform.md) | Deployment Platform (AWS) | Superseded in part | [ADR-021](./adr-021-low-cost-single-host-deployment.md), [ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md) |
| [ADR-007](./adr-007-orm-choice.md) | ORM Choice (SQLAlchemy) | Accepted | - |
| [ADR-008](./adr-008-build-tool.md) | Build Tooling (Vite + Docker) | Accepted | - |
| [ADR-009](./adr-009-monitoring-observability.md) | Monitoring and Observability (Sentry) | Accepted; amended | [ADR-021](./adr-021-low-cost-single-host-deployment.md) (CloudWatch dropped; Sentry only) |
| [ADR-010](./adr-010-testing-framework.md) | Testing Framework Strategy (Pytest, Vitest, Playwright) | Accepted | - |
| [ADR-011](./adr-011-secrets-management.md) | Secrets Management Strategy | Accepted | [ADR-021](./adr-021-low-cost-single-host-deployment.md) (SSM Parameter Store) |
| [ADR-012](./adr-012-containerization.md) | Containerization Strategy (Docker) | Accepted | [ADR-021](./adr-021-low-cost-single-host-deployment.md) (Docker Compose on EC2, not App Runner) |
| [ADR-013](./adr-013-infrastructure-as-code.md) | Infrastructure as Code Strategy (Terraform) | Accepted | [ADR-021](./adr-021-low-cost-single-host-deployment.md), [ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md) (resources actually managed) |
| [ADR-014](./adr-014-environment-strategy.md) | Environment Strategy (Local / Container / Dev) | Accepted | [ADR-021](./adr-021-low-cost-single-host-deployment.md) (one deployed environment) |
| [ADR-015](./adr-015-code-quality-tooling.md) | Code Quality Tooling Strategy | Accepted | - |
| [ADR-016](./adr-016-git-workflow-strategy.md) | Git Workflow and Branch Strategy | Accepted; deployment amended | [ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md); tag publication and manual deploy are separate |
| [ADR-017](./adr-017-database-migration-strategy.md) | Database Migration Strategy (Alembic) | Accepted | [ADR-021](./adr-021-low-cost-single-host-deployment.md) (database is not RDS) |
| [ADR-018](./adr-018-user-api-key-encryption.md) | User API Key Encryption at Rest | Accepted | - |
| [ADR-019](./adr-019-no-persisted-draft-stories.md) | Do Not Persist Draft Stories | Accepted | - |
| [ADR-020](./adr-020-client-review-by-access-code.md) | Client Review by Project Access Code (No Viewer Accounts) | Accepted | - |
| [ADR-021](./adr-021-low-cost-single-host-deployment.md) | Low-Cost Single-Host Deployment (EC2) | Accepted; entry point, account, region and deploy replaced | [ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md), [ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md) |
| [ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md) | Cloudflare Edge Instead of CloudFront | Accepted | - |
| [ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md) | Credits Account in us-east-2 and Manual Deploys (No GitHub OIDC) | Accepted | - |
| [ADR-024](./adr-024-email-delivery-with-resend.md) | Transactional Email with Resend (SMTP Relay) | Accepted | - |

## Creating a New ADR

Use the [ADR Template](./adr-template.md) for all new decisions.

## Related Documents

- [Architecture Overview](../03-architecture/)
- [Technology Stack](../03-architecture/core/technology-stack.md)

---

**Last Updated**: 2026-10-19

# Architectural Decision Records (ADRs)

This folder contains the Architectural Decision Records (ADRs) for the Open Projects Hub. An ADR captures a significant architectural decision, the context that led to it, and the consequences.

## Reading the decisions

Each ADR describes the decision as it stands for the reviewed system. “Accepted” means the decision is in force; the consequences list the known limits. Use the [current architecture](../03-architecture/README.md) and the [evidence page](../00-context/evidence-and-limitations.md) for what the reviewed implementation verifies. Cost figures are planning estimates, and compliance intentions are not certifications.

ADR numbers are stable identifiers; there is no ADR-006.

## Decision Log

| ADR ID | Title | Status |
|--------|-------|--------|
| [ADR-001](./adr-001-high-level-architecture.md) | High-Level Architecture Pattern (Modular Monolith) | Accepted |
| [ADR-002](./adr-002-backend-framework.md) | Backend Framework (FastAPI) | Accepted |
| [ADR-003](./adr-003-frontend-framework.md) | Frontend Framework (React + TypeScript) | Accepted |
| [ADR-004](./adr-004-database.md) | Database (PostgreSQL) | Accepted |
| [ADR-005](./adr-005-authentication.md) | Authentication and Authorization Strategy (Custom Auth + JWT) | Accepted |
| [ADR-007](./adr-007-orm-choice.md) | ORM Choice (SQLAlchemy) | Accepted |
| [ADR-008](./adr-008-build-tool.md) | Build Tooling (Vite + Docker) | Accepted |
| [ADR-009](./adr-009-monitoring-observability.md) | Monitoring and Observability (Sentry) | Accepted |
| [ADR-010](./adr-010-testing-framework.md) | Testing Framework Strategy (Pytest, Vitest, Playwright) | Accepted |
| [ADR-011](./adr-011-secrets-management.md) | Secrets Management Strategy | Accepted |
| [ADR-012](./adr-012-containerization.md) | Containerization Strategy (Docker) | Accepted |
| [ADR-013](./adr-013-infrastructure-as-code.md) | Infrastructure as Code Strategy (Terraform) | Accepted |
| [ADR-014](./adr-014-environment-strategy.md) | Environment Strategy (Local / Container / Production) | Accepted |
| [ADR-015](./adr-015-code-quality-tooling.md) | Code Quality Tooling Strategy | Accepted |
| [ADR-016](./adr-016-git-workflow-strategy.md) | Git Workflow and Branch Strategy | Accepted |
| [ADR-017](./adr-017-database-migration-strategy.md) | Database Migration Strategy (Alembic) | Accepted |
| [ADR-018](./adr-018-user-api-key-encryption.md) | User API Key Encryption at Rest | Accepted |
| [ADR-019](./adr-019-no-persisted-draft-stories.md) | Do Not Persist Draft Stories | Accepted |
| [ADR-020](./adr-020-client-review-by-access-code.md) | Client Review by Project Access Code (No Viewer Accounts) | Accepted |
| [ADR-021](./adr-021-low-cost-single-host-deployment.md) | Low-Cost Single-Host Deployment (EC2) | Accepted |
| [ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md) | Cloudflare Edge for the Web App and API | Accepted |
| [ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md) | Credits Account in us-east-2 and Manual Deploys (No GitHub OIDC) | Accepted |
| [ADR-024](./adr-024-email-delivery-with-resend.md) | Transactional Email with Resend (SMTP Relay) | Accepted |

## Creating a New ADR

Use the [ADR Template](./adr-template.md) for all new decisions.

## Related Documents

- [Architecture Overview](../03-architecture/)
- [Technology Stack](../03-architecture/core/technology-stack.md)

---

**Last Updated**: 2026-10-26

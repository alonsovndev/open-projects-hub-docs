# Architectural Decision Records (ADRs)

This directory contains the Architectural Decision Records (ADRs) for the Open Projects Hub. An ADR is a short document that captures a significant architectural decision, the context that led to it, and the consequences of the decision.

We use ADRs to document our architectural journey and to provide a clear rationale for our choices to current and future contributors.

## ADR Template

To create a new ADR, please use the provided template:

*   **[ADR Template](./adr-template.md)**

## Decision Log

The following architectural decisions have been recorded:

| ADR ID                                                       | Title                                                      |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| [ADR-001](./adr-001-high-level-architecture.md)              | High-Level Architecture Pattern (Modular Monolith)         |
| [ADR-002](./adr-002-backend-framework.md)                    | Backend Framework (FastAPI)                                |
| [ADR-003](./adr-003-frontend-framework.md)                   | Frontend Framework (React + TypeScript)                    |
| [ADR-004](./adr-004-database.md)                             | Database (Amazon RDS PostgreSQL)                           |
| [ADR-005](./adr-005-authentication.md)                       | Authentication and Authorization Strategy (Custom Auth + JWT) |
| [ADR-006](./adr-006-deployment-platform.md)                  | Deployment Platform (AWS)                                  |
| [ADR-007](./adr-007-orm-choice.md)                           | ORM Choice (SQLAlchemy)                                    |
| [ADR-008](./adr-008-build-tool.md)                           | Build Tooling (Vite + Docker)                              |
| [ADR-009](./adr-009-monitoring-observability.md)             | Monitoring and Observability (Sentry + CloudWatch)         |
| [ADR-010](./adr-010-testing-framework.md)                    | Testing Framework Strategy (Pytest, Vitest, Playwright)    |
| [ADR-011](./adr-011-secrets-management.md)                   | Secrets Management Strategy                                |
| [ADR-012](./adr-012-containerization.md)                     | Containerization Strategy (Docker)                         |
| [ADR-013](./adr-013-infrastructure-as-code.md)               | Infrastructure as Code Strategy (Terraform)                |
| [ADR-014](./adr-014-environment-strategy.md)                 | Environment Strategy (Local / Container / Dev)             |
| [ADR-015](./adr-015-code-quality-tooling.md)                 | Code Quality Tooling Strategy                              |
| [ADR-016](./adr-016-git-workflow-strategy.md)                | Git Workflow and Branch Strategy                           |
| [ADR-017](./adr-017-database-migration-strategy.md)          | Database Migration Strategy (Alembic)                      |

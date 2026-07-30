# Architectural Decision Records (ADRs)

This directory contains the Architectural Decision Records (ADRs) for the Open Freelancer Project Hub. An ADR is a short document that captures a significant architectural decision, the context that led to it, and the consequences of the decision.

We use ADRs to document our architectural journey and to provide a clear rationale for our choices to current and future contributors.

## ADR Template

To create a new ADR, please use the provided template:

*   **[ADR Template](./adr-template.md)**

## Decision Log

The following architectural decisions have been recorded:

| ADR ID                                                       | Title                                                      |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| [ADR-000](./adr-001-high-level-architecture.md)              | High-Level Architecture Pattern (Modular Monolith)         |
| [ADR-001](./adr-001-backend-framework.md)                    | Backend Framework (FastAPI)                                |
| [ADR-002](./adr-002-frontend-framework.md)                   | Frontend Framework (React + TypeScript)                    |
| [ADR-003](./adr-003-database.md)                             | Database (Supabase PostgreSQL)                             |
| [ADR-005](./adr-005-authentication.md)                       | Authentication and Authorization Strategy (JWT)            |
| [ADR-006](./adr-006-deployment-platform.md)                  | Deployment Platform (Vercel + Render)                      |
| [ADR-007](./adr-007-orm-choice.md)                           | ORM Choice (SQLAlchemy)                                    |
| [ADR-008](./adr-008-build-tool.md)                           | Build Tooling (Vite + Docker)                              |
| [ADR-009](./adr-009-architecture-style.md)                   | Architecture Style (Modular Monolith First)                |
| [ADR-009](./adr-009-testing-framework.md)                    | Testing Framework Strategy (Pytest, Vitest, Playwright)    |
| [ADR-010](./adr-010-monitoring-observability.md)             | Monitoring and Observability (Sentry)                      |
| [ADR-012](./adr-012-secrets-management.md)                   | Secrets Management Strategy                                |
| [ADR-013](./adr-013-containerization.md)                     | Containerization Approach for Render Services              |
| [ADR-014](./adr-014-infrastructure-as-code.md)               | Infrastructure as Code Strategy (Terraform)                |

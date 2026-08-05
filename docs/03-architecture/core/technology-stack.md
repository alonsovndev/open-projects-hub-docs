# Technology Stack

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Accepted                    |
| **Last Updated** | 2026-08-04                  |

## Sources

- [Project Overview](../../overview.md)
- [Functional Requirements](../../01-requirements/functional-requirements.md)
- [Non-Functional Requirements](../../01-requirements/non-functional-requirements.md)
- [Role Mapping](../../02-planning/role-mapping.md)
- [Phased Roadmap](../../02-planning/phased-roadmap.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [Architecture Styles Decision](./architecture-styles.md)

## Technology Stack Matrix

| Component                | Selected Technology                         | Version / Compatibility              | Role in System                                                 | Rationale                                                                                          | Trade-offs                                                               |
| ------------------------ | ------------------------------------------- | ------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Frontend Framework       | React + TypeScript                          | React 18.x, TypeScript 5.x           | Admin/Viewer UI, project and requirements workflows            | Aligns with team expertise and ecosystem maturity; strong component model for structured workflows | Requires disciplined state management and type hygiene as codebase grows |
| UI Library               | Ant Design                                  | 5.x                                  | Accessible, consistent UI components for fast MVP delivery     | Team familiarity and rapid UI assembly                                                             | Opinionated design system may require customization overhead             |
| Frontend State           | Redux Toolkit                               | 2.x                                  | Predictable state handling for refinement and approval flows   | Strong fit for explicit workflow states and multi-step UI flows                                    | Additional boilerplate versus local-only state                           |
| Backend Framework        | FastAPI (Python)                            | Python 3.12 + FastAPI 0.11x          | REST APIs, validation, domain orchestration entry points       | Team expertise, async support, OpenAPI generation, Clean Architecture compatibility                | Requires strict architectural boundaries to avoid framework leakage      |
| Data Validation          | Pydantic                                    | 2.x                                  | Request/response and application DTO validation                | Tight FastAPI integration and explicit schema contracts                                            | Version coupling with framework ecosystem                                |
| Database                 | Amazon RDS PostgreSQL                       | PostgreSQL 15+ (db.t3.micro)         | Primary transactional store for clients/projects/requirements  | ACID guarantees, relational integrity, mature SQL tooling, AWS Free Tier eligible (12 months)      | Requires relational schema evolution discipline; manual RLS implementation |
| ORM                      | SQLAlchemy                                  | 2.x                                  | Persistence abstraction in infrastructure layer                | Mature Python ORM, strong repository pattern support                                               | ORM complexity and potential query performance pitfalls if not monitored |
| Authentication           | Custom FastAPI Auth Module + JWT            | Python 3.12 + PyJWT/python-jose      | User identity, session lifecycle, role context via JWT tokens  | Full control over auth logic, AWS alignment, no per-user auth costs, Clean Architecture fit        | Implementation effort (~3-4 days); team owns security responsibility     |
| Authorization            | Backend role checks + PostgreSQL RLS        | PostgreSQL RLS policies              | Data-level least-privilege enforcement for Admin/Viewer        | Defense in depth: API-layer + data-layer authorization                                             | Policy complexity can increase with domain growth                        |
| Frontend Build Tool      | Vite                                        | 5.x                                  | Fast local build/dev and optimized production bundles          | Fast feedback loops and modern React/TS defaults                                                   | Plugin compatibility management                                          |
| Backend Tooling          | Docker (multi-stage) + Uvicorn workers      | Docker 25.x                          | Reproducible backend packaging for AWS App Runner deployments  | Environment parity and predictable deploy artifacts                                                | Requires image hardening and resource tuning                             |
| Testing (Backend)        | Pytest                                      | 8.x                                  | Unit/integration tests for domain and application behavior     | Python ecosystem standard; strong fixtures/mocking                                                 | Requires disciplined test pyramid design                                 |
| Testing (Frontend)       | Vitest + React Testing Library + Playwright | Vitest 2.x, RTL 16.x, Playwright 1.x | Component tests, interaction tests, E2E critical-path coverage | Fast unit/integration loop plus realistic E2E regression checks                                    | E2E tests can be slower/flakier without stable fixtures                  |
| Monitoring/Observability | Sentry Free + AWS CloudWatch Free Tier      | Sentry Developer Plan + CloudWatch   | Error tracking, performance monitoring, infrastructure metrics | $0/month hybrid strategy: Sentry for app errors/APM, CloudWatch for AWS infrastructure metrics     | Two tools to learn; event limit management required                      |
| CI/CD                    | GitHub Actions                              | Hosted runners + workflow matrix     | Automated quality gates and environment deployments            | Native GitHub integration and flexible pipelines                                                   | Workflow sprawl risk without governance                                  |
| Frontend Hosting         | Amazon S3 + CloudFront                      | S3 static site + CloudFront CDN      | Global edge delivery, HTTPS via ACM, static asset hosting      | AWS Free Tier eligible (12 months), global CDN performance, seamless AWS integration               | No automatic PR previews; requires cache invalidation strategy           |
| Backend Hosting          | AWS App Runner                              | Container service with auto-scaling  | FastAPI container hosting with health checks and auto-scaling  | Docker-native deployment, AWS Free Tier eligible, low operational overhead, zero-downtime deploys   | Less control than ECS Fargate; fewer infra customization options         |

## Integration Guidelines

1. **S3 + CloudFront frontend → App Runner backend**
   - HTTPS-only REST communication.
   - CORS allowlist limited to trusted frontend CloudFront distribution.
   - JWT bearer token propagated on authenticated routes.
2. **App Runner backend → Amazon RDS PostgreSQL**
   - SQLAlchemy used only in infrastructure layer.
   - Connection pooling (5-10 connections for MVP) and query timeouts required for predictable latency.
   - Database migrations must be backward compatible for rolling deploys.
   - VPC connector enables private network access to RDS from App Runner.
3. **Authentication and authorization**
   - Custom FastAPI auth module handles user registration, login, and JWT token issuance.
   - Backend validates JWT claims and enforces role permissions (Admin/Viewer).
   - PostgreSQL RLS policies enforce least privilege at data-access layer.
4. **Observability and release traceability**
   - Sentry SDKs enabled in frontend and backend for error tracking and APM.
   - CloudWatch monitors AWS infrastructure metrics (App Runner, RDS, S3, CloudFront).
   - GitHub Actions publishes release metadata for deploy-to-error correlation.
   - Combined monitoring maintains $0/month cost within free tiers.
5. **Scaling path**
   - Prioritize query optimization, indexing, and payload shaping before adding new infrastructure.
   - Re-evaluate advanced distributed patterns only when sustained load requires them.

## Scalability and Performance Alignment

- **Horizontal scaling:** Stateless backend services on AWS App Runner with externalized state (RDS PostgreSQL).
- **Performance targets:** Index project and story query surfaces, optimize SQL/query patterns, and monitor p95 latency.
- **MVP load fit:** Stack supports NFR-005 and NFR-006 targets for project/story limits with AWS Free Tier managed services.
- **Evolution path:** Architecture preserves migration path from modular monolith to selective service extraction.

## ADR Index

- [ADR-001: High-Level Architecture Pattern](../adrs/adr-001-high-level-architecture.md)
- [ADR-002: Backend Framework (FastAPI)](../adrs/adr-002-backend-framework.md)
- [ADR-003: Frontend Framework (React + TypeScript)](../adrs/adr-003-frontend-framework.md)
- [ADR-004: Database (Amazon RDS PostgreSQL)](../adrs/adr-004-database.md)
- [ADR-005: Authentication and Authorization (Custom FastAPI Auth + JWT)](../adrs/adr-005-authentication.md)
- [ADR-006: Deployment Platform (AWS)](../adrs/adr-006-deployment-platform.md)
- [ADR-007: ORM Choice (SQLAlchemy)](../adrs/adr-007-orm-choice.md)
- [ADR-008: Build Tooling (Vite + Docker)](../adrs/adr-008-build-tool.md)
- [ADR-009: Monitoring and Observability (Sentry + CloudWatch)](../adrs/adr-009-monitoring-observability.md)
- [ADR-010: Testing Framework Strategy](../adrs/adr-010-testing-framework.md)
- [ADR-011: Secrets Management Strategy](../adrs/adr-011-secrets-management.md)
- [ADR-012: Containerization Strategy](../adrs/adr-012-containerization.md)
- [ADR-013: Infrastructure as Code (Terraform)](../adrs/adr-013-infrastructure-as-code.md)
- [ADR-014: Environment Strategy](../adrs/adr-014-environment-strategy.md)
- [ADR-015: Code Quality Tooling](../adrs/adr-015-code-quality-tooling.md)
- [ADR-016: Git Workflow Strategy](../adrs/adr-016-git-workflow-strategy.md)

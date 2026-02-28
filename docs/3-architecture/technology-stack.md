# Technology Stack

| Attribute | Value |
| --- | --- |
| **Project** | Open Freelancer Project Hub |
| **Version** | 1.0 |
| **Status** | Draft |
| **Last Updated** | 2026-02-28 |

## Sources

- [Project Overview](../overview.md)
- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Role Mapping](../2-planning/role-mapping.md)
- [Phased Roadmap](../2-planning/phased-roadmap.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [Architecture Styles Decision](./architecture-styles.md)
- [Event-Driven Architecture Patterns](./event-driven-architecture.md)

## Technology Stack Matrix

| Component | Selected Technology | Version / Compatibility | Role in System | Rationale | Trade-offs |
| --- | --- | --- | --- | --- | --- |
| Frontend Framework | React + TypeScript | React 18.x, TypeScript 5.x | Admin/Viewer UI, project and requirements workflows | Aligns with team expertise and ecosystem maturity; strong component model for structured workflows | Requires disciplined state management and type hygiene as codebase grows |
| UI Library | Ant Design | 5.x | Accessible, consistent UI components for fast MVP delivery | Team familiarity and rapid UI assembly | Opinionated design system may require customization overhead |
| Frontend State | Redux Toolkit | 2.x | Predictable state handling for refinement and approval flows | Strong fit for explicit workflow states and async orchestration | Additional boilerplate versus local-only state |
| Backend Framework | FastAPI (Python) | Python 3.12 + FastAPI 0.11x | REST APIs, validation, domain orchestration entry points | Team expertise, async support, OpenAPI generation, Clean Architecture compatibility | Requires strict architectural boundaries to avoid framework leakage |
| Data Validation | Pydantic | 2.x | Request/response and application DTO validation | Tight FastAPI integration and explicit schema contracts | Version coupling with framework ecosystem |
| Database | Supabase PostgreSQL | PostgreSQL 15+ (managed by Supabase) | Primary transactional store for clients/projects/requirements | ACID guarantees, relational integrity, mature SQL tooling, managed operations | Requires relational schema evolution discipline |
| ORM | SQLAlchemy | 2.x | Persistence abstraction in infrastructure layer | Mature Python ORM, strong repository pattern support | ORM complexity and potential query performance pitfalls if not monitored |
| Authentication | Supabase Auth + JWT | Supabase managed auth + JWT claims | User identity, session lifecycle, role context | Built-in auth flows and token model reduce implementation risk | External managed dependency; requires clear token validation boundaries |
| Authorization | Supabase RLS + backend role checks | PostgreSQL RLS policies | Data-level least-privilege enforcement for Admin/Viewer | Enforces security close to data and complements API-layer checks | Policy complexity can increase with domain growth |
| Caching Layer | Redis (Render-managed or external) | Redis 7.x | Cache hot reads, rate-limit counters, ephemeral workflow states | Improves latency for frequent reads and protects database under load | Adds operational complexity and cache invalidation concerns |
| Message Broker (Optional) | Redis Streams | Redis 7.x | Async events for AI/refinement pipeline expansion | Reuses Redis footprint for moderate event throughput | Not ideal for very high-throughput/event-replay-heavy workloads |
| Frontend Build Tool | Vite | 5.x | Fast local build/dev and optimized production bundles | Fast feedback loops and modern React/TS defaults | Plugin compatibility management |
| Backend Tooling | Docker (multi-stage) + Uvicorn workers | Docker 25.x | Reproducible backend packaging for Render deployments | Environment parity and predictable deploy artifacts | Requires image hardening and resource tuning |
| Testing (Backend) | Pytest | 8.x | Unit/integration tests for domain and application behavior | Python ecosystem standard; strong fixtures/mocking | Requires disciplined test pyramid design |
| Testing (Frontend) | Vitest + React Testing Library + Playwright | Vitest 2.x, RTL 16.x, Playwright 1.x | Component tests, interaction tests, E2E critical-path coverage | Fast unit/integration loop plus realistic E2E regression checks | E2E tests can be slower/flakier without stable fixtures |
| Monitoring/Observability | Sentry | SaaS (latest SDKs) | Error tracking, performance monitoring, release correlation | Unified visibility across frontend/backend and release health | Requires careful PII scrubbing and alert tuning |
| CI/CD | GitHub Actions | Hosted runners + workflow matrix | Automated quality gates and environment deployments | Native GitHub integration and flexible pipelines | Workflow sprawl risk without governance |
| Frontend Hosting | Vercel | Managed platform | Global edge delivery, preview deployments, web vitals | Strong DX and low-ops frontend hosting | Vendor lock-in considerations |
| Backend Hosting | Render | Managed container platform | API/container hosting with autoscaling and health checks | Good fit for Dockerized FastAPI backend with low operational burden | Fewer deep infra controls than self-managed Kubernetes |

## Integration Guidelines

1. **Vercel frontend → Render backend**
   - HTTPS-only REST communication.
   - CORS allowlist limited to trusted frontend domains.
   - JWT bearer token propagated on authenticated routes.
2. **Render backend → Supabase PostgreSQL**
   - SQLAlchemy used only in infrastructure layer.
   - Connection pooling and query timeouts required for predictable latency.
   - Database migrations must be backward compatible for rolling deploys.
3. **Authentication and authorization**
   - Supabase Auth handles identity and token issuance.
   - Backend validates JWT claims and enforces role permissions.
   - Supabase RLS policies enforce least privilege at data-access layer.
4. **Observability and release traceability**
   - Sentry SDKs enabled in frontend and backend.
   - GitHub Actions publishes release metadata for deploy-to-error correlation.
5. **Async and scaling path**
   - Introduce Redis cache for high-read and rate-limit paths.
   - Use Redis Streams for moderate async workloads before evaluating Kafka-scale needs.

## Scalability and Performance Alignment

- **Horizontal scaling:** Stateless backend services on Render with externalized state (PostgreSQL/Redis).
- **Performance targets:** Cache frequent read paths, index project and story query surfaces, and monitor p95 latency.
- **MVP load fit:** Stack supports NFR-005 and NFR-006 targets for project/story limits with managed services.
- **Evolution path:** Architecture preserves migration path from modular monolith to selective service extraction.

## ADR Index

- [ADR-000: High-Level Architecture Pattern](./adrs/adr-001-high-level-architecture.md)
- [ADR-001: Backend Framework (FastAPI)](./adrs/adr-001-backend-framework.md)
- [ADR-002: Frontend Framework (React + TypeScript)](./adrs/adr-002-frontend-framework.md)
- [ADR-003: Database (Supabase PostgreSQL)](./adrs/adr-003-database.md)
- [ADR-004: Caching Layer (Redis)](./adrs/adr-004-caching-layer.md)
- [ADR-005: Authentication and Authorization](./adrs/adr-005-authentication.md)
- [ADR-006: Deployment Platform (Vercel + Render)](./adrs/adr-006-deployment-platform.md)
- [ADR-007: ORM Choice (SQLAlchemy)](./adrs/adr-007-orm-choice.md)
- [ADR-008: Build Tooling (Vite + Docker)](./adrs/adr-008-build-tool.md)
- [ADR-009: Testing Framework Strategy](./adrs/adr-009-testing-framework.md)
- [ADR-010: Monitoring and Observability (Sentry)](./adrs/adr-010-monitoring-observability.md)
- [ADR-009: Architecture Style (Modular Monolith First)](./adrs/adr-009-architecture-style.md)
- [ADR-010: Event-Driven Architecture (Incremental Adoption)](./adrs/adr-010-event-driven-architecture.md)
- [ADR-011: Message Broker Selection (Redis Streams)](./adrs/adr-011-message-broker.md)
- [ADR-012: Secrets Management Strategy](./adrs/adr-012-secrets-management.md)

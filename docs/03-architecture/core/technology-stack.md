---
sidebar_position: 3
---

# Technology Stack

| Attribute   | Value             |
| ----------- | ----------------- |
| **Project** | Open Projects Hub |
| **Version** | 1.1               |
| **Status**  | Accepted          |

## Overview

This document defines the technology choices for the Open Projects Hub, organized by system layer. Each technology selection aligns with MVP delivery constraints, team expertise, and Clean Architecture principles.

## Technology Stack Matrix

| Component              | Selected Technology                  | Description                                                                                |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Frontend**           |                                      |                                                                                            |
| Framework              | React 19 + TypeScript 5              | Component-based UI framework with type safety for freelancer and client-review workflows   |
| UI Library             | Ant Design v6                        | Accessible, production-ready component library for rapid MVP delivery                      |
| State Management       | Redux Toolkit + RTK Query            | Predictable state container and server-state cache for refinement and approval flows       |
| Build Tool             | Vite 7                               | Fast development server and optimized production builds                                    |
| Testing                | Vitest + React Testing Library       | Unit and component testing with fast feedback loops                                        |
| E2E Testing            | Playwright                           | End-to-end testing for critical user workflows                                             |
| **Backend**            |                                      |                                                                                            |
| Framework              | FastAPI (Python 3.12), Gunicorn + Uvicorn workers | Modern async framework with OpenAPI generation and Clean Architecture compatibility        |
| Data Validation        | Pydantic                             | Request/response validation with strong typing                                             |
| ORM                    | SQLAlchemy                           | Persistence layer abstraction in infrastructure layer following repository pattern         |
| Testing                | Pytest                               | Unit and integration testing with fixtures and mocking support                             |
| Containerization       | Docker (multi-stage)                 | Multi-stage builds for reproducible deployments                                            |
| **Authentication**     |                                      |                                                                                            |
| Auth Module            | Custom FastAPI + JWT                 | Internal bounded context handling user identity, login, and token issuance                 |
| Password Hashing       | bcrypt                               | Secure password storage with industry-standard hashing                                     |
| Token Management       | PyJWT                                | JWT generation and validation for stateless authentication                                 |
| Authorization          | Backend role checks + workspace-scoped queries | API-layer role validation; every repository query is filtered by the caller's workspace |
| **Data & Storage**     |                                      |                                                                                            |
| Database               | PostgreSQL 15 (container)            | Relational database with ACID guarantees, run by Docker Compose on the API host with data on an EBS volume ([ADR-021](../../04-decisions/adr-021-low-cost-single-host-deployment.md)) |
| Migrations             | Alembic                              | Versioned schema migrations, applied when the API container starts                         |
| File Storage           | None                                 | Markdown exports are generated on request; nothing is stored as a file                     |
| **Infrastructure**     |                                      |                                                                                            |
| Frontend Hosting       | Cloudflare Workers (static assets)   | Global edge hosting of the Vite build, HTTPS and DNS by Cloudflare ([ADR-022](../../04-decisions/adr-022-cloudflare-edge-instead-of-cloudfront.md)) |
| Backend Hosting        | AWS EC2 `t3.micro` + Docker Compose  | One host runs Caddy, the API and PostgreSQL; Cloudflare proxies `api-oph.alonsovndev.com` to it |
| Networking             | Cloudflare proxy + Security Group    | Port 443 is open only to Cloudflare IPv4 ranges; Caddy routes only `/v1/*`                 |
| Secrets                | AWS SSM Parameter Store              | SecureString parameters read by the deploy script ([ADR-011](../../04-decisions/adr-011-secrets-management.md)) |
| Email                  | Resend (SMTP relay)                  | Verification and password-reset codes ([ADR-024](../../04-decisions/adr-024-email-delivery-with-resend.md)) |
| IaC                    | Terraform                            | EC2, Elastic IP, security group, SSM, budgets and the Cloudflare DNS record ([ADR-013](../../04-decisions/adr-013-infrastructure-as-code.md)) |
| **Observability**      |                                      |                                                                                            |
| Application Monitoring | Sentry SDKs (API and web) | Error reporting and sampled traces, active in production through the runtime (API) and build-time (web) DSN |
| Health and Logs        | `/health/live`, `/health/ready`, container logs | Host-local health checks and `docker compose logs`; no CloudWatch alarms are deployed |
| **CI/CD**              |                                      |                                                                                            |
| Pipeline               | GitHub Actions                       | Tests and quality gates on pull requests; on a `vX.Y.Z` tag it builds and pushes the API image |
| Container Registry     | GitHub Container Registry (GHCR)     | `ghcr.io/alonsovndev/open-projects-hub-api:<tag>`                                           |
| Deploy                 | `scripts/deploy-release.sh` + SSM    | Manual deploy with operator AWS credentials ([ADR-023](../../04-decisions/adr-023-credits-account-us-east-2-manual-deploy.md)) |

## Key Integration Patterns

### Frontend ↔ Backend Communication

- **Protocol:** HTTPS REST APIs with JWT bearer authentication
- **CORS:** the API allowlists `https://oph.alonsovndev.com` with credentials; the refresh cookie is `HttpOnly; Secure; SameSite=Lax` and scoped to `/v1/auth`
- **State sync:** Frontend Redux state synchronized with backend via RTK Query

### Backend ↔ Database

- **Access pattern:** SQLAlchemy repository implementations in infrastructure layer
- **Connection pooling:** SQLAlchemy pooling; effective pool settings depend on the application configuration
- **Network security:** the database is a container reachable only on the host's Compose network; it publishes no port
- **Migration strategy:** Alembic migrations applied at container start; the deploy briefly restarts the single API container

### Authentication Flow

1. User submits credentials to `/v1/auth/login`
2. Auth module validates credentials and issues a 15-minute access token (JSON) and a refresh token (HttpOnly cookie)
3. Frontend keeps the access token in memory and sends it in the Authorization header
4. Backend middleware validates JWT on protected routes
5. Repositories filter every query by the caller's workspace

### Observability Strategy

- **Application layer:** Sentry captures API errors in production
- **Host layer:** health endpoints and container logs; two AWS Budgets alert on cost
- **Cost:** the original estimate was about $12.85/month; current prices, usage, and credits are unverified. See [Deployment Architecture](../ops/deployment-architecture.md)

## Scalability & Performance Strategy

- **Scaling:** one host with no autoscaling; the design is sized for a handful of users and the backend is stateless apart from the database
- **Database optimization:** indexes support project/story queries; no p95 latency measurement or dashboard is established by this review
- **MVP capacity:** NFR-X05/NFR-X06 are evaluation targets; the workspace limit of three active projects is enforced, but host capacity has not been benchmarked
- **Evolution readiness:** Module boundaries enable selective service extraction when growth demands it
- **Performance-first:** Optimize queries and payloads before adding infrastructure complexity

## Source References

- [Architecture Solution Design](./architecture-solution-design.md) - High-level system design and component interaction
- [Architecture Styles](./architecture-styles.md) - Modular monolith rationale and evolution strategy
- [Architecture Decision Records](../../04-decisions/README.md) - Detailed rationale for each technology choice

---

**Last Updated**: 2026-10-19

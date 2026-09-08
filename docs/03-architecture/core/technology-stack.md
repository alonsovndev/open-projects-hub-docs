# Technology Stack

| Attribute   | Value             |
| ----------- | ----------------- |
| **Project** | Open Projects Hub |
| **Version** | 1.0               |
| **Status**  | Accepted          |

## Overview

This document defines the technology choices for the Open Projects Hub, organized by system layer. Each technology selection aligns with MVP delivery constraints, team expertise, and Clean Architecture principles.

## Technology Stack Matrix

| Component              | Selected Technology                  | Description                                                                                |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Frontend**           |                                      |                                                                                            |
| Framework              | React + TypeScript                   | Component-based UI framework with type safety for Admin/Viewer workflows                   |
| UI Library             | Ant Design                           | Accessible, production-ready component library for rapid MVP delivery                      |
| State Management       | Redux Toolkit                        | Predictable state container for multi-step refinement and approval flows                   |
| Build Tool             | Vite                                 | Fast development server and optimized production builds                                    |
| Testing                | Vitest + React Testing Library       | Unit and component testing with fast feedback loops                                        |
| E2E Testing            | Playwright                           | End-to-end testing for critical user workflows                                             |
| **Backend**            |                                      |                                                                                            |
| Framework              | FastAPI (Python)                     | Modern async framework with OpenAPI generation and Clean Architecture compatibility        |
| Data Validation        | Pydantic                             | Request/response validation with strong typing                                             |
| ORM                    | SQLAlchemy                           | Persistence layer abstraction in infrastructure layer following repository pattern         |
| Testing                | Pytest                               | Unit and integration testing with fixtures and mocking support                             |
| Containerization       | Docker + Uvicorn                     | Multi-stage builds for reproducible deployments                                            |
| **Authentication**     |                                      |                                                                                            |
| Auth Module            | Custom FastAPI + JWT                 | Internal bounded context handling user identity, login, and token issuance                 |
| Password Hashing       | bcrypt (via passlib)                 | Secure password storage with industry-standard hashing                                     |
| Token Management       | PyJWT / python-jose                  | JWT generation and validation for stateless authentication                                 |
| Authorization          | Backend role checks + PostgreSQL RLS | Defense-in-depth: API-layer role validation + database-layer policy enforcement            |
| **Data & Storage**     |                                      |                                                                                            |
| Database               | Amazon RDS PostgreSQL                | Managed relational database with ACID guarantees and Free Tier eligibility (12 months)     |
| File Storage           | Amazon S3                            | Object storage for exports and file attachments                                            |
| **Infrastructure**     |                                      |                                                                                            |
| Frontend Hosting       | Amazon S3 + CloudFront               | Static site hosting with global CDN, HTTPS via ACM, Free Tier eligible                     |
| Backend Hosting        | AWS App Runner                       | Container service with auto-scaling, health checks, and zero-downtime deployments          |
| Networking             | VPC + Security Groups                | Private network for RDS access from App Runner; public CloudFront and App Runner endpoints |
| IaC                    | Terraform                            | Infrastructure as Code for repeatable AWS resource provisioning                            |
| **Observability**      |                                      |                                                                                            |
| Application Monitoring | Sentry (Free Developer Plan)         | Error tracking, performance monitoring, and release correlation for frontend and backend   |
| Infrastructure Metrics | AWS CloudWatch (Free Tier)           | AWS service metrics, application logs, and infrastructure alarms                           |
| **CI/CD**              |                                      |                                                                                            |
| Pipeline               | GitHub Actions                       | Automated testing, quality gates, and deployment workflows                                 |
| Container Registry     | Amazon ECR                           | Docker image storage for backend deployments                                               |

## Key Integration Patterns

### Frontend ↔ Backend Communication

- **Protocol:** HTTPS REST APIs with JWT bearer authentication
- **CORS:** CloudFront distribution allowlisted for backend access
- **State sync:** Frontend Redux state synchronized with backend via RTK Query

### Backend ↔ Database

- **Access pattern:** SQLAlchemy repository implementations in infrastructure layer
- **Connection pooling:** 5-10 connections for MVP with query timeouts
- **Network security:** VPC connector provides private RDS access from App Runner
- **Migration strategy:** Backward-compatible versioned migrations for zero-downtime deploys

### Authentication Flow

1. User submits credentials to `/api/v1/auth/login` endpoint
2. Auth module validates credentials and issues JWT token
3. Frontend stores token and includes in Authorization header
4. Backend middleware validates JWT on protected routes
5. PostgreSQL RLS policies enforce data-level authorization

### Observability Strategy

- **Application layer:** Sentry captures errors, performance traces, and release metadata
- **Infrastructure layer:** CloudWatch monitors AWS service metrics and application logs
- **Cost target:** $0/month using free tiers (Sentry Free Developer + CloudWatch Free Tier)
- **Alert channels:** Email notifications for critical errors and infrastructure alarms

## Scalability & Performance Strategy

- **Horizontal scaling:** Stateless backend containers on App Runner scale based on traffic
- **Database optimization:** Query indexing on project/story surfaces with p95 latency monitoring
- **MVP capacity:** Supports NFR-005/NFR-006 targets (3 projects, 30 stories per project) on AWS Free Tier
- **Evolution readiness:** Module boundaries enable selective service extraction when growth demands it
- **Performance-first:** Optimize queries and payloads before adding infrastructure complexity

## Source References

- [Architecture Solution Design](./architecture-solution-design.md) - High-level system design and component interaction
- [Architecture Styles](./architecture-styles.md) - Modular monolith rationale and evolution strategy
- [Architecture Decision Records](../../04-decisions/README.md) - Detailed rationale for each technology choice

---

**Last Updated**: 2026-08-04

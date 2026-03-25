# Architecture Overview — Open Freelancer Project Hub

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | In Review                   |
| **Last Updated** | 2026-03-24                  |

## How to Use

- Every section links to a document that contains the authoritative decision or design for that concern.
- Every significant decision must link to at least one ADR.
- Keep this README as the single navigation entry point for the architecture folder.
- Add new sections only when a domain concern is not yet covered.

---

## 1. Core Architecture

- **[Architecture Solution Design](./architecture-solution-design.md)**: System context, selected pattern, component design, data flow, and high-level trade-offs.
- **[Architecture Styles](./architecture-styles.md)**: Modular Monolith rationale, bounded context map, and evolution strategy toward selective microservices.
- **[Sequence Diagrams](./sequence-diagrams.md)**: Key interaction flows — authentication, AI refinement, error handling.

## 2. Technology Stack

- **[Technology Stack](./technology-stack.md)**: Component-level technology choices (FastAPI, React, Supabase, Sentry, Vercel, Render) with rationale and trade-offs.

## 3. API and Communication

Files in `api/`:

- **[API Design Standards](./api/api-design-standards.md)**: REST conventions, versioning, error handling, and naming rules.
- **[API Contract](./api/api-contract.md)**: Endpoint catalog and shared JSON schemas.

## 4. Deployment and Operations

Files in `ops/`:

- **[Deployment Architecture](./ops/deployment-architecture.md)**: Vercel + Render + Supabase platform model, compute, networking, scaling, and disaster recovery.
- **[CI/CD Pipeline](./ops/ci-cd-pipeline.md)**: GitHub Actions pipeline stages, migration strategy, rollback, and secrets handling.
- **[Monitoring and Observability](./ops/monitoring-observability.md)**: Sentry-based SLIs, dashboards, alerting rules, and release health checks.

## 5. Security

Files in `security/`:

- **[Security Architecture](./security/security-architecture.md)**: Supabase Auth + RBAC + RLS model, OWASP controls, data protection, and secrets management.
- **[Threat Model](./security/threat-model.md)**: STRIDE-based threat enumeration, risk matrix, and mitigation plan.

## 6. Diagrams and Decision Records

- **[Diagrams](./diagrams/)**: Architecture diagrams — C4 models, data flow, authentication flow, authorization flow, deployment.
- **[ADRs](./adrs/)**: Architecture Decision Records with context, decision, and trade-offs.
  - Start with [ADR Template](./adrs/adr-template.md) for all new decisions.

---

## 7. Architecture Domain → Requirements Coverage

This matrix confirms every Must-priority requirement is addressed by at least one architecture domain. Update whenever ADRs or requirements change.

| Architecture Domain       | Must FR(s) Covered                             | Must NFR(s) Covered       | Key ADR(s)                            |
| ------------------------- | ---------------------------------------------- | ------------------------- | ------------------------------------- |
| Core Architecture         | FR-001, FR-002, FR-003, FR-004                 | NFR-003, NFR-004          | ADR-001, ADR-009 (architecture-style) |
| API and Communication     | FR-001, FR-002, FR-003, FR-004, FR-005, FR-006 | NFR-001, NFR-005          | ADR-005, ADR-009 (architecture-style) |
| Deployment and Operations | —                                              | NFR-005, NFR-006          | ADR-006, ADR-008, ADR-013, ADR-014    |
| Security                  | FR-008, FR-009, FR-010                         | NFR-001, NFR-002          | ADR-005, ADR-012                      |
| Database                  | FR-001, FR-003, FR-004, FR-006                 | NFR-001, NFR-005, NFR-006 | ADR-003, ADR-007                      |

> **Rule:** Any Must FR or NFR with no domain coverage is an architecture gap — create an ADR before phase sign-off.

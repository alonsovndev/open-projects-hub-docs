# Architecture Overview Template (AI-Ready)

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |

## How to Use (AI Agent Instructions)

- Fill in each linked document before referencing it.
- Every section must link to at least one ADR for significant decisions.
- Keep this README as the single navigation entry point for the architecture folder.
- Add new sections only when a domain concern is not yet covered.

---

## 1. Core Architecture

- **[Architecture Solution Design](./architecture-solution-design.md)**: System context, component overview, and high-level data flow.
- **[Architecture Styles](./architecture-styles.md)**: Selected pattern rationale, bounded context map, and evolution strategy.
- **[Sequence Diagrams](./sequence-diagrams.md)**: Key interaction flows between system actors and services.

## 2. Technology Stack

- **[Technology Stack](./technology-stack.md)**: Component-level technology choices with rationale and trade-offs.

## 3. API and Communication

Files in `api/`:

- **[API Design Standards](./api/api-design-standards.md)**: REST conventions, versioning, error handling, and naming rules.
- **[API Contract](./api/api-contract.md)**: Endpoint catalog and shared JSON schemas.
- **[Event-Driven Architecture](./api/event-driven-architecture.md)**: Async patterns: outbox, saga, event sourcing, and broker selection.

## 4. Deployment and Operations

Files in `ops/`:

- **[Deployment Architecture](./ops/deployment-architecture.md)**: Cloud platform selection, compute, networking, and scaling strategy.
- **[CI/CD Pipeline](./ops/ci-cd-pipeline.md)**: Automated quality gates, deployment stages, rollback, and secrets handling.
- **[Monitoring and Observability](./ops/monitoring-observability.md)**: SLIs, dashboards, alerting rules, and release health checks.

## 5. Security

Files in `security/`:

- **[Security Architecture](./security/security-architecture.md)**: Auth model, RBAC, data protection, and defense-in-depth controls.
- **[Threat Model](./security/threat-model.md)**: STRIDE-based threat enumeration, risk matrix, and mitigation plan.

## 6. Diagrams and Decision Records

- **[Diagrams](./diagrams/)**: Architecture diagrams (C4, data flow, auth flow, deployment, event flows).
- **[ADRs](./adrs/)**: Architecture Decision Records with context, decision, and trade-offs.
  - Start with [ADR Template](./adrs/adr-template.md) for all new decisions.

---

## 7. Architecture Domain → Requirements Coverage

This matrix confirms every Must-priority requirement is addressed by at least one architecture domain. Update whenever ADRs or requirements change.

| Architecture Domain       | Must FR(s) Covered          | Must NFR(s) Covered | Key ADR(s)         |
| ------------------------- | --------------------------- | ------------------- | ------------------ |
| Core Architecture         | [FR-001-01, FR-002-01]      | [NFR-X02]           | [ADR-001, ADR-009] |
| API and Communication     | [FR-001-01, FR-002-01, ...] | [NFR-X01]           | [ADR-002, ADR-010] |
| Deployment and Operations | —                           | [NFR-X01, NFR-X02]  | [ADR-006, ADR-008] |
| Security                  | —                           | [NFR-X01]           | [ADR-005, ADR-013] |
| Database                  | [FR-001-01, FR-003-01, ...] | [NFR-X01, NFR-X02]  | [ADR-004, ADR-007] |

> **Rule:** Any Must FR or NFR with no domain coverage is an architecture gap — create an ADR before phase sign-off.

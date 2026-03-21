# Architecture Styles Decision

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Accepted                    |
| **Last Updated** | 2026-02-28                  |

## Decision Summary

The project will use a **Modular Monolith** (backend) with a separately deployed frontend for MVP and near-term scaling.

This decision aligns with:

- MVP timeline (1 to 1.5 months),
- small team coordination constraints,
- requirement scope (up to 3 active projects per account in MVP),
- need for clear domain boundaries and future extraction path.

## Architecture Style Evaluation

| Style                           | Benefits                                                                    | Drawbacks                                                                   | Fit for Current Context                                    |
| ------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Monolithic (layered)            | Fast setup, simple deploy pipeline                                          | Boundary erosion risk, harder long-term decomposition                       | Acceptable for very short-lived MVPs, but weaker long-term |
| Microservices                   | Independent scaling/deployments, isolation                                  | High operational complexity, distributed transactions, higher DevOps burden | Premature for current team size and MVP scope              |
| **Modular Monolith (Selected)** | Strong module boundaries, single deployable, easier refactor and extraction | Requires discipline to protect module boundaries                            | **Best fit for MVP + planned evolution**                   |

## Bounded Context Alignment

The modular monolith maps bounded contexts to internal modules:

- **Client Management**: client records and lifecycle
- **Project Management**: project creation, status (discovery/planning), constraints
- **Requirements Refinement**: AI-assisted drafting, approvals, story artifact lifecycle
- **Access Control**: Admin/Viewer authorization and visibility rules
- **Export & Reporting**: Markdown export and delivery artifacts

Each module owns:

- domain entities and use cases,
- repository interfaces (domain/application side),
- infrastructure adapters behind module contracts.

## Rationale and Trade-offs

### Why this is the right decision now

1. Supports fast MVP delivery with low operational overhead.
2. Preserves Clean Architecture and DDD boundaries needed for maintainability.
3. Reduces distributed-system complexity (network partitions, sagas across many services) until scale requires it.

### Key trade-offs

- We accept a single backend deployable now to accelerate delivery.
- We mitigate long-term growth risk with strict module boundaries and ADR-governed changes.

## Evolution Strategy (Modular Monolith → Selective Microservices)

Reference diagram: [`diagrams/architecture-evolution.mmd`](./diagrams/architecture-evolution.mmd)

### Trigger-based extraction criteria

Extract a module into a service only when at least one trigger is sustained:

- throughput hotspot (latency/SLA pressure),
- independent release cadence needed,
- fault-isolation requirement,
- team ownership split requiring independent delivery velocity.

### Migration path

1. Keep domain contracts stable inside module boundaries.
2. Introduce asynchronous integration events where coupling is high.
3. Extract one bounded context at a time behind existing API contracts.
4. Add saga coordination only for true cross-service transaction workflows.

## Scalability Alignment

- MVP and Phase 1 targets (NFR-005/NFR-006) are achievable with stateless backend scaling on Render.
- Modular boundaries reduce refactor risk while enabling selective horizontal scaling later.
- Event-driven patterns are available as incremental additions instead of day-one complexity.

## Related Documents

- [Architecture Solution Design](./architecture-solution-design.md)
- [Event-Driven Architecture](./event-driven-architecture.md)
- [ADR-009: Architecture Style](./adrs/adr-009-architecture-style.md)

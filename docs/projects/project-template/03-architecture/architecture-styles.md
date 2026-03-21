# Architecture Styles Template (AI-Ready)

| Attribute        | Value                                |
| ---------------- | ------------------------------------ |
| **Project**      | [Project Name]                       |
| **Version**      | [vX.Y]                               |
| **Status**       | [Proposed \| Accepted \| Superseded] |
| **Last Updated** | [YYYY-MM-DD]                         |

## How to Use (AI Agent Instructions)

- Complete the evaluation table before selecting a style.
- Define all bounded contexts before moving to component design.
- Link to the corresponding ADR for this decision.
- Revisit when team size, load, or compliance requirements change significantly.

## Sources

- [Architecture Solution Design](./architecture-solution-design.md)
- [Feature Requirements](../01-requirements/project-requirements-by-feature.md)
- [Non-Functional Quality View](../01-requirements/non-functional-requirements.md)

---

## Decision Summary

The project will use **[Selected Architecture Style]** for [backend/frontend/full-stack] with [deployment model].

This decision aligns with:

- [Timeline or delivery constraint]
- [Team size and coordination constraint]
- [Requirement scope or business constraint]
- [Long-term scalability or maintainability goal]

## Architecture Style Evaluation

| Style                        | Benefits                              | Drawbacks                                         | Fit for Current Context       |
| ---------------------------- | ------------------------------------- | ------------------------------------------------- | ----------------------------- |
| Monolithic (layered)         | Fast setup, simple deploy             | Boundary erosion risk, harder decomposition       | [Evaluation]                  |
| Hexagonal / Ports & Adapters | Strong isolation, high testability    | Upfront abstraction discipline required           | [Evaluation]                  |
| Microservices                | Independent scaling, strong isolation | High operational and coordination overhead        | [Evaluation]                  |
| Event-Driven                 | Strong decoupling, async reliability  | Observability and eventual-consistency complexity | [Evaluation]                  |
| **[Selected Style]**         | [Key benefit 1], [Key benefit 2]      | [Key drawback]                                    | **Best fit because [reason]** |

## Bounded Context Alignment

Map bounded contexts to internal modules or services:

- **[Context Name]**: [domain concern and lifecycle, e.g., client records and account management]
- **[Context Name]**: [domain concern, e.g., project creation, status, constraints]
- **[Context Name]**: [domain concern, e.g., requirements drafting, approval lifecycle]
- **[Context Name]**: [access control, authorization, visibility rules]
- **[Context Name]**: [reporting, export, or integration concern]

Each module/service owns:

- domain entities and use cases,
- repository interfaces (domain/application side),
- infrastructure adapters behind module contracts.

## Rationale and Trade-offs

### Why this is the right decision now

1. [Reason 1: delivery velocity, operational overhead, or team expertise]
2. [Reason 2: architecture quality, maintainability, or testability goals]
3. [Reason 3: risk reduction or compliance alignment]

### Key trade-offs accepted

- [Trade-off 1 and mitigation strategy]
- [Trade-off 2 and mitigation strategy]

## Evolution Strategy

[Describe the path if requirements outgrow the current style, e.g., Modular Monolith → Selective Microservices.]

Reference diagram: [`diagrams/architecture-evolution.mmd`](./diagrams/architecture-evolution.mmd)

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

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

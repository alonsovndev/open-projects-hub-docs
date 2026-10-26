# Architecture overview

The system combines a separately deployed React frontend with a FastAPI modular monolith and PostgreSQL. Start with the solution design, then inspect the contracts, access boundaries, and deployment trade-offs.

## Architecture reading map

| Concern | Documents | Review question |
| --- | --- | --- |
| System structure | [Solution design](./core/architecture-solution-design.md), [architecture styles](./core/architecture-styles.md), [technology stack](./core/technology-stack.md) | How do responsibilities and dependencies fit together? |
| Interactions | [Sequence diagrams](./diagrams/sequence-diagrams.md) | What happens during authentication, refinement, approval, and review? |
| Persistence | [Database design](./database/database-design.md) | What is stored, and how is workspace scope enforced? |
| API | [Contract](./api/api-contract.md), [design standards](./api/api-design-standards.md) | What requests, responses, and errors are implemented? |
| Security | [Security architecture](./security/security-architecture.md), [threat model](./security/threat-model.md) | Which controls exist, and what risks remain? |
| Operations | [Deployment](./ops/deployment-architecture.md), [CI/CD](./ops/ci-cd-pipeline.md), [observability](./ops/monitoring-observability.md) | How is the system released and operated? |

## Requirements and decision traceability

| Architecture concern | Feature or quality baseline | Relevant decisions |
| --- | --- | --- |
| Workspace and project lifecycle | F-001, F-003; NFR-X02 | ADR-001, ADR-004, ADR-020 |
| Refinement, approval, and backlog | F-002, F-004, F-010 | ADR-018, ADR-019 |
| Authentication and client visibility | F-003, F-007, F-008, F-009, F-011; NFR-X01, NFR-X09 | ADR-005, ADR-020, ADR-024 |
| Testability and maintainability | NFR-X03 | ADR-010, ADR-015 |
| Deployment and operational limits | NFR-X05, NFR-X06, NFR-X10 | ADR-021, ADR-022, ADR-023, ADR-024 |

These associations show where the design addresses a requirement; they do not certify that every acceptance criterion or quality target has passed. See [evidence and limitations](../00-context/evidence-and-limitations.md) for verification boundaries.

## Current design

Current architecture pages describe the reviewed implementation, and the [ADR log](../04-decisions/README.md) records the decisions behind it. In particular, the system runs on a single EC2 host behind Cloudflare, clients review a project through its shared access code, and generated drafts remain in browser storage until approval.

Diagrams are embedded Mermaid blocks in the owning pages. No Draw.io source files are supplied by this repository.

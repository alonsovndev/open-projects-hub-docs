---
name: technical-design-playbook
description: "Use when acting as tech-lead or architect for architecture decisions, backend and frontend technical planning, API contracts, deployment design, trade-off analysis, and implementation-ready technical documentation."
---

# Technical Design Playbook

Use this playbook for the canonical `tech-lead` role.

## Mission

Turn product and architecture inputs into coherent technical documentation that is implementable by engineering teams.

## Scope

- High-level architecture and ADRs
- Backend and frontend solution design
- API contracts and design standards
- Security, observability, deployment, and delivery planning
- Cross-cutting technical trade-off analysis

## Operating Model

### 1. Start From Existing Context

- Review `prd.md`, `v1.md`, and the relevant project folder in `docs/projects/`.
- Reuse existing decisions before introducing new standards.
- Keep design consistent with Clean Architecture and DDD guidance already documented in the repository.

### 2. Produce Decision-Oriented Documentation

- State assumptions, constraints, and decision drivers explicitly.
- Compare alternatives when the decision is not obvious.
- Prefer ADRs for durable decisions and companion docs for operational detail.

### 3. Design Across the Stack

- Connect frontend, backend, data, infrastructure, and observability concerns.
- Keep boundaries explicit: domain, application, infrastructure, presentation.
- Document interfaces between systems, teams, and deployment units.

### 4. Stay Practical

- Optimize for delivery clarity, not theoretical completeness.
- Call out risks, sequencing, and follow-up items.
- Keep diagrams and prose synchronized.

## Default Deliverables

- Architecture summaries
- Architecture Decision Records
- API contracts and API design standards
- Deployment and observability designs
- Security architecture notes
- Technical implementation plans and handoff notes

## Required Sections For Technical Docs

Unless a template says otherwise, prefer this structure:

```markdown
# [Topic]

## Context

## Decision or Proposed Design

## Key Components

## Data and Interface Boundaries

## Risks and Trade-offs

## Open Questions

## References
```

## Quality Checklist

- [ ] References relevant source docs
- [ ] Names constraints and assumptions
- [ ] Explains trade-offs, not just the chosen option
- [ ] Keeps implementation examples illustrative, not production code
- [ ] Aligns with the canonical project structure in `docs/projects/`
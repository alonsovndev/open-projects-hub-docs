# Phased Roadmap Template (AI-Ready)

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |
| **Owner**        | [Role/Name]                      |

## How to Use (AI Agent Instructions)

- Add phases as new sections; do not skip or combine phases.
- Every epic must link to at least one requirement (`FR-*` or `NFR-*`).
- Phase progression is gated by acceptance criteria, not calendar dates.
- New features belong in the earliest phase where their requirements are fully clarified.
- Populate the Feature Traceability Matrix whenever epics or features change.

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/project-requirements-by-feature.md)

## Planning Principles

- Separate scope definition from implementation planning.
- Prioritize using MoSCoW; escalate conflicts to the Tech Lead.
- Phase definitions prioritize validated requirements before scope expansion.
- Decisions that affect architecture or delivery must reference an ADR.

---

## Phase Overview

| Phase   | Name   | Objective              | Status                     | Target Window     |
| ------- | ------ | ---------------------- | -------------------------- | ----------------- |
| MVP     | [Name] | [Core value delivered] | [Planned/In Progress/Done] | [e.g., Weeks 1-4] |
| Phase 1 | [Name] | [Next increment]       | [Planned/In Progress/Done] | [e.g., Weeks 5-6] |
| Phase 2 | [Name] | [Future expansion]     | [Planned/In Progress/Done] | [TBD]             |

---

## MVP Phase

### Goals

1. [Core goal 1]
2. [Core goal 2]
3. [Core quality/security baseline goal]

### Prioritized Epics

| Priority | Epic        | Linked Feature(s) | Linked Requirements  | Owner  |
| -------- | ----------- | ----------------- | -------------------- | ------ |
| Must     | [Epic name] | [F-001]           | [FR-001-01, NFR-X01] | [Role] |
| Must     | [Epic name] | [F-002]           | [FR-002-01]          | [Role] |

### Key Deliverables

- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

### Acceptance Criteria

- [ ] All `Must` functional requirements validated for scope completeness.
- [ ] All `Must` non-functional requirements mapped to measurable checks.
- [ ] No out-of-scope features leak into MVP deliverables.

---

## Phase 1

### Goals

1. [Usability/quality improvement goal]
2. [Transparency or collaboration improvement]

### Prioritized Epics

| Priority | Epic        | Linked Feature(s) | Linked Requirements | Owner  |
| -------- | ----------- | ----------------- | ------------------- | ------ |
| Should   | [Epic name] | [F-00X]           | [FR-00X-01]         | [Role] |
| Should   | [Epic name] | [F-00X]           | [NFR-00X-01]        | [Role] |

### Key Deliverables

- [Deliverable 1]
- [Deliverable 2]

### Acceptance Criteria

- [ ] All `Should` requirements have explicit quality targets and designated owners.
- [ ] Viewer and stakeholder-facing artifacts verified as read-only and non-technical.

---

## Phase 2 (Future)

### Goals

1. [Scale, governance, or collaboration expansion goal]
2. [Post-MVP feature set or integration goal]

### Prioritized Epics

| Priority | Epic        | Linked Feature(s) | Linked Requirements | Owner  |
| -------- | ----------- | ----------------- | ------------------- | ------ |
| Could    | [Epic name] | [F-00X]           | [FR-00X-01]         | [Role] |
| Could    | [Epic name] | [F-00X]           | [NFR-00X-01]        | [Role] |

### Key Deliverables

- [Deliverable 1: traceability matrix, governance doc, dependency register]

### Acceptance Criteria

- [ ] All Phase 2 items documented as candidates with clear dependency links.
- [ ] No Phase 2 item introduces implementation design or tech-stack commitments.
- [ ] Prioritization rationale captured for each candidate epic.

---

## Feature Traceability Matrix

Keep this updated whenever a feature, epic, or story changes phase. Every row must have at least one Linked Story before work begins.

| Feature ID | Feature Name   | Phase   | Priority | Linked Epic(s) | Linked Stories (US-\*)         | Status         |
| ---------- | -------------- | ------- | -------- | -------------- | ------------------------------ | -------------- |
| F-001      | [Feature Name] | MVP     | Must     | [Epic name]    | [US-BE-MVP-001, US-FE-MVP-001] | [Planned/Done] |
| F-002      | [Feature Name] | Phase 1 | Should   | [Epic name]    | [US-BE-P1-001, US-UX-P1-001]   | [Planned/Done] |

---

## Risks and Blockers

| Risk / Blocker        | Phase Impacted | Probability | Impact | Mitigation           | Owner  |
| --------------------- | -------------- | ----------- | ------ | -------------------- | ------ |
| [Scope creep]         | MVP            | Medium      | High   | Strict MoSCoW gating | [Role] |
| [External dependency] | Phase 1        | Low         | Medium | [Action]             | [Role] |

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

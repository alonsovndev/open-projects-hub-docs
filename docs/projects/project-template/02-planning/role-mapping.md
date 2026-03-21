# Role Mapping Template (AI-Ready)

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |
| **Owner**        | [Role/Name]                      |

## How to Use (AI Agent Instructions)

- List all roles that will own, contribute to, or be consulted on planning decisions.
- Use the RACI convention: **Owner** (accountable), **Primary** (responsible), **Support** (consulted), **Informed** (notified).
- Map roles to workstreams using feature IDs from the canonical requirements file.
- Update phase-level ownership tables when new epics or features are added.

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/project-requirements-by-feature.md)
- [Phased Roadmap](./phased-roadmap.md)

---

## Role Definitions

| Role                | Primary Planning Focus                                                  |
| ------------------- | ----------------------------------------------------------------------- |
| [Tech Lead]         | [Scope governance, traceability, quality gates, cross-role alignment]   |
| [Backend Engineer]  | [Domain/data rules, workflow constraints, API and access-rule planning] |
| [Frontend Engineer] | [User flow feasibility, interaction behavior, UX consistency]           |
| [UI/UX Designer]    | [Usability, information architecture, accessibility, onboarding]        |
| [Product Owner]     | [Prioritization, stakeholder alignment, acceptance sign-off]            |

---

## Workstream Ownership Matrix

Map each planning workstream to a feature or group of requirements.

| Workstream                                       | Feature(s) | Owner       | Primary            | Support             | Informed         |
| ------------------------------------------------ | ---------- | ----------- | ------------------ | ------------------- | ---------------- |
| [Workstream name, e.g., Core project management] | [F-001]    | [Tech Lead] | [Backend Engineer] | [Frontend Engineer] | [UI/UX Designer] |
| [Workstream name]                                | [F-002]    | [Role]      | [Role]             | [Role]              | [Role]           |

---

## Phase-Level Task Ownership (RACI)

> Add one table per phase. Duplicate as needed.

### MVP Phase

| Priority | Epic / Task                           | Accountable | Responsible         | Consulted         |
| -------- | ------------------------------------- | ----------- | ------------------- | ----------------- |
| Must     | [Core scope and acceptance alignment] | [Tech Lead] | [Tech Lead]         | [All roles]       |
| Must     | [Requirements workflow definition]    | [Tech Lead] | [Backend, Frontend] | [UI/UX Designer]  |
| Must     | [Access and visibility scope]         | [Tech Lead] | [Backend Engineer]  | [Frontend, UI/UX] |

### Phase 1

| Priority | Epic / Task                           | Accountable      | Responsible       | Consulted   |
| -------- | ------------------------------------- | ---------------- | ----------------- | ----------- |
| Should   | [Onboarding and guidance scope]       | [UI/UX Designer] | [UI/UX, Frontend] | [Tech Lead] |
| Should   | [Quality targets: perf/accessibility] | [Tech Lead]      | [All engineers]   | [Tech Lead] |

### Phase 2

| Priority | Epic / Task                           | Accountable | Responsible        | Consulted           |
| -------- | ------------------------------------- | ----------- | ------------------ | ------------------- |
| Could    | [Backlog governance model]            | [Tech Lead] | [Tech Lead]        | [All roles]         |
| Could    | [Future collaboration/role expansion] | [Tech Lead] | [Tech Lead, UI/UX] | [Backend, Frontend] |

---

## Coordination Cadence

| Cadence                  | Participants           | Purpose                                                  |
| ------------------------ | ---------------------- | -------------------------------------------------------- |
| [Sprint kickoff]         | [All roles]            | [Scope alignment and dependency review]                  |
| [Requirement checkpoint] | [Tech Lead, Backend]   | [Validate acceptance criteria before development]        |
| [Phase sign-off]         | [Tech Lead, UI/UX, PO] | [Confirm quality and usability impact before next phase] |
| [Async updates]          | [All roles]            | [Update requirement IDs on completed or changed items]   |

## Escalation Path

- Scope conflicts → [Tech Lead] → [Product Owner]
- Quality gate failures → [Tech Lead]
- UX/accessibility disputes → [UI/UX Designer] → [Tech Lead]

---

## Requirement-Level Ownership

For every Must-priority requirement, assign an explicit Owner (DRI) and Reviewer before planning sign-off. Pull IDs from `project-requirements-by-feature.md`.

| Requirement ID | Requirement Summary         | Owner (DRI)        | Reviewer        | Implementer         | Phase   |
| -------------- | --------------------------- | ------------------ | --------------- | ------------------- | ------- |
| FR-[NNN]-01    | [Short requirement summary] | [Tech Lead]        | [Product Owner] | [Backend Engineer]  | MVP     |
| FR-[NNN]-02    | [Short requirement summary] | [Backend Engineer] | [Tech Lead]     | [Backend Engineer]  | MVP     |
| NFR-X01        | [Short quality constraint]  | [Tech Lead]        | [Tech Lead]     | [All Engineers]     | MVP     |
| NFR-[NNN]-01   | [Short quality constraint]  | [UI/UX Designer]   | [Tech Lead]     | [Frontend Engineer] | Phase 1 |

> **Rule:** No Must-priority requirement may enter an active sprint without an Owner (DRI) named in this table.

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

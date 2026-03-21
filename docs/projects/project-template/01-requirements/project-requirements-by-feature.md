# Project Requirements by Feature (Canonical)

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |
| **Owner**        | [Role/Name]                      |

## Purpose

Use this file as the single source of truth for requirements, organized by feature.
Each feature includes both functional requirements (`FR-*`) and feature-scoped quality requirements (`NFR-*`).

## How to Use (AI Agent Instructions)

- Add new features as new sections (`F-001`, `F-002`, ...).
- Add requirements under the matching feature only; avoid duplicates across files.
- Keep each requirement atomic and testable.
- Use `MoSCoW` for priority and keep status updated.
- When closing a requirement, update traceability links and acceptance criteria.

## Sources

- [Project Overview](../overview.md)
- [User Personas](../user-personas.md)
- [Open Questions](../open-questions.md)

---

## Feature Map

| Feature ID | Feature Name   | Outcome                          | Priority                  | Status                     | Owner       |
| ---------- | -------------- | -------------------------------- | ------------------------- | -------------------------- | ----------- |
| F-001      | [Feature Name] | [Expected user/business outcome] | [Must/Should/Could/Won't] | [Draft/Clarified/Approved] | [Role/Name] |
| F-002      | [Feature Name] | [Expected user/business outcome] | [Must/Should/Could/Won't] | [Draft/Clarified/Approved] | [Role/Name] |

---

## Cross-Cutting Quality Baseline

Use this section for quality constraints that apply to all features.

| ID      | Quality Area  | Requirement                        | Metric / Target    | Priority | Status                     |
| ------- | ------------- | ---------------------------------- | ------------------ | -------- | -------------------------- |
| NFR-X01 | Security      | [Global security requirement]      | [Target/Threshold] | Must     | [Draft/Clarified/Approved] |
| NFR-X02 | Reliability   | [Global reliability requirement]   | [Target/Threshold] | Must     | [Draft/Clarified/Approved] |
| NFR-X03 | Accessibility | [Global accessibility requirement] | [Target/Threshold] | Should   | [Draft/Clarified/Approved] |

---

## Feature Template

> Duplicate this section for each feature.

### F-[NNN] [Feature Name]

#### Context

- **Problem**: [What problem this feature solves]
- **Primary Persona**: [Persona]
- **In Scope**: [What is included]
- **Out of Scope**: [What is excluded]

#### Functional Requirements

| ID          | Requirement                   | Source                           | Priority | Acceptance Criteria            | Status                     |
| ----------- | ----------------------------- | -------------------------------- | -------- | ------------------------------ | -------------------------- |
| FR-[NNN]-01 | [Atomic behavior requirement] | [Overview/Persona/Open Question] | Must     | [Testable acceptance criteria] | [Draft/Clarified/Approved] |
| FR-[NNN]-02 | [Atomic behavior requirement] | [Overview/Persona/Open Question] | Should   | [Testable acceptance criteria] | [Draft/Clarified/Approved] |

#### Feature-Scoped Non-Functional Requirements

| ID           | Requirement                                    | Metric / Target       | Priority | Status                     |
| ------------ | ---------------------------------------------- | --------------------- | -------- | -------------------------- |
| NFR-[NNN]-01 | [Quality requirement specific to this feature] | [Quantifiable target] | Must     | [Draft/Clarified/Approved] |
| NFR-[NNN]-02 | [Quality requirement specific to this feature] | [Quantifiable target] | Should   | [Draft/Clarified/Approved] |

#### Dependencies and Risks

- **Dependencies**: [External teams, decisions, APIs, infra]
- **Risks**: [Top risk + mitigation]

#### Traceability

- **Related Open Questions**: [Q-xxx]
- **Related User Stories**: [Link]
- **Related Architecture/ADR**: [Link]
- **Related Prototype**: [Link]

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

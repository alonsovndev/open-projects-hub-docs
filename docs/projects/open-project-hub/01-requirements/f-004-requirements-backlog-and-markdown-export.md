# F-004 Requirements Backlog and Markdown Export

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: MVP deliverable must be easy to review and share in a consistent format.
- **Primary Persona**: Admin and Viewer
- **In Scope**: Structured user story backlog view, approved-only Markdown export.
- **Out of Scope**: PDF export and advanced reporting analytics.

## Functional Requirements

| ID        | Requirement                                                                                            | Source               | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                            | Status    |
| --------- | ------------------------------------------------------------------------------------------------------ | -------------------- | -------- | ------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------- | --------- |
| FR-004-01 | The system provides a structured list of user stories with acceptance criteria as primary deliverable. | Open Questions Q-014 | Must     | Product Owner | Q-014                        | Each project includes a requirements backlog view listing approved user stories and their acceptance criteria. | Clarified |
| FR-004-02 | The system supports exporting project requirements to Markdown.                                        | Open Questions Q-015 | Must     | Product Owner | Q-015                        | Admin can export approved requirements as a Markdown file preserving the user story template structure.        | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                 | Metric / Target                                                                                                          | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ------------- | ---------------------------- | --------- |
| NFR-004-01 | Viewer-facing requirement outputs remain readable and stakeholder-friendly. | Viewer views present user stories in standard template with plain-language titles and omit internal notes.               | Should   | Product Owner | —                            | Clarified |
| NFR-004-02 | Backlog and export views remain responsive for MVP data volume.             | With up to 3 active projects and 200 approved user stories, project list and requirements views render within 2 seconds. | Should   | Tech Lead     | —                            | Draft     |

## Dependencies and Risks

- **Dependencies**: Approval-state filtering, export formatting module, requirement schema consistency.
- **Risks**: Export can include unapproved or internal content; mitigation is export endpoint filtering by approval state and role.

## Traceability

- **Related Open Questions**: Q-014, Q-015
- **Related User Stories**: [Epics](../04-user-stories/epics.md)
- **Related Architecture/ADR**: [API Design Standards](../03-architecture/api-design-standards.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

## Change Log

| Date       | Version | Change Summary                                                   | Author        |
| ---------- | ------- | ---------------------------------------------------------------- | ------------- |
| 2026-03-23 | 1.1     | Updated traceability links after requirements folder flattening. | Product Owner |
| 2026-03-23 | 1.0     | Initial feature requirements created.                            | Product Owner |

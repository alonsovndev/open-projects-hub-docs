# F-004 Requirements Backlog and Markdown Export

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.2                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-07-30                  |
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
| FR-004-03 | Admin can reorder user stories in backlog view via drag-and-drop or priority field.                   | Usability            | Should   | Product Owner | —                            | Backlog view supports drag-and-drop reorder; changes persist; alternative priority field for keyboard users; order reflected in export. | Clarified |
| FR-004-04 | Export scope options include single project, filtered by status, or date range.                       | Export flexibility   | Should   | Product Owner | —                            | Export UI has scope selector; filters for approved/draft status, date range; export file name includes scope info.                     | Clarified |
| FR-004-05 | Viewer role cannot export; only Admin can export project requirements.                                | Access control       | Must     | Product Owner | —                            | Export button hidden or disabled for Viewer; API enforces role check; Viewer attempting export receives 403 Forbidden.                 | Clarified |
| FR-004-06 | Export blocks or warns when no approved stories exist.                                                 | Data validation      | Should   | Product Owner | —                            | Export with zero approved stories shows warning "No approved stories to export"; user can cancel or export empty template.             | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                 | Metric / Target                                                                                                          | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ------------- | ---------------------------- | --------- |
| NFR-004-01 | Viewer-facing requirement outputs remain readable and stakeholder-friendly. | Viewer views present user stories in standard template with plain-language titles. | Should | Product Owner | — | Clarified |
| NFR-004-02 | Backlog and export views remain responsive for MVP data volume.             | Satisfies NFR-X05 performance baseline; renders within 2 seconds. | Should   | Tech Lead     | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**: Approval-state filtering, export formatting module, requirement schema consistency.
- **Risks**: Export can include unapproved or internal content; mitigation is export endpoint filtering by approval state and role.

## Traceability

- **Related Open Questions**: Q-014, Q-015
- **Related User Stories**: [Epics](../06-user-stories/epics.md)
- **Related Architecture/ADR**: [API Design Standards](../03-architecture/api-design-standards.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

## Change Log

| Date       | Version | Change Summary                                                                                     | Author        |
| ---------- | ------- | -------------------------------------------------------------------------------------------------- | ------------- |
| 2026-07-30 | 1.2     | Validated requirements and moved all requirements to Clarified status after implementation team review. | Product Owner |
| 2026-07-30 | 1.1     | Added FR-004-03 to FR-004-06 (reorder, export scope, Viewer restrictions, empty export handling). | Product Owner |
| 2026-03-23 | 1.0     | Initial feature requirements created.                                                              | Product Owner |

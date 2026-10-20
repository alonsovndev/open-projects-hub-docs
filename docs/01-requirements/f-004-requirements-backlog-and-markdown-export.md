# F-004 Requirements Backlog and Markdown Export

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.2                         |
| **Status**       | Accepted                    |
| **Document role** | Requirements baseline |
| **Owner**        | Product Owner               |

These requirements record the design baseline. “Clarified” describes specification status, not a passing acceptance test. See [evidence and limitations](../00-context/evidence-and-limitations.md) for implementation support and validation gaps.

## Context

- **Problem**: MVP deliverable must be easy to review and share in a consistent format.
- **Primary Persona**: Admin and Member; Client Stakeholder (read-only, via F-011)
- **In Scope**: Structured user story backlog view, approved-only Markdown export.
- **Out of Scope**: PDF export and advanced reporting analytics.

## Implementation notes

Manual story reordering (FR-004-03) remains deferred. Export filters operate on persisted story lifecycle status and creation date; local AI drafts are never part of the export. The current filename contains the project name and generation date, not the selected scope. An empty scope still produces a template, with story-count metadata allowing the UI to warn the user.

## Functional Requirements

| ID        | Requirement                                                                                            | Source               | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                            | Status    |
| --------- | ------------------------------------------------------------------------------------------------------ | -------------------- | -------- | ------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------- | --------- |
| FR-004-01 | The system provides a structured list of user stories with acceptance criteria as primary deliverable. | Open Questions Q-014 | Must     | Product Owner | Q-014                        | Each project includes a requirements backlog view listing approved user stories and their acceptance criteria. | Clarified |
| FR-004-02 | The system supports exporting project requirements to Markdown.                                        | Open Questions Q-015 | Must     | Product Owner | Q-015                        | Admin can export approved requirements as a Markdown file preserving the user story template structure.        | Clarified |
| FR-004-03 | Admin can reorder user stories in backlog view via drag-and-drop or priority field.                   | Usability            | Should   | Product Owner | —                            | Backlog view supports drag-and-drop reorder; changes persist; alternative priority field for keyboard users; order reflected in export. | Clarified |
| FR-004-04 | Export scope options include single project, filtered by status, or date range.                       | Export flexibility   | Should   | Product Owner | —                            | Export UI has scope selector; filters for persisted story status and creation date range; export file name includes the project name and generation date.                     | Clarified |
| FR-004-05 | Only Admin and Member accounts can export project requirements; the Client Review Portal offers no export. | Access control       | Must     | Product Owner | ADR-020                      | Export requires an authenticated Admin or Member; the public portal has no export endpoint or button.                 | Clarified |
| FR-004-06 | Export blocks or warns when no approved stories exist.                                                 | Data validation      | Should   | Product Owner | —                            | Export with zero approved stories shows warning "No approved stories to export"; user can cancel or export empty template.             | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                 | Metric / Target                                                                                                          | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ------------- | ---------------------------- | --------- |
| NFR-004-01 | Client-facing requirement outputs remain readable and stakeholder-friendly. | The Client Review Portal presents user stories with plain-language titles and acceptance criteria. | Should | Product Owner | — | Clarified |
| NFR-004-02 | Backlog and export views remain responsive for MVP data volume.             | Satisfies NFR-X05 performance baseline; renders within 2 seconds. | Should   | Tech Lead     | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**: Approval-state filtering, export formatting module, requirement schema consistency.
- **Risks**: Export can include unapproved or internal content; mitigation is export endpoint filtering by approval state and role.

## Traceability

- **Related Open Questions**: Q-014, Q-015
- **Related Architecture/ADR**: [API Design Standards](../03-architecture/api/api-design-standards.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

**Last Updated**: 2026-07-30

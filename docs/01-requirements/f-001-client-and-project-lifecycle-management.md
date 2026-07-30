# F-001 Client and Project Lifecycle Management

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.2                         |
| **Status**       | Review Pending              |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: Admin needs one place to manage clients and projects while enforcing MVP constraints.
- **Primary Persona**: Admin (Freelancer)
- **In Scope**: Client CRUD, project CRUD, 3 active project limit, discovery/planning phases only.
- **Out of Scope**: Delivery and handoff phases, external collaboration workflows.

## Functional Requirements

| ID        | Requirement                                                                                                              | Source               | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                                              | Status    |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | -------- | ------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- |
| FR-001-01 | The system allows an Admin to create and manage client records and associate each project with a client.                 | Overview             | Must     | Product Owner | —                            | Admin can create, view, update, and archive client records and select a client when creating or editing a project.               | Clarified |
| FR-001-02 | The system allows an Admin to create and manage projects with a maximum of three active projects per freelancer account. | Open Questions Q-001 | Must     | Product Owner | Q-001                        | Attempting to create a fourth active project is blocked and the Admin is prompted to archive an existing project.                | Clarified |
| FR-001-03 | The MVP supports only discovery and planning phases for projects.                                                        | Open Questions Q-003 | Must     | Product Owner | Q-003                        | Project status options are limited to discovery and planning; no delivery or handoff features are available in MVP UI or export. | Clarified |
| FR-001-04 | Admin can archive or delete client; deletion is blocked if client has active projects.                                  | Data integrity       | Must     | Product Owner | —                            | Archiving client preserves data; attempting to delete client with active projects shows error "Archive or reassign projects first"; deletion allowed only after projects are archived or reassigned. | Draft     |
| FR-001-05 | Admin can search and filter projects by status, client, or date.                                                        | Usability            | Should   | Product Owner | —                            | Project list has search input and filter dropdowns; search covers project name; filters for status (active/archived), client, date range; results update without page reload. | Draft     |
| FR-001-06 | Project includes required metadata: created_at, updated_at, description, and status.                                    | Data model baseline  | Must     | Product Owner | —                            | All projects store created_at and updated_at timestamps automatically; description is optional text field; status field supports "active" and "archived" values. | Draft     |
| FR-001-07 | Reactivating archived project does not count toward 3-active-project limit until status is set to active.               | Lifecycle clarity    | Must     | Product Owner | Q-001                        | Archived project can be viewed and edited without blocking; explicitly changing status to "active" triggers project limit validation; clear UI feedback if limit would be exceeded. | Draft     |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                 | Metric / Target                                                                                                                           | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status    |
| ---------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | ---------------------------- | --------- |
| NFR-001-01 | Lifecycle operations remain privacy-aligned for archival/deletion behavior. | Deleted projects become inaccessible to Admin and Viewer roles within 24 hours; archived projects are excluded from active-project limit. | Must     | Tech Lead   | Q-017, Q-018                 | Clarified |
| NFR-001-02 | Project and list views stay responsive at MVP load.                         | Satisfies NFR-X05 performance baseline (10 concurrent Admins + 20 Viewers, 100 requests/min, 3 projects per Admin, 200 stories total). Project list renders within 2 seconds. | Should   | Tech Lead   | Q-001                        | Draft     |
| NFR-001-03 | Project lifecycle data scales to MVP limits without data loss.              | Satisfies NFR-X06 scalability baseline (3 active projects per Admin, 500 total user stories without data loss).                                  | Should   | Tech Lead   | Q-001                        | Draft     |

## Dependencies and Risks

- **Dependencies**: RBAC enforcement, project persistence model, archival policy decision implementation.
- **Risks**: Active-project limit can be bypassed in edge flows; mitigation is centralized backend validation on project activation and creation.

## Traceability

- **Related Open Questions**: Q-001, Q-003, Q-017, Q-018
- **Related User Stories**: [Epics](../06-user-stories/epics.md)
- **Related Architecture/ADR**: [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

## Change Log

| Date       | Version | Change Summary                                                                             | Author        |
| ---------- | ------- | ------------------------------------------------------------------------------------------ | ------------- |
| 2026-07-30 | 1.2     | Added FR-001-04 to FR-001-07 (client deletion, search/filter, metadata, reactivation).    | Product Owner |
| 2026-03-23 | 1.1     | Updated traceability links after requirements folder flattening.                           | Product Owner |
| 2026-03-23 | 1.0     | Initial feature requirements created.                                                      | Product Owner |

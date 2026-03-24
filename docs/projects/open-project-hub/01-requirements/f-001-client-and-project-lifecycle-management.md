# F-001 Client and Project Lifecycle Management

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-03-23                  |
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

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                 | Metric / Target                                                                                                                           | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status    |
| ---------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | ---------------------------- | --------- |
| NFR-001-01 | Lifecycle operations remain privacy-aligned for archival/deletion behavior. | Deleted projects become inaccessible to Admin and Viewer roles within 24 hours; archived projects are excluded from active-project limit. | Must     | Tech Lead   | Q-017, Q-018                 | Clarified |
| NFR-001-02 | Project and list views stay responsive at MVP load.                         | With up to 3 active projects and 200 approved user stories, project list and requirements views render within 2 seconds of request.       | Should   | Tech Lead   | Q-001                        | Draft     |
| NFR-001-03 | Project lifecycle data scales to MVP limits without data loss.              | Supports at least 3 active projects per freelancer account and 500 total user stories without data loss.                                  | Should   | Tech Lead   | Q-001                        | Draft     |

## Dependencies and Risks

- **Dependencies**: RBAC enforcement, project persistence model, archival policy decision implementation.
- **Risks**: Active-project limit can be bypassed in edge flows; mitigation is centralized backend validation on project activation and creation.

## Traceability

- **Related Open Questions**: Q-001, Q-003, Q-017, Q-018
- **Related User Stories**: [Epics](../../04-user-stories/epics.md)
- **Related Architecture/ADR**: [Architecture Solution Design](../../03-architecture/architecture-solution-design.md)
- **Related Prototype**: [Prototype Brief](../../05-prototype/prototype-brief.md)

---

## Change Log

| Date       | Version | Change Summary                        | Author        |
| ---------- | ------- | ------------------------------------- | ------------- |
| 2026-03-23 | 1.0     | Initial feature requirements created. | Product Owner |

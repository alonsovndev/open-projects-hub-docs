# F-003 Access Control and Visibility Boundaries

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: MVP requires strict role boundaries and private internal context for Admin only.
- **Primary Persona**: Admin and Viewer
- **In Scope**: Admin/Viewer RBAC, collaborator restriction, internal notes privacy, viewer read-only access.
- **Out of Scope**: Multi-tenant collaboration and additional custom roles.

## Functional Requirements

| ID        | Requirement                                                                                  | Source                        | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                        | Status    |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------- | -------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------- | --------- |
| FR-003-01 | The system enforces role-based access control with Admin (full CRUD) and Viewer (read-only). | Open Questions Q-010, Q-011   | Must     | Product Owner | Q-010, Q-011                 | Viewer accounts can view project and requirement content but cannot create, edit, comment, or delete data. | Clarified |
| FR-003-02 | The MVP does not allow inviting external collaborators beyond Admin and Viewer roles.        | Open Questions Q-012          | Must     | Product Owner | Q-012                        | There is no invitation flow for collaborators beyond the single Admin and the client Viewer.               | Clarified |
| FR-003-03 | Viewer users can access readable, structured requirements and project status updates.        | User Personas (Client/Viewer) | Should   | Product Owner | —                            | Viewer can access read-only requirements and see the current project phase (discovery or planning).        | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                         | Metric / Target                                                                                                       | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | --------- |
| NFR-003-01 | Role and visibility controls align with security baseline requirements.             | OWASP Top 10 checklist satisfied; login attempts are rate-limited; passwords are stored using strong one-way hashing. | Must     | Tech Lead     | Q-010, Q-011                 | Clarified |
| NFR-003-02 | Viewer-facing requirement views remain readable for non-technical stakeholders.     | Viewer views use standard user story template with plain-language titles and omit internal notes.                     | Should   | Product Owner | —                            | Clarified |
| NFR-003-03 | Viewer and Admin requirement workflows satisfy accessibility baseline expectations. | Requirements views meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels.                      | Should   | UI/UX Lead    | —                            | Draft     |

## Dependencies and Risks

- **Dependencies**: Authorization policy layer, UI permissions gating, export filtering logic.
- **Risks**: Internal notes leakage via export/read APIs; mitigation is deny-by-default checks and role-based export contracts.

## Traceability

- **Related Open Questions**: Q-010, Q-011, Q-012, Q-019
- **Related User Stories**: [Frontend Engineer Stories](../06-user-stories/frontend-engineer-stories.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security-architecture.md)
- **Related Prototype**: [Design Direction](../05-prototype/design-direction.md)

---

## Change Log

| Date       | Version | Change Summary                                     | Author        |
| ---------- | ------- | -------------------------------------------------- | ------------- |
| 2026-03-23 | 1.1     | Restored FR-003-03 and updated traceability links. | Product Owner |
| 2026-03-23 | 1.0     | Initial feature requirements created.              | Product Owner |

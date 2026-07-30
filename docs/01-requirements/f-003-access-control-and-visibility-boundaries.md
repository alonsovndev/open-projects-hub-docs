# F-003 Access Control and Visibility Boundaries

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-07-30                  |
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
| FR-003-04 | Admin can add private internal notes to user stories; notes are never visible to Viewer role. | Privacy controls              | Should   | Product Owner | —                            | Internal notes have dedicated field; clearly labeled as "Admin Only"; Viewer API responses exclude internal notes; UI hides from Viewer. | Draft     |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                         | Metric / Target                                                                                                       | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | --------- |
| NFR-003-01 | Role and visibility controls align with security baseline requirements.             | Satisfies NFR-X01 security baseline (OWASP Top 10, rate limiting, credential protection). | Must     | Tech Lead     | Q-010, Q-011                 | Clarified |
| NFR-003-02 | Viewer-facing requirement views remain readable for non-technical stakeholders.     | Viewer views use standard user story template with plain-language titles and omit internal notes.                     | Should   | Product Owner | —                            | Clarified |
| NFR-003-03 | Viewer and Admin requirement workflows satisfy accessibility baseline expectations. | Requirements views meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels.                      | Should   | UI/UX Lead    | —                            | Draft     |
| NFR-003-04 | Session security enforced per cross-cutting session management baseline.            | Satisfies NFR-X09 (session timeout, forced logout, concurrent session policy, refresh token rotation).                           | Must     | Tech Lead   | —                            | Draft  |

## Dependencies and Risks

- **Dependencies**: Authorization policy layer, UI permissions gating, export filtering logic, F-011 Viewer Account Management for invitation and access grant workflows.
- **Risks**: Internal notes leakage via export/read APIs; mitigation is deny-by-default checks and role-based export contracts.

## Traceability

- **Related Open Questions**: Q-010, Q-011, Q-012, Q-019
- **Related User Stories**: [Frontend Engineer Stories](../06-user-stories/frontend-engineer-stories.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security-architecture.md)
- **Related Features**: [F-011: Viewer Account Management](./f-011-viewer-account-management.md)
- **Related Prototype**: [Design Direction](../05-prototype/design-direction.md)

---

## Change Log

| Date       | Version | Change Summary                                                                               | Author        |
| ---------- | ------- | -------------------------------------------------------------------------------------------- | ------------- |
| 2026-07-30 | 1.1     | Added FR-003-04 (internal notes), NFR-003-04 (session security), F-011 dependency reference. | Product Owner |
| 2026-03-23 | 1.0     | Initial feature requirements created.                                                        | Product Owner |

# F-003 Access Control and Visibility Boundaries

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.4                         |
| **Status**       | Accepted                    |
| **Readiness**    | Ready for Implementation    |
| **Owner**        | Product Owner               |

## Context

- **Problem**: MVP requires strict role boundaries between Admin, Member, and Viewer roles, scoped to one workspace per team.
- **Primary Persona**: Admin, Member, and Viewer
- **In Scope**: Admin/Member/Viewer RBAC within a workspace, workspace data isolation, viewer read-only access.
- **Out of Scope**: Cross-workspace collaboration, custom/configurable roles, and changing or revoking a role once granted (see EP4 in Out of Scope).

## Functional Requirements

| ID        | Requirement                                                                                  | Source                        | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                        | Status    |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------- | -------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------- | --------- |
| FR-003-01 | The system enforces role-based access control with Admin (full CRUD plus team management), Member (full CRUD, no team management), and Viewer (read-only). | Open Questions Q-010, Q-011   | Must     | Product Owner | Q-010, Q-011                 | Viewer accounts can view project and requirement content but cannot create, edit, comment, or delete data; Member accounts can, but cannot add, remove, or change another user's role. | Clarified |
| FR-003-02 | Every account belongs to exactly one workspace; a workspace's data is never visible to another workspace's users. Only an Admin can add Members or Viewers, and only to their own workspace, and never as a second Admin. A workspace holds at most 5 users in total (Admin, Members and Viewers; inactive and unverified accounts count). | Open Questions Q-012          | Must     | Product Owner | Q-012                        | A record belonging to another workspace answers 404 for every role, never 403; `POST /users` with `role: admin` is rejected; `POST /users` for a sixth user answers 409. | Clarified |
| FR-003-03 | Viewer users can access readable, structured requirements and project status updates.        | User Personas (Client/Viewer) | Should   | Product Owner | —                            | Viewer can access read-only requirements and see the current project phase (discovery or planning), scoped to their workspace.        | Clarified |
| FR-003-04 | The system enforces a role and workspace permission matrix across all resource types. | EP4 implementation | Must | Tech Lead | Q-012 | See permission matrix below; verified by an automated route-access-policy test enumerating every registered route. | Clarified |

## Permission Matrix

| Capability                                   | Admin | Member | Viewer |
| --------------------------------------------- | :---: | :----: | :----: |
| Clients: list / get / create / update / delete | ✅ | ✅ | ❌ |
| Projects: list / get                          | ✅ | ✅ | ✅ |
| Projects: create / update / archive / reactivate / delete | ✅ | ✅ | ❌ |
| Stories, backlog: read                        | ✅ | ✅ | ✅ |
| Stories, backlog: create / update / delete / assign / export | ✅ | ✅ | ❌ |
| Refinement (AI drafts): read, generate, approve | ✅ | ✅ | ❌ |
| Dashboard                                     | ✅ | ✅ | ✅ |
| Own AI provider keys and credits              | ✅ | ✅ | ❌ |
| Team: list workspace users                    | ✅ | ✅ | ❌ (self only) |
| Team: add a Member or Viewer                  | ✅ | ❌ | ❌ |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                         | Metric / Target                                                                                                       | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | --------- |
| NFR-003-01 | Role and visibility controls align with security baseline requirements.             | Satisfies NFR-X01 security baseline (OWASP Top 10, rate limiting, credential protection). | Must     | Tech Lead     | Q-010, Q-011                 | Clarified |
| NFR-003-02 | Viewer-facing requirement views remain readable for non-technical stakeholders.     | Viewer views use standard user story template with plain-language titles.                                             | Should   | Product Owner | —                            | Clarified |
| NFR-003-03 | Viewer and Admin requirement workflows satisfy accessibility baseline expectations. | Requirements views meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels.                      | Should   | UI/UX Lead    | —                            | Clarified |
| NFR-003-04 | Session security enforced per cross-cutting session management baseline.            | Satisfies NFR-X09 (session timeout, forced logout, concurrent session policy, refresh token rotation).                           | Must     | Tech Lead   | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**: Authorization policy layer, UI permissions gating, export filtering logic, F-011 Viewer Account Management for invitation and access grant workflows.
- **Risks**: Viewer data leakage via read APIs; mitigation is deny-by-default checks and role-based access contracts.

## Traceability

- **Related Open Questions**: Q-010, Q-011, Q-012, Q-019
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security/security-architecture.md)
- **Related Features**: [F-011: Viewer Account Management](./f-011-viewer-account-management.md)
- **Related Prototype**: [Design Direction](../05-prototype/design-direction.md)

---

**Last Updated**: 2026-09-29

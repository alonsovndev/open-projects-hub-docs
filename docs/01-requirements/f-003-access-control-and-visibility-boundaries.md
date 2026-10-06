# F-003 Access Control and Visibility Boundaries

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 2.0                         |
| **Status**       | Accepted                    |
| **Readiness**    | Ready for Implementation    |
| **Owner**        | Product Owner               |

## Context

- **Problem**: MVP requires strict role boundaries between the Admin and Members of a workspace, workspace data isolation, and a narrow public surface for clients.
- **Primary Persona**: Admin and Member (accounts); Client Stakeholder (no account, see F-011).
- **In Scope**: Admin/Member RBAC within a workspace, workspace data isolation, the public read-only Client Review route as the only anonymous data access.
- **Out of Scope**: Cross-workspace collaboration, custom/configurable roles, client accounts (superseded by [ADR-020](../04-decisions/adr-020-client-review-by-access-code.md)).

## Functional Requirements

| ID        | Requirement                                                                                  | Source                        | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                        | Status    |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------- | -------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------- | --------- |
| FR-003-01 | The system enforces role-based access control with Admin (full CRUD plus team management) and Member (full CRUD, no team management). | Open Questions Q-010, Q-011   | Must     | Product Owner | Q-010, Q-011, ADR-020        | Member accounts can create, edit, and delete clients, projects, and stories, but cannot add or remove another user or rename the workspace. | Clarified |
| FR-003-02 | Every account belongs to exactly one workspace; a workspace's data is never visible to another workspace's users. Only an Admin can add Members, and only to their own workspace, and never as a second Admin. A workspace holds at most 5 users in total (Admin and Members; inactive and unverified accounts count). | Open Questions Q-012          | Must     | Product Owner | Q-012                        | A record belonging to another workspace answers 404 for every role, never 403; `POST /users` with `role: admin` is rejected; `POST /users` for a sixth user answers 409. | Clarified |
| FR-003-03 | Client stakeholders can read a project's approved requirements and current phase without an account, through its project access code. | User Personas (Client Stakeholder) | Should   | Product Owner | ADR-020                      | `GET /viewer/{accessCode}` returns approved stories and the phase for exactly the project the code names; see F-011.        | Clarified |
| FR-003-04 | The system enforces a role and workspace permission matrix across all resource types. | EP4 implementation | Must | Tech Lead | Q-012 | See permission matrix below; verified by an automated route-access-policy test enumerating every registered route. | Clarified |

## Permission Matrix

| Capability                                   | Admin | Member | Anonymous (access code) |
| --------------------------------------------- | :---: | :----: | :---------------------: |
| Clients: list / get / create / update / delete | ✅ | ✅ | ❌ |
| Projects: list / get                          | ✅ | ✅ | ❌ |
| Projects: create / update / archive / reactivate / delete | ✅ | ✅ | ❌ |
| Project access code: view / regenerate        | ✅ | ✅ | ❌ |
| Stories, backlog: read                        | ✅ | ✅ | ✅ (approved stories of the one project the code names) |
| Stories, backlog: create / update / delete / assign / export | ✅ | ✅ | ❌ |
| Refinement (AI drafts): read, generate, approve | ✅ | ✅ | ❌ |
| Dashboard                                     | ✅ | ✅ | ❌ |
| Own AI provider keys and credits              | ✅ | ✅ | ❌ |
| Team: list workspace users                    | ✅ | ✅ | ❌ |
| Team: add / deactivate / delete a Member      | ✅ | ❌ | ❌ |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                         | Metric / Target                                                                                                       | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | --------- |
| NFR-003-01 | Role and visibility controls align with security baseline requirements.             | Satisfies NFR-X01 security baseline (OWASP Top 10, rate limiting, credential protection). | Must     | Tech Lead     | Q-010, Q-011                 | Clarified |
| NFR-003-02 | Client-facing requirement views remain readable for non-technical stakeholders.     | The Client Review Portal shows plain-language titles, descriptions, and acceptance criteria.                           | Should   | Product Owner | —                            | Clarified |
| NFR-003-03 | Client and freelancer requirement workflows satisfy accessibility baseline expectations. | Requirements views meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels.                      | Should   | UI/UX Lead    | —                            | Clarified |
| NFR-003-04 | Session security enforced per cross-cutting session management baseline.            | Satisfies NFR-X09 (session timeout, forced logout, concurrent session policy, refresh token rotation).                           | Must     | Tech Lead   | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**: Authorization policy layer, UI permissions gating, export filtering logic, F-011 Client Review Access for the public access-code route.
- **Risks**: Data leakage via the one public route; mitigation is deny-by-default checks (an automated route-access-policy test lists every public route), unguessable access codes, rate limiting, and a response that names no workspace, client, or user.

## Traceability

- **Related Open Questions**: Q-010, Q-011, Q-012, Q-019
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security/security-architecture.md)
- **Related Features**: [F-011: Client Review Access](./f-011-client-review-access.md)
- **Related Prototype**: [Design Direction](../05-prototype/design-direction.md)

---

**Last Updated**: 2026-10-02

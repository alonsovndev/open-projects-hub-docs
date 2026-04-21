# Epic: Access Control and Visibility Boundaries

**Epic Key**: EPIC-4
**Summary**: Enforce Admin and Viewer boundaries for safe collaboration.
**Labels**: access-control, visibility
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1

---

**Problem Statement:** Client-facing transparency is useful only if it does not expose internal notes or allow viewers to alter planning artifacts.

**Objective:** Enforce simple Admin and Viewer boundaries so the MVP supports safe collaboration without expanding into full multi-user workflow management.

Included scope:

- Admin full-access and Viewer read-only boundaries
- Viewer access to approved requirements and current project phase
- Internal-note isolation from Viewer views

Excluded scope:

- Extra roles, collaborator invitations, and Viewer comments
- Shared editing and real-time collaboration
- Audit-log or workflow history surfaces for end users

Related feature and requirement IDs: F-003; FR-003-01, FR-003-02, FR-003-03; NFR-003-01, NFR-003-02, NFR-003-03

Dependencies:

- [Feature Requirements](../../01-requirements/f-003-access-control-and-visibility-boundaries.md)
- [Role Mapping](../../02-planning/role-mapping.md)
- [Phased Roadmap](../../02-planning/phased-roadmap.md)
- [Security Architecture](../../03-architecture/security/security-architecture.md)
- [Sequence Diagrams](../../03-architecture/sequence-diagrams.md)

Measurable success criteria:

- Viewer access is limited to approved requirements and project phase visibility.
- No documented flow allows Viewer create, edit, comment, or delete actions.
- Internal notes are excluded from Viewer-facing views and exports.

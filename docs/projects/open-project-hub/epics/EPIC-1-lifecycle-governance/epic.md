**Epic ID**: EPIC-1
**Epic Name**: Client and Project Lifecycle Governance

---

**Problem Statement:** Freelancers need a reliable way to manage clients and projects without allowing the workspace to drift into unsupported lifecycle states or uncontrolled project sprawl.

**Objective:** Provide a stable planning workspace where Admin users can manage clients and projects under explicit MVP lifecycle and active-project constraints.

Included scope:

- Client record management and project-to-client association
- Project creation, update, archive, and active-project enforcement
- Discovery and planning as the only allowed MVP phases

Excluded scope:

- Delivery, handoff, and implementation tracking workflows
- Multi-admin team structures and collaborator invitations
- CRM, billing, or portfolio management expansion

Related feature and requirement IDs: F-001; FR-001-01, FR-001-02, FR-001-03; NFR-001-01, NFR-001-02, NFR-001-03

Dependencies:

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/f-001-client-and-project-lifecycle-management.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Database Design](../04-database/database-design.md)

Measurable success criteria:

- Admin can create, update, and archive client and project records within one planning workspace.
- Fourth active project creation is blocked consistently across documented flows.
- No MVP artifact introduces a project phase beyond discovery or planning.

Acceptance criteria:

- Given an Admin manages project records, when they create or edit a project, then the project must stay associated to a client and use only discovery or planning.
- Given an Admin already has three active projects, when they attempt to create or reactivate another project, then the flow blocks the action and guides archival first.
- Given a project is archived, when active-project limits are evaluated, then that project no longer counts toward the active limit.

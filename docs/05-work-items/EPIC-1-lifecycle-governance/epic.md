# Epic: Client and Project Lifecycle Governance

**Epic Title**: Client and Project Lifecycle Governance
**Epic Key**: EPIC-1
**Summary**: Provide stable client and project lifecycle governance.
**Labels**: lifecycle, governance
**Priority**: Must Have
**Components**: Backend, Database
**Fix Version**: MVP-1

---

**Epic Description:**
Problem Statement: Freelancers need a reliable way to manage clients and projects without allowing the workspace to drift into unsupported lifecycle states or uncontrolled project sprawl.

Objective: Provide a stable planning workspace where Admin users can manage clients and projects under explicit MVP lifecycle and active-project constraints.

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

- [Project Overview](../../overview.md)
- [Feature Requirements](../../01-requirements/f-001-client-and-project-lifecycle-management.md)
- [Phased Roadmap](../../02-planning/phased-roadmap.md)
- [Database Design](../../03-architecture/database/database-design.md)

Measurable success criteria:

- Admin can create, update, and archive client and project records within one planning workspace.
- Fourth active project creation is blocked consistently across documented flows.
- No MVP artifact introduces a project phase beyond discovery or planning.

## Release Checklist

- [ ] Version bump in package.json / pyproject.toml
- [ ] CHANGELOG.md updated with epic summary
- [ ] Git tag created (e.g., v0.5.0 for MVP)
- [ ] GitHub release published with notes
- [ ] Deployed to staging/production
- [ ] Smoke test passed


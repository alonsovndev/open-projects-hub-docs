# Epic: Secure admin access and role boundaries

**Epic Title**: Secure admin access and role boundaries
**Epic Key**: EPIC-06
**Summary**: Establish secure sign-in and consistent two-role enforcement across admin and staff workflows.
**Labels**: mvp, security, access-control, admin
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1

---

**Epic Description:**
Problem Statement: The MVP requires secure sign-in and clear role separation so content and inquiry workflows remain safe and understandable.

Objective: Deliver the two-role access model, secure admin entry, and consistent permission enforcement across protected experiences.

Included scope:

- Secure sign-in for the shared admin/staff entry point
- Two-role MVP access model for admin and staff users
- Consistent enforcement of protected workflow boundaries across admin surfaces

Excluded scope:

- Multi-factor authentication or enterprise SSO
- Advanced audit tooling or granular enterprise permission matrices
- Additional roles beyond the approved MVP admin and staff model

Related feature and requirement IDs: F-006; FR-006-01, FR-006-02, FR-006-03, FR-006-04, NFR-006-01, NFR-006-02, NFR-X06

Dependencies:

- [Project Requirements by Feature](../../01-requirements/readme.md)
- [F-006 Admin Access and Role Boundaries](../../01-requirements/f-006-admin-access-and-role-boundaries.md)
- [Role Mapping](../../02-planning/role-mapping.md)
- [Prototype Brief](../../05-prototype/prototype-brief.md)

Measurable success criteria:

- Admin and staff users authenticate through the approved secure entry point before protected workflows are shown.
- Permission checks are applied consistently across protected pages and role-scoped tasks.
- Authentication feedback stays understandable without leaking sensitive access details.

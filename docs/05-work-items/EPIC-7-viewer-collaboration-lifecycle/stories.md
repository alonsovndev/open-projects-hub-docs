# Stories for Epic: Viewer Collaboration Lifecycle

## UI/UX Designer

### US-EP7-UX-001: Viewer Invitation Flow Design

**Story ID**: US-EP7-UX-001
**Epic Link**: EPIC-7
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: design, ux, collaboration, access-control

**As a** UI/UX Designer,
**I want to** design the Viewer invitation and access management flows,
**So that** Admins can easily invite clients and manage their project access without confusion.

**Acceptance Criteria**:

- [ ] Given an Admin inviting a Viewer, when they review the flow, then it clearly communicates what access the Viewer will receive.
- [ ] Given an Admin managing existing Viewers, when they grant/revoke project access, then the UI provides clear success/error feedback.
- [ ] Given a Viewer list, when the Admin reviews it, then each Viewer's associated projects and invitation status are clearly displayed.

**Deliverables**:

- Viewer invitation flow wireframes and state maps.
- High-fidelity mockups for invite form, Viewer list, and project access toggle.
- Accessibility annotations for labels, errors, and keyboard flow.

**Dependencies**:

- [Feature Requirements: F-011](../../01-requirements/f-011-viewer-account-management.md).
- [Prototype Brief](../../04-prototype/prototype-brief.md).

**Success Metrics**:

- Admins can complete invitation and access management tasks without guidance.
- Design assets support accessible implementation across target devices.

---

## Backend Engineer

### US-EP7-BE-001: Viewer Invitation Service

**Story ID**: US-EP7-BE-001
**Epic Link**: EPIC-7
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: backend, collaboration, access-control

**As a** Backend Engineer,
**I want to** implement a service to handle viewer invitations,
**So that** Admins can securely invite clients to view projects.

**Acceptance Criteria**:

- [ ] Given an Admin provides a valid email, when they send an invitation, then a unique, single-use invitation token is generated and an invitation email is sent.
- [ ] Given a user attempts to use an invalid or expired invitation token, when they try to register, then an error is returned.
- [ ] Given an invitation is sent, when the same email is invited again, then the system handles it gracefully (e.g., resends the invite or informs the Admin).

**Deliverables**:

- API endpoints for sending and validating viewer invitations.
- Email sending integration for the invitation flow.
- Unit tests for the invitation logic.

**Dependencies**:

- [API Contract](../../03-architecture/api/api-contract.md).
- [Email Service NFR](../../01-requirements/README.md#cross-cutting-quality-baseline)

**Success Metrics**:

- Invitation emails are sent reliably.
- Invitation tokens are secure and single-use.

---

### US-EP7-BE-002: Viewer Project Access Control

**Story ID**: US-EP7-BE-002
**Epic Link**: EPIC-7
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, collaboration, access-control

**As a** Backend Engineer,
**I want to** implement endpoints to manage viewer access to projects,
**So that** Admins can control which projects a Viewer can see.

**Acceptance Criteria**:

- [ ] Given an Admin and a registered Viewer, when the Admin grants the Viewer access to a project, then the association is stored in the database.
- [ ] Given a Viewer, when they request their list of projects, then only the projects they have been granted access to are returned.
- [ ] Given an Admin revokes access, when the change is made, then the Viewer can no longer see the project.

**Deliverables**:

- API endpoints for granting and revoking viewer project access.
- Database schema to support the Admin-Viewer-Project relationship.
- Unit tests for access control logic.

**Dependencies**:

- [Database Design](../../03-architecture/database/database-design.md).
- [API Contract](../../03-architecture/api/api-contract.md).

**Success Metrics**:

- Viewer access is strictly limited to projects approved by the Admin.
- The system correctly enforces the separation of project data between different viewers.

## Frontend Engineer

### US-EP7-FE-001: Viewer Invitation Interface

**Story ID**: US-EP7-FE-001
**Epic Link**: EPIC-7
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: frontend, collaboration, access-control

**As a** Frontend Engineer,
**I want to** create an interface for Admins to manage viewers,
**So that** they can invite clients and manage their project access.

**Acceptance Criteria**:

- [ ] Given the project management dashboard, when the Admin navigates to the "Viewers" section, then they see a list of their viewers and an option to invite a new one.
- [ ] Given the invite form, when the Admin enters an email and sends it, then a request is sent to the backend.
- [ ] Given a list of viewers, when the Admin selects a viewer, then they can see which projects the viewer has access to and can grant/revoke access.

**Deliverables**:

- A UI for inviting and managing viewers.
- Forms and lists for associating viewers with projects.
- Integration with the backend invitation and access control endpoints.

**Dependencies**:

- [Prototype Brief](../../04-prototype/prototype-brief.md).
- [API Contract](../../03-architecture/api/api-contract.md).

**Success Metrics**:

- Admins can successfully manage the entire viewer lifecycle through the UI.
- The interface provides clear feedback on invitation status and access levels.

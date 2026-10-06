# Stories for Epic: Viewer Collaboration Lifecycle

> **Superseded (2026-10-02).** The Viewer role, invitations, and per-project access grants described here were replaced by account-free Client Review through a project access code. See [ADR-020](../../docs/04-decisions/adr-020-client-review-by-access-code.md) and [F-011: Client Review Access](../../docs/01-requirements/f-011-client-review-access.md). The stories below are kept as history and are not planned.

## UI/UX Designer

### US-EP7-UX-001: Viewer Invitation Flow Design

**Story ID**: US-EP7-UX-001
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: SUPERSEDED
**Fix Version**: MVP-1
**Labels**: design, ux, collaboration, access-control
**Requirements**: FR-011-01, FR-011-06, NFR-011-04

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

- [Feature Requirements: F-011](../../docs/01-requirements/f-011-client-review-access.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Admins can complete invitation and access management tasks without guidance.
- Design assets support accessible implementation across target devices.

---

## Backend Engineer

### US-EP7-BE-001: Viewer Invitation Service

**Story ID**: US-EP7-BE-001
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, collaboration, access-control
**Requirements**: FR-011-01, FR-011-02, NFR-011-01, NFR-011-03

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

- [API Contract](../../docs/03-architecture/api/api-contract.md).
- [Email Service NFR](../../docs/01-requirements/README.md#cross-cutting-quality-baseline)

**Success Metrics**:

- Invitation emails are sent reliably.
- Invitation tokens are secure and single-use.

---

### US-EP7-BE-002: Viewer Project Access Control

**Story ID**: US-EP7-BE-002
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, collaboration, access-control
**Requirements**: FR-011-04, FR-011-05, NFR-011-02, NFR-011-05

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

- [Database Design](../../docs/03-architecture/database/database-design.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Viewer access is strictly limited to projects approved by the Admin.
- The system correctly enforces the separation of project data between different viewers.

---

### US-EP7-BE-003: Invitation Lifecycle Management

**Story ID**: US-EP7-BE-003
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: backend, collaboration, access-control
**Requirements**: FR-011-07, FR-011-08, FR-011-10

**As a** Backend Engineer,
**I want to** manage the full lifecycle of Viewer invitations including expiry, revocation, and resend,
**So that** invitations remain secure and Admins retain control over the invitation process.

**Acceptance Criteria**:

- [ ] Given an invitation is sent, when the configured expiry period (e.g., 7 days) elapses, then the invitation token is invalidated and cannot be used.
- [ ] Given an Admin resends an invitation, when the new invitation is generated, then the old token is invalidated and a fresh email is sent.
- [ ] Given an Admin revokes an invitation before acceptance, when the action is taken, then the token is immediately invalidated.
- [ ] Given a Viewer attempts to register with an expired or revoked token, when they submit, then they receive a clear error with a link to request a new invitation.

**Deliverables**:

- Invitation expiry logic with configurable TTL.
- Resend and revoke invitation endpoints.
- Unit tests for expiry, resend, and revocation scenarios.

**Dependencies**:

- [Viewer Invitation Service](./stories.md#us-ep7-be-001-viewer-invitation-service).
- [Email Service NFR](../../docs/01-requirements/README.md#cross-cutting-quality-baseline).

**Success Metrics**:

- Expired invitations are consistently rejected at registration.
- Admins can resend or revoke invitations without leaving orphaned tokens.
- Zero security gaps where revoked tokens remain usable.

---

### US-EP7-BE-004: Viewer Registration and Invitation Acceptance

**Story ID**: US-EP7-BE-004
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, collaboration, access-control
**Requirements**: FR-011-03, FR-011-09, NFR-011-01

**As a** Backend Engineer,
**I want to** create the Viewer account only when a valid invitation is accepted and a password is set,
**So that** no Viewer account exists before a real person accepts their invitation.

**Acceptance Criteria**:

- [ ] Given a valid, unexpired invitation token, when the invitee submits a compliant password, then the Viewer account is created and activated.
- [ ] Given an invitation has not been accepted, when accounts are inspected, then no Viewer account exists for that email.
- [ ] Given an invitation token is used once, when it is presented again, then it is rejected.
- [ ] Given an expired or revoked token, when acceptance is attempted, then a clear error explains how to obtain a new invitation.
- [ ] Given the submitted password, when it is stored, then it is one-way hashed and meets the documented policy.

**Deliverables**:

- Invitation acceptance endpoint creating and activating the Viewer account.
- Single-use token enforcement at acceptance.
- Password policy validation and one-way hashed storage.
- Unit tests for acceptance, reuse rejection, expiry, and revocation.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-011-client-review-access.md).
- [Viewer Invitation Service](./stories.md#us-ep7-be-001-viewer-invitation-service).
- [ADR-005: Authentication](../../docs/04-decisions/adr-005-authentication.md).

**Success Metrics**:

- No Viewer account is created before invitation acceptance.
- Invitation tokens are provably single-use in tests.

---

### US-EP7-BE-005: Viewer Password Change and Access Cascade

**Story ID**: US-EP7-BE-005
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, collaboration, access-control, security
**Requirements**: FR-011-11, FR-011-12

**As a** Backend Engineer,
**I want to** let a Viewer change their own password and cascade access revocation when a project is deleted,
**So that** Viewers control their own credentials and deleted projects leave no dangling access grants.

**Acceptance Criteria**:

- [ ] Given an authenticated Viewer supplies their current password, when they submit a compliant new password, then it is updated and the old one stops working.
- [ ] Given an incorrect current password, when a change is attempted, then the request is rejected without revealing account details.
- [ ] Given a project is deleted, when the deletion completes, then every Viewer access grant for that project is revoked.
- [ ] Given a Viewer whose only granted project was deleted, when they sign in, then they see no project data and receive the documented empty or denied state.

**Deliverables**:

- Viewer self-service password change requiring the current password.
- Cascade revocation of access grants on project deletion.
- Unit tests for password change, rejection, and cascade revocation.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-011-client-review-access.md).
- [Viewer Project Access Control](./stories.md#us-ep7-be-002-viewer-project-access-control).
- [Client and Project Archival and Deletion Guards](../EPIC-1-lifecycle-governance/stories.md#us-ep1-be-003-client-and-project-archival-and-deletion-guards).

**Success Metrics**:

- Viewers change their own password without Admin involvement.
- Zero orphaned access grants remain after project deletion.

---

## Frontend Engineer

### US-EP7-FE-001: Viewer Invitation Interface

**Story ID**: US-EP7-FE-001
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: frontend, collaboration, access-control
**Requirements**: FR-011-01, FR-011-06, NFR-011-04

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

- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Admins can successfully manage the entire viewer lifecycle through the UI.
- The interface provides clear feedback on invitation status and access levels.

---

### US-EP7-FE-002: Viewer Invitation Acceptance and Password Setup

**Story ID**: US-EP7-FE-002
**Epic Link**: EPIC-7
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: frontend, collaboration, access-control
**Requirements**: FR-011-03, FR-011-09, NFR-011-04

**As a** Frontend Engineer,
**I want to** provide the invitation acceptance screen where a Viewer sets their password and completes setup,
**So that** an invited client can join and reach their read-only project view without assistance.

**Acceptance Criteria**:

- [ ] Given an invitation link, when the Viewer opens it, then the acceptance screen states which projects they will be able to view.
- [ ] Given the password field, when a non-compliant password is entered, then the policy is explained inline before submission.
- [ ] Given a valid submission, when setup completes, then the Viewer is routed to their read-only project view.
- [ ] Given an expired or revoked link, when it is opened, then a clear message explains how to request a new invitation.
- [ ] Given the acceptance screen, when navigated by keyboard and screen reader, then it meets WCAG 2.1 AA expectations.

**Deliverables**:

- Invitation acceptance and password setup screen.
- Inline password policy guidance and error states.
- Expired and revoked invitation messaging with a recovery path.

**Dependencies**:

- [Viewer Registration and Invitation Acceptance](./stories.md#us-ep7-be-004-viewer-registration-and-invitation-acceptance).
- [Design Direction](../../docs/05-prototype/design-direction.md).
- [Feature Requirements](../../docs/01-requirements/f-011-client-review-access.md).

**Success Metrics**:

- Invited Viewers complete setup unaided.
- Acceptance screen passes WCAG 2.1 AA checks.

---

## Release

### US-EP7-REL-001: Release F-011: Client Review Access

**Story ID**: US-EP7-REL-001
**Epic Link**: EPIC-7
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: release, deployment, collaboration
**Requirements**: n/a (release effort for F-011)

**As a** Tech Lead,
**I want to** promote F-011 (Viewer Account Management) to production through the tag-triggered release pipeline,
**So that** Viewer Account Management reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-011 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-011, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then an Admin invites a Viewer, the Viewer accepts and sets a password, and sees only granted projects succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-011 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering an Admin invites a Viewer, the Viewer accepts and sets a password, and sees only granted projects.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-011 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-011 stories in this epic completed.

**Success Metrics**:

- F-011 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

# Stories for Epic: User Authentication

## Backend Engineer

### US-EP2-BE-001: User Authentication Service

**Story ID**: US-EP2-BE-001
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: backend, authentication, security
**Requirements**: FR-007-01, FR-007-02, NFR-007-01, NFR-007-03

**As a** Backend Engineer,
**I want to** implement a user authentication service,
**So that** users can securely log in and access their accounts.

**Acceptance Criteria**:

- [ ] Given a user provides valid credentials, when they log in, then they are authenticated and granted access.
- [ ] Given a user provides invalid credentials, when they log in, then access is denied with an appropriate error message.
- [ ] Given a user is inactive for a set period, when they attempt to access their account, then they are logged out automatically.

**Deliverables**:

- Authentication service with login and logout endpoints.
- Token-based authentication mechanism (JWT or equivalent).
- Unit tests for authentication scenarios.

**Dependencies**:

- [ADR-005: Authentication](../../docs/04-decisions/adr-005-authentication.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Authentication flow blocks invalid access and supports valid sessions reliably.
- Core authentication scenarios are covered by automated tests.

---

### US-EP2-BE-002: Password Reset and Recovery

**Story ID**: US-EP2-BE-002
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, authentication, security
**Requirements**: FR-009-01, FR-009-02, NFR-009-01

**As a** Backend Engineer,
**I want to** implement password reset and recovery functionality,
**So that** users can regain access to their accounts if they forget their passwords.

**Acceptance Criteria**:

- [ ] Given a user requests a password reset, when they provide their email, then a reset link is sent to their email.
- [ ] Given a user clicks the reset link, when they provide a new password, then their password is updated securely.
- [ ] Given a user attempts to use an expired reset link, when they click it, then they are informed that the link is invalid.

**Deliverables**:

- Password reset and recovery endpoints.
- Secure token generation and validation for reset links.
- Unit tests for password reset scenarios.

**Dependencies**:

- [ADR-005: Authentication](../../docs/04-decisions/adr-005-authentication.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Password reset flow is secure and follows best practices.
- Automated tests cover at least 70% of core authentication and reset logic.
- Reset links expire after a configurable time period.

---

### US-EP2-BE-003: Login Lockout and Logout

**Story ID**: US-EP2-BE-003
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, authentication, security
**Requirements**: FR-007-04, FR-007-05

**As a** Backend Engineer,
**I want to** enforce account lockout after repeated failed logins and invalidate sessions on logout,
**So that** credential brute-force attempts are throttled and sessions cannot outlive an explicit logout.

**Acceptance Criteria**:

- [ ] Given 5 failed login attempts within 15 minutes, when a further attempt is made, then the account is locked for 15 minutes.
- [ ] Given a locked account, when the lockout window elapses, then login is permitted again without manual intervention.
- [ ] Given a locked account, when a login is attempted, then the response does not disclose whether the email exists.
- [ ] Given an authenticated session, when the user logs out, then the session token is invalidated server-side and cannot be replayed.

**Deliverables**:

- Failed-attempt counter with a 15-minute lockout window.
- Logout endpoint invalidating the session token server-side.
- Unit tests for lockout threshold, expiry, replay rejection, and non-enumerating responses.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-007-admin-login.md).
- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).
- [User Authentication Service](./stories.md#us-ep2-be-001-user-authentication-service).

**Success Metrics**:

- Brute-force attempts are blocked after 5 failures within 15 minutes.
- Logged-out tokens are rejected on every subsequent request.

---

### US-EP2-BE-004: Session Lifetime, Remember-Me, and Token Rotation

**Story ID**: US-EP2-BE-004
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, authentication, security, session
**Requirements**: FR-007-06, FR-007-07, NFR-003-04, NFR-X09

**As a** Backend Engineer,
**I want to** implement standard and extended session lifetimes with refresh-token rotation,
**So that** sessions stay time-bound and revocable while supporting an opt-in extended login.

**Acceptance Criteria**:

- [ ] Given a standard login, when the session is created, then it expires 24 hours after issue.
- [ ] Given a login with remember-me selected, when the session is created, then it expires 7 days after issue.
- [ ] Given a session nearing expiry, when 5 minutes remain, then the client is signalled so it can warn the user.
- [ ] Given a refresh request, when a new token is issued, then the previous refresh token is rotated out and rejected thereafter.
- [ ] Given a forced logout is triggered, when any device replays its token, then the request is rejected.

**Deliverables**:

- Session issuance supporting 24-hour and 7-day lifetimes.
- Refresh-token rotation with reuse detection.
- Forced-logout capability invalidating sessions across devices.
- Unit tests for each lifetime, rotation, expiry signalling, and forced logout.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-007-admin-login.md).
- [ADR-005: Authentication](../../docs/04-decisions/adr-005-authentication.md).
- [Session Management Enforcement](../EPIC-9-quality-baseline/stories.md#us-ep9-be-002-session-management-enforcement).

**Success Metrics**:

- Sessions expire exactly at their documented lifetime boundaries.
- Rotated refresh tokens are never accepted twice.

---

### US-EP2-BE-005: Reset Code Lifecycle and Rate Limiting

**Story ID**: US-EP2-BE-005
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, authentication, security
**Requirements**: FR-009-03, FR-009-04, NFR-009-02

**As a** Backend Engineer,
**I want to** enforce expiry, resend limits, and single-use semantics for password reset codes,
**So that** reset codes cannot be farmed, replayed, or used after their validity window.

**Acceptance Criteria**:

- [ ] Given a reset code is generated, when 5 minutes elapse, then the code is rejected as expired.
- [ ] Given a user requests a resend, when 3 requests have been made within 15 minutes, then further requests are rate-limited.
- [ ] Given a valid reset code, when it is used once, then any further use is rejected.
- [ ] Given 5 failed validation attempts, when another is made, then validation is rate-limited.
- [ ] Given a stored reset code, when the datastore is inspected, then only a hashed representation is present.

**Deliverables**:

- Reset-code expiry, single-use invalidation, and hashed storage.
- Rate limits for code requests (3 per 15 minutes) and validation attempts (5).
- Unit tests for expiry, reuse rejection, and both rate limits.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-009-reset-password.md).
- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).
- [Password Reset and Recovery](./stories.md#us-ep2-be-002-password-reset-and-recovery).

**Success Metrics**:

- Expired and reused reset codes are consistently rejected.
- Reset codes never appear in plaintext at rest or in logs.

---

## Frontend Engineer

### US-EP2-FE-001: Login Page and Authentication Flows

**Story ID**: US-EP2-FE-001
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: frontend, authentication, security
**Requirements**: FR-007-02, FR-007-03, NFR-007-02

**As a** Frontend Engineer,
**I want to** create a login page and implement authentication flows,
**So that** users can securely log in to their accounts.

**Acceptance Criteria**:

- [ ] Given the login page, when a user enters valid credentials, then they are authenticated and redirected to their dashboard.
- [ ] Given the login page, when a user enters invalid credentials, then an error message is displayed.
- [ ] Given a user is inactive for a set period, when they attempt to interact with the app, then they are redirected to the login page.

**Deliverables**:

- Login page with form validation.
- Authentication flow integration with backend endpoints.
- Error handling and user feedback for login scenarios.

**Dependencies**:

- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Login page loads in under 2 seconds.
- Automated tests cover at least 70% of core authentication and login flow logic.
- Responsive design works on mobile and desktop.

---

### US-EP2-FE-002: Password Reset Page and Flows

**Story ID**: US-EP2-FE-002
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: frontend, authentication, security
**Requirements**: FR-009-05, FR-009-06, NFR-009-03

**As a** Frontend Engineer,
**I want to** create a password reset page and implement recovery flows,
**So that** users can regain access to their accounts if they forget their passwords.

**Acceptance Criteria**:

- [ ] Given the password reset page, when a user enters their email, then a reset link is sent to their email.
- [ ] Given the reset link, when a user clicks it, then they are redirected to a page to set a new password.
- [ ] Given the reset page, when a user enters a new password, then it is validated and updated securely.

**Deliverables**:

- Password reset page with form validation.
- Recovery flow integration with backend endpoints.
- Error handling and user feedback for reset scenarios.

**Dependencies**:

- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Users can complete password reset without support intervention.
- Reset flow behavior matches backend validation and security constraints.

---

### US-EP2-FE-003: Session Expiry Warning and Remember-Me

**Story ID**: US-EP2-FE-003
**Epic Link**: EPIC-2
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: frontend, authentication, session
**Requirements**: FR-007-06, FR-007-07

**As a** Frontend Engineer,
**I want to** surface a remember-me option at login and warn the user before a session expires,
**So that** users are not logged out unexpectedly mid-task and can choose a longer session deliberately.

**Acceptance Criteria**:

- [ ] Given the login form, when it renders, then a remember-me checkbox is present, labelled, and keyboard reachable.
- [ ] Given remember-me is selected, when login succeeds, then the extended 7-day session is requested.
- [ ] Given a session with 5 minutes remaining, when the warning fires, then the user is offered a way to stay signed in.
- [ ] Given the session expires, when the user acts next, then they are redirected to login with their context explained.

**Deliverables**:

- Remember-me control wired into the login request.
- Session-expiry warning with an extend-session action.
- Expiry redirect preserving an explanatory message.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-007-admin-login.md).
- [Session Lifetime, Remember-Me, and Token Rotation](./stories.md#us-ep2-be-004-session-lifetime-remember-me-and-token-rotation).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- No user is silently logged out without a prior warning.
- Remember-me reliably produces the documented extended session.

---

## Release

### US-EP2-REL-001: Release F-007: Admin Login

**Story ID**: US-EP2-REL-001
**Epic Link**: EPIC-2
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: release, deployment, authentication
**Requirements**: n/a (release effort for F-007)

**As a** Tech Lead,
**I want to** promote F-007 (Admin Login) to production through the tag-triggered release pipeline,
**So that** Admin Login reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-007 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-007, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then an Admin can log in, reach the dashboard, be locked out after repeated failures, and log out cleanly succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-007 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering an Admin can log in, reach the dashboard, be locked out after repeated failures, and log out cleanly.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-007 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-007 stories in this epic completed.

**Success Metrics**:

- F-007 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

---

### US-EP2-REL-002: Release F-009: Reset Password

**Story ID**: US-EP2-REL-002
**Epic Link**: EPIC-2
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: release, deployment, authentication
**Requirements**: n/a (release effort for F-009)

**As a** Tech Lead,
**I want to** promote F-009 (Reset Password) to production through the tag-triggered release pipeline,
**So that** Reset Password reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-009 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-009, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then a user can request a reset code, set a new password, and log in with it while expired codes are rejected succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-009 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering a user can request a reset code, set a new password, and log in with it while expired codes are rejected.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-009 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-009 stories in this epic completed.

**Success Metrics**:

- F-009 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

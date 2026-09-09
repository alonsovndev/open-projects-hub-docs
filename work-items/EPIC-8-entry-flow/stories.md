# Stories for Epic: Entry Flow

## UI/UX Designer

### US-EP8-UX-001: Onboarding Flow Design

**Story ID**: US-EP8-UX-001
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: design, ux, onboarding, entry-flow
**Requirements**: FR-005-01, NFR-005-01

**As a** UI/UX Designer,
**I want to** design the onboarding flow,
**So that** Admin users have a clear and intuitive experience when starting the application.

**Acceptance Criteria**:

- [ ] Given the onboarding design, when a first-time Admin steps through it, then each step is labelled and remaining progress is visible.
- [ ] Given onboarding completes, when the final step closes, then a confirmation states what the Admin can do next.
- [ ] Given the onboarding design, when reviewed at the documented breakpoints, then it stays usable and meets WCAG 2.1 AA contrast, focus, and dismissal expectations.

**Deliverables**:

- Wireframes for onboarding flow.
- High-fidelity mockups for onboarding screens.
- Accessibility annotations for all components.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Onboarding flow is understandable and actionable for first-time users.
- Design assets support accessible implementation across target devices.

---

### US-EP8-UX-002: Landing Page and CTA Design

**Story ID**: US-EP8-UX-002
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: design, ux, onboarding, entry-flow
**Requirements**: FR-006-01, FR-006-02, NFR-006-02

**As a** UI/UX Designer,
**I want to** design the landing page value proposition and CTA hierarchy,
**So that** visitors can clearly identify login and account creation paths.

**Acceptance Criteria**:

- [ ] Given a first-time visitor, when they scan the above-the-fold section, then the product value proposition is clear.
- [ ] Given a first-time visitor, when they review primary actions, then login and account creation CTAs are easy to find.
- [ ] Given a keyboard-only user, when navigating primary CTAs, then focus order and labels are accessible.

**Deliverables**:

- Landing page wireframes and CTA hierarchy map.
- High-fidelity mockups for desktop and mobile breakpoints.
- Accessibility annotations for primary CTA and hero sections.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Usability review confirms visitors can identify primary entry actions without guidance.
- Design artifacts align with WCAG 2.1 AA baseline for primary interactions.

---

### US-EP8-UX-003: Account Creation Flow Design

**Story ID**: US-EP8-UX-003
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: design, ux, onboarding, entry-flow
**Requirements**: FR-008-01, NFR-008-04

**As a** UI/UX Designer,
**I want to** design a clear account creation and next-step flow,
**So that** new Admin users can register and continue without confusion.

**Acceptance Criteria**:

- [ ] Given a visitor creating an account, when invalid input is entered, then validation feedback is clear and actionable.
- [ ] Given successful registration, when the flow completes, then the user sees the next step to login or onboarding.
- [ ] Given a mobile user, when completing registration, then form steps remain readable and navigable.

**Deliverables**:

- Account creation flow wireframes and validation state map.
- High-fidelity registration and post-success screens.
- Accessibility annotations for labels, errors, and keyboard flow.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- First-time users can complete registration and identify the next action without additional support.
- Registration UI states are fully defined for success, validation, and failure paths.

---

## Backend Engineer

### US-EP8-BE-001: Onboarding Progress Tracker

**Story ID**: US-EP8-BE-001
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: backend, onboarding, entry-flow
**Requirements**: FR-005-03, NFR-005-02

**As a** Backend Engineer,
**I want to** implement an onboarding progress tracker,
**So that** Admin users can resume onboarding where they left off.

**Acceptance Criteria**:

- [ ] Given an Admin user, when onboarding is started, then progress is tracked.
- [ ] Given an Admin user, when onboarding is resumed, then the last completed step is shown.
- [ ] Given an Admin user, when onboarding is completed, then progress is marked as complete.

**Deliverables**:

- Onboarding progress tracker service.
- Unit tests for progress tracking logic.
- Documentation for onboarding process.

**Dependencies**:

- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md).
- [Database Design](../../docs/03-architecture/database/database-design.md).

**Success Metrics**:

- Progress state is persisted and restored reliably across sessions.
- Completion state transitions are test-covered and predictable.

---

### US-EP8-BE-002: Account Registration and Validation API

**Story ID**: US-EP8-BE-002
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: backend, onboarding, entry-flow
**Requirements**: FR-008-01, FR-008-02, FR-008-08, FR-008-09, NFR-008-01

**As a** Backend Engineer,
**I want to** implement account registration and secure credential validation,
**So that** new Admin users can create accounts safely and continue to the correct next step.

**Acceptance Criteria**:

- [ ] Given valid registration input, when an account is created, then the API returns a success response with next-step routing metadata.
- [ ] Given invalid or weak credentials, when registration is attempted, then the API rejects the request with safe, actionable errors.
- [ ] Given duplicate account input, when registration is attempted, then the API responds with non-sensitive guidance and does not expose internal state.

**Deliverables**:

- Registration endpoint and validation rules.
- Secure password handling aligned to security baseline.
- Unit tests for registration success and failure scenarios.

**Dependencies**:

- [Feature Requirements: F-008](../../docs/01-requirements/f-008-create-account.md).
- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Registration requests enforce required field and password policy checks.
- Core registration logic is covered by automated tests and negative-case validation.

---

### US-EP8-BE-003: Email Verification Code Lifecycle

**Story ID**: US-EP8-BE-003
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: backend, onboarding, entry-flow, security
**Requirements**: FR-008-03, FR-008-04, FR-008-05, FR-008-06, NFR-008-02, NFR-008-03

**As a** Backend Engineer,
**I want to** issue, expire, resend, and validate account verification codes,
**So that** accounts activate only after a verified email and codes cannot be farmed or replayed.

**Acceptance Criteria**:

- [ ] Given a registration is submitted, when it succeeds, then a 6-digit alphanumeric code is generated and emailed.
- [ ] Given a verification code is generated, when 5 minutes elapse, then it is rejected as expired.
- [ ] Given a user requests a resend, when 3 requests have occurred within 15 minutes, then further requests are rate-limited.
- [ ] Given 5 failed validation attempts, when another is made, then validation is rate-limited.
- [ ] Given a correct code is submitted in time, when validation succeeds, then the account is activated and the code is invalidated.
- [ ] Given a stored verification code, when the datastore is inspected, then only a hashed representation is present.

**Deliverables**:

- Verification code generation using a cryptographically secure source.
- Expiry, single-use invalidation, and hashed storage of codes.
- Resend and validation rate limits (3 per 15 minutes; 5 attempts).
- Unit tests for generation, expiry, reuse, and both rate limits.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-008-create-account.md).
- [Email Notification Service](../EPIC-9-quality-baseline/stories.md#us-ep9-be-001-email-notification-service).
- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).

**Success Metrics**:

- No account activates without a successfully validated code.
- Verification codes never appear in plaintext at rest.

---

## Frontend Engineer

### US-EP8-FE-001: Onboarding UI

**Story ID**: US-EP8-FE-001
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, onboarding, entry-flow
**Requirements**: FR-005-01, FR-005-02, NFR-005-01

**As a** Frontend Engineer,
**I want to** create an onboarding UI,
**So that** Admin users can complete onboarding tasks easily.

**Acceptance Criteria**:

- [ ] Given the onboarding UI, when a step is completed, then progress is saved.
- [ ] Given the onboarding UI, when onboarding is resumed, then the last completed step is shown.
- [ ] Given the onboarding UI, when onboarding is completed, then a success message is displayed.

**Deliverables**:

- Onboarding UI with progress tracking.
- Success and error feedback for onboarding tasks.
- Unit tests for onboarding UI logic.

**Dependencies**:

- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Users can complete onboarding with clear progress and feedback states.
- Frontend onboarding state remains synchronized with backend progress data.

---

### US-EP8-FE-002: Landing Page Entry Experience

**Story ID**: US-EP8-FE-002
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, onboarding, entry-flow
**Requirements**: FR-006-01, FR-006-02, FR-006-03, NFR-006-01

**As a** Frontend Engineer,
**I want to** implement the landing page with clear value messaging and CTAs,
**So that** visitors can start login or registration without friction.

**Acceptance Criteria**:

- [ ] Given the public landing page, when it loads, then value proposition and MVP feature summary are visible.
- [ ] Given a visitor on the landing page, when they click primary CTAs, then login and account creation routes open correctly.
- [ ] Given standard MVP load assumptions, when the page renders, then initial content is visible within 2 seconds.

**Deliverables**:

- Landing page UI with responsive hero, value section, and CTA components.
- Routing integration for login and account creation entry points.
- Unit and integration tests for entry-flow routing behavior.

**Dependencies**:

- [Feature Requirements: F-006](../../docs/01-requirements/f-006-landing-page.md).
- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Landing page clearly routes users to auth entry points across mobile and desktop.
- Rendering and interaction behavior meets documented baseline expectations.

---

### US-EP8-FE-003: Account Creation Flow and Next-Step Routing

**Story ID**: US-EP8-FE-003
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, onboarding, entry-flow
**Requirements**: FR-008-01, FR-008-07, NFR-008-04

**As a** Frontend Engineer,
**I want to** implement the account creation form with validation and post-success routing,
**So that** new Admin users can register and continue to login or onboarding seamlessly.

**Acceptance Criteria**:

- [ ] Given required registration fields, when valid input is submitted, then account creation succeeds and the user is routed to the defined next step.
- [ ] Given invalid input, when the form is submitted, then inline validation feedback is shown with clear remediation.
- [ ] Given backend registration errors, when returned, then the UI shows non-sensitive, actionable error messaging.

**Deliverables**:

- Account creation form UI and validation state handling.
- API integration for registration and next-step routing behavior.
- Unit and integration tests for success and failure scenarios.

**Dependencies**:

- [Feature Requirements: F-008](../../docs/01-requirements/f-008-create-account.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).
- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md).

**Success Metrics**:

- Users can complete registration and reach the correct follow-up screen without manual navigation.
- Registration UI behavior is consistent with backend validation and security constraints.

---

### US-EP8-FE-004: Verification Code Entry and Resend

**Story ID**: US-EP8-FE-004
**Epic Link**: EPIC-8
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, onboarding, entry-flow
**Requirements**: FR-008-03, FR-008-05, FR-008-06, FR-008-07, NFR-008-04

**As a** Frontend Engineer,
**I want to** provide the verification code entry screen with resend and clear expiry feedback,
**So that** a new user can complete verification without confusion about codes or timing.

**Acceptance Criteria**:

- [ ] Given registration completes, when the verification screen renders, then it states that a code was emailed and when it expires.
- [ ] Given an incorrect code, when it is submitted, then an inline error appears without clearing the rest of the form.
- [ ] Given an expired code, when it is submitted, then the user is told it expired and offered a resend.
- [ ] Given the resend limit is reached, when another resend is attempted, then the limit and retry timing are explained.
- [ ] Given successful verification, when it completes, then the user is routed to login or onboarding.
- [ ] Given the screen, when navigated by keyboard and screen reader, then it meets WCAG 2.1 AA expectations.

**Deliverables**:

- Verification code entry screen with expiry messaging.
- Resend control with rate-limit feedback.
- Post-verification routing to login or onboarding.

**Dependencies**:

- [Email Verification Code Lifecycle](./stories.md#us-ep8-be-003-email-verification-code-lifecycle).
- [Feature Requirements](../../docs/01-requirements/f-008-create-account.md).
- [Design Direction](../../docs/05-prototype/design-direction.md).

**Success Metrics**:

- New users complete verification without support contact.
- Verification screen passes WCAG 2.1 AA checks.

---

## Release

### US-EP8-REL-001: Release F-005: Minimal Onboarding

**Story ID**: US-EP8-REL-001
**Epic Link**: EPIC-8
**Issue Type**: Task
**Priority**: Should Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: release, deployment, onboarding
**Requirements**: n/a (release effort for F-005)

**As a** Tech Lead,
**I want to** promote F-005 (Minimal Onboarding) to production through the tag-triggered release pipeline,
**So that** Minimal Onboarding reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-005 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-005, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then a first-time Admin sees the welcome guidance and can dismiss tooltips permanently succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-005 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering a first-time Admin sees the welcome guidance and can dismiss tooltips permanently.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-005 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-005 stories in this epic completed.

**Success Metrics**:

- F-005 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

---

### US-EP8-REL-002: Release F-006: Landing Page Experience

**Story ID**: US-EP8-REL-002
**Epic Link**: EPIC-8
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: release, deployment, entry-flow
**Requirements**: n/a (release effort for F-006)

**As a** Tech Lead,
**I want to** promote F-006 (Landing Page Experience) to production through the tag-triggered release pipeline,
**So that** Landing Page Experience reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-006 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-006, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then the landing page renders its value proposition and both CTAs route correctly succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-006 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering the landing page renders its value proposition and both CTAs route correctly.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-006 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-006 stories in this epic completed.

**Success Metrics**:

- F-006 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

---

### US-EP8-REL-003: Release F-008: Account Creation

**Story ID**: US-EP8-REL-003
**Epic Link**: EPIC-8
**Issue Type**: Task
**Priority**: Should Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: release, deployment, entry-flow
**Requirements**: n/a (release effort for F-008)

**As a** Tech Lead,
**I want to** promote F-008 (Account Creation) to production through the tag-triggered release pipeline,
**So that** Account Creation reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-008 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-008, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then a new user registers, receives and enters a verification code, and reaches login or onboarding succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-008 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering a new user registers, receives and enters a verification code, and reaches login or onboarding.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-008 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-008 stories in this epic completed.

**Success Metrics**:

- F-008 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

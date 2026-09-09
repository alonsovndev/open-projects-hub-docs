# Stories for Epic: Cross-Cutting Quality Baseline

## Backend Engineer

### US-EP9-BE-001: Email Notification Service

**Story ID**: US-EP9-BE-001
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, quality, nfr, email
**Requirements**: NFR-X10

**As a** Backend Engineer,
**I want to** implement transactional email delivery with retry and rate limiting,
**So that** users reliably receive verification codes, password resets, and Viewer invitations.

**Acceptance Criteria**:

- [ ] Given a transactional email request, when sent, then it is delivered within 30 seconds (95% of cases).
- [ ] Given a failed delivery attempt, when retry logic executes, then it retries 3 times with exponential backoff.
- [ ] Given an account sends emails, when rate exceeds 10/hour, then additional requests are throttled with user feedback.
- [ ] Given a delivery failure, when all retries exhausted, then the failure is logged and the user receives actionable feedback.

**Deliverables**:

- Email service with retry/backoff logic and rate limiting.
- Unit tests for delivery success, retry, rate limit, and failure scenarios.

**Dependencies**:

- [API Contract](../../docs/03-architecture/api/api-contract.md).
- [Threat Model](../../docs/03-architecture/security/threat-model.md).

**Success Metrics**:

- 95% of emails delivered within 30 seconds under normal load.
- Core email logic is covered by automated tests.

---

### US-EP9-BE-002: Session Management Enforcement

**Story ID**: US-EP9-BE-002
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, quality, nfr, security, session
**Requirements**: NFR-X09, NFR-003-04

**As a** Backend Engineer,
**I want to** enforce session expiry, refresh rotation, and forced logout,
**So that** user sessions remain secure and manageable across devices.

**Acceptance Criteria**:

- [ ] Given a standard session, when 24 hours elapse, then the session expires and user must re-authenticate.
- [ ] Given an extended session, when 7 days elapse, then the session expires.
- [ ] Given a refresh token, when used, then it rotates (old token invalidated, new one issued).
- [ ] Given a forced logout request, when executed, then all sessions for the user are terminated.

**Deliverables**:

- Session management middleware with expiry, rotation, and forced logout.
- Unit tests for session lifecycle scenarios.

**Dependencies**:

- [ADR-005: Authentication](../../docs/04-decisions/adr-005-authentication.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Sessions expire at documented thresholds without user-facing errors.
- Forced logout propagates across all devices within 60 seconds.

---

### US-EP9-BE-003: Security Baseline Hardening

**Story ID**: US-EP9-BE-003
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, quality, nfr, security
**Requirements**: NFR-X01

**As a** Backend Engineer,
**I want to** apply OWASP Top 10 security controls across all endpoints,
**So that** the MVP is protected against common attack vectors.

**Acceptance Criteria**:

- [ ] Given login attempts, when rate exceeds threshold, then requests are blocked with generic error.
- [ ] Given password storage, when persisted, then passwords are hashed with bcrypt or equivalent strong one-way algorithm.
- [ ] Given API input, when submitted, then injection attempts (SQL, XSS) are rejected with safe errors.
- [ ] Given CORS configuration, when frontend requests are made, then only allowed origins are accepted.

**Deliverables**:

- Security middleware (rate limiting, input validation, CORS, secure headers).
- Unit tests for rate limit, hashing, injection rejection, and CORS enforcement.

**Dependencies**:

- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).
- [Threat Model](../../docs/03-architecture/security/threat-model.md).

**Success Metrics**:

- OWASP Top 10 checklist satisfied for all MVP endpoints.
- Automated tests cover all security control failure modes.

---

### US-EP9-BE-004: Privacy Deletion & Archival

**Story ID**: US-EP9-BE-004
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: backend, quality, nfr, privacy
**Requirements**: NFR-X02, NFR-001-01

**As a** Backend Engineer,
**I want to** enforce GDPR-aligned deletion and archival,
**So that** deleted projects become inaccessible within 24 hours.

**Acceptance Criteria**:

- [ ] Given a deleted project, when Admin or Viewer accesses it, then access is denied with 404 or equivalent.
- [ ] Given an archived project, when querying active projects, then it is excluded from the active-project limit.
- [ ] Given a project deletion request, when executed, then all associated data is marked inaccessible within 24 hours.

**Deliverables**:

- Deletion and archival enforcement logic.
- Unit tests for deletion, archival, and access denial scenarios.

**Dependencies**:

- [Database Design](../../docs/03-architecture/database/database-design.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Deleted projects are fully inaccessible within 24 hours.
- Archived projects do not count toward active-project limits.

---

## QA / Test Ownership

### US-EP9-QA-001: Test Coverage Visibility

**Story ID**: US-EP9-QA-001
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: qa, testing, quality, nfr
**Requirements**: NFR-X03

**As a** QA Engineer,
**I want to** report test coverage of core application logic against the 70% target on every pull request,
**So that** the team can see coverage trends and act on regressions without blocking fast MVP iteration.

**Acceptance Criteria**:

- [ ] Given a pull request, when tests run in CI, then the coverage percentage and its diff versus the base branch are posted as a PR comment.
- [ ] Given the 70% target for core application logic, when coverage falls below it, then the report flags it visibly but does not block the merge.
- [ ] Given core business logic (refinement, access control, export), when reviewed, then each function has test coverage.
- [ ] Given negative-case scenarios, when executed, then tests cover failure paths and edge cases.

**Deliverables**:

- Coverage configuration (pytest-cov backend, vitest coverage frontend) integrated into CI.
- PR comment reporting coverage percentage and diff.
- Documentation of any uncovered critical paths for manual review during PR.

**Dependencies**:

- [ADR-010: Testing Framework](../../docs/04-decisions/adr-010-testing-framework.md).
- [ADR-015: Code Quality Tooling](../../docs/04-decisions/adr-015-code-quality-tooling.md).
- [CI/CD Pipeline Scaffolding](../EPIC-0-foundational/stories.md#us-ep0-be-003-cicd-pipeline-scaffolding-and-testing-framework).

**Success Metrics**:

- Core application logic coverage trends at or above 70%.
- Every PR shows a coverage delta, making regressions visible at review time.

---

### US-EP9-QA-002: Performance & Scale Validation

**Story ID**: US-EP9-QA-002
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: qa, testing, quality, nfr
**Requirements**: NFR-X05, NFR-X06

**As a** QA Engineer,
**I want to** validate performance under MVP load assumptions,
**So that** the system meets documented responsiveness targets.

**Acceptance Criteria**:

- [ ] Given MVP load (10 Admins + 20 Viewers, 100 req/min peak), when project list renders, then it completes within 2 seconds.
- [ ] Given MVP load, when requirements view renders, then it completes within 2 seconds.
- [ ] Given 3 active projects per Admin and 500 total stories, when queried, then no data loss or degradation occurs.

**Deliverables**:

- Load test scripts for MVP load profile.
- Performance test report with pass/fail results per target.

**Dependencies**:

- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- [Phased Roadmap](../../docs/02-planning/phased-roadmap.md).

**Success Metrics**:

- All MVP performance targets met under documented load assumptions.
- No degradation or data loss at 500 total stories.

---

### US-EP9-QA-003: End-to-End Admin Journey Test Suite

**Story ID**: US-EP9-QA-003
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: qa, testing, quality, e2e, integration
**Requirements**: NFR-X03

**As a** QA Engineer,
**I want to** cover the core Admin journey end to end across frontend and backend,
**So that** the primary revenue-path workflow cannot regress unnoticed.

**Acceptance Criteria**:

- [ ] Given a new Admin account, when they complete the full MVP workflow (login, create client, create project, refine notes, approve stories, export to Markdown), then all steps succeed without errors.
- [ ] Given a project is archived or deleted, when any user accesses it, then it is excluded from active counts and access is denied as specified.
- [ ] Given the suite runs in CI, when it executes on a pull request to `main`, then failures block the merge.
- [ ] Given the suite runs repeatedly, when 10 consecutive CI runs complete, then no false-positive failures occur.

**Deliverables**:

- Playwright (or equivalent) suite covering the Admin create-to-export journey.
- Test fixtures for Admin and project data setup.
- CI integration running the suite on pull requests to `main`.

**Dependencies**:

- [Foundational Setup](../EPIC-0-foundational/epic.md) and the MVP feature epics (EPIC-1 through EPIC-5) implemented.
- [ADR-010: Testing Framework](../../docs/04-decisions/adr-010-testing-framework.md).

**Success Metrics**:

- The Admin create-to-export journey is covered end to end.
- No false-positive failures across 10 consecutive CI runs.

---

### US-EP9-QA-004: End-to-End Access and Provider Journey Test Suite

**Story ID**: US-EP9-QA-004
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: qa, testing, quality, e2e, integration
**Requirements**: NFR-X03

**As a** QA Engineer,
**I want to** cover the Viewer access and provider-key journeys end to end,
**So that** access isolation and provider fallback cannot regress unnoticed.

**Acceptance Criteria**:

- [ ] Given an Admin invites a Viewer, when the Viewer registers and logs in, then they see only the projects they were granted and cannot edit or delete anything.
- [ ] Given an Admin configures their own API key, when free credits are exhausted, then refinement continues using their key without interruption.
- [ ] Given a Viewer's access is revoked, when they next request the project, then access is denied.
- [ ] Given the suite runs in CI, when it executes on a pull request to `main`, then failures block the merge.

**Deliverables**:

- Playwright (or equivalent) suite covering Viewer access isolation and provider-key fallback.
- Test fixtures for Viewer accounts, access grants, and provider keys.
- Documentation for running the E2E suites locally and in CI.

**Dependencies**:

- [Viewer Project Access Control](../EPIC-7-viewer-collaboration-lifecycle/stories.md#us-ep7-be-002-viewer-project-access-control).
- [API Key Rotation and Provider Fallback](../EPIC-6-ai-monetization-config/stories.md#us-ep6-be-003-api-key-rotation-and-provider-fallback).
- [ADR-010: Testing Framework](../../docs/04-decisions/adr-010-testing-framework.md).

**Success Metrics**:

- Viewer isolation and provider fallback are both covered end to end.
- No false-positive failures across 10 consecutive CI runs.
---

## UI/UX Designer

### US-EP9-UX-001: Accessibility & Readability Validation

**Story ID**: US-EP9-UX-001
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: design, ux, quality, nfr, accessibility
**Requirements**: NFR-X04, NFR-X07

**As a** UI/UX Designer,
**I want to** validate accessibility and readability across all Viewer-facing views,
**So that** non-technical stakeholders can consume approved requirements without barriers.

**Acceptance Criteria**:

- [ ] Given Viewer-facing views, when audited, then they meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels.
- [ ] Given approved backlog views, when reviewed by a non-technical user, then user stories are presented in the standard template with plain-language titles.
- [ ] Given primary CTAs, when navigated by keyboard, then focus order and labels are accessible.

**Deliverables**:

- Accessibility audit report with pass/fail per WCAG 2.1 AA criterion.
- Readability validation notes with remediation list for any non-compliant views.

**Dependencies**:

- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).

**Success Metrics**:

- All Viewer-facing views pass WCAG 2.1 AA audit.
- Non-technical stakeholders confirm readability of exported and viewed requirements.

---

## Product Owner

### US-EP9-PO-001: MVP Scope and Delivery Feasibility Governance

**Story ID**: US-EP9-PO-001
**Epic Link**: EPIC-9
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: product, governance, quality, nfr
**Requirements**: NFR-X08

**As a** Product Owner,
**I want to** govern MVP scope against the delivery window and keep requirement traceability current,
**So that** the MVP stays deliverable in the planned window and every requirement keeps a documented owner.

**Acceptance Criteria**:

- [ ] Given the MVP backlog, when scope is reviewed, then every Must requirement is mapped to an epic, a story, and an owner.
- [ ] Given a proposed scope addition, when it is assessed, then its impact on the 1 to 1.5 month window is recorded before acceptance.
- [ ] Given a requirement is deferred, when the decision is made, then the deferral and its target phase are documented in the roadmap.
- [ ] Given the traceability matrix, when a story is added or removed, then the matrix is updated in the same change.

**Deliverables**:

- Scope review checkpoint covering Must requirement coverage and ownership.
- Impact assessment record for accepted or rejected scope changes.
- Updated feature traceability matrix reflecting current stories.

**Dependencies**:

- [Phased Roadmap](../../docs/02-planning/phased-roadmap.md).
- [Role Mapping](../../docs/02-planning/role-mapping.md).
- [Requirements Baseline](../../docs/01-requirements/README.md#cross-cutting-quality-baseline).

**Success Metrics**:

- MVP scope remains achievable within the documented delivery window.
- Zero Must requirements without an epic, story, and owner.

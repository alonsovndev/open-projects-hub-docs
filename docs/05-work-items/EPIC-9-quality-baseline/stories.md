# Stories for Epic: Cross-Cutting Quality Baseline

## Backend Engineer

### US-EP9-BE-001: Email Notification Service

**Story ID**: US-EP9-BE-001
**Epic Link**: EPIC-9
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, quality, nfr, security, performance

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

- [API Contract](../../03-architecture/api/api-contract.md).
- [Threat Model](../../03-architecture/security/threat-model.md).

**Success Metrics**:

- 95% of emails delivered within 30 seconds under normal load.
- Core email logic is covered by automated tests.

---

### US-EP9-BE-002: Session Management Enforcement

**Story ID**: US-EP9-BE-002
**Epic Link**: EPIC-9
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, quality, nfr, security, performance

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

- [ADR-005: Authentication](../../03-architecture/adrs/adr-005-authentication.md).
- [API Contract](../../03-architecture/api/api-contract.md).

**Success Metrics**:

- Sessions expire at documented thresholds without user-facing errors.
- Forced logout propagates across all devices within 60 seconds.

---

### US-EP9-BE-003: Security Baseline Hardening

**Story ID**: US-EP9-BE-003
**Epic Link**: EPIC-9
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, quality, nfr, security, performance

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

- [Security Architecture](../../03-architecture/security/security-architecture.md).
- [Threat Model](../../03-architecture/security/threat-model.md).

**Success Metrics**:

- OWASP Top 10 checklist satisfied for all MVP endpoints.
- Automated tests cover all security control failure modes.

---

### US-EP9-BE-004: Privacy Deletion & Archival

**Story ID**: US-EP9-BE-004
**Epic Link**: EPIC-9
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: backend, quality, nfr, security, performance

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

- [Database Design](../../03-architecture/database/database-design.md).
- [API Contract](../../03-architecture/api/api-contract.md).

**Success Metrics**:

- Deleted projects are fully inaccessible within 24 hours.
- Archived projects do not count toward active-project limits.

---

## QA / Test Ownership

### US-EP9-QA-001: Test Coverage Gate

**Story ID**: US-EP9-QA-001
**Epic Link**: EPIC-9
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: qa, testing, quality, nfr, security, performance

**As a** QA Engineer,
**I want to** enforce a ≥ 70% test coverage gate on core application logic,
**So that** the MVP ships with a measurable quality baseline.

**Acceptance Criteria**:

- [ ] Given CI/CD pipeline, when tests run, then coverage threshold (≥ 70%) is enforced and blocks merge if not met.
- [ ] Given core business logic (refinement, access control, export), when reviewed, then each function has test coverage.
- [ ] Given negative-case scenarios, when executed, then tests cover failure paths and edge cases.

**Deliverables**:

- Coverage configuration (backend + frontend) integrated into CI/CD.
- Coverage report and documentation of any uncovered critical paths.

**Dependencies**:

- [ADR-010: Testing Framework](../../03-architecture/adrs/adr-010-testing-framework.md).
- CI/CD pipeline configuration.

**Success Metrics**:

- Core application logic coverage ≥ 70%.
- CI/CD pipeline blocks merges below threshold.

---

### US-EP9-QA-002: Performance & Scale Validation

**Story ID**: US-EP9-QA-002
**Epic Link**: EPIC-9
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: qa, testing, quality, nfr, security, performance

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

- [Monitoring & Observability](../../03-architecture/ops/monitoring-observability.md).
- [Phased Roadmap](../../02-planning/phased-roadmap.md).

**Success Metrics**:

- All MVP performance targets met under documented load assumptions.
- No degradation or data loss at 500 total stories.

---

## UI/UX Designer

### US-EP9-UX-001: Accessibility & Readability Validation

**Story ID**: US-EP9-UX-001
**Epic Link**: EPIC-9
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: design, ux, quality, nfr, security, performance

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

- [Security Architecture](../../03-architecture/security/security-architecture.md).
- [Monitoring & Observability](../../03-architecture/ops/monitoring-observability.md).

**Success Metrics**:

- All Viewer-facing views pass WCAG 2.1 AA audit.
- Non-technical stakeholders confirm readability of exported and viewed requirements.

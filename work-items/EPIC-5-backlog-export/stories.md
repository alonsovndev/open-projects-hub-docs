# Stories for Epic: Backlog Export

## UI/UX Designer

### US-EP5-UX-001: Export Flow Design

**Story ID**: US-EP5-UX-001
**Epic Link**: EPIC-5
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: design, ux, backlog, export
**Requirements**: FR-004-01, FR-004-02, NFR-004-01

**As a** UI/UX Designer,
**I want to** design the export flow,
**So that** Admin users have a clear and intuitive experience when exporting the backlog.

**Acceptance Criteria**:

- [ ] Given the backlog view design, when an Admin reviews it, then the export action is discoverable without scrolling past the story list.
- [ ] Given an export completes, when the confirmation appears, then it states the filename and where the file was delivered.
- [ ] Given an export fails or has no approved stories, when the message appears, then it states the cause and the corrective action.

**Deliverables**:

- Wireframes for export flow.
- High-fidelity mockups for success and error states.
- Accessibility annotations for all components.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Export UX states are clear and reduce user confusion during failure scenarios.
- Design handoff covers success, error, and accessibility states.

---

## Backend Engineer

### US-EP5-BE-001: Backlog Export Service

**Story ID**: US-EP5-BE-001
**Epic Link**: EPIC-5
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, backlog, export
**Requirements**: FR-004-02, FR-004-05

**As a** Backend Engineer,
**I want to** implement a backlog export service,
**So that** Admin users can download the backlog as a Markdown file.

**Acceptance Criteria**:

- [ ] Given a project has approved stories, when the export endpoint is called, then a Markdown file is generated.
- [ ] Given no approved stories exist, when the export endpoint is called, then an empty file is returned with a warning.

**Deliverables**:

- Export endpoint for generating Markdown files.
- Unit tests for export logic.
- Documentation for export service.

**Dependencies**:

- [API Contract](../../docs/03-architecture/api/api-contract.md).
- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md).

**Success Metrics**:

- Exported files are generated reliably for all supported project states.
- Output respects MVP export rules and includes only approved content.

---

### US-EP5-BE-002: Structured Backlog View API

**Story ID**: US-EP5-BE-002
**Epic Link**: EPIC-5
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, backlog, export
**Requirements**: FR-004-01, NFR-004-02

**As a** Backend Engineer,
**I want to** expose approved stories with their acceptance criteria as a structured backlog,
**So that** stakeholders can review the agreed backlog without opening an export file.

**Acceptance Criteria**:

- [ ] Given approved stories exist, when the backlog is requested, then each story returns its title, story body, and acceptance criteria.
- [ ] Given unapproved drafts exist, when the backlog is requested, then drafts are excluded.
- [ ] Given a Viewer requests the backlog, when access is evaluated, then only granted projects' approved stories are returned.
- [ ] Given MVP load, when the backlog renders, then the response supports a sub-2-second view render.

**Deliverables**:

- Backlog endpoint returning approved stories with acceptance criteria.
- Approval-state and role filtering at the query layer.
- Unit and integration tests for filtering, role scoping, and response shape.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-004-requirements-backlog-and-markdown-export.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).
- [Role-Based Access Control](../EPIC-4-access-boundaries/stories.md#us-ep4-be-001-role-based-access-control).

**Success Metrics**:

- Backlog responses contain only approved content.
- Backlog queries support the documented 2-second render target.

---

### US-EP5-BE-003: Export Scoping and Empty-Export Guard

**Story ID**: US-EP5-BE-003
**Epic Link**: EPIC-5
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: backend, backlog, export
**Requirements**: FR-004-04, FR-004-06

**As a** Backend Engineer,
**I want to** let exports be scoped by project, status, or date range and guard against empty output,
**So that** an Admin exports exactly the intended slice of the backlog and never ships an empty document.

**Acceptance Criteria**:

- [ ] Given an export request scoped to a project, when it runs, then only that project's approved stories are included.
- [ ] Given a status or date-range filter, when the export runs, then only matching approved stories are included.
- [ ] Given no approved stories match the scope, when export is requested, then the request is blocked or warned with a clear explanation.
- [ ] Given a Viewer attempts an export, when authorization is evaluated, then the request is rejected with 403.

**Deliverables**:

- Export scope parameters for project, status filter, and date range.
- Empty-result guard with an explanatory response.
- Unit tests for each scope combination, the empty case, and the Viewer 403.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-004-requirements-backlog-and-markdown-export.md).
- [Backlog Export Service](./stories.md#us-ep5-be-001-backlog-export-service).
- [API Design Standards](../../docs/03-architecture/api/api-design-standards.md).

**Success Metrics**:

- Exports contain exactly the stories matching the requested scope.
- No empty export is produced without an explicit warning.

---

## Frontend Engineer

### US-EP5-FE-001: Export Button and Feedback

**Story ID**: US-EP5-FE-001
**Epic Link**: EPIC-5
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: frontend, backlog, export
**Requirements**: FR-004-02, FR-004-06

**As a** Frontend Engineer,
**I want to** implement an export button with feedback,
**So that** Admin users can download the backlog easily.

**Acceptance Criteria**:

- [ ] Given the backlog view, when the export button is clicked, then a download starts.
- [ ] Given the export is successful, when the file is downloaded, then a success message is displayed.
- [ ] Given the export fails, when the error is handled, then an error message is displayed.

**Deliverables**:

- Export button in the backlog view.
- Success and error feedback for export action.
- Unit tests for export button logic.

**Dependencies**:

- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Users can trigger export and understand result state without ambiguity.
- UI feedback remains consistent for both success and failure outcomes.

---

### US-EP5-FE-002: Backlog View and Story Reordering

**Story ID**: US-EP5-FE-002
**Epic Link**: EPIC-5
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: frontend, backlog, export
**Requirements**: FR-004-01, FR-004-03, NFR-004-01

**As a** Frontend Engineer,
**I want to** render the approved backlog and let an Admin reorder stories by priority,
**So that** the backlog reads as a reviewable plan and reflects the Admin's intended sequence.

**Acceptance Criteria**:

- [ ] Given approved stories, when the backlog view renders, then title, story body, acceptance criteria, and status appear in the documented hierarchy.
- [ ] Given an Admin reorders stories, when the change is saved, then the new order persists and is reflected in exports.
- [ ] Given a Viewer opens the backlog, when it renders, then no edit or reorder controls are present.
- [ ] Given a non-technical reader, when they review the backlog, then stories follow the standard template in plain language.
- [ ] Given the backlog under MVP load, when it renders, then it completes within 2 seconds.

**Deliverables**:

- Backlog view following the documented content hierarchy.
- Reordering interaction with persistence, available to Admins only.
- Read-only backlog rendering for Viewers.

**Dependencies**:

- [Structured Backlog View API](./stories.md#us-ep5-be-002-structured-backlog-view-api).
- [Design Direction](../../docs/05-prototype/design-direction.md).
- [Feature Requirements](../../docs/01-requirements/f-004-requirements-backlog-and-markdown-export.md).

**Success Metrics**:

- Non-technical reviewers confirm the backlog is readable without help.
- Reordered priorities survive reload and appear in exports.

---

## Release

### US-EP5-REL-001: Release F-004: Requirements Backlog and Markdown Export

**Story ID**: US-EP5-REL-001
**Epic Link**: EPIC-5
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: release, deployment, export
**Requirements**: n/a (release effort for F-004)

**As a** Tech Lead,
**I want to** promote F-004 (Requirements Backlog and Markdown Export) to production through the tag-triggered release pipeline,
**So that** Requirements Backlog and Markdown Export reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-004 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-004, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then an Admin can open the approved backlog and export it to Markdown while a Viewer is denied export succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-004 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering an Admin can open the approved backlog and export it to Markdown while a Viewer is denied export.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-004 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-004 stories in this epic completed.

**Success Metrics**:

- F-004 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

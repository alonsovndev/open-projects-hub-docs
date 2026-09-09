# Stories for Epic: Client and Project Lifecycle Governance

## UI/UX Designer

### US-EP1-UX-001: Project Lifecycle Flow Design

**Story ID**: US-EP1-UX-001
**Epic Link**: EPIC-1
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: design, ux, lifecycle, governance
**Requirements**: FR-001-01, FR-001-02, FR-001-03

**As a** UI/UX Designer,
**I want to** design the project lifecycle flow,
**So that** Admin users have a clear and intuitive experience when managing projects.

**Acceptance Criteria**:

- [ ] Given the project list design, when an Admin reviews it, then active and archived projects are distinguishable by label and grouping rather than colour alone.
- [ ] Given the create-project flow, when an Admin steps through it, then client association and phase selection are both required and clearly presented.
- [ ] Given an Admin at the three active-project limit, when they attempt to create another, then the design communicates the limit and the archive path to resolve it.

**Deliverables**:

- Wireframes for project lifecycle flow.
- High-fidelity mockups for project list and creation form.
- Accessibility annotations for all components.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md).

**Success Metrics**:

- Lifecycle flow is validated with stakeholders before implementation.
- UX artifacts provide clear handoff for engineering implementation.

---

## Backend Engineer

### US-EP1-BE-001: Client and Project CRUD Operations

**Story ID**: US-EP1-BE-001
**Epic Link**: EPIC-1
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: backend, lifecycle, governance
**Requirements**: FR-001-01, FR-001-06

**As a** Backend Engineer,
**I want to** implement CRUD operations for clients and projects,
**So that** Admin users can manage client and project records effectively.

**Acceptance Criteria**:

- [ ] Given a client record, when it is created, updated, or deleted, then the changes are persisted in the database.
- [ ] Given a project record, when it is created, updated, or archived, then the changes are persisted in the database.
- [ ] Given a project is archived, when active-project limits are evaluated, then that project no longer counts toward the active limit.

**Deliverables**:

- CRUD endpoints for clients and projects.
- Database schema for clients and projects.
- Unit tests for CRUD operations.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Database Design](../../docs/03-architecture/database/database-design.md).

**Success Metrics**:

- CRUD operations pass defined acceptance criteria and tests.
- Archival behavior aligns with active-project limit constraints.

---

### US-EP1-BE-002: Active Project Limit Enforcement

**Story ID**: US-EP1-BE-002
**Epic Link**: EPIC-1
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, lifecycle, governance
**Requirements**: FR-001-02, FR-001-03, FR-001-07

**As a** Backend Engineer,
**I want to** enforce an active-project limit of three per Admin,
**So that** the workspace remains manageable and within constraints.

**Acceptance Criteria**:

- [ ] Given an Admin has three active projects, when they attempt to create or reactivate another project, then the action is blocked.
- [ ] Given an Admin archives a project, when they attempt to create a new project, then the action is allowed.

**Deliverables**:

- Active-project limit enforcement logic.
- Unit tests for active-project limit scenarios.
- Documentation for active-project constraints.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md).

**Success Metrics**:

- Limit enforcement blocks invalid create/reactivate actions consistently.
- Constraint behavior is documented and understood by the team.

---

### US-EP1-BE-003: Client and Project Archival and Deletion Guards

**Story ID**: US-EP1-BE-003
**Epic Link**: EPIC-1
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, lifecycle, governance, privacy
**Requirements**: FR-001-04, NFR-001-01

**As a** Backend Engineer,
**I want to** implement archival and deletion for clients and projects with an active-project guard,
**So that** workspace history can be retired safely without orphaning active work or breaching privacy commitments.

**Acceptance Criteria**:

- [ ] Given a client with active projects, when deletion is requested, then the request is rejected with a clear reason.
- [ ] Given a client with no active projects, when deletion is confirmed, then the client and its archived projects are removed.
- [ ] Given a project is archived, when active-project counts are computed, then the archived project is excluded.
- [ ] Given a project is deleted, when 24 hours have elapsed, then the project data is fully inaccessible through every read path.

**Deliverables**:

- Archive and delete endpoints for clients and projects.
- Active-project guard rejecting deletion of clients with active projects.
- Hard-delete routine meeting the 24-hour inaccessibility commitment.
- Unit tests for archive, delete, guard rejection, and exclusion from limits.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-001-client-and-project-lifecycle-management.md).
- [Database Design](../../docs/03-architecture/database/database-design.md).
- [Client and Project CRUD Operations](./stories.md#us-ep1-be-001-client-and-project-crud-operations).

**Success Metrics**:

- Deletion of a client with active projects is blocked in every documented flow.
- Deleted project data is unreachable within 24 hours of the request.

---

### US-EP1-BE-004: Project Search and Filtering

**Story ID**: US-EP1-BE-004
**Epic Link**: EPIC-1
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: backend, lifecycle, governance
**Requirements**: FR-001-05, NFR-001-03

**As a** Backend Engineer,
**I want to** provide search and filtering of projects by status, client, and date,
**So that** an Admin can locate the right project quickly as the workspace accumulates history.

**Acceptance Criteria**:

- [ ] Given multiple projects, when filtering by status, then only projects in that status are returned.
- [ ] Given multiple clients, when filtering by client, then only that client's projects are returned.
- [ ] Given a date range, when filtering by created or updated date, then only projects within the range are returned.
- [ ] Given 3 active projects and 500 total stories, when a filtered query runs, then results return without degradation or data loss.

**Deliverables**:

- Search and filter query parameters on the project list endpoint.
- Indexes supporting status, client, and date filters.
- Unit and integration tests covering each filter and their combinations.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-001-client-and-project-lifecycle-management.md).
- [Database Design](../../docs/03-architecture/database/database-design.md).
- [API Design Standards](../../docs/03-architecture/api/api-design-standards.md).

**Success Metrics**:

- Filtered project queries return correct results for every documented filter.
- Query performance holds at the documented MVP scale ceiling.

---

## Frontend Engineer

### US-EP1-FE-001: Project Management UI

**Story ID**: US-EP1-FE-001
**Epic Link**: EPIC-1
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: frontend, lifecycle, governance
**Requirements**: FR-001-01, FR-001-02, NFR-001-02

**As a** Frontend Engineer,
**I want to** create a project management UI,
**So that** Admin users can manage projects visually.

**Acceptance Criteria**:

- [ ] Given the project list view, when projects are displayed, then their status (active/archived) is clearly shown.
- [ ] Given the "Create Project" button, when clicked, then a form is displayed for project creation.
- [ ] Given an Admin attempts to create a fourth active project, when the action is blocked, then a clear error message is displayed.

**Deliverables**:

- Project list view with status indicators.
- Project creation form with validation.
- Error handling for active-project limit.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Admin users can complete core project management tasks without confusion.
- UI communicates active-project constraints clearly.

---

### US-EP1-FE-002: Project Search, Filter, and Archive Controls

**Story ID**: US-EP1-FE-002
**Epic Link**: EPIC-1
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: frontend, lifecycle, governance
**Requirements**: FR-001-04, FR-001-05, FR-001-06, NFR-001-02

**As a** Frontend Engineer,
**I want to** surface search, filtering, archive, and delete controls with project metadata in the project list,
**So that** an Admin can manage a growing workspace without leaving the project list.

**Acceptance Criteria**:

- [ ] Given the project list, when an Admin filters by status, client, or date, then the list updates to match the filter.
- [ ] Given a project row, when the Admin reviews it, then created and updated dates, description, and status are visible.
- [ ] Given an Admin archives a project, when the action completes, then the project moves out of the active list with clear confirmation.
- [ ] Given an Admin deletes a client with active projects, when the request is rejected, then the reason is displayed inline.
- [ ] Given the project list under MVP load, when it renders, then it completes within 2 seconds.

**Deliverables**:

- Filter and search controls on the project list view.
- Project metadata display (created, updated, description, status).
- Archive and delete flows with confirmation and inline error handling.

**Dependencies**:

- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).
- [Project Search and Filtering](./stories.md#us-ep1-be-004-project-search-and-filtering).
- [Client and Project Archival and Deletion Guards](./stories.md#us-ep1-be-003-client-and-project-archival-and-deletion-guards).

**Success Metrics**:

- Admins complete filtering, archival, and deletion without guidance.
- Project list renders within 2 seconds under documented MVP load.

---

## Release

### US-EP1-REL-001: Release F-001: Client and Project Lifecycle Management

**Story ID**: US-EP1-REL-001
**Epic Link**: EPIC-1
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: release, deployment, lifecycle
**Requirements**: n/a (release effort for F-001)

**As a** Tech Lead,
**I want to** promote F-001 (Client and Project Lifecycle Management) to production through the tag-triggered release pipeline,
**So that** Client and Project Lifecycle Management reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-001 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-001, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then an Admin can log in, create a client, create a project, and see the active-project limit enforced succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-001 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering an Admin can log in, create a client, create a project, and see the active-project limit enforced.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-001 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-001 stories in this epic completed.

**Success Metrics**:

- F-001 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

# Stories for Epic: Access Boundaries

## UI/UX Designer

### US-EP4-UX-001: Role-Based UI Design

**Story ID**: US-EP4-UX-001
**Epic Link**: EPIC-4
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: design, ux, access-control, visibility
**Requirements**: FR-003-01, FR-003-03, NFR-003-02

**As a** UI/UX Designer,
**I want to** design role-based UI variations,
**So that** Admin and Viewer users have a clear and intuitive experience.

**Acceptance Criteria**:

- [ ] Given the Admin design, when it is reviewed, then every management control is present with an explicit text label.
- [ ] Given the Viewer design, when it is reviewed, then Admin-only controls are absent rather than disabled, and read-only content is the focus.
- [ ] Given the login screen design, when a Viewer arrives from an invitation, then the messaging reflects their read-only role.

**Deliverables**:

- Wireframes for Admin and Viewer UIs.
- High-fidelity mockups for role-based variations.
- Accessibility annotations for all components.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Role-based UX behavior is validated for clarity and consistency.
- Design artifacts support accessible handoff for implementation.

---

## Backend Engineer

### US-EP4-BE-001: Role-Based Access Control

**Story ID**: US-EP4-BE-001
**Epic Link**: EPIC-4
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: backend, access-control, visibility
**Requirements**: FR-003-01, FR-003-02, NFR-003-01

**As a** Backend Engineer,
**I want to** implement role-based access control (RBAC),
**So that** Admin and Viewer users have appropriate permissions.

**Acceptance Criteria**:

- [ ] Given an Admin token, when accessing protected endpoints, then full access is granted.
- [ ] Given a Viewer token, when accessing protected endpoints, then only read access is granted.
- [ ] Given an invalid token, when accessing any endpoint, then access is denied.

**Deliverables**:

- RBAC middleware for API endpoints.
- Unit tests for access control logic.
- Documentation for RBAC rules.

**Dependencies**:

- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Protected endpoints consistently enforce admin/viewer permissions.
- Unauthorized access attempts are reliably denied.

---

## Frontend Engineer

### US-EP4-FE-001: Role-Based UI Rendering

**Story ID**: US-EP4-FE-001
**Epic Link**: EPIC-4
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: frontend, access-control, visibility
**Requirements**: FR-003-01, FR-003-03, NFR-003-03

**As a** Frontend Engineer,
**I want to** implement role-based UI rendering,
**So that** Admin and Viewer users see appropriate controls and content.

**Acceptance Criteria**:

- [ ] Given an Admin user, when logged in, then all controls are visible.
- [ ] Given a Viewer user, when logged in, then only read-only controls are visible.
- [ ] Given no user is logged in, when accessing the app, then a login screen is displayed.

**Deliverables**:

- Conditional rendering logic for UI components.
- Role-based navigation guards.
- Unit tests for UI rendering logic.

**Dependencies**:

- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Role-specific UI controls are shown or hidden correctly across flows.
- Frontend access behavior remains aligned with backend RBAC policy.

---

## Release

### US-EP4-REL-001: Release F-003: Access Control and Visibility Boundaries

**Story ID**: US-EP4-REL-001
**Epic Link**: EPIC-4
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: release, deployment, access-control
**Requirements**: n/a (release effort for F-003)

**As a** Tech Lead,
**I want to** promote F-003 (Access Control and Visibility Boundaries) to production through the tag-triggered release pipeline,
**So that** Access Control and Visibility Boundaries reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-003 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-003, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then an Admin retains full access while a Viewer is confined to read-only views of granted projects succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-003 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering an Admin retains full access while a Viewer is confined to read-only views of granted projects.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-003 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-003 stories in this epic completed.

**Success Metrics**:

- F-003 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

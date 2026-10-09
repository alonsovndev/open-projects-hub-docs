# Stories for Epic: AI Refinement

## UI/UX Designer

### US-EP3-UX-001: Refinement Flow Design

**Story ID**: US-EP3-UX-001
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: DONE
**Fix Version**: MVP-1
**Labels**: design, ux, ai, refinement
**Requirements**: FR-002-01, FR-002-02, FR-002-03

**As a** UI/UX Designer,
**I want to** design the refinement flow, including input, loading, and preview states,
**So that** Admin users have a clear and intuitive experience when refining notes.

**Acceptance Criteria**:

- [ ] Given the refinement input screen, when an Admin opens it, then a labelled note area with guiding placeholder text and the character limit is presented.
- [ ] Given a refinement is running, when three seconds elapse, then the design shows a distinct progress state rather than an inert screen.
- [ ] Given generated draft stories, when the preview renders, then edit, discard, and approve actions are distinct and approval is visually separated from generation.

**Deliverables**:

- Wireframes for refinement flow.
- High-fidelity mockups for input, loading, and preview states.
- Accessibility annotations for all components.

**Dependencies**:

- [Project Requirements by Feature](../../docs/01-requirements/README.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Refinement UX flow is validated for clarity before implementation.
- Design artifacts cover input, loading, and preview states end-to-end.

---

## Backend Engineer

### US-EP3-BE-001: AI Refinement Service

**Story ID**: US-EP3-BE-001
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: DONE
**Fix Version**: MVP-1
**Labels**: backend, ai, refinement
**Requirements**: FR-002-01, FR-002-02, NFR-002-01, NFR-002-02

**As a** Backend Engineer,
**I want to** implement an AI refinement service that processes raw notes and generates structured user stories,
**So that** Admin users can quickly turn unstructured ideas into actionable backlog items.

**Acceptance Criteria**:

- [ ] Given raw notes, when the refinement service is called, then structured user stories are returned.
- [ ] Given invalid input, when the refinement service is called, then an error is returned with actionable feedback.
- [ ] Given a refinement session, when stories are generated, then they are stored in the database with a draft status.

**Deliverables**:

- AI refinement service with input validation.
- Database schema for storing refinement sessions and draft stories.
- Unit tests for refinement service.

**Dependencies**:

- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md).
- [Database Design](../../docs/03-architecture/database/database-design.md).

**Success Metrics**:

- Refinement service consistently returns structured outputs for valid inputs.
- Draft generation and persistence behavior is validated with tests.

---

### US-EP3-BE-002: Draft Story Persistence and Editing

**Story ID**: US-EP3-BE-002
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: SUPERSEDED
**Fix Version**: MVP-1
**Labels**: backend, ai, refinement
**Requirements**: FR-002-05

**As a** Backend Engineer,
**I want to** persist AI-generated stories as editable drafts with save, edit, and delete operations,
**So that** an Admin can shape refined output over multiple sessions before anything becomes official.

**Acceptance Criteria**:

- [ ] Given refined output, when the Admin saves it, then it is stored as an unapproved draft.
- [ ] Given a stored draft, when the Admin edits its title, story body, or acceptance criteria, then the changes persist.
- [ ] Given a stored draft, when the Admin deletes it, then it is removed and excluded from backlog and export.
- [ ] Given a draft is unapproved, when any Viewer-facing read path is queried, then the draft is not returned.

**Deliverables**:

- Draft persistence model with unapproved state.
- Save, edit, and delete endpoints for draft stories.
- Unit tests for draft lifecycle and Viewer exclusion.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-002-ai-refinement-and-approval-workflow.md).
- [Database Design](../../docs/03-architecture/database/database-design.md).
- [AI Refinement Service](./stories.md#us-ep3-be-001-ai-refinement-service).

**Success Metrics**:

- Drafts survive session boundaries without loss.
- No unapproved draft is ever visible to a Viewer.

---

### US-EP3-BE-003: Refinement Failure Handling and Retry

**Story ID**: US-EP3-BE-003
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: DONE
**Fix Version**: MVP-1
**Labels**: backend, ai, refinement
**Requirements**: FR-002-04

**As a** Backend Engineer,
**I want to** handle AI provider failures by preserving input and allowing a retry,
**So that** a provider outage never costs the Admin their raw notes or a credit.

**Acceptance Criteria**:

- [ ] Given a refinement request, when the provider returns an error or times out, then the raw input is preserved and an actionable error is returned.
- [ ] Given a failed refinement, when the Admin retries, then the preserved input is resubmitted without re-entry.
- [ ] Given a failed refinement, when credits are evaluated, then no credit is consumed.
- [ ] Given repeated provider failures, when they are logged, then the provider and failure class are captured without leaking credentials.

**Deliverables**:

- Failure handling that preserves input and returns actionable errors.
- Retry path reusing the preserved input.
- Guarantee that failures do not decrement credits.
- Unit tests for timeout, provider error, and retry-after-failure.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-002-ai-refinement-and-approval-workflow.md).
- [AI Credit Management Service](../EPIC-6-ai-monetization-config/stories.md#us-ep6-be-001-ai-credit-management-service).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Zero credit loss across induced provider failures.
- Raw input is recoverable after every failure class tested.

---

### US-EP3-BE-004: Refinement Input Validation and Sanitization

**Story ID**: US-EP3-BE-004
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: DONE
**Fix Version**: MVP-1
**Labels**: backend, ai, refinement, security
**Requirements**: FR-002-06

**As a** Backend Engineer,
**I want to** cap refinement input length and sanitize it against prompt and code injection,
**So that** untrusted note content cannot subvert the refinement pipeline or downstream rendering.

**Acceptance Criteria**:

- [ ] Given input longer than 5000 characters, when refinement is requested, then the request is rejected with a clear limit message.
- [ ] Given input containing prompt-injection or markup payloads, when it is processed, then the payload is neutralized before reaching the provider or the UI.
- [ ] Given sanitized input, when refinement runs, then legitimate plain text and bullet lists are preserved unchanged.
- [ ] Given a rejected input, when the response is returned, then the raw input is preserved for correction.

**Deliverables**:

- Input length validation at the documented 5000-character cap.
- Sanitization layer covering prompt-injection and markup payloads.
- Unit tests including injection payload cases and boundary-length input.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-002-ai-refinement-and-approval-workflow.md).
- [Threat Model](../../docs/03-architecture/security/threat-model.md).
- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).

**Success Metrics**:

- Injection payloads from the threat model are neutralized in tests.
- Legitimate note formatting survives sanitization intact.

---

### US-EP3-BE-005: Provider Selection and Credit Consumption

**Story ID**: US-EP3-BE-005
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: DONE
**Fix Version**: Phase 1
**Labels**: backend, ai, refinement, monetization
**Requirements**: FR-002-07, FR-002-08

**As a** Backend Engineer,
**I want to** let the Admin choose a provider per refinement and consume a credit only on platform success,
**So that** users control which model refines their notes and are charged only for successful platform runs.

**Acceptance Criteria**:

- [ ] Given the Admin selects the platform provider, when refinement succeeds, then exactly one credit is consumed.
- [ ] Given the Admin selects their own configured provider, when refinement succeeds, then no platform credit is consumed.
- [ ] Given a provider is selected, when the choice is submitted, then only Platform, Gemini, OpenAI, and DeepSeek are accepted.
- [ ] Given no valid provider is available, when refinement is requested, then the request is blocked with guidance to configure a key.

**Deliverables**:

- Per-request provider selection accepting only supported providers.
- Credit consumption on platform success only, integrated with the credit service.
- Unit tests for each provider path and the no-provider case.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-002-ai-refinement-and-approval-workflow.md).
- [AI Credit Management Service](../EPIC-6-ai-monetization-config/stories.md#us-ep6-be-001-ai-credit-management-service).
- [User API Key Management](../EPIC-6-ai-monetization-config/stories.md#us-ep6-be-002-user-api-key-management).

**Success Metrics**:

- Credit ledger matches successful platform refinements exactly.
- User-key refinements never touch the platform credit balance.

---

## Frontend Engineer

### US-EP3-FE-001: Refinement Input and Preview

**Story ID**: US-EP3-FE-001
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: DONE
**Fix Version**: MVP-1
**Labels**: frontend, ai, refinement
**Requirements**: FR-002-01, FR-002-02, NFR-002-02, NFR-002-03

**As a** Frontend Engineer,
**I want to** create a refinement input form and preview interface,
**So that** Admin users can submit raw notes and review generated stories.

**Acceptance Criteria**:

- [ ] Given raw notes, when submitted, then a loading indicator is shown.
- [ ] Given AI generates stories, when the response is received, then the stories are displayed in a preview interface.
- [ ] Given an error occurs, when the response is received, then an error message is displayed.

**Deliverables**:

- Refinement input form with validation.
- Preview interface for generated stories.
- Error handling for refinement process.

**Dependencies**:

- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Users can submit notes and review generated stories without dead ends.
- UI handles success and error states consistently.

---

### US-EP3-FE-002: Admin Edit and Approval Gate

**Story ID**: US-EP3-FE-002
**Epic Link**: EPIC-3
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: DONE
**Fix Version**: MVP-1
**Labels**: frontend, ai, refinement
**Requirements**: FR-002-03, FR-002-05, NFR-002-03

**As a** Frontend Engineer,
**I want to** provide an explicit edit-and-approve step before refined stories become official,
**So that** AI output is always reviewed by a human before it reaches the backlog or a Viewer.

**Acceptance Criteria**:

- [ ] Given a draft story, when the Admin edits its fields, then changes are saved without approving it.
- [ ] Given a reviewed draft, when the Admin approves it, then approval is an explicit, separate, confirmed action.
- [ ] Given an unapproved draft, when the backlog or a Viewer view is opened, then the draft is not shown.
- [ ] Given an approved story, when it is displayed, then its approved state is labelled in text, not by color alone.
- [ ] Given the approval dialog, when navigated by keyboard, then focus is trapped and it is dismissible.

**Deliverables**:

- Draft editing UI with per-field validation.
- Explicit approval action with a confirmation dialog and accessible focus handling.
- Draft versus approved state labelling in the story card.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-002-ai-refinement-and-approval-workflow.md).
- [Draft Story Persistence and Editing](./stories.md#us-ep3-be-002-draft-story-persistence-and-editing).
- [Design Direction](../../docs/05-prototype/design-direction.md).

**Success Metrics**:

- No story reaches the backlog without an explicit Admin approval.
- Approval flow passes WCAG 2.1 AA keyboard and screen-reader checks.

---

## Release

### US-EP3-REL-001: Release F-002: AI Refinement and Approval Workflow

**Story ID**: US-EP3-REL-001
**Epic Link**: EPIC-3
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: MVP-1
**Labels**: release, deployment, refinement
**Requirements**: n/a (release effort for F-002)

**As a** Tech Lead,
**I want to** promote F-002 (AI Refinement and Approval Workflow) to production through the tag-triggered release pipeline,
**So that** AI Refinement and Approval Workflow reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-002 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-002, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then an Admin can submit notes, receive refined output, edit it, and approve it into the backlog succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-002 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering an Admin can submit notes, receive refined output, edit it, and approve it into the backlog.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-002 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-002 stories in this epic completed.

**Success Metrics**:

- F-002 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

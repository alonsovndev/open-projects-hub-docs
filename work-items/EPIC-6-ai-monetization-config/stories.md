# Stories for Epic: AI Monetization and Configuration

## UI/UX Designer

### US-EP6-UX-001: API Key & Credits Settings Interface Design

**Story ID**: US-EP6-UX-001
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: design, ux, ai, monetization, configuration
**Requirements**: FR-010-01, FR-010-04, FR-010-07, NFR-010-06

**As a** UI/UX Designer,
**I want to** design the settings interface for API key management and credit status,
**So that** users can clearly understand their credit balance and configure provider keys without confusion.

**Acceptance Criteria**:

- [ ] Given a user on the settings page, when they review their AI section, then credit balance and remaining free credits are clearly visible.
- [ ] Given a user adding an API key, when they submit, then validation feedback is clear and secure (no key echoing).
- [ ] Given a user with zero credits, when they attempt refinement, then the prompt to add a key is actionable and non-blocking.

**Deliverables**:

- Settings page wireframes for credit display and API key CRUD.
- High-fidelity mockups for provider selection and key input states.
- Accessibility annotations for labels, errors, and keyboard flow.

**Dependencies**:

- [Feature Requirements: F-010](../../docs/01-requirements/f-010-ai-credits-and-api-key-management.md).
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).

**Success Metrics**:

- Users can identify their credit status and configure keys without guidance.
- Design assets support accessible implementation across target devices.

---

## Backend Engineer

### US-EP6-BE-001: AI Credit Management Service

**Story ID**: US-EP6-BE-001
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: backend, ai, monetization, configuration
**Requirements**: FR-010-01, FR-010-02, FR-010-03

**As a** Backend Engineer,
**I want to** implement a service to manage AI credits,
**So that** user's AI usage can be tracked and limited.

**Acceptance Criteria**:

- [ ] Given a new user is created, when their account is finalized, then they are allocated 5 free AI credits.
- [ ] Given a user with credits performs an AI refinement, when the action is complete, then their credit count is decremented by one.
- [ ] Given a user with zero credits attempts an AI refinement, when they do not have their own API key configured, then the action is blocked with an error message.

**Deliverables**:

- Service to track and update user AI credit counts.
- Database modifications to store credit information.
- Unit tests for credit allocation, decrementation, and blocking logic.

**Dependencies**:

- [Database Design](../../docs/03-architecture/database/database-design.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Credit system accurately tracks usage.
- The 5 free credits are correctly allocated to new users.

---

### US-EP6-BE-002: User API Key Management

**Story ID**: US-EP6-BE-002
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, ai, monetization, configuration
**Requirements**: FR-010-04, FR-010-05, FR-010-07, FR-010-08, NFR-010-01, NFR-010-02

**As a** Backend Engineer,
**I want to** create endpoints for managing user API keys,
**So that** users can securely store and use their own AI provider credentials.

**Acceptance Criteria**:

- [ ] Given a user provides a valid API key for a supported provider, when they save it, then the key is securely encrypted and stored.
- [ ] Given a user has a saved API key, when they perform an AI refinement, then the system uses their key instead of the platform's.
- [ ] Given a user deletes their API key, when they save the change, then the key is removed from the system.

**Deliverables**:

- API endpoints for CRUD operations on user API keys.
- Secure storage mechanism for encrypted keys.
- Unit tests for API key management.

**Dependencies**:

- [ADR-011: Secrets Management](../../docs/04-decisions/adr-011-secrets-management.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- User API keys are stored securely.
- The system correctly prioritizes user keys over platform credits/keys.

---

### US-EP6-BE-003: API Key Rotation and Provider Fallback

**Story ID**: US-EP6-BE-003
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, ai, monetization, configuration, security
**Requirements**: FR-010-11, NFR-010-02, NFR-010-04

**As a** Backend Engineer,
**I want to** implement API key rotation support and provider fallback behavior,
**So that** users can rotate compromised keys and refinement remains available when a provider is unreachable.

**Acceptance Criteria**:

- [ ] Given a user replaces their API key, when the new key is saved, then the old key is invalidated and cannot be used for subsequent requests.
- [ ] Given a user's configured provider (e.g., OpenAI) returns an error or rate limit, when refinement is requested, then the system attempts fallback to the next available provider (Gemini, DeepSeek) if configured.
- [ ] Given no provider is reachable and no credits remain, when refinement is attempted, then a clear error indicates the specific failure (provider down, rate limited, or no credits).
- [ ] Given an API key is stored, when inspected in logs or error reports, then it is never exposed in plaintext (masked or redacted).

**Deliverables**:

- Key rotation logic with old-key invalidation on replacement.
- Provider fallback chain (OpenAI → Gemini → DeepSeek) with configurable priority.
- Key masking in logs, error messages, and API responses.
- Unit tests for rotation, fallback, and key-exposure prevention.

**Dependencies**:

- [ADR-011: Secrets Management](../../docs/04-decisions/adr-011-secrets-management.md).
- [AI Refinement Service](../EPIC-3-ai-refinement/stories.md#us-ep3-be-001-ai-refinement-service).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Old API keys are rejected immediately after rotation.
- Fallback provider serves refinement requests when primary is unavailable.
- Zero plaintext API key exposures in logs or responses.

---

### US-EP6-BE-004: Provider Error Messaging and Quota Warnings

**Story ID**: US-EP6-BE-004
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, ai, monetization, configuration
**Requirements**: FR-010-10, FR-010-12, NFR-010-02

**As a** Backend Engineer,
**I want to** return actionable provider error messages and warn as provider quota nears exhaustion,
**So that** users understand why a refinement failed and can act before their quota runs out.

**Acceptance Criteria**:

- [ ] Given a provider returns an error, when it is surfaced, then the message states the cause and the corrective action without exposing the key.
- [ ] Given a provider reports quota consumption at or above roughly 80%, when the user next views their settings or refines, then a warning is shown.
- [ ] Given an invalid or expired key is detected during refinement, when the error returns, then the user is prompted to update that provider's key.
- [ ] Given any provider error is logged, when logs are inspected, then no API key material is present.

**Deliverables**:

- Provider error mapping to actionable, guidance-bearing messages.
- Quota-threshold warning at approximately 80% consumption.
- Key-redaction assertions in logging and error paths.
- Unit tests per provider for error mapping, quota warning, and redaction.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-010-ai-credits-and-api-key-management.md).
- [User API Key Management](./stories.md#us-ep6-be-002-user-api-key-management).
- [ADR-011: Secrets Management](../../docs/04-decisions/adr-011-secrets-management.md).

**Success Metrics**:

- Every provider error class maps to an actionable user message.
- Zero key material appears in logs or error responses under test.

---

### US-EP6-BE-005: Key Deletion Fallback and Validation Rate Limiting

**Story ID**: US-EP6-BE-005
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: backend, ai, monetization, configuration, security
**Requirements**: FR-010-09, NFR-010-03, NFR-010-04

**As a** Backend Engineer,
**I want to** handle key deletion fallback behavior and rate-limit key validation attempts,
**So that** removing a key degrades predictably and validation cannot be used to probe provider APIs.

**Acceptance Criteria**:

- [ ] Given a user deletes their only API key, when they have platform credits remaining, then refinement reverts to platform credits.
- [ ] Given a user deletes their only API key, when they have zero platform credits, then refinement is blocked with a prompt to add a key.
- [ ] Given 5 key-validation attempts within an hour, when another is made, then validation is rate-limited.
- [ ] Given a key is deleted, when the record is inspected, then the key material is hard-deleted rather than soft-deleted.

**Deliverables**:

- Deletion fallback logic covering both credit states.
- Validation rate limit of 5 attempts per hour.
- Hard-delete behavior for removed key material.
- Unit tests for both fallback paths, the rate limit, and hard deletion.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-010-ai-credits-and-api-key-management.md).
- [AI Credit Management Service](./stories.md#us-ep6-be-001-ai-credit-management-service).
- [Security Architecture](../../docs/03-architecture/security/security-architecture.md).

**Success Metrics**:

- Key deletion never leaves refinement in an undefined state.
- Deleted keys are unrecoverable from storage.

---

## Frontend Engineer

### US-EP6-FE-001: API Key Management Interface

**Story ID**: US-EP6-FE-001
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: frontend, ai, monetization, configuration
**Requirements**: FR-010-04, FR-010-06, FR-010-07, NFR-010-06

**As a** Frontend Engineer,
**I want to** create a settings page for API key management,
**So that** users can configure their own AI provider keys.

**Acceptance Criteria**:

- [ ] Given the settings page, when a user navigates to it, then they see options to add, view, and delete API keys.
- [ ] Given a user adds a new key, when they submit the form, then the key is sent to the backend.
- [ ] Given the user's free credits are exhausted, when they attempt an AI refinement, then they are prompted to add their own API key.

**Deliverables**:

- A settings page or modal for API key management.
- Integration with backend endpoints for managing keys.
- UI feedback for credit status and key configuration.

**Dependencies**:

- [Prototype Brief](../../docs/05-prototype/prototype-brief.md).
- [API Contract](../../docs/03-architecture/api/api-contract.md).

**Success Metrics**:

- Users can manage their API keys through the UI.
- The UI clearly communicates credit status and prompts for key entry when needed.

---

### US-EP6-FE-002: Credit Balance and Provider Selector

**Story ID**: US-EP6-FE-002
**Epic Link**: EPIC-6
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: frontend, ai, monetization, configuration
**Requirements**: FR-010-03, FR-010-06, NFR-010-05, NFR-010-06

**As a** Frontend Engineer,
**I want to** display the credit balance and offer a provider selector when valid keys exist,
**So that** users always know what will be charged and which model will run before they refine.

**Acceptance Criteria**:

- [ ] Given a user with platform credits, when they open refinement or settings, then the remaining credit balance is visible.
- [ ] Given a user with at least one valid provider key, when they start a refinement, then a provider selector is presented.
- [ ] Given a user with zero credits and no key, when they attempt refinement, then an actionable prompt to add a key is shown.
- [ ] Given the credit balance and key settings, when they load, then they render within 500 milliseconds.
- [ ] Given the settings interface, when navigated by keyboard and screen reader, then it meets WCAG 2.1 AA labelling and focus expectations.

**Deliverables**:

- Credit balance display in refinement and settings surfaces.
- Provider selector shown when valid keys exist.
- Zero-credit prompt with a direct path to key configuration.

**Dependencies**:

- [Feature Requirements](../../docs/01-requirements/f-010-ai-credits-and-api-key-management.md).
- [API Key Management Interface](./stories.md#us-ep6-fe-001-api-key-management-interface).
- [Design Direction](../../docs/05-prototype/design-direction.md).

**Success Metrics**:

- Users can state their credit balance and active provider without assistance.
- Credit and key views load within the 500 millisecond target.

---

## Release

### US-EP6-REL-001: Release F-010: AI Credits and API Key Management

**Story ID**: US-EP6-REL-001
**Epic Link**: EPIC-6
**Issue Type**: Task
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: release, deployment, monetization
**Requirements**: n/a (release effort for F-010)

**As a** Tech Lead,
**I want to** promote F-010 (AI Credits and API Key Management) to production through the tag-triggered release pipeline,
**So that** AI Credits and API Key Management reaches users in a verifiable, observable, and reversible release.

**Acceptance Criteria**:

- [ ] Given every F-010 story in this epic is complete on `dev`, when the release PR to `main` is opened, then lint, test, type-check, docs, and `terraform plan` checks pass and 2 approvals are obtained.
- [ ] Given the release PR is merged, when the release pipeline completes, then a sha-tagged candidate image exists in ECR and no deployment has yet occurred.
- [ ] Given pending Alembic migrations for F-010, when they are reviewed, then they are confirmed backward-compatible with the currently running version.
- [ ] Given the semver impact is assessed, when the version is decided, then `package.json` / `pyproject.toml` are bumped (MINOR for a new feature) and `CHANGELOG.md` records the change.
- [ ] Given a `vX.Y.Z` tag is pushed on `main`, when the deployment pipeline runs, then `terraform apply` completes, the candidate image is promoted to App Runner, and the frontend is published to S3 with CloudFront invalidated.
- [ ] Given the deployment completes, when the post-deploy smoke test runs against production, then a verified user receives free credits, can save and validate a provider key, and refine with it succeeds.
- [ ] Given the release is live, when Sentry is checked, then a release exists for the commit SHA, source maps are uploaded, and release health is compared against the pre-deployment error baseline.
- [ ] Given a regression is detected after release, when rollback is required, then the documented path is followed (redeploy the previous ECR image; fix-forward is the default).

**Deliverables**:

- Release PR `dev` -> `main` covering F-010 with green checks and 2 approvals.
- Version bump, `CHANGELOG.md` entry, and `vX.Y.Z` tag pushed on `main`.
- Production smoke test covering a verified user receives free credits, can save and validate a provider key, and refine with it.
- Sentry release created with the commit SHA and source maps uploaded.
- GitHub release notes published describing the F-010 change.

**Dependencies**:

- [Production Deployment Pipeline](../EPIC-0-foundational/stories.md#us-ep0-be-005-production-deployment-pipeline).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- All F-010 stories in this epic completed.

**Success Metrics**:

- F-010 is live in production behind a `vX.Y.Z` tag with zero manual infrastructure steps.
- Post-release error rate stays within the pre-deployment baseline for the first 24 hours.
- Rollback path is verified as documented and executable.

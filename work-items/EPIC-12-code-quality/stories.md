# Stories for Epic: Code Quality and Maintainability

## Backend Engineer

### US-EP12-BE-001: Python Linting, Formatting, and Type Checking

**Story ID**: US-EP12-BE-001
**Epic Link**: EPIC-12
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, code-quality, tooling
**Requirements**: NFR-X03

**As a** Backend Engineer,
**I want to** configure Ruff and mypy strict for the backend codebase,
**So that** Python style and type errors are caught automatically and consistently.

**Acceptance Criteria**:

- [ ] Given the backend codebase, when Ruff runs, then linting and formatting are applied from a single shared configuration.
- [ ] Given the backend codebase, when mypy runs in strict mode, then type errors fail the check.
- [ ] Given a full-codebase Ruff run, when timed, then it completes in about a second.
- [ ] Given a developer's editor, when the language server is configured, then the same rules apply locally as in CI.

**Deliverables**:

- Ruff configuration covering lint and format rules.
- mypy strict configuration with any documented per-module exemptions.
- Editor integration notes for the chosen tooling.

**Dependencies**:

- [ADR-015: Code Quality Tooling](../../docs/04-decisions/adr-015-code-quality-tooling.md).
- [Backend Modular Monolith Structure](../EPIC-0-foundational/stories.md#us-ep0-be-001-backend-modular-monolith-structure-and-scaffolding).

**Success Metrics**:

- Backend lint, format, and type checks pass from a single configuration.
- Local and CI results agree.

---

### US-EP12-BE-002: Pre-commit Hooks with Secret Detection

**Story ID**: US-EP12-BE-002
**Epic Link**: EPIC-12
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, code-quality, tooling, security
**Requirements**: NFR-X01

**As a** Backend Engineer,
**I want to** install the pre-commit framework with auto-fix hooks and gitleaks secret detection,
**So that** issues are fixed before commit and credentials never enter git history.

**Acceptance Criteria**:

- [ ] Given a staged Python change, when the commit runs, then Ruff lint and format hooks auto-fix what they can.
- [ ] Given a staged TypeScript change, when the commit runs, then ESLint and Prettier hooks auto-fix what they can.
- [ ] Given a type error, when the commit runs, then the mypy hook fails the commit.
- [ ] Given a staged file containing a credential pattern, when the commit runs, then gitleaks blocks the commit.
- [ ] Given file hygiene issues (trailing whitespace, merge conflict markers, oversized files), when the commit runs, then the relevant hook reports them.
- [ ] Given hooks are bypassed with `--no-verify`, when the pull request runs, then CI still enforces the same checks.

**Deliverables**:

- `.pre-commit-config.yaml` covering Ruff, ESLint, Prettier, mypy, gitleaks, and file checks.
- Contributor setup instructions for installing the hooks.
- Verification that CI enforces the same checks independently.

**Dependencies**:

- [ADR-015: Code Quality Tooling](../../docs/04-decisions/adr-015-code-quality-tooling.md).
- [Python Linting, Formatting, and Type Checking](./stories.md#us-ep12-be-001-python-linting-formatting-and-type-checking).
- [TypeScript Linting, Formatting, and Type Checking](./stories.md#us-ep12-fe-001-typescript-linting-formatting-and-type-checking).

**Success Metrics**:

- No secret reaches a commit under test conditions.
- Hook execution stays within a few seconds after the first cached run.

---

### US-EP12-BE-003: CI Quality Workflow and Commit Convention Checks

**Story ID**: US-EP12-BE-003
**Epic Link**: EPIC-12
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, code-quality, ci
**Requirements**: NFR-X03

**As a** Backend Engineer,
**I want to** enforce lint, format, type, and commit-convention checks as CI status checks,
**So that** CI is the authoritative quality gate regardless of local developer setup.

**Acceptance Criteria**:

- [ ] Given a pull request, when CI runs, then lint, format, and type checks execute for both stacks and must pass to merge.
- [ ] Given a pull request title, when it does not follow Conventional Commits, then the title check fails.
- [ ] Given the branch protection configuration, when it is inspected, then these checks are required on `dev` and on `main`.
- [ ] Given the full quality workflow, when timed, then it stays within the documented CI runtime target.

**Deliverables**:

- CI workflow running lint, format, and type checks for backend and frontend.
- Pull request title validation against Conventional Commits.
- Branch protection updated to require the new checks.

**Dependencies**:

- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).
- [ADR-016: Git Workflow and Branch Strategy](../../docs/04-decisions/adr-016-git-workflow-strategy.md).
- [CI/CD Pipeline Scaffolding](../EPIC-0-foundational/stories.md#us-ep0-be-003-cicd-pipeline-scaffolding-and-testing-framework).

**Success Metrics**:

- Non-conforming pull requests cannot merge.
- Quality workflow runtime stays within the CI target.

---

### US-EP12-BE-004: Architecture Dependency Guard Tests

**Story ID**: US-EP12-BE-004
**Epic Link**: EPIC-12
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, code-quality, architecture
**Requirements**: NFR-X03

**As a** Backend Engineer,
**I want to** add automated tests asserting the Clean Architecture dependency direction,
**So that** layering erosion fails the build instead of being found late in review.

**Acceptance Criteria**:

- [ ] Given a domain module, when it imports an infrastructure or framework module, then the guard test fails.
- [ ] Given an application module, when it imports a web or transport concern directly, then the guard test fails.
- [ ] Given a conforming change, when the guard tests run, then they pass without manual configuration.
- [ ] Given a new module is added, when the guard runs, then it is covered without editing the test.

**Deliverables**:

- Dependency-direction guard tests covering the documented layer boundaries.
- Documented allowed dependency directions.
- Guard tests wired into the standard test run.

**Dependencies**:

- [ADR-001: High-Level Architecture Pattern](../../docs/04-decisions/adr-001-high-level-architecture.md).
- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md).
- [Architecture Styles](../../docs/03-architecture/core/architecture-styles.md).

**Success Metrics**:

- A deliberate layering violation fails the suite.
- New modules are covered without test maintenance.

---

### US-EP12-BE-005: Dependency Review Process

**Story ID**: US-EP12-BE-005
**Epic Link**: EPIC-12
**Issue Type**: Story
**Priority**: Could Have
**Effort Estimate**: 2
**Status**: TODO
**Labels**: backend, code-quality, security
**Requirements**: NFR-X01

**As a** Backend Engineer,
**I want to** document and apply a manual dependency review step during pull request review,
**So that** new or upgraded dependencies get scrutiny while automated scanning stays disabled.

**Acceptance Criteria**:

- [ ] Given a pull request adding or upgrading a dependency, when it is reviewed, then the reviewer records purpose, licence, and maintenance status.
- [ ] Given a dependency with no recent maintenance, when it is proposed, then an alternative is considered and the decision recorded.
- [ ] Given the review process, when documented, then it states that automated scanning is deliberately disabled for MVP and when to revisit.

**Deliverables**:

- Documented dependency review checklist in the contributing guidance.
- Pull request review step covering dependency changes.
- Recorded revisit trigger for enabling automated scanning.

**Dependencies**:

- [ADR-015: Code Quality Tooling](../../docs/04-decisions/adr-015-code-quality-tooling.md).
- [Threat Model](../../docs/03-architecture/security/threat-model.md).

**Success Metrics**:

- Every dependency change carries a recorded review decision.
- The revisit trigger for automated scanning is explicit.

---

## Frontend Engineer

### US-EP12-FE-001: TypeScript Linting, Formatting, and Type Checking

**Story ID**: US-EP12-FE-001
**Epic Link**: EPIC-12
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: frontend, code-quality, tooling
**Requirements**: NFR-X03

**As a** Frontend Engineer,
**I want to** configure ESLint, Prettier, and the TypeScript compiler for the frontend,
**So that** frontend style and type errors are caught automatically and consistently.

**Acceptance Criteria**:

- [ ] Given the frontend codebase, when ESLint runs with the TypeScript and React rule sets, then violations are reported and auto-fixed where possible.
- [ ] Given the frontend codebase, when Prettier runs, then formatting is applied without conflicting with ESLint.
- [ ] Given the frontend codebase, when `tsc --noEmit` runs, then type errors fail the check.
- [ ] Given React hooks usage, when linted, then hooks rule violations are reported as errors.

**Deliverables**:

- ESLint configuration with TypeScript and React rules.
- Prettier configuration integrated through eslint-config-prettier.
- TypeScript strict configuration and a type-check script.

**Dependencies**:

- [ADR-015: Code Quality Tooling](../../docs/04-decisions/adr-015-code-quality-tooling.md).
- [React App Scaffolding](../EPIC-0-foundational/stories.md#us-ep0-fe-001-react-app-scaffolding-and-development-environment).

**Success Metrics**:

- Frontend lint, format, and type checks pass from a single configuration.
- Hooks rule violations are caught before review.

---

## QA / Test Ownership

### US-EP12-QA-001: Coverage Reporting on Pull Requests

**Story ID**: US-EP12-QA-001
**Epic Link**: EPIC-12
**Issue Type**: Story
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: qa, code-quality, testing
**Requirements**: NFR-X03

**As a** QA Engineer,
**I want to** report test coverage and its diff on every pull request without blocking merges,
**So that** coverage trends stay visible at review time while MVP iteration stays fast.

**Acceptance Criteria**:

- [ ] Given a pull request, when tests run, then backend and frontend coverage percentages are posted as a comment.
- [ ] Given the base branch coverage, when the report renders, then the delta is shown alongside the absolute figure.
- [ ] Given coverage below the 70% target, when the report renders, then it is flagged visibly but the merge is not blocked.
- [ ] Given the reporting configuration, when inspected, then it matches the non-blocking decision recorded in ADR-015.

**Deliverables**:

- Coverage collection for pytest-cov and vitest.
- Pull request comment reporting coverage and delta for both stacks.
- Documentation stating coverage is tracked, not enforced.

**Dependencies**:

- [ADR-015: Code Quality Tooling](../../docs/04-decisions/adr-015-code-quality-tooling.md).
- [Test Coverage Visibility](../EPIC-9-quality-baseline/stories.md#us-ep9-qa-001-test-coverage-visibility).

**Success Metrics**:

- Every pull request shows a coverage figure and delta.
- No merge is blocked by a coverage threshold.

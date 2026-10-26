# ADR-015: Code Quality Tooling Strategy

- **Status**: Accepted
- **Date**: 2026-08-04

## Context

The platform spans Python (backend) and TypeScript (frontend) codebases requiring consistent quality standards across both stacks. With a small team (1-3 developers) during MVP, tooling must be lightweight, automated, and maintainable without operational overhead.

**Problems:**
- Inconsistent code style leads to noisy diffs and harder reviews
- Manual formatting is error-prone and time-consuming
- Type errors and linting violations slip into PRs without automated checks
- Mixed Python and TypeScript ecosystems require a coordinated tooling strategy

**Constraints:**
- Must maintain $0 cost (no paid linting/quality services)
- Must work in local dev, CI, and IDE environments
- Must support both Python and TypeScript ecosystems
- Must minimize developer friction (fast feedback, auto-fix where possible)

**Requirements:**
- Automated linting and formatting for Python and TypeScript
- Type-checking for both stacks
- Pre-commit validation to catch issues early
- CI as the shared quality gate
- Test coverage visibility (tracking only, no blocking)
- Secret detection to prevent credential leaks

## Decision

Adopt a **layered quality tooling strategy** with local auto-fix and CI checks:

**Backend (Python):**
- **Linter + Formatter**: Ruff (replaces flake8, black, isort)
- **Security linter**: Bandit
- **Type Checker**: mypy, advisory in CI (the codebase has known type errors, so the step reports but does not fail)
- **Local hooks**: the pre-commit framework runs Ruff, Bandit, mypy, file hygiene checks, hadolint and a Conventional Commits message check

**Frontend (TypeScript):**
- **Linter**: ESLint with TypeScript and React rules (`--max-warnings 0`)
- **Formatter**: Prettier (integrated with ESLint via `eslint-config-prettier`)
- **Type Checker**: TypeScript compiler (`tsc --noEmit`)
- **Local hooks**: Husky runs a staged-file secret check and `lint-staged`, and validates the commit message
- **Single entry point**: `npm run verify` runs lint, tests, type-check and build

**CI (GitHub Actions):**
- API: Ruff lint and format check, Bandit, mypy (informational), non-integration pytest, and an Alembic `upgrade head` / `downgrade base` check
- Web: `npm run verify`
- API integration tests and web Playwright tests are not part of these CI jobs ([ADR-010](./adr-010-testing-framework.md))

**Coverage Strategy:**
- Coverage can be measured locally with pytest-cov and Vitest coverage
- The 70% target (NFR-X03) is a goal, not a merge gate, and is not reported on pull requests
- Coverage trends are reviewed manually

**Dependency Security:**
- Dependabot is configured in the API and web repositories
- Dependency changes are reviewed manually as part of the PR process

## Consequences

### Positive

- Consistent code style enforced automatically across the team
- Fast local feedback: Ruff completes in under a second for the full Python codebase
- Catches common bugs before PR review (unused imports, lint violations, web type errors)
- Auto-fix formatting reduces manual work and minimizes diff noise
- Secret detection hooks reduce accidental credential commits
- Consolidation of Python tools (Ruff replaces three separate tools) simplifies maintenance

### Negative

- Pre-commit hooks add seconds to each commit
- Initial setup requires configuration in both stacks
- Two hook mechanisms (pre-commit framework for Python, Husky for the web app) must be maintained
- mypy is advisory, so Python type errors do not block merges
- Coverage tracking without enforcement may allow a gradual decline in test quality
- Hooks can be bypassed with `git commit --no-verify`; CI is the remaining check
- The web secret check is a pattern match, not a full secret scanner

## Alternatives Considered

**1. A single pre-commit framework for both stacks**
- Considered to unify hook management
- Not selected for the web app: Husky and `lint-staged` are the idiomatic fit for the Node toolchain, and the Python repository keeps the pre-commit framework

**2. Black + flake8 + isort (Traditional Python Stack)**
- Considered for maturity and widespread adoption in the Python community
- Not selected because:
  - Ruff consolidates all three tools with a large performance improvement
  - Multiple tools require separate configurations and pre-commit hooks
  - Ruff is actively maintained and compatible with Black/flake8 configurations

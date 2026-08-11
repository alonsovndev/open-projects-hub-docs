# ADR-015: Code Quality Tooling Strategy

**Status**: Accepted  
**Date**: 2026-08-04

## Context

The platform spans Python (backend) and TypeScript (frontend) codebases requiring consistent quality standards across both stacks. With a small team (1-3 developers) during MVP, tooling must be lightweight, automated, and maintainable without operational overhead.

**Problems:**
- Inconsistent code style leads to noisy diffs and harder reviews
- Manual formatting is error-prone and time-consuming
- Type errors and linting violations slip into PRs without automated checks
- No systematic approach to prevent common bugs before review
- Mixed Python and TypeScript ecosystem requires coordinated tooling strategy

**Constraints:**
- Must maintain $0 cost (no paid linting/quality services)
- Must work in local dev, CI, and IDE environments
- Must support both Python and TypeScript ecosystems
- Must minimize developer friction (fast feedback, auto-fix where possible)
- Cannot require manual quality checks before every commit
- Must align with pre-commit framework for git hook management

**Requirements:**
- Automated linting for Python and TypeScript
- Consistent code formatting across team
- Type-checking for both stacks
- Pre-commit validation to catch issues early
- CI enforcement as final quality gate
- Test coverage visibility (tracking only, no blocking)
- Secret detection to prevent credential leaks

## Decision

Adopt a **layered quality tooling strategy** with local auto-fix and CI enforcement:

**Backend (Python):**
- **Linter + Formatter**: Ruff (replaces flake8, black, isort)
- **Type Checker**: mypy with strict configuration
- **Rationale**: Ruff provides 10-100x faster linting and formatting than traditional tools, consolidating three separate tools into one

**Frontend (TypeScript):**
- **Linter**: ESLint with TypeScript plugin and React rules
- **Formatter**: Prettier (integrated with ESLint via eslint-config-prettier)
- **Type Checker**: TypeScript compiler (`tsc --noEmit`)
- **Rationale**: Industry-standard tools with excellent IDE integration and community support

**Pre-commit Hook Framework:**
- **Tool**: pre-commit framework (Python-based, language-agnostic)
- **Hooks Configuration**:
  - Ruff linting + formatting (Python files) — auto-fix enabled
  - ESLint (TypeScript/JavaScript files) — auto-fix enabled
  - Prettier (TypeScript/JavaScript files) — auto-fix enabled
  - mypy type-checking (Python files) — fail on errors
  - Secret detection (gitleaks) — fail on detected secrets
  - File checks (trailing whitespace, merge conflicts, large files)
- **Behavior**: Auto-fix formatting issues locally; fail on type errors and secrets

**CI Quality Gates (GitHub Actions):**
- ✅ Lint check (Ruff for Python, ESLint for TypeScript) — must pass
- ✅ Format check (Ruff for Python, Prettier for TypeScript) — must pass
- ✅ Type check (mypy for Python, tsc for TypeScript) — must pass
- ✅ Unit tests (pytest for Python, vitest for TypeScript) — must pass
- ℹ️ Coverage report (pytest-cov, vitest coverage) — visible in PR comment, not blocking

**Coverage Strategy:**
- Track coverage in CI with pytest-cov and vitest coverage plugins
- Display coverage percentage and diff in PR comments (via GitHub Actions)
- 70% coverage target communicated but not enforced
- No merge blocking on coverage drops
- Manual review of coverage trends during PR review process

**Dependency Security:**
- No automated scanning tools during MVP (GitHub Dependabot disabled)
- Manual dependency review as part of PR process
- Future consideration: Dependabot or Snyk when team size increases

## Consequences

### Positive

- Consistent code style enforced automatically across team
- Fast local feedback — Ruff completes in <1s for full Python codebase
- Catches common bugs before PR review (type errors, unused imports, missing types)
- Auto-fix formatting reduces manual work and minimizes diff noise
- Single pre-commit framework manages hooks for both Python and TypeScript
- IDE integration available (Ruff LSP, ESLint extension, Prettier plugin)
- Coverage visibility without blocking fast iteration during MVP
- Secret detection prevents accidental credential commits
- Consolidation of Python tools (Ruff replaces 3 separate tools) simplifies maintenance

### Negative

- Pre-commit hooks add 5-10 seconds per commit (first run caches dependencies)
- Initial setup requires 1-2 hours (pre-commit config, Ruff/ESLint configuration, CI workflows)
- Learning curve for contributors unfamiliar with pre-commit framework or Ruff
- Ruff configuration differs from traditional flake8/black (minor migration effort for existing codebases)
- Coverage tracking without enforcement may allow gradual decline in test quality
- Pre-commit hooks can be bypassed with `git commit --no-verify` (mitigated by CI enforcement)
- No automated dependency security scanning may miss known vulnerabilities

## Alternatives Considered

**1. Husky for Pre-commit Hooks**
- Considered for popularity in JavaScript ecosystem and simpler Node-based setup
- Not selected because:
  - Requires Node.js for Python developers (added dependency for backend-only work)
  - Less flexible for multi-language projects with different toolchains
  - pre-commit framework better handles Python tooling and virtual environments
  - Team preference for Python-native tooling where possible

**2. Black + flake8 + isort (Traditional Python Stack)**
- Considered for maturity and widespread adoption in Python community
- Not selected because:
  - Ruff consolidates all three tools with 10-100x performance improvement
  - Multiple tools require separate configurations and pre-commit hooks
  - Ruff is actively maintained and backed by Astral (same team as uv)
  - Ruff adoption growing rapidly in Python ecosystem
  - Switching cost minimal since Ruff is compatible with Black/flake8 configurations

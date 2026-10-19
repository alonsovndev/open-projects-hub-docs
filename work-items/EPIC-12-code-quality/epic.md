# Epic: Code Quality and Maintainability

**Epic Title**: Code Quality and Maintainability
**Epic Key**: EPIC-12
**Summary**: Automate the code quality baseline across both stacks so defects are caught before review.
**Labels**: code-quality, tooling, ci, maintainability
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1, Phase 1
**Status**: IN PROGRESS

---

**Epic Description:**
Problem Statement: The codebase spans Python and TypeScript with a team of one to three developers. Without automated linting, formatting, type-checking, and secret detection, style drift and type errors reach review, secrets can be committed, and Clean Architecture boundaries erode silently as the modular monolith grows.

Objective: Implement the layered quality strategy decided in ADR-015: fast local auto-fix through pre-commit hooks, authoritative enforcement in CI, non-blocking coverage visibility, and automated guards protecting the architecture's dependency direction.

Included scope:

- Ruff linting and formatting plus mypy strict type-checking for the backend
- ESLint, Prettier, and TypeScript compiler checks for the frontend
- Pre-commit hook framework with auto-fix and gitleaks secret detection
- CI quality workflow enforcing lint, format, and type checks
- Conventional Commit validation of pull request titles
- Coverage reporting on pull requests, tracked and not blocking
- Clean Architecture dependency-direction guard tests
- Documented manual dependency review process

Excluded scope:

- Blocking merges on coverage thresholds (ADR-015 keeps coverage non-blocking)
- Automated dependency vulnerability scanning; Dependabot stays disabled during MVP
- Paid static analysis or code quality services (the $0 cost constraint applies)
- Local commit hooks as an authoritative gate; CI remains the authority
- Rewriting existing code purely to satisfy new lint rules beyond agreed auto-fixes

Related feature and requirement IDs: F-001 to F-011 (applies to all implementation work); NFR-X01, NFR-X03

Dependencies:

- [ADR-015: Code Quality Tooling](../../docs/04-decisions/adr-015-code-quality-tooling.md)
- [ADR-010: Testing Framework](../../docs/04-decisions/adr-010-testing-framework.md)
- [ADR-001: High-Level Architecture Pattern](../../docs/04-decisions/adr-001-high-level-architecture.md)
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md)
- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md)

Measurable success criteria:

- Lint, format, and type checks pass as required status checks on every pull request.
- Pre-commit hooks auto-fix formatting locally and fail on type errors and detected secrets.
- No secret ever reaches a commit on `dev` or `main`.
- Coverage is reported with a diff on every pull request without blocking merges.
- A dependency-direction violation fails the test suite.

## Release Checklist

- [ ] Release PR `dev` -> `main` opened, all required status checks green (lint, test, type-check, build), merged with a real merge commit
- [ ] Semver decision recorded and version bumped in `package.json` / `pyproject.toml`
- [ ] `CHANGELOG.md` updated with the epic summary
- [ ] API image `ghcr.io/alonsovndev/open-projects-hub-api:vX.Y.Z` built and pushed by the tag workflow (API releases only)
- [ ] Alembic migrations reviewed for backward compatibility with the running version
- [ ] Git tag `vX.Y.Z` pushed on `main` to trigger the production deployment pipeline
- [ ] `terraform apply` completed for any pending infrastructure change
- [ ] API deployed with `scripts/deploy-release.sh` (SSM command `Success`) and the frontend published by Cloudflare Builds
- [ ] Post-deploy smoke tests passed against production
- [ ] Sentry release created (only if a Sentry DSN is configured; none is required for the review)
- [ ] Release health compared against the pre-deployment error baseline
- [ ] GitHub release published with notes
- [ ] Rollback path confirmed (redeploy the previous tag with `scripts/deploy-release.sh`; fix-forward is the default)

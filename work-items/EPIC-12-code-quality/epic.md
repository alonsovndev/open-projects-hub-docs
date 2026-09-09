# Epic: Code Quality and Maintainability

**Epic Title**: Code Quality and Maintainability
**Epic Key**: EPIC-12
**Summary**: Automate the code quality baseline across both stacks so defects are caught before review.
**Labels**: code-quality, tooling, ci, maintainability
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1
**Status**: TODO

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

- [ ] Release PR `dev` -> `main` opened, 2 approvals obtained, all status checks green (lint, test, type-check, docs, terraform plan)
- [ ] Semver decision recorded and version bumped in `package.json` / `pyproject.toml`
- [ ] `CHANGELOG.md` updated with the epic summary
- [ ] Candidate image verified in ECR (sha-tagged, built by the release PR pipeline)
- [ ] Alembic migrations reviewed for backward compatibility with the running version
- [ ] Git tag `vX.Y.Z` pushed on `main` to trigger the production deployment pipeline
- [ ] `terraform apply` completed for any pending infrastructure change
- [ ] App Runner rolling deploy healthy and frontend published to S3 with CloudFront invalidated
- [ ] Post-deploy smoke tests passed against production
- [ ] Sentry release created with the commit SHA and source maps uploaded
- [ ] Release health compared against the pre-deployment error baseline
- [ ] GitHub release published with notes
- [ ] Rollback path confirmed (redeploy previous ECR image; fix-forward is the default)

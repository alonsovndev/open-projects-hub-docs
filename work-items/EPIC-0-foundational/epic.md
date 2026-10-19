# Epic: Project and Local Development Setup (Foundational)

**Epic Title**: Project and Local Development Setup (Foundational)
**Epic Key**: EPIC-0
**Summary**: Establish foundational project structure, local environment setup, and deployment baseline.
**Labels**: foundational, setup, ci-cd
**Priority**: Must Have
**Components**: Backend, Frontend, Database
**Fix Version**: MVP-1
**Status**: IN PROGRESS

---

**Epic Description:**
Problem Statement: Delivery teams cannot begin engineering work until the development environment, CI/CD, database schema, seed data, and deployment foundations are configured.

Objective: Establish the foundational project structure, local environment setup, and deployment baseline so all engineering teams can work in parallel on MVP features downstream.

Included scope:

- Repository structure and folder organization for one backend modular monolith repo and one frontend repo
- Local development environment setup (Python, Node.js, Docker, database)
- CI/CD pipeline scaffolding and basic testing framework integration
- Database schema creation and seed data generation
- Deployment platform setup (local development and production readiness)
- API contract and documentation foundation

Excluded scope:

- Feature-specific implementation beyond structure and scaffolding
- Team onboarding and documentation beyond setup-critical items
- Advanced deployment automation or multi-region strategies

Related feature and requirement IDs: Foundational (no direct feature mapping; supports all features F-001 through F-011)

Dependencies:

- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md)
- [Technology Stack](../../docs/03-architecture/core/technology-stack.md)
- [Database Design](../../docs/03-architecture/database/database-design.md)

Measurable success criteria:

- Every engineer can clone both repositories and run local dev environments in under 15 minutes.
- CI/CD pipeline runs on every commit and reports clear pass/fail status.
- Database schema is created and seed data is populated automatically in local dev.
- Tag-triggered production deployment is repeatable and documented.

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

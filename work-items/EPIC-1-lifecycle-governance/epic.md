# Epic: Client and Project Lifecycle Governance

**Epic Title**: Client and Project Lifecycle Governance
**Epic Key**: EPIC-1
**Summary**: Provide stable client and project lifecycle governance.
**Labels**: lifecycle, governance
**Priority**: Must Have
**Components**: Backend, Database
**Fix Version**: MVP-1
**Status**: IN PROGRESS

---

**Epic Description:**
Problem Statement: Freelancers need a reliable way to manage clients and projects without allowing the workspace to drift into unsupported lifecycle states or uncontrolled project sprawl.

Objective: Provide a stable planning workspace where Admin users can manage clients and projects under explicit MVP lifecycle and active-project constraints.

Included scope:

- Client record management and project-to-client association
- Project creation, update, archive, and active-project enforcement
- Discovery and planning as the only allowed MVP phases

Excluded scope:

- Delivery, handoff, and implementation tracking workflows
- Multi-admin team structures and collaborator invitations
- CRM, billing, or portfolio management expansion

Related feature and requirement IDs: F-001; FR-001-01, FR-001-02, FR-001-03, FR-001-04, FR-001-05, FR-001-06, FR-001-07; NFR-001-01, NFR-001-02, NFR-001-03

Dependencies:

- [Project Overview](../../docs/00-context/overview.md)
- [Feature Requirements](../../docs/01-requirements/f-001-client-and-project-lifecycle-management.md)
- [Phased Roadmap](../../docs/02-planning/phased-roadmap.md)
- [Database Design](../../docs/03-architecture/database/database-design.md)

Measurable success criteria:

- Admin can create, update, and archive client and project records within one planning workspace.
- Fourth active project creation is blocked consistently across documented flows.
- No MVP artifact introduces a project phase beyond discovery or planning.

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

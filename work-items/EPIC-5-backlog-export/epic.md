# Epic: Requirements Backlog and Markdown Export

**Epic Title**: Requirements Backlog and Markdown Export
**Epic Key**: EPIC-5
**Summary**: Enable structured backlog view and Markdown export.
**Labels**: backlog, export
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1, Phase 1
**Status**: IN PROGRESS

---

**Epic Description:**
Problem Statement: Planning work loses value if freelancers cannot share a clean, structured artifact with stakeholders after approval.

Objective: Make the approved backlog visible inside the product and exportable to Markdown as the official MVP deliverable.

Included scope:

- Structured approved backlog view
- Markdown export for approved requirements only
- Stakeholder-readable formatting aligned to the standard story template

Excluded scope:

- PDF, DOCX, CSV, and tool-specific integrations
- Export of draft stories or internal-only planning notes
- Advanced reporting, analytics, or packaged delivery documentation

Related feature and requirement IDs: F-004; FR-004-01, FR-004-02, FR-004-03, FR-004-04, FR-004-05, FR-004-06; NFR-004-01, NFR-004-02

Dependencies:

- [Feature Requirements](../../docs/01-requirements/f-004-requirements-backlog-and-markdown-export.md)
- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md)
- [API Contract](../../docs/03-architecture/api/api-contract.md)
- [Database Design](../../docs/03-architecture/database/database-design.md)
- [Sequence Diagrams](../../docs/03-architecture/diagrams/sequence-diagrams.md)

Measurable success criteria:

- Every MVP project can present approved requirements in a structured backlog view.
- Admin can request Markdown export without including draft or internal-only content.
- Backlog and export outputs remain readable under MVP data limits.

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

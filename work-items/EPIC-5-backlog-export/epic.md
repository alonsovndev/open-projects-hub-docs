# Epic: Requirements Backlog and Markdown Export

**Epic Title**: Requirements Backlog and Markdown Export
**Epic Key**: EPIC-5
**Summary**: Enable structured backlog view and Markdown export.
**Labels**: backlog, export
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1, Phase 1
**Status**: TODO

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

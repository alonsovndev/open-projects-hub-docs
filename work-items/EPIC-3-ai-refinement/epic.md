# Epic: AI Refinement and Approval Workflow

**Epic Title**: AI Refinement and Approval Workflow
**Epic Key**: EPIC-3
**Summary**: Create controlled refinement workflow for client notes.
**Labels**: ai, refinement
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1, Phase 1
**Status**: IN PROGRESS

---

**Epic Description:**
Problem Statement: Freelancers lose time and introduce inconsistency when they manually rewrite ambiguous client notes into structured backlog items.

Objective: Create a controlled refinement workflow that converts raw notes into editable draft stories and requires explicit Admin approval before publication.

Included scope:

- Raw note and bullet-list intake
- AI-generated draft stories in standard user story format
- Admin edit and approval gate before official backlog inclusion

Excluded scope:

- File uploads and multimodal AI ingestion
- Auto-publishing without human review
- Test-case generation, estimation, and delivery planning automation

Related feature and requirement IDs: F-002; FR-002-01, FR-002-02, FR-002-03, FR-002-04, FR-002-05, FR-002-06, FR-002-07, FR-002-08; NFR-002-01, NFR-002-02, NFR-002-03

Dependencies:

- [Feature Requirements](../../docs/01-requirements/f-002-ai-refinement-and-approval-workflow.md)
- [Phased Roadmap](../../docs/02-planning/phased-roadmap.md)
- [Architecture Solution Design](../../docs/03-architecture/core/architecture-solution-design.md)
- [API Contract](../../docs/03-architecture/api/api-contract.md)
- [Sequence Diagrams](../../docs/03-architecture/diagrams/sequence-diagrams.md)

Measurable success criteria:

- Admin can submit raw notes without extra formatting steps.
- AI output returns structured draft stories with acceptance-criteria-ready content.
- Draft content remains unofficial until explicit Admin approval is completed.

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

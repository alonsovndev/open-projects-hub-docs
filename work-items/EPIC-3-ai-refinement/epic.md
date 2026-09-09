# Epic: AI Refinement and Approval Workflow

**Epic Title**: AI Refinement and Approval Workflow
**Epic Key**: EPIC-3
**Summary**: Create controlled refinement workflow for client notes.
**Labels**: ai, refinement
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1, Phase 1
**Status**: TODO

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

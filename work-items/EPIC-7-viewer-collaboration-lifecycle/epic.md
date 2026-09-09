# Epic: Viewer Collaboration Lifecycle

**Epic Title**: Viewer Collaboration Lifecycle
**Epic Key**: EPIC-7
**Summary**: Implement the workflow for inviting, creating, and managing Viewer accounts.
**Labels**: collaboration, access-control
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1, Phase 1
**Status**: TODO

---

**Epic Description:**
Problem Statement: Project Admins (freelancers) need a secure way to grant their clients read-only access to project backlogs for transparency and review.

Objective: Create a complete lifecycle for Viewer accounts, allowing Admins to invite Viewers, who can then register and be granted access to specific projects.

Included scope:

- An invitation system for Admins to invite Viewers via email.
- A registration flow for Viewers to create their accounts.
- A mechanism for Admins to grant/revoke Viewer access to projects.

Excluded scope:

- Multiple viewers per project.
- Real-time notifications for viewers.
- Viewer comments or feedback mechanisms.

Related feature and requirement IDs: F-011; FR-011-01, FR-011-02, FR-011-03, FR-011-04, FR-011-05, FR-011-06, FR-011-07, FR-011-08, FR-011-09, FR-011-10, FR-011-11, FR-011-12; NFR-011-01, NFR-011-02, NFR-011-03, NFR-011-04, NFR-011-05

Dependencies:

- [Feature Requirements](../../docs/01-requirements/f-011-viewer-account-management.md)
- [API Contract](../../docs/03-architecture/api/api-contract.md)

Measurable success criteria:

- Admins can successfully send an invitation to a prospective Viewer.
- An invited user can register as a Viewer.
- Admins can associate a Viewer with one of their projects.
- Viewers can only see the projects they have been granted access to.

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

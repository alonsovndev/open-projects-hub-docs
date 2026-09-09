# Epic: Access Control and Visibility Boundaries

**Epic Title**: Access Control and Visibility Boundaries
**Epic Key**: EPIC-4
**Summary**: Enforce Admin and Viewer boundaries for safe collaboration.
**Labels**: access-control, visibility
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1
**Status**: TODO

---

**Epic Description:**
Problem Statement: Client-facing transparency is useful only if it does not allow viewers to alter planning artifacts.

Objective: Enforce simple Admin and Viewer boundaries so the MVP supports safe collaboration without expanding into full multi-user workflow management.

Included scope:

- Admin full-access and Viewer read-only boundaries
- Viewer access to approved requirements and current project phase

Excluded scope:

- Extra roles and Viewer comments
- Shared editing and real-time collaboration
- Audit-log or workflow history surfaces for end users

Related feature and requirement IDs: F-003; FR-003-01, FR-003-02, FR-003-03; NFR-003-01, NFR-003-02, NFR-003-03

Dependencies:

- [Feature Requirements](../../docs/01-requirements/f-003-access-control-and-visibility-boundaries.md)
- [Role Mapping](../../docs/02-planning/role-mapping.md)
- [Phased Roadmap](../../docs/02-planning/phased-roadmap.md)
- [Security Architecture](../../docs/03-architecture/security/security-architecture.md)
- [Sequence Diagrams](../../docs/03-architecture/diagrams/sequence-diagrams.md)

Measurable success criteria:

- Viewer access is limited to approved requirements and project phase visibility.
- No documented flow allows Viewer create, edit, comment, or delete actions.

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

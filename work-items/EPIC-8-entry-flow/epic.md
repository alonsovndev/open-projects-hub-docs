# Epic: Minimal Onboarding and Entry Flow

**Epic Title**: Minimal Onboarding and Entry Flow
**Epic Key**: EPIC-8
**Summary**: Improve first-use quality through onboarding, landing page, and account creation flows.
**Labels**: onboarding, entry-flow
**Priority**: Should Have
**Components**: Backend, Frontend
**Fix Version**: Phase 1
**Status**: TODO

---

**Epic Description:**
Problem Statement: The MVP can be functional without polished first-use flows, but clear onboarding and landing page messaging are needed to reduce friction for new users.

Objective: Improve first-use quality through better onboarding, clearer public entry messaging, and a secure account creation flow.

Included scope:

- Minimal onboarding guidance for first-time Admin users
- Landing page value proposition and CTA clarity
- Account creation with email verification and next-step routing (F-008, Phase 1)

Excluded scope:

- Full guided tours, marketing content systems, and campaign pages
- Paid plan, subscription, or commercial conversion workflows
- Team onboarding and collaborator provisioning

Related feature and requirement IDs: F-005, F-006, F-008; FR-005-01, FR-005-02, FR-005-03, FR-006-01, FR-006-02, FR-006-03, FR-008-01, FR-008-02, FR-008-03, FR-008-04, FR-008-05, FR-008-06, FR-008-07, FR-008-08, FR-008-09; NFR-005-01, NFR-005-02, NFR-006-01, NFR-006-02, NFR-008-01, NFR-008-02, NFR-008-03, NFR-008-04

Dependencies:

- [Feature Requirements](../../docs/01-requirements/f-005-minimal-onboarding.md)
- [Feature Requirements](../../docs/01-requirements/f-006-landing-page.md)
- [Feature Requirements](../../docs/01-requirements/f-008-create-account.md)
- [Phased Roadmap](../../docs/02-planning/phased-roadmap.md)

Measurable success criteria:

- First-time users can identify the next valid action after landing and first login.
- Onboarding flows use accessible, plain-language guidance.
- Account creation completes with email verification and routes users to the correct next step.
- Phase 1 improvements do not expand MVP scope into team or commercial features.

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

# Epic: Minimal Onboarding and Entry Flow

**Epic Title**: Minimal Onboarding and Entry Flow
**Epic Key**: EPIC-8
**Summary**: Improve first-use quality through onboarding, landing page, and account creation flows.
**Labels**: onboarding, entry-flow
**Priority**: Should Have
**Components**: Backend, Frontend
**Fix Version**: Phase 1
**Status**: IN PROGRESS

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

- [x] Release PR `dev` -> `main` opened, all required status checks green (lint, test, type-check, build), merged with a real merge commit
- [x] Semver decision recorded and version bumped in `package.json` / `pyproject.toml`
- [x] `CHANGELOG.md` updated with the epic summary
- [x] API image `ghcr.io/alonsovndev/open-projects-hub-api:vX.Y.Z` built and pushed by the tag workflow (API releases only)
- [x] Alembic migrations reviewed for backward compatibility with the running version
- [x] Git tag `vX.Y.Z` pushed on `main` to trigger the production deployment pipeline
- [x] `terraform apply` completed for any pending infrastructure change (none pending in this release)
- [x] API deployed with `scripts/deploy-release.sh` (SSM command `Success`) and the frontend published by Cloudflare Builds
- [x] Post-deploy smoke tests passed against production
- [x] Sentry release created (only if a Sentry DSN is configured; none is required for the review)
- [x] Release health compared against the pre-deployment error baseline
- [x] GitHub release published with notes
- [ ] Rollback path confirmed (redeploy the previous tag with `scripts/deploy-release.sh`; fix-forward is the default) (not exercised: no regression was detected)

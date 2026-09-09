# Epic: AI Monetization and Configuration

**Epic Title**: AI Monetization and Configuration
**Epic Key**: EPIC-6
**Summary**: Provide a mechanism for users to utilize AI features, including free credits and integration of their own API keys.
**Labels**: ai, monetization, configuration
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: Phase 1
**Status**: TODO

---

**Epic Description:**
Problem Statement: The platform's AI features rely on third-party services which have associated costs. Users need a way to try the service and then continue using it with their own billing credentials.

Objective: Implement a system that provides initial free credits for AI usage and allows users to configure their own API keys from supported providers to continue using the service.

Included scope:

- Tracking of AI credit usage per user.
- A "5 free credits" system for new users.
- A settings page for users to input and manage their own API keys (e.g., OpenAI, Gemini).

Excluded scope:

- Direct billing or subscription management.
- Team-based credit pools.
- Complex analytics on credit usage.

Related feature and requirement IDs: F-010; FR-010-01, FR-010-02, FR-010-03, FR-010-04, FR-010-05, FR-010-06, FR-010-07, FR-010-08, FR-010-09, FR-010-10, FR-010-11, FR-010-12; NFR-010-01, NFR-010-02, NFR-010-03, NFR-010-04, NFR-010-05, NFR-010-06

Dependencies:

- [Feature Requirements](../../docs/01-requirements/f-010-ai-credits-and-api-key-management.md)
- [API Contract](../../docs/03-architecture/api/api-contract.md)

Measurable success criteria:

- New users are granted 5 free credits upon account creation.
- Each AI refinement action decrements the credit count.
- Users can add, update, and remove their own API keys.
- Once free credits are exhausted, the system uses the user's API key.

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

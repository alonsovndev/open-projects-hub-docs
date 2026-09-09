# Epic: Cross-Cutting Quality Baseline

**Epic Title**: Cross-Cutting Quality Baseline
**Epic Key**: EPIC-9
**Summary**: Enforce cross-cutting quality baselines (security, session, email, test coverage, performance, accessibility).
**Labels**: quality, nfr, security, performance
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1
**Status**: TODO

---

**Epic Description:**
Problem Statement: Individual feature epics deliver functional scope, but cross-cutting non-functional requirements (security hardening, session management, email reliability, test coverage, performance, accessibility) must be owned and verified holistically to ensure the MVP meets baseline quality and reliability targets.

Objective: Own and enforce the cross-cutting non-functional requirements NFR-X01 through NFR-X10 so that every MVP feature ships with measurable quality gates satisfied.

Included scope:

- OWASP Top 10 security hardening across all endpoints (NFR-X01)
- GDPR-aligned data deletion and archival enforcement (NFR-X02)
- Automated test coverage gate (≥ 70% core logic) (NFR-X03)
- Session management: 24h standard / 7-day extended, refresh rotation, forced logout (NFR-X09)
- Transactional email delivery with retry, rate limits, failure handling (NFR-X10)
- Performance and scalability validation under MVP load assumptions (NFR-X05/X06)
- Accessibility and readability validation for Viewer-facing views (NFR-X04/X07)
- Delivery feasibility tracking and scope governance (NFR-X08)

Excluded scope:

- Feature-specific functional implementation (owned by feature epics)
- Advanced monitoring, alerting, or multi-region strategies
- Post-MVP scale preparation (Phase 2)

Related feature and requirement IDs: F-001 to F-011 (cross-cutting); NFR-X01, NFR-X02, NFR-X03, NFR-X04, NFR-X05, NFR-X06, NFR-X07, NFR-X08, NFR-X09, NFR-X10; NFR-001-01, NFR-003-04

Dependencies:

- [Security Architecture](../../docs/03-architecture/security/security-architecture.md)
- [Threat Model](../../docs/03-architecture/security/threat-model.md)
- [API Contract](../../docs/03-architecture/api/api-contract.md)
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md)
- [ADR-010: Testing Framework](../../docs/04-decisions/adr-010-testing-framework.md)

Measurable success criteria:

- OWASP Top 10 checklist satisfied; login rate-limited; passwords hashed with strong one-way algorithm.
- Deleted projects become inaccessible to Admin and Viewer roles within 24 hours.
- Automated tests cover ≥ 70% of core application logic.
- Standard sessions expire after 24 hours; extended after 7 days; refresh tokens rotate on use.
- 95% of transactional emails delivered within 30 seconds; 3 retry attempts with exponential backoff.
- Project list and requirements views render within 2 seconds under MVP load (10 Admins + 20 Viewers, 100 req/min peak).
- Viewer-facing views meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels.
- MVP scope achievable within the 1–1.5 month delivery window.

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

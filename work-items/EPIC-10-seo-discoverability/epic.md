# Epic: SEO and Discoverability

**Epic Title**: SEO and Discoverability
**Epic Key**: EPIC-10
**Summary**: Make the public entry pages discoverable, correctly previewed when shared, and fast.
**Labels**: seo, discoverability, frontend, performance
**Priority**: Should Have
**Components**: Frontend
**Fix Version**: Phase 1
**Status**: TODO

---

**Epic Description:**
Problem Statement: The platform has no SEO requirements documented anywhere in `docs/`, and the frontend is a client-rendered React + Vite single-page application (ADR-003, ADR-008) with no server-side rendering. Crawlers and social platforms therefore receive an empty application shell, so the landing page cannot attract organic traffic and shared links render without a usable preview.

Objective: Give the public entry pages the static discoverability layer a client-rendered SPA can support: accurate per-route metadata, crawler directives, structured data, semantic document structure, and measured Core Web Vitals.

Included scope:

- Per-route document titles, meta descriptions, Open Graph and Twitter Card tags, and canonical URLs
- `robots.txt` and a generated `sitemap.xml` covering public routes
- JSON-LD structured data describing the product and organization
- Semantic heading hierarchy and landmark regions on public pages
- Social share preview imagery
- Core Web Vitals budgets measured in CI and in Sentry

Excluded scope:

- Server-side rendering or a framework migration (contradicts ADR-003 and ADR-008)
- Build-time prerendering of public routes (deferred; static metadata only for now)
- Marketing campaign pages, blog, or content hub (excluded by F-006)
- Paid acquisition, analytics platforms, or keyword research tooling
- Indexing of authenticated application views, which must stay excluded from crawlers

Related feature and requirement IDs: F-006 (landing page surface); NFR-006-01, NFR-006-02, NFR-X05, NFR-X07. SEO-specific requirements are not yet documented in `docs/01-requirements/` - see the documentation follow-up noted in the repository work-items README.

Dependencies:

- [Feature Requirements: F-006](../../docs/01-requirements/f-006-landing-page.md)
- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md)
- [ADR-008: Build Tooling](../../docs/04-decisions/adr-008-build-tool.md)
- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md)
- [Design Direction](../../docs/05-prototype/design-direction.md)

Measurable success criteria:

- Every public route serves a unique, accurate title, description, and canonical URL.
- A shared link to the landing page renders a correct title, description, and image preview.
- `robots.txt` and `sitemap.xml` are reachable and list only public routes.
- Authenticated application routes are excluded from crawling and from the sitemap.
- Landing page Core Web Vitals stay within the agreed budgets in CI and in Sentry.

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

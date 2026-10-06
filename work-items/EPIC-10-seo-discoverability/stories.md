# Stories for Epic: SEO and Discoverability

## Frontend Engineer

### US-EP10-FE-001: Per-Route Metadata and Canonical URLs

**Story ID**: US-EP10-FE-001
**Epic Link**: EPIC-10
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, seo, discoverability
**Requirements**: FR-006-01, FR-006-03, NFR-X11

**As a** Frontend Engineer,
**I want to** render per-route titles, meta descriptions, social tags, and canonical URLs,
**So that** each public page describes itself accurately to search engines and social platforms.

**Acceptance Criteria**:

- [ ] Given any public route, when it renders, then a unique document title and meta description are present.
- [ ] Given any public route, when it renders, then Open Graph and Twitter Card tags describe that specific page.
- [ ] Given a public route reachable by more than one URL, when it renders, then a single canonical URL is declared.
- [ ] Given an authenticated application route, when it renders, then it declares `noindex` and is excluded from crawling.
- [ ] Given a route changes client-side, when navigation completes, then the metadata updates to match the new route.

**Deliverables**:

- Metadata component or hook applied across public routes.
- Per-route metadata definitions for landing, login, registration, and password reset.
- `noindex` handling for authenticated routes.
- Tests asserting metadata presence and correctness per route.

**Dependencies**:

- [Feature Requirements: F-006](../../docs/01-requirements/f-006-landing-page.md).
- [Landing Page Entry Experience](../EPIC-8-entry-flow/stories.md#us-ep8-fe-002-landing-page-entry-experience).

**Success Metrics**:

- Every public route exposes unique, accurate metadata.
- No authenticated route is indexable.

---

### US-EP10-FE-002: Crawler Directives and Sitemap

**Story ID**: US-EP10-FE-002
**Epic Link**: EPIC-10
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, seo, discoverability
**Requirements**: NFR-X11

**As a** Frontend Engineer,
**I want to** publish `robots.txt` and a generated `sitemap.xml` for public routes,
**So that** crawlers can discover the public surface and are kept out of the application.

**Acceptance Criteria**:

- [ ] Given the deployed site, when `/robots.txt` is requested, then it is served and allows public routes only.
- [ ] Given the deployed site, when `/sitemap.xml` is requested, then it lists every public route with a valid last-modified value.
- [ ] Given authenticated or utility routes, when the sitemap is generated, then they are excluded.
- [ ] Given a public route is added or removed, when the site is built, then the sitemap regenerates accordingly.

**Deliverables**:

- `robots.txt` served from the static root with crawler directives.
- Build-time `sitemap.xml` generation from the public route table.
- CI check asserting both files are present in the build output.

**Dependencies**:

- [ADR-008: Build Tooling](../../docs/04-decisions/adr-008-build-tool.md).
- [Deployment & Infrastructure Architecture](../../docs/03-architecture/ops/deployment-architecture.md).

**Success Metrics**:

- Both files are reachable in production and reference only public routes.
- Sitemap contents stay accurate without manual maintenance.

---

### US-EP10-FE-003: Structured Data Markup

**Story ID**: US-EP10-FE-003
**Epic Link**: EPIC-10
**Issue Type**: Story
**Priority**: Could Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, seo, discoverability
**Requirements**: NFR-X11

**As a** Frontend Engineer,
**I want to** embed JSON-LD structured data describing the product and organization,
**So that** search engines can render richer, more accurate results for the platform.

**Acceptance Criteria**:

- [ ] Given the landing page, when it renders, then valid JSON-LD describes the software application and its organization.
- [ ] Given the JSON-LD payload, when validated against schema.org, then it passes without errors or warnings.
- [ ] Given product naming or description changes, when the site is built, then the structured data reflects the current copy.

**Deliverables**:

- JSON-LD payload for the landing page covering product and organization.
- Schema validation step covering the structured data.
- Single source of truth shared between metadata and structured data.

**Dependencies**:

- [Project Overview](../../docs/00-context/overview.md).
- [Per-Route Metadata and Canonical URLs](./stories.md#us-ep10-fe-001-per-route-metadata-and-canonical-urls).

**Success Metrics**:

- Structured data validates cleanly against schema.org.
- Product naming stays consistent between metadata and structured data.

---

### US-EP10-FE-004: Semantic Document Structure and Landmarks

**Story ID**: US-EP10-FE-004
**Epic Link**: EPIC-10
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 3
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, seo, accessibility
**Requirements**: NFR-006-02, NFR-X07, NFR-X11

**As a** Frontend Engineer,
**I want to** give public pages a correct heading hierarchy and landmark regions,
**So that** crawlers and assistive technology can both interpret the page structure.

**Acceptance Criteria**:

- [ ] Given a public page, when its headings are inspected, then exactly one `h1` exists and levels descend without skipping.
- [ ] Given a public page, when landmarks are inspected, then header, main, navigation, and footer regions are present.
- [ ] Given an image conveying meaning, when it renders, then it carries descriptive alternative text.
- [ ] Given the page language, when the document renders, then a `lang` attribute is declared.

**Deliverables**:

- Heading hierarchy corrections across public pages.
- Landmark regions applied to the public layout.
- Alternative text and `lang` attribute coverage.
- Automated structural checks in the accessibility test pass.

**Dependencies**:

- [Design Direction](../../docs/05-prototype/design-direction.md).
- [Accessibility & Readability Validation](../EPIC-9-quality-baseline/stories.md#us-ep9-ux-001-accessibility--readability-validation).

**Success Metrics**:

- Public pages pass automated heading and landmark structure checks.
- Structural markup satisfies both SEO and WCAG 2.1 AA expectations.

---

### US-EP10-FE-005: Social Share Preview Assets

**Story ID**: US-EP10-FE-005
**Epic Link**: EPIC-10
**Issue Type**: Story
**Priority**: Could Have
**Effort Estimate**: 2
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: frontend, seo, design
**Requirements**: NFR-X11

**As a** Frontend Engineer,
**I want to** produce and wire the share preview imagery for public pages,
**So that** links shared into chat and social platforms render a deliberate, on-brand preview.

**Acceptance Criteria**:

- [ ] Given a public page is shared, when the preview renders, then the configured image appears at the correct dimensions.
- [ ] Given the share image, when it is inspected, then it carries the product name legibly at small sizes.
- [ ] Given the preview assets, when the page loads, then they do not regress the page performance budget.

**Deliverables**:

- Share preview images sized for the major platforms.
- Open Graph and Twitter image references wired to the assets.
- Preview validation against at least two sharing platforms.

**Dependencies**:

- [Per-Route Metadata and Canonical URLs](./stories.md#us-ep10-fe-001-per-route-metadata-and-canonical-urls).
- [Design Quality Bar and Theme Tokens](../EPIC-11-ui-craft/stories.md#us-ep11-ux-001-design-quality-bar-and-theme-tokens).

**Success Metrics**:

- Shared links render a correct preview on the validated platforms.
- Preview assets add no measurable regression to page load.

---

## QA / Test Ownership

### US-EP10-QA-001: Core Web Vitals Budgets and Lighthouse Check

**Story ID**: US-EP10-QA-001
**Epic Link**: EPIC-10
**Issue Type**: Story
**Priority**: Should Have
**Effort Estimate**: 5
**Status**: TODO
**Fix Version**: Phase 1
**Labels**: qa, seo, performance
**Requirements**: NFR-006-01, NFR-X05, NFR-X11

**As a** QA Engineer,
**I want to** define Core Web Vitals budgets and verify them in CI and in production telemetry,
**So that** discoverability and entry-page quality are measured rather than assumed.

**Acceptance Criteria**:

- [ ] Given the landing page, when the CI performance check runs, then Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint are measured against agreed budgets.
- [ ] Given a budget is exceeded, when the check completes, then the regression is reported on the pull request.
- [ ] Given the deployed site, when Sentry Web Vitals are reviewed, then landing page vitals are tracked against the same budgets.
- [ ] Given the landing page first render, when measured under the documented conditions, then it completes within 2 seconds.

**Deliverables**:

- Documented Core Web Vitals budgets for public pages.
- Lighthouse or equivalent check wired into CI with PR reporting.
- Sentry Web Vitals review covering the landing page.

**Dependencies**:

- [Monitoring & Observability](../../docs/03-architecture/ops/monitoring-observability.md).
- [Feature Requirements: F-006](../../docs/01-requirements/f-006-landing-page.md).
- [CI/CD Pipeline Architecture](../../docs/03-architecture/ops/ci-cd-pipeline.md).

**Success Metrics**:

- Landing page meets its 2-second first-render target.
- Vitals regressions are visible on the pull request that causes them.

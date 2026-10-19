# Epic: UI Craft and Design Quality

**Epic Title**: UI Craft and Design Quality
**Epic Key**: EPIC-11
**Summary**: Raise the interface above default component-library output without adding design-system depth.
**Labels**: ui, design, craft, accessibility
**Priority**: Should Have
**Components**: Frontend
**Fix Version**: Phase 1
**Status**: DONE

---

**Epic Description:**
Problem Statement: The documented design direction sets an Ant Design baseline and deliberately avoids design-system depth, which keeps prototyping fast but risks shipping screens that look like untouched library defaults. Default-looking pages undermine trust in a product whose value proposition is professional, client-facing planning output.

Objective: Make the product feel deliberately designed by theming Ant Design rather than replacing it: one custom token set, bespoke composition for the signature surfaces, considered empty and error states, purposeful motion, and verified responsive and accessible behavior.

Included scope:

- A written design-quality bar defining what is and is not acceptable polish
- Custom Ant Design theme tokens replacing the default palette and type defaults
- Bespoke composition for the signature surfaces (refinement workspace, backlog and story card, Viewer view, landing)
- Empty, loading, and error state design across primary flows
- Motion and transitions with reduced-motion support
- Responsive behavior and touch target compliance
- Visible focus states and WCAG 2.1 AA contrast

Excluded scope:

- Building a standalone design system or component library from scratch
- Replacing Ant Design or introducing a second component library
- Rebranding, logo design, or a full visual identity programme
- Decorative styling that competes with story readability (the direction is content-first)
- Dark mode, which is not documented in the design direction

Related feature and requirement IDs: F-001 to F-011 (all user-facing surfaces); NFR-002-03, NFR-003-03, NFR-004-01, NFR-005-01, NFR-006-02, NFR-007-02, NFR-008-04, NFR-010-06, NFR-011-04, NFR-X04, NFR-X07

Dependencies:

- [Design Direction](../../docs/05-prototype/design-direction.md)
- [Prototype Brief](../../docs/05-prototype/prototype-brief.md)
- [ADR-003: Frontend Framework](../../docs/04-decisions/adr-003-frontend-framework.md)
- [Requirements Baseline](../../docs/01-requirements/README.md#cross-cutting-quality-baseline)

Measurable success criteria:

- No primary screen ships with the untouched Ant Design default palette or type scale.
- Every primary flow has a designed empty, loading, and error state.
- All interactive surfaces meet WCAG 2.1 AA contrast and show a visible focus state.
- Motion respects the operating system reduced-motion preference.
- Primary flows remain usable at the documented desktop, tablet, and mobile breakpoints with 44 by 44 pixel touch targets.

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

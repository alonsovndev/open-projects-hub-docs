# Phased Roadmap

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.4                         |
| **Status**       | Accepted                    |
| **Owner**        | Product Owner               |

## Table of Contents

- [Source References](#source-references)
- [Planning Principles](#planning-principles)
- [Phase Overview](#phase-overview)
- [Phase -1 (UI/UX Prototyping & Validation)](#phase--1-uiux-prototyping--validation)
- [Phase 0 (Foundation & Engineering Readiness)](#phase-0-foundation--engineering-readiness)
- [MVP Phase](#mvp-phase)
- [Phase 1](#phase-1)
- [Phase 2 (Future)](#phase-2-future)
- [Feature Traceability Matrix](#feature-traceability-matrix)
- [Risks and Blockers](#risks-and-blockers)

## Planning Principles

- Separate scope definition from implementation design.
- Use MoSCoW for prioritization and resolve conflicts through Tech Lead + Product Owner.
- Keep MVP focused on core validated workflows before expansion.
- Architecture-impacting decisions must reference ADRs in `03-architecture`.

---

## Phase Overview

| Phase    | Name                               | Objective                                                              | Status  | Target Window      | Execution Mode |
| -------- | ---------------------------------- | ---------------------------------------------------------------------- | ------- | ------------------ | -------------- |
| Phase -1 | UI/UX Prototyping & Validation     | Validate UI designs and obtain stakeholder approval before development | Planned | Week 0 (parallel)  | Parallel with Phase 0 |
| Phase 0  | Foundation & Engineering Readiness | Establish development infrastructure and standards before feature work | Planned | Week 0 (parallel)  | Parallel with Phase -1 |
| MVP      | Core Planning Backbone             | Deliver core planning value with secure access and exports            | Planned | Weeks 1-11         | Sequential |
| Phase 1  | UX and Entry-Flow Hardening        | Improve onboarding, entry flow, monetization config, and UI craft     | Planned | Weeks 12-19        | Sequential |
| Phase 2  | Governance and Scale Preparation   | Prepare post-MVP governance, traceability depth, and scale plan       | Planned | TBD                | Sequential |

---

## Phase -1 (UI/UX Prototyping & Validation)

> **Execution Model:** Runs in parallel with Phase 0. Both phases must complete before MVP Week 1 begins.

### Goals

1. Complete high-fidelity prototypes for all MVP features (F-001 through F-011).
2. Validate UI/UX designs with Product Owner and key stakeholders.
3. Establish visual design system (colors, typography, component patterns, spacing).
4. Obtain formal stakeholder sign-off on all UI designs before engineering begins.
5. Create design handoff artifacts and conduct walkthrough with Frontend Engineer.

### Prioritized Tasks

| Priority | Task                                    | Owner          | Estimate | Deliverable                                      |
| -------- | --------------------------------------- | -------------- | -------- | ------------------------------------------------ |
| Must     | Complete/update MVP screen prototypes   | UI/UX Designer | 3-4 days | 15-20 screens for F-001 to F-011                 |
| Must     | Stakeholder walkthrough & feedback      | Product Owner  | 1 day    | Consolidated feedback document                   |
| Must     | Iterate prototypes based on feedback    | UI/UX Designer | 2-3 days | Revised prototypes addressing feedback           |
| Must     | Final approval gate                     | Product Owner  | 0.5 days | Signed-off designs with approval artifact        |
| Must     | Design handoff documentation            | UI/UX Designer | 1-2 days | Component specs, design tokens, assets           |
| Should   | Interactive clickable prototype         | UI/UX Designer | 2 days   | Figma/Stitch clickable demo for user journeys    |
| Should   | Accessibility review (WCAG 2.1 AA)      | UI/UX Designer | 1 day    | Accessibility checklist and compliance notes     |
| Should   | Responsive design variants              | UI/UX Designer | 1-2 days | Mobile/tablet breakpoint designs                 |

### Key Deliverables

- **Complete prototype pack:** All MVP screens designed and approved (15-20 screens)
  - Landing page and value proposition (F-006)
  - Authentication flows: login, signup, password reset (F-007, F-008, F-009)
  - Client and project management (F-001)
  - AI refinement workspace with provider selection (F-002)
  - Requirements backlog - Admin view with edit/approve controls (F-004)
  - Requirements backlog - Client Review view (read-only) (F-003, F-004)
  - Markdown export flow and confirmation (F-004)
  - AI credits management and API key configuration (F-010)
  - Client Review by project access code (F-011, ADR-020; replaces the Viewer invitation flow)
  - Minimal onboarding overlay for first-time Admin (F-005)

- **Visual design system documentation:**
  - Color palette with WCAG 2.1 AA contrast ratios
  - Typography scale and font hierarchy
  - Component library specifications (buttons, forms, cards, tags, modals)
  - Spacing and grid system
  - Iconography guidelines

- **Design handoff package:**
  - Component specifications (dimensions, states, behaviors, interactions)
  - Design token definitions (colors, typography, spacing values)
  - Asset export package (icons, logos, images, illustrations)
  - Interaction specifications (animations, transitions, micro-interactions)
  - Responsive breakpoints and layout guidelines
  - Ant Design component mapping and customization notes

- **Approval artifacts:**
  - Stakeholder sign-off document with approval date
  - Consolidated feedback log with resolutions and deferral decisions
  - Deferred design improvements documented for Phase 1/2

### Acceptance Criteria

- [x] All MVP features (F-001 through F-011) have high-fidelity prototypes completed.
- [x] Prototypes validated with at least 2 stakeholders (Product Owner + 1 other).
- [x] All critical feedback incorporated or explicitly logged as deferred with rationale.
- [x] Product Owner formal sign-off obtained and documented.
- [x] Design handoff documentation complete and reviewed by Tech Lead and Frontend Engineer.
- [x] UI/UX Designer conducted walkthrough session with Frontend Engineer (Q&A completed).
- [x] Accessibility baseline (WCAG 2.1 AA) validated for all critical user flows.
- [x] Responsive design variants documented for mobile and tablet breakpoints.
- [x] Design system tokens ready for implementation (colors, typography, spacing).

### Dependencies and Blockers

**Blocks:**
- Frontend UI implementation (cannot start building screens without approved designs)
- Frontend component library setup (needs design tokens and component specifications)

**Requires:**
- Requirements v1.6 complete (F-001 through F-011) ✅ Complete
- User personas documented ✅ Exists in `docs/00-context/user-personas.md`
- Existing prototypes in `docs/05-prototype/` ✅ 15+ screens already created

**Can Run in Parallel With:**
- Phase 0 Foundation & Engineering Readiness (backend setup, database, CI/CD, standards docs)

**Coordination Points:**
- Day 5-7: Frontend Engineer available for design handoff review
- Day 7: Joint readiness gate with Phase 0 before MVP starts

---

## Phase 0 (Foundation & Engineering Readiness)

> **Execution Model:** Runs in parallel with Phase -1. Both phases must complete before MVP Week 1 begins.

### Goals

1. Establish complete development environment with < 30 min setup time for new engineers.
2. Configure all linting, formatting, and CI/CD quality gates.
3. Define and document project structure and coding standards.
4. Implement database foundation with schema, migrations, and seed data.
5. Create API baseline with authentication middleware and health checks.
6. Enable all engineers to start MVP feature work with clear conventions.

### Prioritized Tasks

| Priority | Task                                    | Owner            | Estimate | Deliverable                                      |
| -------- | --------------------------------------- | ---------------- | -------- | ------------------------------------------------ |
| Must     | Repository structure & tooling config   | Tech Lead        | 1 day    | Monorepo structure, linter configs, pre-commit hooks |
| Must     | Development environment setup guide     | Tech Lead        | 2 days   | `docs/development/SETUP.md`                      |
| Must     | Project structure standards             | Tech Lead        | 1 day    | `docs/development/PROJECT_STRUCTURE.md`          |
| Must     | CI/CD pipeline implementation           | Backend Engineer | 2-3 days | GitHub Actions workflows for backend + frontend  |
| Must     | Database foundation                     | Backend Engineer | 2 days   | Schema, Alembic migrations, seed data scripts    |
| Must     | API contract & auth middleware baseline | Backend Engineer | 2 days   | FastAPI baseline, JWT auth, health endpoints     |
| Must     | Coding standards (essential)            | Tech Lead        | 1 day    | `docs/development/CODING_STANDARDS.md`           |
| Must     | Testing standards (essential)           | Tech Lead        | 1 day    | `docs/development/TESTING_STANDARDS.md`          |
| Must     | Code review guidelines                  | Tech Lead        | 0.5 days | `docs/development/CODE_REVIEW.md`                |

### Key Deliverables

- **Monorepo structure:** Backend and frontend folders with Clean Architecture and feature-based organization.
- **Development environment guide:** Complete setup documentation enabling < 30 minute onboarding.
- **CI/CD pipelines:** Automated quality gates (lint, type-check, test) for backend and frontend.
- **Database foundation:** PostgreSQL schema, migration framework (Alembic), and seed data for local development.
- **API baseline:** FastAPI application with versioning (`/api/v1/`), JWT authentication, CORS, error handling, and health checks.
- **Engineering standards:** Essential coding standards, testing patterns, and code review guidelines.
- **Tooling configuration:** Black, Ruff, mypy (backend); ESLint, Prettier, TypeScript strict (frontend).

### Acceptance Criteria

- [x] All engineers can clone repo and run full stack locally within 30 minutes.
- [x] Backend CI pipeline operational and passing (lint, type-check, test).
- [x] Frontend CI pipeline operational and passing (lint, type-check, test).
- [x] Database migrations execute successfully; seed data loads without errors.
- [x] Health check endpoints (`/health`, `/ready`) respond with 200 status.
- [x] OpenAPI documentation endpoint (`/docs`) accessible and functional.
- [x] All Phase 0 documentation reviewed and approved by engineering team.
- [x] Branch protection rules active on `main` branch (require CI pass + 1 approval).
- [x] At least one practice PR created, reviewed, and merged using new standards.

### Dependencies and Blockers

**Blocks:**
- All MVP phase features (F-001 through F-011) - cannot start feature implementation without foundation.

**Requires:**
- Supabase project created and configured.
- GitHub repository initialized with appropriate permissions.
- GitHub Actions enabled for CI/CD workflows.
- Team access to development tools (Python 3.12+, Node.js 18+, Docker).

**Can Run in Parallel With:**
- Phase -1 UI/UX Prototyping & Validation (no dependencies between backend setup and UI design)

**Coordination Points:**
- Day 5-7: Frontend Engineer transitions from tooling setup to design handoff review with UI/UX Designer
- Day 7: Joint readiness gate - both Phase -1 and Phase 0 must be complete before MVP starts

---

## MVP Phase

### Goals

1. Deliver the core planning workflow with feature coverage for `F-001` to `F-004`.
2. Validate secure access and essential auth entry flows (`F-007`, `F-009`).
3. Support the Viewer access slice of `F-011` — invite, accept, and read granted projects.
4. Ensure Must-priority quality baselines are mapped and owned.
5. Run AI refinement on a platform-provided provider key; credit accounting and user-managed
   keys (`F-010`) are deferred to Phase 1.

### Capacity Basis

MVP scope is sized against an explicit assumption so that `NFR-X08` is checkable rather than
aspirational: **2 developers at ~12 story points per developer per week**. Phase -1 and
Phase 0 are complete, so EPIC-0's 64 points are already delivered and excluded.

| Measure | Value |
| ------- | ----- |
| MVP-1 total | 314 points across 66 stories |
| Already delivered (EPIC-0) | 64 points |
| Remaining MVP work | **250 points** |
| Assumed velocity | ~24 points per week |
| Implied duration | **~10-11 weeks (2.5 months)** |

This exceeds the original 1–1.5 month target even after deferring `F-010`, the Viewer
management tail, validation testing, and all Phase 1 scope. `NFR-X08` has been updated to
match the scope the plan can actually deliver. Shortening it further means cutting from the
core loop (lifecycle, refinement, approval, backlog, export, access), which would leave the
MVP without a shippable end-to-end workflow. Re-derive these numbers if team size changes.

### Prioritized Epics

| Priority | Epic                                       | Linked Feature(s) | Linked Requirements                                                | Owner            |
| -------- | ------------------------------------------ | ----------------- | ------------------------------------------------------------------ | ---------------- |
| Must     | Client and project lifecycle governance (EPIC-1)    | F-001             | FR-001-01, FR-001-02, FR-001-03, FR-001-04, FR-001-05, FR-001-06, FR-001-07; NFR-001-01, NFR-001-02, NFR-001-03 | Product Owner    |
| Must     | AI refinement and approval control (EPIC-3)         | F-002             | FR-002-01, FR-002-02, FR-002-03, FR-002-04, FR-002-05, FR-002-06; NFR-002-01, NFR-002-02, NFR-002-03 | Product Owner    |
| Must     | Access boundary and role enforcement (EPIC-4)       | F-003             | FR-003-01, FR-003-02, FR-003-03; NFR-003-01, NFR-003-02, NFR-003-03 | Tech Lead        |
| Must     | Backlog and export deliverable (EPIC-5)             | F-004             | FR-004-01, FR-004-02, FR-004-03, FR-004-05; NFR-004-01, NFR-004-02 | Backend Engineer |
| Must     | Admin authentication and recovery baseline (EPIC-2) | F-007, F-009      | FR-007-01, FR-007-02, FR-007-03, FR-007-04, FR-007-05, FR-007-06, FR-007-07; FR-009-01, FR-009-02, FR-009-03, FR-009-04, FR-009-05, FR-009-06; NFR-007-01, NFR-007-02, NFR-007-03; NFR-009-01, NFR-009-02, NFR-009-03; NFR-003-04 | Tech Lead        |
| Must     | Viewer access slice (EPIC-7)                        | F-011             | FR-011-01, FR-011-02, FR-011-03, FR-011-04, FR-011-05, FR-011-06, FR-011-09, FR-011-11, FR-011-12; NFR-011-01, NFR-011-02, NFR-011-03, NFR-011-04, NFR-011-05 | Tech Lead        |
| Must     | Cross-cut quality baseline (EPIC-9)                 | F-001 to F-011    | NFR-X01, NFR-X02, NFR-X03, NFR-X08, NFR-X09, NFR-X10 | Tech Lead        |
| Must     | Code quality tooling baseline (EPIC-12)             | F-001 to F-011    | NFR-X01, NFR-X03 | Tech Lead        |

### Key Deliverables

- MVP scope baseline linked to feature-level requirements (F-001 to F-004, F-007, F-009, and
  the F-011 access slice).
- Role-safe, approvable requirements backlog and Markdown export definition.
- Viewer invitation, acceptance, and project-level access controls.
- AI refinement running on a platform-provided provider key (credit accounting and
  user-managed keys deferred to Phase 1).
- Security and privacy checklist for Must-priority workflows.
- Automated code quality baseline (lint, format, type-check, pre-commit hooks, CI gates).
- Traceability matrix generated from the work items in `work-items/`.

### Acceptance Criteria

- [ ] All `Must` functional requirements in MVP scope are linked to an epic and owner.
- [ ] All `Must` non-functional requirements are tied to measurable checks.
- [ ] MVP excludes non-core collaboration expansion and non-essential integrations.
- [ ] Remaining MVP effort stays within the capacity basis above, or the scope is re-cut.

### Prerequisites

**Requires completion of:**
- Phase -1 (UI/UX Prototyping & Validation) - all designs approved and handed off ✅
- Phase 0 (Foundation & Engineering Readiness) - infrastructure and standards complete ✅

---

## Phase 1

### Goals

1. Improve first-use quality and public entry clarity (`F-005`, `F-006`, `F-008`).
2. Strengthen readability, accessibility, and stakeholder transparency.
3. Raise interface craft above component-library defaults and make public entry pages discoverable.

### Prioritized Epics

| Priority | Epic                                    | Linked Feature(s)   | Linked Requirements                                    | Owner             |
| -------- | --------------------------------------- | ------------------- | ------------------------------------------------------ | ----------------- |
| Should   | Minimal onboarding quality uplift       | F-005               | FR-005-01, NFR-005-01, NFR-005-02                      | UI/UX Designer    |
| Should   | Landing page messaging and conversion   | F-006               | FR-006-03, NFR-006-01, NFR-006-02                      | Frontend Engineer |
| Should   | Account creation flow maturity          | F-008               | FR-008-03, NFR-008-02                                  | Frontend Engineer |
| Should   | Readability and accessibility hardening | F-003, F-004, F-007 | FR-003-03, NFR-003-03, NFR-004-01, NFR-007-02, NFR-X07 | UI/UX Designer    |
| Should   | SEO and discoverability (EPIC-10)       | F-006               | FR-006-01, FR-006-03, NFR-006-01, NFR-006-02, NFR-X11  | Frontend Engineer |
| Should   | UI craft and design quality (EPIC-11)   | F-001 to F-011      | NFR-X04, NFR-X07                                       | UI/UX Designer    |
| Must     | AI credits and API key management (EPIC-6) | F-010            | FR-010-01, FR-010-02, FR-010-03, FR-010-04, FR-010-05, FR-010-06, FR-010-07, FR-010-08, FR-010-09, FR-010-10, FR-010-11, FR-010-12; NFR-010-01, NFR-010-02, NFR-010-03, NFR-010-04, NFR-010-05, NFR-010-06 | Tech Lead         |
| Must     | Provider selection and credit consumption (EPIC-3) | F-002    | FR-002-07, FR-002-08 | Backend Engineer  |
| Should   | Export scoping and empty-export guard (EPIC-5) | F-004        | FR-004-04, FR-004-06 | Backend Engineer  |
| Should   | Viewer invitation management tail (EPIC-7) | F-011            | FR-011-07, FR-011-08, FR-011-10 | Backend Engineer  |
| Should   | Validation testing and accessibility audit (EPIC-9) | F-001 to F-011 | NFR-X03, NFR-X04, NFR-X05, NFR-X06, NFR-X07 | Tech Lead         |
| Should   | Architecture guards and dependency review (EPIC-12) | F-001 to F-011 | NFR-X01, NFR-X03 | Tech Lead         |

### Key Deliverables

- Improved onboarding and auth-adjacent user journey artifacts.
- Accessibility and readability validation checklist per feature.
- Updated feature traceability with Phase 1 story ownership.

### Acceptance Criteria

- [ ] All `Should` requirements in Phase 1 have explicit quality targets and owners.
- [ ] Viewer-facing outputs remain readable, non-technical, and read-only.

---

## Phase 2 (Future)

### Goals

1. Formalize governance for backlog evolution and cross-phase traceability quality.
2. Prepare scale-readiness and dependency governance without implementation commitments.

### Prioritized Epics

| Priority | Epic                                 | Linked Feature(s) | Linked Requirements       | Owner         |
| -------- | ------------------------------------ | ----------------- | ------------------------- | ------------- |
| Could    | Cross-phase traceability governance  | F-001 to F-011    | NFR-X03, NFR-X05, NFR-X06 | Tech Lead     |
| Could    | Risk and dependency governance model | F-001 to F-011    | NFR-X02, NFR-X08          | Tech Lead     |
| Could    | Future collaboration policy framing  | F-003             | FR-003-02                 | Product Owner |

### Key Deliverables

- Governance-ready traceability matrix maintenance policy.
- Cross-phase risk and dependency register updates.
- Prioritization rationale for post-MVP candidates.

### Acceptance Criteria

- [ ] All Phase 2 entries are documented as candidates with dependency links.
- [ ] No Phase 2 item introduces implementation design or tech-stack commitments.
- [ ] Prioritization rationale is captured for each candidate epic.

---

## Feature Traceability Matrix

| Feature ID | Feature Name | Phase | Priority | Linked Epic(s) | Linked Stories (US-\*) — (M) MVP-1, (P1) Phase 1 | Status |
| ---------- | ------------ | ----- | -------- | -------------- | ------------------------------------------------ | ------ |
| F-001 | Client and Project Lifecycle Management | MVP-1 | Must | EPIC-1, EPIC-9 | US-EP1-BE-001 (M), US-EP1-BE-002 (M), US-EP1-BE-003 (M), US-EP1-BE-004 (M), US-EP1-FE-001 (M), US-EP1-FE-002 (M), US-EP1-REL-001 (M), US-EP1-UX-001 (M), US-EP9-BE-004 (M) | Planned |
| F-002 | AI Refinement and Approval Workflow | MVP-1 + Phase 1 | Must | EPIC-3, EPIC-11 | US-EP3-BE-001 (M), US-EP3-BE-002 (M), US-EP3-BE-003 (M), US-EP3-BE-004 (M), US-EP3-BE-005 (P1), US-EP3-FE-001 (M), US-EP3-FE-002 (M), US-EP3-REL-001 (M), US-EP3-UX-001 (M), US-EP11-FE-002 (P1), US-EP11-FE-005 (P1) | Planned |
| F-003 | Access Control and Visibility Boundaries | MVP-1 + Phase 1 | Must | EPIC-2, EPIC-4, EPIC-9, EPIC-11 | US-EP2-BE-004 (M), US-EP4-BE-001 (M), US-EP4-FE-001 (M), US-EP4-REL-001 (M), US-EP4-UX-001 (M), US-EP9-BE-002 (M), US-EP11-FE-004 (P1) | Planned |
| F-004 | Requirements Backlog and Markdown Export | MVP-1 + Phase 1 | Must | EPIC-5, EPIC-11 | US-EP5-BE-001 (M), US-EP5-BE-002 (M), US-EP5-BE-003 (P1), US-EP5-FE-001 (M), US-EP5-FE-002 (M), US-EP5-REL-001 (M), US-EP5-UX-001 (M), US-EP11-FE-003 (P1) | Planned |
| F-005 | Minimal Onboarding | Phase 1 | Should | EPIC-8 | US-EP8-BE-001 (P1), US-EP8-FE-001 (P1), US-EP8-REL-001 (P1), US-EP8-UX-001 (P1) | Planned |
| F-006 | Landing Page Experience | Phase 1 | Must | EPIC-8, EPIC-10, EPIC-11 | US-EP8-FE-002 (P1), US-EP8-REL-002 (P1), US-EP8-UX-002 (P1), US-EP10-FE-001 (P1), US-EP10-FE-004 (P1), US-EP10-QA-001 (P1), US-EP11-FE-004 (P1) | Planned |
| F-007 | Admin Login | MVP-1 | Must | EPIC-2 | US-EP2-BE-001 (M), US-EP2-BE-003 (M), US-EP2-BE-004 (M), US-EP2-FE-001 (M), US-EP2-FE-003 (M), US-EP2-REL-001 (M) | Planned |
| F-008 | Account Creation | Phase 1 | Should | EPIC-8 | US-EP8-BE-002 (P1), US-EP8-BE-003 (P1), US-EP8-FE-003 (P1), US-EP8-FE-004 (P1), US-EP8-REL-003 (P1), US-EP8-UX-003 (P1) | Planned |
| F-009 | Reset Password | MVP-1 | Must | EPIC-2 | US-EP2-BE-002 (M), US-EP2-BE-005 (M), US-EP2-FE-002 (M), US-EP2-REL-002 (M) | Planned |
| F-010 | AI Credits and API Key Management | Phase 1 | Must | EPIC-6 | US-EP6-BE-001 (P1), US-EP6-BE-002 (P1), US-EP6-BE-003 (P1), US-EP6-BE-004 (P1), US-EP6-BE-005 (P1), US-EP6-FE-001 (P1), US-EP6-FE-002 (P1), US-EP6-REL-001 (P1), US-EP6-UX-001 (P1) | Planned |
| F-011 | Client Review Access (superseded Viewer Account Management, ADR-020) | MVP-1 + Phase 1 | Must | EPIC-7 (superseded) | US-EP7-BE-001 (M), US-EP7-BE-002 (M), US-EP7-BE-003 (P1), US-EP7-BE-004 (M), US-EP7-BE-005 (M), US-EP7-FE-001 (M), US-EP7-FE-002 (M), US-EP7-REL-001 (M), US-EP7-UX-001 (M) | Planned |
| NFR-X01–X11 | Cross-Cutting Quality Baseline | MVP-1 + Phase 1 | Must | EPIC-9 | US-EP9-BE-001 (M), US-EP9-BE-002 (M), US-EP9-BE-003 (M), US-EP9-BE-004 (M), US-EP9-PO-001 (M), US-EP9-QA-001 (M), US-EP9-QA-002 (P1), US-EP9-QA-003 (P1), US-EP9-QA-004 (P1), US-EP9-UX-001 (P1) | Planned |
| — | Foundational Setup and Deployment | MVP-1 | Must | EPIC-0 | US-EP0-BE-001 (M), US-EP0-BE-002 (M), US-EP0-BE-003 (M), US-EP0-BE-004 (M), US-EP0-BE-005 (M), US-EP0-BE-006 (M), US-EP0-FE-001 (M), US-EP0-SP-001 (M), US-EP0-SP-002 (M), US-EP0-SP-003 (M), US-EP0-SP-004 (M) | Planned |
| NFR-X11 | SEO and Discoverability | Phase 1 | Should | EPIC-10 | US-EP10-FE-001 (P1), US-EP10-FE-002 (P1), US-EP10-FE-003 (P1), US-EP10-FE-004 (P1), US-EP10-FE-005 (P1), US-EP10-QA-001 (P1) | Planned |
| — | UI Craft and Design Quality | Phase 1 | Should | EPIC-11 | US-EP11-FE-001 (P1), US-EP11-FE-002 (P1), US-EP11-FE-003 (P1), US-EP11-FE-004 (P1), US-EP11-FE-005 (P1), US-EP11-FE-006 (P1), US-EP11-FE-007 (P1), US-EP11-UX-001 (P1) | Planned |
| NFR-X01, NFR-X03 | Code Quality and Maintainability | MVP-1 + Phase 1 | Must | EPIC-12 | US-EP12-BE-001 (M), US-EP12-BE-002 (M), US-EP12-BE-003 (M), US-EP12-BE-004 (P1), US-EP12-BE-005 (P1), US-EP12-FE-001 (M), US-EP12-QA-001 (M) | Planned |
---

## Risks and Blockers

| Risk / Blocker                                   | Phase Impacted | Probability | Impact | Mitigation                                                    | Owner          |
| ------------------------------------------------ | -------------- | ----------- | ------ | ------------------------------------------------------------- | -------------- |
| Scope creep between core planning and auth UX    | MVP, Phase 1   | Medium      | High   | Strict MoSCoW gating and feature-to-phase traceability checks | Product Owner  |
| Ambiguity in requirement ID ownership            | MVP            | Medium      | High   | Maintain requirement-level ownership table in role mapping    | Tech Lead      |
| Entry-flow quality drops due to split priorities | Phase 1        | Medium      | Medium | Shared UX+FE checkpoint before phase sign-off                 | UI/UX Designer |
| API key management security complexity           | MVP            | Medium      | High   | Enforce NFR-010-01, NFR-010-02, NFR-010-03, NFR-010-04 security baseline; security review mandatory | Tech Lead      |
| Email delivery reliability for invitations       | MVP            | Low         | High   | Implement NFR-X10 with retry logic; monitor delivery metrics  | Tech Lead      |
| Prototypes require major rework during validation| Phase -1       | Low         | Medium | Early stakeholder involvement; iterate on feedback quickly; existing prototypes reduce risk | UI/UX Designer |
| Phase -1 and Phase 0 not completing in sync     | Week 0         | Medium      | High   | Daily coordination; contingency buffer 2-3 days if needed; Frontend Engineer helps both tracks | Tech Lead      |

## Source References

- [Project Overview](../00-context/overview.md)
- [Feature Requirements](../01-requirements/README.md)

---

**Last Updated**: 2026-07-30

> **Note (2026-10-02):** Rows and phases above that mention Viewer invitation, acceptance, or project-level access grants describe the original F-011. ADR-020 replaced them with account-free Client Review through a project access code, so EPIC-7 is no longer planned.

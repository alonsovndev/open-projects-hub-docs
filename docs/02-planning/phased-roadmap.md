# Phased Roadmap

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.4                         |
| **Status**       | Ready for Implementation              |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)

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
| MVP      | Core Planning Backbone             | Deliver core planning value with secure access and exports            | Planned | Weeks 1-4          | Sequential |
| Phase 1  | UX and Entry-Flow Hardening        | Improve onboarding and auth-adjacent user quality                     | Planned | Weeks 5-6          | Sequential |
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
  - Requirements backlog - Viewer view (read-only) (F-003, F-004)
  - Markdown export flow and confirmation (F-004)
  - AI credits management and API key configuration (F-010)
  - Viewer invitation and access grant flow (F-011)
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
- User personas documented ✅ Exists in `docs/user-personas.md`
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
3. Enable AI refinement with credit management and API key flexibility (`F-010`).
4. Support Viewer account management and invitations (`F-011`).
5. Ensure Must-priority quality baselines are mapped and owned.

### Prioritized Epics

| Priority | Epic                                       | Linked Feature(s) | Linked Requirements                                                | Owner            |
| -------- | ------------------------------------------ | ----------------- | ------------------------------------------------------------------ | ---------------- |
| Must     | Client and project lifecycle governance    | F-001             | FR-001-01, FR-001-02, FR-001-03, NFR-001-01                        | Product Owner    |
| Must     | AI refinement and approval control         | F-002             | FR-002-01, FR-002-02, FR-002-03, NFR-002-01                        | Product Owner    |
| Must     | Access boundary and role enforcement       | F-003             | FR-003-01, FR-003-02, NFR-003-01                                   | Tech Lead        |
| Must     | Backlog and export deliverable             | F-004             | FR-004-01, FR-004-02                                               | Backend Engineer |
| Must     | Admin authentication and recovery baseline | F-007, F-009      | FR-007-01, FR-007-02, FR-009-01, FR-009-02, NFR-007-01, NFR-009-01 | Tech Lead        |
| Must     | AI credits and API key management          | F-010             | FR-010-01 to FR-010-12, NFR-010-01 to NFR-010-06                   | Tech Lead        |
| Must     | Viewer account management                  | F-011             | FR-011-01 to FR-011-12, NFR-011-01 to NFR-011-06                   | Tech Lead        |
| Must     | Cross-cut quality baseline ([EPIC-9](../05-work-items/EPIC-9-quality-baseline/)) | F-001 to F-011    | NFR-X01, NFR-X02, NFR-X03, NFR-X09, NFR-X10                        | Tech Lead        |

### Key Deliverables

- MVP scope baseline linked to feature-level requirements (F-001 to F-011).
- Role-safe, approvable requirements backlog and Markdown export definition.
- AI credit system with 5 free credits per account and secure API key management.
- Viewer invitation workflow with project-level access controls.
- Security and privacy checklist for Must-priority workflows.
- Initial traceability matrix with story placeholders per feature.

### Acceptance Criteria

- [ ] All `Must` functional requirements in MVP scope are linked to an epic and owner.
- [ ] All `Must` non-functional requirements are tied to measurable checks.
- [ ] MVP excludes non-core collaboration expansion and non-essential integrations.

### Prerequisites

**Requires completion of:**
- Phase -1 (UI/UX Prototyping & Validation) - all designs approved and handed off ✅
- Phase 0 (Foundation & Engineering Readiness) - infrastructure and standards complete ✅

---

## Phase 1

### Goals

1. Improve first-use quality and public entry clarity (`F-005`, `F-006`, `F-008`).
2. Strengthen readability, accessibility, and stakeholder transparency.

### Prioritized Epics

| Priority | Epic                                    | Linked Feature(s)   | Linked Requirements                                    | Owner             |
| -------- | --------------------------------------- | ------------------- | ------------------------------------------------------ | ----------------- |
| Should   | Minimal onboarding quality uplift       | F-005               | FR-005-01, NFR-005-01, NFR-005-02                      | UI/UX Designer    |
| Should   | Landing page messaging and conversion   | F-006               | FR-006-03, NFR-006-01, NFR-006-02                      | Frontend Engineer |
| Should   | Account creation flow maturity          | F-008               | FR-008-03, NFR-008-02                                  | Frontend Engineer |
| Should   | Readability and accessibility hardening | F-003, F-004, F-007 | FR-003-03, NFR-003-03, NFR-004-01, NFR-007-02, NFR-X07 | UI/UX Designer    |

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

| Feature ID | Feature Name                             | Phase   | Priority | Linked Epic(s)                             | Linked Stories (US-\*)       | Status  |
| ---------- | ---------------------------------------- | ------- | -------- | ------------------------------------------ | ---------------------------- | ------- |
| F-001      | Client and Project Lifecycle Management  | MVP     | Must     | [EPIC-1](../05-work-items/EPIC-1-lifecycle-governance/) | US-EP1-UX-001, US-EP1-BE-001, US-EP1-BE-002, US-EP1-FE-001 | Planned |
| F-002      | AI Refinement and Approval Workflow      | MVP     | Must     | [EPIC-3](../05-work-items/EPIC-3-ai-refinement/) | US-EP3-UX-001, US-EP3-BE-001, US-EP3-FE-001 | Planned |
| F-003      | Access Control and Visibility Boundaries | MVP     | Must     | [EPIC-4](../05-work-items/EPIC-4-access-boundaries/) | US-EP4-UX-001, US-EP4-BE-001, US-EP4-FE-001 | Planned |
| F-004      | Requirements Backlog and Markdown Export | MVP     | Must     | [EPIC-5](../05-work-items/EPIC-5-backlog-export/) | US-EP5-UX-001, US-EP5-BE-001, US-EP5-FE-001 | Planned |
| F-005      | Minimal Onboarding                       | Phase 1 | Should   | [EPIC-8](../05-work-items/EPIC-8-entry-flow/) | US-EP8-UX-001, US-EP8-BE-001, US-EP8-FE-001 | Planned |
| F-006      | Landing Page Experience                  | Phase 1 | Must     | [EPIC-8](../05-work-items/EPIC-8-entry-flow/) | US-EP8-UX-002, US-EP8-FE-002 | Planned |
| F-007      | Admin Login                              | MVP     | Must     | [EPIC-2](../05-work-items/EPIC-2-user-authentication/) | US-EP2-BE-001, US-EP2-FE-001 | Planned |
| F-008      | Account Creation                         | Phase 1 | Should   | [EPIC-8](../05-work-items/EPIC-8-entry-flow/) | US-EP8-UX-003, US-EP8-BE-002, US-EP8-FE-003 | Planned |
| F-009      | Reset Password                           | MVP     | Must     | [EPIC-2](../05-work-items/EPIC-2-user-authentication/) | US-EP2-BE-002, US-EP2-FE-002 | Planned |
| F-010      | AI Credits and API Key Management        | MVP     | Must     | [EPIC-6](../05-work-items/EPIC-6-ai-monetization-config/) | US-EP6-UX-001, US-EP6-BE-001, US-EP6-BE-002, US-EP6-FE-001 | Planned |
| F-011      | Viewer Account Management                | MVP     | Must     | [EPIC-7](../05-work-items/EPIC-7-viewer-collaboration-lifecycle/) | US-EP7-UX-001, US-EP7-BE-001, US-EP7-BE-002, US-EP7-FE-001 | Planned |
| NFR-X01–X10| Cross-Cutting Quality Baseline           | MVP     | Must     | [EPIC-9](../05-work-items/EPIC-9-quality-baseline/) | US-EP9-BE-001 to US-EP9-BE-004, US-EP9-QA-001 to US-EP9-QA-003, US-EP9-UX-001 | Planned |
| —          | Production Deployment Pipeline           | MVP     | Must     | [EPIC-0](../05-work-items/EPIC-0-foundational/) | US-EP0-BE-005 | Planned |
| —          | Monitoring & Observability               | MVP     | Should   | [EPIC-0](../05-work-items/EPIC-0-foundational/) | US-EP0-BE-006 | Planned |
| —          | API Key Rotation & Provider Fallback     | MVP     | Must     | [EPIC-6](../05-work-items/EPIC-6-ai-monetization-config/) | US-EP6-BE-003 | Planned |
| —          | Invitation Lifecycle Management          | MVP     | Should   | [EPIC-7](../05-work-items/EPIC-7-viewer-collaboration-lifecycle/) | US-EP7-BE-003 | Planned |

---

## Risks and Blockers

| Risk / Blocker                                   | Phase Impacted | Probability | Impact | Mitigation                                                    | Owner          |
| ------------------------------------------------ | -------------- | ----------- | ------ | ------------------------------------------------------------- | -------------- |
| Scope creep between core planning and auth UX    | MVP, Phase 1   | Medium      | High   | Strict MoSCoW gating and feature-to-phase traceability checks | Product Owner  |
| Ambiguity in requirement ID ownership            | MVP            | Medium      | High   | Maintain requirement-level ownership table in role mapping    | Tech Lead      |
| Entry-flow quality drops due to split priorities | Phase 1        | Medium      | Medium | Shared UX+FE checkpoint before phase sign-off                 | UI/UX Designer |
| API key management security complexity           | MVP            | Medium      | High   | Enforce NFR-010-01 to NFR-010-04 security baseline; security review mandatory | Tech Lead      |
| Email delivery reliability for invitations       | MVP            | Low         | High   | Implement NFR-X10 with retry logic; monitor delivery metrics  | Tech Lead      |
| Prototypes require major rework during validation| Phase -1       | Low         | Medium | Early stakeholder involvement; iterate on feedback quickly; existing prototypes reduce risk | UI/UX Designer |
| Phase -1 and Phase 0 not completing in sync     | Week 0         | Medium      | High   | Daily coordination; contingency buffer 2-3 days if needed; Frontend Engineer helps both tracks | Tech Lead      |

---

## Change Log

| Date       | Version | Change Summary                                                               | Author        |
| ---------- | ------- | ---------------------------------------------------------------------------- | ------------- |
| 2026-07-30 | 1.4     | Added Phase -1 (UI/UX Prototyping & Validation) running parallel with Phase 0; updated phase overview with execution modes; added design approval gates and handoff process. | Product Owner |
| 2026-07-30 | 1.3     | Added Phase 0 (Foundation & Engineering Readiness) with 9 must-have tasks before MVP; updated phase overview and timeline. | Product Owner |
| 2026-07-30 | 1.2     | Added F-010 and F-011 to MVP phase; updated goals, deliverables, traceability matrix, and risks; aligned with requirements v1.6. | Product Owner |
| 2026-03-23 | 1.1     | Refactored roadmap to template structure and aligned to feature-based model. | Product Owner |
| 2026-02-28 | 1.0     | Initial phased roadmap draft created.                                        | Product Owner |

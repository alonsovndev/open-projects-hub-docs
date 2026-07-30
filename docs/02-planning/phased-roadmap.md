# Phased Roadmap

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.3                         |
| **Status**       | Review Pending              |
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

| Phase   | Name                               | Objective                                                              | Status  | Target Window  |
| ------- | ---------------------------------- | ---------------------------------------------------------------------- | ------- | -------------- |
| Phase 0 | Foundation & Engineering Readiness | Establish development infrastructure and standards before feature work | Planned | Week 0 (1-2 weeks) |
| MVP     | Core Planning Backbone             | Deliver core planning value with secure access and exports            | Planned | Weeks 1-4      |
| Phase 1 | UX and Entry-Flow Hardening        | Improve onboarding and auth-adjacent user quality                     | Planned | Weeks 5-6      |
| Phase 2 | Governance and Scale Preparation   | Prepare post-MVP governance, traceability depth, and scale plan       | Planned | TBD            |

---

## Phase 0 (Foundation & Engineering Readiness)

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

- [ ] All engineers can clone repo and run full stack locally within 30 minutes.
- [ ] Backend CI pipeline operational and passing (lint, type-check, test).
- [ ] Frontend CI pipeline operational and passing (lint, type-check, test).
- [ ] Database migrations execute successfully; seed data loads without errors.
- [ ] Health check endpoints (`/health`, `/ready`) respond with 200 status.
- [ ] OpenAPI documentation endpoint (`/docs`) accessible and functional.
- [ ] All Phase 0 documentation reviewed and approved by engineering team.
- [ ] Branch protection rules active on `main` branch (require CI pass + 1 approval).
- [ ] At least one practice PR created, reviewed, and merged using new standards.

### Dependencies and Blockers

**Blocks:**
- All MVP phase features (F-001 through F-011) - cannot start feature implementation without foundation.

**Requires:**
- Supabase project created and configured.
- GitHub repository initialized with appropriate permissions.
- GitHub Actions enabled for CI/CD workflows.
- Team access to development tools (Python 3.12+, Node.js 18+, Docker).

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
| Must     | Cross-cut quality baseline                 | F-001 to F-011    | NFR-X01, NFR-X02, NFR-X03, NFR-X09, NFR-X10                        | Tech Lead        |

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
| Could    | Cross-phase traceability governance  | F-001 to F-009    | NFR-X03, NFR-X05, NFR-X06 | Tech Lead     |
| Could    | Risk and dependency governance model | F-001 to F-009    | NFR-X02, NFR-X08          | Tech Lead     |
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
| F-001      | Client and Project Lifecycle Management  | MVP     | Must     | Client and project lifecycle governance    | US-BE-MVP-001, US-FE-MVP-001 | Planned |
| F-002      | AI Refinement and Approval Workflow      | MVP     | Must     | AI refinement and approval control         | US-BE-MVP-002, US-FE-MVP-002 | Planned |
| F-003      | Access Control and Visibility Boundaries | MVP     | Must     | Access boundary and role enforcement       | US-BE-MVP-003, US-FE-MVP-003 | Planned |
| F-004      | Requirements Backlog and Markdown Export | MVP     | Must     | Backlog and export deliverable             | US-BE-MVP-004, US-FE-MVP-004 | Planned |
| F-005      | Minimal Onboarding                       | Phase 1 | Should   | Minimal onboarding quality uplift          | US-UX-P1-001, US-FE-P1-001   | Planned |
| F-006      | Landing Page Experience                  | Phase 1 | Must     | Landing page messaging and conversion      | US-UX-P1-002, US-FE-P1-002   | Planned |
| F-007      | Admin Login                              | MVP     | Must     | Admin authentication and recovery baseline | US-BE-MVP-005, US-FE-MVP-005 | Planned |
| F-008      | Account Creation                         | Phase 1 | Should   | Account creation flow maturity             | US-BE-P1-003, US-FE-P1-003   | Planned |
| F-009      | Reset Password                           | MVP     | Must     | Admin authentication and recovery baseline | US-BE-MVP-006, US-FE-MVP-006 | Planned |
| F-010      | AI Credits and API Key Management        | MVP     | Must     | AI credits and API key management          | US-BE-MVP-007, US-FE-MVP-007 | Planned |
| F-011      | Viewer Account Management                | MVP     | Must     | Viewer account management                  | US-BE-MVP-008, US-FE-MVP-008 | Planned |

---

## Risks and Blockers

| Risk / Blocker                                   | Phase Impacted | Probability | Impact | Mitigation                                                    | Owner          |
| ------------------------------------------------ | -------------- | ----------- | ------ | ------------------------------------------------------------- | -------------- |
| Scope creep between core planning and auth UX    | MVP, Phase 1   | Medium      | High   | Strict MoSCoW gating and feature-to-phase traceability checks | Product Owner  |
| Ambiguity in requirement ID ownership            | MVP            | Medium      | High   | Maintain requirement-level ownership table in role mapping    | Tech Lead      |
| Entry-flow quality drops due to split priorities | Phase 1        | Medium      | Medium | Shared UX+FE checkpoint before phase sign-off                 | UI/UX Designer |
| API key management security complexity           | MVP            | Medium      | High   | Enforce NFR-010-01 to NFR-010-04 security baseline; security review mandatory | Tech Lead      |
| Email delivery reliability for invitations       | MVP            | Low         | High   | Implement NFR-X10 with retry logic; monitor delivery metrics  | Tech Lead      |

---

## Change Log

| Date       | Version | Change Summary                                                               | Author        |
| ---------- | ------- | ---------------------------------------------------------------------------- | ------------- |
| 2026-07-30 | 1.3     | Added Phase 0 (Foundation & Engineering Readiness) with 9 must-have tasks before MVP; updated phase overview and timeline. | Product Owner |
| 2026-07-30 | 1.2     | Added F-010 and F-011 to MVP phase; updated goals, deliverables, traceability matrix, and risks; aligned with requirements v1.6. | Product Owner |
| 2026-03-23 | 1.1     | Refactored roadmap to template structure and aligned to feature-based model. | Product Owner |
| 2026-02-28 | 1.0     | Initial phased roadmap draft created.                                        | Product Owner |

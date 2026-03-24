# Phased Roadmap

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## How to Use (AI Agent Instructions)

- Keep phase boundaries driven by acceptance criteria and requirement readiness.
- Link every epic to at least one `FR-*` or `NFR-*` requirement.
- Place features in the earliest phase where scope is fully clarified.
- Update the Feature Traceability Matrix whenever features, epics, or story IDs change.

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

| Phase   | Name                             | Objective                                                       | Status  | Target Window |
| ------- | -------------------------------- | --------------------------------------------------------------- | ------- | ------------- |
| MVP     | Core Planning Backbone           | Deliver core planning value with secure access and exports      | Planned | Weeks 1-4     |
| Phase 1 | UX and Entry-Flow Hardening      | Improve onboarding and auth-adjacent user quality               | Planned | Weeks 5-6     |
| Phase 2 | Governance and Scale Preparation | Prepare post-MVP governance, traceability depth, and scale plan | Planned | TBD           |

---

## MVP Phase

### Goals

1. Deliver the core planning workflow with feature coverage for `F-001` to `F-004`.
2. Validate secure access and essential auth entry flows (`F-007`, `F-009`).
3. Ensure Must-priority quality baselines are mapped and owned.

### Prioritized Epics

| Priority | Epic                                       | Linked Feature(s) | Linked Requirements                                                | Owner            |
| -------- | ------------------------------------------ | ----------------- | ------------------------------------------------------------------ | ---------------- |
| Must     | Client and project lifecycle governance    | F-001             | FR-001-01, FR-001-02, FR-001-03, NFR-001-01                        | Product Owner    |
| Must     | AI refinement and approval control         | F-002             | FR-002-01, FR-002-02, FR-002-03, NFR-002-01                        | Product Owner    |
| Must     | Access boundary and role enforcement       | F-003             | FR-003-01, FR-003-02, NFR-003-01                                   | Tech Lead        |
| Must     | Backlog and export deliverable             | F-004             | FR-004-01, FR-004-02                                               | Backend Engineer |
| Must     | Admin authentication and recovery baseline | F-007, F-009      | FR-007-01, FR-007-02, FR-009-01, FR-009-02, NFR-007-01, NFR-009-01 | Tech Lead        |
| Must     | Cross-cut quality baseline                 | F-001 to F-009    | NFR-X01, NFR-X02, NFR-X03                                          | Tech Lead        |

### Key Deliverables

- MVP scope baseline linked to feature-level requirements.
- Role-safe, approvable requirements backlog and Markdown export definition.
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

---

## Risks and Blockers

| Risk / Blocker                                   | Phase Impacted | Probability | Impact | Mitigation                                                    | Owner          |
| ------------------------------------------------ | -------------- | ----------- | ------ | ------------------------------------------------------------- | -------------- |
| Scope creep between core planning and auth UX    | MVP, Phase 1   | Medium      | High   | Strict MoSCoW gating and feature-to-phase traceability checks | Product Owner  |
| Ambiguity in requirement ID ownership            | MVP            | Medium      | High   | Maintain requirement-level ownership table in role mapping    | Tech Lead      |
| Entry-flow quality drops due to split priorities | Phase 1        | Medium      | Medium | Shared UX+FE checkpoint before phase sign-off                 | UI/UX Designer |

---

## Change Log

| Date       | Version | Change Summary                                                               | Author        |
| ---------- | ------- | ---------------------------------------------------------------------------- | ------------- |
| 2026-03-23 | 1.1     | Refactored roadmap to template structure and aligned to feature-based model. | Product Owner |
| 2026-02-28 | 1.0     | Initial phased roadmap draft created.                                        | Product Owner |

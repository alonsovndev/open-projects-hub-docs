# Phased Roadmap

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Product Owner    |

## How to Use (AI Agent Instructions)

- Keep phase boundaries driven by requirement readiness and launch risk reduction.
- Link every epic to at least one existing `FR-*` or `NFR-*` ID from `../01-requirements/`.
- Keep MVP focused on launch-ready patient acquisition and lightweight clinic operations.
- Update the Feature Traceability Matrix whenever features or epics shift between phases.

## Sources

- [Project Overview](../overview.md)
- [Open Questions](../open-questions.md)
- [User Personas](../user-personas.md)
- [Feature Requirements](../01-requirements/readme.md)

## Planning Principles

- Prioritize launch-critical trust, inquiry, and admin workflows before enhancement work.
- Use MoSCoW to keep Must-priority scope inside the 6-8 week delivery window.
- Preserve privacy-conscious MVP boundaries: no direct booking, patient records, or analytics-heavy scope.
- Treat bilingual readiness, accessibility, and testimonial approval as launch gates rather than backlog extras.

---

## Phase Overview

| Phase   | Name                                    | Objective                                                                     | Status  | Target Window |
| ------- | --------------------------------------- | ----------------------------------------------------------------------------- | ------- | ------------- |
| MVP     | Launch-Ready Patient Acquisition Core   | Deliver the bilingual public site, request flow, and secure admin baseline    | Planned | Weeks 1-4     |
| Phase 1 | Conversion and Operations Hardening     | Improve follow-up pathways, discoverability, and post-launch quality signals  | Planned | Weeks 5-6     |
| Phase 2 | Optimization and Expansion Discovery    | Evaluate post-MVP growth options without breaking the approved MVP boundaries | Planned | Weeks 7-8     |

---

## MVP Phase

### Goals

1. Launch a trustworthy bilingual public experience that explains services and drives contact intent.
2. Validate the low-friction inquiry/request flow and staff follow-up workflow for MVP operations.
3. Establish secure two-role admin access with content governance, testimonial approval, and launch-quality baselines.

### Prioritized Epics

| Priority | Epic                                       | Linked Feature(s) | Linked Requirements                                                          | Owner          |
| -------- | ------------------------------------------ | ----------------- | ---------------------------------------------------------------------------- | -------------- |
| Must     | Public trust and bilingual launch content  | F-001             | FR-001-01, FR-001-02, FR-001-03, FR-001-04, NFR-001-01, NFR-001-02, NFR-X03 | Product Owner  |
| Must     | Inquiry and appointment request baseline   | F-002             | FR-002-01, FR-002-02, FR-002-03, NFR-002-01, NFR-002-02, NFR-X01            | Product Owner  |
| Must     | Clinic profile and location readiness      | F-003             | FR-003-01, FR-003-02, FR-003-04, NFR-003-01                                 | Clinic Owner   |
| Must     | Admin content and testimonial governance   | F-004             | FR-004-01, FR-004-02, FR-004-03, FR-004-04, NFR-004-01, NFR-004-02, NFR-X05 | Clinic Owner   |
| Must     | Inquiry review and staff operations        | F-005             | FR-005-01, FR-005-02, FR-005-03, NFR-005-01, NFR-005-02                     | Front Desk Coordinator |
| Must     | Secure admin access and role boundaries    | F-006             | FR-006-01, FR-006-02, FR-006-03, FR-006-04, NFR-006-01, NFR-006-02, NFR-X06 | Tech Lead      |
| Must     | Launch accessibility and privacy readiness | F-001 to F-006    | NFR-X01, NFR-X02, NFR-X03, NFR-X05, NFR-X06                                 | Tech Lead      |

### Key Deliverables

- Approved bilingual public page scope for home, services, testimonials, contact, and location flows.
- Minimal-data inquiry/request workflow with clear submission feedback and manual follow-up steps.
- Admin and staff workflow scope with testimonial approval and operational-detail ownership defined.
- Launch gate checklist for privacy, accessibility, bilingual readiness, and secure admin entry.

### Acceptance Criteria

- [ ] All Must-priority feature requirements are assigned to MVP epics with a named owner.
- [ ] MVP excludes direct booking, patient records, analytics capture, and full operational management.
- [ ] Launch gates cover privacy-safe forms, WCAG 2.2 AA baseline, bilingual public content, and testimonial approval controls.

---

## Phase 1

### Goals

1. Improve qualified inquiry conversion after the MVP baseline is validated in production-like review.
2. Strengthen discoverability and low-friction follow-up without expanding into unsupported clinical workflows.

### Prioritized Epics

| Priority | Epic                                     | Linked Feature(s) | Linked Requirements                   | Owner         |
| -------- | ---------------------------------------- | ----------------- | ------------------------------------- | ------------- |
| Should   | WhatsApp follow-up and CTA refinement    | F-002             | FR-002-04, NFR-002-02                 | Product Owner |
| Should   | Social and map experience hardening      | F-003             | FR-003-03, NFR-003-02                 | Product Owner |
| Should   | Public performance and discoverability   | F-001 to F-003    | NFR-X04, FR-001-04, FR-003-03         | Tech Lead     |

### Key Deliverables

- Follow-up CTA decisions validated across contact and appointment-request journeys.
- Approved social-link placement and resilient map/link behavior on mobile.
- Performance and discoverability improvement backlog with measurable targets.

### Acceptance Criteria

- [ ] All Should-priority Phase 1 items have measurable outcomes and no dependency on clinical-system integrations.
- [ ] Phase 1 work improves conversion or usability without increasing inquiry data sensitivity.

---

## Phase 2 (Future)

### Goals

1. Explore post-MVP optimization and growth options using validated MVP usage patterns.
2. Preserve clear boundaries between approved website workflows and deferred operational complexity.

### Prioritized Epics

| Priority | Epic                                        | Linked Feature(s) | Linked Requirements                   | Owner         |
| -------- | ------------------------------------------- | ----------------- | ------------------------------------- | ------------- |
| Could    | Post-MVP scheduling workflow discovery      | F-002, F-005      | FR-002-01, FR-005-03                  | Product Owner |
| Could    | Role and workflow maturity review           | F-005, F-006      | FR-005-02, NFR-005-02, FR-006-03      | Tech Lead     |
| Could    | Growth and discoverability optimization     | F-001 to F-003    | FR-001-04, FR-003-03, NFR-X04         | Product Owner |

### Key Deliverables

- Candidate backlog for future scheduling or operational workflow evolution.
- Updated role-boundary review informed by MVP staff usage and admin adoption.
- Prioritized optimization options for traffic quality, conversion, and discoverability.

### Acceptance Criteria

- [ ] All Phase 2 items remain discovery candidates and do not override current MVP boundaries.
- [ ] Each candidate epic includes a clear dependency on validated MVP learning or stakeholder approval.

---

## Feature Traceability Matrix

| Feature ID | Feature Name                                  | Phase | Priority | Linked Epic(s)                                   | Linked Stories (US-\*)         | Status                       |
| ---------- | --------------------------------------------- | ----- | -------- | ------------------------------------------------ | ------------------------------ | ---------------------------- |
| F-001      | Public Website and Trust Experience           | MVP   | Must     | Public trust and bilingual launch content        | US-PO-MVP-001, US-UX-MVP-001   | Planned                      |
| F-002      | Inquiry and Appointment Request Flow          | MVP   | Must     | Inquiry and appointment request baseline         | US-PO-MVP-002, US-FE-MVP-001   | Planned; Phase 1 follow-on   |
| F-003      | Clinic Profile, Location, and Social Presence | MVP   | Must     | Clinic profile and location readiness            | US-PO-MVP-003, US-FE-MVP-002   | Planned; Phase 1 follow-on   |
| F-004      | Admin Content and Testimonial Management      | MVP   | Must     | Admin content and testimonial governance         | US-PO-MVP-004, US-BE-MVP-001   | Planned                      |
| F-005      | Inquiry Review and Staff Operations           | MVP   | Must     | Inquiry review and staff operations              | US-PO-MVP-005, US-BE-MVP-002   | Planned; Phase 2 review path |
| F-006      | Admin Access and Role Boundaries              | MVP   | Must     | Secure admin access and role boundaries          | US-PO-MVP-006, US-BE-MVP-003   | Planned; Phase 2 review path |

---

## Risks and Blockers

| Risk / Blocker                                     | Phase Impacted | Probability | Impact | Mitigation                                                                  | Owner         |
| -------------------------------------------------- | -------------- | ----------- | ------ | --------------------------------------------------------------------------- | ------------- |
| Privacy expectations expand beyond minimal inquiry | MVP            | Medium      | High   | Keep form scope tied to Q-002 and require approval before field expansion   | Product Owner |
| Bilingual content is not ready for launch          | MVP            | Medium      | High   | Sequence content review early and keep both languages in MVP acceptance     | Clinic Owner  |
| Admin/staff boundaries are unclear in workflows    | MVP            | Medium      | High   | Finalize role matrix before active implementation planning                  | Tech Lead     |
| Follow-up channels dilute the simple contact path  | Phase 1        | Medium      | Medium | Validate WhatsApp/social additions against conversion and usability criteria | Product Owner |

---

## Change Log

| Date       | Version | Change Summary                                 | Author        |
| ---------- | ------- | ---------------------------------------------- | ------------- |
| 2026-04-17 | 1.0     | Added initial phased roadmap for planning work | Product Owner |

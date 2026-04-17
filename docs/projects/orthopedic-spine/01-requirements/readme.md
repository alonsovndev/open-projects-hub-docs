# Project Requirements by Feature

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Product Owner    |

## Purpose

Single source of truth for Orthopedic Spine requirements organized by feature.
This baseline converts the approved overview, personas, and open questions into implementation-ready product requirements.

## Sources

- [Project Overview](../overview.md)
- [User Personas](../user-personas.md)
- [Open Questions](../open-questions.md)

---

## Feature Map

| Feature ID | Feature Name                                  | Outcome                                                                              | Priority | Status    | Owner         | Details                                                         |
| ---------- | --------------------------------------------- | ------------------------------------------------------------------------------------ | -------- | --------- | ------------- | --------------------------------------------------------------- |
| F-001      | Public Website and Trust Experience           | Prospective patients quickly understand the clinic and feel confident to act         | Must     | Clarified | Product Owner | [F-001](./f-001-public-website-and-trust-experience.md)         |
| F-002      | Inquiry and Appointment Request Flow          | Patients can submit a low-friction inquiry and continue through WhatsApp when needed | Must     | Clarified | Product Owner | [F-002](./f-002-inquiry-and-appointment-request-flow.md)        |
| F-003      | Clinic Profile, Location, and Social Presence | Visitors can find hours, map, contact channels, and social links without friction    | Must     | Clarified | Product Owner | [F-003](./f-003-clinic-profile-location-and-social-presence.md) |
| F-004      | Admin Content and Testimonial Management      | Clinic admins can keep public content current and safely publish testimonials        | Must     | Clarified | Product Owner | [F-004](./f-004-admin-content-and-testimonial-management.md)    |
| F-005      | Inquiry Review and Staff Operations           | Admin and staff can review inquiries and keep operational details accurate           | Must     | Clarified | Product Owner | [F-005](./f-005-inquiry-review-and-staff-operations.md)         |
| F-006      | Admin Access and Role Boundaries              | MVP admin and staff roles protect sensitive workflows while enabling daily updates   | Must     | Clarified | Product Owner | [F-006](./f-006-admin-access-and-role-boundaries.md)            |

---

## Cross-Cutting Quality Baseline

| ID      | Quality Area        | Requirement                                                                             | Metric / Target                                                                          | Priority | Owner (DRI)   | Status    |
| ------- | ------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- | ------------- | --------- |
| NFR-X01 | Privacy             | Public inquiry flows collect only minimal inquiry data in MVP.                          | Contact and request forms avoid unnecessary health or sensitive patient data.            | Must     | Product Owner | Clarified |
| NFR-X02 | Accessibility       | Public and admin critical flows meet launch accessibility baseline.                     | WCAG 2.2 AA baseline met for navigation, forms, contrast, and keyboard access.           | Must     | UI/UX Lead    | Clarified |
| NFR-X03 | Bilingual Readiness | Launch content supports Spanish and English with manual translation review.             | All MVP public pages and key inquiry CTAs are available in both languages.               | Must     | Product Owner | Clarified |
| NFR-X04 | Performance         | Core public pages remain fast on mobile-first traffic.                                  | Key public pages load in under 3 seconds on standard mobile conditions.                  | Should   | Tech Lead     | Draft     |
| NFR-X05 | Content Governance  | Published testimonials and patient stories require explicit approval before going live. | 100% of published testimonials have recorded approval before publication.                | Must     | Clinic Owner  | Clarified |
| NFR-X06 | Security            | Admin authentication and inquiry handling follow a secure MVP baseline.                 | Admin access uses secure authentication and inquiry submission includes spam protection. | Must     | Tech Lead     | Clarified |

---

## Change Log

| Date       | Version | Change Summary                                                                                         | Author        |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------ | ------------- |
| 2026-04-17 | 1.1     | Split inline feature sections into standalone files; readme reduced to index + cross-cutting baseline. | Product Owner |
| 2026-04-17 | 1.0     | Added initial feature-based requirements baseline for MVP scope.                                       | Product Owner |

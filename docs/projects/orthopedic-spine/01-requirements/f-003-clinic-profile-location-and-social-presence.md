# F-003 Clinic Profile, Location, and Social Presence

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Clarified        |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Product Owner    |

## Context

- **Problem**: Patients need reliable operational details to decide whether and how to contact the clinic.
- **Primary Persona**: P-01 Mariela Naranjo
- **In Scope**: Hours, address, phone/contact channels, map embed, and approved social links.
- **Out of Scope**: Managed social content feeds and advanced location services.

## Functional Requirements

| ID        | Requirement                                                                      | Source                   | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                               | Status    |
| --------- | -------------------------------------------------------------------------------- | ------------------------ | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------- | --------- |
| FR-003-01 | The website displays current clinic address, hours, and primary contact details. | Overview, Personas       | Must     | Product Owner | —                            | Visitors can find operational details from the main navigation or contact-focused sections.       | Clarified |
| FR-003-02 | The MVP includes a low-maintenance map experience for clinic location.           | Open Questions           | Must     | Product Owner | Q-007                        | Users can view clinic location through an embedded map or approved low-maintenance equivalent.    | Clarified |
| FR-003-03 | The public site exposes outbound links to approved launch social channels.       | Open Questions           | Should   | Product Owner | Q-008                        | Facebook, Instagram, WhatsApp, and YouTube links are available where appropriate on public pages. | Clarified |
| FR-003-04 | Operational details remain available in both launch languages.                   | Overview, Open Questions | Must     | Product Owner | Q-005                        | Address guidance, hours, and contact CTAs are maintained in Spanish and English.                  | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                               | Metric / Target                                                                     | Priority | Owner (DRI)  | Decision Traceability (Q-ID) | Status    |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------- | ------------ | ---------------------------- | --------- |
| NFR-003-01 | Location and contact details remain accurate and current. | Operational details pass a monthly content accuracy review with 95%+ accuracy.      | Must     | Clinic Owner | —                            | Draft     |
| NFR-003-02 | Location and social links degrade gracefully on mobile.   | Embedded map and outbound links remain usable without blocking core page rendering. | Should   | Tech Lead    | Q-007, Q-008                 | Clarified |

## Dependencies and Risks

- **Dependencies**: Approved address and schedule details, map embed source, and social profile URLs.
- **Risks**: Incorrect operational details may create missed leads; mitigate with owner-controlled updates and periodic review.

## Traceability

- **Related Open Questions**: Q-005, Q-007, Q-008
- **Related User Stories**: TBD in future work items
- **Related Architecture/ADR**: TBD in future technical design docs
- **Related Prototype**: TBD in future UI/UX artifacts

---

## Change Log

| Date       | Version | Change Summary                                                   | Author        |
| ---------- | ------- | ---------------------------------------------------------------- | ------------- |
| 2026-04-17 | 1.0     | Extracted from requirements baseline as standalone feature file. | Product Owner |

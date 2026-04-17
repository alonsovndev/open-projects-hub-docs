# F-004 Admin Content and Testimonial Management

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Clarified        |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Product Owner    |

## Context

- **Problem**: Clinic stakeholders need simple workflows to keep public content current without relying on developers.
- **Primary Persona**: P-02 Aaron Fallas
- **In Scope**: Content CRUD for services and clinic details, testimonial moderation, bilingual content maintenance, and publishing controls.
- **Out of Scope**: Marketing automation, complex workflow engines, and long approval chains.

## Functional Requirements

| ID        | Requirement                                                                     | Source                   | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                              | Status    |
| --------- | ------------------------------------------------------------------------------- | ------------------------ | -------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------- |
| FR-004-01 | Admin users can create, edit, and publish core public content.                  | Overview, Personas       | Must     | Product Owner | Q-004                        | Admin can maintain services, testimonials, patient-facing copy, and clinic profile content without code changes. | Clarified |
| FR-004-02 | Testimonial publication requires explicit approval before going live.           | Open Questions           | Must     | Product Owner | Q-006                        | Testimonial records cannot be published unless approval status is confirmed in the admin workflow.               | Clarified |
| FR-004-03 | Admin workflows support both Spanish and English public content maintenance.    | Overview, Open Questions | Must     | Product Owner | Q-005                        | Admin can maintain launch-critical public content for both supported languages.                                  | Clarified |
| FR-004-04 | Admin workflows prioritize content and inquiry management over full operations. | Open Questions           | Must     | Product Owner | Q-004                        | Admin experience excludes patient record or full appointment management features from MVP scope.                 | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                | Metric / Target                                                            | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | --------- |
| NFR-004-01 | Routine content updates remain simple for non-technical admins.            | Common content changes can be completed in under 15 minutes after sign-in. | Must     | Product Owner | —                            | Clarified |
| NFR-004-02 | Publishing controls prevent accidental release of unapproved testimonials. | 100% of published testimonials show an approval state before release.      | Must     | Clinic Owner  | Q-006                        | Clarified |

## Dependencies and Risks

- **Dependencies**: Final admin IA, language content process, approval fields, and publishing workflow decisions.
- **Risks**: Overly complex admin UX may block adoption; mitigate with lightweight CRUD-first workflows and limited MVP scope.

## Traceability

- **Related Open Questions**: Q-004, Q-005, Q-006
- **Related User Stories**: TBD in future work items
- **Related Architecture/ADR**: TBD in future technical design docs
- **Related Prototype**: TBD in future UI/UX artifacts

---

## Change Log

| Date       | Version | Change Summary                                                   | Author        |
| ---------- | ------- | ---------------------------------------------------------------- | ------------- |
| 2026-04-17 | 1.0     | Extracted from requirements baseline as standalone feature file. | Product Owner |

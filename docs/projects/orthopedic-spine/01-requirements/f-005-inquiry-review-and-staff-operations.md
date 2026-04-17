# F-005 Inquiry Review and Staff Operations

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Clarified        |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Product Owner    |

## Context

- **Problem**: Staff need a lightweight way to review inquiries and keep operational information accurate without being overloaded by broad admin controls.
- **Primary Persona**: P-03 Noily Naranjo
- **In Scope**: Inquiry visibility, inquiry follow-up support, and updates to operational details such as hours and contact information.
- **Out of Scope**: Full CRM workflows, analytics dashboards, and deep reporting requirements.

## Functional Requirements

| ID        | Requirement                                                                            | Source                   | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                           | Status    |
| --------- | -------------------------------------------------------------------------------------- | ------------------------ | -------- | ------------- | ---------------------------- | --------------------------------------------------------------------------------------------- | --------- |
| FR-005-01 | Authorized staff can review incoming inquiries and essential request details.          | Personas, Open Questions | Must     | Product Owner | Q-003, Q-004                 | Staff-facing workflow exposes new inquiries and the minimum details needed for follow-up.     | Clarified |
| FR-005-02 | Staff can maintain approved operational details such as hours and contact information. | Personas                 | Must     | Product Owner | Q-003                        | Staff can update scoped clinic details without receiving full admin control over all content. | Clarified |
| FR-005-03 | Inquiry handling remains a manual follow-up workflow in MVP.                           | Open Questions           | Must     | Product Owner | Q-001, Q-004                 | MVP does not require automated scheduling or lead attribution to process submitted requests.  | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                              | Metric / Target                                                                 | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | --------- |
| NFR-005-01 | Staff workflows remain simple enough for low-training operational users. | New staff can review and route an inquiry in under 5 minutes during validation. | Must     | Product Owner | —                            | Clarified |
| NFR-005-02 | Inquiry visibility respects approved role boundaries.                    | Staff users can access only scoped inquiry and operational-detail workflows.    | Must     | Tech Lead     | Q-003                        | Clarified |

## Dependencies and Risks

- **Dependencies**: Role definitions, inquiry list design, and decision on which operational fields staff may edit.
- **Risks**: Excessive permissions may expose sensitive data; mitigate with clearly scoped staff capabilities.

## Traceability

- **Related Open Questions**: Q-001, Q-003, Q-004
- **Related User Stories**: TBD in future work items
- **Related Architecture/ADR**: TBD in future technical design docs
- **Related Prototype**: TBD in future UI/UX artifacts

---

## Change Log

| Date       | Version | Change Summary                                                   | Author        |
| ---------- | ------- | ---------------------------------------------------------------- | ------------- |
| 2026-04-17 | 1.0     | Extracted from requirements baseline as standalone feature file. | Product Owner |

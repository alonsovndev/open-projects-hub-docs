# F-002 Inquiry and Appointment Request Flow

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Clarified        |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Product Owner    |

## Context

- **Problem**: Patients need a short, trustworthy path to request help without navigating a complex booking workflow.
- **Primary Persona**: P-01 Mariela Naranjo
- **In Scope**: Contact form, appointment request capture, validation, privacy-conscious data collection, and WhatsApp continuation.
- **Out of Scope**: Real-time scheduling engine, patient record capture, and automated insurance workflows.

## Functional Requirements

| ID        | Requirement                                                                         | Source                   | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                          | Status    |
| --------- | ----------------------------------------------------------------------------------- | ------------------------ | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------ | --------- |
| FR-002-01 | The MVP supports an inquiry and appointment request flow instead of direct booking. | Open Questions           | Must     | Product Owner | Q-001                        | Users can submit a request with preferred scheduling details without selecting a confirmed appointment slot. | Clarified |
| FR-002-02 | The request flow collects only minimal contact and inquiry information.             | Open Questions, Personas | Must     | Product Owner | Q-002                        | Form fields are limited to essential contact and request details and exclude unnecessary health information. | Clarified |
| FR-002-03 | The form provides clear validation and submission feedback.                         | Personas                 | Must     | Product Owner | —                            | Missing or invalid fields show clear feedback and successful submissions confirm the next step.              | Clarified |
| FR-002-04 | The workflow offers a WhatsApp continuation path for appointment follow-up.         | Open Questions           | Should   | Product Owner | Q-001                        | After request submission, users can continue through a WhatsApp contact option aligned to clinic operations. | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                            | Metric / Target                                                                 | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status    |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | --------- |
| NFR-002-01 | Inquiry submission protects against spam and abuse.    | Submission flow includes anti-spam controls appropriate for MVP public traffic. | Must     | Tech Lead     | —                            | Clarified |
| NFR-002-02 | Request flow remains short and low-friction on mobile. | Core request can be completed in 2 minutes or less during usability validation. | Must     | Product Owner | —                            | Draft     |

## Dependencies and Risks

- **Dependencies**: Form field approval, WhatsApp destination setup, privacy messaging, and clinic response workflow.
- **Risks**: Over-collecting data may create privacy and compliance concerns; mitigate by keeping fields minimal and approved.

## Traceability

- **Related Open Questions**: Q-001, Q-002
- **Related User Stories**: TBD in future work items
- **Related Architecture/ADR**: TBD in future technical design docs
- **Related Prototype**: TBD in future UI/UX artifacts

---

## Change Log

| Date       | Version | Change Summary                                                   | Author        |
| ---------- | ------- | ---------------------------------------------------------------- | ------------- |
| 2026-04-17 | 1.0     | Extracted from requirements baseline as standalone feature file. | Product Owner |

# Project Requirements by Feature

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## Purpose

Single source of truth for requirements organized by feature slices.
Detailed requirements are maintained in dedicated feature files.

## Sources

- [Project Overview](../overview.md)
- [User Personas](../user-personas.md)
- [Open Questions](../open-questions.md)
- [Functional Requirements](./functional-requirements.md)
- [Non-Functional Requirements](./non-functional-requirements.md)

---

## Feature Map

| Feature ID | Feature Name                             | Outcome                                                   | Priority | Status    | Owner         | Details                                                               |
| ---------- | ---------------------------------------- | --------------------------------------------------------- | -------- | --------- | ------------- | --------------------------------------------------------------------- |
| F-001      | Client and Project Lifecycle Management  | Admin keeps client/project records aligned with MVP flow  | Must     | Clarified | Product Owner | [F-001](./features/f-001-client-and-project-lifecycle-management.md)  |
| F-003      | Access Control and Visibility Boundaries | Admin/Viewer permissions and private notes are enforced   | Must     | Clarified | Product Owner | [F-003](./features/f-003-access-control-and-visibility-boundaries.md) |
| F-004      | Requirements Backlog and Markdown Export | Approved stories are visible and exportable               | Must     | Clarified | Product Owner | [F-004](./features/f-004-requirements-backlog-and-markdown-export.md) |
| F-005      | Minimal Onboarding                       | First-time Admin guidance reduces MVP onboarding friction | Should   | Clarified | Product Owner | [F-005](./features/f-005-minimal-onboarding.md)                       |

---

## Cross-Cutting Quality Baseline

| ID      | Quality Area         | Requirement                                                                                                             | Metric / Target                                                                                                                               | Priority | Owner (DRI)   | Status    |
| ------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | --------- |
| NFR-X01 | Security             | The platform adheres to OWASP Top 10 security best practices, including secure credential storage and login protection. | OWASP Top 10 checklist satisfied; login attempts are rate-limited; passwords are stored using strong one-way hashing.                         | Must     | Tech Lead     | Clarified |
| NFR-X02 | Privacy              | The platform follows GDPR-aligned privacy practices with deletion and archival support.                                 | Deleted projects become inaccessible to Admin and Viewer roles within 24 hours; archived projects are excluded from the active-project limit. | Must     | Tech Lead     | Clarified |
| NFR-X03 | Testability          | MVP core logic keeps an automated test coverage threshold.                                                              | Automated tests cover at least 70% of core application logic.                                                                                 | Must     | Backend Lead  | Clarified |
| NFR-X04 | Readability          | Viewer-facing requirements remain readable to non-technical stakeholders.                                               | Viewer views present user stories in the standard template with plain-language titles and omit internal notes.                                | Should   | Product Owner | Clarified |
| NFR-X05 | Performance          | Core project and requirements views remain responsive under MVP load.                                                   | With up to 3 active projects and 200 approved user stories, project list and requirements views render within 2 seconds of request.           | Should   | Tech Lead     | Draft     |
| NFR-X06 | Scalability          | MVP usage limits are supported without data loss or degradation.                                                        | Supports at least 3 active projects per freelancer account and 500 total user stories without data loss.                                      | Should   | Tech Lead     | Draft     |
| NFR-X07 | Accessibility        | Primary workflows meet baseline accessibility standards.                                                                | Requirements views meet WCAG 2.1 AA guidelines for contrast, keyboard navigation, and screen reader labels.                                   | Should   | UI/UX Lead    | Draft     |
| NFR-X08 | Delivery Feasibility | MVP scope remains deliverable in planned schedule.                                                                      | MVP scope is achievable within a 1–1.5 month delivery window, assuming the defined scope and constraints.                                     | Should   | Product Owner | Draft     |

---

## Change Log

| Date       | Version | Change Summary                                       | Author        |
| ---------- | ------- | ---------------------------------------------------- | ------------- |
| 2026-03-23 | 1.1     | Removed F-002 AI Refinement and Approval Workflow.   | Product Owner |
| 2026-03-23 | 1.0     | Initial feature-based requirements baseline created. | Product Owner |

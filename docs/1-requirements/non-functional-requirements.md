# Non-Functional Requirements

| Attribute | Value |
| --- | --- |
| **Project** | Open Freelancer Project Hub |
| **Version** | 1.0 |
| **Status** | Draft |
| **Last Updated** | 2026-02-28 |

## Sources

- [Project Overview](../overview.md)
- [User Personas](../user-personas.md)
- [Open Questions](../open-questions.md)

## Non-Functional Requirements

| ID | Requirement | Source | Metric / Target | Priority | Status |
| --- | --- | --- | --- | --- | --- |
| NFR-001 | The platform must adhere to OWASP Top 10 security best practices, including secure credential storage and login protection. | Overview | OWASP Top 10 checklist satisfied; login attempts are rate-limited to prevent brute-force attacks; passwords are stored using strong one-way hashing. | Must | Clarified |
| NFR-002 | The platform must follow GDPR-aligned privacy practices and support user-initiated data deletion and archival. | Open Questions Q-017, Q-018 | Deleted projects become inaccessible to Admin and Viewer roles within 24 hours; archived projects are excluded from the active-project limit. | Must | Clarified |
| NFR-003 | The MVP must maintain a minimum automated test coverage threshold for core application logic. | Overview | Automated tests cover at least 70% of core application logic. | Must | Clarified |
| NFR-004 | Viewer-facing requirements must be readable to non-technical stakeholders. | User Personas (Client/Viewer) | Viewer views present user stories in the standard template with plain-language titles and omit internal notes. | Should | Clarified |
| NFR-005 | Core project and requirements views must respond quickly under MVP load. | Derived from MVP scope | With up to 3 active projects and 200 approved user stories, project list and requirements views render within 2 seconds of request. | Should | Draft |
| NFR-006 | The system must scale to the MVP usage limits without data loss or degradation. | Open Questions Q-001 | Supports at least 3 active projects per freelancer account and 500 total user stories without data loss. | Should | Draft |
| NFR-007 | The interface must meet baseline accessibility expectations for primary workflows. | User Personas | The requirements views meet WCAG 2.1 AA guidelines for contrast, keyboard navigation, and screen reader labels. | Should | Draft |
| NFR-008 | The MVP must support delivery within the planned schedule. | Overview | MVP scope is achievable within a 1–1.5 month delivery window, assuming the defined scope and constraints. | Should | Draft |

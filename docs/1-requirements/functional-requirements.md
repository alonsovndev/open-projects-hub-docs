# Functional Requirements

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

## Functional Requirements

| ID | Requirement | Source | Priority | Acceptance Criteria | Status |
| --- | --- | --- | --- | --- | --- |
| FR-001 | The system must allow an Admin to create and manage client records and associate each project with a client. | Overview | Must | An Admin can create, view, update, and archive client records and select a client when creating or editing a project. | Clarified |
| FR-002 | The system must allow an Admin to create and manage projects with a maximum of **three active projects per freelancer account**. | Open Questions Q-001 | Must | When an Admin attempts to create a fourth active project, the action is blocked and the user is prompted to archive an existing project. | Clarified |
| FR-003 | The MVP must support only **discovery** and **planning** phases for projects. | Open Questions Q-003 | Must | Project status options are limited to discovery and planning; no delivery or handoff features are available in the MVP UI or export. | Clarified |
| FR-004 | The AI refinement workflow must accept **raw notes and bullet lists** as input. | Open Questions Q-005 | Must | The AI input field accepts plain text notes and bullet lists without requiring additional formatting or file uploads. | Clarified |
| FR-005 | The system must surface ambiguity detection using **inline highlights** on the input text. | Open Questions Q-008 | Must | Ambiguous phrases are visually highlighted inline within the input editor before approval. | Clarified |
| FR-006 | The AI refinement output must generate user stories using the standard template with a title, "As a..., I want..., so that..." format, and acceptance criteria. | Open Questions Q-004, Q-007 | Must | Each generated story includes a title, the standard user story sentence, and at least one acceptance criterion. | Clarified |
| FR-007 | The Admin must be able to edit AI-generated content and provide **explicit approval** before it becomes an official project artifact. | Open Questions Q-006 | Must | AI-generated stories remain in a draft state until the Admin approves them; unapproved content is excluded from exports. | Clarified |
| FR-008 | The system must enforce role-based access control with **Admin (full CRUD)** and **Viewer (read-only)** roles only. | Open Questions Q-010, Q-011 | Must | Viewer accounts can view project and requirement content but cannot create, edit, comment, or delete any data. | Clarified |
| FR-009 | The MVP must not allow inviting external collaborators beyond the Admin and Viewer roles. | Open Questions Q-012 | Must | There is no invitation flow for additional collaborators beyond the single Admin and the client Viewer. | Clarified |
| FR-010 | The system must include an **internal notes** field that is visible only to the Admin. | Open Questions Q-019 | Must | Viewer accounts cannot view or export internal notes content. | Clarified |
| FR-011 | The system must provide a **structured list of user stories with acceptance criteria** as the primary project deliverable. | Open Questions Q-014 | Must | Each project includes a requirements backlog view listing approved user stories and their acceptance criteria. | Clarified |
| FR-012 | The system must support exporting project requirements to **Markdown**. | Open Questions Q-015 | Must | An Admin can export approved requirements as a Markdown file that preserves the user story template structure. | Clarified |
| FR-013 | The MVP must provide minimal onboarding through a welcome message and contextual tooltips. | Open Questions Q-021 | Should | First-time Admin users see a welcome message and at least one tooltip explaining the AI refinement workflow. | Clarified |
| FR-014 | Viewer users must have access to readable, structured requirements and project status updates. | User Personas (Client/Viewer) | Should | Viewers can access a read-only requirements view and see the current project phase (discovery or planning). | Clarified |

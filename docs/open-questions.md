# Open Questions

**Purpose:** Capture and resolve questions to finalize scope, workflows, and success criteria for the Open Freelancer Project Hub.

---

**Status:** Closed  
**Last Updated:** 2026-02-28

---

## Scope & MVP Constraints

| ID    | Question                                                                                                  | Answer                                                                                                                                              | Status |
| :---- | :-------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| Q-001 | Is the "up to three concurrent projects" limit per freelancer account, per client, or per workspace/team? | The limit is **per freelancer account**. This aligns with the project's focus on individual freelancers.                                            | Closed |
| Q-002 | What should happen when a user reaches the project limit (block, archive requirement, request upgrade)?   | For the MVP, the system will **block** new project creation and prompt the user to archive an existing one.                                         | Closed |
| Q-003 | Which project phases must be supported in MVP (e.g., discovery, planning, delivery, handoff)?             | The MVP will focus exclusively on **discovery and planning** to refine client ideas into structured requirements.                                   | Closed |
| Q-004 | Are there any must-have templates for requirements or user stories in MVP?                                | Yes, a basic **user story template** is required, including a title, the standard "As a..., I want..., so that..." format, and acceptance criteria. | Closed |

---

## AI-Assisted Requirements Refinement

| ID    | Question                                                                                                   | Answer                                                                                                                             | Status |
| :---- | :--------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :----- |
| Q-005 | What inputs are supported for AI refinement (raw notes, transcripts, bullet lists, emails)?                | The MVP will support **raw notes and bullet lists** for simplicity and directness.                                                 | Closed |
| Q-006 | Should AI output require explicit user approval before becoming official project artifacts?                | **Yes, explicit user approval is mandatory.** The freelancer must have final control to edit and approve all AI-generated content. | Closed |
| Q-007 | What level of detail must AI generate (user stories only vs. acceptance criteria, test cases, edge cases)? | The AI will generate **user stories with suggested acceptance criteria.** Test cases are out of scope for the MVP.                 | Closed |
| Q-008 | Are there any topics or content categories the AI must avoid?                                              | Yes, the AI will be instructed to **avoid generating harmful or illegal content** and stay focused on software development topics. | Closed |

---

## Collaboration & Access Control

| ID    | Question                                                                                        | Answer                                                                                                                                             | Status |
| :---- | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| Q-010 | What are the exact permissions for Admin, Superuser, and Viewer?                                | **Admin:** The freelancer owner with full CRUD access. **Viewer:** The client with read-only access. The Superuser role is not needed for the MVP. | Closed |
| Q-011 | Can clients (Viewers) provide comments or feedback, or is view-only strict?                     | The Viewer role is **strictly view-only** for the MVP to simplify the initial build.                                                               | Closed |
| Q-012 | Should users be able to invite collaborators outside their organization (e.g., subcontractors)? | **No, this is out of scope for the MVP.** The focus is on a single freelancer and their client.                                                    | Closed |
| Q-013 | Is there a need for audit logs or activity history visible to users?                            | **No, audit logs are not required for the MVP but can be considered for future versions.**                                                         | Closed |

---

## Documentation & Output Formats

| ID    | Question                                                                                                             | Answer                                                                                                              | Status |
| :---- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :----- |
| Q-014 | What are the expected deliverables from the platform (user stories only, sprint-ready backlog, project brief, etc.)? | The primary deliverable is a **structured list of user stories with acceptance criteria**, forming a basic backlog. | Closed |
| Q-015 | Should the platform support export formats (PDF, Markdown, CSV)?                                                     | Yes, the MVP will support exporting to **Markdown** due to its versatility and simplicity.                          | Closed |
| Q-016 | Do we need versioning or change history for requirements?                                                            | **No**, versioning is a complex feature that is not necessary for the MVP.                                          | Closed |

---

## Security & Compliance

| ID    | Question                                                                    | Answer                                                                                                                     | Status |
| :---- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :----- |
| Q-017 | Are there any compliance requirements (e.g., GDPR, regional data handling)? | The project will follow **GDPR best practices** as a learning exercise (e.g., ensuring data can be deleted).               | Closed |
| Q-018 | What is the expected data retention policy (deletion, archival)?            | Users will be able to **manually archive and delete** their projects. No automated retention policy is needed for the MVP. | Closed |

---

## Success Metrics & Adoption

| ID    | Question                                                                              | Answer                                                                                                                  | Status |
| :---- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------- | :----- |
| Q-020 | How will success be measured for freelancers (time saved, clarity, delivery success)? | Success will be qualitatively measured by the **clarity of generated requirements** and **reduced documentation time**. | Closed |
| Q-021 | What is the desired onboarding experience for new users (guided setup vs. minimal)?   | A **minimal onboarding experience** is sufficient for the MVP, using a welcome message and tooltips.                    | Closed |

---

## Community & Open-Source Direction

| ID    | Question                                                                                    | Answer                                                                                                                         | Status |
| :---- | :------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------- | :----- |
| Q-022 | What contribution guidelines or governance model should be in place for open-source growth? | A basic `CONTRIBUTING.md` file will be created, outlining setup, testing, and pull request processes.                          | Closed |
| Q-023 | Which features are reserved for future phases beyond MVP?                                   | Future features include team collaboration, advanced reporting, integrations (GitHub, Jira), and more complex AI capabilities. | Closed |

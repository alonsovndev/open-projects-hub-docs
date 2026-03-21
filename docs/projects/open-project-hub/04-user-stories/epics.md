# Product Epics

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-10                  |

## Sources

- [Project Overview](../overview.md)
- [Functional Requirements](../01-requirements/functional-requirements.md)
- [Non-Functional Requirements](../01-requirements/non-functional-requirements.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [Database Design](../06-database/database-design.md)
- [UI/UX Designer User Stories](./ui-ux-designer-stories.md)

## Epic Planning Principles

- Epics are defined at product planning level and stay within MVP scope unless explicitly excluded.
- MVP scope is limited to discovery and planning workflows only.
- Epic boundaries align to approved requirement IDs for traceability and phased roadmap control.
- Delivery, handoff, expanded collaboration roles, and post-MVP scale features remain out of scope.

## MVP Epics

### Epic 1: Client and Project Administration

**Problem Statement**  
Freelancers need a simple way to organize clients and projects, but lightweight tools often create project sprawl and weak ownership boundaries.

**Objective**  
Provide a controlled foundation for managing client records and freelancer-owned projects within explicit MVP limits.

**Included Scope**

- Create, view, update, archive, and manage client records.
- Create and manage projects linked to a client.
- Enforce the MVP limit of up to three active projects per freelancer account.

**Excluded Scope**

- Portfolio, invoicing, billing, or CRM expansion features.
- Multi-admin workspaces or organization-level account structures.
- Delivery, execution, or project handoff workflows.

**Related Requirement IDs**  
FR-001, FR-002, NFR-002, NFR-008

**Dependencies**

- [Project Overview](../overview.md) for MVP scope, business goals, and active-project constraints context.
- [Functional Requirements](../01-requirements/functional-requirements.md) for FR-001 and FR-002 traceability.
- [Phased Roadmap](../02-planning/phased-roadmap.md) for MVP priority alignment.
- [Database Design](../06-database/database-design.md) for client/project entity boundaries and archival behavior assumptions.

**Measurable Success Criteria**

- Admin can create, update, and archive client records for all MVP projects.
- System blocks creation of a fourth active project and guides the Admin to archive an existing one.
- Archived projects no longer count toward the active-project limit within the expected lifecycle rules.

**Acceptance Criteria**

- Given an Admin is managing client records, when they create or update a client, then the record remains associated with MVP project-planning workflows only.
- Given an Admin already has three active projects, when they attempt to create another active project, then the system blocks the action and requires archival of an existing active project first.
- Given a project is archived, when active-project limits are evaluated, then the archived project is excluded from the active-project count.

**Candidate Related User-Story Themes**

- Client record setup and maintenance
- Project creation and ownership rules
- Active-project limit messaging and archive flow

---

### Epic 2: Discovery and Planning Lifecycle Control

**Problem Statement**  
Freelancers often lose scope discipline when tools mix planning work with downstream delivery workflows too early.

**Objective**  
Keep the MVP focused on early-stage project definition by constraining lifecycle states to discovery and planning only.

**Included Scope**

- Project phase definition limited to discovery and planning.
- Status visibility that communicates current planning stage to Admin and Viewer users.
- Planning artifacts and workflows aligned only to requirement discovery and backlog preparation.

**Excluded Scope**

- Task delivery tracking, sprint execution, developer assignment, or deployment management.
- Handoff, acceptance sign-off, invoicing, or maintenance workflows.
- Any workflow state beyond discovery and planning in the MVP UI or exports.

**Related Requirement IDs**  
FR-003, FR-014, NFR-004, NFR-008

**Dependencies**

- [Project Overview](../overview.md) for problem framing and MVP timeline constraints.
- [Functional Requirements](../01-requirements/functional-requirements.md) for phase-lifecycle and viewer visibility requirements.
- [Phased Roadmap](../02-planning/phased-roadmap.md) for MVP scope boundaries and acceptance expectations.
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md) for planning-only system context and lifecycle boundaries.

**Measurable Success Criteria**

- All project records use only discovery or planning as valid MVP phases.
- Viewer-facing status communication remains read-only and understandable to non-technical stakeholders.
- No MVP artifact, screen, or export introduces delivery or handoff lifecycle stages.

**Acceptance Criteria**

- Given an MVP project is created or updated, when its lifecycle state is assigned, then only discovery or planning is allowed.
- Given a Viewer accesses project status information, when the status is displayed, then it is read-only and written in a way that supports non-technical understanding.
- Given planning artifacts are reviewed, when scope is validated, then no delivery or handoff workflow is included in MVP outputs.

**Candidate Related User-Story Themes**

- Project phase setup and validation
- Planning-stage visibility for stakeholders
- Scope guardrails for MVP-only lifecycle states

---

### Epic 3: AI-Assisted Requirements Refinement

**Problem Statement**  
Raw client notes are often ambiguous, incomplete, and difficult to convert into implementation-ready planning artifacts without heavy manual effort.

**Objective**  
Help Admin users transform unstructured notes into clearer draft requirements by supporting raw input capture, ambiguity detection, and AI-assisted structure generation.

**Included Scope**

- Accept raw notes and bullet-list inputs.
- Surface inline ambiguity highlights before approval.
- Generate structured draft user stories from refinement input.

**Excluded Scope**

- File uploads, multimodal input, or external document ingestion.
- Autonomous publishing of AI output without human review.
- Post-MVP AI capabilities such as estimation, prioritization, or autonomous delivery planning.

**Related Requirement IDs**  
FR-004, FR-005, FR-006, NFR-003

**Dependencies**

- [Project Overview](../overview.md) for the AI-assisted refinement vision.
- [Functional Requirements](../01-requirements/functional-requirements.md) for raw-input, ambiguity, and story-generation expectations.
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md) for refinement workflow data flow.
- [UI/UX Designer User Stories](./ui-ux-designer-stories.md) for refinement workspace and ambiguity-highlighting story coverage.

**Measurable Success Criteria**

- Admin can submit plain-text notes or bullet lists without extra formatting requirements.
- Ambiguous phrases are highlighted inline in the refinement workflow before approval.
- Generated outputs consistently follow the standard user story structure with acceptance criteria-ready formatting.

**Acceptance Criteria**

- Given an Admin has raw notes or bullet-list input, when they submit refinement content, then the workflow accepts the input without requiring file upload or additional formatting.
- Given ambiguous text is detected during refinement, when the draft is returned, then the ambiguous phrases are highlighted inline for review.
- Given draft stories are generated, when they are displayed to the Admin, then each draft follows the standard user story structure and includes acceptance-criteria-ready content.

**Candidate Related User-Story Themes**

- Raw-notes input workflow
- Ambiguity highlight review
- AI-generated draft story creation

---

### Epic 4: Requirements Review, Editing, and Approval

**Problem Statement**  
AI-generated content is useful for acceleration, but freelancers still need editorial control before requirements become official project artifacts.

**Objective**  
Ensure that project requirements move through a clear draft-to-approved workflow with explicit Admin review and approval.

**Included Scope**

- Edit AI-generated draft stories before approval.
- Keep generated artifacts in draft state until explicit Admin approval.
- Promote approved stories into the official project backlog.

**Excluded Scope**

- Auto-approval, workflow automation rules, or approval delegation.
- Multi-step approval chains or comment-based review workflows.
- Version comparison and advanced change-history tooling beyond MVP planning needs.

**Related Requirement IDs**  
FR-006, FR-007, FR-011, NFR-003

**Dependencies**

- [Functional Requirements](../01-requirements/functional-requirements.md) for draft editing, approval, and backlog inclusion rules.
- [Phased Roadmap](../02-planning/phased-roadmap.md) for MVP requirement-workflow priorities.
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md) for approval flow and approved artifact handling.
- [Database Design](../06-database/database-design.md) for draft-story, refinement-session, and approved-requirement lifecycle boundaries.

**Measurable Success Criteria**

- Unapproved AI-generated content does not appear as official backlog content or in exports.
- Admin can revise generated stories and acceptance criteria before approval.
- Each approved project contains a structured backlog of official requirement artifacts.

**Acceptance Criteria**

- Given AI-generated stories are still in draft state, when backlog or export outputs are viewed, then those draft stories are excluded from official project artifacts.
- Given an Admin reviews generated requirement content, when they edit a story before approval, then the updated draft remains editable until explicit approval is provided.
- Given an Admin explicitly approves draft stories, when the backlog is generated, then the approved stories appear as official project requirements.

**Candidate Related User-Story Themes**

- Draft-story editing
- Explicit approval gate
- Promotion of approved stories into backlog view

---

### Epic 5: Access-Controlled Stakeholder Collaboration

**Problem Statement**  
Freelancers must collaborate with clients without exposing internal working notes or allowing unintended edits.

**Objective**  
Establish a simple, secure collaboration model with clear Admin and Viewer boundaries for MVP planning workflows.

**Included Scope**

- Role-based access limited to Admin and Viewer.
- Read-only Viewer access to approved project and requirement information.
- Admin-only visibility for internal notes and protected planning content.

**Excluded Scope**

- Additional collaborator roles, external contributor invitations, or team workspaces.
- Viewer editing, commenting, approvals, or workflow actions.
- Real-time collaboration or document co-authoring features.

**Related Requirement IDs**  
FR-008, FR-009, FR-010, FR-014, NFR-001, NFR-002, NFR-004

**Dependencies**

- [Functional Requirements](../01-requirements/functional-requirements.md) for role, visibility, and internal-note constraints.
- [Non-Functional Requirements](../01-requirements/non-functional-requirements.md) for security, privacy, and readability targets.
- [Role Mapping](../02-planning/role-mapping.md) for accountable planning ownership across access-related workstreams.
- [Database Design](../06-database/database-design.md) for Admin/Viewer membership and internal-notes data-boundary assumptions.

**Measurable Success Criteria**

- Viewer users can access structured, read-only project requirements and phase status only.
- Viewer users cannot create, edit, comment on, or delete planning artifacts.
- Internal notes remain hidden from Viewer-facing views and exports.

**Acceptance Criteria**

- Given a Viewer accesses a project workspace, when project requirements are displayed, then the Viewer can read approved requirements and phase status without edit controls.
- Given a Viewer attempts to change planning artifacts, when they try to create, update, comment on, or delete content, then the action is unavailable or denied.
- Given a project contains internal notes, when Viewer-facing screens or exports are generated, then internal notes are excluded.

**Candidate Related User-Story Themes**

- Role assignment and access rules
- Viewer read-only backlog experience
- Internal-notes isolation

---

### Epic 6: Structured Requirements Delivery and Export

**Problem Statement**  
Freelancers need a professional, shareable project deliverable, but unstructured notes do not provide a reliable planning artifact for stakeholder review.

**Objective**  
Provide a structured backlog view and Markdown export so approved requirements can be reviewed, shared, and reused as formal planning output.

**Included Scope**

- Backlog view of approved user stories and acceptance criteria.
- Markdown export of approved project requirements.
- Output formatting that preserves the standard user story template.

**Excluded Scope**

- PDF, DOCX, spreadsheet, or external PM-tool exports.
- Delivery plans, test plans, or implementation task exports beyond approved planning artifacts.
- Viewer-specific export customization or advanced reporting packages.

**Related Requirement IDs**  
FR-011, FR-012, FR-014, NFR-004, NFR-005, NFR-006

**Dependencies**

- [Functional Requirements](../01-requirements/functional-requirements.md) for backlog and Markdown export expectations.
- [Non-Functional Requirements](../01-requirements/non-functional-requirements.md) for readability, performance, and MVP scalability targets.
- [Phased Roadmap](../02-planning/phased-roadmap.md) for deliverable expectations in MVP scope.
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md) and [API Contract](../03-architecture/api-contract.md) for approved requirements and export workflow references.

**Measurable Success Criteria**

- Each MVP project can present approved requirements in a structured backlog format.
- Admin can export approved requirements to Markdown while preserving story structure.
- Requirements views remain readable under MVP load and within defined response expectations.

**Acceptance Criteria**

- Given a project has approved requirements, when the backlog view is opened, then the user stories and acceptance criteria are displayed in a structured, readable format.
- Given an Admin requests an export, when the Markdown file is generated, then only approved requirements are included and the standard story structure is preserved.
- Given the backlog view or export workflow is used within MVP limits, when stakeholders access the output, then the information remains readable and aligned with MVP response expectations.

**Candidate Related User-Story Themes**

- Approved backlog presentation
- Markdown export initiation and completion
- Stakeholder-ready formatting for requirement artifacts

---

## Notes for Story Decomposition

- These epics are intentionally scoped to MVP Must-have planning outcomes from the phased roadmap.
- Phase 1 items such as onboarding, enhanced readability, and accessibility refinements should be decomposed as supporting stories under these epics only when they directly strengthen MVP planning workflows.
- Post-MVP governance, expanded collaboration, and scale-oriented planning remain separate roadmap candidates rather than epic scope for this file.

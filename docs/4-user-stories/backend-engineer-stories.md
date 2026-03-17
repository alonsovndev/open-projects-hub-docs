# Backend Engineer User Stories

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Role**         | Backend Engineer            |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-17                  |

## Sources

- [Project Overview](../overview.md)
- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Role Mapping](../2-planning/role-mapping.md)
- [Phased Roadmap](../2-planning/phased-roadmap.md)
- [Architecture Solution Design](../3-architecture/architecture-solution-design.md)
- [Technology Stack](../3-architecture/technology-stack.md)
- [API Contract](../3-architecture/api-contract.md)
- [Data Flow Diagram](../3-architecture/diagrams/data-flow.mmd)
- [Database Design](../6-database/database-design.md)
- [Product Epics](./epics.md)

## Objective

Define stakeholder-ready backend engineer user stories that describe the backend planning work needed to support the MVP discovery and planning workflows, protect project data, and produce approved project deliverables.

## Backend Scope and Constraints

- Scope is limited to discovery and planning workflows only, consistent with FR-003 and the phased roadmap.
- Backend planning must support Admin and Viewer roles only, consistent with FR-008 and FR-009.
- Stories must focus on backend responsibilities such as domain rules, workflow states, access boundaries, deliverable contracts, and quality guardrails.
- Stories must avoid code-level implementation detail while remaining specific, measurable, and verifiable for development handoff.
- Planning assumptions align with the documented modular monolith backend, Clean Architecture, DDD boundaries, FastAPI API layer, and Supabase PostgreSQL data model.

## MoSCoW Prioritization Summary

| Priority | Story ID      | Theme                                                | Rationale                                                                          |
| -------- | ------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Must     | US-MVP-BE-001 | Client and project lifecycle rules                   | Establishes backend guardrails for client/project ownership and MVP phase control. |
| Must     | US-MVP-BE-002 | Refinement draft and approval workflow               | Covers the central backend workflow that converts raw notes into controlled drafts. |
| Must     | US-MVP-BE-003 | Authorization and internal-notes protection          | Ensures Admin/Viewer access boundaries and protected planning content.             |
| Must     | US-MVP-BE-004 | Approved backlog and Markdown export deliverables    | Defines the primary backend deliverable path for approved requirements.            |
| Must     | US-MVP-BE-005 | Security, privacy, and backend quality baseline      | Makes cross-cutting MVP backend safeguards explicit and reviewable.                |
| Should   | US-P1-BE-006  | Performance, scalability, and observability planning | Extends backend readiness for MVP load and operational visibility after core MVP.  |

## User Stories

**Story ID**: US-MVP-BE-001  
**Epic**: Client and Project Administration  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define backend rules for client and project lifecycle management,  
**So that** Admin-owned projects stay within MVP limits and remain aligned with discovery and planning scope.

**Acceptance Criteria**:

- [ ] Given an Admin creates or updates a project, When backend validation is defined, Then the project must always remain associated with a valid client record and one of the allowed MVP phases only.
- [ ] Given an Admin already has three active projects, When project-creation rules are reviewed, Then the backend story specifies that a fourth active project must be rejected until another active project is archived.
- [ ] Given a project is archived, When lifecycle handling is described, Then the story confirms archived projects no longer count toward the active-project limit and are excluded from active views.
- [ ] Given stakeholders review scope boundaries, When this story is presented, Then it explicitly excludes delivery, handoff, invoicing, and non-MVP workflow states from backend planning.
- [ ] Given development handoff is prepared, When deliverables are reviewed, Then validation scenarios for create, update, active-limit rejection, and archive behavior are included.

**Deliverables**:

- Backend rule summary for client/project ownership and lifecycle boundaries
- Validation checklist for active-project limits, allowed phases, and archival behavior
- Development-ready test scenario list for project lifecycle constraints

**Dependencies**:

- FR-001, FR-002, FR-003
- NFR-002, NFR-008
- `../2-planning/role-mapping.md`
- `../6-database/database-design.md`

**Success Metrics**:

- Backend scope clearly covers 100% of MVP client/project lifecycle rules tied to FR-001 through FR-003
- Product and engineering stakeholders can explain the active-project rule without additional clarification
- Review feedback identifies no unresolved ambiguity about lifecycle boundaries or archival behavior

## Reference

- [Project Overview](../overview.md)
- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Phased Roadmap](../2-planning/phased-roadmap.md)
- [Architecture Solution Design](../3-architecture/architecture-solution-design.md)
- [Database Design](../6-database/database-design.md)

---

**Story ID**: US-MVP-BE-002  
**Epic**: AI-Assisted Requirements Refinement  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 8

**As a** Backend Engineer,  
**I want to** define the refinement-session draft and approval workflow,  
**So that** raw notes can become structured draft requirements with clear review and approval boundaries.

**Acceptance Criteria**:

- [ ] Given an Admin submits raw notes or bullet lists, When the backend workflow is defined, Then the story specifies support for both input formats without requiring file uploads or additional formatting.
- [ ] Given ambiguity detection is part of refinement, When workflow outputs are reviewed, Then the story defines backend handling for ambiguity records that can be surfaced inline before approval.
- [ ] Given draft stories are generated, When the backend planning deliverable is reviewed, Then it describes draft artifacts that include title, user story statement, ordered acceptance criteria, and draft status.
- [ ] Given AI-generated content requires human oversight, When approval handling is described, Then the story confirms that draft content remains unofficial until explicit Admin approval is recorded.
- [ ] Given approved and draft states must remain distinct, When validation scenarios are reviewed, Then the story includes measurable checks for draft editing, approval transition, and exclusion of unapproved content from official deliverables.

**Deliverables**:

- Backend workflow definition for refinement submission, ambiguity review, draft storage, and approval transition
- Draft-versus-approved lifecycle checklist for backend handoff
- Review scenarios for raw-input support, ambiguity handling, and approval-state enforcement

**Dependencies**:

- FR-004, FR-005, FR-006, FR-007
- NFR-003
- `../3-architecture/api-contract.md`
- `../6-database/database-design.md`

**Success Metrics**:

- Refinement workflow planning covers all MVP backend states from note submission through approval
- Story reviewers can distinguish draft and approved artifacts without referring to implementation notes
- Acceptance criteria trace cleanly to FR-004 through FR-007 with no missing workflow boundary

## Reference

- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Architecture Solution Design](../3-architecture/architecture-solution-design.md)
- [API Contract](../3-architecture/api-contract.md)
- [Data Flow Diagram](../3-architecture/diagrams/data-flow.mmd)
- [Database Design](../6-database/database-design.md)

---

**Story ID**: US-MVP-BE-003  
**Epic**: Access-Controlled Stakeholder Collaboration  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define Admin and Viewer access rules for backend workflows and data visibility,  
**So that** collaboration remains secure and internal notes stay protected.

**Acceptance Criteria**:

- [ ] Given role-based access is limited to Admin and Viewer, When backend authorization rules are documented, Then the story states that Admin retains full project and requirement management capabilities while Viewer access remains read-only.
- [ ] Given internal notes are Admin-only content, When data-visibility rules are reviewed, Then the story specifies that Viewer responses and exports must never expose internal notes.
- [ ] Given additional collaborators are out of scope, When access boundaries are reviewed, Then the story explicitly excludes invitation flows and any role beyond Admin and Viewer.
- [ ] Given Viewer users need structured project visibility, When approved content access is described, Then the story confirms that Viewer access is limited to readable project status and approved requirements only.
- [ ] Given security and privacy reviews are required, When handoff artifacts are validated, Then the story includes permission scenarios for allowed reads, blocked edits, and protected content boundaries.

**Deliverables**:

- Role and visibility rules summary for Admin and Viewer backend behavior
- Protected-content checklist covering internal notes and approved-only access
- Permission scenario matrix for allowed and blocked actions by role

**Dependencies**:

- FR-008, FR-009, FR-010, FR-014
- NFR-001, NFR-002, NFR-004
- `../2-planning/role-mapping.md`
- `../6-database/database-design.md`

**Success Metrics**:

- Stakeholders can identify Admin-versus-Viewer backend permissions in one review session
- No acceptance criterion leaves ambiguity about internal-notes protection
- Role rules align to all MVP collaboration boundaries without introducing extra roles or workflows

## Reference

- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Role Mapping](../2-planning/role-mapping.md)
- [API Contract](../3-architecture/api-contract.md)
- [Database Design](../6-database/database-design.md)

---

**Story ID**: US-MVP-BE-004  
**Epic**: Structured Requirements Delivery and Export  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define the backend contract for approved backlog retrieval and Markdown export,  
**So that** approved project requirements can be delivered as a structured, shareable artifact.

**Acceptance Criteria**:

- [ ] Given the backlog is the primary project deliverable, When backend retrieval rules are defined, Then the story specifies that only approved requirements and their acceptance criteria appear in the official backlog output.
- [ ] Given Markdown export is required, When export expectations are documented, Then the story defines an output that preserves the approved user story structure and ordered acceptance criteria.
- [ ] Given Viewer-safe delivery is required, When export boundaries are reviewed, Then the story confirms internal notes and draft-only content are excluded from exportable output.
- [ ] Given export tracking is part of the MVP workflow, When backend deliverables are reviewed, Then the story includes measurable scenarios for export request, completion status, and retrieval of export metadata.
- [ ] Given readability matters for non-technical stakeholders, When success conditions are reviewed, Then the story confirms the approved backlog and Markdown deliverable remain understandable and structured for stakeholder review.

**Deliverables**:

- Approved-backlog retrieval and export contract summary
- Export validation checklist covering approved-only content, ordering, and internal-note exclusion
- Review scenarios for backlog viewing, empty export states, and successful Markdown delivery

**Dependencies**:

- FR-011, FR-012, FR-014
- NFR-004, NFR-005, NFR-006
- `../3-architecture/api-contract.md`
- `../6-database/database-design.md`

**Success Metrics**:

- Approved-backlog behavior maps directly to FR-011 and FR-012 with no undocumented gaps
- Export expectations remain consistent with the standard user story template in all review scenarios
- Product reviewers confirm that official deliverables exclude drafts and internal notes without additional clarification

## Reference

- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Phased Roadmap](../2-planning/phased-roadmap.md)
- [API Contract](../3-architecture/api-contract.md)
- [Database Design](../6-database/database-design.md)

---

**Story ID**: US-MVP-BE-005  
**Epic**: Security, Privacy, and Quality Baseline  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 3

**As a** Backend Engineer,  
**I want to** define backend security, privacy, and quality guardrails for the MVP,  
**So that** core backend workflows meet baseline protection and review standards from the start.

**Acceptance Criteria**:

- [ ] Given MVP backend services must meet security expectations, When this story is reviewed, Then it includes backend requirements for secure authentication handling, request validation, and protection against unauthorized access.
- [ ] Given privacy requirements include archival and deletion considerations, When lifecycle safeguards are documented, Then the story defines how archived or deleted project data is handled in a way that supports privacy expectations.
- [ ] Given automated quality is part of the MVP baseline, When development handoff is prepared, Then the story includes measurable expectations for core backend test coverage and quality checks on business-critical workflows.
- [ ] Given the backend must support stakeholder trust, When cross-story safeguards are reviewed, Then the story identifies review checkpoints for security, privacy, and data-protection concerns across the MVP workflows.
- [ ] Given the MVP timeline is constrained, When scope is validated, Then the story keeps the quality baseline focused on essential protections and excludes post-MVP hardening activities.

**Deliverables**:

- Backend security and privacy checklist for MVP planning
- Quality baseline summary for core backend workflow validation
- Cross-story review checklist for security, privacy, and test-readiness concerns

**Dependencies**:

- NFR-001, NFR-002, NFR-003, NFR-008
- `../2-planning/phased-roadmap.md`
- `../3-architecture/technology-stack.md`

**Success Metrics**:

- MVP backend quality baseline is traceable to NFR-001 through NFR-003
- Product team can review backend safeguards in one document without referencing implementation detail
- No unresolved review feedback remains about minimum backend protection or quality expectations

## Reference

- [Project Overview](../overview.md)
- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Phased Roadmap](../2-planning/phased-roadmap.md)
- [Architecture Solution Design](../3-architecture/architecture-solution-design.md)
- [Technology Stack](../3-architecture/technology-stack.md)

---

**Story ID**: US-P1-BE-006  
**Epic**: Backend Quality and Scalability Validation  
**Priority**: Should Have  
**Effort Estimate**: Story Points: 3

**As a** Backend Engineer,  
**I want to** define performance, scalability, and observability planning for core backend workflows,  
**So that** the platform remains responsive and measurable within documented MVP limits.

**Acceptance Criteria**:

- [ ] Given Phase 1 quality planning is reviewed, When this story is assessed, Then it identifies the core backend workflows that need performance and scalability validation under MVP load.
- [ ] Given responsiveness targets exist for project and requirements views, When backend expectations are documented, Then the story links those workflows to measurable response-time goals already defined in the non-functional requirements.
- [ ] Given growth within MVP limits must not degrade data quality, When scalability planning is reviewed, Then the story defines checks that protect project and story handling within the documented volume constraints.
- [ ] Given observability is required for operational awareness, When the story is reviewed, Then it includes backend monitoring expectations for errors, latency, and export or authorization failures.
- [ ] Given this story is Phase 1 scope, When stakeholders review prioritization, Then it is clearly marked as a quality enhancement that follows completion of the MVP Must Have backend stories.

**Deliverables**:

- Performance and scalability validation checklist for core backend workflows
- Observability review notes for error, latency, and export monitoring
- Phase 1 readiness summary aligned to documented load expectations

**Dependencies**:

- NFR-005, NFR-006
- `../2-planning/phased-roadmap.md`
- `../3-architecture/architecture-solution-design.md`
- `../3-architecture/technology-stack.md`

**Success Metrics**:

- Phase 1 backend quality planning clearly traces to NFR-005 and NFR-006
- Reviewers can identify which workflows require monitoring and load validation without engineering rework
- Phase 1 scope remains distinct from MVP Must Have backend deliverables

## Reference

- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Role Mapping](../2-planning/role-mapping.md)
- [Phased Roadmap](../2-planning/phased-roadmap.md)
- [Architecture Solution Design](../3-architecture/architecture-solution-design.md)
- [Technology Stack](../3-architecture/technology-stack.md)

---

## Backend Planning Deliverables Matrix

| Deliverable                                      | Type                            | Audience                    | Related Stories                      |
| ------------------------------------------------ | ------------------------------- | --------------------------- | ------------------------------------ |
| Client and project lifecycle rule set            | Validation and governance notes | Product Owner, Tech Lead    | US-MVP-BE-001                        |
| Refinement and approval workflow definition      | Workflow planning artifact      | Product Owner, Backend Team | US-MVP-BE-002                        |
| Authorization and protected-content matrix       | Access-control planning sheet   | Product Owner, Tech Lead    | US-MVP-BE-003                        |
| Approved backlog and Markdown export definition  | Deliverable contract summary    | Product Owner, Stakeholders | US-MVP-BE-004                        |
| Security, privacy, and quality readiness review  | Cross-cutting checklist         | Product Owner, Tech Lead    | US-MVP-BE-005                        |
| Phase 1 performance and observability validation | Quality planning checklist      | Product Owner, Tech Lead    | US-P1-BE-006                         |

## Product Team Review Checklist

- [ ] Confirm story priorities align with MVP and Phase 1 roadmap commitments
- [ ] Confirm each backend story traces to the correct FR and NFR references
- [ ] Confirm acceptance criteria remain measurable and implementation-agnostic
- [ ] Confirm no story introduces out-of-scope delivery, collaboration, or post-MVP features

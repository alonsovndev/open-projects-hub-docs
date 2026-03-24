# Backend Engineer User Stories

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Role**         | Backend Engineer            |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [Technology Stack](../03-architecture/technology-stack.md)
- [API Contract](../03-architecture/api-contract.md)
- [Database Design](../06-database/database-design.md)
- [Product Epics](./epics.md)

## Objective

Define backend planning stories that cover secure entry, core planning workflows, approved-artifact delivery, and the Phase 1 identity hardening work needed after MVP.

## Backend Scope and Constraints

- Stories remain planning artifacts and do not prescribe implementation tasks or repository code structure.
- MVP backend scope covers F-001 to F-004, F-007, and F-009.
- Phase 1 backend scope covers F-008 and cross-cutting hardening only after MVP baseline is stable.
- Viewer access remains read-only and approved-content-only across all stories.
- Delivery workflows, collaborator expansion, and non-Markdown export types are excluded.

## MoSCoW Prioritization Summary

| Priority | Story ID      | Theme                                     | Rationale                                                                |
| -------- | ------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| Must     | US-MVP-BE-001 | Authentication and recovery foundation    | Required before any protected planning workflow can be delivered.        |
| Must     | US-MVP-BE-002 | Client and project lifecycle services     | Establishes the primary domain rules for MVP workspace management.       |
| Must     | US-MVP-BE-003 | AI refinement draft and approval services | Covers the core workflow that turns notes into controlled draft stories. |
| Must     | US-MVP-BE-004 | Access-control and visibility enforcement | Protects Admin-only content and Viewer-safe access boundaries.           |
| Must     | US-MVP-BE-005 | Approved backlog and Markdown export      | Delivers the official approved-only planning artifact path.              |
| Should   | US-P1-BE-006  | Account creation and identity bootstrap   | Needed after MVP to support new Admin entry without manual setup.        |
| Should   | US-P1-BE-007  | Privacy, quality, and scale hardening     | Extends the baseline once core planning flows are stable.                |

## User Stories

**Story ID**: US-MVP-BE-001  
**Epic**: Admin Authentication and Recovery Baseline  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define the authentication and password-recovery backend boundaries,  
**So that** Admin users can access the planning workspace through secure, predictable entry flows.

**Acceptance Criteria**:

- [ ] Given MVP requires protected Admin access, when this story is reviewed, then it covers login, session establishment, and password-reset scope for F-007 and F-009.
- [ ] Given auth errors are security-sensitive, when failure scenarios are defined, then responses avoid exposing whether an account or credential exists.
- [ ] Given password recovery is part of MVP, when the reset flow is reviewed, then token issuance, expiry, and invalidation expectations are explicit.
- [ ] Given downstream stories depend on authenticated access, when sequencing is confirmed, then this story is placed before protected project and refinement workflows.

**Deliverables**:

- Backend auth and recovery scope note
- Failure-state and protected-response checklist
- Sequencing notes for auth-dependent MVP stories

**Dependencies**:

- FR-007-01, FR-007-02, FR-009-01, FR-009-02
- NFR-007-01, NFR-009-01, NFR-X01
- [Security Architecture](../03-architecture/security-architecture.md)
- [API Contract](../03-architecture/api-contract.md)

**Success Metrics**:

- Reviewers can confirm MVP auth coverage without unresolved service-boundary gaps.
- Auth behavior is traceable to secure feedback and reset-token requirements.

## Reference

- [Feature Requirements](../01-requirements/f-007-admin-login.md)
- [Feature Requirements](../01-requirements/f-009-reset-password.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Product Epics](./epics.md)

---

**Story ID**: US-MVP-BE-002  
**Epic**: Client and Project Lifecycle Governance  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define client and project lifecycle service behavior,  
**So that** the workspace enforces the MVP rules for client association, active-project limits, and allowed phases.

**Acceptance Criteria**:

- [ ] Given Admin manages clients and projects, when this story is reviewed, then it includes create, update, archive, and association behavior for client and project records.
- [ ] Given active-project limit is a hard MVP rule, when project-creation and project-activation flows are defined, then a fourth active project is blocked consistently.
- [ ] Given lifecycle scope is limited, when project-state handling is reviewed, then only discovery and planning are permitted phases.
- [ ] Given archive behavior affects reporting and limits, when the service rules are reviewed, then archived projects are excluded from active counts.

**Deliverables**:

- Lifecycle-service behavior definition
- Active-project validation checklist
- Archive and project-phase rule notes

**Dependencies**:

- FR-001-01, FR-001-02, FR-001-03
- NFR-001-01, NFR-001-02
- [Database Design](../06-database/database-design.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)

**Success Metrics**:

- Product and engineering reviewers can validate lifecycle rules without additional clarification.
- No unsupported project phase appears in the backend planning scope.

## Reference

- [Feature Requirements](../01-requirements/f-001-client-and-project-lifecycle-management.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Database Design](../06-database/database-design.md)
- [Product Epics](./epics.md)

---

**Story ID**: US-MVP-BE-003  
**Epic**: AI Refinement and Approval Control  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 8

**As a** Backend Engineer,  
**I want to** define the refinement-session, draft-story, and approval-state service behavior,  
**So that** Admin users can transform raw notes into controlled draft requirements without publishing unapproved content.

**Acceptance Criteria**:

- [ ] Given Admin submits raw notes or bullet lists, when refinement intake is planned, then both input styles are supported without file-upload assumptions.
- [ ] Given AI output becomes a project artifact only after review, when draft lifecycle is defined, then generated stories stay in draft until explicit approval.
- [ ] Given drafts need to remain useful for editing, when generated output shape is reviewed, then title, user story statement, and acceptance-criteria-ready content are preserved.
- [ ] Given export and Viewer visibility depend on approved content only, when workflow boundaries are reviewed, then draft and approved states are separated clearly.

**Deliverables**:

- Refinement workflow service-definition note
- Draft-versus-approved state checklist
- Approval-gate traceability notes

**Dependencies**:

- FR-002-01, FR-002-02, FR-002-03
- NFR-002-01, NFR-002-02
- [API Contract](../03-architecture/api-contract.md)
- [Database Design](../06-database/database-design.md)

**Success Metrics**:

- The refinement workflow is decomposed clearly enough for backend sequencing.
- Draft-state handling remains unambiguous during review and export planning.

## Reference

- [Feature Requirements](../01-requirements/f-002-ai-refinement-and-approval-workflow.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [API Contract](../03-architecture/api-contract.md)
- [Product Epics](./epics.md)

---

**Story ID**: US-MVP-BE-004  
**Epic**: Access Boundary and Stakeholder Visibility  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define role and visibility enforcement rules,  
**So that** Admin-only content stays protected and Viewer access remains strictly read-only.

**Acceptance Criteria**:

- [ ] Given MVP supports Admin and Viewer only, when authorization scope is reviewed, then Viewer permissions are limited to approved content and project status visibility.
- [ ] Given internal notes are protected content, when response boundaries are defined, then those notes are excluded from Viewer responses and exports.
- [ ] Given invitation flows are out of scope, when access behavior is planned, then no collaborator model beyond Admin and Viewer is introduced.
- [ ] Given role enforcement affects all protected workflows, when dependency sequencing is reviewed, then this story precedes Viewer-safe backlog and export handling.

**Deliverables**:

- Role-permission planning matrix
- Protected-content exclusion checklist
- Viewer-safe response-definition notes

**Dependencies**:

- FR-003-01, FR-003-02, FR-003-03
- NFR-003-01, NFR-003-02
- [Role Mapping](../02-planning/role-mapping.md)
- [Security Architecture](../03-architecture/security-architecture.md)

**Success Metrics**:

- No unresolved ambiguity remains around Admin versus Viewer behavior.
- Viewer-safe outputs are traceable to both access and readability requirements.

## Reference

- [Feature Requirements](../01-requirements/f-003-access-control-and-visibility-boundaries.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Security Architecture](../03-architecture/security-architecture.md)
- [Product Epics](./epics.md)

---

**Story ID**: US-MVP-BE-005  
**Epic**: Backlog and Export Deliverable  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define approved backlog retrieval and Markdown export service behavior,  
**So that** the product can generate and share an official planning artifact from approved requirements only.

**Acceptance Criteria**:

- [ ] Given approved requirements are the official deliverable, when backlog retrieval is planned, then only approved stories and acceptance criteria are included.
- [ ] Given export is a required MVP output, when Markdown generation is reviewed, then the standard story structure is preserved.
- [ ] Given internal notes and drafts are not stakeholder artifacts, when export scope is defined, then both are excluded by default.
- [ ] Given output quality matters to stakeholder review, when the service definition is assessed, then ordering and readability assumptions are explicit.

**Deliverables**:

- Approved-backlog service scope note
- Export filtering checklist
- Markdown structure and ordering notes

**Dependencies**:

- FR-004-01, FR-004-02
- NFR-004-01, NFR-004-02
- [API Contract](../03-architecture/api-contract.md)
- [Database Design](../06-database/database-design.md)

**Success Metrics**:

- Export behavior is fully traceable to approved-only deliverable rules.
- Reviewers can validate official artifact boundaries in one pass.

## Reference

- [Feature Requirements](../01-requirements/f-004-requirements-backlog-and-markdown-export.md)
- [API Contract](../03-architecture/api-contract.md)
- [Database Design](../06-database/database-design.md)
- [Product Epics](./epics.md)

---

**Story ID**: US-P1-BE-006  
**Epic**: Entry-Flow Quality Uplift  
**Priority**: Should Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define account-creation and identity-bootstrap service behavior,  
**So that** new Admin users can register and reach the correct next step after MVP core flows are stable.

**Acceptance Criteria**:

- [ ] Given new Admin registration is a Phase 1 enhancement, when the flow is reviewed, then required field validation and role assignment assumptions are explicit.
- [ ] Given registration should lead users into the product cleanly, when next-step routing is defined, then the service supports transition to login or onboarding.
- [ ] Given secure credential handling remains mandatory, when registration planning is reviewed, then password rules and account-creation safety remain aligned to the security baseline.

**Deliverables**:

- Registration service-scope note
- Account-bootstrap and next-step routing notes
- Validation and security checklist for registration

**Dependencies**:

- FR-008-01, FR-008-02, FR-008-03
- NFR-008-01
- [Feature Requirements](../01-requirements/f-008-create-account.md)
- [Security Architecture](../03-architecture/security-architecture.md)

**Success Metrics**:

- Registration behavior is clear enough for later implementation planning.
- Phase 1 identity expansion does not introduce role or scope ambiguity.

## Reference

- [Feature Requirements](../01-requirements/f-008-create-account.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Product Epics](./epics.md)

---

**Story ID**: US-P1-BE-007  
**Epic**: Entry-Flow Quality Uplift  
**Priority**: Should Have  
**Effort Estimate**: Story Points: 3

**As a** Backend Engineer,  
**I want to** define the cross-cutting privacy, quality, and scale hardening expectations,  
**So that** the planning platform can move beyond MVP without revisiting core operational assumptions.

**Acceptance Criteria**:

- [ ] Given privacy and archival rules affect trust, when hardening scope is reviewed, then deletion and archival expectations remain explicit and traceable.
- [ ] Given automated quality thresholds exist, when Phase 1 planning is reviewed, then testability and operational readiness expectations remain visible to engineering.
- [ ] Given usage may grow after MVP, when scale assumptions are documented, then performance and scale targets are recorded without expanding into implementation design.

**Deliverables**:

- Cross-cutting quality baseline note
- Privacy and lifecycle-hardening checklist
- Performance and scale planning assumptions

**Dependencies**:

- NFR-X02, NFR-X03, NFR-X05, NFR-X06
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)

**Success Metrics**:

- Cross-cutting NFRs are visible in backend planning before post-MVP growth.
- No hidden quality dependency remains outside the roadmap.

## Reference

- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Product Epics](./epics.md)

## Story Traceability Matrix

| Story ID      | Feature Coverage      | Primary Requirement Coverage                        | Notes                                |
| ------------- | --------------------- | --------------------------------------------------- | ------------------------------------ |
| US-MVP-BE-001 | F-007, F-009          | FR-007-01, FR-007-02, FR-009-01, FR-009-02, NFR-X01 | MVP auth and recovery foundation     |
| US-MVP-BE-002 | F-001                 | FR-001-01, FR-001-02, FR-001-03, NFR-001-01         | Core project lifecycle services      |
| US-MVP-BE-003 | F-002                 | FR-002-01, FR-002-02, FR-002-03                     | Draft and approval state control     |
| US-MVP-BE-004 | F-003                 | FR-003-01, FR-003-02, FR-003-03                     | Role and visibility enforcement      |
| US-MVP-BE-005 | F-004                 | FR-004-01, FR-004-02, NFR-004-01                    | Approved backlog and export delivery |
| US-P1-BE-006  | F-008                 | FR-008-01, FR-008-02, FR-008-03                     | Registration and next-step routing   |
| US-P1-BE-007  | Cross-cutting Phase 1 | NFR-X02, NFR-X03, NFR-X05, NFR-X06                  | Hardening after MVP baseline         |

## Change Log

| Date       | Version | Change Summary                                                                        | Author        |
| ---------- | ------- | ------------------------------------------------------------------------------------- | ------------- |
| 2026-03-23 | 1.1     | Rewrote backend stories to align with feature-based requirements and current roadmap. | Product Owner |
| 2026-03-18 | 1.0     | Initial backend story draft.                                                          | Product Owner |

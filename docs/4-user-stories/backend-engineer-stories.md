# Backend Engineer User Stories

| Attribute | Value |
| --- | --- |
| **Project** | Open Freelancer Project Hub |
| **Role** | Backend Engineer |
| **Last Updated** | 2026-02-28 |

## Story Catalog

**Story ID**: US-MVP-BE-001  
**Epic**: Client and Project Administration  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define backend rules for client/project management and the active-project cap,  
**So that** Admin users can manage valid project data without exceeding MVP limits.

**Acceptance Criteria**:
- [ ] Given an Admin account with fewer than three active projects, When a new project linked to an existing client is submitted, Then the project is accepted and stored as active.
- [ ] Given an Admin account with three active projects, When another active project creation request is submitted, Then the request is rejected with a clear limit message.
- [ ] Given a project create or update request without a valid client association, When validation is executed, Then the request is rejected and no project record is persisted.

**Deliverables**:
- Backend story definition for enforcing project-client association (FR-001).
- Backend story definition for enforcing max three active projects per Admin (FR-002).

**Dependencies**:
- Functional requirement clarifications for FR-001 and FR-002.
- Data model constraints in project/client entities.

**Success Metrics**:
- 100% of stored projects are linked to a valid client.
- 100% of fourth active-project attempts are blocked.

## Reference

- [Project Overview](/docs/overview.md)
- [Functional Requirements](/docs/1-requirements/functional-requirements.md)
- [Role Mapping](/docs/2-planning/role-mapping.md)
- [Database Design](/docs/6-database/database-design.md)

---

**Story ID**: US-MVP-BE-002  
**Epic**: AI-Assisted Requirements Refinement and Approval  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 8

**As a** Backend Engineer,  
**I want to** define backend workflow behavior for refinement sessions, ambiguity metadata, and draft story generation states,  
**So that** Admin users can reliably transform raw notes into structured draft requirements.

**Acceptance Criteria**:
- [ ] Given raw plain-text notes or bullet lists, When refinement is requested, Then the input is accepted as a valid refinement session source.
- [ ] Given ambiguous phrases are identified, When draft output is prepared, Then ambiguity highlights are returned with position data tied to the same session.
- [ ] Given generated draft stories are produced, When they are saved, Then each story includes a title, a standard user story statement, and at least one acceptance criterion.
- [ ] Given refinement output is not explicitly approved, When project requirements are queried for official backlog/export, Then draft session content is excluded.

**Deliverables**:
- Backend user story for session lifecycle covering draft and pre-approval states (FR-004 to FR-007).
- Backend user story for ambiguity and draft-story persistence consistency.

**Dependencies**:
- AI refinement scope and output standards in FR-004 to FR-007.
- API contract expectations for refinement input/output.

**Success Metrics**:
- 100% of generated draft stories include required template fields.
- 0 unapproved stories appear in official backlog/export outputs.

## Reference

- [Functional Requirements](/docs/1-requirements/functional-requirements.md)
- [Phased Roadmap](/docs/2-planning/phased-roadmap.md)
- [Architecture Solution Design](/docs/3-architecture/architecture-solution-design.md)
- [API Contract](/docs/3-architecture/api-contract.md)
- [Database Design](/docs/6-database/database-design.md)

---

**Story ID**: US-MVP-BE-003  
**Epic**: Secure Role-Based Visibility and Internal Notes Protection  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 8

**As a** Backend Engineer,  
**I want to** define role-based backend access behavior for Admin and Viewer users,  
**So that** internal notes and write operations remain protected while Viewer access stays read-only.

**Acceptance Criteria**:
- [ ] Given an authenticated Viewer, When they request create, update, or delete actions for project or requirement data, Then access is denied.
- [ ] Given an authenticated Viewer, When they request project or requirement details, Then read-only data is returned without internal notes.
- [ ] Given an authenticated Admin, When they request project or requirement details, Then internal notes fields are included according to Admin visibility rules.
- [ ] Given collaborator management actions beyond Admin/Viewer roles, When such requests are received, Then the requests are rejected as out of MVP scope.

**Deliverables**:
- Backend user story for Admin/Viewer permission boundaries (FR-008, FR-009).
- Backend user story for internal notes protection across read and export flows (FR-010).

**Dependencies**:
- Security and privacy constraints in NFR-001 and NFR-002.
- Role and ownership mapping in planning documents.

**Success Metrics**:
- 0 successful Viewer write operations in protected resources.
- 0 internal note exposures in Viewer-facing API responses.

## Reference

- [Functional Requirements](/docs/1-requirements/functional-requirements.md)
- [Non-Functional Requirements](/docs/1-requirements/non-functional-requirements.md)
- [Role Mapping](/docs/2-planning/role-mapping.md)
- [Security Architecture](/docs/3-architecture/security-architecture.md)
- [Database Design](/docs/6-database/database-design.md)

---

**Story ID**: US-MVP-BE-004  
**Epic**: Structured Backlog and Markdown Export  
**Priority**: Must Have  
**Effort Estimate**: Story Points: 5

**As a** Backend Engineer,  
**I want to** define backend rules for official backlog retrieval and Markdown export generation,  
**So that** approved requirements are delivered in a consistent, shareable format.

**Acceptance Criteria**:
- [ ] Given approved requirements exist for a project, When backlog data is requested, Then the response returns a structured, ordered list of stories with acceptance criteria.
- [ ] Given a Markdown export request from an Admin, When export processing finishes, Then only approved requirements are included in the output.
- [ ] Given draft or archived requirements exist, When export is generated, Then those items are excluded from the export payload.
- [ ] Given a Viewer requests export history or content, When authorization rules are applied, Then only permitted read-only export visibility is provided without internal notes.

**Deliverables**:
- Backend user story for approved-backlog query behavior (FR-011).
- Backend user story for Markdown export filtering and role-safe output (FR-012).

**Dependencies**:
- Backlog and export definitions in FR-011 and FR-012.
- Data ordering and export metadata expectations in database design.

**Success Metrics**:
- 100% of export artifacts include only approved requirements.
- 100% of returned backlog stories include at least one acceptance criterion block.

## Reference

- [Functional Requirements](/docs/1-requirements/functional-requirements.md)
- [Phased Roadmap](/docs/2-planning/phased-roadmap.md)
- [API Contract](/docs/3-architecture/api-contract.md)
- [Database Design](/docs/6-database/database-design.md)

---

**Story ID**: US-P1-BE-005  
**Epic**: Backend Quality, Performance, and Compliance Validation  
**Priority**: Should Have  
**Effort Estimate**: Story Points: 3

**As a** Backend Engineer,  
**I want to** define measurable backend quality and compliance checks for MVP and Phase 1 workflows,  
**So that** the planning outputs remain secure, reliable, and aligned with non-functional targets.

**Acceptance Criteria**:
- [ ] Given MVP backend services are validated, When security checks are reviewed, Then OWASP-aligned controls and access protections are mapped to backend acceptance evidence (NFR-001).
- [ ] Given data lifecycle events (archive/delete) are evaluated, When privacy behavior is reviewed, Then project availability changes satisfy GDPR-aligned timing expectations (NFR-002).
- [ ] Given core requirement retrieval endpoints are assessed under MVP limits, When performance checks are executed, Then key responses meet the 2-second target (NFR-005).
- [ ] Given automated quality gates are reviewed, When test strategy compliance is verified, Then documented coverage target is at least 70% for core logic (NFR-003).

**Deliverables**:
- Backend user story for non-functional validation ownership across security, privacy, testing, and performance.
- Phase-aware quality checklist inputs for MVP and Phase 1 planning reviews.

**Dependencies**:
- Non-functional requirements baseline (NFR-001 to NFR-006).
- Observability and quality planning standards from architecture documentation.

**Success Metrics**:
- 100% of backend NFR controls are mapped to measurable validation evidence.
- 0 unresolved Must-priority NFR gaps at MVP sign-off.

## Reference

- [Non-Functional Requirements](/docs/1-requirements/non-functional-requirements.md)
- [Role Mapping](/docs/2-planning/role-mapping.md)
- [Phased Roadmap](/docs/2-planning/phased-roadmap.md)
- [Architecture Solution Design](/docs/3-architecture/architecture-solution-design.md)
- [Monitoring and Observability](/docs/3-architecture/monitoring-observability.md)
- [Threat Model](/docs/3-architecture/threat-model.md)

---

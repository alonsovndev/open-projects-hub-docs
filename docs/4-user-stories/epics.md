# Epics

| Attribute | Value |
| --- | --- |
| **Project** | Open Freelancer Project Hub |
| **Version** | 1.0 |
| **Status** | Draft |
| **Last Updated** | 2026-02-28 |

> Note: `US-EPx-xxx` items are placeholder story groups to be detailed in role-specific story files under `docs/4-user-stories/`.

## Epic 1: Client and Project Administration

### Problem Statement

Freelancers need a consistent way to organize clients and projects while respecting MVP constraints, especially the active-project limit.

### Objective

Enable Admin users to manage client records and project lifecycle data in a structured way that supports discovery and planning workflows.

### Scope

- **Included**
  - Client create/view/update/archive flow (FR-001).
  - Project create/view/update/archive flow with mandatory client association (FR-001).
  - Maximum of three active projects per freelancer account (FR-002).
- **Excluded**
  - Billing, invoicing, or contract management.
  - Portfolio management beyond MVP account constraints.

### Related User Stories

- US-EP1-001: Manage client records
- US-EP1-002: Create and update projects linked to clients
- US-EP1-003: Enforce active-project limit

### Dependencies

- `docs/overview.md` (problem context, MVP scope, and high-level goals)
- `docs/1-requirements/functional-requirements.md` (FR-001, FR-002)
- `docs/2-planning/phased-roadmap.md`
- `docs/6-database/database-design.md`

### Success Criteria

- 100% of projects are associated with a valid client record.
- 100% enforcement of the three-active-project limit.

### Acceptance Criteria

- Given an Admin has three active projects, when they attempt to create a fourth, then the system blocks creation and requests archiving an existing project.
- Given an Admin creates a new project, when saving, then selecting an existing client is required.

---

## Epic 2: Discovery and Planning Scope Governance

### Problem Statement

Without explicit phase boundaries, MVP planning can expand into delivery scope and reduce focus on core requirements refinement goals.

### Objective

Keep project workflows constrained to discovery and planning phases while maintaining clear phase visibility for Admin and Viewer users.

### Scope

- **Included**
  - Discovery and planning as the only allowed project phases (FR-003).
  - Read-only project phase visibility for Viewer users (FR-014).
- **Excluded**
  - Delivery/handoff execution workflows.
  - Sprint execution tooling beyond planning artifacts.

### Related User Stories

- US-EP2-001: Restrict projects to discovery/planning phases
- US-EP2-002: Show project phase status to viewers

### Dependencies

- `docs/overview.md` (MVP phase boundaries and target user needs)
- `docs/1-requirements/functional-requirements.md` (FR-003, FR-014)
- `docs/2-planning/phased-roadmap.md`
- `docs/2-planning/role-mapping.md`

### Success Criteria

- 0 MVP artifacts include delivery/handoff workflow scope.
- 100% of project status values remain within discovery or planning.

### Acceptance Criteria

- Given a project in MVP scope, when status is updated, then only discovery or planning values are available.
- Given a Viewer accesses project details, when loading status information, then current phase is visible and read-only.

---

## Epic 3: AI-Assisted Requirements Refinement and Approval

### Problem Statement

Raw client notes are often ambiguous and difficult to transform into standardized, actionable user stories without manual overhead.

### Objective

Provide an Admin workflow that converts raw notes into editable, approvable user stories with ambiguity visibility and explicit approval control.

### Scope

- **Included**
  - Input of raw notes and bullet lists (FR-004).
  - Inline ambiguity highlighting (FR-005).
  - Story generation in standard user-story format with acceptance criteria (FR-006).
  - Admin edit and explicit approval gate before official use (FR-007).
- **Excluded**
  - Automatic publication without Admin approval.
  - Non-text file ingestion in MVP.

### Related User Stories

- US-EP3-001: Submit raw notes and bullet lists for refinement
- US-EP3-002: Review ambiguity highlights in generated draft
- US-EP3-003: Edit and approve generated user stories

### Dependencies

- `docs/1-requirements/functional-requirements.md` (FR-004 to FR-007)
- `docs/2-planning/role-mapping.md`
- `docs/3-architecture/architecture-solution-design.md`
- `docs/3-architecture/api-contract.md`

### Success Criteria

- 100% of official stories have explicit Admin approval.
- 100% of generated stories include title, user story statement, and at least one acceptance criterion.

### Acceptance Criteria

- Given raw notes are submitted, when AI refinement completes, then ambiguity highlights are shown inline before approval.
- Given generated stories are in draft state, when Admin has not approved them, then they are excluded from official backlog/export artifacts.

---

## Epic 4: Secure Role-Based Visibility and Internal Notes Protection

### Problem Statement

Planning artifacts contain sensitive internal context that must remain available to Admin users while being hidden from Viewer users.

### Objective

Enforce role-based access boundaries that preserve collaboration transparency for viewers without exposing internal or editable data.

### Scope

- **Included**
  - Admin full CRUD and Viewer read-only permissions (FR-008).
  - Restriction of collaborator invitations in MVP (FR-009).
  - Internal notes field visible only to Admin and excluded from Viewer/export views (FR-010).
  - Security and privacy controls aligned to MVP requirements (NFR-001, NFR-002).
- **Excluded**
  - Additional roles beyond Admin and Viewer.
  - Advanced permission matrix customization.

### Related User Stories

- US-EP4-001: Enforce Admin/Viewer access controls
- US-EP4-002: Keep internal notes Admin-only
- US-EP4-003: Block external collaborator invitation flow

### Dependencies

- `docs/1-requirements/functional-requirements.md` (FR-008 to FR-010)
- `docs/1-requirements/non-functional-requirements.md` (NFR-001, NFR-002)
- `docs/2-planning/role-mapping.md`
- `docs/3-architecture/security-architecture.md`
- `docs/6-database/database-design.md`

### Success Criteria

- 0 unauthorized write operations from Viewer role.
- 0 internal notes exposures in Viewer-visible artifacts.

### Acceptance Criteria

- Given a Viewer user opens requirement content, when internal notes exist, then those notes are not visible.
- Given a Viewer attempts create/edit/delete actions, when action is submitted, then access is denied.

---

## Epic 5: Structured Backlog, Export, and Usability Quality

### Problem Statement

Stakeholders need readable, structured requirements that can be reviewed and shared consistently without manual reformatting.

### Objective

Deliver a clear requirements backlog and Markdown export flow with baseline onboarding, readability, performance, scalability, and accessibility expectations.

### Scope

- **Included**
  - Structured backlog of approved user stories with acceptance criteria (FR-011).
  - Markdown export for approved requirements only (FR-012).
  - Minimal first-use onboarding and contextual guidance (FR-013).
  - Viewer-readable requirement presentation (FR-014, NFR-004).
  - Baseline quality targets for testing, performance, scalability, and accessibility (NFR-003, NFR-005 to NFR-007).
- **Excluded**
  - Non-Markdown export formats in MVP.
  - Advanced analytics and dashboarding for requirement quality.

### Related User Stories

- US-EP5-001: View approved backlog with standard story template
- US-EP5-002: Export approved requirements to Markdown
- US-EP5-003: Show first-use onboarding guidance for Admin

### Dependencies

- `docs/1-requirements/functional-requirements.md` (FR-011 to FR-014)
- `docs/1-requirements/non-functional-requirements.md` (NFR-003 to NFR-007)
- `docs/2-planning/phased-roadmap.md`
- `docs/3-architecture/api-contract.md`

### Success Criteria

- 100% of exported artifacts contain only approved stories.
- Core project and requirements views meet the 2-second MVP response target.
- Viewer-facing stories are readable and consistently formatted.

### Acceptance Criteria

- Given an Admin exports requirements, when export completes, then only approved stories are included in Markdown output.
- Given a Viewer opens the backlog, when stories are displayed, then they follow the standard template and omit internal notes.

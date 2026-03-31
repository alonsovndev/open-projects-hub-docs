# Stories for Epic: Client and Project Lifecycle Governance

## Backend Engineer

### US-EP1-BE-001: Client and Project CRUD Operations

**Epic**: Client and Project Lifecycle Governance
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Backend Engineer,
**I want to** implement CRUD operations for clients and projects,
**So that** Admin users can manage client and project records effectively.

**Acceptance Criteria**:

- [ ] Given a client record, when it is created, updated, or deleted, then the changes are persisted in the database.
- [ ] Given a project record, when it is created, updated, or archived, then the changes are persisted in the database.
- [ ] Given a project is archived, when active-project limits are evaluated, then that project no longer counts toward the active limit.

**Deliverables**:

- CRUD endpoints for clients and projects.
- Database schema for clients and projects.
- Unit tests for CRUD operations.

---

### US-EP1-BE-002: Active Project Limit Enforcement

**Epic**: Client and Project Lifecycle Governance
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** enforce an active-project limit of three per Admin,
**So that** the workspace remains manageable and within constraints.

**Acceptance Criteria**:

- [ ] Given an Admin has three active projects, when they attempt to create or reactivate another project, then the action is blocked.
- [ ] Given an Admin archives a project, when they attempt to create a new project, then the action is allowed.

**Deliverables**:

- Active-project limit enforcement logic.
- Unit tests for active-project limit scenarios.
- Documentation for active-project constraints.

---

## Frontend Engineer

### US-EP1-FE-001: Project Management UI

**Epic**: Client and Project Lifecycle Governance
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Frontend Engineer,
**I want to** create a project management UI,
**So that** Admin users can manage projects visually.

**Acceptance Criteria**:

- [ ] Given the project list view, when projects are displayed, then their status (active/archived) is clearly shown.
- [ ] Given the "Create Project" button, when clicked, then a form is displayed for project creation.
- [ ] Given an Admin attempts to create a fourth active project, when the action is blocked, then a clear error message is displayed.

**Deliverables**:

- Project list view with status indicators.
- Project creation form with validation.
- Error handling for active-project limit.

---

## UI/UX Designer

### US-EP1-UX-001: Project Lifecycle Flow Design

**Epic**: Client and Project Lifecycle Governance
**Priority**: Must Have
**Effort Estimate**: 5

**As a** UI/UX Designer,
**I want to** design the project lifecycle flow,
**So that** Admin users have a clear and intuitive experience when managing projects.

**Acceptance Criteria**:

- [ ] Project list view includes clear indicators for active and archived projects.
- [ ] Create project flow includes client association and phase selection.
- [ ] Active-project limit is communicated clearly in the UI.

**Deliverables**:

- Wireframes for project lifecycle flow.
- High-fidelity mockups for project list and creation form.
- Accessibility annotations for all components.

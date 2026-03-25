# Frontend Engineer User Stories

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Role**         | Frontend Engineer           |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [API Contract](../03-architecture/api/api-contract.md)
- [Sequence Diagrams](../03-architecture/sequence-diagrams.md)
- [Security Architecture](../03-architecture/security/security-architecture.md)
- [Database Design](../04-database/database-design.md)
- [Design Direction](../05-prototype/design-direction.md)
- [Product Epics](./epics.md)

## Objective

Deliver authentication flows, project management UI, AI refinement interaction, backlog display, and Viewer read-only experience—all aligned to backend APIs and UX guidance.

## MVP Frontend Stories

---

## MoSCoW Prioritization Summary

| Priority | Story ID       | Theme                                     | Sequence   |
| -------- | -------------- | ----------------------------------------- | ---------- |
| Must     | US-EP0-FE-001  | React app scaffolding and dev environment | Foundation |
| Must     | US-EP0-FE-002  | Frontend testing framework                | Foundation |
| Must     | US-EP0-FE-003  | Environment config and API service layer  | Foundation |
| Must     | US-MVP-FE-001  | Admin login and session flow              | Auth       |
| Must     | US-MVP-FE-002  | Password reset request and completion     | Auth       |
| Must     | US-MVP-FE-003  | Project list, create, and archive UI      | Core MVP   |
| Must     | US-MVP-FE-004  | AI refinement input and draft preview     | Core MVP   |
| Must     | US-MVP-FE-004A | Draft approval and state transition UI    | Core MVP   |
| Must     | US-MVP-FE-005  | Backlog view and story display            | Core MVP   |
| Must     | US-MVP-FE-006  | Markdown export action and download       | Core MVP   |
| Should   | US-P1-FE-007   | Public landing page and login CTA         | Phase 1    |
| Should   | US-P1-FE-008   | Account registration form                 | Phase 1    |
| Should   | US-P1-FE-009   | Viewer access experience                  | Phase 1    |

## Epic 0: Foundational Frontend Setup and Development Environment

### US-EP0-FE-001: React App Scaffolding and Development Environment

**Epic**: Project and Local Development Setup (Foundational)
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** scaffold a React application with build tooling, development server, and project structure,
**So that** frontend development can begin with a consistent, fast-rebuild development environment.

**Acceptance Criteria**:

- [ ] Given the repo is cloned, when the dev server starts, then the app loads at localhost:3000 within 5 seconds.
- [ ] Given a file is modified, when the browser tab is refreshed, then hot-reload shows changes immediately (within 2 seconds).
- [ ] Given TypeScript or JSX is used, then linting and type-checking provide real-time feedback in the editor.
- [ ] Given the app is built, when production build completes, then output is optimized and under code-split warnings.

**Deliverables**:

- React app scaffolding with Create React App, Vite, or Next.js (per [Technology Stack](../03-architecture/technology-stack.md)).
- Development server configuration with fast rebuild and hot reload.
- Directory structure: src/components/, src/pages/, src/services/, src/styles/, public/.
- TypeScript configuration with strict mode enabled.
- ESLint and Prettier configuration integrated.
- Build script (npm run build / yarn build) producing optimized output.

**Dependencies**:

- [Technology Stack](../03-architecture/technology-stack.md).
- [ADR-002: Frontend Framework](../03-architecture/adrs/adr-002-frontend-framework.md).
- [ADR-008: Build Tool](../03-architecture/adrs/adr-008-build-tool.md).

**Success Metrics**:

- Dev server starts and hot-reload works within 5 seconds.
- Production build completes in under 30 seconds.
- No TypeScript errors on initial project.

---

### US-EP0-FE-002: Frontend Testing Framework and Component Tests

**Epic**: Project and Local Development Setup (Foundational)
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** set up unit and integration testing for React components,
**So that** component logic and UI interactions can be validated before reaching production.

**Acceptance Criteria**:

- [ ] Given a React component is created, when tests are written using Vitest, then tests can be run via npm test.
- [ ] Given a component renders conditionally, when tests verify different props, then variations are covered.
- [ ] Given user interactions (clicks, inputs), when tests simulate them, then component state and callbacks are validated.
- [ ] Given test coverage is measured, when coverage report is generated, then output shows file-by-file coverage percentages.

**Deliverables**:

- Testing framework setup (Vitest) with React Testing Library.
- Test configuration and coverage reporting setup.
- Example component tests demonstrating common patterns (rendering, props, interactions).
- npm test script for running all tests and generating coverage.
- CI/CD integration for running tests on every PR.

**Dependencies**:

- [Technology Stack](../03-architecture/technology-stack.md).
- [ADR-009: Testing Framework](../03-architecture/adrs/adr-009-testing-framework.md).

**Success Metrics**:

- Components have at least 70% test coverage.
- Test suite runs in under 30 seconds.
- Tests pass on every commit before merge.

---

### US-EP0-FE-003: Environment Configuration and API Service Layer

**Epic**: Project and Local Development Setup (Foundational)
**Priority**: Must Have
**Effort Estimate**: 3

**As a** Frontend Engineer,
**I want to** establish environment configuration (.env files) and API client service for communicating with backend,
**So that** API endpoints can be easily swapped between dev, staging, and production environments.

**Acceptance Criteria**:

- [ ] Given environment files are used, when app runs in dev mode, then it connects to localhost backend.
- [ ] Given app is built for production, when environment is set to prod, then it connects to production API endpoint.
- [ ] Given API service is used, when an endpoint is called, then request/response handling includes error states and loading indicators.
- [ ] Given API documentation is available, when frontend engineer needs endpoint details, then OpenAPI spec or README is consulted.

**Deliverables**:

- .env configuration files (.env.development, .env.production, .env.staging).
- Environment variable loading mechanism (dotenv or build-time injection).
- API client service module (fetch wrapper, Axios adapter, or equivalent) with base URL and auth header injection.
- Example API call with error handling and loading state.
- Documentation linking to [API Contract](../03-architecture/api/api-contract.md).

**Dependencies**:

- [Technology Stack](../03-architecture/technology-stack.md).
- [API Contract](../03-architecture/api/api-contract.md).

**Success Metrics**:

- API client works in all environments without code changes.
- Environment variables are never hardcoded in version control.

### US-MVP-FE-001: Admin Login and Session Flow

**Epic**: Admin Authentication and Recovery Baseline
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** implement a login form with email/password input, error messaging, and automatic redirect to workspace on success,
**So that** Admin users can authenticate and enter the primary planning interface.

**Acceptance Criteria**:

- [ ] Given an Admin opens the app unauthenticated, when the page loads, then login form is displayed with email and password fields.
- [ ] Given valid credentials, when login is submitted, then the session token is stored in secure storage and the user is redirected to /workspace.
- [ ] Given invalid credentials, when login is submitted, then a generic error message is shown ("Invalid email or password").
- [ ] Given the session token expires, when the next API call is made, then the user is redirected to login.
- [ ] Given the login form is submitted with missing fields, then validation errors are shown for each field.

**Deliverables**:

- Login page component with form validation.
- Session token storage (secure HTTP-only cookie or secure localStorage pattern).
- Navigation guard to redirect unauthenticated users to login.
- Error boundary and generic error message display.

**Dependencies**:

- FR-007-01, FR-007-02 (Admin Login requirements).
- [API Contract](../03-architecture/api/api-contract.md).
- [Design Direction](../05-prototype/design-direction.md).

**Success Metrics**:

- Login form renders and validates in under 1 second.
- Session token persists across page refresh.
- Unauthenticated route access ⇒ automatic redirect to login.

---

### US-MVP-FE-002: Password Reset Request and Completion Flow

**Epic**: Admin Authentication and Recovery Baseline
**Priority**: Must Have
**Effort Estimate**: 3

**As a** Frontend Engineer,
**I want to** implement a password reset flow with request and completion screens,
**So that** Admin users can recover access through a guided email-token-based flow.

**Acceptance Criteria**:

- [ ] Given an Admin is on the login page, when they click "Forgot Password", then a reset request form is shown.
- [ ] Given a valid email, when reset is submitted, then a success message is shown and instructions to check email are displayed.
- [ ] Given Admin receives email with reset link, when they click the link, then a reset form is shown with token pre-filled.
- [ ] Given a new password is submitted with a valid token, then success message is shown and user is redirected to login.
- [ ] Given an invalid or expired token, when reset form is loaded, then an error message is displayed.

**Deliverables**:

- Forgot password request page.
- Password reset form (triggered by email link with token as URL parameter).
- Success and error state handling.
- Client-side token validation before submission.

**Dependencies**:

- FR-009-01, FR-009-02, FR-009-03 (Password Reset requirements).
- [API Contract](../03-architecture/api/api-contract.md).

**Success Metrics**:

- Reset flow completes without token replay or manipulation.
- User receives clear feedback at each step.

---

### US-MVP-FE-003: Project List, Create, and Archive UI

**Epic**: Client and Project Lifecycle Governance
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Frontend Engineer,
**I want to** implement a project management interface with list view, creation form, edit form, and archive action,
**So that** Admin users can manage clients and projects from a single workspace view.

**Acceptance Criteria**:

- [ ] Given Admin opens workspace, when the page loads, then active projects are listed with client name, phase, and created date.
- [ ] Given the "Create Project" button is clicked, when the form opens, then fields for project name, client selection, and phase are shown.
- [ ] Given the admin has 3 active projects, when they attempt to create a 4th, then a message explains the active-project limit.
- [ ] Given a project exists, when the archive button is clicked, then a confirmation modal is shown and archive is completed on confirmation.
- [ ] Given a project is archived, when backlog is viewed, then archived projects are hidden from the main list but visible in an "archived" tab.

**Deliverables**:

- Project list component with sorting and filtering (active vs. archived).
- Create project modal/form with client selection dropdown and phase radio buttons.
- Edit project form (name and phase updates).
- Archive project action with confirmation modal.
- Inline validation preventing 4th project creation.

**Dependencies**:

- FR-001-01, FR-001-02, FR-001-03 (Client and Project lifecycle requirements).
- [API Contract](../03-architecture/api/api-contract.md).
- [Design Direction](../05-prototype/design-direction.md).

**Success Metrics**:

- Project list renders within 1 second.
- Create, edit, and archive flows complete without page reloads.
- Active-project limit enforced on client side (UX) before API call.

---

### US-MVP-FE-004: AI Refinement Input and Draft Preview

**Epic**: AI Refinement and Approval Control
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Frontend Engineer,
**I want to** implement a refinement interface where Admin can input raw notes, submit for AI processing, and preview generated draft stories,
**So that** Admin can review AI output clearly before taking approval decisions.

**Acceptance Criteria**:

- [ ] Given Admin opens a project, when they navigate to "Refine", then a text input area and submit button are shown.
- [ ] Given raw notes are entered and submit is clicked, then a loading indicator is shown and the form is disabled during processing.
- [ ] Given AI returns draft stories, when processing completes, then each draft is displayed in a preview card with title and acceptance criteria summary.
- [ ] Given processing fails or returns malformed output, when the response is handled, then clear recovery messaging is shown.

**Deliverables**:

- Refinement input form with plain-text area and submit button.
- Loading and error state handling during AI processing.
- Draft story preview cards with readable structure and expandable detail.

**Dependencies**:

- FR-002-01, FR-002-02, FR-002-03 (AI Refinement requirements).
- [API Contract](../03-architecture/api/api-contract.md).
- [Design Direction](../05-prototype/design-direction.md).
- [Sequence Diagrams](../03-architecture/sequence-diagrams.md).

**Success Metrics**:

- AI processing latency is masked with smooth loading indicator.
- Draft preview rendering is stable and readable for generated output.

---

### US-MVP-FE-004A: Draft Approval and State Transition UI

**Epic**: AI Refinement and Approval Control
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** implement approve/reject controls and draft-to-approved transitions,
**So that** Admin users can control what becomes official backlog content.

**Acceptance Criteria**:

- [ ] Given draft stories are visible, when Admin clicks approve on a draft, then status changes and UI confirms success.
- [ ] Given Admin rejects a draft, when action is confirmed, then the draft moves to the rejected section and is excluded from approved backlog views.
- [ ] Given a status transition request fails, when the response returns, then the UI restores prior state and shows actionable error feedback.
- [ ] Given a non-Admin role opens the same view, when actions are rendered, then approve/reject controls are hidden.

**Deliverables**:

- Approve/reject action controls bound to backend approval endpoints.
- Transition feedback patterns (loading, success, failure, rollback).
- Draft and approved section state synchronization without full-page refresh.

**Dependencies**:

- FR-002-03, FR-003-01, FR-003-03 (Approval gate and role visibility requirements).
- [API Contract](../03-architecture/api/api-contract.md).
- [Design Direction](../05-prototype/design-direction.md).
- [Sequence Diagrams](../03-architecture/sequence-diagrams.md).

**Success Metrics**:

- Approve/reject actions persist without page reload.
- Draft state changes are reflected in UI within one interaction cycle.

---

### US-MVP-FE-005: Backlog View and Story Display

**Epic**: Backlog and Export Deliverable
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** implement a backlog view that displays approved stories in a structured, searchable list,
**So that** Admin and Viewer users can review all approved requirements for a project.

**Acceptance Criteria**:

- [ ] Given a project is opened, when backlog tab is clicked, then approved stories are displayed in a readable format.
- [ ] Given multiple stories exist, when search input is used, then stories are filtered by title and acceptance criteria text.
- [ ] Given a story is clicked, when it expands, then full acceptance criteria and metadata are displayed.
- [ ] Given a Viewer role opens backlog, when page loads, then draft stories are hidden.

**Deliverables**:

- Backlog list component with story cards.
- Search and filter UI.
- Story expansion/detail view.
- Role-based visibility (draft filtering for Viewer).

**Dependencies**:

- FR-004-01, FR-004-02 (Backlog and Export requirements).
- [API Contract](../03-architecture/api/api-contract.md).
- [Design Direction](../05-prototype/design-direction.md).
- [Sequence Diagrams](../03-architecture/sequence-diagrams.md).

**Success Metrics**:

- Backlog loads within 1 second for 200+ stories.
- Search filters results in real-time without page reload.

---

### US-MVP-FE-006: Markdown Export Action and Download

**Epic**: Backlog and Export Deliverable
**Priority**: Must Have
**Effort Estimate**: 3

**As a** Frontend Engineer,
**I want to** implement an export button that triggers Markdown generation and downloads the file,
**So that** Admin can share the backlog as a deliverable with stakeholders.

**Acceptance Criteria**:

- [ ] Given an approved backlog exists, when Export to Markdown button is clicked, then download dialog appears.
- [ ] Given export is requested, when the file is downloaded, then the filename includes project name and timestamp.
- [ ] Given Viewer role attempts export, then the button is hidden or disabled.

**Deliverables**:

- Export button with loading state.
- Client-side download handling for generated Markdown file.
- Role-based button visibility.

**Dependencies**:

- FR-004-01, FR-004-02 (Backlog and Export requirements).
- [API Contract](../03-architecture/api/api-contract.md).

**Success Metrics**:

- Export button triggers download without page navigation.
- Downloaded file is valid Markdown.

---

## Phase 1 Frontend Stories

### US-P1-FE-007: Public Landing Page and Login CTA

**Epic**: Entry-Flow Quality Uplift
**Priority**: Should Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** implement a public landing page with product value proposition and clear login / account creation CTAs,
**So that** first-time visitors understand the product and can easily navigate to authentication.

**Acceptance Criteria**:

- [ ] Given an unauthenticated user visits the app, when the landing page loads, then hero section, value props, and CTAs are displayed.
- [ ] Given login CTA is clicked, when the user navigates, then login form is shown.
- [ ] Given "Create Account" CTA is clicked, when the user navigates, then account creation form is shown.

**Deliverables**:

- Landing page with hero section, features overview, and CTAs.
- Navigation to login and account creation flows.

**Dependencies**:

- FR-006-01, FR-006-02, FR-006-03 (Landing Page requirements).
- [Design Direction](../05-prototype/design-direction.md).

**Success Metrics**:

- Landing page renders within 2 seconds.
- CTAs are mobile-responsive and easily clickable.

---

### US-P1-FE-008: Account Registration Form and Email Verification

**Epic**: Entry-Flow Quality Uplift
**Priority**: Should Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** implement an account registration form with email and password input, verification email flow, and success messaging,
**So that** new Admin users can self-register and complete email verification before first login.

**Acceptance Criteria**:

- [ ] Given registration form is opened, when email and password are entered, then validation is performed (email format, password strength).
- [ ] Given valid inputs, when signup is submitted, then success message is shown with email verification instructions.
- [ ] Given Admin receives verification email, when link is clicked, then account is activated and redirect to login occurs.

**Deliverables**:

- Registration form with email and password fields.
- Password strength indicator.
- Verification email flow with link handling.
- Success confirmation page.

**Dependencies**:

- FR-008-01, FR-008-02, FR-008-03 (Account Creation requirements).
- [API Contract](../03-architecture/api/api-contract.md).
- [Design Direction](../05-prototype/design-direction.md).

**Success Metrics**:

- Registration form validates inputs in real-time.
- Verification link in email correctly redirects to activation page.

---

### US-P1-FE-009: Viewer Access Experience

**Epic**: Access Boundary and Stakeholder Visibility
**Priority**: Should Have
**Effort Estimate**: 3

**As a** Frontend Engineer,
**I want to** implement a read-only Viewer interface that hides edit controls and displays only approved content,
**So that** Viewer users can review backlog without risking accidental changes or seeing internal notes.

**Acceptance Criteria**:

- [ ] Given a Viewer logs in, when they access project backlog, then all edit, create, and delete buttons are hidden.
- [ ] Given Viewer attempts access to refinement or admin features, then those sections are not shown in the navigation.
- [ ] Given internal notes exist, when backlog is displayed to Viewer, then notes are not visible.

**Deliverables**:

- Role-based UI hiding for Viewer (conditional rendering).
- Read-only backlog view stripped of admin controls.
- Navigation guards preventing Viewer access to admin-only pages.

**Dependencies**:

- FR-003-01, FR-003-02, FR-003-03 (Access Control requirements).
- [Role Mapping](../02-planning/role-mapping.md).
- [Security Architecture](../03-architecture/security/security-architecture.md).

**Success Metrics**:

- Viewer cannot access any write operations through UI.
- All internal content is hidden from Viewer view.

---

## Reference

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [API Contract](../03-architecture/api/api-contract.md)
- [Design Direction](../05-prototype/design-direction.md)
- [Product Epics](./epics.md)

## Change Log

| Date       | Version | Change Summary                                                                    | Author        |
| ---------- | ------- | --------------------------------------------------------------------------------- | ------------- |
| 2026-03-23 | 1.1     | Added Epic 0 foundational setup stories (React app, testing, environment config). | Product Owner |
| 2026-03-23 | 1.0     | Initial frontend story set                                                        | Product Owner |

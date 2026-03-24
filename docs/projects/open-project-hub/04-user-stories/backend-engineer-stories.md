# Backend Engineer User Stories

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Role**         | Backend Engineer            |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [Database Design](../06-database/database-design.md)
- [Product Epics](./epics.md)

## Objective

Establish backend foundation for authentication, project lifecycle, AI refinement, access control, and export—forming the core MVP value and security boundaries.


## MVP Backend Stories

---

## MoSCoW Prioritization Summary

| Priority | Story ID        | Theme                                     | Sequence     |
| -------- | --------------- | ----------------------------------------- | ------------ |
| Must     | US-EP0-BE-001   | Monorepo structure and backend scaffolding | Foundation   |
| Must     | US-EP0-BE-002   | Database schema and migrations            | Foundation   |
| Must     | US-EP0-BE-003   | CI/CD pipeline and testing framework      | Foundation   |
| Must     | US-EP0-BE-004   | API documentation foundation              | Foundation   |
| Must     | US-MVP-BE-001   | Secure authentication service             | Auth         |
| Must     | US-MVP-BE-002   | Password reset and recovery                | Auth         |
| Must     | US-MVP-BE-003   | Client and project lifecycle               | Core MVP     |
| Must     | US-MVP-BE-004   | AI refinement and draft intake             | Core MVP     |
| Must     | US-MVP-BE-005   | Access control enforcement                 | Core MVP     |
| Must     | US-MVP-BE-006   | Backlog retrieval and markdown export      | Core MVP     |
| Should   | US-P1-BE-007    | Onboarding progress tracker                | Phase 1      |
| Should   | US-P1-BE-008    | Account creation and verification          | Phase 1      |

## Epic 0: Foundational Infrastructure and Setup

### US-EP0-BE-001: Monorepo Structure and Backend Scaffolding

**Epic**: Project and Local Development Setup (Foundational)
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Backend Engineer,
**I want to** establish monorepo folder structure with backend services, shared libraries, and configuration patterns,
**So that** all team members can develop and test code with consistent project organization.

**Acceptance Criteria**:

- [ ] Given the monorepo is cloned, then folder structure includes backend/, shared/, config/, and tests/ directories.
- [ ] Given a backend service is added, then it follows consistent package structure (models/, services/, handlers/, tests/).
- [ ] Given a developer runs setup script, then all dependencies are installed and project is ready for local development.
- [ ] Given a developer adds a new module, then import paths use consistent absolute or relative patterns.

**Deliverables**:

- Monorepo root with frontend/, backend/, shared/ directories.
- Backend service template with boilerplate models, services, and handlers.
- Setup script (setup.sh or equivalent) for fast local environment configuration.
- Configuration management foundation (.env, settings module) for dev/test/staging/prod.
- README with folder structure documentation.

**Dependencies**:

- [Architecture Solution Design](../03-architecture/architecture-solution-design.md).
- [Technology Stack](../03-architecture/technology-stack.md).

**Success Metrics**:

- First-time setup completes in under 15 minutes.
- Monorepo structure is documented and consistent.
- All imports follow agreed pattern (no mixed relative/absolute paths).

---

### US-EP0-BE-002: Database Schema, Migrations, and Seed Data

**Epic**: Project and Local Development Setup (Foundational)
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Backend Engineer,
**I want to** implement database schema with migration tooling and seed data generation,
**So that** developers can initialize a local database in one command with realistic test data.

**Acceptance Criteria**:

- [ ] Given a developer runs a setup command, when the script executes, then database schema is created with all required tables.
- [ ] Given schema changes are made, when migration is versioned and applied, then backward compatibility is checked (if applicable).
- [ ] Given a developer needs test data, when seed script is run, then realistic sample clients, projects, and stories are populated.
- [ ] Given database is re-initialized, when migration is rolled back and re-applied, then idempotency is verified.

**Deliverables**:

- Database schema SQL or ORM migration definitions (based on [Database Design](../06-database/database-design.md)).
- Migration tooling configuration (Alembic, Flyway, or equivalent).
- Seed data script with realistic MVP test fixtures.
- Migration documentation and rollback procedures.
- CI/CD integration for schema validation before merge.

**Dependencies**:

- [Database Design](../06-database/database-design.md).
- [ADR-007: ORM Choice](../03-architecture/adrs/adr-007-orm-choice.md).

**Success Metrics**:

- Database initialization is repeatable and idempotent.
- Seed data includes realistic scenarios (3 clients, multiple projects, various story statuses).
- Migration rollback is tested and documented.

---

### US-EP0-BE-003: CI/CD Pipeline Scaffolding and Testing Framework

**Epic**: Project and Local Development Setup (Foundational)
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Backend Engineer,
**I want to** set up automated testing framework, linting, and CI/CD pipeline that runs on every commit,
**So that** code quality is enforced and integration issues are caught early.

**Acceptance Criteria**:

- [ ] Given code is committed and pushed, when CI pipeline runs, then unit tests are executed and results are reported.
- [ ] Given test coverage falls below 70%, when CI runs, then build fails with coverage report.
- [ ] Given code style violations exist, when linting is run, then issues are reported and block merge.
- [ ] Given dependencies have known vulnerabilities, when security scan runs, then alerts are triggered.
- [ ] Given all checks pass, when merge approval is granted, then green status is shown on PR.

**Deliverables**:

- Unit testing framework setup (pytest or equivalent) with configuration.
- Linting and code formatting tools (black, flake8, or equivalent) integrated into CI.
- Code coverage measurement and reporting (pytest-cov or equivalent).
- Security dependency scanning (bandit, safety, or equivalent).
- GitHub Actions or equivalent CI/CD configuration (.github/workflows).
- Documented test running and coverage checking procedures.

**Dependencies**:

- [Technology Stack](../03-architecture/technology-stack.md).
- [ADR-009: Testing Framework](../03-architecture/adrs/adr-009-testing-framework.md).

**Success Metrics**:

- CI pipeline runs in under 5 minutes.
- Test coverage baseline established and enforced (70%+).
- Linting, security, and coverage checks block non-conforming PRs.

---

### US-EP0-BE-004: API Documentation Foundation and Contract Definition

**Epic**: Project and Local Development Setup (Foundational)
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** establish API documentation structure (OpenAPI/Swagger) and baseline endpoint contracts,
**So that** frontend engineers and external stakeholders can reference a single source of truth for API behavior.

**Acceptance Criteria**:

- [ ] Given API is documented, when I review the documentation, then all MVP endpoints are listed with method, path, and expected responses.
- [ ] Given API changes, when documentation is updated, then changes are reflected automatically (generated from code annotations).
- [ ] Given a developer uses the API, when they access documentation, then request/response examples are clear and executable.

**Deliverables**:

- OpenAPI/Swagger specification file (openapi.yml or json).
- API documentation generation setup (Swagger UI, ReDoc, or equivalent).
- Baseline endpoint contracts linking to [API Contract](../03-architecture/api/api-contract.md).
- Documentation generation in CI/CD pipeline.
- README section on accessing and updating API documentation.

**Dependencies**:

- [API Contract](../03-architecture/api/api-contract.md).
- [Technology Stack](../03-architecture/technology-stack.md).

**Success Metrics**:

- API documentation is auto-generated from code and available in CI artifacts.
- All MVP endpoints are documented with examples.

### US-MVP-BE-001: Secure Admin Authentication Service

**Epic**: Admin Authentication and Recovery Baseline
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Backend Engineer,
**I want to** implement a secure email/password authentication service with password hashing and session token generation,
**So that** Admin users can log in safely and the system enforces authenticated context for all protected endpoints.

**Acceptance Criteria**:

- [ ] Given valid email and password, when login is requested, then a session token is issued and stored securely.
- [ ] Given invalid credentials, when login is attempted, then a generic error is returned without revealing account existence.
- [ ] Given a valid session token, when an API request includes it, then the token is validated and the request proceeds to authorized handlers.
- [ ] Given a session token, when the token expires (24 hours default), then subsequent requests return 401 and require re-authentication.
- [ ] Passwords are stored using bcrypt with a minimum cost factor of 12.

**Deliverables**:

- Auth service module with login, token validation, and logout endpoints.
- Session table in database with token, expiry, and user association.
- Password hashing utility with bcrypt integration.
- Rate limiting on login attempts (max 5 attempts per IP per 15 minutes).

**Dependencies**:

- FR-007-01, FR-009-01 (Admin Login, Password Reset entry points).
- [Technology Stack](../03-architecture/technology-stack.md).
- [ADR-005: Authentication](../03-architecture/adrs/adr-005-authentication.md).

**Success Metrics**:

- Login response time under 500ms.
- Session token generation and validation logic covered by unit tests.

---

### US-MVP-BE-002: Password Reset and Recovery Flow

**Epic**: Admin Authentication and Recovery Baseline
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** implement a password reset flow using secure email tokens with expiry,
**So that** Admin users can recover account access safely without bypass vulnerabilities.

**Acceptance Criteria**:

- [ ] Given a valid email, when reset is requested, then a secure reset token is generated and emailed (token valid for 1 hour).
- [ ] Given a valid reset token and new password, when reset is completed, then password is updated and old sessions are invalidated.
- [ ] Given an invalid or expired token, when reset is attempted, then a generic error is returned.
- [ ] Reset tokens are single-use; a second attempt with the same token fails.

**Deliverables**:

- Reset token service with generation, validation, and single-use tracking.
- Email service integration for sending reset tokens.
- Reset endpoint with token validation and password update.

**Dependencies**:

- FR-009-02, FR-009-03 (Password Reset requirements).
- [Technology Stack](../03-architecture/technology-stack.md).
- [ADR-005: Authentication](../03-architecture/adrs/adr-005-authentication.md).

**Success Metrics**:

- Reset token delivery and validation covered by tests.
- Email delivery confirmed in staging environment.

---

### US-MVP-BE-003: Client and Project Lifecycle Model

**Epic**: Client and Project Lifecycle Governance
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Backend Engineer,
**I want to** implement client and project CRUD operations with lifecycle constraints (discovery/planning only, active-project limit of 3),
**So that** Admin users maintain a structured workspace without uncontrolled project sprawl.

**Acceptance Criteria**:

- [ ] Given Admin credentials, when a client is created with name and optional metadata, then the client record is stored and associated to the Admin account.
- [ ] Given a client exists, when a project is created with name, phase (discovery or planning), and client association, then the project is stored.
- [ ] Given an Admin has 3 active projects, when a 4th project creation is attempted, then the request is rejected with a clear error message.
- [ ] Given a project exists, when it is marked archived, then it is excluded from active-project count and read-only UI views.
- [ ] Given a project, when an Admin attempts to set phase to a non-supported value, then validation fails with clear feedback.

**Deliverables**:

- Client entity with CRUD operations (create, read, update, soft delete).
- Project entity with phase validation (discovery, planning only).
- Active-project enforcer service that checks limit before project creation/reactivation.
- Database fields: clients(id, admin_id, name, created_at, archived_at); projects(id, client_id, admin_id, name, phase, created_at, archived_at).

**Dependencies**:

- FR-001-01, FR-001-02, FR-001-03 (Client and Project lifecycle requirements).
- [Database Design](../06-database/database-design.md).
- [API Contract](../03-architecture/api/api-contract.md).

**Success Metrics**:

- CRUD endpoints covered by integration tests.
- Active-project limit enforcer passes edge-case tests (exactly 3, archive-unarchive flow).

---

### US-MVP-BE-004: AI-Generated Draft Story Intake and Storage

**Epic**: AI Refinement and Approval Control
**Priority**: Must Have
**Effort Estimate**: 8

**As a** Backend Engineer,
**I want to** implement an endpoint that accepts raw notes, calls an AI service to generate draft user stories, and stores drafts in unapproved state,
**So that** Admin users can review and approve AI outputs before they become official backlog items.

**Acceptance Criteria**:

- [ ] Given raw notes and a project ID, when the refinement endpoint is called, then the notes are submitted to the AI service.
- [ ] Given AI returns structured draft stories, then each draft is stored with status=draft, linked to the project, and marked with a timestamp.
- [ ] Given draft stories are created, when backlog or export queries are run, then drafts are excluded unless explicitly filtered for draft status.
- [ ] Given a draft exists, when Admin requests approval, then the draft status changes to approved.
- [ ] Given a draft is rejected, then it remains in the project but marked as rejected (not deleted).

**Deliverables**:

- Refinement endpoint: POST /projects/{id}/refinements.
- AI service integration module (adapter pattern to allow future model swaps).
- Draft story entity with status field (draft, approved, rejected).
- Database: refinement_drafts(id, project_id, status, ai_generated_content, admin_notes, created_at, approved_at).

**Dependencies**:

- FR-002-01, FR-002-02, FR-002-03 (AI Refinement requirements).
- [Technology Stack](../03-architecture/technology-stack.md).
- [API Contract](../03-architecture/api/api-contract.md).

**Success Metrics**:

- Refinement endpoint returns drafts within 3 seconds (includes AI call latency).
- Draft filtering logic tested and verified in backlog queries.

---

### US-MVP-BE-005: Access Control Enforcement (Admin/Viewer Boundaries)

**Epic**: Access Boundary and Stakeholder Visibility
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** implement role-based access control middleware and repository filters that enforce Admin/Viewer read/write boundaries,
**So that** Viewer users can only access approved content and Admin users retain full control.

**Acceptance Criteria**:

- [ ] Given a Viewer token, when they request project data, then only approved stories and project metadata are returned.
- [ ] Given a Viewer token, when they attempt a write operation, then the request is rejected with 403 Forbidden.
- [ ] Given draft stories exist, when a Viewer requests backlog data, then drafts are excluded from the response.
- [ ] Given internal notes exist on a project, when a Viewer requests project details, then notes are excluded from the response.
- [ ] Given an Admin token, when they request the same data, then full access (including drafts and notes) is granted.

**Deliverables**:

- Role-based access middleware that validates user role and enforces read/write guards.
- Repository filters for backlog, project, and story queries that exclude Viewer-restricted content.
- Access control rules documented in [Security Architecture](../03-architecture/security-architecture.md).

**Dependencies**:

- FR-003-01, FR-003-02, FR-003-03 (Access Control requirements).
- [Role Mapping](../02-planning/role-mapping.md).
- [API Contract](../03-architecture/api/api-contract.md).

**Success Metrics**:

- Access control tests verify Admin/Viewer boundaries across all endpoints.
- No data leakage to Viewer users confirmed in code review.

---

### US-MVP-BE-006: Backlog Retrieval and Markdown Export

**Epic**: Backlog and Export Deliverable
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** implement a backlog query endpoint and a Markdown export generator that formats approved stories,
**So that** Admin users can view the structured backlog and export it as a deliverable without including drafts or internal notes.

**Acceptance Criteria**:

- [ ] Given a project ID, when backlog is queried, then approved stories are returned in standard format (role, action, benefit, acceptance criteria).
- [ ] Given an approved backlog, when export to Markdown is requested, then a .md file is generated with clean formatting and stakeholder-readable structure.
- [ ] Given a backlog with 200+ stories, when export is generated, then the operation completes within 2 seconds.
- [ ] Given internal notes exist, when backlog or export is reviewed, then notes are never included.

**Deliverables**:

- GET /projects/{id}/backlog endpoint returning approved stories.
- POST /projects/{id}/export endpoint generating Markdown file (returned as downloadable or streamable).
- Markdown template with consistent formatting for stories, acceptance criteria, and metadata.

**Dependencies**:

- FR-004-01, FR-004-02 (Backlog and Export requirements).
- [API Contract](../03-architecture/api/api-contract.md).
- [Database Design](../06-database/database-design.md).

**Success Metrics**:

- Backlog query response time under 1 second for typical projects.
- Export Markdown is valid and passes parsing tests.
- Verified with Viewer access that drafts and notes are excluded.

---

## Phase 1 Backend Stories

### US-P1-BE-007: Admin Onboarding Guidance Service

**Epic**: Entry-Flow Quality Uplift
**Priority**: Should Have
**Effort Estimate**: 3

**As a** Backend Engineer,
**I want to** implement an onboarding-progress tracker that records which guidance steps an Admin has viewed,
**So that** the UI can avoid showing repeat guidance after first use.

**Acceptance Criteria**:

- [ ] Given a first-time Admin, when they request onboarding config, then guidance steps are returned with a "viewed" flag.
- [ ] Given an Admin marks guidance as viewed, when they return to the project, then previously viewed steps are skipped.

**Deliverables**:

- Onboarding state table and API endpoint for tracking viewed guidance.

**Dependencies**:

- FR-005-01, FR-005-02 (Minimal Onboarding requirements).

---

### US-P1-BE-008: Account Creation and Email Verification

**Epic**: Entry-Flow Quality Uplift
**Priority**: Should Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** implement account registration with email verification before activation,
**So that** new Admin users complete a verified signup flow before first login.

**Acceptance Criteria**:

- [ ] Given a registration request with email and password, then a verification token is generated and emailed.
- [ ] Given a valid verification token, when confirmed, then the account is activated and ready for login.

**Deliverables**:

- Registration endpoint with email uniqueness check.
- Email verification service with token expiry (24 hours).
- Account activation workflow.

**Dependencies**:

- FR-008-01, FR-008-02, FR-008-03 (Account Creation requirements).

---

## Reference

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Database Design](../06-database/database-design.md)
- [Product Epics](./epics.md)

## Change Log

| Date       | Version | Change Summary              | Author        |
| ---------- | ------- | --------------------------- | ------------- |
| 2026-03-23 | 1.1     | Added Epic 0 foundational infrastructure stories (monorepo, DB, CI/CD, API docs). | Product Owner |
| 2026-03-23 | 1.0     | Initial backend story set.  | Product Owner |

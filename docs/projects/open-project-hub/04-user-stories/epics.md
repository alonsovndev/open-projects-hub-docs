# Product Epics

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [Database Design](../06-database/database-design.md)

## Epic Planning Principles

- Keep MVP epics aligned to validated Must-have features only.
- Map every epic to current `F-*`, `FR-*`, and `NFR-*` identifiers.
- Separate MVP planning value from Phase 1 entry-flow and usability improvements.
- Do not mix discovery-and-planning scope with delivery or handoff workflows.

## Epic 0: Project and Local Development Setup (Foundational)

**Problem Statement:** Delivery teams cannot begin engineering work until the development environment, CI/CD, database schema, seed data, and deployment foundations are configured.

**Objective:** Establish the foundational project structure, local environment setup, and deployment baseline so all engineering teams can work in parallel on MVP features downstream.

Included scope:

- Monorepo structure and folder organization for backend, frontend, and shared layers
- Local development environment setup (Python, Node.js, Docker, database)
- CI/CD pipeline scaffolding and basic testing framework integration
- Database schema creation and seed data generation
- Deployment platform setup (staging and production readiness)
- API contract and documentation foundation

Excluded scope:

- Feature-specific implementation beyond structure and scaffolding
- Team onboarding and documentation beyond setup-critical items
- Advanced deployment automation or multi-region strategies

Related feature and requirement IDs: Foundational (no direct feature mapping; supports all features F-001 through F-009)

Dependencies:

- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [Technology Stack](../03-architecture/technology-stack.md)
- [Database Design](../06-database/database-design.md)

Measurable success criteria:

- Every engineer can clone the repo and run local dev environment in under 15 minutes.
- CI/CD pipeline runs on every commit and reports clear pass/fail status.
- Database schema is created and seed data is populated automatically in local dev.
- Deployment to staging is repeatable and documented.

Acceptance criteria:

- Given an engineer clones the repository, when they follow the README setup steps, then all local services start without manual configuration.
- Given CI/CD is configured, when a commit is pushed, then tests run automatically and report results clearly.
- Given database schema is needed, when the local environment starts, then schema migrations and seed data are applied automatically.

---

## Cross-Role Story Sequencing and Dependency Rationale

The user stories for UI/UX Designers, Frontend Engineers, and Backend Engineers follow a unified dependency chain to ensure parallel delivery without blockers:

### Sequencing Principles

1. **Auth First**: Admin login and password-recovery workflows gate all downstream planning features. UX prototypes must validate secure entry before FE builds UI. BE must define auth service behavior before other services depend on authenticated context.

2. **Workspace Second**: Project and client lifecycle management enables Admin users to establish context before attempting any planning workflow. This includes lifecycle constraints, active-project limits, and archive behavior.

3. **Core Workflow Third**: AI refinement and approval represents the central value workflow. UX validates user expectations, FE defines interaction patterns, BE implements draft-to-approved state machinery.

4. **Access Boundaries Fourth**: Admin and Viewer visibility enforce the boundaries that make the product safe for stakeholder sharing. UX validates readability, FE implements role-based UI controls, BE enforces access rules and export filters.

5. **Phase 1 Last**: Entry-flow quality improvements (onboarding, landing, account creation, registration) follow after MVP core workflows are stable and validated in production.

### Story Cross-Mapping

| Theme                        | Backend Story     | Frontend Story   | UX Story        |
| ---------------------------- | ----------------- | ---------------- | --------------- |
| Auth and Recovery            | US-MVP-BE-001     | US-MVP-FE-001    | US-MVP-UX-001   |
| Project and Lifecycle        | US-MVP-BE-002     | US-MVP-FE-002    | US-MVP-UX-002   |
| AI Refinement and Approval   | US-MVP-BE-003     | US-MVP-FE-003    | US-MVP-UX-003   |
| Access Boundaries and Export | US-MVP-BE-004/005 | US-MVP-FE-004    | US-MVP-UX-004   |
| Entry Flow (Phase 1)         | US-P1-BE-006/007  | US-P1-FE-005/006 | US-P1-UX-005/06 |

### Dependency Notes for Delivery Teams

- **UX Prototypes** should complete before corresponding FE and BE stories enter detailed planning to reduce rework and misalignment.
- **Auth workflow** (UX-001, FE-001, BE-001) must complete before project workspace or planning workflow stories begin detailed implementation.
- **Project lifecycle** stories depend on auth being available but can be scheduled in parallel with AI refinement planning if design is clear.
- **Access control** stories depend on both project lifecycle and AI refinement being scoped; can begin architecture planning after auth baseline is clear.
- **Phase 1 stories** should not begin until MVP core workflows are in production and stable; prioritize based on real user feedback and adoption patterns.

---

## MVP Epics

### Epic 1: Client and Project Lifecycle Governance

**Problem Statement:** Freelancers need a reliable way to manage clients and projects without allowing the workspace to drift into unsupported lifecycle states or uncontrolled project sprawl.

**Objective:** Provide a stable planning workspace where Admin users can manage clients and projects under explicit MVP lifecycle and active-project constraints.

Included scope:

- Client record management and project-to-client association
- Project creation, update, archive, and active-project enforcement
- Discovery and planning as the only allowed MVP phases

Excluded scope:

- Delivery, handoff, and implementation tracking workflows
- Multi-admin team structures and collaborator invitations
- CRM, billing, or portfolio management expansion

Related feature and requirement IDs: F-001; FR-001-01, FR-001-02, FR-001-03; NFR-001-01, NFR-001-02, NFR-001-03

Dependencies:

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/f-001-client-and-project-lifecycle-management.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Database Design](../06-database/database-design.md)

Measurable success criteria:

- Admin can create, update, and archive client and project records within one planning workspace.
- Fourth active project creation is blocked consistently across documented flows.
- No MVP artifact introduces a project phase beyond discovery or planning.

Acceptance criteria:

- Given an Admin manages project records, when they create or edit a project, then the project must stay associated to a client and use only discovery or planning.
- Given an Admin already has three active projects, when they attempt to create or reactivate another project, then the flow blocks the action and guides archival first.
- Given a project is archived, when active-project limits are evaluated, then that project no longer counts toward the active limit.

---

### Epic 2: AI Refinement and Approval Control

**Problem Statement:** Freelancers lose time and introduce inconsistency when they manually rewrite ambiguous client notes into structured backlog items.

**Objective:** Create a controlled refinement workflow that converts raw notes into editable draft stories and requires explicit Admin approval before publication.

Included scope:

- Raw note and bullet-list intake
- AI-generated draft stories in standard user story format
- Admin edit and approval gate before official backlog inclusion

Excluded scope:

- File uploads and multimodal AI ingestion
- Auto-publishing without human review
- Test-case generation, estimation, and delivery planning automation

Related feature and requirement IDs: F-002; FR-002-01, FR-002-02, FR-002-03; NFR-002-01, NFR-002-02, NFR-002-03

Dependencies:

- [Feature Requirements](../01-requirements/f-002-ai-refinement-and-approval-workflow.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [API Contract](../03-architecture/api-contract.md)

Measurable success criteria:

- Admin can submit raw notes without extra formatting steps.
- AI output returns structured draft stories with acceptance-criteria-ready content.
- Draft content remains unofficial until explicit Admin approval is completed.

Acceptance criteria:

- Given an Admin starts refinement, when they submit plain text or bullet lists, then the flow accepts the input without attachments.
- Given AI returns draft stories, when the Admin reviews them, then each story follows the standard user story structure and remains editable.
- Given draft stories are not yet approved, when backlog or export outputs are reviewed, then draft stories are excluded from official artifacts.

---

### Epic 3: Access Boundary and Stakeholder Visibility

**Problem Statement:** Client-facing transparency is useful only if it does not expose internal notes or allow viewers to alter planning artifacts.

**Objective:** Enforce simple Admin and Viewer boundaries so the MVP supports safe collaboration without expanding into full multi-user workflow management.

Included scope:

- Admin full-access and Viewer read-only boundaries
- Viewer access to approved requirements and current project phase
- Internal-note isolation from Viewer views

Excluded scope:

- Extra roles, collaborator invitations, and Viewer comments
- Shared editing and real-time collaboration
- Audit-log or workflow history surfaces for end users

Related feature and requirement IDs: F-003; FR-003-01, FR-003-02, FR-003-03; NFR-003-01, NFR-003-02, NFR-003-03

Dependencies:

- [Feature Requirements](../01-requirements/f-003-access-control-and-visibility-boundaries.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Security Architecture](../03-architecture/security-architecture.md)

Measurable success criteria:

- Viewer access is limited to approved requirements and project phase visibility.
- No documented flow allows Viewer create, edit, comment, or delete actions.
- Internal notes are excluded from Viewer-facing views and exports.

Acceptance criteria:

- Given a Viewer opens a project, when they review requirements, then the information is structured, readable, and read-only.
- Given a Viewer attempts a write action, when they access project content, then edit and approval controls are absent or denied.
- Given internal notes exist, when a Viewer-facing output is reviewed, then those notes are excluded.

---

### Epic 4: Backlog and Export Deliverable

**Problem Statement:** Planning work loses value if freelancers cannot share a clean, structured artifact with stakeholders after approval.

**Objective:** Make the approved backlog visible inside the product and exportable to Markdown as the official MVP deliverable.

Included scope:

- Structured approved backlog view
- Markdown export for approved requirements only
- Stakeholder-readable formatting aligned to the standard story template

Excluded scope:

- PDF, DOCX, CSV, and tool-specific integrations
- Export of draft stories or internal-only planning notes
- Advanced reporting, analytics, or packaged delivery documentation

Related feature and requirement IDs: F-004; FR-004-01, FR-004-02; NFR-004-01, NFR-004-02

Dependencies:

- [Feature Requirements](../01-requirements/f-004-requirements-backlog-and-markdown-export.md)
- [Architecture Solution Design](../03-architecture/architecture-solution-design.md)
- [API Contract](../03-architecture/api-contract.md)
- [Database Design](../06-database/database-design.md)

Measurable success criteria:

- Every MVP project can present approved requirements in a structured backlog view.
- Admin can request Markdown export without including draft or internal-only content.
- Backlog and export outputs remain readable under MVP data limits.

Acceptance criteria:

- Given approved requirements exist, when backlog view is opened, then stories and acceptance criteria are shown in a readable structure.
- Given an Admin requests export, when Markdown output is generated, then only approved requirements are included.
- Given stakeholders review the deliverable, when they read the output, then the standard user story format is preserved.

---

### Epic 5: Admin Authentication and Recovery Baseline

**Problem Statement:** The planning workspace cannot be trusted unless Admin entry and recovery flows are secure, predictable, and aligned to the same scope boundaries as the rest of the MVP.

**Objective:** Define the MVP authentication baseline so Admin users can log in securely, recover access safely, and enter the project workspace without ambiguity.

Included scope:

- Email and password Admin login
- Safe validation and authentication feedback
- Secure password reset request and reset completion flow

Excluded scope:

- Social login, MFA, and advanced identity federation
- Team invitation and delegated account administration
- Account profile management beyond secure entry and recovery

Related feature and requirement IDs: F-007, F-009; FR-007-01, FR-007-02, FR-007-03, FR-009-01, FR-009-02, FR-009-03; NFR-007-01, NFR-007-02, NFR-009-01, NFR-009-02, NFR-X01

Dependencies:

- [Feature Requirements](../01-requirements/f-007-admin-login.md)
- [Feature Requirements](../01-requirements/f-009-reset-password.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Security Architecture](../03-architecture/security-architecture.md)

Measurable success criteria:

- Admin users can authenticate and recover access through documented secure flows.
- Auth errors do not reveal sensitive account state.
- Successful auth entry lands users in the correct planning workspace.

Acceptance criteria:

- Given an Admin submits valid credentials, when login completes, then they reach the primary workspace.
- Given invalid credentials or missing fields, when login is attempted, then feedback is clear and non-sensitive.
- Given an Admin requests password reset, when the flow is completed with a valid token, then access can be restored through a secure reset path.

---

## Phase 1 Epic

### Epic 6: Entry-Flow Quality Uplift

**Problem Statement:** The MVP can be functional without polished first-use flows, but account creation, onboarding, and landing clarity are needed to reduce friction after the core planning workflow is stable.

**Objective:** Improve first-use quality through better onboarding, clearer public entry messaging, and a smoother account-creation path.

Included scope:

- Minimal onboarding guidance for first-time Admin users
- Landing page value proposition and CTA clarity
- Account-creation flow and next-step routing

Excluded scope:

- Full guided tours, marketing content systems, and campaign pages
- Paid plan, subscription, or commercial conversion workflows
- Team onboarding and collaborator provisioning

Related feature and requirement IDs: F-005, F-006, F-008; FR-005-01, FR-006-01, FR-006-02, FR-006-03, FR-008-01, FR-008-02, FR-008-03; NFR-005-01, NFR-005-02, NFR-006-01, NFR-006-02, NFR-008-01, NFR-008-02

Dependencies:

- [Feature Requirements](../01-requirements/f-005-minimal-onboarding.md)
- [Feature Requirements](../01-requirements/f-006-landing-page.md)
- [Feature Requirements](../01-requirements/f-008-create-account.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)

Measurable success criteria:

- First-time users can identify the next valid action after landing, registration, and first login.
- Account creation and onboarding flows use accessible, plain-language guidance.
- Phase 1 improvements do not expand MVP scope into team or commercial features.

Acceptance criteria:

- Given a visitor lands on the public entry page, when they scan the hero and CTA area, then login and account creation paths are immediately clear.
- Given a new Admin completes registration, when the flow ends, then the next step routes clearly to login or onboarding.
- Given a first-time Admin enters the core workflow, when onboarding guidance is shown, then it explains the refinement path without becoming a blocker to task completion.

## Notes for Story Decomposition

- Keep stories role-specific and feature-traceable.
- Do not place Phase 1 entry-flow enhancements into MVP Must-have delivery stories.
- Prefer one story per role per feature cluster unless a cross-cutting quality concern needs its own story.

## Change Log

- 2026-03-23 (v1.1): Refactored epics to feature-based requirements and current roadmap scope. Author: Product Owner.
- 2026-03-10 (v1.0): Initial epic draft. Author: Product Owner.

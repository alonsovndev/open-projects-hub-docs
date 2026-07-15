# Role Mapping

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## How to Use (AI Agent Instructions)

- Use RACI convention consistently: **Owner** (accountable), **Primary** (responsible), **Support** (consulted), **Informed** (notified).
- Map each planning workstream to feature IDs from `readme.md` in `01-requirements`.
- Keep phase ownership aligned with the phased roadmap and update when new epics are added.
- Ensure Must-priority requirements are assigned to a named DRI before active planning starts.

## Sources

- [Project Overview](../overview.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](./phased-roadmap.md)

---

## Role Definitions

| Role              | Primary Planning Focus                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| Tech Lead         | Scope governance, requirement traceability, quality-gate ownership, cross-role alignment           |
| Backend Engineer  | Domain and workflow constraints, data/access rule planning, export and auth flow feasibility       |
| Frontend Engineer | Entry-flow behavior, requirements interaction planning, viewer/admin UX implementation feasibility |
| UI/UX Designer    | Usability, information architecture, accessibility, onboarding and entry-flow clarity              |
| Product Owner     | Prioritization, phase scoping, stakeholder alignment, acceptance sign-off                          |

---

## Workstream Ownership Matrix

| Workstream                                  | Feature(s)     | Owner          | Primary           | Support           | Informed       |
| ------------------------------------------- | -------------- | -------------- | ----------------- | ----------------- | -------------- |
| Client and project lifecycle governance     | F-001          | Tech Lead      | Backend Engineer  | Frontend Engineer | UI/UX Designer |
| AI refinement and approval flow             | F-002          | Tech Lead      | Backend Engineer  | Frontend Engineer | Product Owner  |
| Access and visibility boundaries            | F-003          | Tech Lead      | Backend Engineer  | Frontend Engineer | UI/UX Designer |
| Backlog and export deliverables             | F-004          | Tech Lead      | Backend Engineer  | Frontend Engineer | Product Owner  |
| Onboarding and stakeholder readability      | F-005          | UI/UX Designer | Frontend Engineer | Product Owner     | Tech Lead      |
| Landing and conversion entry experience     | F-006          | UI/UX Designer | Frontend Engineer | Product Owner     | Tech Lead      |
| Admin login and session entry controls      | F-007          | Tech Lead      | Backend Engineer  | Frontend Engineer | Product Owner  |
| Account creation and first-use path         | F-008          | Product Owner  | Frontend Engineer | Backend Engineer  | UI/UX Designer |
| Password reset and recovery safety          | F-009          | Tech Lead      | Backend Engineer  | Frontend Engineer | Product Owner  |
| Cross-phase quality and governance controls | F-001 to F-009 | Tech Lead      | Tech Lead         | All roles         | Product Owner  |

---

## Phase-Level Task Ownership (RACI)

### MVP Phase

| Priority | Epic / Task                              | Accountable   | Responsible                         | Consulted                                           |
| -------- | ---------------------------------------- | ------------- | ----------------------------------- | --------------------------------------------------- |
| Must     | Core scope and acceptance alignment      | Product Owner | Tech Lead                           | Backend Engineer, Frontend Engineer, UI/UX Designer |
| Must     | Core planning workflows (F-001 to F-004) | Tech Lead     | Backend Engineer, Frontend Engineer | UI/UX Designer, Product Owner                       |
| Must     | Access/auth baseline (F-007, F-009)      | Tech Lead     | Backend Engineer                    | Frontend Engineer, Product Owner                    |
| Must     | Export and quality baseline checks       | Tech Lead     | Backend Engineer, Frontend Engineer | UI/UX Designer                                      |

### Phase 1

| Priority | Epic / Task                           | Accountable    | Responsible                       | Consulted                |
| -------- | ------------------------------------- | -------------- | --------------------------------- | ------------------------ |
| Should   | Onboarding and landing quality uplift | UI/UX Designer | UI/UX Designer, Frontend Engineer | Product Owner, Tech Lead |
| Should   | Account creation and flow readability | Product Owner  | Frontend Engineer, UI/UX Designer | Backend Engineer         |
| Should   | Accessibility/readability hardening   | Tech Lead      | Frontend Engineer, UI/UX Designer | Product Owner            |

### Phase 2

| Priority | Epic / Task                          | Accountable   | Responsible              | Consulted                                           |
| -------- | ------------------------------------ | ------------- | ------------------------ | --------------------------------------------------- |
| Could    | Cross-phase backlog governance       | Tech Lead     | Tech Lead                | Backend Engineer, Frontend Engineer, UI/UX Designer |
| Could    | Dependency/risk governance expansion | Tech Lead     | Tech Lead, Product Owner | Backend Engineer, Frontend Engineer                 |
| Could    | Future collaboration policy framing  | Product Owner | Product Owner, Tech Lead | UI/UX Designer                                      |

---

## Coordination Cadence

| Cadence                      | Participants                                 | Purpose                                                        |
| ---------------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| Sprint kickoff               | Product Owner, Tech Lead, Engineers, UI/UX   | Confirm scope, ownership, and requirement traceability updates |
| Requirement checkpoint       | Tech Lead, Backend Engineer, Product Owner   | Validate Must-priority acceptance criteria and DRI assignments |
| UX/accessibility review      | UI/UX Designer, Frontend Engineer, Tech Lead | Validate user-facing quality before phase sign-off             |
| Phase sign-off               | Product Owner, Tech Lead, UI/UX Designer     | Approve transition criteria for next phase                     |
| Ongoing traceability updates | All roles                                    | Keep feature/epic/story and ownership mappings current         |

## Escalation Path

- Scope conflicts -> Tech Lead -> Product Owner
- Quality gate failures -> Tech Lead
- UX/accessibility disputes -> UI/UX Designer -> Tech Lead -> Product Owner

---

## Requirement-Level Ownership

| Requirement ID | Requirement Summary                              | Owner (DRI)       | Reviewer       | Implementer                         | Phase |
| -------------- | ------------------------------------------------ | ----------------- | -------------- | ----------------------------------- | ----- |
| FR-001-01      | Client record management and project association | Backend Engineer  | Product Owner  | Backend Engineer                    | MVP   |
| FR-001-02      | Active-project limit enforcement                 | Backend Engineer  | Tech Lead      | Backend Engineer                    | MVP   |
| FR-001-03      | Discovery/planning-only lifecycle                | Tech Lead         | Product Owner  | Backend Engineer, Frontend Engineer | MVP   |
| FR-002-01      | Raw-note AI input acceptance                     | Backend Engineer  | Tech Lead      | Backend Engineer                    | MVP   |
| FR-002-02      | Story generation output contract                 | Backend Engineer  | Product Owner  | Backend Engineer                    | MVP   |
| FR-002-03      | Admin edit and explicit approval gate            | Tech Lead         | Product Owner  | Backend Engineer, Frontend Engineer | MVP   |
| FR-003-01      | Admin/Viewer role enforcement                    | Tech Lead         | Product Owner  | Backend Engineer                    | MVP   |
| FR-003-02      | Collaborator restriction enforcement             | Tech Lead         | Product Owner  | Backend Engineer                    | MVP   |
| FR-004-01      | Structured backlog deliverable                   | Frontend Engineer | Product Owner  | Frontend Engineer                   | MVP   |
| FR-004-02      | Markdown export                                  | Backend Engineer  | Tech Lead      | Backend Engineer                    | MVP   |
| FR-006-01      | Landing value proposition clarity                | UI/UX Designer    | Product Owner  | Frontend Engineer                   | MVP   |
| FR-006-02      | Landing CTA routing to auth flows                | Frontend Engineer | UI/UX Designer | Frontend Engineer                   | MVP   |
| FR-007-01      | Admin login authentication                       | Backend Engineer  | Tech Lead      | Backend Engineer                    | MVP   |
| FR-007-02      | Login validation and safe feedback               | Frontend Engineer | Tech Lead      | Frontend Engineer                   | MVP   |
| FR-008-01      | Admin account registration                       | Backend Engineer  | Product Owner  | Backend Engineer, Frontend Engineer | MVP   |
| FR-008-02      | Registration validation and credential rules     | Tech Lead         | Product Owner  | Backend Engineer                    | MVP   |
| FR-009-01      | Password reset request                           | Backend Engineer  | Tech Lead      | Backend Engineer                    | MVP   |
| FR-009-02      | Secure reset token and password update           | Tech Lead         | Product Owner  | Backend Engineer                    | MVP   |
| NFR-X01        | OWASP-aligned security baseline                  | Tech Lead         | Tech Lead      | All Engineers                       | MVP   |
| NFR-X02        | GDPR-aligned privacy baseline                    | Tech Lead         | Product Owner  | Backend Engineer                    | MVP   |
| NFR-X03        | Test coverage baseline                           | Tech Lead         | Tech Lead      | Backend Engineer, Frontend Engineer | MVP   |

> **Rule:** No Must-priority requirement may enter an active sprint without a named DRI in this table.

---

## Change Log

| Date       | Version | Change Summary                                                                   | Author        |
| ---------- | ------- | -------------------------------------------------------------------------------- | ------------- |
| 2026-03-23 | 1.1     | Refactored role mapping to template structure and aligned ownership to features. | Product Owner |
| 2026-02-28 | 1.0     | Initial role-mapping draft created.                                              | Product Owner |

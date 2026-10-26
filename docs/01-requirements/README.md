# Project Requirements by Feature

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.6                         |
| **Status**       | Accepted                    |
| **Document role** | Requirements baseline |
| **Owner**        | Product Owner               |

## Purpose

Single source of truth for requirements organized by feature slices.
Detailed requirements are maintained in dedicated feature files.

---

## Feature Map

| Feature ID | Feature Name                             | Outcome                                                   | Priority | Status    | Owner         | Details                                                      |
| ---------- | ---------------------------------------- | --------------------------------------------------------- | -------- | --------- | ------------- | ------------------------------------------------------------ |
| F-001      | Client and Project Lifecycle Management  | Admin keeps client/project records aligned with MVP flow  | Must     | Clarified | Product Owner | [F-001](./f-001-client-and-project-lifecycle-management.md)  |
| F-002      | AI Refinement and Approval Workflow      | Raw notes become approved, structured user stories        | Must     | Clarified | Product Owner | [F-002](./f-002-ai-refinement-and-approval-workflow.md)      |
| F-003      | Access Control and Visibility Boundaries | Admin/Member permissions are enforced; clients review via access code | Must     | Clarified | Product Owner | [F-003](./f-003-access-control-and-visibility-boundaries.md) |
| F-004      | Requirements Backlog and Markdown Export | Approved stories are visible and exportable               | Must     | Clarified | Product Owner | [F-004](./f-004-requirements-backlog-and-markdown-export.md) |
| F-005      | Minimal Onboarding                       | First-time Admin guidance reduces MVP onboarding friction | Should   | Clarified | Product Owner | [F-005](./f-005-minimal-onboarding.md)                       |
| F-006      | Landing Page Experience                  | Visitors clearly understand product value and actions     | Must     | Clarified | Product Owner | [F-006](./f-006-landing-page.md)                             |
| F-007      | Admin Login                              | Admin securely authenticates and accesses workspace       | Must     | Clarified | Product Owner | [F-007](./f-007-admin-login.md)                              |
| F-008      | Account Creation                         | New admin can register and start onboarding               | Should   | Clarified | Product Owner | [F-008](./f-008-create-account.md)                           |
| F-009      | Reset Password                           | Admin can recover account access safely                   | Must     | Clarified | Product Owner | [F-009](./f-009-reset-password.md)                           |
| F-010      | AI Credits and API Key Management        | Users get 5 free credits and can add own AI provider keys | Must     | Clarified | Product Owner | [F-010](./f-010-ai-credits-and-api-key-management.md)        |
| F-011      | Client Review Access                     | Clients review approved stories with a project access code, no account | Must     | Clarified | Product Owner | [F-011](./f-011-client-review-access.md)                |

---

## Interpreting requirement status

“Clarified” records the intended requirements baseline. It does not establish implementation completeness, formal stakeholder approval, or a passing acceptance test. Individual feature pages identify known differences from that baseline; [evidence and limitations](../00-context/evidence-and-limitations.md) maps features to implementation and validation gaps.

The original role labels in owner columns describe planning responsibilities. They are not evidence that a separate person held each role.

## Cross-Cutting Quality Baseline

The following are targets to assess, not claims of achieved performance, compliance, or conformance. Coverage, load, email-delivery, and accessibility results require recorded measurements.

| ID      | Quality Area         | Requirement                                                                                                             | Metric / Target                                                                                                                                                                                                 | Priority | Owner (DRI)   | Status    |
| ------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | --------- |
| NFR-X01 | Security             | The platform adheres to OWASP Top 10 security best practices, including secure credential storage and login protection. | OWASP Top 10 checklist satisfied; login attempts are rate-limited; passwords are stored using strong one-way hashing.                                                                                           | Must     | Tech Lead     | Clarified |
| NFR-X02 | Privacy              | The platform follows GDPR-aligned privacy practices with deletion and archival support.                                 | Deleted projects become inaccessible to Admin, Member, and the Client Review Portal within 24 hours; archived projects are excluded from the active-project limit.                                                                   | Must     | Tech Lead     | Clarified |
| NFR-X03 | Testability          | MVP core logic keeps an automated test coverage target with visible reporting.                                          | Automated tests cover at least 70% of core application logic. Coverage is measured and reported with a diff on every pull request; per ADR-015 it is tracked as a target, not enforced as a merge-blocking gate. | Must     | Backend Lead  | Clarified |
| NFR-X04 | Readability          | Client-facing requirements remain readable to non-technical stakeholders.                                               | The Client Review Portal presents user stories with plain-language titles.                                                                                                                          | Should   | Product Owner | Clarified |
| NFR-X05 | Performance          | Core project and requirements views remain responsive under MVP load.                                                   | MVP load: 10 concurrent Admins + 20 client reviewers, 100 requests/min peak, 3 active projects per workspace, 200 total stories. Project list and requirements views render within 2 seconds.                                | Should   | Tech Lead     | Clarified |
| NFR-X06 | Scalability          | MVP usage limits are supported without data loss or degradation.                                                        | Supports at least 3 active projects per workspace and 500 total user stories without data loss.                                                                                                        | Should   | Tech Lead     | Clarified |
| NFR-X07 | Accessibility        | Primary workflows meet baseline accessibility standards.                                                                | Requirements views meet WCAG 2.1 AA guidelines for contrast, keyboard navigation, and screen reader labels.                                                                                                     | Should   | UI/UX Lead    | Clarified |
| NFR-X08 | Delivery Feasibility | MVP scope remains deliverable in planned schedule.                                                                      | MVP scope is achievable within a 2.5-month delivery window, assuming 2 developers at ~12 story points each per week against the 250 points of remaining MVP work. Revised from 1–1.5 months once the backlog was estimated; see the Capacity Basis in the phased roadmap. | Should   | Product Owner | Clarified |
| NFR-X09 | Session Management   | User sessions are secure, time-bound, and manageable across devices.                                                    | Standard refresh sessions use a 24-hour inactivity window; extended sessions use seven days; concurrent sessions allowed; forced logout capability; session timeout warning 5 min before expiry; refresh tokens rotate on use.      | Must     | Tech Lead     | Clarified |
| NFR-X10 | Email Notifications  | Platform delivers transactional emails reliably with retry and failure handling.                                        | 95% delivered within 30 seconds; 3 retry attempts with exponential backoff; user feedback on failures; max 10 emails per account per hour; supports verification codes, password reset, and Member invitations. | Must     | Tech Lead     | Clarified |

---

## Implemented technology decisions

Requirements remain separate from implementation choices. The current choices and their limitations are documented in architecture pages and ADRs.

| Concern | Current choice | Reference |
| --- | --- | --- |
| Persistence and isolation | PostgreSQL container; workspace-scoped application queries, without RLS | [Database design](../03-architecture/database/database-design.md) |
| Hosting | Cloudflare static frontend and proxy; one EC2 host for API and database | [Deployment](../03-architecture/ops/deployment-architecture.md) |
| Email | Resend SMTP relay | [ADR-024](../04-decisions/adr-024-email-delivery-with-resend.md) |
| Sessions | Short-lived bearer tokens and rotating HttpOnly refresh cookies | [Security architecture](../03-architecture/security/security-architecture.md) |
| AI providers | Gemini, OpenAI, DeepSeek; platform credits or individual provider keys | [API contract](../03-architecture/api/api-contract.md) |

These choices support the intended workflow but do not prove every NFR target. In particular, a single host without backups does not establish availability or recovery guarantees.

## Source References

- [Project Overview](../00-context/overview.md)
- [User Personas](../00-context/user-personas.md)
- [Out of Scope Items](../00-context/out-of-scope.md)

---

**Last Updated**: 2026-09-08

# Project Requirements by Feature

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.6                         |
| **Status**       | Ready for Implementation    |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Purpose

Single source of truth for requirements organized by feature slices.
Detailed requirements are maintained in dedicated feature files.

## Sources

- [Project Overview](../overview.md)
- [User Personas](../user-personas.md)
- [Open Questions](../open-questions.md)
- [Out of Scope Items](../out-of-scope.md)

---

## Feature Map

| Feature ID | Feature Name                             | Outcome                                                   | Priority | Status    | Owner         | Details                                              |
| ---------- | ---------------------------------------- | --------------------------------------------------------- | -------- | --------- | ------------- | ---------------------------------------------------- |
| F-001      | Client and Project Lifecycle Management  | Admin keeps client/project records aligned with MVP flow  | Must     | Clarified | Product Owner | [F-001](./f-001-client-and-project-lifecycle-management.md) |
| F-002      | AI Refinement and Approval Workflow      | Raw notes become approved, structured user stories        | Must     | Clarified | Product Owner | [F-002](./f-002-ai-refinement-and-approval-workflow.md) |
| F-003      | Access Control and Visibility Boundaries | Admin/Viewer permissions and private notes are enforced   | Must     | Clarified | Product Owner | [F-003](./f-003-access-control-and-visibility-boundaries.md) |
| F-004      | Requirements Backlog and Markdown Export | Approved stories are visible and exportable               | Must     | Clarified | Product Owner | [F-004](./f-004-requirements-backlog-and-markdown-export.md) |
| F-005      | Minimal Onboarding                       | First-time Admin guidance reduces MVP onboarding friction | Should   | Clarified | Product Owner | [F-005](./f-005-minimal-onboarding.md) |
| F-006      | Landing Page Experience                  | Visitors clearly understand product value and actions     | Must     | Clarified | Product Owner | [F-006](./f-006-landing-page.md) |
| F-007      | Admin Login                              | Admin securely authenticates and accesses workspace       | Must     | Clarified | Product Owner | [F-007](./f-007-admin-login.md) |
| F-008      | Account Creation                         | New admin can register and start onboarding               | Should   | Clarified | Product Owner | [F-008](./f-008-create-account.md) |
| F-009      | Reset Password                           | Admin can recover account access safely                   | Must     | Clarified | Product Owner | [F-009](./f-009-reset-password.md) |
| F-010      | AI Credits and API Key Management        | Users get 5 free credits and can add own AI provider keys | Must     | Clarified | Product Owner | [F-010](./f-010-ai-credits-and-api-key-management.md) |
| F-011      | Viewer Account Management                | Viewer can be invited and access granted projects         | Must     | Clarified | Product Owner | [F-011](./f-011-viewer-account-management.md) |

---

## Status Definitions

| Status | Meaning | Criteria |
|--------|---------|----------|
| **Draft** | Requirements are documented but not yet validated or complete | Requirements capture initial understanding; may have open questions or missing acceptance criteria |
| **Review Pending** | Baseline is complete and under validation review | All requirements documented with acceptance criteria; open questions resolved; pending final product owner validation before implementation handoff |
| **Clarified** | Core requirements are validated and stable; ready for implementation planning | All functional requirements reviewed and approved; no open questions; dependencies identified; ready for implementation team to begin technical design |
| **Ready for Implementation** | All requirements validated, reviewed, and implementation team confirmed feasibility | Feature marked "Clarified" + all individual requirements marked "Clarified" + implementation team reviewed and confirmed feasibility |

### Current Feature Status

All features (F-001 to F-011) have been validated and moved to **Clarified** status (2026-07-30).

**Next Step**: Implementation team has confirmed technical feasibility. Requirements are now **Ready for Implementation** handoff.

**Transition Path**: Draft → Review Pending → Clarified → **Ready for Implementation** ✅

---

## Cross-Cutting Quality Baseline

| ID      | Quality Area         | Requirement                                                                                                             | Metric / Target                                                                                                                               | Priority | Owner (DRI)   | Status    |
| ------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | --------- |
| NFR-X01 | Security             | The platform adheres to OWASP Top 10 security best practices, including secure credential storage and login protection. | OWASP Top 10 checklist satisfied; login attempts are rate-limited; passwords are stored using strong one-way hashing.                         | Must     | Tech Lead     | Clarified |
| NFR-X02 | Privacy              | The platform follows GDPR-aligned privacy practices with deletion and archival support.                                 | Deleted projects become inaccessible to Admin and Viewer roles within 24 hours; archived projects are excluded from the active-project limit. | Must     | Tech Lead     | Clarified |
| NFR-X03 | Testability          | MVP core logic keeps an automated test coverage threshold.                                                              | Automated tests cover at least 70% of core application logic.                                                                                 | Must     | Backend Lead  | Clarified |
| NFR-X04 | Readability          | Viewer-facing requirements remain readable to non-technical stakeholders.                                               | Viewer views present user stories in the standard template with plain-language titles and omit internal notes.                                | Should   | Product Owner | Clarified |
| NFR-X05 | Performance          | Core project and requirements views remain responsive under MVP load.                                                   | MVP load: 10 concurrent Admins + 20 Viewers, 100 requests/min peak, 3 active projects per Admin, 200 total stories. Project list and requirements views render within 2 seconds. | Should   | Tech Lead     | Clarified |
| NFR-X06 | Scalability          | MVP usage limits are supported without data loss or degradation.                                                        | Supports at least 3 active projects per freelancer account and 500 total user stories without data loss.                                      | Should   | Tech Lead     | Clarified |
| NFR-X07 | Accessibility        | Primary workflows meet baseline accessibility standards.                                                                | Requirements views meet WCAG 2.1 AA guidelines for contrast, keyboard navigation, and screen reader labels.                                   | Should   | UI/UX Lead    | Clarified |
| NFR-X08 | Delivery Feasibility | MVP scope remains deliverable in planned schedule.                                                                      | MVP scope is achievable within a 1–1.5 month delivery window, assuming the defined scope and constraints.                                     | Should   | Product Owner | Clarified |
| NFR-X09 | Session Management   | User sessions are secure, time-bound, and manageable across devices.                                                    | Standard sessions expire after 24 hours; extended sessions after 7 days; concurrent sessions allowed; forced logout capability; session timeout warning 5 min before expiry; refresh tokens rotate on use. | Must     | Tech Lead     | Clarified |
| NFR-X10 | Email Notifications  | Platform delivers transactional emails reliably with retry and failure handling.                                        | 95% delivered within 30 seconds; 3 retry attempts with exponential backoff; user feedback on failures; max 10 emails per account per hour; supports verification codes, password reset, and Viewer invitations. | Must     | Tech Lead     | Clarified |

---

## Infrastructure Decisions for Implementation Team

The following infrastructure choices impact requirements scope and should guide implementation:

| Decision Area | Specified Choice | Impact on Requirements | Rationale |
|---------------|------------------|------------------------|-----------|
| **Database** | *Implementation Team Decision* | Must support access control enforcement (NFR-X03); recommend row-level security or application-level ACL | Relational database (PostgreSQL, MySQL, etc.) or managed database service that supports MVP requirements |
| **Hosting** | *Implementation Team Decision* | Must meet performance targets in NFR-X05 and scalability in NFR-X06 | Any hosting platform (cloud provider, PaaS, or managed service) that satisfies NFR-X05, NFR-X06, and cost constraints |
| **Email Service** | *Implementation Team Decision* | Email delivery requirements in NFR-X10 (95% within 30s, retry logic) | Any transactional email service (SendGrid, Postmark, AWS SES, Mailgun, etc.) that meets NFR-X10 metrics |
| **Session Management** | *Implementation Team Decision* | Session requirements in NFR-X09 (24-hour standard, 7-day extended, concurrent allowed) | JWT or session tokens acceptable; implementation must meet timeout and refresh requirements |
| **API Providers** | Gemini, OpenAI, DeepSeek | AI refinement workflow in F-002, F-010; user brings own keys | Platform provides 5 trial credits using platform-managed keys; users configure own API keys for unlimited use |

**Note**: All infrastructure decisions should be documented in the implementation repository's ADRs (Architecture Decision Records), not in this requirements specification. Chosen technologies must satisfy the non-functional requirements (NFR-X01 to NFR-X10).

**Validation Checklist for "Ready for Implementation"**:

Implementation team has confirmed:
- [x] All feature requirements are clear and unambiguous
- [x] Acceptance criteria are testable and measurable
- [x] Technical feasibility confirmed (no hidden blockers)
- [x] Dependencies between features are understood
- [x] Quality baselines (NFR-X01 to NFR-X10) are achievable with specified infrastructure
- [x] Infrastructure choices are appropriate for requirements
- [x] Scope boundaries (out-of-scope.md) are agreed upon
- [x] No critical open questions remain

---

## Change Log

| Date       | Version | Change Summary                                                                                                                                  | Author        |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| 2026-07-30 | 1.6     | **Ready for Implementation**: All features moved to Clarified status; all NFRs moved to Clarified; implementation team confirmed feasibility; completed F-007 with logout/session requirements; resolved F-002/F-010 circular dependency; made infrastructure choices platform-agnostic; validation checklist completed. | Product Owner |
| 2026-07-30 | 1.5     | Added "Review Pending" status; updated all features to Review Pending; added infrastructure guidance and validation checklist; created out-of-scope.md; updated repository scope in AGENTS.repo.md. | Product Owner |
| 2026-07-30 | 1.4     | Added F-011 Viewer Account Management, NFR-X09 Session Management, NFR-X10 Email Notifications; updated NFR-X05 with explicit MVP load assumptions. | Product Owner |
| 2026-07-29 | 1.3     | Added F-010 AI Credits and API Key Management.                                                                                                  | Product Owner |
| 2026-03-23 | 1.2     | Renamed index file, fixed links, restored F-002 map, and added F-006 to F-009.                                                                  | Product Owner |
| 2026-03-23 | 1.1     | Removed F-002 AI Refinement and Approval Workflow.                                                                                              | Product Owner |
| 2026-03-23 | 1.0     | Initial feature-based requirements baseline created.                                                                                            | Product Owner |

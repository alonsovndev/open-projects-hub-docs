# F-009 Reset Password

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: Admin users need account recovery when credentials are forgotten.
- **Primary Persona**: Admin
- **In Scope**: Password reset request, secure token-based reset, new password submission.
- **Out of Scope**: Phone-based recovery and support-assisted manual resets for MVP.

## Functional Requirements

| ID        | Requirement                                                                  | Source            | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                    | Status |
| --------- | ---------------------------------------------------------------------------- | ----------------- | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| FR-009-01 | The system allows Admin to request password reset using registered email.    | Auth baseline     | Must     | Product Owner | —                            | Admin can submit email and receives reset instructions without exposing whether account exists.        | Draft  |
| FR-009-02 | The system allows Admin to set a new password through a secure reset flow.   | Security baseline | Must     | Product Owner | —                            | Valid reset token permits password update; expired/invalid tokens are rejected with recovery guidance. | Draft  |
| FR-009-03 | The reset flow confirms successful password change and routes user to login. | User experience   | Should   | Product Owner | —                            | After successful reset, user sees confirmation and is redirected to login flow.                        | Draft  |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                     | Metric / Target                                                                                    | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------- | ----------- | ---------------------------- | ------ |
| NFR-009-01 | Password reset flow enforces secure token and expiry handling.  | Reset tokens are time-bound, single-use, and invalidated after successful password update.         | Must     | Tech Lead   | —                            | Draft  |
| NFR-009-02 | Reset flow provides accessible and understandable error states. | Error and confirmation states meet WCAG 2.1 AA and use plain-language feedback for recovery steps. | Should   | UI/UX Lead  | —                            | Draft  |

## Dependencies and Risks

- **Dependencies**: Email delivery service, token management policy, auth audit logging.
- **Risks**: Account takeover via weak reset controls; mitigation is short token TTL, one-time use, and rate-limited requests.

## Traceability

- **Related Open Questions**: Q-010, Q-011
- **Related User Stories**: [Backend Engineer Stories](../07-user-stories/backend-engineer-stories.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security-architecture.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

## Change Log

| Date       | Version | Change Summary                        | Author        |
| ---------- | ------- | ------------------------------------- | ------------- |
| 2026-03-23 | 1.0     | Initial feature requirements created. | Product Owner |

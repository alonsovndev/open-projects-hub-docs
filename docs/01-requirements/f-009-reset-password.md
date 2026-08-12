# F-009 Reset Password

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.2                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: Admin users need account recovery when credentials are forgotten.
- **Primary Persona**: Admin
- **In Scope**: Password reset request, 6-digit verification code delivery via email, secure code-based reset flow, new password submission.
- **Out of Scope**: Phone-based recovery, support-assisted manual resets, and magic link authentication for MVP.

## Functional Requirements

| ID        | Requirement                                                                                                                                      | Source            | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                                                            | Status |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | -------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| FR-009-01 | The system allows Admin to request password reset using registered email.                                                                        | Auth baseline     | Must     | Product Owner | —                            | Admin can submit email and receives reset code instructions without exposing whether account exists (privacy-preserving response).             | Clarified |
| FR-009-02 | System generates a 6-digit alphanumeric reset code (0-9, A-Z, excluding O/0/I/1) and sends it via email.                                         | Security baseline | Must     | Product Owner | —                            | Code is unique, randomly generated, and delivered within 30 seconds; user sees masked email confirmation.                                      | Clarified |
| FR-009-03 | Password reset code expires after 5 minutes from generation.                                                                                     | Security baseline | Must     | Product Owner | —                            | Expired codes are rejected with clear error message; user can request a new code via reset flow.                                               | Clarified |
| FR-009-04 | User can request password reset code resend up to 3 times within a 15-minute window.                                                             | Security baseline | Must     | Product Owner | —                            | Previous code is invalidated when new code is sent; rate limit prevents abuse; user sees remaining attempts.                                   | Clarified |
| FR-009-05 | The system allows Admin to set a new password through a secure reset flow after valid code entry.                                                | Security baseline | Must     | Product Owner | —                            | Valid reset code permits password update; expired/invalid codes are rejected with recovery guidance; code is single-use and invalidated after. | Clarified |
| FR-009-06 | The reset flow confirms successful password change and routes user to login.                                                                     | User experience   | Should   | Product Owner | —                            | After successful reset, user sees confirmation and is redirected to login flow.                                                                | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                     | Metric / Target                                                                                                                                                                          | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | ---------------------------- | ------ |
| NFR-009-01 | Password reset flow enforces secure code and expiry handling.   | Reset codes are 6-digit alphanumeric (0-9, A-Z, excluding O/0/I/1), time-bound (5 min), single-use, securely generated and stored hashed; invalidated after password update or expiry. | Must     | Tech Lead   | —                            | Clarified |
| NFR-009-02 | Reset flow enforces rate limiting to prevent abuse.             | Max 3 code requests per email per 15-minute window; max 5 code validation attempts per session before lockout; all limits logged for security monitoring.                               | Must     | Tech Lead   | —                            | Clarified |
| NFR-009-03 | Reset flow provides accessible and understandable error states. | Error and confirmation states meet WCAG 2.1 AA and use plain-language feedback for recovery steps; code input uses accessible patterns.                                                 | Should   | UI/UX Lead  | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**: Email delivery service (SMTP/API), verification code storage and expiry mechanism, rate limiting infrastructure, auth audit logging, password strength validation.
- **Risks**:
  - Account takeover via weak reset controls; mitigation is short code TTL (5 min), one-time use, rate-limited requests (3 per 15 min), and validation attempt limits (5 per session).
  - Email delivery delays prevent timely password reset; mitigation is resend capability with clear user feedback.
  - Code enumeration attacks; mitigation is rate limiting, account lockout, security monitoring, and privacy-preserving responses (no account existence disclosure).

## Traceability

- **Related Open Questions**: Q-010, Q-011
- **Related User Stories**: [Backend Engineer Stories](../06-user-stories/backend-engineer-stories.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security-architecture.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

## Change Log

| Date       | Version | Change Summary                                                                      | Author        |
| ---------- | ------- | ----------------------------------------------------------------------------------- | ------------- |
| 2026-07-30 | 1.2     | Validated requirements and moved all requirements to Clarified status after implementation team review. | Product Owner |
| 2026-07-29 | 1.1     | Added 6-digit verification code requirements (FR-009-02 to FR-009-05, NFR-009-02).  | Product Owner |
| 2026-03-23 | 1.0     | Initial feature requirements created.                                               | Product Owner |

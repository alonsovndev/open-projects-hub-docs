# F-009 Reset Password

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.2                         |
| **Status**       | Accepted                    |
| **Document role** | Requirements baseline |
| **Owner**        | Product Owner               |

These requirements record the design baseline. “Clarified” describes specification status, not a passing acceptance test. See [evidence and limitations](../00-context/evidence-and-limitations.md) for implementation support and validation gaps.

## Context

- **Problem**: Admin users need account recovery when credentials are forgotten.
- **Primary Persona**: Admin
- **In Scope**: Password reset request, six-character alphanumeric code delivery via email, secure code-based reset flow, new password submission.
- **Out of Scope**: Phone-based recovery, support-assisted manual resets, and magic link authentication for MVP.

## Implementation notes

Reset-code issuance permits at most three requests per email in a 15-minute window, including the initial request. This is not three additional resends. Each newly issued code replaces the previous one and expires after 30 minutes. Email-delivery latency and complete accessibility conformance remain evaluation targets.

## Functional Requirements

| ID        | Requirement                                                                                                                                      | Source            | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                                                            | Status |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | -------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| FR-009-01 | The system allows Admin to request password reset using registered email.                                                                        | Auth baseline     | Must     | Product Owner | —                            | Admin can submit email and receives reset code instructions without exposing whether account exists (privacy-preserving response).             | Clarified |
| FR-009-02 | System generates a six-character alphanumeric reset code (0-9, A-Z, excluding O/0/I/1) and sends it via email.                                         | Security baseline | Must     | Product Owner | —                            | Code is unique, randomly generated, and delivered within 30 seconds; user sees masked email confirmation.                                      | Clarified |
| FR-009-03 | Password reset code expires after 30 minutes from generation; the email also carries a link to the reset page with the code pre-filled.                                                                                     | Security baseline | Must     | Product Owner | —                            | Expired codes are rejected with clear error message; user can request a new code via reset flow.                                               | Clarified |
| FR-009-04 | User can request at most three reset codes per email within a 15-minute window, including the initial request. | Security baseline | Must | Product Owner | — | Each newly issued code invalidates the previous code; the issuance budget limits initial and resend requests together. | Clarified |
| FR-009-05 | The system allows Admin to set a new password through a secure reset flow after valid code entry.                                                | Security baseline | Must     | Product Owner | —                            | Valid reset code permits password update; expired/invalid codes are rejected with recovery guidance; code is single-use and invalidated after. | Clarified |
| FR-009-06 | The reset flow confirms successful password change and routes user to login.                                                                     | User experience   | Should   | Product Owner | —                            | After successful reset, user sees confirmation and is redirected to login flow.                                                                | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                     | Metric / Target                                                                                                                                                                          | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | ---------------------------- | ------ |
| NFR-009-01 | Password reset flow enforces secure code and expiry handling.   | Reset codes are six-character alphanumeric (0-9, A-Z, excluding O/0/I/1), time-bound (30 min), single-use, securely generated and stored hashed; invalidated after password update or expiry. | Must     | Tech Lead   | —                            | Clarified |
| NFR-009-02 | Reset flow enforces rate limiting to prevent abuse.             | Max 3 code requests per email per 15-minute window; max 5 code validation attempts per session before lockout; all limits logged for security monitoring.                               | Must     | Tech Lead   | —                            | Clarified |
| NFR-009-03 | Reset flow provides accessible and understandable error states. | Error and confirmation states meet WCAG 2.1 AA and use plain-language feedback for recovery steps; code input uses accessible patterns.                                                 | Should   | UI/UX Lead  | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**: Email delivery service (SMTP/API), verification code storage and expiry mechanism, rate limiting infrastructure, auth audit logging, password strength validation.
- **Risks**:
  - Account takeover via weak reset controls; mitigation is short code TTL (30 min), one-time use, rate-limited requests (3 per 15 min), and validation attempt limits (5 per session).
  - Email delivery delays prevent timely password reset; mitigation is resend capability with clear user feedback.
  - Code enumeration attacks; mitigation is rate limiting, account lockout, security monitoring, and privacy-preserving responses (no account existence disclosure).

## Traceability

- **Related Open Questions**: Q-010, Q-011
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security/security-architecture.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

**Last Updated**: 2026-07-30

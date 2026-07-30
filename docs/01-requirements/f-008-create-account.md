# F-008 Account Creation

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-07-29                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: New admins need a straightforward way to register and begin using the platform.
- **Primary Persona**: Prospective Admin
- **In Scope**: Registration form, email verification with time-limited code, account validation, initial role assignment as Admin.
- **Out of Scope**: Team invitation onboarding, paid plan provisioning, phone-based verification.

## Functional Requirements

| ID        | Requirement                                                                                                                                      | Source                 | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                                                              | Status |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| FR-008-01 | The system allows a new user to create an Admin account using registration form inputs.                                                          | Derived from MVP scope | Must     | Product Owner | —                            | User can submit required fields and receives confirmation that verification code was sent or actionable errors.                                  | Draft  |
| FR-008-02 | Registration validates required fields and credential strength rules.                                                                            | Security baseline      | Must     | Product Owner | —                            | Invalid or weak credentials are blocked with clear validation feedback before verification code is sent.                                         | Draft  |
| FR-008-03 | System generates a 6-digit alphanumeric verification code (0-9, A-Z, excluding O/0/I/1) and sends it via email upon registration.                | Security baseline      | Must     | Product Owner | —                            | Code is unique, randomly generated, and delivered within 30 seconds; user sees masked email confirmation.                                        | Draft  |
| FR-008-04 | Verification code expires after 5 minutes from generation.                                                                                       | Security baseline      | Must     | Product Owner | —                            | Expired codes are rejected with clear message indicating expiry; user can request a new code.                                                    | Draft  |
| FR-008-05 | User can request verification code resend up to 3 times within a 15-minute window.                                                               | Security baseline      | Must     | Product Owner | —                            | Previous code is invalidated when new code is sent; rate limit prevents abuse; user sees remaining attempts.                                     | Draft  |
| FR-008-06 | Account is created and activated only after successful email verification code entry.                                                            | Security baseline      | Must     | Product Owner | —                            | User cannot log in until valid code is submitted; pending verification state is persisted; clear instructions guide user through verification.   | Draft  |
| FR-008-07 | New account creation routes user to login or first-use onboarding path after email verification.                                                 | Onboarding scope       | Should   | Product Owner | Q-021                        | Successfully verified user is directed to the next step without requiring manual navigation.                                                     | Draft  |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                         | Metric / Target                                                                                                                                                                                  | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- | ---------------------------- | ------ |
| NFR-008-01 | Registration flow applies secure credential handling.               | Password policy and storage align with OWASP baseline controls and one-way hashing requirements.                                                                                                 | Must     | Tech Lead   | —                            | Draft  |
| NFR-008-02 | Verification codes are securely generated and stored.               | Codes use cryptographically secure random generation; stored hashed with expiry timestamp; invalidated after use or expiry.                                                                      | Must     | Tech Lead   | —                            | Draft  |
| NFR-008-03 | Registration and verification flows enforce rate limiting.          | Max 3 verification code requests per email per 15-minute window; max 5 code validation attempts per session before lockout; rate limits logged for security monitoring.                          | Must     | Tech Lead   | —                            | Draft  |
| NFR-008-04 | Registration flow stays usable and accessible for first-time users. | Form interactions, verification code entry, and validation messages satisfy WCAG 2.1 AA for labels, errors, keyboard flow, and screen reader compatibility; code input uses accessible patterns. | Should   | UI/UX Lead  | —                            | Draft  |

## Dependencies and Risks

- **Dependencies**: Identity provider setup, email delivery service (SMTP/API), verification code storage and expiry mechanism, rate limiting infrastructure, session bootstrap strategy.
- **Risks**:
  - Email delivery delays or failures prevent account activation; mitigation is retry mechanism with clear user feedback and resend option.
  - Friction in registration and verification increases abandonment; mitigation is minimal required fields, clear inline guidance, and 5-minute code validity window.
  - Code enumeration attacks; mitigation is rate limiting (3 resends per 15 min, 5 validation attempts), account lockout, and security monitoring.

## Traceability

- **Related Open Questions**: Q-021
- **Related User Stories**: [Frontend Engineer Stories](../06-user-stories/frontend-engineer-stories.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security-architecture.md)
- **Related Prototype**: [Stitch Prompt](../05-prototype/stitch-prompt.md)

---

## Change Log

| Date       | Version | Change Summary                                                                          | Author        |
| ---------- | ------- | --------------------------------------------------------------------------------------- | ------------- |
| 2026-03-23 | 1.0     | Initial feature requirements created.                                                   | Product Owner |
| 2026-07-29 | 1.1     | Added email verification code requirements (FR-008-03 to FR-008-06, NFR-008-02/03).     | Product Owner |

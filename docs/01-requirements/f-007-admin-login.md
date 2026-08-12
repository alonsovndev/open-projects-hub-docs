# F-007 Admin Login

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.1                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: Admin requires a secure and predictable authentication entry point.
- **Primary Persona**: Admin
- **In Scope**: Credential-based login, validation feedback, account lockout/rate-limit behavior, session management, logout flow, "remember me" functionality.
- **Out of Scope**: Social login (OAuth/Google/GitHub), multi-factor authentication (MFA), biometric authentication, passwordless login for MVP.

## Functional Requirements

| ID        | Requirement                                                            | Source            | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                     | Status    |
| --------- | ---------------------------------------------------------------------- | ----------------- | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- | --------- |
| FR-007-01 | The system allows Admin users to authenticate with email and password. | Derived from RBAC | Must     | Product Owner | Q-010, Q-011                 | Valid admin credentials grant access to admin workspace; invalid credentials return safe error message ("Invalid email or password"). | Clarified |
| FR-007-02 | The login form provides clear validation and authentication feedback.  | User Personas     | Must     | Product Owner | —                            | Email field validates format; password field requires minimum length; empty fields show "This field is required"; unsuccessful login shows "Invalid email or password" without indicating which field is incorrect. | Clarified |
| FR-007-03 | Successful authentication redirects Admin to the project dashboard.    | Overview          | Should   | Product Owner | —                            | After successful login, Admin lands on `/dashboard` or primary workspace without manual URL navigation. | Clarified |
| FR-007-04 | The system enforces account lockout after repeated failed login attempts. | Security Baseline | Must     | Product Owner | Q-010, Q-011                 | After 5 failed login attempts within 15 minutes, account is locked for 15 minutes; user sees message "Account temporarily locked due to multiple failed attempts. Try again in 15 minutes."; lockout counter resets after successful login or timeout. | Clarified |
| FR-007-05 | Admin can log out and terminate their session.                        | Session Security  | Must     | Product Owner | NFR-X09                      | Logout button is visible in header/navigation; clicking logout clears session token and redirects to landing page; accessing protected routes after logout redirects to login page. | Clarified |
| FR-007-06 | Sessions expire according to session management policy.                | Session Security  | Must     | Product Owner | NFR-X09                      | Standard sessions expire after 24 hours of inactivity; extended sessions (if "remember me" enabled) expire after 7 days; 5 minutes before expiry, user sees warning with option to extend session; expired sessions redirect to login with message "Your session has expired. Please log in again." | Clarified |
| FR-007-07 | Admin can optionally enable "Remember me" for extended sessions.       | User Experience   | Should   | Product Owner | NFR-X09                      | Login form shows "Remember me" checkbox (unchecked by default); when checked, session extends to 7 days instead of 24 hours; checkbox state is not persisted across login attempts. | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                 | Metric / Target                                                                              | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status    |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------- | ----------- | ---------------------------- | --------- |
| NFR-007-01 | Login flow follows security baseline requirements.          | Login attempts are rate-limited (5 attempts per 15 minutes per account); credential handling aligns with OWASP baseline controls (secure password hashing, HTTPS-only); failed attempts are logged without exposing user existence. | Must     | Tech Lead   | Q-010, Q-011                 | Clarified |
| NFR-007-02 | Login interaction remains accessible and keyboard-friendly. | Form labels, focus order, and errors meet WCAG 2.1 AA expectations for authentication forms; all interactive elements are keyboard-accessible; error messages are announced to screen readers. | Should   | UI/UX Lead  | —                            | Clarified |
| NFR-007-03 | Login performance remains responsive under load.            | Login request completes within 2 seconds under MVP load (10 concurrent admins); session token generation completes within 500ms; supports NFR-X05 performance baseline. | Should   | Tech Lead   | NFR-X05                      | Clarified |

## Dependencies and Risks

- **Dependencies**: 
  - Session management (NFR-X09) - defines session timeout and expiry behavior
  - F-009 (Reset Password) - handles password recovery flow
  - F-008 (Account Creation) - creates admin accounts that login authenticates
  - Identity service implementation (authentication provider/library selection)
  - Role policy mapping for admin vs viewer access control
- **Risks**: 
  - Authentication errors can leak sensitive information; **mitigation**: generic auth failure messaging ("Invalid email or password") and centralized logging without exposing user enumeration
  - Account lockout can be abused for denial-of-service; **mitigation**: 15-minute lockout window is short enough to minimize disruption while preventing brute force attacks

## Traceability

- **Related Open Questions**: Q-010, Q-011
- **Related User Stories**: [Backend Engineer Stories](../06-user-stories/backend-engineer-stories.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security-architecture.md)
- **Related Prototype**: [Prototype Brief](../05-prototype/prototype-brief.md)

---

## Change Log

| Date       | Version | Change Summary                        | Author        |
| ---------- | ------- | ------------------------------------- | ------------- |
| 2026-07-30 | 1.1     | Added FR-007-04 (account lockout), FR-007-05 (logout), FR-007-06 (session expiry), FR-007-07 (remember me); enhanced acceptance criteria with specific error messages; added NFR-007-03 (performance); moved all requirements to Clarified status; updated dependencies and risks. | Product Owner |
| 2026-03-23 | 1.0     | Initial feature requirements created. | Product Owner |

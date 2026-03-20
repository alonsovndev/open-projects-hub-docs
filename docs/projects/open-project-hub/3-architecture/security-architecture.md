# Security Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-02-28                  |

## Sources

- [Project Overview](../overview.md)
- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Role Mapping](../2-planning/role-mapping.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [Technology Stack](./technology-stack.md)
- [ADR-005: Authentication and Authorization Strategy](./adrs/adr-005-authentication.md)
- [ADR-012: Secrets Management Strategy](./adrs/adr-012-secrets-management.md)

## Security Objectives and Scope

This document defines the security architecture for MVP scope and aligns with:

- **FR-008 / FR-009 / FR-010** for role-based access boundaries.
- **NFR-001** for OWASP Top 10 controls.
- **NFR-002** for GDPR-aligned data handling.

Security principles applied:

1. Defense in depth across frontend, backend, platform, and data layers.
2. Least privilege for users, services, and data paths.
3. Secure-by-default configuration with explicit allow rules.
4. Continuous monitoring and incident response readiness.

## Security Architecture Overview

The platform uses a layered model across **Vercel (frontend)**, **Render (backend)**, and **Supabase (auth + PostgreSQL + RLS)** with Sentry for observability.

- Identity is issued by Supabase Auth (JWT-based).
- Access is enforced in backend policies and Supabase RLS.
- Data is encrypted in transit (TLS) and at rest (managed encryption).
- Secrets are centrally managed through environment variables and provider secret stores.

See diagram: [`./diagrams/security-architecture.mmd`](./diagrams/security-architecture.mmd)

## Authentication Strategy

### Selected Model (MVP)

- **Primary:** Supabase Auth with **JWT access tokens** and refresh tokens.
- **OAuth 2.0 / OIDC:** Supported through Supabase social providers (e.g., Google/GitHub) where enabled.
- **Session-based auth:** Not selected for backend APIs due to stateless scaling requirements on Render.

### Authentication Controls

- Strong password policy configured in auth provider (minimum length and breach checks where available).
- Password hashing delegated to managed provider (modern adaptive hashing).
- Token expiry and refresh lifecycle enforced; short-lived access token + rotating refresh token.
- Optional MFA readiness path (TOTP) for future hardening.
- Account lockout / throttling via rate limits on login endpoints.

See diagram: [`./diagrams/authentication-flow.mmd`](./diagrams/authentication-flow.mmd)

## Authorization Model

### RBAC + Resource Attributes

- **RBAC baseline:** `admin` and `viewer` roles mapped to FR-008 access requirements.
- **ABAC constraints:** resource ownership, project membership, and data visibility flags (e.g., internal notes).
- **Permission model:** backend authorizes action-level permissions before executing use cases.
- **Data-level enforcement:** Supabase Row Level Security (RLS) policies as last-mile protection.

### Least-Privilege Rules

- Viewer role is read-only and excluded from internal notes.
- Admin role has CRUD scope limited to authorized tenant/project boundaries.
- Service credentials are split by environment and duty (app runtime, migrations, CI).

See diagram: [`./diagrams/authorization-flow.mmd`](./diagrams/authorization-flow.mmd)

## Data Protection

### Encryption at Rest

- Supabase managed PostgreSQL encryption at rest.
- Managed encrypted backups with point-in-time recovery.
- Object/file storage encryption at rest for uploaded artifacts.

### Encryption in Transit

- HTTPS/TLS for Vercel ↔ Render and client ↔ Vercel traffic.
- TLS for backend database connections.
- Secure cookie and token transport settings for auth interactions.

### Sensitive Data Handling

- No plaintext passwords, tokens, or API keys in logs.
- PII and internal notes masked/redacted in logs and error payloads.
- Data retention and deletion flows align to NFR-002.

## OWASP Top 10 Compliance Mapping

| OWASP Risk Area                  | Primary Mitigations in Architecture                                          |
| -------------------------------- | ---------------------------------------------------------------------------- |
| Broken Access Control            | RBAC checks in backend + RLS at data layer + least privilege defaults        |
| Cryptographic Failures           | TLS everywhere, managed encryption at rest, secret rotation policy           |
| Injection                        | Parameterized queries via ORM, strict input validation, output encoding      |
| Insecure Design                  | Threat modeling, ADR-driven design decisions, deny-by-default access         |
| Security Misconfiguration        | Environment baselines, hardened defaults, restricted CORS and headers        |
| Vulnerable Components            | Dependency scanning in CI, patch cadence, lockfile governance                |
| Identification/Auth Failures     | Managed auth, token lifecycle controls, rate-limited login paths             |
| Software/Data Integrity Failures | Protected CI pipelines, signed commits/tags where applicable, change reviews |
| Logging/Monitoring Failures      | Sentry monitoring, audit logs, alerting and incident runbooks                |
| SSRF                             | Outbound allowlists, URL validation for any server-side fetch behavior       |

## Network Security Architecture

- Public edge is terminated at Vercel/Render managed TLS boundaries.
- Backend services on Render expose only required public API ports.
- Supabase access is controlled via credentials, RLS, and platform network controls.
- Ingress is restricted with CORS allowlists and rate-limiting middleware.
- Additional WAF/DDoS protections rely on managed platform controls (Vercel/Render).

## Secrets Management Strategy

- Environment-specific secrets are stored in Vercel, Render, and Supabase secret stores.
- No secrets in source control or PR artifacts.
- Rotation policy for JWT signing materials (provider-managed) and service API keys.
- Access to secrets is role-scoped and audited through platform IAM/audit logs.
- Break-glass access is restricted, time-bound, and logged.

## Security Headers and Web Best Practices

At the frontend/backend edge, enforce:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or CSP frame-ancestors)
- `Referrer-Policy`
- `Permissions-Policy`

Additional controls:

- Secure cookie flags where cookies are used (`HttpOnly`, `Secure`, `SameSite`).
- Cache-control for sensitive responses.

## Input Validation and Sanitization

- Validate all request payloads with typed schemas (format, range, required fields).
- Normalize and sanitize rich text/user-provided fields before rendering.
- Reject unknown or malformed fields by default.
- Encode output in UI to prevent XSS.
- Validate outbound URLs and identifiers for SSRF/path traversal prevention.

## API Security

- **Rate limiting:** per-IP and per-user thresholds on auth and mutation endpoints.
- **CORS:** strict origin allowlist for trusted frontend domains only.
- **CSRF:** token/cookie protections where cookie-backed auth is used.
- **AuthN/AuthZ:** JWT verification, claim checks, role checks, and RLS enforcement.
- **Auditability:** request IDs and auth context captured for traceability.

## Security Monitoring and Incident Response

- Security-relevant events captured: auth failures, permission denials, anomalous request spikes, and privileged changes.
- Incident response lifecycle: detect → triage → contain → eradicate → recover → postmortem.
- Critical incidents notify engineering/security channels with severity-based escalation.

## Secure Development and Security Testing Approach

- **SAST:** static analysis in CI for backend/frontend repos before merge.
- **Dependency scanning:** vulnerability checks on lockfiles and transitive dependencies.
- **DAST:** automated authenticated endpoint scanning in staging.
- **Penetration testing:** scoped manual testing before major releases.
- **Threat-model review cadence:** update per major feature or architecture change.

## Observability (Sentry)

- Track authentication/authorization errors with context (without sensitive payloads).
- Monitor endpoint latency and failure rates for auth and permission checks.
- Track release regressions and spikes in security-relevant exceptions.
- Alert examples:
  - auth failure rate > baseline for 10 minutes,
  - repeated 403/401 anomalies on sensitive endpoints,
  - sudden rise in validation errors that may indicate probing.

## Deployment Impact (GitHub Actions)

- Security gates in CI: lint/test, dependency scanning, and policy checks before deployment.
- Environment segregation: dev/staging/prod secrets managed separately.
- Preview deployments run with non-production credentials only.
- Rollback uses prior known-good deployment and schema-compatible migrations.
- Migration strategy requires backward-compatible DB changes for zero-downtime rollout.

## ADR and Diagram References

- [ADR-005: Authentication and Authorization Strategy](./adrs/adr-005-authentication.md)
- [ADR-012: Secrets Management Strategy](./adrs/adr-012-secrets-management.md)
- [Security Architecture Diagram](./diagrams/security-architecture.mmd)
- [Authentication Flow](./diagrams/authentication-flow.mmd)
- [Authorization Flow](./diagrams/authorization-flow.mmd)

<!-- AI AGENT INSTRUCTIONS
Purpose: Document the layered security architecture for [Project Name].
Replace all [placeholder] blocks with project-specific platforms, controls, and FR/NFR references.
Cross-reference: threat-model.md, adrs/, technology-stack.md, non-functional-requirements.md.
-->

# Security Architecture

| Attribute        | Value          |
| ---------------- | -------------- |
| **Project**      | [Project Name] |
| **Version**      | [0.1]          |
| **Status**       | [Draft]        |
| **Last Updated** | [YYYY-MM-DD]   |

## Sources

- [Project Overview](../overview.md)
- [Functional Requirements](../../01-requirements/functional-requirements.md)
- [Non-Functional Requirements](../../01-requirements/non-functional-requirements.md)
- [Role Mapping](../../02-planning/role-mapping.md)
- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [ADR: Authentication and Authorization Strategy](../adrs/)
- [ADR: Secrets Management Strategy](../adrs/)

## Security Objectives and Scope

This document defines the security architecture aligned with:

- **[FR-ID]** for role-based access boundaries.
- **[NFR-ID]** for OWASP Top 10 compliance.
- **[NFR-ID]** for data privacy and regulatory obligations (e.g., GDPR).

Security principles applied:

1. Defense in depth across frontend, backend, platform, and data layers.
2. Least privilege for users, services, and data paths.
3. Secure-by-default configuration with explicit allow rules.
4. Continuous monitoring and incident response readiness.

## Security Architecture Overview

The platform uses a layered model across **[Frontend Platform]**, **[Backend Platform]**, and **[Auth + DB Provider]** with **[Observability Platform]** for security telemetry.

- Identity is issued by [Auth Provider] (JWT-based or session-based).
- Access is enforced at the backend policy layer and data layer ([e.g., Row Level Security]).
- Data is encrypted in transit (TLS) and at rest (managed encryption).
- Secrets are centrally managed through environment variables and provider secret stores.

See diagram: [`../diagrams/security-architecture.mmd`](../diagrams/security-architecture.mmd)

## Authentication Strategy

### Selected Model

- **Primary:** [Auth Provider] with **[token type, e.g., JWT access tokens]** and refresh tokens.
- **OAuth 2.0 / OIDC:** [Supported through which social providers, if applicable.]
- **Session-based auth:** [Supported or not — state reason.]

### Authentication Controls

- Strong password policy configured in auth provider.
- Password hashing delegated to managed provider (modern adaptive hashing).
- Token expiry and refresh lifecycle enforced: short-lived access token + rotating refresh token.
- [Optional MFA readiness path — describe future hardening if applicable.]
- Account lockout / throttling via rate limits on login endpoints.

See diagram: [`../diagrams/authentication-flow.mmd`](../diagrams/authentication-flow.mmd)

## Authorization Model

### RBAC + Resource Attributes

- **RBAC baseline:** [List roles, e.g., `admin` and `viewer`] mapped to [FR-ID] access requirements.
- **ABAC constraints:** [e.g., resource ownership, project membership, data visibility flags.]
- **Permission model:** backend authorizes action-level permissions before executing use cases.
- **Data-level enforcement:** [e.g., Row Level Security (RLS) policies] as last-mile protection.

### Least-Privilege Rules

- [Least-privileged role] is read-only and excluded from [sensitive areas].
- [Privileged role] has CRUD scope limited to authorized boundaries.
- Service credentials are split by environment and duty (app runtime, migrations, CI).

See diagram: [`../diagrams/authorization-flow.mmd`](../diagrams/authorization-flow.mmd)

## Data Protection

### Encryption at Rest

- [Database Provider] managed encryption at rest.
- Managed encrypted backups with point-in-time recovery.
- [Object/file storage encryption at rest for uploaded artifacts where applicable.]

### Encryption in Transit

- HTTPS/TLS for all client ↔ frontend and frontend ↔ backend traffic.
- TLS for backend ↔ database connections.
- Secure cookie and token transport settings for auth interactions.

### Sensitive Data Handling

- No plaintext passwords, tokens, or API keys in logs.
- PII and sensitive content masked/redacted in logs and error payloads.
- Data retention and deletion flows aligned to [applicable regulation, e.g., GDPR / NFR-ID].

## OWASP Top 10 Compliance Mapping

| OWASP Risk Area                  | Primary Mitigations in Architecture                                             |
| -------------------------------- | ------------------------------------------------------------------------------- |
| Broken Access Control            | RBAC checks in backend + data-layer policy + least privilege defaults           |
| Cryptographic Failures           | TLS everywhere, managed encryption at rest, secret rotation policy              |
| Injection                        | Parameterized queries via ORM, strict input validation, output encoding         |
| Insecure Design                  | Threat modeling, ADR-driven design decisions, deny-by-default access            |
| Security Misconfiguration        | Environment baselines, hardened defaults, restricted CORS and headers           |
| Vulnerable Components            | Dependency scanning in CI, patch cadence, lockfile governance                   |
| Identification/Auth Failures     | Managed auth, token lifecycle controls, rate-limited login paths                |
| Software/Data Integrity Failures | Protected CI pipelines, signed commits/tags where applicable, change reviews    |
| Logging/Monitoring Failures      | [Observability Platform] monitoring, audit logs, alerting and incident runbooks |
| SSRF                             | Outbound allowlists, URL validation for any server-side fetch behavior          |

## Network Security Architecture

- Public edge terminated at [Frontend Platform] / [Backend Platform] managed TLS boundaries.
- Backend services expose only required public API ports.
- [Database/Auth Provider] access controlled via credentials, data-level policy, and platform network controls.
- Ingress restricted with CORS allowlists and rate-limiting middleware.
- Additional WAF/DDoS protections rely on managed platform controls.

## Secrets Management Strategy

- Environment-specific secrets stored in [CI/CD Tool], [Backend Platform], and [Auth + DB Provider] secret stores.
- No secrets in source control or PR artifacts.
- Rotation policy for signing materials (provider-managed) and service API keys.
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
- **AuthN/AuthZ:** token verification, claim checks, role checks, and data-layer policy enforcement.
- **Auditability:** request IDs and auth context captured for traceability.

## Security Monitoring and Incident Response

- Security-relevant events captured: auth failures, permission denials, anomalous request spikes, privileged changes.
- Incident response lifecycle: detect → triage → contain → eradicate → recover → postmortem.
- Critical incidents notify engineering/security channels with severity-based escalation.

## Secure Development and Security Testing Approach

- **SAST:** static analysis in CI for backend/frontend repos before merge.
- **Dependency scanning:** vulnerability checks on lockfiles and transitive dependencies.
- **DAST:** automated authenticated endpoint scanning in staging.
- **Penetration testing:** scoped manual testing before major releases.
- **Threat-model review cadence:** update per major feature or architecture change.

## Observability for Security

- Track authentication/authorization errors with context (without sensitive payloads).
- Monitor endpoint latency and failure rates for auth and permission checks.
- Track release regressions and spikes in security-relevant exceptions.
- Alert examples:
  - [e.g., auth failure rate > baseline for 10 minutes],
  - [e.g., repeated 403/401 anomalies on sensitive endpoints],
  - [e.g., sudden rise in validation errors that may indicate probing].

## Deployment Security

- Security gates in CI: lint/test, dependency scanning, and policy checks before deployment.
- Environment segregation: dev/staging/prod secrets managed separately.
- Preview deployments run with non-production credentials only.
- Rollback uses prior known-good deployment with schema-compatible migrations.

## ADR and Diagram References

- [ADR: Authentication and Authorization Strategy](../adrs/)
- [ADR: Secrets Management Strategy](../adrs/)
- [Security Architecture Diagram](../diagrams/security-architecture.mmd)
- [Authentication Flow](../diagrams/authentication-flow.mmd)
- [Authorization Flow](../diagrams/authorization-flow.mmd)

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

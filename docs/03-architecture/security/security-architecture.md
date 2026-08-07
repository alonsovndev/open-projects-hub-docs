# Security Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 2.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-08-04                  |

## Sources

- [F-003: Access Control and Visibility Boundaries](../../01-requirements/f-003-access-control-and-visibility-boundaries.md)
- [F-007: Admin Login](../../01-requirements/f-007-admin-login.md)
- [F-008: Account Creation](../../01-requirements/f-008-create-account.md)
- [F-009: Reset Password](../../01-requirements/f-009-reset-password.md)
- [F-010: AI Credits and API Key Management](../../01-requirements/f-010-ai-credits-and-api-key-management.md)
- [F-011: Viewer Account Management](../../01-requirements/f-011-viewer-account-management.md)
- [ADR-004: Database (Amazon RDS PostgreSQL)](../adrs/adr-004-database.md)
- [ADR-005: Authentication and Authorization Strategy](../adrs/adr-005-authentication.md)
- [ADR-006: Deployment Platform (AWS)](../adrs/adr-006-deployment-platform.md)
- [ADR-011: Secrets Management Strategy](../adrs/adr-011-secrets-management.md)
- [ADR-012: Containerization Strategy](../adrs/adr-012-containerization.md)

## Security Objectives and Scope

This document defines the security architecture for MVP scope and aligns with:

- **[F-003](../../01-requirements/f-003-access-control-and-visibility-boundaries.md)** for role-based access boundaries.
- **[F-007](../../01-requirements/f-007-admin-login.md)**, **[F-008](../../01-requirements/f-008-create-account.md)**, and **[F-009](../../01-requirements/f-009-reset-password.md)** for authentication lifecycle controls.
- **[F-010](../../01-requirements/f-010-ai-credits-and-api-key-management.md)** for secrets management regarding user API keys.
- General non-functional requirements for OWASP Top 10 controls and data handling.

Security principles applied:

1. Defense in depth across frontend, backend, platform, and data layers.
2. Least privilege for users, services, and data paths.
3. Secure-by-default configuration with explicit allow rules.
4. Continuous monitoring and incident response readiness.

## Security Architecture Overview

The platform uses a layered defense-in-depth model across **AWS infrastructure** (S3, CloudFront, App Runner, RDS) with custom authentication and comprehensive monitoring.

**Architecture Layers:**
- **Identity:** Custom JWT-based authentication module within FastAPI backend (ADR-005)
- **Access Control:** Backend RBAC checks + PostgreSQL Row Level Security (RLS) policies
- **Data Protection:** TLS in transit, AWS-managed encryption at rest (RDS, S3)
- **Network Security:** VPC isolation, security groups, private subnet for RDS
- **Secrets Management:** AWS environment variables or Secrets Manager (ADR-011)
- **Observability:** Sentry (app errors/performance) + CloudWatch (infrastructure/logs)

> **Note:** The `security-architecture.mmd` diagram needs to be created. It should visualize the layered defense model, showing how user requests traverse CloudFront, App Runner, and RDS, and how services like Sentry, CloudWatch, and IAM interact with the core infrastructure.

## Authentication Strategy

### Selected Model (MVP)

- **Primary:** Custom JWT-based authentication module within FastAPI backend (see ADR-005)
- **Token Type:** JWT access tokens (1-hour expiration, configurable)
- **Password Hashing:** bcrypt via `passlib` library (cost factor 12)
- **Token Algorithm:** HS256 with secret key stored in environment variable
- **Session Management:** Stateless JWT tokens (no server-side session storage required)
- **Refresh Tokens:** Deferred to Phase 2 (MVP uses only access tokens)

### Authentication Endpoints

- `POST /api/v1/auth/register` — User registration with email + password
- `POST /api/v1/auth/login` — Login returning JWT access token
- `POST /api/v1/auth/password-reset` — Initiate password reset flow
- `POST /api/v1/auth/password-reset-confirm` — Complete password reset

### Authentication Controls

- **Password Policy:** Minimum 8 characters, must include uppercase, lowercase, digit (enforced at validation layer per F-008)
- **Password Storage:** bcrypt hashing with automatic salt generation (never plaintext)
- **Token Lifecycle:** Short-lived access tokens (1 hour default, configurable via `JWT_EXPIRE_MINUTES`)
- **Token Validation:** JWT signature verification + expiration check on every protected route
- **Rate Limiting:** Login endpoint throttled (5 failed attempts trigger temporary account lockout per F-007)
- **Multi-Factor Authentication (MFA):** Deferred to post-MVP hardening (TOTP-based)
- **OAuth 2.0 / OIDC:** Deferred to Phase 2 (Google, GitHub social providers)

### Token Structure

```json
{
  "sub": "user-uuid",
  "email": "admin@example.com",
  "role": "admin",
  "exp": 1234567890,
  "iat": 1234567800
}
```

> **Note:** The `authentication-flow.mmd` diagram needs to be created. It should visualize the custom JWT flow described, including the client requesting a token from the `/login` endpoint and using it in the Authorization header for subsequent requests.

## Authorization Model

### RBAC + Resource Attributes

- **RBAC baseline:** `admin` and `viewer` roles mapped to F-003 access requirements
- **ABAC constraints:** Resource ownership, project membership, and data visibility flags (e.g., internal notes)
- **Permission model:** Backend authorizes action-level permissions before executing use cases
- **Data-level enforcement:** PostgreSQL Row Level Security (RLS) policies as last-mile protection

### Least-Privilege Rules

- **Viewer role:** Read-only access, excluded from internal notes and admin operations
- **Admin role:** Full CRUD scope limited to authorized project boundaries (no cross-project access)
- **Service credentials:** Split by environment (dev/prod) and duty (app runtime, migrations, CI/CD)
- **Database access:** RDS accessible only from App Runner via VPC connector (no public internet access)
- **IAM roles:** AWS IAM policies follow principle of least privilege (App Runner, RDS, S3, ECR)

### Authorization Flow

1. Client sends request with JWT token in `Authorization: Bearer <token>` header
2. Backend JWT middleware validates token signature and expiration
3. Backend extracts user ID and role from JWT claims
4. Backend permission layer checks role-based and resource-level authorization
5. PostgreSQL RLS policies enforce additional data-level access control
6. Request proceeds or returns 401 (unauthenticated) / 403 (unauthorized)

> **Note:** The `authorization-flow.mmd` diagram needs to be created. It should depict how a request is checked at the middleware, permission, and RLS layers.

## Data Protection

### Encryption at Rest

- **RDS PostgreSQL:** AWS-managed encryption at rest using AWS KMS (default encryption keys)
- **S3 Storage:** Server-side encryption (SSE-S3) for frontend static assets and file uploads
- **Backups:** Automated RDS backups encrypted at rest with same encryption keys
- **Container Images:** ECR repository encryption at rest

### Encryption in Transit

- **Client ↔ CloudFront:** HTTPS/TLS 1.2+ via AWS Certificate Manager (ACM)
- **Client ↔ App Runner:** HTTPS/TLS 1.2+ for backend API requests
- **App Runner ↔ RDS:** TLS-encrypted database connections (force SSL mode)
- **App Runner ↔ S3:** TLS for file storage operations via AWS SDK
- **Secure transport settings:** Strict-Transport-Security headers, secure cookie flags where applicable

### Sensitive Data Handling

- **No plaintext secrets:** JWT signing keys, database credentials, API keys stored in environment variables or AWS Secrets Manager
- **PII protection:** User emails and internal notes masked/redacted in logs and error payloads (Sentry `beforeSend` hook)
- **Password security:** Passwords hashed with bcrypt (cost factor 12), never logged or transmitted in plaintext
- **Token security:** JWT tokens should be stored in secure, `HttpOnly` cookies. Short expiration times are enforced.
- **Data retention:** Soft delete for projects/clients with `archived_at` timestamp (aligns with GDPR requirements)

## OWASP Top 10 Compliance Mapping

| OWASP Risk Area                  | Primary Mitigations in Architecture                                          |
| -------------------------------- | ---------------------------------------------------------------------------- |
| Broken Access Control            | RBAC checks in backend + RLS at data layer + least privilege defaults        |
| Cryptographic Failures           | TLS everywhere, managed encryption at rest, secret rotation policy           |
| Injection                        | Parameterized queries via ORM, strict input validation, output encoding      |
| Insecure Design                  | Threat modeling, ADR-driven design decisions, deny-by-default access         |
| Security Misconfiguration        | Environment baselines, hardened defaults, restricted CORS and headers        |
| Vulnerable Components            | Dependency scanning in CI, patch cadence, lockfile governance                |
| Identification/Auth Failures     | Custom auth module, token lifecycle controls, rate-limited login paths         |
| Software/Data Integrity Failures | Protected CI pipelines, signed commits/tags where applicable, change reviews |
| Logging/Monitoring Failures      | Sentry monitoring, audit logs, alerting and incident runbooks                |
| SSRF                             | Outbound allowlists, URL validation for any server-side fetch behavior       |

## Network Security Architecture

**AWS VPC Architecture:**
- **Public subnets:** CloudFront distribution, App Runner public endpoint (HTTPS ingress)
- **Private subnets:** RDS PostgreSQL (no public internet access)
- **VPC connector:** App Runner uses VPC connector to access RDS in private subnet
- **Security groups:** RDS security group restricts access to App Runner service IP ranges only
- **Network ACLs:** Default VPC ACLs with stateful firewall rules

**Ingress Controls:**
- CloudFront serves frontend static assets with edge caching and HTTPS termination
- App Runner exposes backend API via public HTTPS endpoint (protected by JWT authentication)
- No direct public access to RDS PostgreSQL (database accessible only from App Runner)
- CORS allowlist restricts API access to trusted frontend domains only
- Rate-limiting middleware on authentication and mutation endpoints

**WAF and DDoS Protection:**
- AWS CloudFront provides basic DDoS protection (AWS Shield Standard, free)
- CloudFront WAF rules (future enhancement) for advanced threat protection
- App Runner managed platform provides basic DDoS mitigation

## Secrets Management Strategy

**Secret Storage (see ADR-011):**
- **Local Development:** `.env` files (git-ignored) loaded via Docker Compose
- **CI/CD:** GitHub Actions encrypted secrets (environment-specific: dev, prod)
- **Application Runtime:** AWS App Runner environment variables or AWS Secrets Manager (optional)
- **Database Credentials:** Stored in App Runner environment configuration (not in source control)
- **JWT Signing Key:** Environment variable `JWT_SECRET_KEY` (rotated periodically)

**Secret Categories:**
- **Authentication:** JWT signing key (`JWT_SECRET_KEY`)
- **Database:** RDS connection string (`DATABASE_URL` with credentials)
- **External Services:** Sentry DSN, AWS access keys for CI/CD
- **Encryption:** Future encryption keys for sensitive fields (deferred post-MVP)

**Secret Access Controls:**
- **Prohibited:** Secrets in git commits, source code, client-side bundles, unencrypted config files, logs
- **Required:** `.gitignore` entries for all secret files, pre-commit hooks to scan for leaked secrets (e.g., `gitleaks`)
- **Rotation:** Documented procedures for credential rotation without downtime (see runbook)

**Secret Rotation Procedures:**
1. Generate new secret value (e.g., new JWT signing key)
2. Update secret in all environments (dev -> prod)
3. Deploy application updates to use new secret
4. Verify functionality in each environment
5. Decommission old secret after validation period

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
- Incident response lifecycle: detect -> triage -> contain -> eradicate -> recover -> postmortem.
- Critical incidents notify engineering/security channels with severity-based escalation.

## Secure Development and Security Testing Approach

- **SAST:** static analysis in CI for backend/frontend repos before merge.
- **Dependency scanning:** vulnerability checks on lockfiles and transitive dependencies.
- **Penetration testing:** scoped manual testing before major releases.
- **Threat-model review cadence:** update per major feature or architecture change.

## Observability (Sentry + CloudWatch)

**Security-Relevant Monitoring:**
- **Authentication failures:** Track failed login attempts, invalid JWT tokens, expired tokens
- **Authorization denials:** Monitor 403 Forbidden responses, RLS policy violations
- **Anomalous behavior:** Detect request spikes to auth endpoints, brute-force patterns
- **Privileged operations:** Log admin actions (user role changes, project deletions, configuration updates)
- **Infrastructure security:** CloudWatch alarms for RDS connectivity failures, unusual database query patterns

**Alert Examples:**
- Auth failure rate > baseline for 10 minutes (potential credential stuffing attack)
- Repeated 403 responses from single IP (potential authorization bypass attempt)
- Sudden spike in validation errors (potential input injection probing)
- RDS connection failures (potential network security issue or credential rotation problem)
- Elevated App Runner CPU/memory (potential DDoS or resource exhaustion attack)

**PII Scrubbing:**
- Sentry `beforeSend` hook removes emails, passwords, tokens from error context
- User IDs masked in breadcrumbs and session data
- HTTP headers filtered (`Authorization`, `Cookie`, `X-API-Key`)
- CloudWatch logs sanitize PII before emission (structured logging filters)

## Deployment Impact (GitHub Actions)

**Security Gates in CI/CD:**
- **SAST (Static Analysis):** Code scanning for security vulnerabilities (future: Semgrep, Bandit for Python)
- **Dependency Scanning:** Vulnerability checks on lockfiles (pip, npm) before deployment
- **Secret Scanning:** Pre-commit hooks and CI checks for leaked secrets (`gitleaks`, `git-secrets`)
- **Container Scanning:** ECR image vulnerability scanning after Docker build
- **Infrastructure Validation:** Terraform security policy checks (e.g., no public RDS instances)

**Environment Segregation:**
- Dev/production secrets managed separately in GitHub environments
- Environment-specific JWT signing keys and database credentials
- No production secrets used in development environments
- GitHub environment protection rules require manual approval for production deployments

**Deployment Security:**
- Automated Alembic migrations via init container (no manual database access)
- App Runner deployment uses immutable Docker images from ECR (tagged with Git SHA)
- CloudWatch logs capture deployment events for audit trail
- Sentry release tagging correlates errors to specific deployments

**Rollback Strategy:**
- Application rollback: Redeploy previous Docker image from ECR
- Database rollback: Forward-fix migrations preferred (backward-compatible schema changes)
- Migration strategy ensures zero-downtime rollout (see ADR-017)

## ADR and Diagram References

- [ADR-004: Database (Amazon RDS PostgreSQL)](../adrs/adr-004-database.md)
- [ADR-005: Authentication and Authorization Strategy (Custom JWT Auth)](../adrs/adr-005-authentication.md)
- [ADR-006: Deployment Platform (AWS)](../adrs/adr-006-deployment-platform.md)
- [ADR-011: Secrets Management Strategy](../adrs/adr-011-secrets-management.md)
- [ADR-012: Containerization Strategy](../adrs/adr-012-containerization.md)
- [ADR-013: Infrastructure as Code Strategy (Terraform)](../adrs/adr-013-infrastructure-as-code.md)
> **Note:** The `security-architecture.mmd` diagram needs to be created. It should visualize the layered defense model, showing how user requests traverse CloudFront, App Runner, and RDS, and how services like Sentry, CloudWatch, and IAM interact with the core infrastructure.
> **Note:** The `authentication-flow.mmd` diagram needs to be created. It should visualize the custom JWT flow described, including the client requesting a token from the `/login` endpoint and using it in the Authorization header for subsequent requests.
> **Note:** The `authorization-flow.mmd` diagram needs to be created. It should depict how a request is checked at the middleware, permission, and RLS layers.

---

## Change Log

| Date       | Version | Change Summary                                              | Author |
| ---------- | ------- | ----------------------------------------------------------- | ------ |
| 2026-02-28 | 1.0     | Initial draft — security architecture                       | —      |
| 2026-03-24 | 1.1     | Moved to security/ subfolder; links and Sources updated     | —      |
| 2026-08-04 | 2.0     | Complete rewrite for AWS migration: custom JWT auth, RDS, App Runner, VPC security, CloudWatch monitoring | —      |

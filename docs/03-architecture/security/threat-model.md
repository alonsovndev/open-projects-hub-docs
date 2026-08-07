# Threat Model

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 2.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-08-04                  |

## Sources

- [Security Architecture](./security-architecture.md)
- [F-007: Admin Login](../../01-requirements/f-007-admin-login.md)
- [F-008: Account Creation](../../01-requirements/f-008-create-account.md)
- [F-009: Reset Password](../../01-requirements/f-009-reset-password.md)
- [ADR-005: Authentication Strategy (Custom JWT Auth)](../adrs/adr-005-authentication.md)
- [ADR-006: Deployment Platform (AWS)](../adrs/adr-006-deployment-platform.md)
- [ADR-011: Secrets Management Strategy](../adrs/adr-011-secrets-management.md)
- [ADR-013: Infrastructure as Code Strategy](../adrs/adr-013-infrastructure-as-code.md)

---

## Scope and Method

- **Scope:** MVP workflows for Admin and Viewer roles across **AWS infrastructure** (S3, CloudFront, App Runner, RDS), custom JWT authentication, and CI/CD integrations.
- **Method:** STRIDE-style threat enumeration focused on high-value assets and practical mitigations.

## Assets to Protect

1. **User identities, sessions, and JWT tokens** (authentication credentials)
2. **Project requirements, internal notes, and client metadata** (business data)
3. **Secrets** (JWT signing keys, database credentials, AWS access keys, environment variables)
4. **AWS infrastructure** (RDS database, S3 buckets, App Runner service, ECR images)
5. **Deployment pipeline integrity** (GitHub Actions workflows, Terraform state, Docker images)
6. **Audit and security telemetry** (Sentry events, CloudWatch logs) used for incident response

## Threats and Attack Vectors

| Threat                        | Attack Vector                                                     | Impact                                         | Mitigations                                                                                     |
| ----------------------------- | ----------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Account takeover              | Credential stuffing, password reuse, JWT token theft              | Unauthorized data access/modification          | bcrypt password hashing, JWT short TTL (1h), rate limiting on login, future MFA                |
| JWT token compromise          | Token leaked in logs, XSS, insecure storage in browser           | Session hijacking, unauthorized API access     | Secure `HttpOnly` cookies for token storage, PII scrubbing in logs, short token expiration        |
| Weak password hashing         | Rainbow table attacks if bcrypt misconfigured                     | Bulk credential compromise                     | bcrypt cost factor 12, password policy enforcement (8+ chars, mixed case, digits)              |
| Broken authorization          | Missing role check, weak RLS policy, privilege escalation         | Viewer access to admin-only/internal notes     | Backend RBAC checks, deny-by-default RLS, authorization test coverage                          |
| Injection/XSS                 | Unsanitized input rendered or queried unsafely                    | Data leak, account/session compromise          | Pydantic typed validation, SQLAlchemy ORM parameterization, output encoding, CSP headers       |
| Secrets exposure              | Secrets in git commits, logs, CloudWatch, or Terraform state      | Full system compromise, database access        | .gitignore enforcement, pre-commit hooks (gitleaks), Terraform state encryption (S3 backend)   |
| RDS credential compromise     | Hardcoded credentials, exposed environment variables              | Direct database access, data exfiltration      | Secrets in App Runner env vars or AWS Secrets Manager, no plaintext credentials in source      |
| S3 bucket misconfiguration    | Public read/write access accidentally enabled                     | Data leak, website defacement                  | Block public access by default, bucket policies restrict to CloudFront/App Runner only         |
| IAM privilege escalation      | Overly permissive IAM policies for App Runner or CI/CD            | Lateral movement, resource access beyond scope | Principle of least privilege IAM policies, regular IAM policy audits                           |
| CloudFront cache poisoning    | Attacker manipulates cache keys to serve malicious content       | XSS, phishing, frontend compromise             | Cache key configuration, signed URLs/cookies (future), WAF rules (future)                      |
| App Runner container escape   | Vulnerability in Docker runtime or base image                     | Host access, lateral movement to RDS           | Minimal base image (python:3.12-slim), non-root user, ECR vulnerability scanning               |
| API abuse / DoS               | High request bursts on auth or mutation endpoints                 | Service degradation, account lockout           | Per-IP/per-user rate limits, AWS Shield (DDoS protection), App Runner auto-scaling             |
| CI/CD compromise              | Malicious dependency, tampered GitHub Actions workflow            | Backdoored deployment, secrets theft           | Dependency scanning, branch protections, required PR reviews, signed commits (future)          |
| Terraform state exposure      | S3 state file accessed by unauthorized party                      | Infrastructure secrets leaked, full compromise | S3 bucket encryption, access restricted via IAM policies, DynamoDB state locking               |
| Database connection pool leak | Connection pool exhaustion via slow queries or connection leaks   | Service unavailability, database lockup        | Connection pool limits (SQLAlchemy), query timeout enforcement, CloudWatch connection monitoring |
| SSRF / outbound misuse        | Backend fetches untrusted URLs, probes internal AWS metadata      | Internal metadata leak, lateral movement       | URL validation, outbound allowlists, deny AWS metadata endpoint (169.254.169.254)              |
| Monitoring blind spots        | Missing logs/alerts for auth or permission failures               | Delayed detection, longer incident time        | Sentry alerts, CloudWatch alarms, audit logging, runbook-based triage                          |
| Password reset token hijack   | Insecure password reset tokens (predictable, no expiration)       | Account takeover via password reset abuse      | Cryptographically random, single-use tokens with short expiration (15 min) per F-009.          |

## Risk Assessment Matrix

| Risk ID | Scenario                                        | Likelihood | Impact   | Risk Level | Priority |
| ------- | ----------------------------------------------- | ---------- | -------- | ---------- | -------- |
| R-01    | Account takeover via credential stuffing        | Medium     | High     | High       | P1       |
| R-02    | JWT token compromise (leaked in logs/XSS)       | Medium     | High     | High       | P1       |
| R-03    | Secrets leakage in logs/Terraform state/git     | Low        | Critical | High       | P1       |
| R-04    | RDS credential compromise                       | Low        | Critical | High       | P1       |
| R-05    | S3 bucket misconfiguration (public access)      | Medium     | High     | High       | P1       |
| R-06    | Authorization bypass exposing internal notes    | Medium     | High     | High       | P1       |
| R-07    | Injection/XSS through unsanitized content       | Medium     | Medium   | Medium     | P2       |
| R-08    | API abuse causing service instability           | Medium     | Medium   | Medium     | P2       |
| R-09    | CI/CD supply-chain compromise                   | Low        | Critical | High       | P1       |
| R-10    | Terraform state file exposure                   | Low        | Critical | High       | P1       |
| R-11    | IAM privilege escalation                        | Low        | High     | Medium     | P2       |
| R-12    | CloudFront cache poisoning                      | Low        | Medium   | Low        | P3       |
| R-13    | App Runner container escape                     | Low        | High     | Medium     | P2       |
| R-14    | SSRF through unvalidated outbound URLs          | Low        | High     | Medium     | P2       |
| R-15    | Detection failure due to weak telemetry         | Medium     | Medium   | Medium     | P2       |
| R-16    | Database connection pool exhaustion             | Medium     | Medium   | Medium     | P2       |
| R-17    | Password reset token hijack                     | Medium     | High     | High       | P1       |
| R-18    | Weak password hashing configuration             | Low        | Critical | High       | P1       |

## Mitigation Plan by Priority

### P1 (Critical - Implement in MVP)

**Authentication & Secrets:**
- Enforce strong password policy (8+ chars, mixed case, digits) and bcrypt hashing (cost factor 12).
- Implement secure password reset flow with single-use, expiring tokens per F-009.
- Implement JWT token security: short TTL (1h), secure transmission (Authorization header), and storage in `HttpOnly` cookies.
- Implement secret lifecycle controls: `.gitignore` enforcement, pre-commit hooks (gitleaks), no secrets in logs.
- Secure RDS credentials: AWS Secrets Manager or App Runner environment variables, never in source control.
- Harden CI/CD: branch protection, required PR reviews, dependency scanning.

**AWS Infrastructure:**
- S3 bucket security: Block public access by default, bucket policies restrict to CloudFront/App Runner.
- Terraform state security: S3 encryption, IAM access restrictions, DynamoDB state locking.
- IAM least privilege: Minimal IAM policies for App Runner, RDS access, ECR, S3.

**Authorization:**
- Validate authorization at API layer and RLS layer for every data path.
- Deny-by-default RLS policies for PostgreSQL.
- Backend RBAC checks before use case execution.

### P2 (High - Post-MVP Hardening)

**Application Security:**
- Maintain schema-driven validation (Pydantic) and secure encoding practices (CSP headers).
- Enforce rate limits and anomaly alerting on authentication and mutation endpoints.
- Restrict outbound requests and validate remote targets (SSRF prevention).
- Database connection pool monitoring and query timeout enforcement.

**Container & Infrastructure:**
- ECR vulnerability scanning for Docker images.
- App Runner container hardening: non-root user, minimal base image (python:3.12-slim).
- IAM policy regular audits and least-privilege reviews.

**Detection & Response:**
- Expand Sentry/CloudWatch coverage for auth failures, permission denials, anomalous patterns.
- Alert tuning based on incident learnings to reduce false positives.

### P3 (Medium - Future Enhancement)

**Advanced Protection:**
- CloudFront WAF rules for advanced threat protection.
- Multi-factor authentication (MFA) via TOTP.
- OAuth 2.0 social login providers (Google, GitHub).

## Residual Risk and Review Cadence

**Accepted Residual Risks:**
- **Zero-day vulnerabilities:** Dependency vulnerabilities in Python/JavaScript libraries until patches available.
- **Credential phishing:** User password compromise via external phishing attacks (mitigated by MFA in Phase 2).
- **AWS platform vulnerabilities:** Underlying AWS infrastructure vulnerabilities beyond customer control.
- **Insider threats:** Malicious actions by authorized admin users (mitigated by audit logging).
- **DDoS attacks:** Sophisticated DDoS beyond AWS Shield Standard protection (AWS WAF upgrade path available).

**Threat Model Review Triggers:**
- **Major architecture changes:** Migration to new services, authentication model changes, deployment platform changes.
- **New features with security impact:** OAuth integration, file upload functionality, API key management.
- **Security incidents:** Post-incident review to identify gaps and update threat model.
- **Quarterly reviews:** Scheduled threat model review every 3 months minimum.
- **Dependency updates:** Review when major framework versions change (FastAPI 1.x -> 2.x, React 18 -> 19).

**Continuous Improvement:**
- Feed incidents and near misses back into this document.
- Update mitigation strategies based on real-world attack patterns.
- Incorporate new AWS security features (e.g., GuardDuty, Security Hub).
- Review and update associated ADRs when threat landscape changes.

---

## Change Log

| Date       | Version | Change Summary                                              | Author |
| ---------- | ------- | ----------------------------------------------------------- | ------ |
| 2026-02-28 | 1.0     | Initial draft — threat model (STRIDE)                       | —      |
| 2026-03-24 | 1.1     | Moved to security/ subfolder; Sources section added         | —      |
| 2026-08-04 | 2.0     | Complete rewrite for AWS migration: added AWS-specific threats (S3, RDS, IAM, Terraform state), custom auth threats (JWT, bcrypt, password reset), expanded risk matrix to 18 threats | —      |

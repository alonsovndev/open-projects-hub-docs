# Threat Model

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-02-28                  |

## Scope and Method

## Sources

- [Security Architecture](./security-architecture.md)
- [Non-Functional Requirements](../../01-requirements/non-functional-requirements.md)
- [Architecture Solution Design](../core/architecture-solution-design.md)

---

- Scope: MVP workflows for Admin and Viewer roles across Vercel, Render, Supabase, and CI/CD integrations.
- Method: STRIDE-style threat enumeration focused on high-value assets and practical mitigations.

## Assets to Protect

1. User identities, sessions, and tokens.
2. Project requirements, internal notes, and client metadata.
3. Secrets (API keys, service credentials, environment variables).
4. Deployment pipeline integrity and release artifacts.
5. Audit and security telemetry used for incident response.

## Threats and Attack Vectors

| Threat                 | Attack Vector                                                | Impact                                     | Mitigations                                                                           |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| Account takeover       | Credential stuffing, password reuse, token theft             | Unauthorized data access/modification      | Managed auth controls, rate limiting, short token TTL, refresh rotation, optional MFA |
| Broken authorization   | Missing role check or weak RLS policy                        | Viewer access to admin-only/internal notes | RBAC checks in backend, deny-by-default RLS, authorization test cases                 |
| Injection/XSS          | Unsanitized input rendered or queried unsafely               | Data leak, account/session compromise      | Typed input validation, ORM parameterization, output encoding/CSP                     |
| Secrets exposure       | Secrets committed to repo/logs or over-privileged env access | Full system compromise                     | Secret stores only, log redaction, scoped credentials, rotation playbooks             |
| API abuse / DoS        | High request bursts on auth or mutation endpoints            | Service degradation, lockout risk          | Per-IP/per-user rate limits, platform DDoS controls, autoscaling                      |
| CI/CD compromise       | Malicious dependency or tampered workflow                    | Backdoored deployment                      | Dependency scanning, branch protections, reviewed workflow changes                    |
| SSRF / outbound misuse | Backend fetches untrusted URLs                               | Internal metadata/service probing          | URL validation, outbound allowlists, deny local metadata addresses                    |
| Monitoring blind spots | Missing logs/alerts for auth or permission failures          | Delayed detection and longer incident time | Sentry alerts, audit logging, runbook-based triage                                    |

## Risk Assessment Matrix

| Risk ID | Scenario                                     | Likelihood | Impact   | Risk Level | Priority |
| ------- | -------------------------------------------- | ---------- | -------- | ---------- | -------- |
| R-01    | Account takeover via credential stuffing     | Medium     | High     | High       | P1       |
| R-02    | Authorization bypass exposing internal notes | Medium     | High     | High       | P1       |
| R-03    | Secrets leakage in logs/config               | Low        | Critical | High       | P1       |
| R-04    | Injection/XSS through unsanitized content    | Medium     | Medium   | Medium     | P2       |
| R-05    | API abuse causing service instability        | Medium     | Medium   | Medium     | P2       |
| R-06    | CI/CD supply-chain compromise                | Low        | Critical | High       | P1       |
| R-07    | SSRF through unvalidated outbound URLs       | Low        | High     | Medium     | P2       |
| R-08    | Detection failure due to weak telemetry      | Medium     | Medium   | Medium     | P2       |

## Mitigation Plan by Priority

### P1

- Enforce strong auth controls and login throttling.
- Validate authorization at API layer and RLS layer for every data path.
- Implement secret lifecycle controls (storage, access, rotation, revocation).
- Harden CI with branch protection, required checks, and dependency scanning.

### P2

- Maintain schema-driven validation and secure encoding practices.
- Enforce rate limits and anomaly alerting on key endpoints.
- Restrict outbound requests and validate remote targets.
- Expand detection coverage and alert tuning based on incident learnings.

## Residual Risk and Review Cadence

- Residual risk remains for zero-day dependency vulnerabilities and credential phishing.
- Reassess threat model for every major architecture change or quarterly, whichever comes first.
- Feed incidents and near misses back into this document and associated ADRs.

---

## Change Log

| Date       | Version | Change Summary                                              | Author |
| ---------- | ------- | ----------------------------------------------------------- | ------ |
| 2026-02-28 | 1.0     | Initial draft — threat model (STRIDE)                       | —      |
| 2026-03-24 | 1.1     | Moved to security/ subfolder; Sources section added         | —      |

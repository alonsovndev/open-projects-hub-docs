<!-- AI AGENT INSTRUCTIONS
Purpose: Document the threat model for [Project Name] using STRIDE methodology.
Replace all [placeholder] blocks with project-specific platforms, assets, and risk assessments.
Cross-reference: security-architecture.md, non-functional-requirements.md, adrs/.
-->

# Threat Model

| Attribute        | Value          |
| ---------------- | -------------- |
| **Project**      | [Project Name] |
| **Version**      | [0.1]          |
| **Status**       | [Draft]        |
| **Last Updated** | [YYYY-MM-DD]   |

## Sources

- [Security Architecture](security-architecture.md)
- [Non-Functional Requirements](../../01-requirements/non-functional-requirements.md)
- [Architecture Solution Design](../architecture-solution-design.md)

## Scope and Method

- **Scope:** [Define MVP scope — core user workflows and system perimeter.]
  - Platforms in scope: [Frontend Platform], [Backend Platform], [Auth + DB Provider], [CI/CD Tool].
- **Method:** STRIDE-style threat enumeration focused on high-value assets and practical mitigations.

## Assets to Protect

1. [e.g., User identities, sessions, and tokens.]
2. [e.g., Core project data and sensitive notes.]
3. [e.g., Secrets — API keys, service credentials, environment variables.]
4. [e.g., Deployment pipeline integrity and release artifacts.]
5. [e.g., Audit and security telemetry used for incident response.]

## Threats and Attack Vectors

| Threat                 | Attack Vector                                                | Impact                                     | Mitigations                                                                           |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| Account takeover       | Credential stuffing, password reuse, token theft             | Unauthorized data access/modification      | Managed auth controls, rate limiting, short token TTL, refresh rotation, optional MFA |
| Broken authorization   | Missing role check or weak data-layer policy                 | Low-privilege access to restricted data    | RBAC checks in backend, deny-by-default data policy, authorization test cases         |
| Injection/XSS          | Unsanitized input rendered or queried unsafely               | Data leak, account/session compromise      | Typed input validation, ORM parameterization, output encoding/CSP                     |
| Secrets exposure       | Secrets committed to repo/logs or over-privileged env access | Full system compromise                     | Secret stores only, log redaction, scoped credentials, rotation playbooks             |
| API abuse / DoS        | High request bursts on auth or mutation endpoints            | Service degradation, lockout risk          | Per-IP/per-user rate limits, platform DDoS controls, autoscaling                      |
| CI/CD compromise       | Malicious dependency or tampered workflow                    | Backdoored deployment                      | Dependency scanning, branch protections, reviewed workflow changes                    |
| SSRF / outbound misuse | Backend fetches untrusted URLs                               | Internal metadata/service probing          | URL validation, outbound allowlists, deny local metadata addresses                    |
| Monitoring blind spots | Missing logs/alerts for auth or permission failures          | Delayed detection and longer incident time | [Observability Platform] alerts, audit logging, runbook-based triage                  |

## Risk Assessment Matrix

| Risk ID | Scenario                                              | Likelihood        | Impact                     | Risk Level   | Priority |
| ------- | ----------------------------------------------------- | ----------------- | -------------------------- | ------------ | -------- |
| R-01    | [e.g., Account takeover via credential stuffing]      | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |
| R-02    | [e.g., Authorization bypass exposing restricted data] | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |
| R-03    | [e.g., Secrets leakage in logs/config]                | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |
| R-04    | [e.g., Injection/XSS through unsanitized content]     | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |
| R-05    | [e.g., API abuse causing service instability]         | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |
| R-06    | [e.g., CI/CD supply-chain compromise]                 | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |
| R-07    | [e.g., SSRF through unvalidated outbound URLs]        | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |
| R-08    | [e.g., Detection failure due to weak telemetry]       | [Low/Medium/High] | [Low/Medium/High/Critical] | [Risk Level] | [P1/P2]  |

## Mitigation Plan by Priority

### P1 — High-Impact Controls

- [e.g., Enforce strong auth controls, login throttling, and short-lived tokens.]
- [e.g., Validate authorization at API layer and data policy layer for every data path.]
- [e.g., Implement secret lifecycle controls — storage, access, rotation, revocation.]
- [e.g., Harden CI with branch protections, required checks, and dependency scanning.]

### P2 — Standard Controls

- [e.g., Maintain schema-driven validation and secure encoding for user input/output.]
- [e.g., Enforce rate limits and anomaly alerting on key endpoints.]
- [e.g., Restrict outbound requests and validate remote targets against allowlists.]
- [e.g., Expand detection coverage and alert tuning based on incident learnings.]

## Residual Risk and Review Cadence

- Residual risk remains for [e.g., zero-day dependency vulnerabilities, credential phishing].
- Reassess threat model for every major architecture change, or [quarterly/bi-annually], whichever is sooner.
- Feed incidents and near misses back into this document and associated ADRs.

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

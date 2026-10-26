---
sidebar_position: 2
---

# Threat Model

This qualitative review covers the deployed review release: Cloudflare Workers, the Cloudflare API proxy, a single EC2 host running Caddy/FastAPI/PostgreSQL, authentication, workspace data, public review codes, and external AI processing.

The threats are organized using STRIDE categories. Likelihood and priority are engineering judgments, not measurements from an independent security assessment. Historical App Runner/RDS/CloudFront decisions are retained in the ADRs; they are not controls for this deployment.

## Assets and trust boundaries

The main assets are account credentials and sessions, workspace client/project/story data, approved backlogs exposed by access code, user-owned AI keys, platform AI credits, deployment credentials, and Terraform state.

Requests cross four important boundaries: browser → Cloudflare → API host, API → database, API → external AI/email services, and operator/CI → deployment infrastructure. The [Security Architecture](./security-architecture.md#system-boundaries) visualizes these boundaries.

## Current threats and controls

Each row names a threat, the control that exists today, and what remains unprotected.

| ID | STRIDE category | Threat | Implemented control | Residual exposure |
| --- | --- | --- | --- | --- |
| R-01 | Spoofing | Credential stuffing or password guessing | bcrypt hashes, endpoint throttling, persisted account lockout | Reused passwords and phishing remain possible; no MFA. |
| R-02 | Spoofing | Session theft or refresh-token replay | Fifteen-minute access tokens; HttpOnly browser refresh cookie; trusted-origin checks; single-use rotation | A stolen access token can work until expiry; XSS can act as the user while active. |
| R-03 | Information disclosure | Account enumeration through registration or reset | Generic responses for existing-account registration and password-reset requests | Other behavior still requires review; generic responses alone are not proof against timing analysis. |
| R-04 | Elevation of privilege | Member invokes Admin operations or accesses another workspace | Route-role dependencies and workspace-scoped repositories; foreign records return 404 | Application enforcement can regress; database RLS is absent. |
| R-05 | Information disclosure | Client-review code is guessed or shared beyond its intended audience | Random project codes, uniform miss responses, IP limit, regeneration | Anyone holding a code can read; no expiry or individual revocation. |
| R-06 | Tampering | SQL injection or unsafe rendered text | Typed validation, ORM parameterization, response/header controls | New query or rendering paths require the same checks. |
| R-07 | Information disclosure | Provider key or runtime secret leaks | AES-256-GCM key storage; masked read responses; SSM parameters | Compromise of runtime credentials or the encryption key exposes the protected boundary. |
| R-08 | Information disclosure / tampering | Origin connection is intercepted | HTTPS through Cloudflare and Caddy; ingress restricted to edge ranges | Full TLS mode does not validate the origin certificate. |
| R-09 | Denial of service | Bursts exhaust API, database, or provider capacity | Process-local IP limiter; persisted auth/key-validation budgets; credit checks | One small host, no autoscaling; limiter state is not distributed. |
| R-10 | Tampering | Prompt injection changes generated output | Note redaction, prompt delimiters, explicit review before persistence | Pattern matching is incomplete; no dedicated toxicity or prompt-leak detector. |
| R-11 | Information disclosure | Discovery notes disclose sensitive material to an AI provider | Provider selection is explicit; keys are not included in the prompt | Notes leave the application boundary; reviewers must choose what they submit. |
| R-12 | Denial of service | Host failure, volume loss, or failed migration | Reproducible image/IaC and startup migrations | No database backup or failover; application data can be lost. |
| R-13 | Tampering / elevation of privilege | Malicious dependency, workflow, or deployment artifact | Repository quality/security checks; versioned image releases; operator-controlled SSM deploy | These controls do not eliminate supply-chain or operator-credential compromise. |
| R-14 | Repudiation | Inadequate evidence for troubleshooting or attribution | Structured request-correlated logs; backend Sentry | No complete audit trail, public-reader identity, or deployed infrastructure alarms. |

Token, session, and verification-code lifetimes are documented in [Security Architecture](./security-architecture.md#authentication-strategy). The client-review access code has no automatic expiry; regenerating it revokes the old code for all readers.

## Review priorities

**Before accepting the review release:**

- Confirm the documented limitations are acceptable for demonstration data.
- Run and record authentication and workspace-isolation checks, and exercise access-code regeneration and invalid-code behavior. Record the commands, commit, environment, and observed results; a test file or checked roadmap box is not execution evidence.
- Check that logs and error responses do not expose passwords, provider keys, refresh credentials, or raw notes unnecessarily.

**Before broader use with valuable data:**

- Add a database backup and restore procedure, and a recovery path for a failed deployment or migration.
- Verify the origin certificate.
- Add durable shared throttling before adding API workers.
- Review access-code expiry or stronger sharing controls if clients need individual authorization.

MFA, richer audit records, alerting, and provider-specific moderation are options to evaluate against the intended usage, not existing features.

## Assessment limits and review triggers

No penetration-test report, formal OWASP compliance assessment, or verified incident-response service is recorded by this page. Test coverage and current pass/fail status must be taken from executed checks, not inferred from the design.

Revisit this model when the deployment topology, roles, session handling, external AI providers, data sensitivity, or public-sharing model changes. An owner, recurring review schedule, and formal risk acceptance record are **TBD**.

## References

- [Security Architecture](./security-architecture.md)
- [Deployment Architecture](../ops/deployment-architecture.md)
- [Monitoring and Observability](../ops/monitoring-observability.md)
- [Sequence Diagrams](../diagrams/sequence-diagrams.md)
- [F-003: Access Control](../../01-requirements/f-003-access-control-and-visibility-boundaries.md)
- [F-011: Client Review Access](../../01-requirements/f-011-client-review-access.md)

**Last Updated**: 2026-10-26

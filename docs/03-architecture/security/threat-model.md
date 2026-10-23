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

## Authentication and code lifetimes

| Credential | Lifetime or revocation behavior |
| --- | --- |
| Access JWT | Fifteen minutes by default; refresh tokens cannot be used as bearer access tokens. |
| Refresh session | Slides 24 hours, or seven days with `rememberMe`; refresh rotates and consumes the old token. |
| Registration verification code | Five minutes; hashed and invalidated on success or resend. |
| Member invitation code | Twenty-four hours; the invitee sets a password during verification. |
| Password-reset code | Thirty minutes; single use; resetting invalidates existing refresh sessions. |
| Client-review access code | No automatic expiry; regeneration revokes the old code for all readers. |

These lifetimes describe configured application behavior, not delivery-time or availability guarantees.

## Review priorities

### Before accepting the review release

Confirm the documented limitations are acceptable for demonstration data. Review authentication and workspace-isolation test results, check that cookies and origins match the deployed hostnames, and exercise access-code regeneration and invalid-code behavior.

Check that logs and error responses do not expose passwords, provider keys, refresh credentials, or raw notes unnecessarily. Record the commands, commit, environment, and observed results; a test file or checked roadmap box is not execution evidence.

### Before broader use with valuable data

Prioritize a database backup and restore procedure, origin-certificate verification, and recovery from a failed deployment or migration. Assess durable shared throttling before adding API workers. Review access-code expiry or stronger sharing controls if client requirements demand individual authorization.

Evaluate provider-specific moderation and output checks against actual risks and record their limitations. Human review is required even if those controls are later added. MFA, richer audit records, and alerting should be evaluated according to the intended usage rather than described as existing features.

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

**Last Updated**: 2026-10-19

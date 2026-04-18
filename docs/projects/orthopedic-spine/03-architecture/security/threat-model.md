# Orthopedic Spine — Threat Model

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-18       |
| **Owner**        | Tech Lead        |

## Sources

- [Security Architecture](./security-architecture.md)
- [Project Requirements by Feature](../../01-requirements/readme.md)
- [F-002 Inquiry and Appointment Request Flow](../../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [F-006 Admin Access and Role Boundaries](../../01-requirements/f-006-admin-access-and-role-boundaries.md)
- [Architecture Solution Design](../architecture-solution-design.md)
- [API Design Standards](../api/api-design-standards.md)

---

## Scope and Method

- **Scope:** MVP public inquiry flows plus protected admin and staff workflows for content, testimonials, and inquiry review.
- **Platforms in scope:** Vercel, Render, Supabase Auth/PostgreSQL/Storage, Cloudflare Turnstile, GitHub Actions, Resend, and Sentry.
- **Method:** STRIDE-style threat enumeration focused on the highest-value assets and most practical MVP controls.

## Assets to Protect

1. Admin and staff identities, sessions, and role claims.
2. Minimal inquiry records and related operational follow-up data.
3. Publishing and approval workflows for testimonials and public content.
4. Secrets, integration credentials, and environment configuration.
5. Build and deployment integrity across GitHub Actions and managed platforms.
6. Security telemetry used for detection, incident triage, and rollback decisions.

## Threats and Attack Vectors

| Threat | Attack Vector | Impact | Mitigations |
| ------ | ------------- | ------ | ----------- |
| Account takeover | Credential stuffing, password reuse, stolen refresh tokens | Unauthorized access to inquiry and publishing workflows | Managed auth controls, login throttling, short-lived tokens, refresh rotation, safe auth feedback |
| Broken authorization | Missing role check on an admin route or API endpoint | Staff users gain publish or unrestricted management permissions | Backend RBAC enforcement, deny-by-default policies, mirrored protected-route checks, permission-focused review |
| Privacy overreach or data leakage | Form expansion, verbose logs, unsanitized notifications, or telemetry capture | Collection or exposure of unapproved patient-adjacent data | Minimal schema, log redaction, Sentry scrubbing, explicit approval before field expansion |
| Injection or XSS | Unsanitized testimonial or inquiry content rendered in admin or public views | Session compromise, content tampering, or data exfiltration | Typed validation, safe rendering, CSP, output encoding, restricted rich-text handling |
| Spam and submission abuse | Automated form submissions or high-volume endpoint probing | Staff noise, degraded service, or blocked legitimate users | Turnstile verification, rate limiting, backend validation, anomaly alerting |
| Secrets exposure | Credentials leaked in source, CI logs, screenshots, or over-broad environment access | Platform compromise across auth, email, storage, or telemetry systems | Secret stores only, scoped credentials, access review, rotation playbooks |
| CI/CD or dependency compromise | Malicious dependency update or unreviewed workflow change | Backdoored release or secret exfiltration | Required reviews, dependency scanning, protected workflows, preview/prod environment separation |
| Monitoring blind spots | Missing alerts for auth failures, permission denials, or abuse spikes | Slower detection and longer recovery windows | Sentry alerts, structured logs, request IDs, role context, lightweight incident flow |

## Risk Assessment Matrix

| Risk ID | Scenario | Likelihood | Impact | Risk Level | Priority |
| ------- | -------- | ---------- | ------ | ---------- | -------- |
| R-01 | Account takeover of an admin account | Medium | High | High | P1 |
| R-02 | Authorization bypass gives staff publishing control | Medium | High | High | P1 |
| R-03 | Inquiry payloads or contact data leak through logs or telemetry | Medium | High | High | P1 |
| R-04 | Secrets are exposed through CI, screenshots, or environment misuse | Low | Critical | High | P1 |
| R-05 | Public inquiry spam overwhelms staff review workflows | Medium | Medium | Medium | P2 |
| R-06 | Injection or XSS through content or free-text inputs | Medium | Medium | Medium | P2 |
| R-07 | Supply-chain or workflow tampering affects deployment integrity | Low | Critical | High | P1 |
| R-08 | Security signals are missed because alerts are incomplete | Medium | Medium | Medium | P2 |

## Mitigation Plan by Priority

### P1

- Enforce strong admin/staff authentication controls and rate-limited sign-in paths.
- Apply backend authorization checks to every protected action and publishing transition.
- Keep inquiry schemas minimal and scrub sensitive values from logs, notifications, and telemetry.
- Store and rotate secrets only through approved provider secret stores and GitHub Actions secrets.
- Protect delivery workflows with required reviews and dependency scanning before release.

### P2

- Maintain strict validation, safe rendering, and browser security headers for public and admin views.
- Tune rate limits and alert thresholds for public submission endpoints after early launch traffic is observed.
- Review content and testimonial handling for XSS or unsafe embed expansion before richer editing capabilities are added.
- Expand monitoring coverage as operational workflows and provider integrations grow.

## Residual Risk and Review Cadence

- Residual risk remains around phishing, credential reuse, zero-day provider or dependency vulnerabilities, and future scope creep into more sensitive patient workflows.
- Reassess this threat model whenever role design, inquiry fields, or third-party integrations materially change.
- Review at least once per major MVP-to-post-MVP architecture update even if no incident has occurred.

## References

- [Security Architecture](./security-architecture.md)
- [Architecture Solution Design](../architecture-solution-design.md)
- [API Design Standards](../api/api-design-standards.md)

---

## Change Log

| Date       | Version | Change Summary                                         | Author    |
| ---------- | ------- | ------------------------------------------------------ | --------- |
| 2026-04-18 | 1.0     | Added initial STRIDE-style threat model for MVP scope. | Tech Lead |

# Orthopedic Spine — Monitoring & Observability Architecture

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-18       |
| **Owner**        | Tech Lead        |

## Sources

- [Project Requirements by Feature](../../01-requirements/readme.md)
- [F-002 Inquiry and Appointment Request Flow](../../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [F-005 Inquiry Review and Staff Operations](../../01-requirements/f-005-inquiry-review-and-staff-operations.md)
- [F-006 Admin Access and Role Boundaries](../../01-requirements/f-006-admin-access-and-role-boundaries.md)
- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [Deployment & Infrastructure Architecture](./deployment-architecture.md)
- [Security Architecture](../security/security-architecture.md)

---

## 1. Monitoring Strategy

Primary observability platform: **Sentry**, complemented by provider-native logs from Vercel, Render, and Supabase.

- **Frontend telemetry:** route-load failures, JavaScript errors, Web Vitals, and localized form submission issues.
- **Backend telemetry:** API latency, exception rates, protected-route denials, and inquiry submission failures.
- **Provider telemetry:** Supabase auth/database issues, Render runtime health, and Vercel delivery anomalies.
- **Operational focus:** prioritize signals that affect public trust, inquiry conversion, or protected clinic workflows over analytics-heavy product instrumentation.

## 2. Logging and Correlation

- Emit structured backend logs with request ID, route name, environment, and actor role when authenticated.
- Capture frontend breadcrumbs and release context in Sentry without exporting raw inquiry text.
- Use provider-native logs for infrastructure correlation, including deploy events, health-check failures, and auth/storage incidents.
- Propagate a shared request or trace identifier across frontend, backend, and outbound provider calls where possible.

## 3. Key Metrics and SLIs

| Area         | Metric                                               | Target |
| ------------ | ---------------------------------------------------- | ------ |
| Availability | Public site and inquiry API availability             | ≥ 99.5% monthly |
| Performance  | Public page load on key mobile journeys              | ≤ 3 seconds for core MVP pages |
| Reliability  | Inquiry submission success rate                      | ≥ 99% excluding verified abuse traffic |
| Security     | Admin sign-in and protected-route error rate         | < 1% sustained for valid authenticated users |
| Operations   | Time to detect critical submission or auth outages   | ≤ 15 minutes |

## 4. Dashboard Views

- **Launch health dashboard:** public availability, inquiry success rate, admin sign-in health, and release status.
- **Public UX dashboard:** Web Vitals, route performance, and top user-impacting frontend errors.
- **Backend operations dashboard:** request volume, p95 latency, `4xx/5xx` trends, and top failing endpoints.
- **Security and abuse dashboard:** Turnstile verification failures, repeated permission denials, and suspicious sign-in spikes.

## 5. Alerting Rules and Escalation

| Severity | Trigger                                                                | Notification Path                      | Response Window   |
| -------- | ---------------------------------------------------------------------- | -------------------------------------- | ----------------- |
| Critical | Public inquiry path unavailable, auth outage, or sustained `5xx > 5%`  | Pager + incident channel               | Immediate         |
| High     | p95 latency regression, repeated publish failures, or DB connectivity issues | Team channel + on-call engineer        | < 30 minutes      |
| Medium   | Error-rate increase after release or elevated abuse-protection failures | Team channel                           | < 4 hours         |
| Low      | Trend anomalies, noisy warnings, or non-critical content errors        | Backlog triage                         | Next business day |

Escalation path: on-call engineer or responsible developer → tech lead → clinic stakeholder communication when launch-critical paths are degraded.

## 6. Observability in the Release Workflow

- Link GitHub Actions deployments to release markers in Sentry.
- Review staging and production releases for new error spikes before closing the deployment window.
- Use post-deploy checks for the public home page, inquiry confirmation, admin sign-in, and inquiry queue access.
- Treat observability regressions as rollback inputs alongside functional smoke-test failures.

## 7. Privacy and Security Controls in Telemetry

- Exclude patient free-text inquiry content, contact details, tokens, and secrets from logs, traces, and error payloads.
- Restrict dashboard and alert access by least privilege.
- Keep telemetry retention aligned with MVP operational needs and privacy-conscious scope.
- Record actor role and route context when useful, but avoid exporting more operational detail than is needed for troubleshooting.

## 8. Risks and Trade-offs

- **SaaS-first observability:** quick to adopt, but dependent on correct data scrubbing.  
  **Mitigation:** define safe logging fields early and review them with security decisions.
- **MVP-focused metrics:** keeps noise low, but may miss non-critical experience trends.  
  **Mitigation:** expand instrumentation after launch only when it supports approved decisions.
- **Provider log fragmentation:** Vercel, Render, and Supabase logs live in different tools.  
  **Mitigation:** use Sentry as the cross-cutting incident lens and keep runbooks explicit about where to check next.

## References

- [Deployment & Infrastructure Architecture](./deployment-architecture.md)
- [CI/CD Pipeline Architecture](./ci-cd-pipeline.md)
- [Security Architecture](../security/security-architecture.md)

---

## Change Log

| Date       | Version | Change Summary                                              | Author    |
| ---------- | ------- | ----------------------------------------------------------- | --------- |
| 2026-04-18 | 1.0     | Added initial monitoring and observability architecture.    | Tech Lead |

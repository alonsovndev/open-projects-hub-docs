# Monitoring & Observability Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-02-28                  |

## 1. Monitoring Strategy

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [Deployment Architecture](deployment-architecture.md)
- [Non-Functional Requirements](../../01-requirements/non-functional-requirements.md)

---

Primary observability platform is **Sentry**, complemented by provider-native logs from Vercel, Render, and Supabase.

- **Frontend telemetry:** JavaScript errors, route performance, Web Vitals, and session context.
- **Backend telemetry:** FastAPI exceptions, API latency, throughput, and worker failures.
- **Data platform telemetry:** Supabase query/error logs and connection health.

## 2. Log Aggregation Approach

- **Application logs:** Structured JSON logs from backend services (Render).
- **Frontend runtime logs:** Captured as Sentry events and breadcrumbs.
- **Platform logs:** Vercel/Render/Supabase operational logs used for infrastructure correlation.
- **Correlation key:** request ID / trace ID propagated across frontend, backend, and async workers.

## 3. Distributed Tracing

- Use Sentry distributed tracing across:
  - Browser request start,
  - API processing in Render,
  - downstream calls to Supabase and Redis (where instrumented).
- Sampling strategy:
  - Higher sampling in staging and during release windows,
  - adaptive/lower sampling in production for cost control.

## 4. Key Metrics and Dashboards

### 4.1 Service-Level Indicators (SLIs)

| Area         | Metric                                   | Target                        |
| ------------ | ---------------------------------------- | ----------------------------- |
| Availability | Frontend/API uptime                      | ≥ 99.9% monthly               |
| Performance  | p95 API latency (core requirement flows) | ≤ 2s under MVP load           |
| Reliability  | API 5xx error rate                       | < 1% sustained                |
| Data         | Failed database operations               | 0 unhandled critical failures |
| Queue/Worker | Job failure retry exhaustion rate        | < 0.5%                        |

### 4.2 Dashboard Views

- **Executive health dashboard:** uptime, error budget consumption, release quality.
- **API dashboard:** throughput, p50/p95 latency, 4xx/5xx rates, top failing endpoints.
- **Frontend UX dashboard:** Web Vitals, route load times, top user-impacting errors.
- **Data operations dashboard:** DB connections, slow query trends, storage operation failures.

## 5. Alerting Rules and Escalation

| Severity | Trigger                                                                       | Notification Path                      | Response Window   |
| -------- | ----------------------------------------------------------------------------- | -------------------------------------- | ----------------- |
| Critical | Sustained 5xx > 5% for 5 min, auth outage, DB connectivity loss               | Pager + chat channel + incident ticket | Immediate         |
| High     | p95 latency > 2.5s for 15 min, repeated worker failures                       | Chat channel + on-call engineer        | < 30 min          |
| Medium   | Error-rate regression after release, storage failures with retries succeeding | Team channel                           | < 4 hours         |
| Low      | Non-critical warnings, trend anomalies                                        | Backlog triage                         | Next business day |

Escalation flow: on-call engineer → technical lead/architect → stakeholder communication if SLA/SLO at risk.

## 6. Performance Monitoring

- Measure end-to-end path: browser interaction → API → database.
- Track cache hit ratio and query duration to prevent database bottlenecks.
- Monitor worker backlog/processing time for asynchronous workloads.
- Validate NFR-005 targets continuously through synthetic checks and release monitoring.

## 7. Observability Integration in Delivery Workflow

- GitHub Actions annotates deployments with Sentry release metadata.
- Release health checks compare new error rates to baseline.
- Rollback decision supported by Sentry issue spikes and latency regressions.

## 8. Data Privacy and Security in Observability

- Scrub tokens, credentials, and PII before event/log export.
- Restrict observability access by role and least privilege.
- Retention configured to balance forensic needs and privacy obligations.

---

## Change Log

| Date       | Version | Change Summary                                               | Author |
| ---------- | ------- | ------------------------------------------------------------ | ------ |
| 2026-02-28 | 1.0     | Initial draft — monitoring and observability architecture    | —      |
| 2026-03-24 | 1.1     | Moved to ops/ subfolder; Sources section added               | —      |

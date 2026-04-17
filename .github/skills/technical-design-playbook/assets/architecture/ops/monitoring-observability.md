<!-- AI AGENT INSTRUCTIONS
Purpose: Document the monitoring and observability architecture for [Project Name].
Replace all [placeholder] blocks with project-specific tooling, SLI targets, and platform names.
Cross-reference: deployment-architecture.md, technology-stack.md, adrs/.
-->

# Monitoring & Observability Architecture

| Attribute        | Value          |
| ---------------- | -------------- |
| **Project**      | [Project Name] |
| **Version**      | [0.1]          |
| **Status**       | [Draft]        |
| **Last Updated** | [YYYY-MM-DD]   |

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [Deployment Architecture](deployment-architecture.md)
- [Requirements Template](../../../product-owner-playbook/assets/requirements/prd-template-by-feature.md)

## 1. Monitoring Strategy

Primary observability platform: **[Observability Platform, e.g., Sentry / Datadog / New Relic / OpenTelemetry + Grafana]**, complemented by provider-native logs from [Frontend Platform], [Backend Platform], and [Database Provider].

- **Frontend telemetry:** [e.g., JavaScript errors, route performance, Web Vitals, session context.]
- **Backend telemetry:** [e.g., exceptions, API latency, throughput, worker failures.]
- **Data platform telemetry:** [e.g., query/error logs and connection health.]

## 2. Log Aggregation Approach

- **Application logs:** Structured JSON logs from backend services.
- **Frontend runtime logs:** Captured as events and breadcrumbs in [Observability Platform].
- **Platform logs:** [Frontend Platform] / [Backend Platform] / [Database Provider] operational logs for infrastructure correlation.
- **Correlation key:** request ID / trace ID propagated across frontend, backend, and async workers.

## 3. Distributed Tracing

- Use [Observability Platform] distributed tracing across:
  - Browser request start,
  - API processing in [Backend Platform],
  - Downstream calls to [Database Provider] and [Cache/Broker] (where instrumented).
- Sampling strategy:
  - Higher sampling in staging and during release windows.
  - Adaptive/lower sampling in production for cost control.

## 4. Key Metrics and Dashboards

### 4.1 Service-Level Indicators (SLIs)

| Area         | Metric                            | Target                           |
| ------------ | --------------------------------- | -------------------------------- |
| Availability | Frontend/API uptime               | [e.g., ≥ 99.9% monthly]          |
| Performance  | p95 API latency (core flows)      | [e.g., ≤ 2s under expected load] |
| Reliability  | API 5xx error rate                | [e.g., < 1% sustained]           |
| Data         | Failed database operations        | [e.g., 0 unhandled critical]     |
| Queue/Worker | Job failure retry exhaustion rate | [e.g., < 0.5%]                   |

### 4.2 Dashboard Views

- **Executive health dashboard:** uptime, error budget consumption, release quality.
- **API dashboard:** throughput, p50/p95 latency, 4xx/5xx rates, top failing endpoints.
- **Frontend UX dashboard:** Web Vitals, route load times, top user-impacting errors.
- **Data operations dashboard:** DB connections, slow query trends, storage operation failures.

## 5. Alerting Rules and Escalation

| Severity | Trigger                                                       | Notification Path                      | Response Window   |
| -------- | ------------------------------------------------------------- | -------------------------------------- | ----------------- |
| Critical | [e.g., 5xx > 5% for 5 min, auth outage, DB connectivity loss] | Pager + chat channel + incident ticket | Immediate         |
| High     | [e.g., p95 latency > threshold for 15 min, worker failures]   | Chat channel + on-call engineer        | < 30 min          |
| Medium   | [e.g., error-rate regression after release]                   | Team channel                           | < 4 hours         |
| Low      | [e.g., non-critical warnings, trend anomalies]                | Backlog triage                         | Next business day |

Escalation flow: on-call engineer → technical lead → stakeholder communication if SLA/SLO at risk.

## 6. Performance Monitoring

- Measure end-to-end path: browser interaction → API → database.
- Track cache hit ratio and query duration to prevent database bottlenecks.
- Monitor worker backlog and processing time for asynchronous workloads.
- Validate NFR performance targets continuously through synthetic checks and release monitoring.

## 7. Observability Integration in Delivery Workflow

- [CI/CD Tool] annotates deployments with release metadata from [Observability Platform].
- Release health checks compare new error rates to baseline.
- Rollback decision supported by issue spikes and latency regressions detected post-deploy.

## 8. Data Privacy and Security in Observability

- Scrub tokens, credentials, and PII before event/log export.
- Restrict observability access by role and least privilege.
- Retention configured to balance forensic needs and privacy obligations aligned with [applicable regulation, e.g., GDPR].

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

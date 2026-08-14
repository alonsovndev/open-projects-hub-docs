# Monitoring & Observability Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.3                         |
| **Status**       | Draft                       |

## Table of Contents

- [1. Monitoring Strategy](#1-monitoring-strategy)
- [Source References](#source-references)
- [2. Log Aggregation Approach](#2-log-aggregation-approach)
- [3. Distributed Tracing](#3-distributed-tracing)
- [4. Key Metrics and Dashboards](#4-key-metrics-and-dashboards)
- [5. Alerting Rules and Escalation](#5-alerting-rules-and-escalation)
- [6. Performance Monitoring](#6-performance-monitoring)
- [7. Observability Integration in Delivery Workflow](#7-observability-integration-in-delivery-workflow)
- [8. Data Privacy and Security in Observability](#8-data-privacy-and-security-in-observability)
- [9. Cost Management and Free Tier Boundaries](#9-cost-management-and-free-tier-boundaries)

---

## 1. Monitoring Strategy

The project adopts a **hybrid monitoring strategy maintaining $0/month cost** by leveraging Sentry Free Developer plan and AWS CloudWatch Free Tier with clear responsibility boundaries.

### Primary Observability Tools

**Sentry (Free Developer Plan)** — Application-level monitoring:

- **Frontend telemetry:** JavaScript errors, React component failures, route performance, Web Vitals, session context
- **Backend telemetry:** FastAPI exceptions, API latency, throughput, endpoint error trends
- **Performance traces:** Page loads, API transactions, user interactions
- **Dashboards:** 10 custom dashboards for error tracking, performance monitoring, and release health
- **Alerting:** Email notifications for critical errors and error rate spikes

**Amazon CloudWatch (Free Tier)** — Infrastructure-level monitoring:

- **Infrastructure metrics:** App Runner CPU/memory, RDS connections/storage/queries, S3 operations (AWS service metrics, always free)
- **Application logs:** Structured JSON logs from FastAPI backend (≤5 GB/month, 7-day retention)
- **Critical alarms:** RDS storage, App Runner errors, RDS CPU (≤10 alarms)
- **NO custom metrics:** Avoid $0.30/metric/month charge; use Sentry for application-level metrics instead

### Cost Boundary Management

To maintain $0/month cost:

1. Sentry event limits managed through sampling and filtering.
2. CloudWatch log ingestion kept under 5 GB/month.
3. No CloudWatch custom metrics (use Sentry dashboards for app metrics).
4. CloudWatch alarms limited to critical infrastructure issues (≤10).
5. Log retention set to 7 days (sufficient for MVP debugging needs).

## 2. Log Aggregation Approach

- **Application logs:** Structured JSON logs from FastAPI backend sent to CloudWatch Logs (≤5 GB/month, 7-day retention).
- **Frontend runtime logs:** Captured as Sentry events, breadcrumbs, and error context.
- **Infrastructure logs:** CloudWatch Logs for App Runner, RDS error logs for database issues.
- **Correlation key:** A request ID / trace ID is propagated across the frontend (Sentry) and backend (CloudWatch + Sentry) to correlate events.

**Log Format Strategy:**

- Backend logs use structured JSON with timestamp, level, event type, request_id, user_id, and context.
- Logs include error messages and sanitized stack traces (PII scrubbed).
- CloudWatch log groups are organized by service (App Runner, RDS) with 7-day retention to stay within the free tier.

## 3. Distributed Tracing

- Use Sentry performance monitoring for end-to-end transaction traces:
  - Browser request start (Sentry Browser SDK)
  - API processing in App Runner (Sentry FastAPI integration)
  - Database queries (captured in Sentry transaction spans)
- **Sampling strategy:**
  - A configurable sample rate will be used to stay within Sentry Free Developer event limits.
  - Adaptive sampling will be used in production for cost control.
- **Note:** AWS X-Ray distributed tracing is deferred to post-MVP as it adds complexity and cost.

## 4. Key Metrics and Dashboards

### 4.1 Service-Level Indicators (SLIs)

| Area           | Metric                                   | Target                        | Monitoring Tool            |
| -------------- | ---------------------------------------- | ----------------------------- | -------------------------- |
| Availability   | Frontend/API uptime                      | ≥ 99.9% monthly               | Sentry + CloudWatch        |
| Performance    | p95 API latency (core requirement flows) | ≤ 2s under MVP load           | Sentry                     |
| Reliability    | API 5xx error rate                       | < 1% sustained                | Sentry + CloudWatch Alarms |
| Data           | Failed database operations               | 0 unhandled critical failures | CloudWatch (RDS metrics)   |
| Infrastructure | RDS storage utilization                  | < 80%                         | CloudWatch Alarms          |
| Infrastructure | App Runner CPU utilization               | < 70%                         | CloudWatch                 |

### 4.2 Dashboard Views

**Sentry Dashboards (10 custom dashboards available):**

- **Error health dashboard:** Error count by type, affected users, release correlation.
- **API performance dashboard:** p50/p95/p99 latency, throughput, top slow endpoints.
- **Frontend UX dashboard:** Web Vitals (LCP, FID, CLS), route load times, user-impacting errors.
- **Release quality dashboard:** Error rate trends by release, new vs. regressed errors.

**CloudWatch Dashboards (within free tier: 3 dashboards, 50 metrics/month):**

- **Infrastructure health dashboard:** App Runner CPU/memory, RDS CPU/storage/connections, S3 usage.
- **Cost monitoring dashboard:** RDS storage trends, CloudWatch log volume, API request volume.
- **Critical alarms dashboard:** Active alarms, alarm history, SNS notification status.

As part of the implementation, these Sentry and CloudWatch dashboards should be created and linked here for easy access.

### 4.3 Dashboard Mockups

#### Sentry — Error Health Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  ERROR HEALTH DASHBOARD                        Last 24 hours  ▼ │
├────────────┬────────────────────┬───────────────┬───────────────┤
│            │                    │               │               │
│  ┌───────┐ │  ┌──────────────┐  │  TOP ERRORS   │  AFFECTED     │
│  │ ERROR │ │  │              │  │               │  USERS        │
│  │ COUNT │ │  │  ▁▂█▃▁▂▄▁▁▃  │  │  1. TypeError │               │
│  │       │ │  │  (24h trend) │  │     ··· 142   │  ┌──────────┐ │
│  │  342  │ │  │              │  │  2. ValueError│  │          │ │
│  │       │ │  └──────────────┘  │     ···· 89   │  │   127    │ │
│  │ ▼ 12% │ │                    │  3. AuthError │  │          │ │
│  └───────┘ │  ┌──────────────┐  │     ·· 31     │  │  ▼ 8%    │ │
│            │  │ ERRORS BY    │  │  4. DBError   │  └──────────┘ │
│            │  │ ENVIRONMENT  │  │     · 18      │               │
│            │  │ production █ │  └───────────────┘  ┌──────────┐ │
│            │  │ local      ▂ │                     │ ERRORS   │ │
│            │  └──────────────┘                     │ BY       │ │
│            │                                       │ RELEASE  │ │
│            │                                       │ v1.0 ███ │ │
│            │                                       │ v0.9 ▂▁  │ │
│            │                                       └──────────┘ │
└────────────┴────────────────────────────────────────────────────┘
```

#### Sentry — API Performance Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  API PERFORMANCE DASHBOARD                     Last 24 hours  ▼ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LATENCY (p50 / p95 / p99)          THROUGHPUT (req/min)        │
│  ┌────────────────────────────┐     ┌─────────────────────┐     │
│  │  2.0s ┤             ╭─     │     │                     │     │
│  │  1.5s ┤    ╭──╮╭──╯ ╰─     │     │  ▁▂█▅▃▂▁▂▄▃▁▂▃      │     │
│  │  1.0s ┤  ╭─╯  ╰╯     ╰──   │     │  · avg 42 req/min   │     │
│  │  0.5s ┤──╯                 │     │  · peak 87 req/min  │     │
│  │  0.0s ┤                    │     └─────────────────────┘     │
│  └────────────────────────────┘                                 │
│  ── p95  ── p50  ·· p99                                         │
│                                                                 │
│  TOP SLOW ENDPOINTS                    ENDPOINT ERROR RATES     │
│  ┌──────────────────────────────┐     ┌─────────────────────┐   │
│  │  POST /api/projects  1.8s    │     │  GET  /health   0%  │   │
│  │  GET  /api/reqs      1.2s    │     │  POST /projects 1.2%│   │
│  │  POST /api/auth      0.9s    │     │  GET  /reqs     0.5%│   │
│  │  GET  /api/clients   0.4s    │     │  POST /auth     0.3%│   │
│  └──────────────────────────────┘     └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### Sentry — Frontend UX Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND UX DASHBOARD                         Last 24 hours  ▼ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  WEB VITALS                              ROUTE LOAD TIMES       │
│  ┌──────────┬──────────┬──────────┐     ┌──────────────────┐    │
│  │   LCP    │   FID    │   CLS    │     │  /dashboard  2.1s│    │
│  │  ┌────┐  │  ┌────┐  │  ┌────┐  │     │  /projects   1.8s│    │
│  │  │2.4s│  │  │42ms│  │  │.08 │  │     │  /reqs       1.4s│    │
│  │  │ ✔  │  │  │ ✔  │  │  │ ✔  │  │     │  /clients    0.9s│    │
│  │  └────┘  │  └────┘  │  └────┘  │     └──────────────────┘    │
│  └──────────┴──────────┴──────────┘                             │
│                                                                 │
│  USER-IMPACTING ERRORS                   JS ERROR TREND         │
│  ┌──────────────────────────────┐       ┌─────────────────┐     │
│  │  React render error   ·· 23  │       │  ▁▁▂█▃▁▁▁▂▁▁    │     │
│  │  API timeout (ui)     ·· 15  │       │  · total: 127   │     │
│  │  Network failure      · 8    │       │  · ▼ 15% vs 7d  │     │
│  │  Auth redirect loop   · 3    │       └─────────────────┘     │
│  └──────────────────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

#### Sentry — Release Quality Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│  RELEASE QUALITY DASHBOARD                    Current release  ▼ │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ERROR RATE BY RELEASE                   NEW vs REGRESSED        │
│  ┌──────────────────────────────┐       ┌───────────────────┐    │
│  │  v1.1.0 ██████████  2.3%     │       │  New errors  █ 14 │    │
│  │  v1.0.1 ██████      1.1%     │       │  Regressed   ▂  3 │    │
│  │  v1.0.0 ████████    1.8%     │       │  Resolved    ·  8 │    │
│  └──────────────────────────────┘       └───────────────────┘    │
│                                                                  │
│  DEPLOYMENT TIMELINE                    ADOPTION                 │
│  ┌──────────────────────────────┐       ┌───────────────────┐    │
│  │  v1.1.0 ···· Aug 07 14:32   │       │  v1.1.0  ████ 94%  │    │
│  │  v1.0.1 ··   Aug 05 09:15   │       │  v1.0.1  ▂      5% │    │
│  │  v1.0.0 ·    Aug 01 16:00   │       │  v1.0.0  ▁      1% │    │
│  └──────────────────────────────┘       └───────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

#### CloudWatch — Infrastructure Health Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  INFRASTRUCTURE HEALTH                         Last 3 hours   ▼ │
├─────────────────────────────┬───────────────────────────────────┤
│                             │                                   │
│  APP RUNNER CPU             │  APP RUNNER MEMORY                │
│  ┌─────────────────────┐    │  ┌─────────────────────┐          │
│  │  100% ┤             │    │  │  512M ┤             │          │
│  │   70% ┤──────────── │    │  │  384M ┤    ╭─╮╭──╮  │          │
│  │   50% ┤  ╭──╮╭─╮    │    │  │  256M ┤  ╭─╯ ╰╯  ╰─ │          │
│  │   25% ┤──╯  ╰╯ ╰──  │    │  │  128M ┤──╯          │          │
│  │    0% ┤             │    │  │    0M ┤             │          │
│  └─────────────────────┘    │  └─────────────────────┘          │
│  · avg 38% · peak 62%       │  · avg 210M · peak 345M           │
│                             │                                   │
│                             │  APP RUNNER 5XX ERRORS            │
│  RDS CPU                    │  ┌─────────────────────┐          │
│  ┌─────────────────────┐    │  │  ▁▁▁▁▁▁▁▁▁▁▁▂       │          │
│  │  100% ┤             │    │  │  · total: 3         │          │
│  │   50% ┤  ▁▁▁▁▁▁▁▁▁  │    │  │  · rate: 0.02%      │          │
│  │   25% ┤             │    │  └─────────────────────┘          │
│  │    0% ┤──────────── │    │                                   │
│  └─────────────────────┘    │  RDS CONNECTIONS                  │
│  · avg 8%                   │  ┌─────────────────────┐          │
│                             │  │  ▁▁▂▁▁▂▁▁▂▁▁▂       │          │
│  RDS STORAGE                │  │  · avg 6 / max 20   │          │
│  ┌─────────────────────┐    │  └─────────────────────┘          │
│  │  20G ┤ ██████████░░ │    │                                   │
│  │  10G ┤ ██████████░░ │    │                                   │
│  │   0G ┤ ██████████░░ │    │                                   │
│  └─────────────────────┘    │                                   │
│  · used 4.2G / 20G (21%)    │                                   │
└─────────────────────────────┴───────────────────────────────────┘
```

#### CloudWatch — Cost Monitoring Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  COST MONITORING                                This month    ▼ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SERVICE BREAKDOWN ($)                   LOG VOLUME (GB)        │
│  ┌──────────────────────┐              ┌────────────────────┐   │
│  │  RDS        $8.20 ██ │              │  ▁▁▂▁▁▂▁▁▂▁▂▃      │   │
│  │  AppRunner  $3.80 █  │              │  · MTD: 2.1 GB     │   │
│  │  S3         $0.40 ·  │              │  · limit: 5 GB     │   │
│  │  CloudFront $0.30 ·  │              │  · projected: 3.8G │   │
│  │  ECR        $0.10 ·  │              └────────────────────┘   │
│  │  ─────────────────── │                                       │
│  │  TOTAL     $12.80    │              API REQUEST VOLUME       │
│  └──────────────────────┘              ┌────────────────────┐   │
│                                        │  ▁▂▅▃▄▆▅▃▂▄▅▆      │   │
│  FREE TIER STATUS                      │  · avg 2.4K/day    │   │
│  ┌──────────────────────┐              │  · peak 5.1K/day   │   │
│  │  RDS        ██ 42%   │              └────────────────────┘   │
│  │  CloudWatch ·   18%  │                                       │
│  │  S3         ·    8%  │              BILLING ALARM            │
│  │  Total      ██ 35%   │              ┌────────────────────┐   │
│  │  (of free tier limit)│              │  Threshold: $20    │   │
│  └──────────────────────┘              │  Current:  $12.80  │   │
│                                        │  Status:   ● OK    │   │
│                                        └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### CloudWatch — Critical Alarms Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  CRITICAL ALARMS                                Last 24 hours ▼ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ALARM STATUS SUMMARY                     ALARM HISTORY         │
│  ┌────────────────────┐                 ┌──────────────────┐    │
│  │  ● OK       8      │                 │  ▁▁▁▁▁▁▁▁▁▁▁█    │    │
│  │  ● ALARM    1      │                 │  1 alarm event   │    │
│  │  ● INSUFF   1      │                 │  · Aug 07 03:15  │    │
│  └────────────────────┘                 │  · RDS CPU >80%  │    │
│                                         │  · resolved 03:22│    │
│  ALARM DETAILS                          └──────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  NAME               │ STATE   │ THRESHOLD  │ CURRENT   │     │
│  ├──────────────────────┼─────────┼────────────┼──────────┤     │
│  │  RDS CPU >80%       │ ● OK    │ >80%       │ 12%       │     │
│  │  RDS Storage >80%   │ ● OK    │ >80%       │ 21%       │     │
│  │  RDS Connections     │ ● OK    │ >15        │ 6        │     │
│  │  App Runner 5xx     │ ● OK    │ >5%        │ 0.02%     │     │
│  │  App Runner CPU     │ ● OK    │ >70%       │ 38%       │     │
│  │  Log Volume >4GB    │ ● OK    │ >4GB       │ 2.1GB     │     │
│  │  Billing >$20       │ ● OK    │ >$20       │ $12.80    │     │
│  │  DB Connections     │ ◆ INSUFF│ —          │ —         │     │
│  │  S3 Error Rate      │ ● OK    │ >1%        │ 0.01%     │     │
│  │  Certificate Expiry │ ● OK    │ <30 days   │ 87 days   │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                 │
│  SNS NOTIFICATION STATUS                                        │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  Topic: critical-alarms                                │     │
│  │  Subscriber: solo-dev@example.com                      │     │
│  │  Last delivered: Aug 07 03:15 (RDS CPU >80%)           │     │
│  │  Delivery status: ● Healthy                            │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## 5. Alerting Rules and Escalation

| Severity | Trigger                                                                    | Notification Path                           | Tool                       | Response Window   |
| -------- | -------------------------------------------------------------------------- | ------------------------------------------- | -------------------------- | ----------------- |
| Critical | Sustained 5xx > 5% for 5 min, auth outage, DB connectivity loss            | Email (Sentry/CloudWatch) + incident ticket | CloudWatch Alarms + Sentry | Immediate         |
| High     | p95 latency > 2.5s for 15 min, repeated endpoint failures after deployment | Email (Sentry) + alert review               | Sentry                     | < 30 min          |
| Medium   | Error-rate regression after release, RDS storage >80%, CPU >80% for 10 min | Email (CloudWatch)                          | CloudWatch Alarms          | < 4 hours         |
| Low      | Non-critical warnings, trend anomalies, frontend validation errors         | Sentry issue tracking                       | Sentry                     | Next business day |

**Escalation flow:**

- The solo developer receives all alerts via email.
- **Critical:** Immediate response required (infrastructure or auth failure).
- **High:** Review within 30 minutes (performance degradation or deployment issues).
- **Medium:** Review within 4 hours (resource utilization warnings).
- **Low:** Triage during business hours (expected errors, non-critical issues).

**Alert Configuration:**

- **CloudWatch Alarms (≤10 alarms):** RDS storage, RDS CPU, App Runner 5xx errors.
- **Sentry Alerts:** Critical error rate spikes, new error types introduced by release, performance degradation.

## 6. Performance Monitoring

- **End-to-end tracing:** Sentry tracks a request from the browser interaction, through the API call, to the database query.
- **Frontend performance:** Web Vitals (LCP, FID, CLS), route navigation times, component render performance.
- **Backend performance:** API endpoint latency (p50/p95/p99), transaction duration, slow database queries.
- **Infrastructure performance:** CloudWatch tracks RDS query latency, App Runner request duration, and connection pool health.
- **Performance targets:** Validate NFR-005 targets (p95 API latency ≤2s) through Sentry performance monitoring and CloudWatch metrics.

**Monitoring Strategy:**

- Sentry provides application-level performance insights (API endpoints, page loads).
- CloudWatch provides infrastructure-level performance data (RDS query time, App Runner CPU/memory).
- Correlation through request IDs allows tracing performance issues from the frontend to the database.

## 7. Observability Integration in Delivery Workflow

- **GitHub Actions deployment integration:**
  - Sentry release creation with Git commit SHA for error correlation.
  - CloudWatch log group tagging with deployment metadata.
- **Release health monitoring:**
  - Sentry compares post-deployment error rates to pre-deployment baseline.
  - CloudWatch Alarms trigger on infrastructure anomalies after deployment.
- **Rollback decision support:**
  - Sentry issue spikes and error rate increases indicate application-level problems.
  - CloudWatch alarm triggers indicate infrastructure-level problems (CPU, memory, RDS).
- **Pre-deployment checks:**
  - Validate Sentry DSN configuration in CI/CD.
  - Verify CloudWatch log group and alarm configuration via Terraform `plan`.

## 8. Data Privacy and Security in Observability

- **PII scrubbing (Sentry):**
  - Configure `beforeSend` hook to remove emails, passwords, tokens from error context.
  - Mask user IDs in breadcrumbs and session data.
  - Filter sensitive HTTP headers (`Authorization`, `Cookie`, `X-API-Key`).
- **Log sanitization (CloudWatch):**
  - Structured logging filters PII before log emission.
  - No credentials, tokens, or secrets are ever written to application logs.
- **Access control:**
  - Sentry: Solo developer account with full access.
  - CloudWatch: AWS IAM policies restrict access to logs and metrics based on the principle of least privilege.
- **Retention policies:**
  - Sentry: 30-day retention (Free Developer plan default).
  - CloudWatch: 7-day log retention (sufficient for MVP, minimizes cost and privacy exposure).

---

## 9. Cost Management and Free Tier Boundaries

### Sentry Free Developer Plan Limits

- **One user account** (sufficient for solo developer).
- **Event limits:** Monitor event consumption through Sentry dashboard; implement sampling if approaching limits.
- **10 dashboards:** Allocate to error tracking, performance, release health, and feature-specific monitoring.
- **Email alerts:** Configure for critical errors only to avoid alert fatigue.

### CloudWatch Free Tier Limits

- **5 GB log ingestion/month:** Monitor via CloudWatch Logs Insights; target 1-3 GB/month with 7-day retention.
- **10 alarms:** Limit to critical infrastructure issues (RDS storage, RDS CPU, App Runner 5xx errors).
- **No custom metrics:** Avoid $0.30/metric/month charge; use Sentry for application-level metrics instead.
- **3 dashboards, 50 metrics/month:** Use for infrastructure health, cost monitoring, and critical alarms.

### Cost Monitoring Actions

1. Weekly review of CloudWatch log ingestion volume.
2. Monthly review of Sentry event consumption.
3. Adjust log verbosity or sampling if approaching limits.
4. Set up CloudWatch billing alarm for any unexpected charges.

## Source References

- [Deployment Architecture](./deployment-architecture.md)
- [Requirements Home](../../01-requirements/README.md)
- [ADR-009: Monitoring and Observability Strategy](../adrs/adr-009-monitoring-observability.md)

---

**Last Updated**: 2026-08-07

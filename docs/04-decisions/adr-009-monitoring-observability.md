# ADR-009: Monitoring and Observability Strategy

- **Status**: Accepted
- **Date**: 2026-02-28
- **Updated**: 2026-10-26 (Sentry only; CloudWatch dropped)

> **Note (2026-10-26):** CloudWatch is not used. Sentry is the only monitoring and observability tool. The App Runner, RDS and CloudFront metrics, alarms and log groups of the original hybrid design do not exist in the deployed system. The host runs one Docker Compose stack; health is checked through `/health/live` and `/health/ready`, logs are container logs, cost is watched through AWS Budgets emails, and Sentry is active in both the API and the web app. Sentry is used to inspect errors manually; no Sentry alert rules are configured. See [ADR-021](./adr-021-low-cost-single-host-deployment.md) and [Monitoring and Observability](../03-architecture/ops/monitoring-observability.md).

## Context

The project requires unified visibility into frontend/backend failures and performance regressions during MVP development and operations. Key constraints and requirements include:

- **Budget constraint**: $0/month for monitoring and observability tools
- **Solo developer**: One person (tech lead) managing all aspects of the system
- **Full-stack visibility**: Need to monitor React frontend and FastAPI backend
- **Developer productivity**: Fast error debugging is critical for rapid MVP iteration
- **Operational simplicity**: Minimal setup and maintenance overhead for a single-person team

The original design also assumed AWS managed services (App Runner, RDS, S3, CloudFront) that needed infrastructure monitoring. AWS CloudWatch charges for custom metrics beyond 10 free metrics ($0.30/metric/month). Sentry offers a Free Developer plan for solo developers with full error monitoring, performance tracing, 10 dashboards, and email alerts.

## Decision

Use **Sentry (Free Developer Plan)** as the only monitoring and observability tool, at $0/month:

- Frontend error tracking (JavaScript exceptions, React errors)
- Backend error tracking (FastAPI exceptions, API errors)
- Performance monitoring (page loads, API latency, transaction traces)
- Custom dashboards (10 available)
- Email alerts (available on the Free plan; not configured)
- Release tracking and error correlation

Host health uses the API's `/health/live` and `/health/ready` checks and Docker health checks. Cost is watched with AWS Budgets emails. No other monitoring service is adopted.

### Cost Boundary Rules

To maintain $0/month:
1. **Sentry**: Stay within Free Developer plan limits (one user account, event limits TBD)
2. **Application-level metrics**: Route to Sentry dashboards

## Consequences

### Positive

- **Zero monthly cost**: Sentry stays within its free tier for MVP scale
- **Best-in-class error debugging**: Sentry provides stack traces, user context, breadcrumbs, and session replay
- **Developer productivity**: Rich error context and dashboards accelerate debugging for solo developer
- **One tool to learn and check**: A single place to look during incident response
- **No operational overhead**: Fully managed service with no self-hosted infrastructure
- **Release correlation**: Sentry release tagging connects errors to deployments
- **Performance insights**: Sentry traces identify slow API endpoints and frontend bottlenecks
- **Scalable foundation**: Clear path to paid tiers if MVP grows beyond free tier limits

### Negative

- **No infrastructure metrics**: Host CPU, memory and disk are not collected; a host problem shows up only as application errors or a failed health check
- **No log retention**: Container logs stay on the host and are lost if the volume is replaced
- **No uptime check**: Nothing polls the public URL, so an outage is noticed by a user or the next deploy
- **Single-vendor dependence**: Error tracking and alerting depend on the Sentry Free Developer plan and its event limits (must manage with sampling/filtering if exceeded)
- **PII scrubbing required**: Must configure Sentry to filter sensitive data (emails, tokens, user IDs)
- **No distributed tracing across services**: Sentry traces cover the API and the web app only
- **No alert rules configured**: Errors are seen only when someone opens Sentry

## Alternatives Considered

1. **Sentry only (no CloudWatch)** — **selected**
   - Provides unified application monitoring with excellent developer experience
   - Originally not selected because Sentry has no infrastructure metrics (RDS health, App Runner CPU/memory, S3 storage) that matter for managed AWS services. Those services are no longer deployed ([ADR-021](./adr-021-low-cost-single-host-deployment.md)); the single EC2 host has no managed-service metrics to collect, so the gap is accepted

2. **Hybrid Sentry + CloudWatch (free tier)**
   - The original decision: Sentry for application errors, CloudWatch for AWS service metrics, logs and up to 10 alarms
   - Not selected for the deployed system because the managed services it monitored are not deployed and a second tool adds setup and checking overhead for one maintainer

3. **CloudWatch only (no Sentry)**
   - Considered for simplicity and single-tool approach
   - Not selected because CloudWatch lacks rich error context (no stack traces, user sessions, breadcrumbs) making debugging slower for solo developer

4. **Paid monitoring services (Datadog, New Relic, Dynatrace)**
   - Considered for comprehensive all-in-one APM solution
   - Not selected due to high cost ($75-200+/month) exceeding $0 budget constraint

5. **Self-hosted observability stack (Prometheus + Grafana, ELK stack)**
   - Considered for full control and extensibility
   - Not selected due to high operational burden (cluster management, scaling, backups, maintenance) inappropriate for solo developer on MVP timeline

6. **AWS X-Ray for distributed tracing**
   - Considered for deep performance insights and request tracing across services
   - Not selected for MVP due to additional SDK integration complexity and costs; can be added post-MVP if tracing needs emerge

7. **CloudWatch with custom metrics (pay $0.30/metric)**
   - Considered for unified AWS-native monitoring
   - Not selected because paying for 10-20 custom metrics ($3-6/month) violates $0 budget constraint; Sentry Free provides equivalent metrics at no cost

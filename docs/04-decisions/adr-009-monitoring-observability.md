# ADR-009: Monitoring and Observability Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The project requires visibility into frontend and backend failures during MVP development and operations. Key constraints and requirements include:

- **Budget constraint**: $0/month for monitoring and observability tools
- **Solo developer**: One person (tech lead) managing all aspects of the system
- **Full-stack visibility**: Need to monitor the React frontend and the FastAPI backend
- **Developer productivity**: Fast error debugging is critical for rapid MVP iteration
- **Operational simplicity**: Minimal setup and maintenance overhead for a single-person team

The deployed system is one Docker Compose stack on a single host ([ADR-021](./adr-021-low-cost-single-host-deployment.md)), so there are no managed-service metrics to collect. Sentry offers a Free Developer plan for solo developers with error monitoring, performance tracing, dashboards and email alerts.

## Decision

Use **Sentry (Free Developer Plan)** as the only monitoring and observability tool, at $0/month, in both the API and the web app:

- Frontend error tracking (JavaScript exceptions, React errors)
- Backend error tracking (FastAPI exceptions, API errors)
- Performance monitoring (page loads, API latency, transaction traces)
- Custom dashboards (10 available)
- Email alerts (available on the Free plan; no alert rules are configured)

Host health uses the API's `/health/live` and `/health/ready` checks and Docker health checks. Logs are container logs. Cost is watched with AWS Budgets emails. No other monitoring service is adopted. Sentry is inspected manually. See [Monitoring and Observability](../03-architecture/ops/monitoring-observability.md).

### Cost Boundary Rules

To maintain $0/month:
1. **Sentry**: Stay within Free Developer plan limits (one user account, event limits TBD)
2. **Application-level metrics**: Route to Sentry dashboards

## Consequences

### Positive

- **Zero monthly cost**: Sentry stays within its free tier for MVP scale
- **Strong error debugging**: Sentry provides stack traces, user context, breadcrumbs, and session replay
- **Developer productivity**: Rich error context and dashboards accelerate debugging for a solo developer
- **One tool to learn and check**: A single place to look during incident response
- **No operational overhead**: Fully managed service with no self-hosted infrastructure
- **Performance insights**: Sentry traces identify slow API endpoints and frontend bottlenecks
- **Scalable foundation**: Clear path to paid tiers if the MVP grows beyond free tier limits

### Negative

- **No infrastructure metrics**: Host CPU, memory and disk are not collected; a host problem shows up only as application errors or a failed health check
- **No log retention**: Container logs stay on the host and are lost if the volume is replaced
- **No uptime check**: Nothing polls the public URL, so an outage is noticed by a user or the next deploy
- **No alert rules configured**: Errors are seen only when someone opens Sentry
- **Single-vendor dependence**: Error tracking depends on the Sentry Free Developer plan and its event limits (must manage with sampling/filtering if exceeded)
- **PII scrubbing required**: Sentry must be configured to filter sensitive data (emails, tokens, user IDs)
- **No distributed tracing across services**: Sentry traces cover the API and the web app only

## Alternatives Considered

1. **Paid monitoring services (Datadog, New Relic, Dynatrace)**
   - Considered for a comprehensive all-in-one APM solution.
   - Not selected due to high cost ($75-200+/month) exceeding the $0 budget constraint.

2. **Self-hosted observability stack (Prometheus + Grafana, ELK stack)**
   - Considered for full control and extensibility.
   - Not selected due to the operational burden (cluster management, scaling, backups, maintenance) inappropriate for a solo developer on the MVP timeline.

# ADR-009: Monitoring and Observability Strategy

- **Status**: Accepted
- **Date**: 2026-02-28
- **Updated**: 2026-08-04 (Zero-cost strategy with Sentry Free Developer + CloudWatch Free Tier)

## Context

The project requires unified visibility into frontend/backend failures, performance regressions, and infrastructure health during MVP development and operations. Key constraints and requirements include:

- **Budget constraint**: $0/month for monitoring and observability tools
- **Solo developer**: One person (tech lead) managing all aspects of the system
- **AWS infrastructure**: App Runner, RDS, S3, CloudFront requiring infrastructure monitoring
- **Full-stack visibility**: Need to monitor React frontend, FastAPI backend, and PostgreSQL database
- **Developer productivity**: Fast error debugging is critical for rapid MVP iteration
- **Operational simplicity**: Minimal setup and maintenance overhead for a single-person team

AWS CloudWatch charges for custom metrics beyond 10 free metrics ($0.30/metric/month), while AWS service metrics (App Runner, RDS, S3) are always free. Sentry offers a Free Developer plan for solo developers with full error monitoring, performance tracing, 10 dashboards, and email alerts.

## Decision

Adopt a **hybrid monitoring strategy maintaining $0/month cost** by leveraging free tiers with clear responsibility boundaries:

**Sentry (Free Developer Plan)** — Primary application monitoring:
- Frontend error tracking (JavaScript exceptions, React errors)
- Backend error tracking (FastAPI exceptions, API errors)
- Performance monitoring (page loads, API latency, transaction traces)
- Custom dashboards (10 available)
- Email alerts for critical errors
- Release tracking and error correlation

**Amazon CloudWatch (Free Tier)** — Infrastructure monitoring only:
- AWS service metrics (App Runner, RDS, S3, CloudFront) — always free
- Application logs with structured JSON (≤5 GB/month)
- Critical infrastructure alarms (≤10 alarms)
- NO custom metrics (avoid $0.30/metric/month charge)

### Cost Boundary Rules

To maintain $0/month:
1. **Sentry**: Stay within Free Developer plan limits (one user account, event limits TBD)
2. **CloudWatch**: Use only free AWS service metrics; avoid custom metrics
3. **Logs**: Keep ingestion under 5 GB/month with 7-day retention
4. **Alarms**: Limit to 10 alarms (within free tier)
5. **Application-level metrics**: Route to Sentry dashboards, not CloudWatch custom metrics


## Consequences

### Positive

- **Zero monthly cost**: Both tools stay within free tiers for MVP scale
- **Best-in-class error debugging**: Sentry provides stack traces, user context, breadcrumbs, and session replay
- **Comprehensive infrastructure visibility**: CloudWatch native integration with all AWS services (App Runner, RDS, S3, CloudFront)
- **Developer productivity**: Rich error context and dashboards accelerate debugging for solo developer
- **No operational overhead**: Fully managed services with no self-hosted infrastructure
- **Email alerting**: Both tools support email notifications for critical issues
- **Release correlation**: Sentry release tagging connects errors to deployments
- **Performance insights**: Sentry traces identify slow API endpoints and frontend bottlenecks
- **Scalable foundation**: Clear path to paid tiers if MVP grows beyond free tier limits

### Negative

- **Two tools to learn**: Developer must understand both Sentry and CloudWatch interfaces
- **Event limit risk**: Sentry Free Developer plan has event limits (must manage with sampling/filtering if exceeded)
- **CloudWatch custom metric restriction**: Cannot use CloudWatch for application-level custom metrics without incurring $0.30/metric cost
- **Log volume constraint**: Must keep CloudWatch log ingestion under 5 GB/month (requires 7-day retention and careful logging)
- **PII scrubbing required**: Must configure Sentry to filter sensitive data (emails, tokens, user IDs)
- **No distributed tracing**: AWS X-Ray would provide deep tracing but adds complexity and cost
- **CloudWatch query limitations**: Logs Insights less powerful than specialized log analysis tools (no advanced regex, limited aggregations)
- **Alert tuning needed**: Risk of alert fatigue if thresholds not properly configured
- **Dual monitoring context**: Must check both tools during incident response


## Alternatives Considered

1. **CloudWatch only (no Sentry)**
   - Considered for simplicity and single-tool approach
   - Not selected because CloudWatch lacks rich error context (no stack traces, user sessions, breadcrumbs) making debugging slower for solo developer

2. **Sentry only (no CloudWatch)**
   - Considered for unified application monitoring with excellent developer experience
   - Not selected because Sentry doesn't provide infrastructure metrics (RDS health, App Runner CPU/memory, S3 storage) which are critical for AWS-hosted applications

3. **Paid monitoring services (Datadog, New Relic, Dynatrace)**
   - Considered for comprehensive all-in-one APM solution
   - Not selected due to high cost ($75-200+/month) exceeding $0 budget constraint

4. **Self-hosted observability stack (Prometheus + Grafana, ELK stack)**
   - Considered for full control and extensibility
   - Not selected due to high operational burden (cluster management, scaling, backups, maintenance) inappropriate for solo developer on MVP timeline

5. **AWS X-Ray for distributed tracing**
   - Considered for deep performance insights and request tracing across services
   - Not selected for MVP due to additional SDK integration complexity and costs; can be added post-MVP if tracing needs emerge

6. **CloudWatch with custom metrics (pay $0.30/metric)**
   - Considered for unified AWS-native monitoring
   - Not selected because paying for 10-20 custom metrics ($3-6/month) violates $0 budget constraint; Sentry Free provides equivalent metrics at no cost

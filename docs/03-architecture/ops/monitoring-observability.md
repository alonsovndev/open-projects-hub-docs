---
sidebar_position: 3
---

# Monitoring & Observability Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 2.0                         |
| **Status**       | Accepted                    |

## 1. Monitoring Strategy

The deployed system is one EC2 host running Caddy, the API and PostgreSQL, with Cloudflare in front ([Deployment Architecture](./deployment-architecture.md)). It serves a handful of users for a master's-project review, so the monitoring is deliberately small and costs nothing beyond the host.

The original design (a hybrid of Sentry and CloudWatch with SLO dashboards for App Runner, RDS and CloudFront, see [ADR-009](../../04-decisions/adr-009-monitoring-observability.md)) was written for managed services that are not deployed. This page describes what actually exists. No availability SLO is promised: there is a single host, no high availability and no uptime probe.

## 2. What Is Monitored Today

| Concern | Mechanism | Where |
| --- | --- | --- |
| Is the API process alive | `GET /health/live` | Host-local; not routed through Cloudflare (Caddy forwards only `/v1/*`) |
| Is the API ready (database reachable) | `GET /health/ready` | Host-local; used by the container health check and the deploy script |
| Does the public path work | The deploy script's smoke test: unauthenticated `GET /v1/users/me/profile` must return a JSON 4xx through Cloudflare | `scripts/deploy-release.sh` (API repository) |
| Application errors | Sentry SDK in the API | Active in production through the `SENTRY_DSN` SSM parameter (`N/A` disables it; local, dev and test configs keep it off). Trace sample rate 0.1, health checks excluded |
| Container state | Docker health checks (`api`, `postgres`) and `restart: unless-stopped` | `deploy/compose.prod.yml` |
| Cost | Two AWS Budgets: one on real (post-credit) charges, one on gross usage | Terraform, `envs/prod` |

The web app reports render errors and route-change traces to its own Sentry project (`open-projects-hub-web`). It is active in production because `VITE_SENTRY_DSN` is set at build time (Cloudflare Builds environment variable); a local build without it leaves the SDK a no-op. The trace sample rate is 0.1 and cookies, headers, request bodies and user info are not collected.

## 3. Logs

- The API writes structured JSON to the console (`logging.format: json`, `level: INFO`), with a request-logging middleware that adds a request identifier.
- Docker keeps the container output on the host. Read it over SSM Session Manager or Run Command with `docker compose logs api`.
- Logs are not shipped anywhere and have no retention policy beyond Docker's local log files on the root volume.
- Sensitive values (passwords, tokens, API keys) must never be logged; see section 5.

Useful log events when debugging sign-up: `email.send_failed` (a bad `SMTP_*` value or sender) because failed sends are logged but the API still answers 200 ([ADR-024](../../04-decisions/adr-024-email-delivery-with-resend.md)).

## 4. Health Checks and Alerting

- **Health:** the checks above run on the host. Nothing external polls the public URL.
- **Alerting:** the only alerts are the AWS Budgets emails. There are no CloudWatch alarms, no pager and no uptime monitor.
- **Escalation:** the single maintainer reads the logs and redeploys the previous tag if a release misbehaves ([CI/CD Pipeline](./ci-cd-pipeline.md), rollback).

## 5. Data Privacy in Observability

- Never log secrets, passwords, refresh tokens, verification codes or provider API keys. User AI keys are encrypted at rest ([ADR-018](../../04-decisions/adr-018-user-api-key-encryption.md)).
- Raw requirement notes sent for refinement are not persisted ([ADR-019](../../04-decisions/adr-019-no-persisted-draft-stories.md)) and should not be copied into logs.
- The API's Sentry setup sends no default PII or local variables and strips headers, query strings and the Client Review access code from request URLs and transaction names before sending. Free-text exception and log messages are not scrubbed, so they must not interpolate the access code.
- Client IP for rate limiting comes from `CF-Connecting-IP`, set by Caddy as `X-Forwarded-For`.

## 6. Cost

The [deployment architecture](./deployment-architecture.md) retains the original cost estimate for compute, volume, and public IPv4. The design uses Sentry and AWS Budgets without dedicated monitoring infrastructure. Current pricing, account allowances, and actual billed usage were not verified during this review.

## 7. Gaps and Future Work

| Gap | Impact | Possible next step |
| --- | --- | --- |
| No external uptime probe | An outage is noticed by a user or by the next deploy | A free external HTTP monitor on `https://api-oph.alonsovndev.com/v1/...` (TBD) |
| No log shipping or retention | Logs are lost if the volume is replaced | Ship to a free log service or CloudWatch Logs (TBD cost) |
| No source maps uploaded for the web app | Browser stack traces in Sentry are minified | Add `@sentry/vite-plugin` with an auth token in the Cloudflare build (TBD) |
| Single host, no backups | A host or disk failure loses the data | See the limits in the [Deployment Architecture](./deployment-architecture.md) |

## Source References

- [ADR-009: Monitoring and Observability](../../04-decisions/adr-009-monitoring-observability.md) (original design, amended)
- [ADR-021: Low-Cost Single-Host Deployment](../../04-decisions/adr-021-low-cost-single-host-deployment.md)
- [Deployment Architecture](./deployment-architecture.md)
- [CI/CD Pipeline](./ci-cd-pipeline.md)

---

**Last Updated**: 2026-10-19

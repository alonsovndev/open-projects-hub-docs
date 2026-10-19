---
sidebar_position: 3
---

# Monitoring & Observability Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 2.0                         |
| **Status**       | Accepted                    |

## Table of Contents

- [1. Monitoring Strategy](#1-monitoring-strategy)
- [2. What Is Monitored Today](#2-what-is-monitored-today)
- [3. Logs](#3-logs)
- [4. Health Checks and Alerting](#4-health-checks-and-alerting)
- [5. Data Privacy in Observability](#5-data-privacy-in-observability)
- [6. Cost](#6-cost)
- [7. Gaps and Future Work](#7-gaps-and-future-work)
- [Source References](#source-references)

---

## 1. Monitoring Strategy

The deployed system is one EC2 host running Caddy, the API and PostgreSQL, with Cloudflare in front ([Deployment Architecture](./deployment-architecture.md)). It serves a handful of users for a master's-project review, so the monitoring is deliberately small and costs nothing beyond the host.

The original design (a hybrid of Sentry and CloudWatch with SLO dashboards for App Runner, RDS and CloudFront, see [ADR-009](../../04-decisions/adr-009-monitoring-observability.md)) was written for managed services that are not deployed. This page describes what actually exists. No availability SLO is promised: there is a single host, no high availability and no uptime probe.

## 2. What Is Monitored Today

| Concern | Mechanism | Where |
| --- | --- | --- |
| Is the API process alive | `GET /health/live` | Host-local; not routed through Cloudflare (Caddy forwards only `/v1/*`) |
| Is the API ready (database reachable) | `GET /health/ready` | Host-local; used by the container health check and the deploy script |
| Does the public path work | The deploy script's smoke test: unauthenticated `GET /v1/users/me/profile` must return a JSON 4xx through Cloudflare | `scripts/deploy-release.sh` (API repository) |
| Application errors | Sentry SDK in the API | Active only when the `SENTRY_DSN` SSM parameter holds a real DSN (`N/A` disables it); whether it is set today is TBD. Trace sample rate 0.1 |
| Container state | Docker health checks (`api`, `postgres`) and `restart: unless-stopped` | `deploy/compose.prod.yml` |
| Cost | Two AWS Budgets: one on real (post-credit) charges, one on gross usage | Terraform, `envs/prod` |

The web app has no error-tracking SDK; browser errors are visible only in the browser console.

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
- If Sentry is enabled, configure it to scrub request bodies and headers before sending.
- Client IP for rate limiting comes from `CF-Connecting-IP`, set by Caddy as `X-Forwarded-For`.

## 6. Cost

The host and its volume are the only recurring cost (about $12.85/month at the list prices recorded in the [Deployment Architecture](./deployment-architecture.md), paid from the Free Plan credits). Monitoring adds nothing: Sentry's free plan is the only optional extra, CloudWatch is limited to the free default EC2 metrics, and the budgets are free.

## 7. Gaps and Future Work

| Gap | Impact | Possible next step |
| --- | --- | --- |
| No external uptime probe | An outage is noticed by a user or by the next deploy | A free external HTTP monitor on `https://api-oph.alonsovndev.com/v1/...` (TBD) |
| No log shipping or retention | Logs are lost if the volume is replaced | Ship to a free log service or CloudWatch Logs (TBD cost) |
| Sentry DSN possibly unset (TBD) | Backend exceptions are only in the container logs | Create a Sentry project and set `SENTRY_DSN` in SSM |
| No frontend error tracking | Browser-side failures are invisible | Add the Sentry browser SDK (not planned for the review) |
| Single host, no backups | A host or disk failure loses the data | See the limits in the [Deployment Architecture](./deployment-architecture.md) |

## Source References

- [ADR-009: Monitoring and Observability](../../04-decisions/adr-009-monitoring-observability.md) (original design, amended)
- [ADR-021: Low-Cost Single-Host Deployment](../../04-decisions/adr-021-low-cost-single-host-deployment.md)
- [Deployment Architecture](./deployment-architecture.md)
- [CI/CD Pipeline](./ci-cd-pipeline.md)

---

**Last Updated**: 2026-10-19

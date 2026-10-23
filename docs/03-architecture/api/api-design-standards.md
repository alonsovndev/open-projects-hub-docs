---
sidebar_position: 1
---

# API Design Standards

These conventions describe the implemented REST API. The backend's generated OpenAPI schema and route/DTO definitions are the source of truth for exact field constraints; the [API Contract](./api-contract.md) provides a catalog and worked examples.

## Paths, methods, and versioning

- Business endpoints use `/v1`; health endpoints are `/health`, `/health/live`, and `/health/ready`.
- Resource paths use plural nouns, such as `/clients`, `/projects`, and `/stories`. Personal resources use `/users/me/...`.
- `GET` reads, `POST` creates or performs a named action, `PATCH` updates selected fields, and `DELETE` removes a resource. Archive/reactivate are explicit project actions rather than aliases for deletion.
- Breaking public-contract changes require a deliberate compatibility decision. No prior API major version or automated multi-version deprecation mechanism is implemented in this release.

## Request and response formats

JSON DTOs generally expose `camelCase` properties. Query-parameter names and pagination metadata have existing exceptions; use the exact endpoint schema rather than converting names automatically. Dates use `YYYY-MM-DD`; timestamps are ISO 8601 with a UTC offset or `Z`.

List endpoints normally take `offset` (default 0) and `limit` (default 20, maximum 100). A representative envelope is:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "per_page": 20
}
```

The client list uses `perPage` instead of `per_page`; the public review response uses `stories` and `total` rather than this envelope. Markdown export returns `text/markdown` with an attachment filename.

## Errors and status codes

Most application errors return a string `detail`. Some handlers add machine-readable fields:

```json
{
  "detail": "No AI credits remaining. Add your own API key to continue unlimited refinements.",
  "code": "INSUFFICIENT_CREDITS"
}
```

`code` is not universal, and request identifiers travel in the `X-Request-ID` response header rather than a required JSON envelope. The process-local IP limiter uses a separate body:

```json
{
  "error": "Rate limit exceeded: 5 per 1 minute"
}
```

| Status | Meaning in this API |
| --- | --- |
| `200`, `201`, `204` | Successful action/read, creation, or deletion. |
| `400`, `422` | Domain/input validation; the exact handler determines the status. |
| `401`, `403` | Missing/invalid authentication or insufficient role; login can also require email verification. |
| `402` | Platform AI credits exhausted. |
| `404` | Missing record, foreign-workspace record, or unknown review code. |
| `409` | Lifecycle or workspace-limit conflict. |
| `429` | IP throttle, account lockout, or a persisted validation/code-request limit. |
| `500`, `502` | Unexpected application failure or refinement-provider failure. |

Provider-key errors include provider/reason fields and `promptsKeyUpdate`. Refinement failures preserve `rawNotes` for retry. Clients should handle these documented variants, not assume a single nested `error` object.

## Authentication and authorization

Protected routes require `Authorization: Bearer <access token>`. Access JWTs last 15 minutes by default and carry the caller's workspace. An Admin manages the team; Admins and Members edit workspace clients, projects, and stories.

The browser uses `X-Session-Mode: cookie` with a trusted `Origin`. Refresh credentials travel only in the HttpOnly cookie in that mode. Other clients send/receive refresh tokens in JSON. Refresh is single-use with rotation; see [Authentication Strategy](../security/security-architecture.md#authentication-strategy).

Authentication and account-recovery endpoints are public where required. The Client Review route is the anonymous route that exposes project data, limited to approved stories for the supplied access code.

Workspace-scoped queries use the workspace resolved from the verified token; a foreign record returns `404`. Database RLS is not enabled.

## Rate limiting and observability

The process-local IP limiter defaults to 100 requests per minute; endpoint overrides differ. Login also has a persisted account-failure counter, verification/reset issuance has per-account windows, and provider-key validation has a five-attempt hourly budget. These mechanisms are distinct and should not be described as one uniform per-user policy.

The public Client Review route limits requests to 30 per minute per IP. In-memory IP counters reset on process restart and do not coordinate across workers. Some application limit responses carry `Retry-After`; clients should use it when supplied.

Logs include a request identifier. Backend errors are reported to Sentry; no CloudWatch alarms are deployed. See [Monitoring and Observability](../ops/monitoring-observability.md).

## Contract verification

The backend provides a generated OpenAPI artifact, and endpoint tests cover selected contracts and access rules. These are not a general automated proof of backward compatibility. Regenerate and compare the schema when changing a public interface, and record executed checks and results.

## References

- [API Contract](./api-contract.md)
- [Security Architecture](../security/security-architecture.md)
- [Database Design](../database/database-design.md)
- [Feature Requirements](../../01-requirements/README.md)

**Last Updated**: 2026-10-19

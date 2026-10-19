---
sidebar_position: 1
---

# API Design Standards

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 2.0                         |
| **Status**       | Accepted                    |

## Table of Contents

- [Source References](#source-references)
- [API Style](#api-style)
- [Versioning Strategy](#versioning-strategy)
- [Error Handling Standards](#error-handling-standards)
- [Response Format Conventions](#response-format-conventions)
- [Authentication and Authorization Patterns](#authentication-and-authorization-patterns)
- [Rate Limiting and Throttling](#rate-limiting-and-throttling)
- [Observability](#observability)
- [Deployment Impact (GitHub Actions)](#deployment-impact-github-actions)

## API Style

- **Primary style:** REST JSON APIs for all core business workflows.
- **GraphQL stance:** Not adopted for MVP to reduce operational and governance complexity.
- **Resource naming:** plural, kebab-case nouns in paths (e.g., `/v1/projects`, `/v1/requirements`).
- **Self/current-user resources:** the authenticated caller's own data is addressed as `/{plural-resource}/me/...` (e.g., `/v1/users/me/profile`, `/v1/users/me/password`) — never a singular resource root.
- **Relationship access:** nested routes only when ownership is explicit (e.g., `/v1/projects/{projectId}/requirements`).
- **Action endpoints:** avoid verbs in URLs; non-CRUD actions use sub-resources (e.g., `/approve`, `/archive`) only when domain-specific behavior is required.
- **HTTP methods:** `GET` (read), `POST` (create), `PUT` (full resource replace — all fields required in the request), `PATCH` (partial update — fields optional), `DELETE` (soft-archive/remove).

## Versioning Strategy

- **Default:** URL-based semantic major versioning: `/v1/...`.
- **Change policy:**
  - non-breaking changes (optional fields, new endpoints) stay in the same major version,
  - breaking contract changes require a new major version (`v2`).
- **Deprecation window:** maintain previous major version for at least one release cycle with explicit deprecation notice in API documentation.

## Error Handling Standards

- **Transport semantics:** use standard HTTP status codes.
- **Minimum status code set:** `200`, `201`, `204`, `400`, `401`, `402`, `403`, `404`, `409`, `422`, `429`, `500`. `402` is reserved specifically for AI-credit exhaustion on the platform provider.
- **Canonical error payload:**

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project was not found.",
    "details": [],
    "requestId": "req_12345"
  }
}
```

- **Rules:**
  - `code` is stable and machine-readable,
  - `message` is human-readable and safe for clients,
  - `details` is optional structured validation/context data,
  - `requestId` is required for traceability across logs and Sentry events.

## Response Format Conventions

- **Format:** `application/json; charset=utf-8`.
- **Field naming:** `camelCase` for request and response payload fields.
- **Datetime format:** ISO 8601 UTC (`YYYY-MM-DDTHH:MM:SSZ`), for example `2024-01-15T14:30:00Z`.
- **Boolean fields:** use `is/has/can` prefixes where meaningful (e.g., `isArchived`).
- **Collection envelope and pagination (offset-based for MVP):**

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 125,
    "totalPages": 7
  }
}
```

- **Pagination defaults:** `page=1`, `pageSize=20`, maximum `pageSize=100`.

## Authentication and Authorization Patterns

- **Authentication:** FastAPI custom auth module issues JWTs; APIs require `Authorization: Bearer <token>` for protected routes (see ADR-005).
- **Authorization model:** hybrid RBAC + data-level policies.
  - API layer enforces role permissions (Admin/Member capabilities; the public Client Review route is the only anonymous exception).
  - Repositories filter every query by the caller's workspace; another workspace's records return 404.
- **Token requirements:** short-lived access tokens (15 minutes) and single-use rotating refresh tokens, delivered as an `HttpOnly` cookie in browser sessions.
- **Service trust boundary:** backend validates JWT signature, expiration, and required claims on every protected request.

## Rate Limiting and Throttling

- **Baseline policy (per authenticated user/IP):**
  - `60 requests/minute` for standard read/write endpoints,
  - stricter limits for auth-sensitive endpoints (5 attempts per 15 min on login, 3 verification code resends per 15 min, 3 password reset requests per 15 min).
- **Limit response:** return `429 Too Many Requests` with `Retry-After` header.
- **Response body for throttling:** same canonical error format with `code=RATE_LIMIT_EXCEEDED`.
- **Implementation approach:** backend middleware with database-backed counters and endpoint-level guardrails.

## Observability

- Include the request identifier (`X-Request-ID`) in logs and error context.
- Backend errors go to Sentry when a DSN is configured; the deployed host has no CloudWatch alarms. See [Monitoring and Observability](../ops/monitoring-observability.md).

## Deployment Impact (GitHub Actions)

- Validate API design changes on every pull request.
- Enforce backward-compatibility checks before merging breaking API changes.
- Rollback strategy: revert to prior release and maintain previous major API version during deprecation window.
- Manage environment variables/secrets for auth, rate-limiting configuration, and Sentry DSN per environment.

## Source References

- [Architecture Solution Design](../core/architecture-solution-design.md)
- [Technology Stack](../core/technology-stack.md)
- [API Contract](./api-contract.md)
- [Feature Requirements](../../01-requirements/README.md)
- [Security Architecture](../security/security-architecture.md)

---

**Last Updated**: 2026-09-08

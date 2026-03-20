# API Design Standards

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-02-28                  |

## Sources

- [Project Overview](../overview.md)
- [Functional Requirements](../1-requirements/functional-requirements.md)
- [Non-Functional Requirements](../1-requirements/non-functional-requirements.md)
- [Role Mapping](../2-planning/role-mapping.md)
- [Phased Roadmap](../2-planning/phased-roadmap.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [Technology Stack](./technology-stack.md)

## API Style

- **Primary style:** REST JSON APIs for all core business workflows.
- **GraphQL stance:** Not adopted for MVP to reduce operational and governance complexity.
- **Resource naming:** plural, kebab-case nouns in paths (e.g., `/api/v1/projects`, `/api/v1/requirements`).
- **Relationship access:** nested routes only when ownership is explicit (e.g., `/api/v1/projects/{projectId}/requirements`).
- **Action endpoints:** avoid verbs in URLs; non-CRUD actions use sub-resources (e.g., `/approve`, `/archive`) only when domain-specific behavior is required.

## Versioning Strategy

- **Default:** URL-based semantic major versioning: `/api/v1/...`.
- **Change policy:**
  - non-breaking changes (optional fields, new endpoints) stay in the same major version,
  - breaking contract changes require a new major version (`v2`).
- **Deprecation window:** maintain previous major version for at least one release cycle with explicit deprecation notice in API documentation.

## Error Handling Standards

- **Transport semantics:** use standard HTTP status codes.
- **Minimum status code set:** `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500`.
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

- **Authentication:** Supabase Auth issues JWTs; APIs require `Authorization: Bearer <token>` for protected routes.
- **Authorization model:** hybrid RBAC + data-level policies.
  - API layer enforces role permissions (Admin/Viewer capabilities).
  - Supabase Row Level Security (RLS) enforces least-privilege data access.
- **Token requirements:** short-lived access tokens with refresh-token rotation managed by Supabase.
- **Service trust boundary:** backend validates JWT signature, expiration, audience, and required claims on every protected request.

## Rate Limiting and Throttling

- **Baseline policy (per authenticated user/IP):**
  - `60 requests/minute` for standard read/write endpoints,
  - stricter limits for auth-sensitive endpoints (login/password reset).
- **Limit response:** return `429 Too Many Requests` with `Retry-After` header.
- **Response body for throttling:** same canonical error format with `code=RATE_LIMIT_EXCEEDED`.
- **Implementation approach:** backend middleware + Redis-backed counters when caching layer is enabled.

## Observability (Sentry)

- Attach `requestId`, endpoint, actor role, and version (`v1`) as Sentry context for API errors.
- Track key API metrics in Sentry Performance: error rate, p95 latency, and 429 frequency by route.
- Alert on sustained spikes in `5xx` and `429` responses.
- Use release tagging from CI to correlate regressions with deployments.

## Deployment Impact (GitHub Actions)

- Validate OpenAPI contract generation and API linting/checks on every PR.
- Enforce backward-compatibility checks before merging breaking API changes.
- Publish API version/release notes on deployment to staging/production.
- Rollback strategy: revert to prior release and maintain previous major API version during deprecation window.
- Manage environment variables/secrets for auth, rate-limiting stores, and Sentry DSN per environment.

# API Design Standards Template (AI-Ready)

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |

## How to Use (AI Agent Instructions)

- These standards apply to all REST endpoints in the project; deviations require an ADR.
- Update the Error Handling section whenever a new domain error code is introduced.
- Keep versioning decisions consistent with the API Contract document.

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [API Contract](./api-contract.md)
- [Feature Requirements Template](../../../product-owner-playbook/assets/requirements/prd-template-by-feature.md)

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

- **Authentication:** [Auth Provider] issues JWTs; APIs require `Authorization: Bearer <token>` for protected routes.
- **Authorization model:** hybrid RBAC + data-level policies.
  - API layer enforces role permissions ([e.g., Admin/Viewer capabilities]).
  - [Database-level policy, e.g., Row Level Security] enforces least-privilege data access.
- **Token requirements:** short-lived access tokens with refresh-token rotation managed by the auth provider.
- **Service trust boundary:** backend validates JWT signature, expiration, audience, and required claims on every protected request.

## Rate Limiting and Throttling

- **Baseline policy (per authenticated user/IP):**
  - `[e.g., 60 requests/minute]` for standard read/write endpoints,
  - stricter limits for auth-sensitive endpoints (login/password reset).
- **Limit response:** return `429 Too Many Requests` with `Retry-After` header.
- **Response body for throttling:** same canonical error format with `code=RATE_LIMIT_EXCEEDED`.
- **Implementation approach:** backend middleware + [cache/rate-limit store, e.g., Redis] counters.

## Observability

- Attach `requestId`, endpoint, actor role, and API version as [Observability Platform] context for API errors.
- Track key API metrics: error rate, p95 latency, and 429 frequency by route.
- Alert on sustained spikes in `5xx` and `429` responses.
- Use release tagging from CI/CD to correlate regressions with deployments.

## Deployment

- Validate OpenAPI contract generation and API linting on every PR.
- Enforce backward-compatibility checks before merging breaking API changes.
- Publish API version/release notes on deployment to staging/production.
- Rollback strategy: revert to prior release and maintain previous major API version during deprecation window.
- Manage environment variables/secrets for auth, rate-limit stores, and observability per environment.

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

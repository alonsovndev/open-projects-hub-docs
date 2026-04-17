# Orthopedic Spine — API Design Standards

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Tech Lead        |

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [Feature Requirements Index](../../01-requirements/readme.md)
- [F-002 Inquiry and Appointment Request Flow](../../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [F-004 Admin Content and Testimonial Management](../../01-requirements/f-004-admin-content-and-testimonial-management.md)
- [F-006 Admin Access and Role Boundaries](../../01-requirements/f-006-admin-access-and-role-boundaries.md)

---

## API Style

- **Primary style:** REST JSON APIs for all business workflows (public content, inquiry intake, and admin operations).
- **Backend runtime:** FastAPI (Python 3.12) — request and response contracts defined with Pydantic 2.x models.
- **GraphQL stance:** not adopted; REST keeps the contract simple for an MVP team and a well-scoped domain.
- **Resource naming:** plural, kebab-case nouns in paths (e.g., `/api/v1/services`, `/api/v1/inquiries`).
- **Relationship access:** nested routes only when ownership is unambiguous (e.g., `/api/v1/testimonials/{id}/approve`).
- **Action sub-resources:** non-CRUD state transitions use a descriptive sub-resource rather than verbs on the base path (e.g., `/approve`, `/archive`).
- **Locale parameter:** bilingual resources accept an optional `?locale=es|en` query parameter; default is `en` when omitted.

## Versioning Strategy

- **Default:** URL-based major versioning: `/api/v1/...`.
- **Change policy:**
  - non-breaking additions (optional fields, new endpoints) remain in the same major version,
  - breaking contract changes (removed or renamed required fields, altered semantics) require a new major version.
- **Deprecation window:** the previous major version is kept for at least one release cycle with a deprecation notice in this document and in response headers (`Deprecation: <date>`).

## Error Handling Standards

- **Transport semantics:** standard HTTP status codes govern all error responses.
- **Minimum status code set:** `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500`.
- **Canonical error payload:**

```json
{
  "error": {
    "code": "INQUIRY_NOT_FOUND",
    "message": "The requested inquiry could not be found.",
    "details": [],
    "requestId": "req_abc123"
  }
}
```

- **Field rules:**
  - `code` — stable, uppercase snake-case, machine-readable; must not change across patch releases.
  - `message` — human-readable; safe to surface in UI; must not leak stack traces or internal paths.
  - `details` — optional array of structured validation errors (field name + message pairs); used for `400`/`422` responses.
  - `requestId` — required on every error response; correlates logs, Sentry events, and client-side error reports.
- **Validation errors (422):** FastAPI Pydantic validation failures must be mapped to this canonical shape before leaving the presentation layer; do not forward raw Pydantic error payloads to clients.

## Response Format Conventions

- **Content type:** `application/json; charset=utf-8`.
- **Field naming:** `camelCase` for all request and response payload fields.
- **Datetime format:** ISO 8601 UTC (`YYYY-MM-DDTHH:MM:SSZ`), for example `2026-04-17T14:30:00Z`.
- **Boolean fields:** use `is`/`has`/`can` prefixes where meaningful (e.g., `isApproved`, `isPublished`).
- **Empty deletions:** `204 No Content` with no body for successful delete operations.
- **Collection envelope and pagination (offset-based for MVP):**

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 55,
    "totalPages": 3
  }
}
```

- **Pagination defaults:** `page=1`, `pageSize=20`, maximum `pageSize=100`.
- **Locale-aware fields:** bilingual string pairs use a nested `locales` object when both values are returned together:

```json
{
  "id": "svc_01",
  "locales": {
    "en": { "name": "Spine Rehabilitation", "description": "..." },
    "es": { "name": "Rehabilitación de Columna", "description": "..." }
  },
  "isPublished": true
}
```

## Authentication and Authorization Patterns

- **Authentication mechanism:** Supabase Auth issues JWTs; all protected endpoints require `Authorization: Bearer <token>`.
- **Public endpoints:** do not require an `Authorization` header; anti-spam verification (Cloudflare Turnstile) acts as the primary abuse control on public submission paths.
- **Role model (MVP):** two roles enforced at the API boundary.

| Role    | Capabilities                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------ |
| `admin` | Full create, read, update, delete and publish across all protected resources; testimonial approval     |
| `staff` | Read inquiries and their operational details; update scoped operational fields; no publishing control |

- **Role enforcement:** the backend validates the JWT, extracts the role claim, and applies permission checks before executing any handler. Role-bearing claims are set by Supabase Auth and must not be accepted from the request body.
- **Token lifecycle:** short-lived access tokens with refresh-token rotation managed by Supabase; the backend validates signature, expiration, audience, and required role claim on every protected request.
- **Unauthorized responses:** return `401 Unauthorized` when no valid token is present; return `403 Forbidden` when a valid token lacks the required role.

## Anti-spam and Public Submission Controls

- **Mechanism:** Cloudflare Turnstile challenge-response token is submitted alongside all public inquiry payloads.
- **Backend validation:** the API verifies the Turnstile token against the Cloudflare siteverify endpoint before processing the submission; unverified requests return `400 Bad Request` with `code=SPAM_VERIFICATION_FAILED`.
- **No token stored:** the Turnstile verification token must not be persisted; it is consumed and discarded after a single server-side check.
- **Rate limiting supplements but does not replace** the challenge-response control on public paths.

## PII and Privacy Handling

- **Minimal data principle:** inquiry endpoints collect only the fields required for manual staff follow-up (name, contact channel, preferred time range, and a short message). Health or diagnostic detail fields are excluded from MVP form contracts.
- **Sentry PII scrubbing:** before attaching request context to Sentry events, strip all fields that may contain patient-identifiable information — specifically inquiry message body, contact details, and any custom fields from public submission payloads.
- **Response safety:** admin endpoints that return inquiry records must not include more patient data than the approved minimal schema; no unfiltered raw storage payloads are exposed through the API.
- **Audit metadata:** internal timestamps and actor IDs are recorded for admin content and approval actions but are not surfaced in public API responses.

## Rate Limiting and Throttling

- **Protected endpoints (per authenticated user):** `120 requests/minute`.
- **Public inquiry submission:** stricter limit of `10 submissions/hour` per IP to reduce automated abuse.
- **Auth-sensitive paths (sign-in, token refresh):** lowest limit; configured in Supabase Auth settings with additional backend middleware enforcement.
- **Limit response:** `429 Too Many Requests` with a `Retry-After` header indicating when the next request is permitted.
- **Rate-limit error body:** canonical error format with `code=RATE_LIMIT_EXCEEDED`.

## Observability (Sentry)

- Attach `requestId`, sanitized endpoint path, actor role, and API version as Sentry context on every error event.
- Track key metrics in Sentry Performance: error rate, p95 latency, and `429` frequency per route.
- Alert on sustained spikes in `5xx` errors and `429` responses on the public inquiry submission path.
- Use Sentry release tagging from CI to correlate regressions with specific deployments.
- **PII scrubbing is mandatory** before any request payload or response body is attached to Sentry events (see PII and Privacy Handling above).

## Deployment Impact (GitHub Actions)

- Validate OpenAPI schema export and API contract linting on every PR.
- Block merges that introduce breaking changes to existing contract shapes without a version bump.
- Publish API version notes and approved change summaries on deployment to staging and production.
- **Rollback:** revert frontend and backend independently; keep the previous API major version available during the active deprecation window.
- Manage environment variables for Supabase keys, Turnstile secret, Resend API key, Sentry DSN, and database URL through per-environment GitHub Actions secrets.

---

## Change Log

| Date       | Version | Change Summary                                                   | Author    |
| ---------- | ------- | ---------------------------------------------------------------- | --------- |
| 2026-04-17 | 1.0     | Initial draft — API design standards for orthopedic-spine MVP.  | Tech Lead |

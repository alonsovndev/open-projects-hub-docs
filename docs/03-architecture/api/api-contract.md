---
sidebar_position: 2
---

# API Contract

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 2.0                         |
| **Status**       | Accepted                    |

## Table of Contents

- [Source References](#source-references)
- [API Scope and Conventions](#api-scope-and-conventions)
- [Endpoint Catalog](#endpoint-catalog)
- [Shared JSON Schemas](#shared-json-schemas)
- [Detailed Endpoint Contracts](#detailed-endpoint-contracts)
- [Standard Error Examples by Status](#standard-error-examples-by-status)
- [Observability (Sentry + CloudWatch)](#observability-sentry--cloudwatch)
- [Deployment Impact (GitHub Actions)](#deployment-impact-github-actions)

## API Scope and Conventions

> **Source of truth.** The OpenAPI schema generated from the code (`open-projects-hub-api/docs/api/openapi.json`, regenerated with `make export-openapi`) is authoritative. This page explains the contract; where an example below differs from the OpenAPI schema, the schema wins.

- **Base URL:** `/v1` (for example `https://api.example.com/v1/projects`). Health checks live outside it: `/health`, `/health/live`, `/health/ready`.
- **Format:** `application/json; charset=utf-8`, except the Markdown export, which returns `text/markdown`.
- **Authentication:** `Authorization: Bearer <jwt>` on protected endpoints (custom FastAPI JWT auth, ADR-005). Access tokens carry the user id, role, and workspace id (`wid`); refresh tokens are rejected as bearer tokens.
- **Token expiry:** access tokens expire after 15 minutes. Refresh tokens are single-use with rotation; sessions slide 24h (standard) or 7d (remember-me) from the last refresh (ADR-005).
- **Field naming:** `camelCase` in request and response bodies.
- **Datetime format:** ISO 8601 UTC (`YYYY-MM-DDTHH:MM:SSZ`); project dates are `YYYY-MM-DD`.
- **Errors:** `{"detail": "<message>"}`, sometimes with a machine-readable `code` (see [Error Response Schema](#error-response-schema)).
- **Pagination:** `offset` and `limit` query parameters; responses are `{ items, total, page, per_page }` (see [Pagination Schema](#pagination-schema-collection-responses)).
- **Workspaces:** every account belongs to one workspace (the tenant boundary owning clients and projects). Self sign-up creates a new workspace and its Admin; the Admin adds teammates to it. A record in another workspace answers `404`, never `403`. Clients have no account (see "Client Review" below).
- **Roles:**
  - `Admin`: everything a Member can do, plus team management (add, deactivate, remove members) and renaming the workspace.
  - `Member`: full CRUD on clients, projects, stories, refinement, and their own AI provider keys.
  - `Public` (no token): auth endpoints and the Client Review route. A client stakeholder holds a project access code and can read that one project's approved stories (ADR-020).

## Endpoint Catalog

All paths are relative to `/v1`.

| Domain | Method | Endpoint | Purpose | Roles |
| --- | --- | --- | --- | --- |
| Auth | POST | `/auth/register` | Self sign-up: creates a new workspace and its Admin (unverified) | Public |
| Auth | POST | `/auth/verify-email` | Submit an email verification or invite code; invitees also set their password | Public |
| Auth | POST | `/auth/resend-verification` | Resend the verification code | Public |
| Auth | POST | `/auth/login` | Log in; returns access and refresh tokens | Public |
| Auth | POST | `/auth/refresh` | Rotate a refresh token for a new token pair | Public |
| Auth | POST | `/auth/logout` | Revoke the session's refresh token | Admin, Member |
| Auth | POST | `/auth/forgot-password` | Request a password reset code | Public |
| Auth | POST | `/auth/resend-reset-code` | Resend the reset code | Public |
| Auth | POST | `/auth/reset-password` | Submit the reset code and a new password | Public |
| User | GET | `/users/me/profile` | Current user's profile | Admin, Member |
| User | PATCH | `/users/me/profile` | Update display name | Admin, Member |
| User | POST | `/users/me/password` | Change password (requires the current one) | Admin, Member |
| Team | GET | `/users` | List the workspace's users | Admin, Member |
| Team | GET | `/users/{userId}` | One user of the workspace | Admin, Member |
| Team | POST | `/users` | Invite a member to the workspace | Admin |
| Team | PATCH | `/users/{userId}/status` | Activate or deactivate a member | Admin |
| Team | DELETE | `/users/{userId}` | Remove a member | Admin |
| Workspace | PATCH | `/workspaces/me` | Rename the workspace | Admin |
| Credits | GET | `/users/me/credits` | AI credit balance | Admin, Member |
| API Keys | GET | `/users/me/api-keys` | List the caller's provider keys (masked) | Admin, Member |
| API Keys | POST | `/users/me/api-keys` | Add or replace a provider key | Admin, Member |
| API Keys | DELETE | `/users/me/api-keys/{provider}` | Delete a provider key | Admin, Member |
| API Keys | POST | `/users/me/api-keys/{provider}/validate` | Validate a key against the provider (5 per hour) | Admin, Member |
| Clients | GET | `/clients` | List clients | Admin, Member |
| Clients | POST | `/clients` | Create a client | Admin, Member |
| Clients | GET | `/clients/{clientId}` | Client details | Admin, Member |
| Clients | PATCH | `/clients/{clientId}` | Update a client | Admin, Member |
| Clients | DELETE | `/clients/{clientId}` | Delete a client (`409` while it has active projects) | Admin, Member |
| Projects | GET | `/projects` | List projects (`status`, `clientId`, `search`, `createdFrom`, `createdTo`) | Admin, Member |
| Projects | POST | `/projects` | Create a project (max 3 active per workspace) | Admin, Member |
| Projects | GET | `/projects/{projectId}` | Project details | Admin, Member |
| Projects | PATCH | `/projects/{projectId}` | Update project metadata | Admin, Member |
| Projects | DELETE | `/projects/{projectId}` | Delete a project and its stories | Admin, Member |
| Projects | POST | `/projects/{projectId}/archive` | Archive a project | Admin, Member |
| Projects | POST | `/projects/{projectId}/reactivate` | Reactivate an archived project (subject to the active limit) | Admin, Member |
| Projects | POST | `/projects/{projectId}/access-code/regenerate` | Replace the project's client access code | Admin, Member |
| Backlog | GET | `/projects/{projectId}/backlog` | The project's stories with acceptance criteria | Admin, Member |
| Backlog | POST | `/projects/{projectId}/exports/markdown` | Download the backlog as Markdown | Admin, Member |
| Stories | GET | `/stories` | List stories (`project_id`, `priority`) | Admin, Member |
| Stories | POST | `/stories` | Create a story | Admin, Member |
| Stories | GET | `/stories/by-project/{projectId}` | Stories of one project | Admin, Member |
| Stories | GET | `/stories/{storyId}` | Story details | Admin, Member |
| Stories | PATCH | `/stories/{storyId}` | Update a story | Admin, Member |
| Stories | DELETE | `/stories/{storyId}` | Delete a story | Admin, Member |
| Stories | POST | `/stories/{storyId}/assign` | Assign a story to a workspace user | Admin, Member |
| Refinement | POST | `/refinement/generate-stories` | Generate refined stories from raw notes; not stored | Admin, Member |
| Refinement | POST | `/refinement/approve-story` | Approve one refined story into the backlog | Admin, Member |
| Refinement | POST | `/refinement/approve-stories` | Approve several refined stories | Admin, Member |
| Dashboard | GET | `/dashboard/stats` | Project and story counts for the workspace | Admin, Member |
| Client Review | GET | `/viewer/{accessCode}` | Approved stories of one project, by access code (30 requests/min per IP) | Public |

Not built (superseded by ADR-019 or descoped): refinement sessions, requirement editing and reordering, and stored export records. Their detailed sections below are kept as history and marked.

## Shared JSON Schemas

### Error Response Schema

Errors use FastAPI's `detail` field. Some carry a machine-readable `code` or extra fields the client acts on.

```json
{
  "type": "object",
  "required": ["detail"],
  "properties": {
    "detail": { "type": "string" },
    "code": { "type": "string" }
  }
}
```

Examples:

```json
{ "detail": "Project not found" }
```

```json
{ "detail": "Validation failed for field 'body -> name': Field required" }
```

```json
{ "detail": "No AI credits remaining. Add your own API key to continue unlimited refinements.", "code": "INSUFFICIENT_CREDITS" }
```

Provider-key errors (`422`) add `provider`, `reason`, and `promptsKeyUpdate`. Rate-limited requests (`429`) return slowapi's body: `{ "error": "Rate limit exceeded: 5 per 1 minute" }`.

### Pagination Schema (Collection Responses)

List endpoints take `offset` (default 0) and `limit` (default 20, max 100).

```json
{
  "type": "object",
  "required": ["items", "total", "page", "per_page"],
  "properties": {
    "items": { "type": "array", "items": { "type": "object" } },
    "total": { "type": "integer", "minimum": 0 },
    "page": { "type": "integer", "minimum": 1 },
    "per_page": { "type": "integer", "minimum": 1, "maximum": 100 }
  }
}
```

`GET /clients` returns the same envelope with `perPage` instead of `per_page`.

### Status Code Matrix

| Code  | Meaning               | Typical Use                         |
| ----- | --------------------- | ----------------------------------- |
| `200` | OK                    | Successful reads/updates            |
| `201` | Created               | Successful create/export generation |
| `204` | No Content            | Successful archive/delete           |
| `400` | Bad Request           | Invalid payload/query               |
| `401` | Unauthorized          | Missing/invalid JWT                 |
| `402` | Payment Required      | AI credits exhausted (platform provider) |
| `403` | Forbidden             | Role not allowed                    |
| `404` | Not Found             | Missing resource                    |
| `409` | Conflict              | Project state/rule conflict         |
| `422` | Unprocessable Entity  | Validation/domain rule issue        |
| `429` | Too Many Requests     | Rate limit exceeded (including the public Client Review route) |
| `500` | Internal Server Error | Unhandled server failure            |

## Detailed Endpoint Contracts

### 1) Create Project

- **Method/URL:** `POST /v1/projects`
- **Description:** Creates a project linked to a client. Rejects if freelancer already has 3 active projects.

Request schema:

```json
{
  "type": "object",
  "required": ["clientId", "name", "phase"],
  "properties": {
    "clientId": { "type": "string", "format": "uuid" },
    "name": { "type": "string", "minLength": 1, "maxLength": 120 },
    "description": { "type": "string", "maxLength": 5000 },
    "phase": { "type": "string", "enum": ["discovery", "planning"] }
  }
}
```

Request example:

```json
{
  "clientId": "11111111-1111-1111-1111-111111111111",
  "name": "Freelancer Portal MVP",
  "description": "Discovery and planning for marketplace workflow",
  "phase": "discovery"
}
```

Success response (`201`) schema:

```json
{
  "type": "object",
  "required": ["id", "clientId", "name", "phase", "status", "createdAt", "updatedAt"],
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "clientId": { "type": "string", "format": "uuid" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "phase": { "type": "string", "enum": ["discovery", "planning"] },
    "status": { "type": "string", "enum": ["active", "archived"] },

    "createdAt": { "type": "string", "format": "date-time" },
    "updatedAt": { "type": "string", "format": "date-time" }
  }
}
```

Success response example:

```json
{
  "id": "22222222-2222-2222-2222-222222222222",
  "clientId": "11111111-1111-1111-1111-111111111111",
  "name": "Freelancer Portal MVP",
  "description": "Discovery and planning for marketplace workflow",
  "phase": "discovery",
  "status": "active",

  "createdAt": "2026-02-28T17:00:00Z",
  "updatedAt": "2026-02-28T17:00:00Z"
}
```

Status codes: `201`, `400`, `401`, `403`, `409`, `422`, `500`

### 2) List Projects (Paginated)

- **Method/URL:** `GET /v1/projects?page=1&pageSize=20&phase=discovery&status=active&clientId=...&search=portal&dateFrom=2026-01-01&dateTo=2026-12-31`
**Description:** Returns projects visible to caller role. Supports optional filters.

Query parameters:

| Param      | Type     | Required | Description                              |
| ---------- | -------- | -------- | ---------------------------------------- |
| `page`     | integer  | No       | Page number (default 1)                  |
| `pageSize` | integer  | No       | Items per page (default 20, max 100)     |
| `phase`    | string   | No       | Filter by phase (`discovery`, `planning`)|
| `status`   | string   | No       | Filter by status (`active`, `archived`)  |
| `clientId` | uuid     | No       | Filter by client                         |
| `search`   | string   | No       | Full-text search on name and description |
| `dateFrom` | date     | No       | Filter projects created on or after date |
| `dateTo`   | date     | No       | Filter projects created on or before date|

Response schema: pagination envelope with `Project` items.

Response example (`200`):

```json
{
  "data": [
    {
      "id": "22222222-2222-2222-2222-222222222222",
      "clientId": "11111111-1111-1111-1111-111111111111",
      "name": "Freelancer Portal MVP",
      "phase": "discovery",
      "status": "active",
      "createdAt": "2026-02-28T17:00:00Z",
      "updatedAt": "2026-02-28T17:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

Status codes: `200`, `400`, `401`, `403`, `500`

### 3) Create Refinement Session

- **Method/URL:** `POST /v1/projects/{projectId}/refinement-sessions`
- **Description:** Accepts raw notes/bullets and returns structured draft plus ambiguity highlights. Consumes 1 AI credit if using platform credits (not user-provided API key).

> **As implemented (EPIC-3 / EPIC-6).** The shipped endpoint is
> `POST /v1/refinement/generate-stories`, which takes `projectId` in the body rather
> than the path and returns the refined stories directly without storing them; the session
> resource below has not been built and is superseded by ADR-019 (refined stories are held
> client-side and saved only on approval via `POST /refinement/approve-story[ies]`). EPIC-6 extends the shipped endpoint rather than migrating it, since moving
> the path is out of F-010's scope and would break the existing frontend. The shipped
> request adds an optional `provider` (`platform` | `gemini` | `openai` | `deepseek`,
> defaulting to `platform`), and the response adds `provider` plus `creditsRemaining` —
> `null` when a user's own key served the run and no platform credit was spent
> (FR-010-08). Credit exhaustion returns `402` with code `INSUFFICIENT_CREDITS`; a
> provider refusing the user's key returns `422` with code `API_KEY_INVALID` and a
> `promptsKeyUpdate` flag distinguishing a key the user must replace (FR-010-11) from a
> spent quota or an outage, which replacing would not fix.

Request schema:

```json
{
  "type": "object",
  "required": ["rawInput", "provider"],
  "properties": {
    "rawInput": { "type": "string", "minLength": 1, "maxLength": 5000 },
    "sourceFormat": { "type": "string", "enum": ["plain_text", "bullet_list"] },
    "provider": { "type": "string", "enum": ["platform", "gemini", "openai", "deepseek"] }
  }
}
```

Request example:

```json
{
  "rawInput": "Client wants login, project tracking, and export to markdown. maybe also comments.",
  "sourceFormat": "plain_text",
  "provider": "platform"
}
```

Success response (`201`) schema:

```json
{
  "type": "object",
  "required": ["sessionId", "projectId", "status", "rawInput", "ambiguities", "draftStories"],
  "properties": {
    "sessionId": { "type": "string", "format": "uuid" },
    "projectId": { "type": "string", "format": "uuid" },
    "status": { "type": "string", "enum": ["draft", "approved"] },
    "provider": { "type": "string", "enum": ["platform", "gemini", "openai", "deepseek"] },
    "creditsRemaining": { "type": "integer", "minimum": 0 },
    "rawInput": { "type": "string" },
    "ambiguities": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["phrase", "start", "end", "reason"],
        "properties": {
          "phrase": { "type": "string" },
          "start": { "type": "integer", "minimum": 0 },
          "end": { "type": "integer", "minimum": 0 },
          "reason": { "type": "string" }
        }
      }
    },
    "draftStories": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["title", "statement", "acceptanceCriteria"],
        "properties": {
          "title": { "type": "string" },
          "statement": { "type": "string" },
          "acceptanceCriteria": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}
```

Success response example:

```json
{
  "sessionId": "33333333-3333-3333-3333-333333333333",
  "projectId": "22222222-2222-2222-2222-222222222222",
  "status": "draft",
  "provider": "platform",
  "creditsRemaining": 4,
  "rawInput": "Client wants login, project tracking, and export to markdown. maybe also comments.",
  "ambiguities": [
    {
      "phrase": "maybe also comments",
      "start": 63,
      "end": 82,
      "reason": "Optional scope not confirmed"
    }
  ],
  "draftStories": [
    {
      "title": "Project requirement export",
      "statement": "As an Admin, I want to export approved requirements to Markdown, so that I can share structured project scope.",
      "acceptanceCriteria": ["Export includes approved stories only", "File is downloadable as .md"]
    }
  ]
}
```

Status codes: `201`, `400`, `401`, `402`, `403`, `404`, `422`, `500`

### 4) Approve Refinement Session

- **Method/URL:** `POST /v1/projects/{projectId}/refinement-sessions/{sessionId}/approve`
- **Description:** Converts draft stories into official requirements.

> **Superseded (ADR-019).** Not built. The shipped approval is `POST /v1/refinement/approve-story` (one) and `POST /v1/refinement/approve-stories` (several); the request carries the story content (`projectId`, `title`, `description`, `acceptanceCriteria`) because refined stories are not stored before approval.

Request schema:

```json
{
  "type": "object",
  "required": ["approvedBy"],
  "properties": {
    "approvedBy": { "type": "string", "format": "uuid" },
    "approvalNotes": { "type": "string", "maxLength": 1000 }
  }
}
```

Success response example (`200`):

```json
{
  "sessionId": "33333333-3333-3333-3333-333333333333",
  "projectId": "22222222-2222-2222-2222-222222222222",
  "status": "approved",
  "approvedRequirementCount": 5,
  "approvedAt": "2026-02-28T17:15:00Z"
}
```

Status codes: `200`, `400`, `401`, `403`, `404`, `409`, `500`

### 5) List Requirements (Paginated)

> **Superseded (ADR-019).** Not built. The backlog is read with `GET /v1/projects/{projectId}/backlog`.

- **Method/URL:** `GET /v1/projects/{projectId}/requirements?page=1&pageSize=20`
- **Description:** Returns approved requirement backlog for Admin/Member.

Response example (`200`):

```json
{
  "data": [
    {
      "id": "44444444-4444-4444-4444-444444444444",
      "projectId": "22222222-2222-2222-2222-222222222222",
      "title": "Project requirement export",
      "statement": "As an Admin, I want to export approved requirements to Markdown, so that I can share structured project scope.",
      "acceptanceCriteria": ["Export includes approved stories only", "File is downloadable as .md"],
      "status": "approved",
      "createdAt": "2026-02-28T17:15:00Z",
      "updatedAt": "2026-02-28T17:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### 6) Update Requirement

> **Superseded.** Not built. Stories are edited with `PATCH /v1/stories/{storyId}`.

- **Method/URL:** `PUT /v1/projects/{projectId}/requirements/{requirementId}`
- **Description:** Admin updates title/story/acceptance criteria.

Request schema:

```json
{
  "type": "object",
  "required": ["title", "statement", "acceptanceCriteria"],
  "properties": {
    "title": { "type": "string", "minLength": 1, "maxLength": 180 },
    "statement": { "type": "string", "minLength": 1, "maxLength": 2000 },
    "acceptanceCriteria": {
      "type": "array",
      "minItems": 1,
      "items": { "type": "string", "minLength": 1, "maxLength": 500 }
    }
  }
}
```

Success response example (`200`):

```json
{
  "id": "44444444-4444-4444-4444-444444444444",
  "projectId": "22222222-2222-2222-2222-222222222222",
  "title": "Project requirement export",
  "statement": "As an Admin, I want to export approved requirements to Markdown, so that I can share project scope with clients.",
  "acceptanceCriteria": ["Export includes approved stories only", "File is downloadable as .md"],
  "status": "approved",
  "updatedAt": "2026-02-28T17:20:00Z"
}
```

Status codes: `200`, `400`, `401`, `403`, `404`, `422`, `500`

### 7) Create Markdown Export

- **Method/URL:** `POST /v1/projects/{projectId}/exports/markdown`
- **Description:** Returns the project's backlog as a Markdown file in the response body. Nothing is stored server-side.

Request body (optional; an empty body exports the whole backlog):

```json
{
  "type": "object",
  "properties": {
    "status": { "type": "string", "enum": ["todo", "in_progress", "blocked", "done"] },
    "dateFrom": { "type": "string", "format": "date" },
    "dateTo": { "type": "string", "format": "date" }
  }
}
```

Success response (`200`): `Content-Type: text/markdown`, with these headers:

- `Content-Disposition: attachment; filename="<project>-backlog-<date>.md"`
- `X-Export-Story-Count`: number of stories in the file
- `X-Export-Warning` (optional): set when the export is empty or truncated

Status codes: `200`, `401`, `404`, `422` (invalid scope), `500`

### 8) Archive and Delete Resources

- **Methods/URLs:**
  - `POST /v1/projects/{projectId}/archive` and `POST /v1/projects/{projectId}/reactivate`: move a project between `active` and `archived`. Reactivation is refused (`409`) when the workspace already has 3 active projects.
  - `DELETE /v1/projects/{projectId}`: permanently deletes the project and its stories.
  - `DELETE /v1/clients/{clientId}`: permanently deletes the client and its archived projects. Refused with `409` while the client has active projects.

Success response: `200` (archive, reactivate) or `204 No Content` (delete)

### Client delete blocked (409):

```json
{ "detail": "Client 11111111-1111-1111-1111-111111111111 has active projects and cannot be deleted" }
```

### 9) Update Project

- **Method/URL:** `PATCH /v1/projects/{projectId}`
- **Description:** Update project metadata, including status change (reactivate archived → active). 409 if reactivating would exceed 3-active limit.

Request schema:

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1, "maxLength": 120 },
    "description": { "type": "string", "maxLength": 5000 },
    "phase": { "type": "string", "enum": ["discovery", "planning"] },
    "status": { "type": "string", "enum": ["active", "archived"] }
  }
}
```

Success response example (`200`):

```json
{
  "id": "22222222-2222-2222-2222-222222222222",
  "clientId": "11111111-1111-1111-1111-111111111111",
  "name": "Freelancer Portal MVP",
  "description": "Discovery and planning for marketplace workflow",
  "phase": "planning",
  "status": "active",

  "createdAt": "2026-02-28T17:00:00Z",
  "updatedAt": "2026-08-11T10:00:00Z"
}
```

Status codes: `200`, `400`, `401`, `403`, `404`, `409`, `422`, `500`

### 10) Update Client

- **Method/URL:** `PATCH /v1/clients/{clientId}`
- **Description:** Update client metadata.

Request schema:

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1, "maxLength": 120 },
    "contactEmail": { "type": "string", "format": "email", "maxLength": 254 }
  }
}
```

Success response example (`200`):

```json
{
  "id": "11111111-1111-1111-1111-111111111111",
  "name": "Acme Corp",
  "contactEmail": "pm@example.com",
  "status": "active",
  "createdAt": "2026-02-28T17:00:00Z",
  "updatedAt": "2026-08-11T10:30:00Z"
}
```

Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### 11) Auth — Login

- **Method/URL:** `POST /v1/auth/login`
- **Description:** Authenticate with email and password. Returns a JWT access token plus a
  refresh token. `rememberMe` selects a 24h (default) or 7d sliding session — see ADR-005.
  Account locked after 5 failed attempts in 15 minutes.

Request schema:

```json
{
  "type": "object",
  "required": ["email", "password"],
  "properties": {
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string", "minLength": 8 },
    "rememberMe": { "type": "boolean" }
  }
}
```

Request example:

```json
{
  "email": "admin@example.com",
  "password": "SecureP4ss!",
  "rememberMe": true
}
```

Success response example (`200`):

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "sessionExpiresAt": "2026-09-20T02:00:00Z",
  "user": {
    "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    "email": "admin@example.com",
    "displayName": "Admin User",
    "role": "admin"
  }
}
```

Status codes: `200`, `400`, `401`, `422`, `429`, `500`

### 11a) Auth — Refresh

- **Method/URL:** `POST /v1/auth/refresh`
- **Description:** Exchanges a refresh token for a new access/refresh pair (single-use rotation —
  the presented refresh token is rejected on any subsequent use). Carries the original session's
  `rememberMe` duration forward, sliding the session window from "now" per ADR-005.

Request schema:

```json
{
  "type": "object",
  "required": ["refreshToken"],
  "properties": {
    "refreshToken": { "type": "string" }
  }
}
```

Success response example (`200`):

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "sessionExpiresAt": "2026-09-20T02:00:00Z"
}
```

Status codes: `200`, `401`, `429`, `500`

### 12) Auth — Register

- **Method/URL:** `POST /v1/auth/register`
- **Description:** Open self sign-up. Each registration creates a new **workspace** (the tenant boundary that owns clients and projects) and makes the account its **Admin**; a `role` field in the body is rejected with `422`. The account is created **unverified** with no AI credits and is emailed a verification code. No tokens are returned: the account signs in only after verifying its email. An optional `workspaceName` (max 100 chars) names the workspace; it defaults to `"{displayName}'s workspace"`. Registering with an email that only has an **unverified** account (an abandoned sign-up, or someone added to a workspace who never confirmed) replaces that pending account rather than returning `409` — an unverified account never proved it owns the address. Teammates (`member`) are added to a workspace by its Admin via `POST /users`. Clients have no account.

Request example:

```json
{
  "displayName": "Jane Doe",
  "email": "admin@example.com",
  "password": "SecureP4ssword",
  "workspaceName": "Jane's Studio"
}
```

Success response example (`201`):

```json
{
  "email": "ad***@example.com",
  "verificationRequired": true,
  "nextStep": "verify-email",
  "codeExpiresAt": "2026-09-28T20:35:00+00:00"
}
```

Status codes: `201`, `409` (email already registered to a verified account), `422`, `429`, `500`

### 13) Auth — Email Verification

- **Method/URL:** `POST /v1/auth/verify-email`
- **Description:** Submit the 6-character code emailed at registration. The code uses `23456789ABCDEFGHJKLMNPQRSTUVWXYZ`, is case-insensitive, is stored only as a hash, and expires after 5 minutes (24 hours for accounts an Admin adds). The email also links to the web verification page with the code pre-filled. Accounts an Admin adds send an optional `password` to choose their own. Success verifies the account and grants its free AI credits (F-010 FR-010-01).
- **Errors:** one generic `400` "Invalid or expired verification code" covers a wrong, expired or superseded code, an unknown email, and an already-verified account. After 5 wrong attempts the code is locked (`429`) until a new one is requested.
- **Resend:** `POST /v1/auth/resend-verification` with `{ "email" }`. It invalidates the previous code and emails a new one. It always returns `200` with a generic message (no email is sent for unknown or verified addresses). It returns `429` once 4 codes (the registration code plus 3 resends) have been issued within 15 minutes.
- **Login before verification:** `POST /auth/login` returns `403` with `{ "detail": "Please verify your email before signing in.", "code": "EMAIL_NOT_VERIFIED" }`, only after the password has matched.

Request example:

```json
{
  "email": "admin@example.com",
  "code": "ABC234"
}
```

Success response example (`200`):

```json
{
  "verified": true
}
```

Status codes: `200`, `400`, `422`, `429`, `500`

### 14) Auth — Password Reset

- **Forgot password:** `POST /v1/auth/forgot-password` — privacy-preserving response (always returns 200 even if email not found). Sends 6-digit reset code.
- **Reset password:** `POST /v1/auth/reset-password` — submits reset code + new password. Code expires after 30 minutes, single-use; the email links to the reset page with the code pre-filled.
- **Resend code:** `POST /v1/auth/resend-reset-code` — max 3 per 15-minute window.

Forgot password request schema:

```json
{
  "type": "object",
  "required": ["email"],
  "properties": {
    "email": { "type": "string", "format": "email" }
  }
}
```

Forgot password response (`200`, always):

```json
{
  "message": "If an account exists for this email, a reset code has been sent."
}
```

Reset password request schema:

```json
{
  "type": "object",
  "required": ["email", "code", "newPassword"],
  "properties": {
    "email": { "type": "string", "format": "email" },
    "code": { "type": "string", "minLength": 6, "maxLength": 6 },
    "newPassword": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[A-Za-z])(?=.*\\d).{8,}$"
    }
  }
}
```

Reset password response (`200`):

```json
{
  "message": "Password has been reset successfully."
}
```

Status codes (forgot): `200`, `400`, `429`, `500`
Status codes (reset): `200`, `400`, `404`, `410`, `422`, `429`, `500`

### 15) Auth — Logout

- **Method/URL:** `POST /v1/auth/logout`
- **Description:** Requires a valid access token (`Authorization: Bearer`). Revokes the session's
  refresh token server-side so it cannot be replayed to mint further access tokens; idempotent for
  an already-expired/invalid refresh token. The access token itself remains valid until its own
  short natural expiry, per the token-lifecycle mitigation in the Security Architecture doc.

Request schema:

```json
{
  "type": "object",
  "required": ["refreshToken"],
  "properties": {
    "refreshToken": { "type": "string" }
  }
}
```

Success response example (`200`):

```json
{
  "message": "Logged out successfully."
}
```

Status codes: `200`, `401`, `403`, `500`

### 16) Team Management (Workspace Users)

- **Method/URL:** `POST /v1/users`
- **Description:** Adds a **member** to the caller's workspace. Requires the **Admin** role. `role` accepts only `member` (the default); `admin` and any other value are rejected with `422` — there is no way yet to demote or remove a second Admin, so a workspace cannot end up with one it did not choose. The account is created **unverified** with no usable password. The invitee is emailed a 24-hour code and a link, and sets their own password when they submit it to `POST /v1/auth/verify-email`: an Admin's word does not prove the address belongs to that person. AI credits are granted on verification (subject to the workspace's 25-credit lifetime ceiling). A workspace holds at most **5 users** (including inactive and unverified); adding a sixth answers `409`.

Request example:

```json
{
  "displayName": "Alex Doe",
  "email": "alex@example.com",
  "role": "member"
}
```

Success response example (`201`):

```json
{
  "id": "5b1f...",
  "email": "alex@example.com",
  "displayName": "Alex Doe",
  "role": "member"
}
```

Status codes: `201`, `403` (not an Admin), `409` (email already registered), `422`, `500`

- **Method/URL:** `GET /v1/users`
- **Description:** Lists the caller's workspace users. Requires **Admin or Member**.

- **Method/URL:** `GET /v1/users/{userId}`
- **Description:** Looks up one user by id, scoped to the caller's workspace. A user of another workspace, or an id that does not exist, both answer `404` — never `403`, so the response cannot confirm the id exists elsewhere.

### 17) User Profile

- **Method/URL:** `GET /v1/users/me/profile`, `PATCH /v1/users/me/profile`
- **Description:** Get or update current user's profile (display name, preferences, onboarding state).

Response example (`200`):

```json
{
  "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  "email": "admin@example.com",
  "displayName": "Admin User",
  "role": "admin",
  "isFirstLogin": false,
  "onboardingCompleted": true,
  "createdAt": "2026-02-28T17:00:00Z"
}
```

PUT request schema:

```json
{
  "type": "object",
  "properties": {
    "displayName": { "type": "string", "maxLength": 100 },
    "onboardingCompleted": { "type": "boolean" }
  }
}
```

Status codes: `200`, `400`, `401`, `422`, `500`

### 18) AI Credits

- **Method/URL:** `GET /v1/users/me/credits`
- **Description:** Returns current AI credit balance. Admins and Members are granted 5 credits on email verification up to 25 per workspace in its lifetime.

Response example (`200`):

```json
{
  "credits": 3,
  "totalGranted": 5
}
```

Status codes: `200`, `401`, `500`

### 19) API Key Management

- **List keys:** `GET /v1/users/me/api-keys` — returns configured providers with masked keys.
- **Add/replace key:** `POST /v1/users/me/api-keys` — upsert an API key for a provider. Validates against provider on save.
- **Delete key:** `DELETE /v1/users/me/api-keys/{provider}` — remove key for a provider.
- **Validate key:** `POST /v1/users/me/api-keys/{provider}/validate` — tests key against provider's endpoint.

List response example (`200`):

```json
{
  "keys": [
    {
      "provider": "openai",
      "maskedKey": "sk-proj-***...abc",
      "configuredAt": "2026-08-11T10:00:00Z"
    }
  ]
}
```

Add/replace key request schema:

```json
{
  "type": "object",
  "required": ["provider", "apiKey"],
  "properties": {
    "provider": { "type": "string", "enum": ["gemini", "openai", "deepseek"] },
    "apiKey": { "type": "string", "minLength": 1 }
  }
}
```

Add key response (`201`):

```json
{
  "provider": "openai",
  "maskedKey": "sk-proj-***...abc",
  "configuredAt": "2026-08-11T10:00:00Z"
}
```

Validation success response (`200`):

```json
{
  "provider": "openai",
  "valid": true,
  "quotaWarning": false
}
```

`quotaWarning` is `true` when the provider reports quota at or above 80% consumed
(FR-010-12). It is best-effort: providers that expose no usage headers always report
`false`.

List entries also carry `lastValidatedAt` (nullable), the last time the provider accepted
the key. There is no field anywhere in this section that returns key material — `maskedKey`
is the only representation the API exposes, and no plaintext retrieval endpoint exists
(FR-010-07).

A rejected key returns `422` with `code: "API_KEY_INVALID"`, the `provider`, a `reason`
(`invalid_format` | `auth_failed` | `quota_exhausted` | `rate_limited` | `network`), and
`promptsKeyUpdate`. Exceeding the validation budget returns `429` with a `Retry-After`
header (NFR-010-03).

Validation error response (`422`):

```json
{
  "detail": "Provider rejected the key. Check your API key and try again.",
  "provider": "openai",
  "reason": "auth_failed",
  "promptsKeyUpdate": true
}
```

Status codes (list): `200`, `401`, `500`
Status codes (add): `201`, `400`, `401`, `422`, `429`, `500`
Status codes (delete): `204`, `401`, `404`, `500`
Status codes (validate): `200`, `400`, `401`, `422`, `429`, `500`

### 20) Refinement — List and Delete Sessions

> **Superseded (ADR-019).** Not built and no longer planned: refined stories are not persisted, so there are no sessions to list, fetch or delete.

- **List sessions:** `GET /v1/projects/{projectId}/refinement-sessions?status=draft` — returns sessions, optionally filtered by status.
- **Get session:** `GET /v1/projects/{projectId}/refinement-sessions/{sessionId}` — get full session details with draft stories and ambiguities.
- **Delete session:** `DELETE /v1/projects/{projectId}/refinement-sessions/{sessionId}` — delete a draft session (approved sessions cannot be deleted).

List response example (`200`):

```json
{
  "data": [
    {
      "sessionId": "33333333-3333-3333-3333-333333333333",
      "status": "draft",
      "storyCount": 3,
      "createdAt": "2026-08-11T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

Status codes (list): `200`, `400`, `401`, `403`, `404`, `500`
Status codes (get): `200`, `401`, `403`, `404`, `500`
Status codes (delete): `204`, `401`, `403`, `404`, `409`, `500`

### 21) Requirements — Reorder

> **Not built (deferred).** Stories are listed in creation order; manual reordering (FR-004-03) is not implemented.

- **Method/URL:** `PATCH /v1/projects/{projectId}/requirements/reorder`
- **Description:** Bulk update sort order for requirements (drag-and-drop reorder in UI).

Request schema:

```json
{
  "type": "object",
  "required": ["items"],
  "properties": {
    "items": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["id", "sortOrder"],
        "properties": {
          "id": { "type": "string", "format": "uuid" },
          "sortOrder": { "type": "integer", "minimum": 1 }
        }
      }
    }
  }
}
```

Request example:

```json
{
  "items": [
    { "id": "44444444-4444-4444-4444-444444444444", "sortOrder": 1 },
    { "id": "55555555-5555-5555-5555-555555555555", "sortOrder": 2 }
  ]
}
```

Success response: `204 No Content`

Status codes: `204`, `400`, `401`, `403`, `404`, `422`, `500`

### 22) Client Review — Public Read

`GET /v1/viewer/{accessCode}` — no authentication. Returns one project's approved stories for a client stakeholder who holds the project's access code (`PRJ-` plus 8 characters, generated by the server, unique across workspaces; not the freelancer-chosen project `code`).

Query parameters: `limit` (default 100, max 100), `offset` (default 0).

Success response (`200`):

```json
{
  "projectName": "Clinic Management System",
  "phase": "discovery",
  "total": 1,
  "stories": [
    {
      "id": "dddddddd-dddd-dddd-dddd-dddddddddddd",
      "title": "Appointment scheduling",
      "description": "As a clinic patient, I want to book an appointment online, so that I do not need to call.",
      "acceptanceCriteria": ["A patient can pick a doctor and a free time slot"],
      "status": "todo",
      "priority": "high",
      "points": 3,
      "createdAt": "2026-05-09T12:00:00Z",
      "updatedAt": "2026-05-09T12:00:00Z"
    }
  ]
}
```

The response names no workspace, client record, project id or code, and no user. Stories are approved stories only, highest priority first, then oldest first.

Not found (`404`) is identical for an unknown and a malformed code:

```json
{ "detail": "Project not found" }
```

The route is limited to 30 requests per minute per IP (`429`). Because the code is the only credential, a freelancer can replace it:

`POST /v1/projects/{projectId}/access-code/regenerate` — Admin or Member. Returns the project with a new `accessCode`; the previous code and any link built from it stop working immediately.

Status codes (read): `200`, `404`, `422`, `429`
Status codes (regenerate): `200`, `401`, `404`

## Standard Error Examples by Status

| Status | Example body |
| --- | --- |
| `400` | `{ "detail": "Current password is incorrect" }` |
| `401` | `{ "detail": "Invalid credentials" }` |
| `403` (unverified login) | `{ "detail": "...", "code": "EMAIL_NOT_VERIFIED" }` |
| `402` | `{ "detail": "No AI credits remaining. Add your own API key to continue unlimited refinements.", "code": "INSUFFICIENT_CREDITS" }` |
| `403` | `{ "detail": "Insufficient permissions" }` |
| `404` | `{ "detail": "Project not found" }` |
| `409` | `{ "detail": "Active project limit reached" }` |
| `422` | `{ "detail": "Validation failed for field 'body -> name': Field required" }` |
| `422` (provider key) | `{ "detail": "...", "provider": "openai", "reason": "auth_failed", "promptsKeyUpdate": true }` |
| `429` | `{ "error": "Rate limit exceeded: 5 per 1 minute" }` |
| `500` | `{ "detail": "An unexpected error occurred. Please try again later." }` (production) |

Messages are illustrative; clients should branch on the status code and `code`, not on `detail` text.

## Observability (Sentry + CloudWatch)

- Attach `requestId`, endpoint, role, and `projectId` (when applicable) to Sentry event context.
- Sentry Performance tracks API contract health metrics by route:
  - 4xx validation rate,
  - 5xx error rate,
  - p95 latency,
  - refinement approval failure rate,
  - auth failure rate (failed logins, token validation).
- CloudWatch monitors infrastructure-level API health:
  - App Runner service metrics (CPU, memory, request count),
  - RDS connection pool and query performance,
  - 429 rate-limit events by endpoint.
- Trigger alerts for:
  - `5xx` rate > 2% for 5 minutes,
  - p95 latency > 2 seconds on `GET /projects` and `GET /projects/{projectId}/requirements`,
  - repeated `403` spikes indicating permission-policy drift,
  - auth failure rate > baseline for 10 minutes (potential credential attack).

## Deployment Impact (GitHub Actions)

- Validate API contract documentation changes on pull requests.
- Add/maintain contract drift checks between implemented API and this contract before production deploy.
- Require CI pass for contract-related updates before merge to `dev` or `main`.
- Enforce deployment flow: PR preview → integration on `dev` → PR to `main` → production release.
- Rollback by redeploying previous stable backend release from ECR.
- Keep environment variables for auth (`JWT_SECRET_KEY`), Sentry DSN, and database credentials consistent across environments.

## Source References

- [Architecture Solution Design](../core/architecture-solution-design.md)
- [API Design Standards](./api-design-standards.md)
- [Feature Requirements](../../01-requirements/README.md)
- [Security Architecture](../security/security-architecture.md)
- [ADR-005: Authentication Strategy](../../04-decisions/adr-005-authentication.md)

---

**Last Updated**: 2026-10-07

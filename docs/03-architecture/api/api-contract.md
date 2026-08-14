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

- **Base URL:** `/api/v1`
- **Format:** `application/json; charset=utf-8`
- **Authentication:** `Authorization: Bearer <jwt>` on protected endpoints (custom FastAPI JWT auth — see ADR-005).
- **Token expiry:** access tokens expire after 1 hour (configurable via `JWT_EXPIRE_MINUTES`). Refresh tokens deferred to Phase 2.
- **Field naming:** `camelCase`
- **Datetime format:** ISO 8601 UTC (`YYYY-MM-DDTHH:MM:SSZ`)
- **Roles:**
  - `Admin`: full CRUD
  - `Viewer`: read-only project/requirements visibility

## Endpoint Catalog

| Domain       | Method | Endpoint                                                        | Purpose                                      | Roles            |
| ------------ | ------ | --------------------------------------------------------------- | -------------------------------------------- | ---------------- |
| Auth         | POST   | `/auth/register`                                                | Register new admin account                   | Public           |
| Auth         | POST   | `/auth/login`                                                   | Login, return JWT access token               | Public           |
| Auth         | POST   | `/auth/logout`                                                  | Logout (client discards token)               | Admin, Viewer    |
| Auth         | POST   | `/auth/verify-email`                                            | Submit email verification code               | Public           |
| Auth         | POST   | `/auth/resend-verification`                                     | Resend verification code                     | Public           |
| Auth         | POST   | `/auth/forgot-password`                                         | Request password reset code                  | Public           |
| Auth         | POST   | `/auth/reset-password`                                          | Submit reset code + new password             | Public           |
| Auth         | POST   | `/auth/resend-reset-code`                                       | Resend password reset code                   | Public           |
| User         | GET    | `/user/profile`                                                 | Get current user profile                     | Admin, Viewer    |
| User         | PUT    | `/user/profile`                                                 | Update profile (display name, preferences)   | Admin, Viewer    |
| Credits      | GET    | `/user/credits`                                                 | Get AI credit balance                        | Admin            |
| API Keys     | GET    | `/user/api-keys`                                                | List configured AI provider keys (masked)    | Admin            |
| API Keys     | POST   | `/user/api-keys`                                                | Add or replace API key for a provider        | Admin            |
| API Keys     | DELETE | `/user/api-keys/{provider}`                                     | Delete API key for a provider                | Admin            |
| API Keys     | POST   | `/user/api-keys/{provider}/validate`                            | Validate an API key against provider         | Admin            |
| Clients      | GET    | `/clients`                                                      | List clients                                 | Admin            |
| Clients      | POST   | `/clients`                                                      | Create client                                | Admin            |
| Clients      | GET    | `/clients/{clientId}`                                           | Get client details                           | Admin            |
| Clients      | PUT    | `/clients/{clientId}`                                           | Update client                                | Admin            |
| Clients      | DELETE | `/clients/{clientId}`                                           | Archive client (soft-delete)                 | Admin            |
| Projects     | GET    | `/projects`                                                     | List projects (with search/filter params)    | Admin, Viewer    |
| Projects     | POST   | `/projects`                                                     | Create project (max 3 active)                | Admin            |
| Projects     | GET    | `/projects/{projectId}`                                         | Get project details                          | Admin, Viewer    |
| Projects     | PUT    | `/projects/{projectId}`                                         | Update project metadata (incl. reactivate)   | Admin            |
| Projects     | DELETE | `/projects/{projectId}`                                         | Archive project                              | Admin            |
| Refinement   | GET    | `/projects/{projectId}/refinement-sessions`                     | List refinement sessions                     | Admin            |
| Refinement   | POST   | `/projects/{projectId}/refinement-sessions`                     | Create draft from raw notes (AI refinement)  | Admin            |
| Refinement   | GET    | `/projects/{projectId}/refinement-sessions/{sessionId}`         | Get session details + draft stories          | Admin            |
| Refinement   | PUT    | `/projects/{projectId}/refinement-sessions/{sessionId}`         | Update draft and ambiguities                 | Admin            |
| Refinement   | DELETE | `/projects/{projectId}/refinement-sessions/{sessionId}`         | Delete draft session                         | Admin            |
| Refinement   | POST   | `/projects/{projectId}/refinement-sessions/{sessionId}/approve` | Approve draft as official requirements       | Admin            |
| Requirements | GET    | `/projects/{projectId}/requirements`                            | List approved requirements                   | Admin, Viewer    |
| Requirements | PUT    | `/projects/{projectId}/requirements/{requirementId}`            | Edit requirement                             | Admin            |
| Requirements | DELETE | `/projects/{projectId}/requirements/{requirementId}`            | Archive requirement                          | Admin            |
| Requirements | PUT    | `/projects/{projectId}/requirements/reorder`                    | Reorder requirements (bulk sort-order)       | Admin            |
| Exports      | POST   | `/projects/{projectId}/exports/markdown`                        | Generate markdown export                     | Admin            |
| Exports      | GET    | `/projects/{projectId}/exports/{exportId}`                      | Retrieve export metadata/download URL        | Admin            |
| Viewers      | GET    | `/viewers`                                                      | List all viewers with access                 | Admin            |
| Viewers      | POST   | `/viewers/invitations`                                          | Send viewer invitation                       | Admin            |
| Viewers      | GET    | `/viewers/invitations/{token}`                                  | Validate invitation token                    | Public           |
| Viewers      | POST   | `/viewers/invitations/{token}/accept`                           | Accept invitation + set password            | Public           |
| Viewers      | POST   | `/viewers/invitations/{invitationId}/resend`                    | Resend invitation                            | Admin            |
| Viewers      | DELETE | `/viewers/invitations/{invitationId}`                           | Revoke invitation                            | Admin            |
| Viewers      | POST   | `/viewers/{viewerId}/projects`                                  | Grant project access to viewer               | Admin            |
| Viewers      | DELETE | `/viewers/{viewerId}/projects/{projectId}`                      | Revoke project access from viewer            | Admin            |
| Viewers      | PUT    | `/viewers/me/password`                                          | Viewer changes own password                  | Viewer           |

## Shared JSON Schemas

### Error Response Schema

```json
{
  "type": "object",
  "required": ["error"],
  "properties": {
    "error": {
      "type": "object",
      "required": ["code", "message", "requestId"],
      "properties": {
        "code": { "type": "string" },
        "message": { "type": "string" },
        "details": {
          "type": "array",
          "items": { "type": "object" }
        },
        "requestId": { "type": "string" }
      }
    }
  }
}
```

Example:

```json
{
  "error": {
    "code": "PROJECT_LIMIT_REACHED",
    "message": "Maximum of 3 active projects reached.",
    "details": [{ "field": "status", "issue": "archive an existing project first" }],
    "requestId": "req_01JEXAMPLE9Y3"
  }
}
```

### Pagination Schema (Collection Responses)

```json
{
  "type": "object",
  "required": ["data", "pagination"],
  "properties": {
    "data": { "type": "array", "items": { "type": "object" } },
    "pagination": {
      "type": "object",
      "required": ["page", "pageSize", "total", "totalPages"],
      "properties": {
        "page": { "type": "integer", "minimum": 1 },
        "pageSize": { "type": "integer", "minimum": 1, "maximum": 100 },
        "total": { "type": "integer", "minimum": 0 },
        "totalPages": { "type": "integer", "minimum": 0 }
      }
    }
  }
}
```

Example:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Status Code Matrix

| Code  | Meaning               | Typical Use                         |
| ----- | --------------------- | ----------------------------------- |
| `200` | OK                    | Successful reads/updates            |
| `201` | Created               | Successful create/export generation |
| `204` | No Content            | Successful archive/delete           |
| `400` | Bad Request           | Invalid payload/query               |
| `401` | Unauthorized          | Missing/invalid JWT                 |
| `403` | Forbidden             | Role not allowed                    |
| `404` | Not Found             | Missing resource                    |
| `409` | Conflict              | Project state/rule conflict         |
| `422` | Unprocessable Entity  | Validation/domain rule issue        |
| `429` | Too Many Requests     | Rate limit exceeded                 |
| `500` | Internal Server Error | Unhandled server failure            |

## Detailed Endpoint Contracts

### 1) Create Project

- **Method/URL:** `POST /api/v1/projects`
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
    "phase": { "type": "string", "enum": ["discovery", "planning"] },

  }
}
```

Request example:

```json
{
  "clientId": "11111111-1111-1111-1111-111111111111",
  "name": "Freelancer Portal MVP",
  "description": "Discovery and planning for marketplace workflow",
  "phase": "discovery",

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

- **Method/URL:** `GET /api/v1/projects?page=1&pageSize=20&phase=discovery&status=active&clientId=...&search=portal&dateFrom=2026-01-01&dateTo=2026-12-31`
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

- **Method/URL:** `POST /api/v1/projects/{projectId}/refinement-sessions`
- **Description:** Accepts raw notes/bullets and returns structured draft plus ambiguity highlights. Consumes 1 AI credit if using platform credits (not user-provided API key).

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

Status codes: `201`, `400`, `401`, `403`, `404`, `422`, `500`

### 4) Approve Refinement Session

- **Method/URL:** `POST /api/v1/projects/{projectId}/refinement-sessions/{sessionId}/approve`
- **Description:** Converts draft stories into official requirements.

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

- **Method/URL:** `GET /api/v1/projects/{projectId}/requirements?page=1&pageSize=20`
- **Description:** Returns approved requirement backlog for Admin/Viewer.

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

- **Method/URL:** `PUT /api/v1/projects/{projectId}/requirements/{requirementId}`
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
    },

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

- **Method/URL:** `POST /api/v1/projects/{projectId}/exports/markdown`
- **Description:** Generates markdown artifact from approved requirements.

Request schema:

```json
{
  "type": "object",

  "properties": {

    "status": { "type": "string", "enum": ["approved", "draft", "all"] },
    "dateFrom": { "type": "string", "format": "date" },
    "dateTo": { "type": "string", "format": "date" }
  }
}
```

Success response example (`201`):

```json
{
  "exportId": "55555555-5555-5555-5555-555555555555",
  "projectId": "22222222-2222-2222-2222-222222222222",
  "format": "markdown",
  "status": "ready",
  "downloadUrl": "https://storage.example.com/exports/55555555-5555-5555-5555-555555555555.md",
  "createdAt": "2026-02-28T17:22:00Z"
}
```

Status codes: `201`, `400`, `401`, `403`, `404`, `409`, `500`

### 8) Archive Resources

- **Methods/URLs:**
  - `DELETE /api/v1/clients/{clientId}`
  - `DELETE /api/v1/projects/{projectId}`
  - `DELETE /api/v1/projects/{projectId}/requirements/{requirementId}`
- **Description:** Soft-archive resources; data remains auditable. Client archive blocked (409) if client has active projects.

Success response: `204 No Content`

Status codes: `204`, `400`, `401`, `403`, `404`, `409`, `500`

### Client archive blocked (409):

```json
{
  "error": {
    "code": "CLIENT_HAS_ACTIVE_PROJECTS",
    "message": "Archive or reassign active projects before archiving this client.",
    "details": [{ "field": "clientId", "issue": "has_active_projects" }],
    "requestId": "req_01JEXAMPLE409C"
  }
}
```

### 9) Update Project

- **Method/URL:** `PUT /api/v1/projects/{projectId}`
- **Description:** Update project metadata, including status change (reactivate archived → active). 409 if reactivating would exceed 3-active limit.

Request schema:

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1, "maxLength": 120 },
    "description": { "type": "string", "maxLength": 5000 },
    "phase": { "type": "string", "enum": ["discovery", "planning"] },
    "status": { "type": "string", "enum": ["active", "archived"] },

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

- **Method/URL:** `PUT /api/v1/clients/{clientId}`
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
  "contactEmail": "pm@acmecorp.com",
  "status": "active",
  "createdAt": "2026-02-28T17:00:00Z",
  "updatedAt": "2026-08-11T10:30:00Z"
}
```

Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### 11) Auth — Login

- **Method/URL:** `POST /api/v1/auth/login`
- **Description:** Authenticate with email and password. Returns JWT access token. Account locked after 5 failed attempts in 15 minutes.

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
  "expiresIn": 3600,
  "user": {
    "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    "email": "admin@example.com",
    "displayName": "Admin User",
    "role": "admin"
  }
}
```

Status codes: `200`, `400`, `401`, `422`, `429`, `500`

### 12) Auth — Register

- **Method/URL:** `POST /api/v1/auth/register`
- **Description:** Register new admin account. Triggers email verification code. Accounts created as Admin role.

Request schema:

```json
{
  "type": "object",
  "required": ["email", "password"],
  "properties": {
    "email": { "type": "string", "format": "email" },
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"
    }
  }
}
```

Request example:

```json
{
  "email": "admin@example.com",
  "password": "SecureP4ssword"
}
```

Success response example (`201`):

```json
{
  "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  "email": "admin@example.com",
  "role": "admin",
  "emailVerified": false
}
```

Status codes: `201`, `400`, `409`, `422`, `429`, `500`

### 13) Auth — Email Verification

- **Method/URL:** `POST /api/v1/auth/verify-email`
- **Description:** Submit 6-digit verification code sent to email. Account cannot login until verified. Code expires after 5 minutes.
- **Resend:** `POST /api/v1/auth/resend-verification` — resends code (max 3 per 15-minute window).

Request schema:

```json
{
  "type": "object",
  "required": ["email", "code"],
  "properties": {
    "email": { "type": "string", "format": "email" },
    "code": { "type": "string", "minLength": 6, "maxLength": 6 }
  }
}
```

Success response example (`200`):

```json
{
  "email": "admin@example.com",
  "verified": true
}
```

Status codes: `200`, `400`, `404`, `410`, `422`, `429`, `500`

### 14) Auth — Password Reset

- **Forgot password:** `POST /api/v1/auth/forgot-password` — privacy-preserving response (always returns 200 even if email not found). Sends 6-digit reset code.
- **Reset password:** `POST /api/v1/auth/reset-password` — submits reset code + new password. Code expires after 5 minutes, single-use.
- **Resend code:** `POST /api/v1/auth/resend-reset-code` — max 3 per 15-minute window.

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
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"
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

- **Method/URL:** `POST /api/v1/auth/logout`
- **Description:** Client discards the JWT token. Stateless — no server-side session invalidation.

Success response: `204 No Content`

Status codes: `204`, `401`, `500`

### 16) User Profile

- **Method/URL:** `GET /api/v1/user/profile`, `PUT /api/v1/user/profile`
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

### 17) AI Credits

- **Method/URL:** `GET /api/v1/user/credits`
- **Description:** Returns current AI credit balance. Credits are granted (5) after email verification.

Response example (`200`):

```json
{
  "credits": 3,
  "totalGranted": 5
}
```

Status codes: `200`, `401`, `500`

### 18) API Key Management

- **List keys:** `GET /api/v1/user/api-keys` — returns configured providers with masked keys.
- **Add/replace key:** `POST /api/v1/user/api-keys` — upsert an API key for a provider. Validates against provider on save.
- **Delete key:** `DELETE /api/v1/user/api-keys/{provider}` — remove key for a provider.
- **Validate key:** `POST /api/v1/user/api-keys/{provider}/validate` — tests key against provider's endpoint.

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
  "valid": true
}
```

Validation error response (`422`):

```json
{
  "error": {
    "code": "API_KEY_INVALID",
    "message": "Provider rejected the key. Check your API key and try again.",
    "details": [],
    "requestId": "req_01JEXAMPLE422K"
  }
}
```

Status codes (list): `200`, `401`, `500`
Status codes (add): `201`, `400`, `401`, `422`, `429`, `500`
Status codes (delete): `204`, `401`, `404`, `500`
Status codes (validate): `200`, `400`, `401`, `422`, `429`, `500`

### 19) Refinement — List and Delete Sessions

- **List sessions:** `GET /api/v1/projects/{projectId}/refinement-sessions?status=draft` — returns sessions, optionally filtered by status.
- **Get session:** `GET /api/v1/projects/{projectId}/refinement-sessions/{sessionId}` — get full session details with draft stories and ambiguities.
- **Delete session:** `DELETE /api/v1/projects/{projectId}/refinement-sessions/{sessionId}` — delete a draft session (approved sessions cannot be deleted).

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

### 20) Requirements — Reorder

- **Method/URL:** `PUT /api/v1/projects/{projectId}/requirements/reorder`
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

### 21) Viewer — Invitations

- **Send invitation:** `POST /api/v1/viewers/invitations` — Admin sends invitation by email + project selection. Token expires after 7 days.
- **Validate token:** `GET /api/v1/viewers/invitations/{token}` — returns project info, expiry status (public, no auth required).
- **Accept invitation:** `POST /api/v1/viewers/invitations/{token}/accept` — Viewer sets password, creates account.
- **Resend invitation:** `POST /api/v1/viewers/invitations/{invitationId}/resend` — rate-limited to 3 per hour.
- **Revoke invitation:** `DELETE /api/v1/viewers/invitations/{invitationId}` — Admin cancels pending invitation.

Send invitation request schema:

```json
{
  "type": "object",
  "required": ["email", "projectIds"],
  "properties": {
    "email": { "type": "string", "format": "email" },
    "projectIds": {
      "type": "array",
      "minItems": 1,
      "items": { "type": "string", "format": "uuid" }
    }
  }
}
```

Send invitation response (`201`):

```json
{
  "invitationId": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
  "email": "viewer@client.com",
  "projectIds": ["22222222-2222-2222-2222-222222222222"],
  "status": "pending",
  "sentAt": "2026-08-11T10:00:00Z",
  "expiresAt": "2026-08-18T10:00:00Z"
}
```

Validate token response (`200`):

```json
{
  "email": "viewer@client.com",
  "projects": [
    { "id": "22222222-2222-2222-2222-222222222222", "name": "Freelancer Portal MVP" }
  ],
  "status": "pending",
  "expiresAt": "2026-08-18T10:00:00Z"
}
```

Accept invitation request schema:

```json
{
  "type": "object",
  "required": ["password", "displayName"],
  "properties": {
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"
    },
    "displayName": { "type": "string", "maxLength": 100 }
  }
}
```

Accept invitation response (`201`):

```json
{
  "id": "cccccccc-cccc-cccc-cccc-cccccccccccc",
  "email": "viewer@client.com",
  "displayName": "Viewer User",
  "role": "viewer"
}
```

Status codes (send): `201`, `400`, `401`, `403`, `422`, `429`, `500`
Status codes (validate): `200`, `404`, `410`, `500`
Status codes (accept): `201`, `400`, `404`, `410`, `422`, `500`
Status codes (resend): `200`, `401`, `403`, `404`, `410`, `429`, `500`
Status codes (revoke): `204`, `401`, `403`, `404`, `500`

### 22) Viewer — Access Management

- **List viewers:** `GET /api/v1/viewers` — Admin lists all viewers with access and invitation status.
- **Grant access:** `POST /api/v1/viewers/{viewerId}/projects` — grant viewer access to additional projects.
- **Revoke access:** `DELETE /api/v1/viewers/{viewerId}/projects/{projectId}` — revoke project access.
- **Change password:** `PUT /api/v1/viewers/me/password` — Viewer changes own password.

List viewers response example (`200`):

```json
{
  "data": [
    {
      "viewerId": "cccccccc-cccc-cccc-cccc-cccccccccccc",
      "email": "viewer@client.com",
      "displayName": "Viewer User",
      "invitationStatus": "accepted",
      "projectsGranted": [
        { "id": "22222222-2222-2222-2222-222222222222", "name": "Freelancer Portal MVP" }
      ],
      "invitedAt": "2026-08-11T10:00:00Z"
    }
  ],
  "pagination": { "page": 1, "pageSize": 20, "total": 1, "totalPages": 1 }
}
```

Grant access request schema:

```json
{
  "type": "object",
  "required": ["projectIds"],
  "properties": {
    "projectIds": {
      "type": "array",
      "minItems": 1,
      "items": { "type": "string", "format": "uuid" }
    }
  }
}
```

Change password request schema:

```json
{
  "type": "object",
  "required": ["currentPassword", "newPassword"],
  "properties": {
    "currentPassword": { "type": "string" },
    "newPassword": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"
    }
  }
}
```

Status codes (list): `200`, `401`, `403`, `500`
Status codes (grant): `201`, `400`, `401`, `403`, `404`, `500`
Status codes (revoke): `204`, `401`, `403`, `404`, `500`
Status codes (password): `200`, `400`, `401`, `403`, `422`, `500`

## Standard Error Examples by Status

### 400 Bad Request

```json
{
  "error": {
    "code": "INVALID_QUERY_PARAM",
    "message": "pageSize must be between 1 and 100.",
    "details": [{ "field": "pageSize", "issue": "out_of_range" }],
    "requestId": "req_01JEXAMPLE400"
  }
}
```

### 404 Not Found

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project was not found.",
    "details": [],
    "requestId": "req_01JEXAMPLE404"
  }
}
```

### 500 Internal Server Error

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred.",
    "details": [],
    "requestId": "req_01JEXAMPLE500"
  }
}
```

### 401 Unauthorized

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password.",
    "details": [],
    "requestId": "req_01JEXAMPLE401"
  }
}
```

### 409 Conflict

```json
{
  "error": {
    "code": "PROJECT_LIMIT_REACHED",
    "message": "Cannot reactivate project. Maximum of 3 active projects reached.",
    "details": [{ "field": "status", "issue": "archive an existing project first" }],
    "requestId": "req_01JEXAMPLE409P"
  }
}
```

### 422 Unprocessable Entity

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Password must be at least 8 characters with uppercase, lowercase, and a digit.",
    "details": [{ "field": "password", "issue": "policy_violation" }],
    "requestId": "req_01JEXAMPLE422"
  }
}
```

### 429 Too Many Requests

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many attempts. Please try again later.",
    "details": [{ "field": "login", "issue": "account_locked" }],
    "requestId": "req_01JEXAMPLE429"
  }
}
```

### AI Provider Errors (422)

```json
{
  "error": {
    "code": "AI_PROVIDER_ERROR",
    "message": "OpenAI API request timed out after 30 seconds.",
    "details": [{ "provider": "openai", "issue": "timeout" }],
    "requestId": "req_01JEXAMPLEAI"
  }
}
```

### Insufficient Credits (402 or 422)

```json
{
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "No AI credits remaining. Add an API key or contact support.",
    "details": [{ "creditsRemaining": 0 }],
    "requestId": "req_01JEXAMPLECRD"
  }
}
```

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
- [ADR-005: Authentication Strategy](../adrs/adr-005-authentication.md)

---

**Last Updated**: 2026-08-11

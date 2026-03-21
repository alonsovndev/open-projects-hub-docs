# API Contract

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-02-28                  |

## Sources

- [Project Overview](../overview.md)
- [Functional Requirements](../01-requirements/functional-requirements.md)
- [Non-Functional Requirements](../01-requirements/non-functional-requirements.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [API Design Standards](./api-design-standards.md)

## API Scope and Conventions

- **Base URL:** `/api/v1`
- **Format:** `application/json; charset=utf-8`
- **Authentication:** `Authorization: Bearer <jwt>` on protected endpoints
- **Field naming:** `camelCase`
- **Datetime format:** ISO 8601 UTC (`YYYY-MM-DDTHH:MM:SSZ`)
- **Roles:**
  - `Admin`: full CRUD
  - `Viewer`: read-only project/requirements visibility (no internal notes)

## Endpoint Catalog

| Domain       | Method | Endpoint                                                        | Purpose                               | Roles         |
| ------------ | ------ | --------------------------------------------------------------- | ------------------------------------- | ------------- |
| Clients      | GET    | `/clients`                                                      | List clients                          | Admin         |
| Clients      | POST   | `/clients`                                                      | Create client                         | Admin         |
| Clients      | GET    | `/clients/{clientId}`                                           | Get client details                    | Admin         |
| Clients      | PUT    | `/clients/{clientId}`                                           | Update client                         | Admin         |
| Clients      | DELETE | `/clients/{clientId}`                                           | Archive client                        | Admin         |
| Projects     | GET    | `/projects`                                                     | List projects                         | Admin, Viewer |
| Projects     | POST   | `/projects`                                                     | Create project (max 3 active)         | Admin         |
| Projects     | GET    | `/projects/{projectId}`                                         | Get project details                   | Admin, Viewer |
| Projects     | PUT    | `/projects/{projectId}`                                         | Update project metadata               | Admin         |
| Projects     | DELETE | `/projects/{projectId}`                                         | Archive project                       | Admin         |
| Refinement   | POST   | `/projects/{projectId}/refinement-sessions`                     | Create draft from raw notes           | Admin         |
| Refinement   | PUT    | `/projects/{projectId}/refinement-sessions/{sessionId}`         | Update draft and ambiguities          | Admin         |
| Refinement   | POST   | `/projects/{projectId}/refinement-sessions/{sessionId}/approve` | Approve draft as official artifacts   | Admin         |
| Requirements | GET    | `/projects/{projectId}/requirements`                            | List approved requirements            | Admin, Viewer |
| Requirements | PUT    | `/projects/{projectId}/requirements/{requirementId}`            | Edit requirement                      | Admin         |
| Requirements | DELETE | `/projects/{projectId}/requirements/{requirementId}`            | Archive requirement                   | Admin         |
| Exports      | POST   | `/projects/{projectId}/exports/markdown`                        | Generate markdown export              | Admin         |
| Exports      | GET    | `/projects/{projectId}/exports/{exportId}`                      | Retrieve export metadata/download URL | Admin         |

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
    "internalNotes": { "type": "string", "maxLength": 5000 }
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
  "internalNotes": "Client wants release in 6 weeks"
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
    "internalNotes": { "type": "string" },
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
  "internalNotes": "Client wants release in 6 weeks",
  "createdAt": "2026-02-28T17:00:00Z",
  "updatedAt": "2026-02-28T17:00:00Z"
}
```

Status codes: `201`, `400`, `401`, `403`, `409`, `422`, `500`

### 2) List Projects (Paginated)

- **Method/URL:** `GET /api/v1/projects?page=1&pageSize=20&phase=discovery`
- **Description:** Returns projects visible to caller role. Viewer never receives `internalNotes`.

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
- **Description:** Accepts raw notes/bullets and returns structured draft plus ambiguity highlights.

Request schema:

```json
{
  "type": "object",
  "required": ["rawInput"],
  "properties": {
    "rawInput": { "type": "string", "minLength": 1, "maxLength": 20000 },
    "sourceFormat": { "type": "string", "enum": ["plain_text", "bullet_list"] }
  }
}
```

Request example:

```json
{
  "rawInput": "Client wants login, project tracking, and export to markdown. maybe also comments.",
  "sourceFormat": "plain_text"
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
    "internalNotes": { "type": "string", "maxLength": 5000 }
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
  "required": ["includeInternalNotes"],
  "properties": {
    "includeInternalNotes": { "type": "boolean" }
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
- **Description:** Soft-archive resources; data remains auditable.

Success response: `204 No Content`

Status codes: `204`, `400`, `401`, `403`, `404`, `409`, `500`

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

## Observability (Sentry)

- Attach `requestId`, endpoint, role, and `projectId` (when applicable) to Sentry event context.
- Track API contract health metrics by route:
  - 4xx validation rate,
  - 5xx error rate,
  - p95 latency,
  - refinement approval failure rate.
- Trigger alerts for:
  - `5xx` rate > 2% for 5 minutes,
  - p95 latency > 2 seconds on `GET /projects` and `GET /projects/{projectId}/requirements`,
  - repeated `403` spikes indicating permission-policy drift.

## Deployment Impact (GitHub Actions)

- Validate API contract markdown changes with documentation checks on pull requests.
- Add/maintain contract drift checks between implemented OpenAPI spec and this contract before production deploy.
- Require CI pass for contract-related updates before merge to `develop` or `main`.
- Enforce deployment flow: PR preview → staging verification → production release.
- Rollback by reverting merge commit and redeploying previous stable backend release.
- Keep environment variables for auth/Sentry consistent across development, staging, and production.

---
sidebar_position: 2
---

# API Contract

This guide describes the implemented API and illustrates the main review workflow. Examples use synthetic data; they are not production records or captured test results.

The backend's [generated OpenAPI schema at reviewed revision `63f1512`](https://github.com/alonsovndev/open-projects-hub-api/blob/63f1512f9cf879d4d71570ce59ff9aa691a426b1/docs/api/openapi.json) (exported with `make export-openapi`) and its route/DTO definitions provide the exact endpoint constraints. This page is a narrative companion rather than a second complete schema.

## Conventions

- Business endpoints use the `/v1` prefix. Health endpoints live outside it: `/health`, `/health/live`, and `/health/ready`.
- Protected endpoints require `Authorization: Bearer <access token>`; refresh tokens are not valid bearer access tokens.
- JSON DTOs normally use `camelCase`. Query parameters and pagination metadata have documented exceptions.
- Dates use `YYYY-MM-DD`; timestamps use ISO 8601 with a UTC offset or `Z`.
- Admins and Members work within their own workspace. Foreign-workspace records return `404`.
- Anonymous clients read one project's approved backlog using an access code. Client accounts are not required.

## Worked example: notes to an approved backlog

The following requests use the fictional contact-form project from the [reviewer guide](../../00-context/reviewer-guide.md#worked-example-a-clients-contact-form). They assume an authenticated Admin or Member and a project in their workspace. UUIDs are illustrative: use the identifiers returned by your own API instance.

### 1. Generate editable stories

`POST /v1/refinement/generate-stories`

```json
{
  "projectId": "22222222-2222-2222-2222-222222222222",
  "rawNotes": "Visitors should be able to send us an enquiry from our website.\nAsk for their name, email address, and message. Notify us when it arrives.\nShow visitors whether their enquiry was sent successfully.",
  "provider": "platform"
}
```

`rawNotes` must contain 20–5,000 characters. `provider` is optional and defaults to `platform`; other values are `gemini`, `openai`, and `deepseek`, which use the caller's saved key for that provider.

The following `200` response is an illustrative, manually reviewed candidate, not a captured provider response. As in the reviewer guide, the freelancer clarifies the required fields and email notification with the client before approval; generated output is not guaranteed to resolve that ambiguity:

```json
{
  "stories": [
    {
      "title": "Send a website enquiry",
      "description": "As a website visitor, I want to send an enquiry to the business, so that I can ask about its services.",
      "acceptanceCriteria": [
        "A visitor enters a name, a valid email address, and a message before submitting.",
        "A valid submission sends the enquiry to the business mailbox agreed with the client.",
        "The visitor sees a success message after submission succeeds.",
        "If submission fails, the form preserves the visitor's input and offers a retry."
      ]
    }
  ],
  "rawNotes": "Visitors should be able to send us an enquiry from our website.\nAsk for their name, email address, and message. Notify us when it arrives.\nShow visitors whether their enquiry was sent successfully.",
  "redactionCount": 0,
  "provider": "platform",
  "creditsRemaining": 4
}
```

No story or refinement-session record is stored by this request. The browser holds the editable output. `redactionCount` reports sanitization changes; `rawNotes` preserves the original input.

A successful platform run charges one credit after generation; an unsuccessful provider run does not. `creditsRemaining` is normally `null` for a user-key run; it can also be `null` if a concurrent request exhausted the balance before charging, in which case the client should reload the balance.

### 2. Approve selected content

`POST /v1/refinement/approve-stories`

```json
{
  "stories": [
    {
      "projectId": "22222222-2222-2222-2222-222222222222",
      "title": "Send a website enquiry",
      "description": "As a website visitor, I want to send an enquiry to the business, so that I can ask about its services.",
      "acceptanceCriteria": [
        "A visitor enters a name, a valid email address, and a message before submitting.",
        "A valid submission sends the enquiry to the business mailbox agreed with the client.",
        "The visitor sees a success message after submission succeeds.",
        "If submission fails, the form preserves the visitor's input and offers a retry."
      ]
    }
  ]
}
```

The server validates story content and project workspace before persistence. A successful `200` response identifies the new stories:

```json
{
  "approvedCount": 1,
  "stories": [
    {
      "id": "44444444-4444-4444-4444-444444444444",
      "title": "Send a website enquiry"
    }
  ]
}
```

For one story, use `POST /v1/refinement/approve-story` with the story object directly. Discarding a generated draft is a browser action and requires no delete endpoint.

### 3. Read or export the result

`GET /v1/projects/{projectId}/backlog` reads the saved backlog. A story's `status` tracks delivery (`todo`, `in_progress`, `blocked`, or `done`), not whether it was approved.

`POST /v1/projects/{projectId}/exports/markdown` returns a Markdown attachment. An omitted body exports the whole backlog; optional filters are `status`, `dateFrom`, and `dateTo`.

The response uses `text/markdown` and `Content-Disposition: attachment`. `X-Export-Story-Count` reports the included count; an optional `X-Export-Warning` reports an empty or truncated export. No file or export-history record is stored.

## Endpoint Catalog

All paths are relative to `/v1`.

| Domain | Method | Endpoint | Purpose | Roles |
| --- | --- | --- | --- | --- |
| Auth | POST | `/auth/register` | Self sign-up: creates a new workspace and its Admin (unverified) | Public |
| Auth | POST | `/auth/verify-email` | Submit an email verification or invite code; invitees also set their password | Public |
| Auth | POST | `/auth/resend-verification` | Resend the verification code | Public |
| Auth | POST | `/auth/login` | Log in; returns access and refresh tokens | Public |
| Auth | POST | `/auth/refresh` | Rotate a refresh token for a new token pair | Public |
| Auth | POST | `/auth/logout` | Revoke refresh credential; cookie mode checks trusted Origin | Session |
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

The table lists implemented routes. Superseded designs are summarized separately at the end of this page.

## Project and client examples

### Create a project

`POST /v1/projects` requires `name`, `code`, `clientId`, and `phase`. The project code is chosen by the freelancer; the review access code is generated separately by the server.

```json
{
  "name": "Freelancer Portal MVP",
  "code": "PORTAL-MVP",
  "clientId": "11111111-1111-1111-1111-111111111111",
  "phase": "discovery",
  "description": "Discovery and planning for the client portal",
  "priority": "medium"
}
```

Success returns `201` with the project. Phases are `discovery` and `planning`; lifecycle statuses are `active`, `completed`, and `archived`. A workspace can have at most three active projects. The returned `accessCode` is a sharing credential and should be treated accordingly.

### List and update records

`GET /v1/projects?offset=0&limit=20&status=active&search=portal` returns matching projects in the caller's workspace. Optional filters include `clientId`, `createdFrom`, `createdTo`, `updatedFrom`, and `updatedTo` (ISO datetimes). Search matches name or code; `phase`, `page`, and `pageSize` are not project-list filters.

A representative empty `200` response is:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "per_page": 20
}
```

List endpoints generally use `offset` and `limit` (default 20, maximum 100). The client list uses `perPage` rather than `per_page`.

Use `PATCH /v1/projects/{projectId}` or `PATCH /v1/clients/{clientId}` for partial updates. Client contact email is `email`, not `contactEmail`; clients have no archive-status field.

### Archive, reactivate, and delete

Archive/reactivate actions return the updated project (`200`). Reactivation is refused with `409` if it would exceed the active-project limit. Deleting a project returns `204` and removes its stories.

Deleting a client returns `409` while it has active projects. Otherwise the deletion removes the client and its archived projects. Deletion is permanent; archiving is a separate project operation.

## Authentication and account recovery

### Register and verify

`POST /v1/auth/register` creates a workspace and its unverified Admin. `role` cannot be supplied by the caller.

```json
{
  "displayName": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecureP4ss!",
  "workspaceName": "Jane's Studio"
}
```

`workspaceName` is optional; its default is based on the display name. An illustrative `201` response is:

```json
{
  "email": "ja***@example.com",
  "verificationRequired": true,
  "nextStep": "verify-email",
  "codeExpiresAt": "2026-10-19T18:05:00+00:00"
}
```

Existing verified accounts receive the same response shape; the account owner is notified by email. Registering an address held only by an unverified account replaces that pending account. These behaviors prevent the form from directly disclosing whether an account exists.

`POST /v1/auth/verify-email` accepts:

```json
{
  "email": "jane@example.com",
  "code": "ABC234"
}
```

Success returns `200` with `{ "verified": true }`; the user then signs in. Self-registration codes expire after five minutes. Invited Members use a 24-hour code and must supply `password` when verifying.

Codes use six characters from `23456789ABCDEFGHJKLMNPQRSTUVWXYZ`, are case-insensitive, and are stored hashed. Wrong, expired, superseded, unknown-email, or already-used verification attempts receive the generic invalid-code response. Five wrong guesses lock the code.

`POST /v1/auth/resend-verification` takes `{ "email": "jane@example.com" }`, invalidates the previous code, and returns a generic response. The registration code plus three resends can be issued within a 15-minute window; endpoint-level IP limits apply separately.

### Login, refresh, and logout

`POST /v1/auth/login` takes `email`, `password`, and optional `rememberMe`.

For browser sessions, send `X-Session-Mode: cookie` and a trusted `Origin`. Login and refresh return `accessToken`, `sessionExpiresAt`, and `user`. The refresh token is delivered only in the `oph_refresh_token` HttpOnly cookie, scoped to `/v1/auth`; it is not included in the browser JSON response.

The browser sends `POST /v1/auth/refresh` with the same session-mode header, trusted Origin, and cookie, with no body credentials. Refresh rotates the token. Sessions slide 24 hours from refresh, or seven days when `rememberMe` was selected.

Other clients omit cookie mode and receive a JSON `refreshToken`; they send `{ "refreshToken": "<token>" }` on refresh. A refresh token is single-use in either mode.

`POST /v1/auth/logout` revokes the refresh credential. Cookie mode also clears the cookie and does not require a still-valid access token; body-token clients authenticate and supply their refresh token. Logout does not revoke an issued access JWT before its normal expiry.

### Password reset

`POST /v1/auth/forgot-password` takes an email and returns a generic `200` response, whether or not that address has an account:

```json
{
  "message": "If an account exists for this email, a reset code has been sent."
}
```

`POST /v1/auth/reset-password` accepts `email`, `code`, and `newPassword`. Reset codes are hashed, single-use, and expire after **30 minutes**. A successful reset changes the password and invalidates existing refresh sessions.

`POST /v1/auth/resend-reset-code` issues a replacement. The initial request and resends share a maximum of three issued codes per account per 15-minute window; IP and code-attempt limits are separate.

## Team, profile, credits, and provider keys

An Admin invites a Member through `POST /v1/users`; the invitee confirms ownership and sets their own password. A workspace holds at most five users, including inactive and unverified accounts. Admin-only routes manage member status/removal and workspace renaming; both roles can list workspace users and edit their own profile.

Accounts start with no platform AI credits. Verification grants five credits subject to a lifetime ceiling of 25 granted credits per workspace. `GET /v1/users/me/credits` returns:

```json
{
  "credits": 3,
  "totalGranted": 5
}
```

Provider-key management is per user:

| Operation | Behavior |
| --- | --- |
| `GET /users/me/api-keys` | Returns `keys` with provider, mask, configuration time, and nullable last validation time. |
| `POST /users/me/api-keys` | Takes `provider` and `apiKey`; validates format and provider acceptance, then encrypts and saves; returns `201`. Repeating a provider replaces its key. |
| `POST /users/me/api-keys/{provider}/validate` | Re-tests a stored key; returns provider, `valid`, and best-effort `quotaWarning`. |
| `DELETE /users/me/api-keys/{provider}` | Permanently removes the key; returns `204`. |

The budget is five provider-validation attempts per user per hour and applies to save and explicit revalidation. No route retrieves plaintext key material. `quotaWarning` depends on provider usage headers; lack of a warning does not prove quota remains.

## Public Client Review

`GET /v1/viewer/{accessCode}` needs no authentication. It returns the project name, phase, total count, and approved stories. Parameters are `limit` (default/maximum 100) and `offset` (default 0).

A response includes story IDs and content but no workspace, client, project, or user identifiers. Stories are ordered by priority, then age. Unknown and malformed codes return the same `404`:

```json
{ "detail": "Project not found" }
```

The route is limited to 30 requests per minute per IP. `POST /v1/projects/{projectId}/access-code/regenerate` replaces the code and invalidates the old link. Anyone holding a valid code can read that project; access is shared rather than assigned to a person.

## Errors and observability

Most errors contain a string `detail`; some add a machine-readable `code`. These examples show actual response forms rather than a universal nested envelope:

| Status | Example or behavior |
| --- | --- |
| `400` | Domain validation, such as too little usable text after sanitization. |
| `401` | `{ "detail": "Not authenticated" }` or an invalid/expired token. |
| `402` | `{ "detail": "No AI credits remaining. Add your own API key to continue unlimited refinements.", "code": "INSUFFICIENT_CREDITS" }` |
| `403` | Insufficient role, untrusted cookie-session origin, or an unverified account at login. |
| `404` | Missing or foreign-workspace record; unknown review code. |
| `409` | Active-project/user limit or lifecycle conflict. |
| `422` | Request validation or provider-key rejection; key errors add `code`, `provider`, `reason`, and `promptsKeyUpdate`. |
| `429` | Rate limit or lockout; the IP limiter uses `{ "error": "Rate limit exceeded: 5 per 1 minute" }`. |
| `500` | Unexpected application failure. |
| `502` | Refinement-provider failure; includes `detail`, `failureClass`, `provider`, and original `rawNotes` for retry. |

Responses carry `X-Request-ID` for correlation with structured logs. Sentry captures backend exceptions in production. Current monitoring limitations are documented in [Monitoring and Observability](../ops/monitoring-observability.md).

## Superseded endpoint designs

The following designs are historical, not callable API routes. They are summarized here to explain older planning references without mixing their examples into the active contract.

| Original design | Current implementation |
| --- | --- |
| Project refinement sessions, session approval, session list/get/delete | Generate drafts with `/refinement/generate-stories`; submit content to approval routes. Drafts are not persisted ([ADR-019](../../04-decisions/adr-019-no-persisted-draft-stories.md)). |
| Project `/requirements` resources and `statement` fields | Story routes and the project backlog; story text is `description`. |
| Requirement manual reorder / `sortOrder` | Not implemented; stories use existing list ordering. |
| Stored export resource/history | Markdown is returned directly; no export record or file is stored. |

These entries are not promises of future compatibility. Changes require an explicit new implementation decision.

## Source references

- Backend source: `src/app/features/*/presentation/` and application DTOs.
- Generated backend artifact: `docs/api/openapi.json`.
- [API Design Standards](./api-design-standards.md)
- [Security Architecture](../security/security-architecture.md)
- [Database Design](../database/database-design.md)
- [Feature Requirements](../../01-requirements/README.md)
- [ADR-005: Authentication Strategy](../../04-decisions/adr-005-authentication.md)

**Last Updated**: 2026-10-19

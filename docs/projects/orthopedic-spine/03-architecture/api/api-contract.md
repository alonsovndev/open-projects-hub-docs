# Orthopedic Spine — API Contract

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Tech Lead        |

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [API Design Standards](./api-design-standards.md)
- [Technology Stack](../technology-stack.md)
- [Feature Requirements Index](../../01-requirements/readme.md)
- [F-002 Inquiry and Appointment Request Flow](../../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [F-003 Clinic Profile, Location, and Social Presence](../../01-requirements/f-003-clinic-profile-location-and-social-presence.md)
- [F-004 Admin Content and Testimonial Management](../../01-requirements/f-004-admin-content-and-testimonial-management.md)
- [F-005 Inquiry Review and Staff Operations](../../01-requirements/f-005-inquiry-review-and-staff-operations.md)
- [F-006 Admin Access and Role Boundaries](../../01-requirements/f-006-admin-access-and-role-boundaries.md)
- [Phased Roadmap](../../02-planning/phased-roadmap.md)

---

## API Scope and Conventions

- **Base URL:** `/api/v1`
- **Format:** `application/json; charset=utf-8`
- **Authentication:** `Authorization: Bearer <jwt>` on protected endpoints only
- **Field naming:** `camelCase`
- **Datetime format:** ISO 8601 UTC (`YYYY-MM-DDTHH:MM:SSZ`)
- **Locale behavior:** public content endpoints accept `?locale=en|es`; omit the query to receive both locales when admin editing needs the full bilingual payload
- **Public/private split:** public read and inquiry endpoints stay outside `/admin`; protected content and operations endpoints live under `/admin`
- **Roles:**
  - `public`: unauthenticated read access to published content and inquiry submission
  - `staff`: read inquiries and update scoped operational details
  - `admin`: full content CRUD, testimonial approval, and inquiry workflow control

## Endpoint Catalog

| Domain | Method | Endpoint | Purpose | Roles |
| ------ | ------ | -------- | ------- | ----- |
| Public Content | GET | `/services?locale=en` | List published services for the public site | Public |
| Public Content | GET | `/testimonials?locale=en` | List approved published testimonials | Public |
| Clinic Profile | GET | `/clinic-profile?locale=en` | Return public clinic details, hours, and contact channels | Public |
| Inquiries | POST | `/inquiries` | Submit inquiry or appointment request | Public |
| Admin Content | GET | `/admin/services` | List editable service records including draft state | Admin |
| Admin Content | POST | `/admin/services` | Create a bilingual service record | Admin |
| Admin Content | PUT | `/admin/services/{serviceId}` | Update a service record and publish state | Admin |
| Admin Testimonials | GET | `/admin/testimonials` | List testimonial records and approval state | Admin |
| Admin Testimonials | POST | `/admin/testimonials` | Create or import testimonial draft content | Admin |
| Admin Testimonials | POST | `/admin/testimonials/{testimonialId}/approve` | Record approval and publish eligibility | Admin |
| Inquiry Operations | GET | `/admin/inquiries?page=1&pageSize=20&status=new` | List inquiries for follow-up | Admin, Staff |
| Inquiry Operations | PATCH | `/admin/inquiries/{inquiryId}` | Update inquiry operational state and assignment | Admin, Staff |
| Clinic Operations | GET | `/admin/clinic-profile` | Load editable clinic profile and operational details | Admin, Staff |
| Clinic Operations | PATCH | `/admin/clinic-profile/operational-details` | Update scoped hours, phones, and contact methods | Admin, Staff |
| Access Control | GET | `/admin/me` | Return authenticated actor and role context | Admin, Staff |

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
          "items": {
            "type": "object",
            "properties": {
              "field": { "type": "string" },
              "issue": { "type": "string" }
            }
          }
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
    "code": "SPAM_VERIFICATION_FAILED",
    "message": "We could not verify your submission. Please try again.",
    "details": [{ "field": "turnstileToken", "issue": "verification failed" }],
    "requestId": "req_01JSPINE123ABC"
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

### Shared Resource Shapes

#### Public Service

```json
{
  "id": "svc_01",
  "slug": "spine-rehabilitation",
  "name": "Spine Rehabilitation",
  "summary": "Targeted rehabilitation plans for back and neck conditions.",
  "description": "Extended public-facing service content.",
  "displayOrder": 1,
  "isPublished": true
}
```

#### Testimonial

```json
{
  "id": "tst_01",
  "patientFirstName": "Mariela",
  "quote": "Professional and caring treatment from the first visit.",
  "sourceLocale": "es",
  "isApproved": true,
  "isPublished": true,
  "approvedAt": "2026-04-17T14:30:00Z"
}
```

#### Inquiry

```json
{
  "id": "inq_01",
  "fullName": "Mariela Naranjo",
  "preferredContactMethod": "whatsapp",
  "contactValueMasked": "+506••••1234",
  "preferredTimeRange": "Weekday afternoons",
  "message": "I would like to know the next available consultation steps.",
  "status": "new",
  "assignedToUserId": null,
  "createdAt": "2026-04-17T14:30:00Z",
  "updatedAt": "2026-04-17T14:30:00Z"
}
```

### Status Code Matrix

| Code  | Meaning               | Typical Use                                      |
| ----- | --------------------- | ------------------------------------------------ |
| `200` | OK                    | Successful reads and updates                     |
| `201` | Created               | Inquiry creation, content creation               |
| `204` | No Content            | Optional future archive/delete endpoints         |
| `400` | Bad Request           | Invalid query parameters or spam verification    |
| `401` | Unauthorized          | Missing or invalid JWT on protected routes       |
| `403` | Forbidden             | Authenticated role lacks endpoint permission     |
| `404` | Not Found             | Missing resource                                 |
| `409` | Conflict              | Publish or approval state conflict               |
| `422` | Unprocessable Entity  | Validation or domain rule violation              |
| `429` | Too Many Requests     | Inquiry abuse control or endpoint throttling     |
| `500` | Internal Server Error | Unhandled server failure                         |

## Implementation Traceability

| Endpoint | Method | Linked Story (US-\*) | Linked FR(s) / NFR(s) | Phase |
| -------- | ------ | -------------------- | --------------------- | ----- |
| `/services` | GET | US-PO-MVP-001, US-FE-MVP-001 | FR-004-01, FR-004-03, NFR-X03 | MVP |
| `/testimonials` | GET | US-PO-MVP-001, US-FE-MVP-001 | FR-004-02, NFR-X05 | MVP |
| `/clinic-profile` | GET | US-PO-MVP-003, US-FE-MVP-002 | FR-003-01, FR-003-04, NFR-003-01, NFR-X03 | MVP |
| `/inquiries` | POST | US-PO-MVP-002, US-FE-MVP-001 | FR-002-01, FR-002-02, FR-002-03, NFR-002-01, NFR-X01 | MVP |
| `/admin/services` | GET/POST | US-PO-MVP-004, US-BE-MVP-001 | FR-004-01, FR-004-03, FR-006-02 | MVP |
| `/admin/services/{serviceId}` | PUT | US-PO-MVP-004, US-BE-MVP-001 | FR-004-01, FR-004-03, FR-006-02 | MVP |
| `/admin/testimonials` | GET/POST | US-PO-MVP-004, US-BE-MVP-001 | FR-004-01, FR-004-02 | MVP |
| `/admin/testimonials/{testimonialId}/approve` | POST | US-PO-MVP-004, US-BE-MVP-001 | FR-004-02, NFR-004-02, NFR-X05 | MVP |
| `/admin/inquiries` | GET | US-PO-MVP-005, US-BE-MVP-002 | FR-005-01, FR-005-03, NFR-005-01, NFR-005-02 | MVP |
| `/admin/inquiries/{inquiryId}` | PATCH | US-PO-MVP-005, US-BE-MVP-002 | FR-005-01, FR-005-03, FR-006-03, NFR-005-02 | MVP |
| `/admin/clinic-profile` | GET | US-PO-MVP-005, US-BE-MVP-002 | FR-005-02, FR-006-03 | MVP |
| `/admin/clinic-profile/operational-details` | PATCH | US-PO-MVP-005, US-BE-MVP-002 | FR-005-02, FR-006-03, NFR-005-02 | MVP |
| `/admin/me` | GET | US-PO-MVP-006, US-BE-MVP-003 | FR-006-01, FR-006-04, NFR-006-01 | MVP |

> **Rule:** All protected MVP endpoints require backend role enforcement aligned with `admin` and `staff` permissions from F-006 before release.

## Detailed Endpoint Contracts

### 1) Submit Inquiry or Appointment Request

- **Method/URL:** `POST /api/v1/inquiries`
- **Description:** Creates a minimal-data inquiry record after successful Cloudflare Turnstile verification. This endpoint does not schedule appointments directly.

Request schema:

```json
{
  "type": "object",
  "required": [
    "fullName",
    "preferredContactMethod",
    "contactValue",
    "preferredTimeRange",
    "message",
    "turnstileToken"
  ],
  "properties": {
    "fullName": { "type": "string", "minLength": 1, "maxLength": 120 },
    "preferredContactMethod": {
      "type": "string",
      "enum": ["phone", "email", "whatsapp"]
    },
    "contactValue": { "type": "string", "minLength": 3, "maxLength": 120 },
    "preferredTimeRange": { "type": "string", "minLength": 1, "maxLength": 120 },
    "message": { "type": "string", "minLength": 10, "maxLength": 1500 },
    "locale": { "type": "string", "enum": ["en", "es"] },
    "turnstileToken": { "type": "string", "minLength": 1, "maxLength": 2048 }
  }
}
```

Request example:

```json
{
  "fullName": "Mariela Naranjo",
  "preferredContactMethod": "whatsapp",
  "contactValue": "+50688881234",
  "preferredTimeRange": "Weekday afternoons",
  "message": "I would like to request the next available consultation.",
  "locale": "es",
  "turnstileToken": "cf-turnstile-response-token"
}
```

Success response example (`201`):

```json
{
  "id": "inq_01",
  "status": "new",
  "submittedAt": "2026-04-17T14:30:00Z",
  "nextStep": {
    "type": "manual_follow_up",
    "message": "Our team will contact you soon to continue your request.",
    "whatsAppUrl": "https://wa.me/50600000000?text=Hola%20quiero%20continuar%20mi%20solicitud"
  }
}
```

- **Validation rules:**
  - `turnstileToken` must be verified server-side before persistence.
  - The payload must exclude health-history or diagnosis-specific fields in MVP.
  - `contactValue` validation depends on `preferredContactMethod`.
- **Responses:**
  - `201 Created`: inquiry persisted and confirmation returned
  - `400 Bad Request`: spam verification failed or request is malformed
  - `422 Unprocessable Entity`: field validation fails
  - `429 Too Many Requests`: public submission limit exceeded

### 2) Create Service Record

- **Method/URL:** `POST /api/v1/admin/services`
- **Description:** Creates a bilingual service entry for later publication on the public website.

Request schema:

```json
{
  "type": "object",
  "required": ["slug", "locales", "displayOrder"],
  "properties": {
    "slug": { "type": "string", "pattern": "^[a-z0-9-]{3,80}$" },
    "displayOrder": { "type": "integer", "minimum": 1, "maximum": 999 },
    "isPublished": { "type": "boolean" },
    "locales": {
      "type": "object",
      "required": ["en", "es"],
      "properties": {
        "en": {
          "type": "object",
          "required": ["name", "summary", "description"],
          "properties": {
            "name": { "type": "string", "minLength": 1, "maxLength": 120 },
            "summary": { "type": "string", "minLength": 1, "maxLength": 240 },
            "description": { "type": "string", "minLength": 1, "maxLength": 5000 }
          }
        },
        "es": {
          "type": "object",
          "required": ["name", "summary", "description"],
          "properties": {
            "name": { "type": "string", "minLength": 1, "maxLength": 120 },
            "summary": { "type": "string", "minLength": 1, "maxLength": 240 },
            "description": { "type": "string", "minLength": 1, "maxLength": 5000 }
          }
        }
      }
    }
  }
}
```

Success response example (`201`):

```json
{
  "id": "svc_01",
  "slug": "spine-rehabilitation",
  "displayOrder": 1,
  "isPublished": false,
  "locales": {
    "en": {
      "name": "Spine Rehabilitation",
      "summary": "Targeted rehabilitation plans.",
      "description": "Extended English content."
    },
    "es": {
      "name": "Rehabilitación de Columna",
      "summary": "Planes de rehabilitación dirigidos.",
      "description": "Contenido extendido en español."
    }
  },
  "createdAt": "2026-04-17T14:30:00Z",
  "updatedAt": "2026-04-17T14:30:00Z"
}
```

- **Responses:**
  - `201 Created`: service draft saved
  - `401 Unauthorized`: missing or invalid JWT
  - `403 Forbidden`: role is not `admin`
  - `409 Conflict`: slug already exists
  - `422 Unprocessable Entity`: one or both locales are incomplete

### 3) Approve Testimonial for Publication

- **Method/URL:** `POST /api/v1/admin/testimonials/{testimonialId}/approve`
- **Description:** Records explicit approval metadata that allows a testimonial to become publishable.

Request schema:

```json
{
  "type": "object",
  "required": ["approvedByUserId", "approvalRecordedAt", "consentReference"],
  "properties": {
    "approvedByUserId": { "type": "string", "format": "uuid" },
    "approvalRecordedAt": { "type": "string", "format": "date-time" },
    "consentReference": { "type": "string", "minLength": 1, "maxLength": 120 },
    "publishNow": { "type": "boolean" }
  }
}
```

Success response example (`200`):

```json
{
  "id": "tst_01",
  "isApproved": true,
  "isPublished": true,
  "approvedAt": "2026-04-17T14:30:00Z",
  "approvedByUserId": "4d7720cc-7fd0-4972-8b2b-d508be8be110",
  "consentReference": "signed-form-2026-04-17"
}
```

- **Responses:**
  - `200 OK`: approval recorded and publication state returned
  - `403 Forbidden`: role is not `admin`
  - `404 Not Found`: testimonial not found
  - `409 Conflict`: testimonial already approved or missing required moderation state

### 4) List Inquiry Queue

- **Method/URL:** `GET /api/v1/admin/inquiries?page=1&pageSize=20&status=new`
- **Description:** Returns a paginated queue of inquiries visible to admin or staff users for manual follow-up.

Response example (`200`):

```json
{
  "data": [
    {
      "id": "inq_01",
      "fullName": "Mariela Naranjo",
      "preferredContactMethod": "whatsapp",
      "contactValueMasked": "+506••••1234",
      "preferredTimeRange": "Weekday afternoons",
      "message": "I would like to request the next available consultation.",
      "status": "new",
      "assignedToUserId": null,
      "createdAt": "2026-04-17T14:30:00Z",
      "updatedAt": "2026-04-17T14:30:00Z"
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

- **Query parameters:**
  - `status`: `new | in_review | responded | closed`
  - `assignedToMe`: `true | false`
  - `page`, `pageSize` per shared pagination conventions
- **Responses:**
  - `200 OK`: inquiry list returned
  - `401 Unauthorized`: missing or invalid JWT
  - `403 Forbidden`: actor lacks `admin` or `staff` role

### 5) Update Inquiry Operational State

- **Method/URL:** `PATCH /api/v1/admin/inquiries/{inquiryId}`
- **Description:** Updates staff-owned follow-up fields without converting the workflow into a CRM or scheduling engine.

Request schema:

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["new", "in_review", "responded", "closed"]
    },
    "assignedToUserId": { "type": ["string", "null"], "format": "uuid" },
    "followUpNote": { "type": "string", "maxLength": 1000 },
    "nextActionAt": { "type": ["string", "null"], "format": "date-time" }
  },
  "minProperties": 1
}
```

Success response example (`200`):

```json
{
  "id": "inq_01",
  "status": "in_review",
  "assignedToUserId": "00f58f3d-e922-4bd5-a4b6-c680f1d72ef7",
  "followUpNote": "Call tomorrow after 2 PM.",
  "nextActionAt": "2026-04-18T20:00:00Z",
  "updatedAt": "2026-04-17T15:00:00Z"
}
```

- **Validation rules:**
  - At least one mutable field must be supplied.
  - `followUpNote` is operational-only and must not be used for diagnosis capture.
  - Role checks apply before assignment changes or status updates.
- **Responses:**
  - `200 OK`: inquiry updated
  - `403 Forbidden`: actor lacks permission for the update
  - `404 Not Found`: inquiry not found
  - `422 Unprocessable Entity`: attempted transition or field value is invalid

### 6) Update Clinic Operational Details

- **Method/URL:** `PATCH /api/v1/admin/clinic-profile/operational-details`
- **Description:** Allows admin or staff to maintain scoped clinic details such as hours, phone numbers, and contact-channel availability.

Request example:

```json
{
  "hours": [
    { "dayOfWeek": "monday", "opensAt": "08:00", "closesAt": "17:00" },
    { "dayOfWeek": "tuesday", "opensAt": "08:00", "closesAt": "17:00" }
  ],
  "phones": [
    { "label": "Main", "value": "+50622223333", "isWhatsAppEnabled": true }
  ],
  "socialLinks": {
    "instagram": "https://instagram.com/orthopedicspine",
    "facebook": "https://facebook.com/orthopedicspine"
  }
}
```

Success response example (`200`):

```json
{
  "id": "clinic_01",
  "hours": [
    { "dayOfWeek": "monday", "opensAt": "08:00", "closesAt": "17:00" },
    { "dayOfWeek": "tuesday", "opensAt": "08:00", "closesAt": "17:00" }
  ],
  "phones": [
    { "label": "Main", "value": "+50622223333", "isWhatsAppEnabled": true }
  ],
  "socialLinks": {
    "instagram": "https://instagram.com/orthopedicspine",
    "facebook": "https://facebook.com/orthopedicspine"
  },
  "updatedAt": "2026-04-17T15:10:00Z"
}
```

- **Responses:**
  - `200 OK`: operational details updated
  - `401 Unauthorized`: missing or invalid JWT
  - `403 Forbidden`: actor lacks `admin` or `staff` role
  - `422 Unprocessable Entity`: invalid hours, channel, or URL structure

## Standard Error Examples by Status

### `401 Unauthorized`

```json
{
  "error": {
    "code": "AUTHENTICATION_REQUIRED",
    "message": "A valid session is required for this endpoint.",
    "requestId": "req_01JSPINE401ABC"
  }
}
```

### `403 Forbidden`

```json
{
  "error": {
    "code": "ROLE_NOT_PERMITTED",
    "message": "Your role does not allow this action.",
    "requestId": "req_01JSPINE403ABC"
  }
}
```

### `422 Unprocessable Entity`

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "One or more fields need attention.",
    "details": [
      { "field": "preferredTimeRange", "issue": "must not be empty" }
    ],
    "requestId": "req_01JSPINE422ABC"
  }
}
```

### `429 Too Many Requests`

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please wait before trying again.",
    "requestId": "req_01JSPINE429ABC"
  }
}
```

## Observability (Sentry)

- Attach `requestId`, route template, actor role, and API version to every error event.
- Scrub inquiry message bodies, phone numbers, emails, and WhatsApp contact values before events leave the API boundary.
- Alert on repeated `SPAM_VERIFICATION_FAILED`, `RATE_LIMIT_EXCEEDED`, and `5xx` spikes on `/api/v1/inquiries`.
- Tag testimonial approval and protected content changes with release metadata so regressions can be traced to a deployment.

## Deployment Impact (GitHub Actions)

- Validate that the OpenAPI export matches the public/admin boundary documented here.
- Require contract review for endpoint or field changes that affect bilingual content, inquiry payloads, or role behavior.
- Treat removed required fields, changed enum values, or altered role access as breaking changes that require a versioning decision.
- Keep environment secrets for Supabase, Turnstile, Resend, and Sentry managed through environment-specific GitHub Actions configuration.

---

## Change Log

| Date       | Version | Change Summary                                             | Author    |
| ---------- | ------- | ---------------------------------------------------------- | --------- |
| 2026-04-17 | 1.0     | Added initial MVP API contract for public and admin flows. | Tech Lead |

# Sequence Diagrams Template (AI-Ready)

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |

## How to Use (AI Agent Instructions)

- Add one diagram per key user or system interaction flow.
- Label participants using role names and system/service layer names, not specific platform names.
- Keep diagrams focused on a single flow; split complex flows into multiple diagrams.
- Reference Mermaid `.mmd` files in `diagrams/` for large or reused diagrams.

---

## 1. Authentication and Session Validation

```mermaid
sequenceDiagram
    participant User as [Primary Role]
    participant FE as Frontend
    participant AUTH as Auth Provider
    participant BE as Backend API

    User->>FE: Submit credentials / OAuth callback
    FE->>AUTH: Authenticate user
    AUTH-->>FE: Access + refresh tokens
    FE->>BE: API request with JWT
    BE->>AUTH: Validate token claims
    AUTH-->>BE: Claims + role context
    BE-->>FE: Authorized response
```

---

## 2. [Core Workflow Name, e.g., Data Submission and Processing]

```mermaid
sequenceDiagram
    participant Actor as [Role]
    participant FE as Frontend
    participant BE as Backend API
    participant DB as Database
    participant SVC as [External Service / Worker]

    Actor->>FE: [Initiate action]
    FE->>BE: [POST /resource]
    BE->>DB: [Persist input + metadata]
    BE->>SVC: [Request processing / enrichment]
    SVC-->>BE: [Processed result]
    BE->>DB: [Save result]
    BE-->>FE: [Return draft/result]
    FE-->>Actor: [Display output]
```

---

## 3. [Approval / State Transition Workflow]

```mermaid
sequenceDiagram
    participant Actor as [Admin Role]
    participant FE as Frontend
    participant BE as Backend API
    participant DB as Database
    participant Viewer as [Viewer Role]

    Actor->>FE: [Approve or submit action]
    FE->>BE: [POST /resource/action]
    BE->>DB: [Validate ownership + update state]
    DB-->>BE: [State persisted]
    BE-->>FE: [Success response]
    Viewer->>FE: [Access resource page]
    FE->>BE: [GET /resource]
    BE->>DB: [Fetch approved/visible records only]
    DB-->>BE: [Filtered result set]
    BE-->>FE: [Response]
    FE-->>Viewer: [Display approved view]
```

---

## 4. [Async / Background Processing Flow]

```mermaid
sequenceDiagram
    participant Actor as [Role]
    participant FE as Frontend
    participant BE as Backend API
    participant Q as Message Queue / Broker
    participant Worker as Background Worker
    participant DB as Database

    Actor->>FE: [Trigger async action]
    FE->>BE: [POST /resource/trigger]
    BE->>Q: [Publish event]
    BE-->>FE: [Accepted / queued response]
    Q->>Worker: [Deliver event]
    Worker->>DB: [Execute background task]
    Worker->>DB: [Store result]
    FE->>BE: [Poll or webhook callback]
    BE->>DB: [Fetch completed result]
    BE-->>FE: [Result payload]
```

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

## 1) Authentication and Session Validation

```mermaid
sequenceDiagram
    participant User as Admin/Viewer
    participant FE as Frontend (Vercel)
    participant SA as Supabase Auth
    participant BE as Backend (Render)

    User->>FE: Submit credentials / OAuth callback
    FE->>SA: Authenticate user
    SA-->>FE: Access + refresh tokens
    FE->>BE: API request with JWT
    BE->>SA: Validate token claims
    SA-->>BE: Claims + role context
    BE-->>FE: Authorized response
```

## 2) AI-Assisted Requirements Refinement

```mermaid
sequenceDiagram
    participant Admin
    participant FE as Frontend
    participant BE as Backend API
    participant DB as Supabase PostgreSQL
    participant AI as AI Refinement Adapter

    Admin->>FE: Enter raw notes and submit
    FE->>BE: POST /requirements/refine (draft)
    BE->>DB: Persist draft input + metadata
    BE->>AI: Request refinement and ambiguity analysis
    AI-->>BE: Structured stories + ambiguity markers
    BE->>DB: Save generated draft stories
    BE-->>FE: Return draft stories and highlights
    FE-->>Admin: Display editable draft output
```

## 3) Explicit Approval and Viewer Visibility

```mermaid
sequenceDiagram
    participant Admin
    participant FE as Frontend
    participant BE as Backend API
    participant DB as Supabase PostgreSQL
    participant Viewer

    Admin->>FE: Approve selected stories
    FE->>BE: POST /requirements/approve
    BE->>DB: Validate ownership/role + mark approved
    DB-->>BE: Approval persisted
    BE-->>FE: Approval success response
    Viewer->>FE: Open project requirements page
    FE->>BE: GET /projects/{id}/requirements
    BE->>DB: Fetch approved stories only
    BE-->>FE: Read-only requirements payload
    FE-->>Viewer: Render approved backlog
```

## 4) Markdown Export Workflow

```mermaid
sequenceDiagram
    participant Admin
    participant FE as Frontend
    participant BE as Backend API
    participant DB as Supabase PostgreSQL
    participant Storage as Supabase Storage

    Admin->>FE: Request markdown export
    FE->>BE: POST /projects/{id}/export
    BE->>DB: Retrieve approved requirements
    DB-->>BE: Approved user stories
    BE->>BE: Generate markdown document
    BE->>Storage: Store export artifact
    Storage-->>BE: Signed URL / file reference
    BE-->>FE: Export metadata + download URL
    FE-->>Admin: Download export file
```

## 5) Error Handling and Observability Path

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant Sentry

    User->>FE: Trigger action with invalid payload
    FE->>BE: API request
    BE-->>FE: 400/422 validation error
    FE->>Sentry: Capture client context and error breadcrumb
    BE->>Sentry: Capture exception + request metadata
    FE-->>User: Show actionable error message
```

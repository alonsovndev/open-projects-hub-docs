# Sequence Diagrams

This document captures key user and system interaction flows for the Open Freelancer Project Hub.

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

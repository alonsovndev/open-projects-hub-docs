---
sidebar_position: 1
---

# Sequence Diagrams

| Attribute   | Value             |
| ----------- | ----------------- |
| **Project** | Open Projects Hub |
| **Version** | 2.0               |
| **Status**  | Accepted          |

## Table of Contents

- Sequence Diagrams
  - [Table of Contents](#table-of-contents)
  - [1) Authentication and Session Validation](#1-authentication-and-session-validation)
  - [2) AI-Assisted Requirements Refinement](#2-ai-assisted-requirements-refinement)
  - [3) Explicit Approval and Client Review Visibility](#3-explicit-approval-and-client-review-visibility)
  - [4) Markdown Export Workflow](#4-markdown-export-workflow)
  - [5) Error Handling and Observability Path](#5-error-handling-and-observability-path)
  - [6) User Registration and Email Verification](#6-user-registration-and-email-verification)
  - [7) Password Reset](#7-password-reset)
  - [8) Login with Rate Limiting and Lockout](#8-login-with-rate-limiting-and-lockout)
  - [9) Authorization 3-Layer Defense](#9-authorization-3-layer-defense)
  - [10) Client Review by Access Code](#10-client-review-by-access-code)
  - [11) AI Credits Consumption and API Key Management](#11-ai-credits-consumption-and-api-key-management)
  - [12) AI Refinement 5-Stage Security Pipeline](#12-ai-refinement-5-stage-security-pipeline)
  - [13) CI/CD Pipeline](#13-cicd-pipeline)
  - [Diagram Coverage by Feature](#diagram-coverage-by-feature)
  - [Source References](#source-references)

---

This document captures key user and system interaction flows for the Open Projects Hub. All diagrams reflect the current AWS-based architecture: **FastAPI backend on App Runner**, **custom JWT auth**, **RDS PostgreSQL**, **S3 + CloudFront frontend**, and **S3 file storage**.

## 1) Authentication and Session Validation

```mermaid
sequenceDiagram
    participant User as Admin/Member
    participant FE as Frontend (S3 + CloudFront)
    participant BE as Backend (App Runner)
    participant DB as RDS PostgreSQL

    User->>FE: Submit credentials (email + password)
    FE->>BE: POST /api/v1/auth/login
    BE->>DB: SELECT user + bcrypt.verify
    DB-->>BE: User record (hashed password)
    BE->>BE: Sign JWT (HS256, 1-hour expiry)
    BE-->>FE: 200 {access_token, expires_in: 3600}
    FE->>FE: Store token (memory / HttpOnly cookie)
    Note over User,BE: ── Subsequent authenticated requests ──
    FE->>BE: API request with Authorization: Bearer <JWT>
    BE->>BE: Verify signature + expiration
    BE->>BE: Extract claims (sub, email, role)
    BE-->>FE: Authorized response
```

> **Key details**: bcrypt cost factor 12; JWT signed with HS256 using env-var secret; 1-hour default expiry (configurable via `JWT_EXPIRE_MINUTES`). Token validation runs on every protected route.

## 2) AI-Assisted Requirements Refinement

```mermaid
sequenceDiagram
    participant Admin
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL
    participant AI as AI Refinement Adapter

    Admin->>FE: Enter raw notes and submit
    FE->>BE: POST /refinement/generate-stories
    BE->>AI: Request refinement and ambiguity analysis
    AI-->>BE: Structured stories + ambiguity markers
    BE-->>FE: Return refined stories (nothing stored)
    FE-->>Admin: Display editable output held in the browser
```

## 3) Explicit Approval and Client Review Visibility

```mermaid
sequenceDiagram
    participant Admin
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL
    participant Stakeholder as Client Stakeholder

    Admin->>FE: Approve selected stories
    FE->>BE: POST /refinement/approve-stories {stories: [content]}
    BE->>DB: Validate project ownership/role + insert approved stories
    DB-->>BE: Stories persisted
    BE-->>FE: 200 {approvedCount, stories}
    Stakeholder->>FE: Open /viewer/{accessCode}
    FE->>BE: GET /viewer/{accessCode} (no token)
    BE->>DB: Resolve project by access code, fetch its approved stories only
    BE-->>FE: Read-only payload (no workspace, client or user identifiers)
    FE-->>Stakeholder: Render approved backlog
```

## 4) Markdown Export Workflow

```mermaid
sequenceDiagram
    participant Admin
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL
    participant Storage as S3 Bucket

    Admin->>FE: Request markdown export
    FE->>BE: POST /projects/{id}/exports/markdown
    BE->>DB: Retrieve approved requirements
    DB-->>BE: Approved user stories
    BE->>BE: Generate markdown document
    BE->>Storage: Store export artifact (SSE-S3 encrypted)
    Storage-->>BE: Object key + metadata
    BE-->>FE: 201 {exportId, format: "markdown", downloadUrl, createdAt}
    FE-->>Admin: Download export file
```

## 5) Error Handling and Observability Path

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend (React SPA)
    participant BE as Backend API (FastAPI)
    participant Sentry

    User->>FE: Trigger action with invalid payload
    FE->>BE: API request
    BE-->>FE: 400/422 validation error (canonical error format)
    FE->>Sentry: Capture client context + error breadcrumb
    BE->>Sentry: Capture exception + request metadata (requestId, endpoint, role, projectId)
    FE-->>User: Show actionable error message
```

> **Observability stack**: Sentry Free Developer Plan (app errors, React failures, Web Vitals, route performance, release tagging) + CloudWatch Free Tier (infrastructure metrics: App Runner CPU/memory, RDS connections/storage, 5xx alarms).

---

## 6) User Registration and Email Verification

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL
    participant Email as Email Service

    User->>FE: Fill registration form (email + password)
    FE->>FE: Client-side validation (8+ chars, uppercase, digit, special)
    FE->>BE: POST /api/v1/auth/register {email, password}
    BE->>BE: Validate password policy
    BE->>DB: Check duplicate email
    alt Email already registered
        BE-->>FE: 409 "Account already exists with this email"
        FE-->>User: Show login / password reset redirect
    else New email
        BE->>DB: INSERT pending user + hash password (bcrypt, cost 12)
        BE->>BE: Generate 6-digit alphanumeric code (excl. O/0/I/1)
        BE->>DB: Store hashed code with 5-min expiry
        BE->>Email: Send verification code (within 30s)
        BE-->>FE: 201 {masked email confirmation}
        FE-->>User: "Check your email for verification code"
        User->>FE: Enter 6-digit code
        FE->>BE: POST /api/v1/auth/verify-email {code}
        BE->>DB: Validate code (not expired, matches hash)
        alt Code invalid or expired
            BE-->>FE: 400 error (allow resend up to 3x per 15 min)
        else Code valid
            BE->>DB: Activate user account, invalidate code
            BE->>DB: Set first-login flag (→ onboarding trigger)
            BE->>DB: Grant 5 free AI credits (F-010 hook)
            BE-->>FE: 200 "Account activated"
            FE-->>User: Redirect to login
        end
    end
```

> **Shared code pattern**: 6-digit alphanumeric verification codes (excl. O/0/I/1), 5-minute expiry, and 3-resend-per-15-minute rate limit are reused across registration (F-008) and password reset (F-009).

---

## 7) Password Reset

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL
    participant Email as Email Service

    User->>FE: Click "Forgot Password" → enter email
    FE->>BE: POST /api/v1/auth/password-reset {email}
    BE->>DB: Check if email exists
    Note over BE: Privacy-preserving response — no account-existence disclosure
    alt Account exists
        BE->>BE: Generate 6-digit alphanumeric code (excl. O/0/I/1)
        BE->>DB: Store hashed code with 5-min expiry
        BE->>Email: Send reset code (within 30s)
    end
    BE-->>FE: 200 "If account exists, email sent"
    FE-->>User: Masked email confirmation
    User->>FE: Enter received code
    FE->>BE: POST /api/v1/auth/password-reset-confirm {code}
    BE->>DB: Validate code (not expired, not used, matches hash)
    alt Invalid / expired code
        BE-->>FE: 400 error (allow resend up to 3x per 15 min)
    else Code valid
        BE-->>FE: 200 prompt for new password
        User->>FE: Enter + confirm new password
        FE->>BE: POST /api/v1/auth/password-reset-confirm {newPassword}
        BE->>DB: Update password (bcrypt, cost 12), invalidate code
        BE-->>FE: 200 "Password changed successfully"
        FE-->>User: Redirect to login
    end
```

---

## 8) Login with Rate Limiting and Lockout

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL

    User->>FE: Enter email + password (optionally check "Remember Me")
    FE->>FE: Client-side validation (email format, min-length)
    FE->>BE: POST /api/v1/auth/login {email, password, rememberMe}
    BE->>DB: SELECT user + attempt counter + lockout state
    DB-->>BE: User record + failure metadata
    alt Account locked (5 failures / 15 min window)
        BE-->>FE: 429 "Account temporarily locked. Try again in 15 minutes."
        FE-->>User: Display lockout message + countdown
    else Credentials valid
        BE->>BE: Reset failure counter
        BE->>BE: Sign JWT (HS256) — standard expiry: 1h, "remember me": 7d
        BE->>DB: Store session metadata
        BE-->>FE: 200 {access_token, expires_in}
        Note over User,BE: ── Session lifetime ──
        FE->>FE: 5 min before expiry → show "Extend session?" warning
        opt Session expired
            FE-->>User: Redirect to login ("Session expired.")
        end
    else Invalid credentials
        BE->>DB: Increment failure counter
        BE-->>FE: 401 "Invalid email or password" (generic — no field disclosure)
    end
    opt User clicks logout
        User->>FE: Click logout
        FE->>BE: POST /api/v1/auth/logout
        BE->>DB: Invalidate session token
        FE-->>User: Redirect to landing page
    end
```

> **Counter logic**: 5 failed attempts within a 15-minute sliding window triggers a 15-minute lockout. Counter resets on successful login or after the lockout period expires.

---

## 9) Authorization 3-Layer Defense

```mermaid
sequenceDiagram
    participant Client
    participant JWT as JWT Middleware
    participant RBAC as RBAC Permission Layer
    participant RLS as PostgreSQL RLS
    participant DB as RDS PostgreSQL

    Client->>JWT: API request with Authorization: Bearer <JWT>

    Note over JWT: Layer 1 — JWT Middleware
    JWT->>JWT: Validate signature + expiration
    alt Invalid signature
        JWT-->>Client: 401 Unauthorized
    else Token expired
        JWT-->>Client: 401 Unauthorized
    else Token valid
        JWT->>JWT: Decode claims {sub, email, role}
        JWT->>RBAC: Forward request + user context

        Note over RBAC: Layer 2 — RBAC Permission Layer
        alt Route requires admin role
            RBAC->>RBAC: Check role = "admin"
            opt Role is member
                RBAC-->>Client: 403 Forbidden
            end
        end
        alt Route requires resource ownership
            RBAC->>RBAC: Check owner = user_id
            opt Not owner
                RBAC-->>Client: 403 Forbidden
            end
        end
        RBAC->>RLS: Forward request with user_id context

        Note over RLS: Layer 3 — Row-Level Security
        RLS->>DB: SELECT ... WHERE (RLS policy match)
        alt Allowed
            DB-->>RLS: Matching rows
            RLS-->>Client: 200 OK (filtered data)
        else Denied
            DB-->>RLS: Empty result set
            RLS-->>Client: 200/403 Filtered Response
        end
    end
```

> **Defense-in-depth**: Each layer acts as an independent gate. JWT validates identity, RBAC enforces role/ownership, and RLS provides data-level last-mile protection. The public Client Review route sees one project's approved stories and nothing else.

---

## 10) Client Review by Access Code

```mermaid
sequenceDiagram
    participant Freelancer as Admin / Member
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL
    participant Stakeholder as Client Stakeholder

    Note over Freelancer,DB: ── Freelancer shares a project ──
    Freelancer->>FE: Open project → copy client link
    FE->>BE: GET /projects/{id} (JWT)
    BE-->>FE: Project incl. accessCode
    Freelancer-->>Stakeholder: Send link or code (outside the product)

    Note over Stakeholder,DB: ── Stakeholder reviews, no account ──
    Stakeholder->>FE: Open /viewer/{accessCode} (or type the code)
    FE->>BE: GET /viewer/{accessCode} (no token)
    BE->>BE: Rate limit (30/min per IP), normalize and format-check the code
    BE->>DB: Find project by access_code (unique instance-wide)
    alt Unknown or malformed code
        BE-->>FE: 404 "Project not found" (identical for both)
        FE-->>Stakeholder: "We couldn't find a project with that access code."
    else Valid code
        BE->>DB: Approved stories of that project, in the project's own workspace
        DB-->>BE: Stories
        BE-->>FE: 200 {projectName, phase, total, stories} (no user, client or workspace ids)
        FE-->>Stakeholder: Read-only approved stories
    end

    Note over Freelancer,DB: ── Freelancer revokes ──
    opt Code shared too widely
        Freelancer->>FE: "Generate new code" (confirm)
        FE->>BE: POST /projects/{id}/access-code/regenerate (JWT)
        BE->>DB: Replace access_code
        BE-->>FE: Project with the new accessCode
        Note over Stakeholder,BE: The old code and link now answer 404
    end
```

> **Code security**: `PRJ-` plus 8 characters from a 32-symbol alphabet (about 10^12 values), cryptographically random, unique across workspaces, and independent of the freelancer-chosen project code. The route is read-only, rate limited, and answers every miss identically (FR-011-04, FR-011-07, NFR-011-01, NFR-011-02; ADR-020).

---

## 11) AI Credits Consumption and API Key Management

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as RDS PostgreSQL
    participant AI as AI Provider

    Note over User,DB: ── Free credits lifecycle ──
    User->>FE: Submit raw notes for AI refinement
    FE->>BE: POST /refinement/generate-stories
    BE->>DB: Check credit balance
    alt Credits > 0
        BE->>AI: Request refinement (platform provider key)
        AI-->>BE: Structured stories
        BE->>DB: Decrement credit counter
        BE-->>FE: 200 {stories, creditsRemaining} (stories not stored)
    else Credits = 0
        BE-->>FE: 402 "No credits remaining. Add your own API key to continue."
        FE-->>User: Modal with "Add API Key" CTA → Settings
    end

    Note over User,DB: ── API key management ──
    User->>FE: Settings → API Keys → select provider (Gemini / OpenAI / DeepSeek)
    FE->>FE: API key input form
    FE->>BE: POST /api/v1/users/me/api-keys {provider, apiKey}
    BE->>AI: Validate key via provider test endpoint
    alt Key valid
        AI-->>BE: 200 OK
        BE->>DB: Encrypt key (AES-256) + store
        BE-->>FE: 200 "API key saved"
        FE-->>User: Confirmation toast, provider available in selector
    else Key invalid or rate-limited
        AI-->>BE: 401/403/429
        BE-->>FE: 400 {error: "Invalid key", detail} (key NOT saved)
        Note over BE: Max 5 validation attempts per user per hour
    end
    User->>FE: View masked key (e.g., sk-proj-***...abc)
    User->>FE: Replace or delete key (delete last key + credits=0 → refinement blocked)

    Note over User,AI: ── Refinement with custom API key ──
    User->>FE: Initiate refinement, select custom provider
    FE->>BE: POST /refinement/generate-stories {provider: "openai"}
    BE->>DB: Retrieve decrypted API key
    BE->>AI: Request refinement (user's API key)
    alt Success
        AI-->>BE: Structured stories
        BE-->>FE: 200 {stories} (not stored; platform credits NOT consumed)
    else Provider error
        AI-->>BE: Quota exceeded / auth failed / network / rate limit
        BE-->>FE: 400 {error, actionableMessage, links: [settings, switchProvider]}
        FE-->>User: Specific error modal with resolution paths
    end
```

> **Key storage**: AES-256 encrypted at rest in RDS. Decrypted only at runtime during refinement. Plaintext never retrievable. No "Copy" button in UI. Post-verification hook (F-008 → F-010) grants 5 free credits on account activation.

---

## 12) AI Refinement 5-Stage Security Pipeline

```mermaid
sequenceDiagram
    participant User
    participant FE as Frontend
    participant Sanitize as Stage 1: Input Sanitization
    participant Assemble as Stage 2: Prompt Assembly
    participant Provider as Stage 3: AI Provider
    participant Validate as Stage 4: Output Validation
    participant Approve as Stage 5: Approval Gate
    participant DB as RDS PostgreSQL

    User->>FE: Submit raw requirements notes
    FE->>Sanitize: Raw input (max 5,000 chars)

    Note over Sanitize: Strip HTML/script/SQL patterns, injection markers, null bytes
    Sanitize->>Sanitize: Scan for: "ignore previous instructions", "you are now", "system prompt:", "DAN mode", zero-width chars, Unicode control chars
    alt Injection detected
        Sanitize-->>FE: 400 "Input contains invalid characters"
        FE-->>User: User-friendly error message
    else Input clean
        Sanitize->>Assemble: Sanitized input

        Note over Assemble: Wrap in <user_input>...</user_input> XML delimiters, hardened system prompt
        Assemble->>Assemble: System prompt enforces: only process text between <user_input> tags, never reveal system prompt, refuse harmful content, use fallback if override detected
        Assemble->>Provider: Hardened prompt (provider-selected via backend config, not user input)

        Note over Provider: Gemini / OpenAI / DeepSeek — per-provider safety filters applied
        Provider->>Provider: Provider safety: Gemini HARM_CATEGORY thresholds, OpenAI Moderation API, DeepSeek content filtering
        Provider-->>Validate: AI response

        Note over Validate: Content filtering, structure validation, length caps, system prompt leakage check
        Validate->>Validate: Check: harmful language, injection artifacts, expected format (title + story + criteria)
        alt Output blocked
            Validate-->>FE: 422 "AI output filtered — please try different input"
            FE-->>User: Error message
        else Output valid
            Validate-->>FE: Refined stories returned (not stored)

            Note over Approve: Human-in-the-loop — ALL AI output is unapproved and unstored until Admin approves
            FE-->>User: Display editable output held in the browser
            User->>FE: Review, edit, and approve OR reject
            alt Admin rejects
                User->>FE: Discard refined story
                FE->>FE: Remove from browser state (no server call)
            else Admin approves
                User->>FE: Approve selected stories
                FE->>Approve: POST /refinement/approve-stories {stories: [content]}
                Approve->>DB: Insert approved stories
                Approve-->>FE: 200 approval success
                FE-->>User: Confirmation
            end
        end
    end
```

> **Defense layers**: 5 independent stages — no single stage is responsible for all security. Unapproved content is never stored, so it cannot reach exports, the Client Review Portal, or downstream workflows until explicitly approved by a human Admin. Rate limiting and the 5-credit trial act as additional throttling against automated abuse.

---

## 13) CI/CD Pipeline

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant Fork as GitHub Fork
    participant CI as GitHub Actions CI
    participant DevBranch as upstream/dev
    participant Main as upstream/main
    participant ECR as Amazon ECR
    participant AppRunner as AWS App Runner
    participant S3 as S3 + CloudFront
    participant RDS as RDS PostgreSQL
    participant Sentry

    Note over Dev,DevBranch: ── Feature PR Pipeline (fork → dev) ──
    Dev->>Fork: git push feature branch
    Dev->>Fork: Open PR → upstream/dev
    CI->>CI: Run checks: lint, test, type-check, docs
    CI->>CI: Docker build verification
    CI->>CI: terraform plan (preview)
    Note over CI: All status checks must pass
    DevBranch->>DevBranch: 1 approval → merge (standard merge commit)

    Note over DevBranch,Main: ── Release PR Pipeline (dev → main) ──
    Dev->>Main: Open PR: dev → main
    CI->>CI: Re-run critical tests
    CI->>ECR: Build + push production Docker image (git-sha tagged)
    CI->>CI: terraform plan
    Note over Main: 2 approvals required
    Main->>Main: Merge → freezes production candidate (no deploy yet)

    Note over Main,Sentry: ── Production Deployment (tag vX.Y.Z) ──
    Dev->>Main: git tag vX.Y.Z && git push upstream vX.Y.Z
    CI->>CI: Terraform apply (infrastructure changes)
    CI->>RDS: Alembic migrations (init container)
    CI->>AppRunner: Deploy Docker image (rolling, zero-downtime)
    CI->>S3: Deploy frontend build + invalidate CloudFront cache
    CI->>CI: Smoke tests (auth, core CRUD workflows)
    CI->>Sentry: Tag release for error correlation
    Note over AppRunner,Sentry: CloudWatch monitors deployment health (5xx rate, latency, CPU)

    Note over Dev,Main: ── Hotfix path ──
    opt Critical production bug
        Dev->>Main: Create hotfix branch from main → PR to main (2 approvals)
        Main->>Main: Merge → tag vX.Y.PATCH → deploy
        Dev->>DevBranch: Back-merge hotfix into dev
    end

    Note over ECR,AppRunner: ── Rollback ──
    opt Deployment failure
        CI->>AppRunner: Redeploy previous Docker image from ECR
        CI->>S3: Redeploy previous frontend artifacts
        CI->>RDS: Forward-fix migration (preferred) or PITR restore (emergency)
    end
```

> **Branch model**: Two permanent branches (`dev` + `main`), fork-based contributions, tag-triggered production deploys. Merge to `main` = candidate freeze; tag `vX.Y.Z` = deploy to production. See the [CI/CD Pipeline](../ops/ci-cd-pipeline.md) for full details on branching strategy, fork setup, and commit conventions.

---

## Diagram Coverage by Feature

| Diagram                                      | Feature / Architecture Domain                        |
| -------------------------------------------- | ---------------------------------------------------- |
| 1 — Authentication & Session Validation      | F-007 (login), security-architecture.md              |
| 2 — AI-Assisted Requirements Refinement      | F-002 (AI refinement), F-004 (backlog)               |
| 3 — Explicit Approval & Client Review Visibility | F-002 (approval), F-003 (access control)             |
| 4 — Markdown Export                          | F-004 (export)                                       |
| 5 — Error Handling & Observability           | NFR-X01 through NFR-X06, monitoring-observability.md |
| 6 — User Registration & Email Verification   | F-008 (account creation), F-005 (onboarding trigger) |
| 7 — Password Reset                           | F-009 (password reset)                               |
| 8 — Login with Rate Limiting & Lockout       | F-007 (admin login)                                  |
| 9 — Authorization 3-Layer Defense            | F-003 (access control), security-architecture.md     |
| 10 — Client Review by Access Code            | F-011 (client review access)                         |
| 11 — AI Credits & API Key Management         | F-010 (AI credits), ADR-012 (secrets management)     |
| 12 — AI Refinement 5-Stage Security Pipeline | F-002 (AI refinement), security-architecture.md      |
| 13 — CI/CD Pipeline                          | ci-cd-pipeline.md, deployment-architecture.md        |

## Source References

- [Architecture Solution Design](../core/architecture-solution-design.md)
- [API Contract](../api/api-contract.md)
- [Security Architecture](../security/security-architecture.md)
- [CI/CD Pipeline](../ops/ci-cd-pipeline.md)
- [Feature Requirements](../../01-requirements/README.md)
- [F-007: Admin Login](../../01-requirements/f-007-admin-login.md)
- [F-008: Account Creation](../../01-requirements/f-008-create-account.md)
- [F-009: Reset Password](../../01-requirements/f-009-reset-password.md)
- [F-010: AI Credits and API Key Management](../../01-requirements/f-010-ai-credits-and-api-key-management.md)
- [F-011: Client Review Access](../../01-requirements/f-011-client-review-access.md)

---

**Last Updated**: 2026-08-11

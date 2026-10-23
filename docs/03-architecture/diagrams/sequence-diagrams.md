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
  - [12) AI Refinement Security Pipeline](#12-ai-refinement-security-pipeline)
  - [13) CI/CD Pipeline](#13-cicd-pipeline)
  - [Diagram Coverage by Feature](#diagram-coverage-by-feature)
  - [Source References](#source-references)

---

These diagrams explain the implemented review workflows. The React frontend runs on Cloudflare Workers; API traffic reaches FastAPI and PostgreSQL containers on one EC2 host through Cloudflare and Caddy. Arrows show application interactions, not separate deployed services. Payloads are abbreviated; exact shapes are in the [API Contract](../api/api-contract.md).

## 1) Authentication and Session Validation

```mermaid
sequenceDiagram
    autonumber
    participant User as Admin/Member
    participant FE as Frontend (Cloudflare Workers)
    participant BE as Backend (EC2, FastAPI)
    participant DB as PostgreSQL

    User->>FE: Submit credentials (email + password)
    FE->>BE: POST /v1/auth/login (X-Session-Mode: cookie)
    BE->>DB: Load user and password hash
    DB-->>BE: User record (hashed password)
    BE->>BE: Verify bcrypt hash and account state
    BE->>BE: Sign access JWT (15-minute expiry) and refresh JWT
    BE-->>FE: 200 accessToken and user, HttpOnly refresh cookie
    FE->>FE: Keep access token in application state (not localStorage)
    Note over User,BE: ── Subsequent authenticated requests ──
    FE->>BE: API request with Authorization: Bearer <JWT>
    BE->>BE: Verify signature + expiration
    BE->>BE: Extract claims (sub, email, role, wid)
    BE-->>FE: Authorized response
```

> **Key details**: bcrypt cost factor 12; JWT signed with HS256 using a secret from SSM; 15-minute access tokens. In a browser session (`X-Session-Mode: cookie` from a trusted origin) the refresh token travels only in the HttpOnly cookie; other clients exchange it in the request body. Token validation runs on every protected route.

## 2) AI-Assisted Requirements Refinement

Generation produces editable proposals; it does not create stored stories or ambiguity records.

```mermaid
sequenceDiagram
    autonumber
    participant Editor as Admin or Member
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL
    participant AI as AI Provider

    Editor->>FE: Enter notes and select provider
    FE->>BE: POST /v1/refinement/generate-stories
    BE->>BE: Validate and sanitize notes
    BE->>DB: Check project workspace and credit/key availability
    BE->>AI: Send delimited sanitized notes
    AI-->>BE: Generated story content
    BE->>BE: Parse structured response
    BE->>DB: Charge a successful platform run
    BE-->>FE: 200 stories, rawNotes, redactionCount, provider, creditsRemaining
    FE-->>Editor: Display editable drafts in browser state
```

## 3) Explicit Approval and Client Review Visibility

```mermaid
sequenceDiagram
    autonumber
    participant Admin as Admin or Member
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL
    participant Stakeholder as Client Stakeholder

    Admin->>FE: Approve selected stories
    FE->>BE: POST /v1/refinement/approve-stories {stories: [content]}
    BE->>DB: Validate workspace and content, insert approved stories
    DB-->>BE: Stories persisted
    BE-->>FE: 200 {approvedCount, stories}
    Stakeholder->>FE: Open /viewer/{accessCode}
    FE->>BE: GET /v1/viewer/{accessCode} (no token)
    BE->>DB: Resolve project by access code, fetch its approved stories only
    BE-->>FE: Read-only payload (no workspace, client or user identifiers)
    FE-->>Stakeholder: Render approved backlog
```

## 4) Markdown Export Workflow

```mermaid
sequenceDiagram
    autonumber
    participant Admin as Admin or Member
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL

    Admin->>FE: Request markdown export
    FE->>BE: POST /v1/projects/{id}/exports/markdown
    BE->>DB: Retrieve approved requirements
    DB-->>BE: Approved user stories
    BE->>BE: Generate markdown document in memory
    BE-->>FE: 200 markdown document (nothing is stored)
    FE-->>Admin: Download export file
```

## 5) Error Handling and Observability Path

Validation failures are actionable client errors. Optional exception capture is a separate path.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant Logs as Container Logs
    participant Sentry as Sentry

    User->>FE: Submit an action
    FE->>BE: API request
    BE->>Logs: Structured request log with request_id
    alt Invalid input
        BE-->>FE: 400 or 422 with detail and X-Request-ID header
        FE-->>User: Explain validation failure
    else Unexpected exception
        BE->>Logs: Exception context
        BE-->>Sentry: Capture exception
        BE-->>FE: Error response with request identifier
        FE-->>User: Explain failure and recovery action
    end
```

See [Monitoring and Observability](../ops/monitoring-observability.md) for the current limits. The frontend also reports to Sentry through its own SDK (`VITE_SENTRY_DSN`, set at build time); backend Sentry is configured independently.

## 6) User Registration and Email Verification

Registration creates a pending account; verification establishes ownership before login and credit allocation.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL
    participant Email as Email Service

    User->>FE: Enter display name, email, and password
    FE->>BE: POST /v1/auth/register {displayName, email, password}
    BE->>BE: Validate input and hash password
    BE->>DB: Look up email
    alt Existing verified account
        BE->>Email: Notify account owner
        BE-->>FE: 201 generic masked-email response
    else New or unverified email
        BE->>DB: Create workspace and pending Admin (replace pending account if present)
        BE->>DB: Store hashed six-character code, five-minute expiry
        BE->>Email: Send verification code and link
        BE-->>FE: 201 masked email and codeExpiresAt
    end
    FE-->>User: Show verification step
    User->>FE: Enter received code
    FE->>BE: POST /v1/auth/verify-email {email, code}
    BE->>DB: Check code, expiry, and attempt budget
    alt Invalid, expired, superseded, or used code
        BE-->>FE: 400 generic invalid-code response
    else Valid code
        BE->>DB: Verify account, consume code, reserve free credits
        BE-->>FE: 200 {verified: true}
        FE-->>User: Continue to sign-in
    end
```

Verification codes use `23456789ABCDEFGHJKLMNPQRSTUVWXYZ` and are case-insensitive. Self-registration codes expire after five minutes; invited Members receive a 24-hour code and set their password during verification. Five wrong guesses lock a code; the registration code plus three resends are allowed in a 15-minute issuance window. These limits differ from password-reset issuance.

## 7) Password Reset

The request response does not disclose whether the email has an account. Reset invalidates refresh sessions; existing access tokens retain their normal short expiry.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL
    participant Email as Email Service

    User->>FE: Enter email in password recovery
    FE->>BE: POST /v1/auth/forgot-password {email}
    BE->>DB: Check account and issuance budget
    opt Eligible account exists
        BE->>DB: Store hashed six-character code, 30-minute expiry
        BE->>Email: Send reset code and link
    end
    BE-->>FE: 200 generic message
    User->>FE: Enter code and new password
    FE->>BE: POST /v1/auth/reset-password {email, code, newPassword}
    BE->>DB: Validate code and attempt limit
    alt Invalid or expired code
        BE-->>FE: Error with recovery guidance
    else Valid code
        BE->>DB: Update password hash, consume code, increment token_version
        BE-->>FE: 200 success message
        FE-->>User: Continue to sign-in
    end
```

The initial request and resends share a three-code limit per account per 15 minutes. `POST /v1/auth/resend-reset-code` issues a replacement subject to that budget; IP throttling is separate.

## 8) Login with Rate Limiting and Lockout

Cookie-mode requests include a trusted Origin; refresh rotates the credential rather than reusing it.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL

    User->>FE: Enter credentials and optional remember-me choice
    FE->>BE: POST /v1/auth/login (X-Session-Mode: cookie)
    BE->>DB: Load user and persisted failure/lockout state
    alt Account locked
        BE-->>FE: 429 with lockout guidance
    else Invalid credentials
        BE->>DB: Record failed attempt
        BE-->>FE: Generic 401
    else Valid verified account
        BE->>DB: Clear failed-login state
        BE->>BE: Sign access and refresh tokens
        BE-->>FE: 200 accessToken, user, sessionExpiresAt, refresh cookie
        FE->>FE: Keep access token in memory
        opt Access token expires while session is active
            FE->>BE: POST /v1/auth/refresh (cookie mode, no body)
            BE->>DB: Atomically revoke old refresh credential
            BE-->>FE: New access token and rotated refresh cookie
        end
    end
    opt User logs out
        FE->>BE: POST /v1/auth/logout (cookie mode)
        BE->>DB: Revoke refresh credential if present
        BE-->>FE: Success and cleared refresh cookie
        FE->>FE: Clear access token and local session state
    end
```

Access tokens last 15 minutes by default; refresh lifetimes slide 24 hours or seven days with remember-me. Five failed attempts in the account window trigger lockout; repeated failures can increase its duration. An unverified account is refused login after its password matches.

## 9) Authorization 3-Layer Defense

Authentication, role permissions, and workspace filtering protect different boundaries. A denied request does not proceed to the next gate.

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Auth as Auth Dependencies
    participant Repo as Workspace-scoped Repository
    participant DB as PostgreSQL

    Client->>Auth: API request with bearer access token
    Auth->>Auth: Verify signature, expiry, token type, and required claims
    alt Invalid identity or workspace claims
        Auth-->>Client: 401 Unauthorized
    else Valid claims
        Auth->>Auth: Check route's allowed role
        alt Role not allowed
            Auth-->>Client: 403 Forbidden
        else Role allowed
            Auth->>Repo: Execute with verified workspace context
            Repo->>DB: Query restricted to caller's workspace
            alt Record in workspace
                DB-->>Repo: Matching data
                Repo-->>Client: Response
            else Missing or foreign record
                DB-->>Repo: No matching row
                Repo-->>Client: 404 Not Found
            end
        end
    end
```

Workspace isolation is enforced by the application; PostgreSQL Row-Level Security is not enabled. Client Review is a separate public flow scoped by one project's access code.

## 10) Client Review by Access Code

```mermaid
sequenceDiagram
    autonumber
    participant Freelancer as Admin / Member
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL
    participant Stakeholder as Client Stakeholder

    Note over Freelancer,DB: ── Freelancer shares a project ──
    Freelancer->>FE: Open project → copy client link
    FE->>BE: GET /v1/projects/{id} (JWT)
    BE-->>FE: Project incl. accessCode
    Freelancer-->>Stakeholder: Send link or code (outside the product)

    Note over Stakeholder,DB: ── Stakeholder reviews, no account ──
    Stakeholder->>FE: Open /viewer/{accessCode} (or type the code)
    FE->>BE: GET /v1/viewer/{accessCode} (no token)
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
        FE->>BE: POST /v1/projects/{id}/access-code/regenerate (JWT)
        BE->>DB: Replace access_code
        BE-->>FE: Project with the new accessCode
        Note over Stakeholder,BE: The old code and link now answer 404
    end
```

> **Code security**: `PRJ-` plus 8 characters from a 32-symbol alphabet (about 10^12 values), cryptographically random, unique across workspaces, and independent of the freelancer-chosen project code. The route is read-only, rate limited, and answers every miss identically (FR-011-04, FR-011-07, NFR-011-01, NFR-011-02; ADR-020).

---

## 11) AI Credits Consumption and API Key Management

Platform credits and user-owned provider quota are separate. Validation and storage never return the plaintext key.

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant FE as Frontend
    participant BE as Backend API
    participant DB as PostgreSQL
    participant AI as AI Provider

    User->>FE: Select platform and generate stories
    FE->>BE: POST /v1/refinement/generate-stories
    BE->>DB: Check workspace and credit balance
    alt No platform credits
        BE-->>FE: 402 with INSUFFICIENT_CREDITS
        FE-->>User: Offer provider-key settings
    else Credits available
        BE->>AI: Generate using platform Gemini key
        AI-->>BE: Generated stories
        BE->>DB: Conditional credit decrement after success
        BE-->>FE: 200 stories and creditsRemaining
    end

    User->>FE: Add provider key in settings
    FE->>BE: POST /v1/users/me/api-keys {provider, apiKey}
    BE->>BE: Check format
    BE->>DB: Charge per-user validation budget
    BE->>AI: Validate key with provider
    alt Provider accepts key
        BE->>DB: Store AES-256-GCM ciphertext and display mask
        BE-->>FE: 201 masked key metadata
    else Provider rejects key
        BE-->>FE: 422 with reason and promptsKeyUpdate
    end

    User->>FE: Select own-key provider and generate
    FE->>BE: POST /v1/refinement/generate-stories
    BE->>DB: Load and decrypt caller's provider key
    BE->>AI: Generate using caller's quota
    alt Generation succeeds
        AI-->>BE: Stories
        BE-->>FE: 200 stories, creditsRemaining is null
    else Provider call fails
        BE-->>FE: 502 with failureClass and preserved rawNotes
        FE-->>User: Retry or choose another provider
    end
```

Saving and explicit revalidation share five provider-validation attempts per user per hour. A failed platform generation does not consume a credit. Five free credits are granted on verification subject to the workspace's 25-credit lifetime ceiling; no purchase/payment flow is implemented.

## 12) AI Refinement Security Pipeline

This sequence shows implemented controls. Pattern-based sanitization and structured parsing do not establish that generated content is safe or correct.

```mermaid
sequenceDiagram
    autonumber
    participant Editor as Admin or Member
    participant FE as Frontend
    participant BE as Backend API
    participant AI as Selected AI Provider
    participant DB as PostgreSQL

    Editor->>FE: Submit discovery notes
    FE->>BE: Notes and selected provider
    BE->>BE: Validate 20–5,000 characters
    BE->>BE: Redact known instruction patterns and strip markup
    alt Fewer than 20 usable characters remain
        BE-->>FE: 400 validation error
    else Usable sanitized notes remain
        BE->>DB: Validate project workspace and provider/credit eligibility
        BE->>AI: Prompt with delimited sanitized notes
        AI-->>BE: Generated content
        BE->>BE: Parse structured story response
        BE-->>FE: Drafts, original rawNotes, and redactionCount
        FE-->>Editor: Editable drafts held in browser state
        alt Editor discards draft
            FE->>FE: Remove draft locally
        else Editor approves draft
            FE->>BE: POST /v1/refinement/approve-stories
            BE->>BE: Validate submitted content
            BE->>DB: Save stories in caller's workspace
            BE-->>FE: 200 approvedCount and story references
        end
    end
```

There is no dedicated moderation call, toxicity filter, or system-prompt-leak detector in this flow. Unapproved drafts do not reach the stored backlog, export, or Client Review route. See [AI Refinement Controls](../security/security-architecture.md#ai-refinement-controls).

## 13) CI/CD Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant CI as GitHub Actions
    participant DevBranch as origin/dev
    participant Main as origin/main
    participant GHCR as GitHub Container Registry
    participant CF as Cloudflare (web + docs)
    participant SSM as AWS SSM (ophub-prod-deploy)
    participant Host as EC2 host (Docker Compose)

    Note over Dev,DevBranch: ── Feature PR (feature/* → dev) ──
    Dev->>CI: Open PR into dev
    CI->>CI: lint, type-check, unit tests, build (per repository)
    DevBranch->>DevBranch: Required checks pass → merge

    Note over DevBranch,Main: ── Release PR (dev → main) ──
    Dev->>Main: Open PR dev → main, merge with a real merge commit
    Dev->>DevBranch: Fast-forward dev to main (sync-dev)
    CF->>CF: Cloudflare Builds publishes web / docs from main

    Note over Main,Host: ── API release (tag vX.Y.Z) ──
    Dev->>Main: git tag vX.Y.Z && git push origin vX.Y.Z
    CI->>CI: Verify tag format and that the commit is on main
    CI->>GHCR: Build and push ghcr.io/…/open-projects-hub-api:vX.Y.Z
    Dev->>SSM: scripts/deploy-release.sh vX.Y.Z (operator AWS credentials)
    SSM->>Host: Run deploy.sh for the tag (pull image, compose up)
    Host->>Host: Alembic migrations run when the API container starts
    Dev->>Host: Smoke test through Cloudflare (JSON 401 on /v1/users/me/profile)

    Note over Dev,Host: ── Rollback ──
    opt Release misbehaves
        Dev->>SSM: scripts/deploy-release.sh <previous tag>
    end
```

> **Branch model**: Two permanent branches (`dev` + `main`), direct-repository feature branches, and tag-triggered image builds. GitHub OIDC is not available in the AWS account, so the deploy step is run by a person ([ADR-023](../../04-decisions/adr-023-credits-account-us-east-2-manual-deploy.md)). See the [CI/CD Pipeline](../ops/ci-cd-pipeline.md) for branching, deploy and rollback details.

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
| 11 — AI Credits & API Key Management         | F-010 (AI credits), ADR-018 (key encryption)     |
| 12 — AI Refinement Security Pipeline | F-002 (AI refinement), security-architecture.md      |
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

**Last Updated**: 2026-10-19

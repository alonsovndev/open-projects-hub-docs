# ADR-005: Authentication and Authorization Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The platform must enforce Admin/Member access controls inside a workspace and secure session handling aligned with OWASP and MVP delivery constraints. Clients review a project without an account, through its access code ([ADR-020](./adr-020-client-review-by-access-code.md)).

The solution must keep full control over authentication logic and:

- Issue and validate JWT tokens
- Manage the user identity lifecycle (registration, login, password reset)
- Scope every query to the caller's workspace
- Remain stateless for request handling

## Decision

Implement a **custom authentication bounded context** as an internal module within the FastAPI backend monolith with **JWT-based authentication**. Authorization is enforced by backend role checks and workspace-scoped repository queries: a record in another workspace returns 404. PostgreSQL Row Level Security is not used ([ADR-004](./adr-004-database.md)).

The auth module (`src/app/features/auth`) is a bounded context within the modular monolith, not a separate microservice. It follows Clean Architecture principles with clear boundaries between domain, application, and infrastructure layers.

### Architecture Components

1. **Authentication Module (Internal Bounded Context)**
   - User registration endpoint (`POST /v1/auth/register`): creates an unverified Admin and a new workspace, then emails a verification code ([ADR-024](./adr-024-email-delivery-with-resend.md)).
   - Login endpoint (`POST /v1/auth/login`): returns a JWT access token; login is blocked until the email is verified.
   - Token validation middleware (validates JWT on protected routes across all modules)
   - Password hashing with `bcrypt` (direct library, no `passlib` dependency)
   - JWT generation/verification using `PyJWT`

2. **JWT Token Structure**

   ```json
   {
     "sub": "user-uuid",
     "email": "admin@example.com",
     "role": "admin",
     "exp": 1234567890,
     "iat": 1234567800
   }
   ```

3. **Token Configuration**
   - **Access Token Expiration**: short-lived (15 minutes in deployed environments, configurable via `JWT_EXPIRE_MINUTES`)
   - **Algorithm**: HS256
   - **Secret Key**: Stored in environment variable (`SECRET_KEY`)
   - **Refresh Tokens**: Single-use, rotated on every refresh, delivered in an HttpOnly cookie. Standard sessions last 24 hours of inactivity; an opt-in "remember me" extends this to 7 days. The window slides forward on each successful refresh rather than being a fixed expiry from login.

4. **Session Management**
   - JWT access tokens are stateless and are not persisted server-side.
   - Refresh-token state is persisted server-side (PostgreSQL: `revoked_refresh_tokens`, `account_lockouts`) so logout, single-use rotation, and account lockout survive restarts and work across multiple API instances.
   - Forced logout across every device is supported via a `token_version` counter on the `users` row: bumping it invalidates every refresh token issued before that point (used after a password reset). No per-token ledger is needed for this.

5. **Database Integration**
   - The `users` table stores user credentials and the role (`admin` or `member`); each user belongs to one workspace.

### Decision Details

- Short-lived access tokens (15 minutes in deployed environments).
- Password requirements: minimum 8 characters, must include a letter and a digit (enforced in the validation layer).
- Account lockout after 5 failed login attempts within 15 minutes, with progressive backoff for repeated offenses.
- Password reset via a six-character alphanumeric emailed code, single-use, 30-minute expiry, rate-limited.
- Session-based backend auth is not selected because the API is deployed as a stateless service; the session and lockout persistence is scoped to auth-specific revocation state, not a general server-side session store for request handling.
- OAuth 2.0/OIDC providers (Google, GitHub) are deferred to Phase 2.
- MFA support is deferred to a post-MVP hardening phase.

## Consequences

### Positive

- **Full control**: Complete ownership of authentication logic and user data.
- **Cost efficiency**: No per-user auth service charges (unlike Cognito beyond Free Tier or Supabase Auth).
- **Clean Architecture fit**: The auth module implements domain-driven design with clear boundaries within the modular monolith.
- **Module cohesion**: The auth bounded context coexists with other modules (clients, projects, stories) in a single deployable, simplifying development and deployment.
- **Stateless request handling**: JWT tokens enable horizontal scaling without session affinity.
- **Workspace isolation**: Role checks plus workspace-scoped queries enforce authorization on every request.
- **Flexibility**: Easy to extend with custom auth flows, password policies, or audit logging.

### Negative

- **Security responsibility**: The team owns the security implementation (password hashing, JWT secret management, token validation).
- **Maintenance burden**: Email verification, password reset and account recovery flows are maintained manually.
- **No built-in OAuth**: Social login providers require manual integration (future work).
- **Persistence footprint**: Revocation and lockout state lives in small Postgres tables (`account_lockouts`, `revoked_refresh_tokens`, `password_reset_codes`) plus a `token_version` column on `users`, scoped to what logout, lockout and forced logout require.
- **No database-level second layer**: Isolation relies on every repository query carrying the workspace scope.
- **Module coupling risk**: The auth module must maintain clean boundaries with other backend modules.

## Alternatives Considered

1. **Amazon Cognito**
   - Considered for managed authentication with AWS integration.
   - Not selected to maintain full control over auth logic and reduce complexity (no Cognito SDK integration, simpler JWT flow).

2. **Supabase Auth**
   - Considered for managed authentication flows.
   - Not selected to avoid additional platform dependencies.

3. **Auth0 / Okta**
   - Considered for enterprise-grade identity management.
   - Not selected due to cost ($25+/month beyond free tier) and unnecessary complexity for MVP.

4. **Session-based server auth with cookies**
   - Considered for traditional web application pattern.
   - Not selected due to reduced fit for stateless horizontal scaling and REST API design.

5. **OAuth 2.0 only (no username/password)**
   - Considered for social login convenience.
   - Not selected because MVP requires direct username/password login; OAuth deferred to Phase 2.

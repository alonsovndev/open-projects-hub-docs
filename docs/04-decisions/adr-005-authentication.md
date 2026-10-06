# ADR-005: Authentication and Authorization Strategy

- **Status**: Accepted
- **Date**: 2026-02-28
- **Updated**: 2026-08-03
- **Amended by**: [ADR-020](./adr-020-client-review-by-access-code.md) (2026-10-02): the `viewer` role is removed; roles are `admin` and `member`, and clients review through a project access code.

## Context

The platform must enforce strict Admin/Viewer access controls and secure session handling aligned with OWASP and MVP delivery constraints. The solution must support stateless scaling and integrate with AWS infrastructure while maintaining full control over authentication logic.

With the migration to AWS and the decision to implement a custom authentication module, the system needs a self-contained auth solution that:

- Issues and validates JWT tokens
- Manages user identity lifecycle (registration, login, password reset)
- Integrates with PostgreSQL RLS policies
- Remains stateless for horizontal scaling

## Decision

Implement a **custom authentication bounded context** as an internal module within the FastAPI backend monolith with **JWT-based authentication**, where authorization is enforced by backend role checks and PostgreSQL RLS policies.

The auth module is a bounded context within the modular monolith, not a separate microservice. It follows Clean Architecture principles with clear boundaries between domain, application, and infrastructure layers.

### Architecture Components

1. **Authentication Module (Internal Bounded Context)**
   - **Location**: Part of the backend monolith (e.g., `src/modules/auth/` or `src/auth/`)
   - User registration endpoint (`POST /api/v1/auth/register`)
   - Login endpoint (`POST /api/v1/auth/login`) — returns JWT access token
   - Token validation middleware (validates JWT on protected routes across all modules)
   - Password hashing with `bcrypt` (direct library, no `passlib` dependency)
   - JWT generation/verification using `python-jose` or `PyJWT`

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
   - **Secret Key**: Stored in environment variable (`JWT_SECRET_KEY`)
   - **Refresh Tokens**: Implemented (EPIC-2). Single-use, rotated on every refresh. Standard
     sessions last 24 hours of inactivity; an opt-in "remember me" extends this to 7 days. The
     window slides forward on each successful refresh rather than being a fixed expiry from login.

4. **Session Management**
   - JWT access tokens remain stateless and are not persisted server-side.
   - Refresh-token state **is** persisted server-side (PostgreSQL: `revoked_refresh_tokens`,
     `account_lockouts`) so logout, single-use rotation, and account lockout survive restarts and
     work across multiple App Runner instances — this was not possible under a purely stateless
     design and required walking back the original "no server-side session storage" decision.
   - Forced logout across every device is supported via a `token_version` counter on the `users`
     row: bumping it invalidates every refresh token issued before that point (used after a
     password reset). No per-token ledger is needed for this.

5. **Database Integration**
   - `users` table stores user credentials and roles

### Decision Details

- Short-lived access tokens (15 minutes in deployed environments).
- Password requirements: minimum 8 characters, must include a letter and a digit (enforced in validation layer).
- Account lockout after 5 failed login attempts within 15 minutes, with progressive backoff for
  repeated offenses (implemented, EPIC-2 persists this to Postgres).
- Password reset via a 6-digit emailed code, single-use, 5-minute expiry, rate-limited (implemented, EPIC-2 / F-009).
- Session-based backend auth is not selected because APIs are deployed as stateless services; the
  session/lockout persistence added in EPIC-2 is scoped to auth-specific revocation state, not a
  general server-side session store for request handling.
- OAuth 2.0/OIDC providers (Google, GitHub) deferred to Phase 2.
- MFA support deferred to post-MVP hardening phase.

## Consequences

### Positive

- **Full control**: Complete ownership of authentication logic and user data.
- **AWS alignment**: No dependency on third-party auth services; everything runs on AWS infrastructure.
- **Cost efficiency**: No per-user auth service charges (unlike Cognito beyond Free Tier or Supabase Auth).
- **Clean Architecture fit**: Auth module implements domain-driven design with clear boundaries within the modular monolith.
- **Module cohesion**: Auth bounded context coexists with other modules (clients, projects, requirements) in a single deployable, simplifying development and deployment.
- **Stateless scaling**: JWT tokens enable horizontal scaling without session affinity.
- **Defense in depth**: Backend role checks + PostgreSQL RLS policies enforce authorization.
- **Flexibility**: Easy to extend with custom auth flows, password policies, or audit logging.
- **Shared infrastructure**: Auth module shares database connections, logging, monitoring, and deployment pipeline with other backend modules.

### Negative

- **Implementation effort**: ~3-4 days to build, test, and secure custom auth module (vs. 1 day with managed service).
- **Security responsibility**: Team owns security implementation (password hashing, JWT secret management, token validation).
- **Maintenance burden**: Must handle password reset, email verification, account recovery flows manually.
- **No built-in OAuth**: Social login providers require manual integration (future work).
- **Persistence footprint**: revocation/lockout state now lives in three small Postgres tables
  (`account_lockouts`, `revoked_refresh_tokens`, `password_reset_codes`) plus a `token_version`
  column on `users` — a deliberate, minimal departure from the original fully-stateless design,
  scoped to what logout/lockout/forced-logout actually require.
- **Module coupling risk**: Auth module must maintain clean boundaries with other backend modules to prevent tight coupling.

## Alternatives Considered

1. **Amazon Cognito**
   - Considered for managed authentication with AWS integration.
   - Not selected to maintain full control over auth logic and reduce complexity (no Cognito SDK integration, simpler JWT flow).

2. **Supabase Auth**
   - Original design choice for managed authentication flows.
   - Not selected due to AWS consolidation strategy and desire to reduce multi-platform dependencies.

3. **Auth0 / Okta**
   - Considered for enterprise-grade identity management.
   - Not selected due to cost ($25+/month beyond free tier) and unnecessary complexity for MVP.

4. **Session-based server auth with cookies**
   - Considered for traditional web application pattern.
   - Not selected due to reduced fit for stateless horizontal scaling and REST API design.

5. **OAuth 2.0 only (no username/password)**
   - Considered for social login convenience.
   - Not selected because MVP requires direct username/password login; OAuth deferred to Phase 2.

# ADR-005: Authentication and Authorization Strategy

- **Status**: Accepted
- **Date**: 2026-02-28
- **Updated**: 2026-08-03

## Context

The platform must enforce strict Admin/Viewer access controls and secure session handling aligned with OWASP and MVP delivery constraints. The solution must support stateless scaling and integrate with AWS infrastructure while maintaining full control over authentication logic.

With the migration to AWS and the decision to implement a custom authentication module, the system needs a self-contained auth solution that:

- Issues and validates JWT tokens
- Manages user identity lifecycle (registration, login, password reset)
- Integrates with PostgreSQL RLS policies
- Remains stateless for horizontal scaling

## Decision

Implement a **custom Python authentication module** in the FastAPI backend with **JWT-based authentication**, where authorization is enforced by backend role checks and PostgreSQL RLS policies.

### Architecture Components

1. **Authentication Module (Python/FastAPI)**
   - User registration endpoint (`POST /api/v1/auth/register`)
   - Login endpoint (`POST /api/v1/auth/login`) — returns JWT access token
   - Token validation middleware (validates JWT on protected routes)
   - Password hashing with `bcrypt` via `passlib`
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
   - **Access Token Expiration**: 1 hour (configurable via `JWT_EXPIRE_MINUTES`)
   - **Algorithm**: HS256
   - **Secret Key**: Stored in environment variable (`JWT_SECRET_KEY`)
   - **Refresh Tokens**: Deferred to Phase 2 (MVP uses only access tokens)

4. **Session Management**
   - Stateless JWT tokens (stored in frontend localStorage or secure httpOnly cookies)
   - No server-side session storage required

5. **Database Integration**
   - `users` table stores user credentials and roles

### Decision Details

- Short-lived access tokens (1 hour default).
- Password requirements: minimum 8 characters, must include uppercase, lowercase, digit (enforced in validation layer).
- Account lockout after 5 failed login attempts (future enhancement).
- Session-based backend auth is not selected because APIs are deployed as stateless services.
- OAuth 2.0/OIDC providers (Google, GitHub) deferred to Phase 2.
- MFA support deferred to post-MVP hardening phase.

## Consequences

### Positive

- **Full control**: Complete ownership of authentication logic and user data.
- **AWS alignment**: No dependency on third-party auth services; everything runs on AWS infrastructure.
- **Cost efficiency**: No per-user auth service charges (unlike Cognito beyond Free Tier or Supabase Auth).
- **Clean Architecture fit**: Auth module implements domain-driven design with clear boundaries.
- **Stateless scaling**: JWT tokens enable horizontal scaling without session affinity.
- **Defense in depth**: Backend role checks + PostgreSQL RLS policies enforce authorization.
- **Flexibility**: Easy to extend with custom auth flows, password policies, or audit logging.

### Negative

- **Implementation effort**: ~3-4 days to build, test, and secure custom auth module (vs. 1 day with managed service).
- **Security responsibility**: Team owns security implementation (password hashing, JWT secret management, token validation).
- **Maintenance burden**: Must handle password reset, email verification, account recovery flows manually.
- **No built-in OAuth**: Social login providers require manual integration (future work).
- **Token refresh complexity**: Refresh token rotation logic deferred to Phase 2.

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

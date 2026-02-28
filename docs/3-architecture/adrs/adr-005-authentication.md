# ADR-005: Authentication and Authorization Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The platform must enforce strict Admin/Viewer access controls and secure session handling aligned with OWASP and MVP delivery constraints. The solution must support stateless scaling on Render and integrate with Supabase-managed identity services.

## Decision

Use **Supabase Auth** for identity lifecycle and **JWT-based authentication**, with authorization enforced by backend role checks and Supabase RLS policies.

Decision details:

- Short-lived access tokens and rotating refresh tokens.
- OAuth 2.0/OIDC provider support through Supabase where required.
- Session-based backend auth is not selected for MVP because APIs are deployed as stateless services.
- Optional MFA path is preserved for future hardening.

## Consequences

### Positive

- Faster delivery with managed authentication flows.
- Clear split between identity issuance and domain authorization.
- Defense in depth via API-level checks plus RLS.
- Better fit for horizontal scaling and distributed API patterns.

### Negative

- Requires careful token validation, expiration, and refresh design.
- Managed provider outage can impact authentication availability.
- Requires role/claim synchronization governance between auth and data policies.

## Alternatives Considered

1. **Custom auth service**
   - Considered for complete control.
   - Not selected due to security and maintenance burden.
2. **Session-based server auth**
   - Considered for traditional web workflows.
   - Not selected due to reduced fit for stateless horizontal scaling.

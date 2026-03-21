# ADR-012: Secrets Management Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The architecture depends on multiple managed platforms (Vercel, Render, Supabase, Sentry, GitHub Actions). Security requirements (NFR-001, NFR-002) require strict protection of credentials, tokens, and integration keys across environments.

## Decision

Adopt centralized, environment-scoped secrets management using platform-native secret stores:

- Vercel project/environment variables for frontend runtime/build secrets.
- Render environment groups/service variables for backend runtime secrets.
- Supabase managed credentials and key management for database/auth resources.
- GitHub Actions encrypted secrets for CI-only credentials.

Controls include least-privilege access, rotation schedules, auditability, and explicit prohibition of secrets in source control.

## Consequences

### Positive

- Reduces accidental secret leakage through code or documentation artifacts.
- Enables environment isolation (dev/staging/prod) with clear blast-radius boundaries.
- Supports operational rotation and revocation without code changes.

### Negative

- Secrets are distributed across providers, requiring governance and inventory discipline.
- Rotation workflows add operational overhead.

## Alternatives Considered

1. **Single external vault only (e.g., HashiCorp Vault)**
   - Considered for centralized policy management.
   - Not selected for MVP due to integration/operational complexity overhead.
2. **Repository-stored encrypted secret files**
   - Considered for portability.
   - Not selected due to higher leakage and key-distribution risk for this team setup.

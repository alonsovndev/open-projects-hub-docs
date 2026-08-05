# ADR-011: Secrets Management Strategy

**Status**: Accepted  
**Date**: 2026-02-28

## Context

The platform requires secure handling of sensitive credentials across multiple services (Sentry, GitHub Actions) and deployment environments (dev/prod). Security requirements (NFR-001, NFR-002) mandate strict protection of API keys, database credentials, JWT secrets, and integration tokens.

**Constraints:**

- Must maintain $0 cost for secrets infrastructure
- Cannot rely on paid secret management services
- Must support environment isolation (dev/prod)
- Must prevent accidental exposure through source control or logs
- Must align with existing $0-cost infrastructure stack

**Key Requirements:**

- Secure storage and retrieval of credentials without additional cost
- Environment-specific secret scoping
- Audit trail for secret access (where feasible)
- Protection against common attack vectors (XSS, repository scanning, log exposure)
- Support for secret rotation without code changes

## Decision

Adopt a layered, zero-cost secrets management strategy using platform-native capabilities:

**1. Environment Variables via Docker Compose (Local Development)**

- Use `.env` files (git-ignored) with Docker Compose `env_file` directive
- Template file `.env.example` tracked in repo with placeholder values
- Developers maintain local `.env` with actual credentials

**2. GitHub Actions Encrypted Secrets (CI/CD)**

- All CI/CD secrets stored in GitHub repository/environment secrets (free tier)
- Environment-specific secrets for dev/staging/prod
- Access controlled via GitHub permissions model

**3. Application Runtime Secret Injection**

- Backend: Environment variables injected at container runtime (Docker, cloud provider)
- Frontend: Build-time injection for public variables, runtime API calls for sensitive operations
- No secrets embedded in built artifacts or client bundles

**4. Secret Access Controls**

- **Prohibited**: Secrets in git commits, source code, client-side bundles, unencrypted config files
- **Required**: `.gitignore` entries for all secret files, pre-commit hooks to scan for leaked secrets
- **Rotation**: Documented procedures for credential rotation without downtime

## Consequences

**Positive:**

- Zero infrastructure cost — no paid secret vaults or KMS services
- Platform-native — leverages built-in capabilities of GitHub, Docker
- Environment isolation — clear separation between dev/staging/prod secrets
- Reduced attack surface — secrets never committed to source control
- Developer experience — simple `.env` workflow for local development
- Audit trail — GitHub Actions secret access logged

**Negative:**

- Distributed storage — secrets managed across multiple platforms (GitHub, local files)
- Manual rotation — no automated rotation; requires coordinated manual updates
- Limited auditability — local `.env` access not centrally logged
- Onboarding overhead — new developers must manually configure `.env` files
- No centralized policy enforcement — secret policies managed per-platform

**Risks:**

- **Developer error**: Accidental commit of `.env` files or hardcoded secrets
  - _Mitigation_: Pre-commit hooks (e.g., `gitleaks`, `git-secrets`), CI checks, `.gitignore` enforcement
- **Secret sprawl**: Difficult to inventory all secrets across environments
  - _Mitigation_: Maintain documented secret inventory in runbook
- **Rotation complexity**: Coordinating updates across dev machines, GitHub
  - _Mitigation_: Documented rotation runbooks with step-by-step procedures

## Alternatives Considered

**1. HashiCorp Vault (Self-Hosted Free Tier)**

- Requires dedicated infrastructure (server, storage, backups)
- Operational overhead (upgrades, monitoring, HA setup)
- Violates $0 cost constraint (compute/storage costs)

**2. Encrypted Files in Repository (e.g., `git-crypt`, `sops`)**

- Key distribution problem (how to share decryption keys securely)
- Higher risk of accidental exposure of encrypted files + keys
- Requires tooling setup for all developers
- Poor audit trail for secret access

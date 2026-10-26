# ADR-011: Secrets Management Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The platform requires secure handling of sensitive credentials (JWT secret, database password, provider and email credentials, Sentry DSN) across local development, CI and the single deployed environment. Security requirements (NFR-001, NFR-002) mandate strict protection of API keys, database credentials, JWT secrets, and integration tokens.

**Constraints:**

- Must maintain $0 cost for secrets infrastructure
- Cannot rely on paid secret management services
- Must prevent accidental exposure through source control or logs
- Must align with the existing $0-cost infrastructure stack

**Key Requirements:**

- Secure storage and retrieval of credentials without additional cost
- Protection against common attack vectors (XSS, repository scanning, log exposure)
- Secrets reach the runtime without code changes

## Decision

Adopt a layered, zero-cost secrets management strategy using platform-native capabilities:

**1. Environment Variables via Docker Compose (Local Development)**

- Use `.env` files (git-ignored) with Docker Compose `env_file` directive
- Template file `.env.example` tracked in repo with placeholder values
- Developers maintain a local `.env` with actual credentials

**2. GitHub Actions Encrypted Secrets (CI)**

- CI secrets, where needed, are stored in GitHub repository secrets (free tier)
- Access controlled via the GitHub permissions model

**3. AWS Systems Manager Parameter Store (Deployed Environment)**

- Production secrets and configuration are SSM `SecureString` parameters under `/ophub/prod/*`
- The deploy script reads them on the host during a manual deployment and injects them into the containers as environment variables (see [ADR-021](./adr-021-low-cost-single-host-deployment.md) and [ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md))
- Terraform creates the parameters but not their values, which are set by hand

**4. Application Runtime Secret Injection**

- Backend: environment variables injected at container runtime
- Frontend: build-time injection for public variables only
- No secrets embedded in built artifacts or client bundles

**5. Secret Access Controls**

- **Prohibited**: Secrets in git commits, source code, client-side bundles, unencrypted config files
- **Required**: `.gitignore` entries for all secret files
- **Rotation**: manual and coordinated; rotating the provider-key encryption key follows the procedure in [ADR-018](./adr-018-user-api-key-encryption.md)

**Scope note:** this ADR covers platform secrets: credentials the application itself holds, and how they reach the runtime. It does not cover encrypting sensitive *application data* at rest. Field-level encryption of user-supplied AI provider keys is decided in [ADR-018: User API Key Encryption at Rest](./adr-018-user-api-key-encryption.md), which works within the $0-cost constraint set here.

## Consequences

**Positive:**

- Zero infrastructure cost: no paid secret vaults or KMS services
- Platform-native: leverages built-in capabilities of GitHub, Docker and AWS
- Reduced attack surface: secrets never committed to source control
- Simple `.env` workflow for local development

**Negative:**

- Distributed storage: secrets live in several places (local files, GitHub, SSM)
- Manual rotation: no automated rotation; it requires coordinated manual updates
- Limited auditability: local `.env` access is not centrally logged
- Onboarding overhead: new developers must configure `.env` files manually
- Parameter values are not in Terraform, so a fresh account needs them entered by hand

**Risks:**

- **Developer error**: accidental commit of `.env` files or hardcoded secrets
  - _Mitigation_: `.gitignore` enforcement and review
- **Secret sprawl**: difficult to inventory all secrets
  - _Mitigation_: the infrastructure README lists the SSM parameters

## Alternatives Considered

**1. HashiCorp Vault (Self-Hosted Free Tier)**

- Requires dedicated infrastructure (server, storage, backups)
- Operational overhead (upgrades, monitoring, HA setup)
- Violates the $0 cost constraint (compute/storage costs)

**2. Encrypted Files in Repository (e.g., `git-crypt`, `sops`)**

- Key distribution problem (how to share decryption keys securely)
- Higher risk of accidental exposure of encrypted files + keys
- Requires tooling setup for all developers
- Poor audit trail for secret access

# Architecture Diagrams Index

This directory contains architecture visualizations for the Open Freelancer Project Hub.

## Diagram Format

- **Complex diagrams**: Maintained in Drawio files (`.drawio`) with PNG exports for GitHub preview
- **Simple diagrams**: Embedded inline in markdown using Mermaid syntax

## Drawio Files

### C4 Model — `c4-models.drawio`

- **Page 1: System Context (L1)** — External actors and system boundaries
  - [Documentation](./c4-system-context.md)
  - Image: ![System Context](./c4-models-system-context.png) _(placeholder - generate from Drawio)_
- **Page 2: Container View (L2)** — Technology containers and interactions
  - [Documentation](./c4-container.md)
  - Image: ![Container Diagram](./c4-models-container.png) _(placeholder - generate from Drawio)_
- **Page 3: Backend Components (L3)** — Internal backend structure
  - Image: ![Backend Components](./c4-models-backend-components.png) _(placeholder - generate from Drawio)_
- **Page 4: Frontend Components (L3)** — Internal frontend structure
  - Image: ![Frontend Components](./c4-models-frontend-components.png) _(placeholder - generate from Drawio)_

### Flow Diagrams — `flows.drawio`

See [flows.drawio.md](./flows.drawio.md) for migration guide and placeholders.

- **Page 1: Authentication Flow** — User login and JWT token lifecycle
  - Image: ![Authentication Flow](./flows-authentication.png) _(placeholder - generate from Drawio)_
- **Page 2: Authorization Flow** — RBAC permission checking
  - Image: ![Authorization Flow](./flows-authorization.png) _(placeholder - generate from Drawio)_
- **Page 3: Data Flow** — Input validation through storage and output
  - Image: ![Data Flow](./flows-data-flow.png) _(placeholder - generate from Drawio)_

### Deployment & Security — `deployment-security.drawio`

See [deployment-security.drawio.md](./deployment-security.drawio.md) for migration guide and placeholders.

- **Page 1: Cloud Deployment** — Vercel, Render, Supabase, Sentry topology
  - Image: ![Cloud Deployment](./deployment-security-cloud.png) _(placeholder - generate from Drawio)_
- **Page 2: Security Architecture** — Auth, RBAC, RLS layers
  - Image: ![Security Architecture](./deployment-security-architecture.png) _(placeholder - generate from Drawio)_
- **Page 3: Architecture Evolution** — Modular Monolith to microservices path
  - Image: ![Architecture Evolution](./deployment-security-evolution.png) _(placeholder - generate from Drawio)_

## Sequence Diagrams

Detailed workflow explanations with embedded Mermaid diagrams:

- [Sequence Diagrams](./sequence-diagrams.md) — Authentication, authorization, AI refinement, error handling flows

## Migration Status

- ✅ Drawio placeholder files created with original Mermaid content preserved
- ⏳ **Action required:** Create actual `.drawio` files and export PNG images
- ⏳ **Action required:** Replace placeholder image references with actual exports
- ⏳ **After completion:** Remove original `.mmd` files

## Related Documents

- [Core Architecture](../core/) — High-level architecture patterns
- [Security Architecture](../security/security-architecture.md) — Security design details
- [Deployment Architecture](../ops/deployment-architecture.md) — Infrastructure details

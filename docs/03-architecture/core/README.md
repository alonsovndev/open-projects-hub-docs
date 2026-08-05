# Core Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Domain**       | Core Architecture Concepts  |
| **Last Updated** | 2026-08-04                  |

## Overview

This folder contains foundational architecture documents that define the system's high-level design, technology choices, and architectural patterns.

## Documents

- **[Architecture Solution Design](./architecture-solution-design.md)**: System context, selected pattern, component design, data flow, and high-level trade-offs. Updated to reflect AWS migration (S3+CloudFront, App Runner, RDS, custom auth).
- **[Architecture Styles](./architecture-styles.md)**: Modular Monolith rationale, bounded context map, and evolution strategy toward selective microservices.
- **[Technology Stack](./technology-stack.md)**: Component-level technology choices (FastAPI, React, AWS RDS, Sentry+CloudWatch, S3+CloudFront, App Runner) with rationale and trade-offs.

## Related Architecture Decision Records

- [ADR-001: High-Level Architecture Pattern](../adrs/adr-001-high-level-architecture.md) (Modular Monolith)
- [ADR-002: Backend Framework](../adrs/adr-002-backend-framework.md) (FastAPI)
- [ADR-003: Frontend Framework](../adrs/adr-003-frontend-framework.md) (React + TypeScript)
- [ADR-004: Database](../adrs/adr-004-database.md) (Amazon RDS PostgreSQL)
- [ADR-005: Authentication and Authorization](../adrs/adr-005-authentication.md) (Custom FastAPI Auth + JWT)
- [ADR-006: Deployment Platform](../adrs/adr-006-deployment-platform.md) (AWS)
- [ADR-009: Monitoring and Observability](../adrs/adr-009-monitoring-observability.md) (Sentry + CloudWatch)

## Scope

This domain covers:
- System-level architectural patterns and styles
- Technology stack selection and rationale
- Component design and interaction patterns
- High-level data flow and system boundaries
- Architecture evolution strategy

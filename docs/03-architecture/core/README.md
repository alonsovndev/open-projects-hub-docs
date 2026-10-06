# Core Architecture

## Overview

This folder contains foundational architecture documents that define the system's high-level design, technology choices, and architectural patterns.

## Documents

- **[Architecture Solution Design](./architecture-solution-design.md)**: System context, selected pattern, component design, data flow, and high-level trade-offs. Updated to reflect AWS migration (S3+CloudFront, App Runner, RDS, custom auth).
- **[Architecture Styles](./architecture-styles.md)**: Modular Monolith rationale, bounded context map, and evolution strategy toward selective microservices.
- **[Technology Stack](./technology-stack.md)**: Component-level technology choices (FastAPI, React, AWS RDS, Sentry+CloudWatch, S3+CloudFront, App Runner) with rationale and trade-offs.
- **[Architecture Decision Records (ADRs)](../../04-decisions/README.md)**: Individual ADRs for key architecture decisions, including framework selection, database choice, authentication strategy, and deployment platform.

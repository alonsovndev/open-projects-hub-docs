# ADR-014: Infrastructure as Code Strategy (Terraform)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

Deployment configuration spans multiple managed platforms (Vercel, Render, Supabase, DNS, and CI/CD secrets/processes). Manual changes increase drift risk, reduce auditability, and slow reproducibility across environments.

## Decision

Adopt **Terraform** as the primary Infrastructure as Code (IaC) approach for cross-provider infrastructure definitions where provider APIs support declarative management. Use GitHub Actions for plan/apply workflows with protected environment approvals.

## Consequences

### Positive

- Version-controlled, reviewable infrastructure changes.
- Repeatable environment provisioning and reduced configuration drift.
- Clear change history to support incident response and compliance needs.

### Negative

- Initial module design and state-management setup overhead.
- Some managed-provider settings may still require supplemental operational runbooks.

## Alternatives Considered

1. **Provider-native configuration only (no central IaC)**
   - Considered for lower setup effort.
   - Not selected because governance, reproducibility, and drift control are weaker.
2. **Pulumi**
   - Considered for programmatic IaC flexibility.
   - Not selected to keep tooling aligned with widely adopted declarative Terraform workflows.

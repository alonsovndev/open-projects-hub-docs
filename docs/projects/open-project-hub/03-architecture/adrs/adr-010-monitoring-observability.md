# ADR-010: Monitoring and Observability (Sentry)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The team needs unified visibility into frontend/backend failures, release quality, and performance regressions during rapid MVP iterations.

## Decision

Adopt **Sentry** for error tracking and performance monitoring across frontend and backend, integrated with GitHub Actions release metadata.

## Consequences

### Positive

- Centralized error visibility reduces mean time to detection.
- Performance traces support latency and reliability tuning.
- Release tagging improves incident-to-deployment correlation.

### Negative

- Alert fatigue risk if thresholds are not tuned.
- Sensitive data scrubbing must be actively managed.

## Alternatives Considered

1. **Cloud-provider logs only**
   - Considered for simplicity.
   - Not selected because correlation and triage speed would be weaker.
2. **Self-hosted ELK stack**
   - Considered for ownership and extensibility.
   - Not selected due to higher operational burden for MVP team size.

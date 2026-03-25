# Event-Driven Architecture Patterns

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Removed from Scope          |
| **Last Updated** | 2026-03-24                  |

## Scope Decision

Event-driven architecture patterns are **out of scope** for the current project plan.

This includes:

- outbox pattern implementation,
- saga coordination workflows,
- event sourcing/CQRS adoption,
- message broker setup (including Redis Streams).

## Current Approach

The project uses synchronous REST + database workflows for MVP and near-term delivery.

If future load or product requirements require asynchronous/event-driven patterns, create a new ADR and re-introduce this work through explicit scope approval.

## Related ADRs

- [ADR-010: Event-Driven Architecture](../adrs/adr-010-event-driven-architecture.md)
- [ADR-011: Message Broker Selection](../adrs/adr-011-message-broker.md)

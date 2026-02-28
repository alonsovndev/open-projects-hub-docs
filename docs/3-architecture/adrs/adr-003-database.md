# ADR-003: Database (Supabase PostgreSQL)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The system needs relational consistency, secure role-based data access, and operational simplicity for a small team.

## Decision

Use **Supabase-managed PostgreSQL** as the primary database with **Row Level Security (RLS)** and managed backup/recovery capabilities.

## Consequences

### Positive

- ACID consistency and mature SQL ecosystem for core entities.
- Managed operations reduce DBA overhead for MVP.
- RLS enables data-centric least-privilege authorization.

### Negative

- Vendor coupling to Supabase operational model.
- RLS policies add governance overhead as domain complexity grows.

## Alternatives Considered

1. **Self-managed PostgreSQL**
   - Considered for platform control.
   - Not selected due to higher operations burden.
2. **MongoDB**
   - Considered for schema flexibility.
   - Not selected because relational workflows and constraints are central to requirements.

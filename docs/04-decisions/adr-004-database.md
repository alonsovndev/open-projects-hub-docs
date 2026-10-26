# ADR-004: Database (PostgreSQL)

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The system needs relational consistency, tenant-scoped data access, and operational simplicity for a small team. The deployment is a single small host with a near-zero hosting budget ([ADR-021](./adr-021-low-cost-single-host-deployment.md)), so a fixed-cost managed database is not justified.

## Decision

Use **PostgreSQL 15** as the primary database, running as a container on the application host with its data on the host's encrypted EBS volume.

- **Tenant isolation** is enforced in the application layer: every repository query is scoped by the caller's `workspace_id`, and a record in another workspace returns 404. PostgreSQL Row Level Security is not used. See [Database Design](../03-architecture/database/database-design.md#security-and-data-governance).
- **Connections** are pooled by SQLAlchemy ([ADR-007](./adr-007-orm-choice.md)). The container limits PostgreSQL to 30 connections, sized for a handful of users.
- **Backups**: none, by decision ([ADR-021](./adr-021-low-cost-single-host-deployment.md)). A manual `pg_dump` over SSM Session Manager is the escape hatch.
- **Schema changes** are applied with Alembic ([ADR-017](./adr-017-database-migration-strategy.md)).

## Consequences

### Positive

- ACID consistency and a mature SQL ecosystem for core entities.
- No database hosting cost beyond the host itself.
- The same PostgreSQL image runs locally, in CI and in production, which reduces environment drift.

### Negative

- No managed backups, patching, failover or point-in-time recovery: if the instance or its volume is lost, the data is lost.
- Tenant isolation depends on every query carrying the workspace scope; there is no database-level policy as a second layer.
- Connection management needs an explicit pooling strategy within the 30-connection limit.
- Database patching and PostgreSQL upgrades are manual.

## Alternatives Considered

1. **A managed PostgreSQL service**
   - Considered for managed backups, patching and point-in-time recovery.
   - Not selected: a fixed monthly cost of roughly $13-15 on top of the host, which the available credits would burn faster.
2. **Supabase-managed PostgreSQL**
   - Considered for built-in auth, RLS UI, and quick setup.
   - Not selected to keep data and compute with one cloud provider and reduce multi-platform complexity.
3. **MongoDB / DynamoDB**
   - Considered for schema flexibility.
   - Not selected because relational workflows, ACID guarantees, and constraints are central to requirements.

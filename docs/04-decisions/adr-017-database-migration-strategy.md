# ADR-017: Database Migration Strategy (Alembic)

- **Status**: Accepted
- **Date**: 2026-08-04

> **Implementation note (2026-10-07):** PostgreSQL Row Level Security was not implemented. Tenant isolation is enforced in the application layer: every repository query is scoped by the caller's `workspace_id`, and records in another workspace return 404. See [Database Design](../03-architecture/database/database-design.md#security-and-data-governance).

## Context

With Amazon RDS PostgreSQL (ADR-004) and SQLAlchemy 2.x (ADR-007) as the chosen database stack, the system needs a database migration strategy to:

- Version-control schema evolution across development, staging, and production environments
- Support zero-downtime deployments with backward-compatible migrations
- Enable safe rollback procedures when issues arise
- Integrate seamlessly with SQLAlchemy models and the Python ecosystem
- Handle complex PostgreSQL-specific features (RLS policies, concurrent indexes)
- Provide clear audit trail of schema changes over time

## Decision

Adopt **Alembic** as the database migration tool with version-controlled migration scripts stored in the backend repository.

### Key Principles

- **Backward Compatibility:** All migrations must support N-1 application version compatibility for zero-downtime deployments
- **Additive-First:** Prefer adding new schema elements before removing old ones
- **Manual Review Required:** All auto-generated migrations must be manually reviewed before deployment
- **Forward-Fix Preferred:** Use new migrations to fix issues rather than rolling back when possible
- **Automated Execution:** Migrations run automatically during deployment via init container or pre-deployment step
- **Testing Required:** All migrations must pass local, CI/CD, and staging validation before production deployment

## Consequences

### Positive

- Native SQLAlchemy integration enables auto-generation from models
- Version-controlled migrations provide clear schema evolution history and traceability
- Supports both simple DDL changes and complex data migrations
- Handles PostgreSQL-specific features (RLS policies, concurrent indexes)
- Active Python ecosystem support and comprehensive documentation
- Enables zero-downtime deployments through backward-compatible migration patterns
- Clear rollback strategy with multiple options (forward-fix, downgrade, PITR)
- Separate migration credentials improve security posture

### Negative

- Auto-generated migrations require manual review and editing (not fully automated)
- Breaking schema changes require careful coordination and planning
- Migration credentials need separate management and rotation
- Long-running migrations on large tables can delay deployments
- Team must maintain discipline around backward compatibility principles
- Learning curve for developers unfamiliar with Alembic patterns

## Alternatives Considered

1. **Django Migrations**
   - Considered for integrated migration tooling with auto-generation and rollback support
   - Not selected: Requires Django framework; not compatible with FastAPI + SQLAlchemy stack

2. **Flyway**
   - Considered for enterprise-grade versioned SQL migrations with strong rollback capabilities
   - Not selected: Less integration with SQLAlchemy; adds JVM dependency; Python ecosystem prefers Alembic

3. **Raw SQL Scripts with Custom Version Tracking**
   - Considered for maximum control and simplicity
   - Not selected: Reinvents the wheel; lacks auto-generation; higher maintenance overhead; no built-in downgrade support

4. **Prisma Migrate**
   - Considered for modern developer experience with declarative schema
   - Not selected: TypeScript/Node.js ecosystem; not compatible with Python backend stack

5. **Supabase Migrations (supabase db)**
   - Previously considered when using Supabase-managed PostgreSQL
   - Not applicable: Now using Amazon RDS PostgreSQL per ADR-004; need self-managed migration tooling

## Related ADRs

- [ADR-004: Database (Amazon RDS PostgreSQL)](./adr-004-database.md) - Database platform requiring migration tooling
- [ADR-007: ORM Choice (SQLAlchemy)](./adr-007-orm-choice.md) - ORM that Alembic integrates with natively
- [ADR-011: Secrets Management](./adr-011-secrets-management.md) - Strategy for securing migration credentials
- [ADR-013: Infrastructure as Code](./adr-013-infrastructure-as-code.md) - Deployment automation including migrations

## References

- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [SQLAlchemy 2.0 Documentation](https://docs.sqlalchemy.org/en/20/)
- [Database Design Document](../03-architecture/database/database-design.md) - Schema entities requiring migration management


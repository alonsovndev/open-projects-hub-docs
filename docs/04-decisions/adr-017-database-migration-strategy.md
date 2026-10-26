# ADR-017: Database Migration Strategy (Alembic)

- **Status**: Accepted
- **Date**: 2026-08-04

## Context

With PostgreSQL ([ADR-004](./adr-004-database.md)) and SQLAlchemy 2.x ([ADR-007](./adr-007-orm-choice.md)) as the chosen database stack, the system needs a database migration strategy to:

- Version-control schema evolution across local, CI and production
- Enable safe rollback when issues arise
- Integrate with SQLAlchemy models and the Python ecosystem
- Provide a clear audit trail of schema changes over time

The production database runs as a container on the application host, and a deploy restarts the API ([ADR-021](./adr-021-low-cost-single-host-deployment.md)).

## Decision

Adopt **Alembic** as the database migration tool, with version-controlled migration scripts stored in the backend repository.

### Key Principles

- **Run at API start:** the container entrypoint runs `alembic upgrade head` before serving (`scripts/start-api.sh`), so every deploy applies pending migrations.
- **Additive-first:** prefer adding new schema elements before removing old ones.
- **Manual review required:** all auto-generated migrations are reviewed before merging.
- **Forward-fix preferred:** use new migrations to fix issues rather than rolling back when possible.
- **Proven in CI:** CI applies `alembic upgrade head` and `alembic downgrade base` against a clean database on every change.

## Consequences

### Positive

- Native SQLAlchemy integration enables auto-generation from models
- Version-controlled migrations provide a clear schema evolution history and traceability
- Supports both simple DDL changes and data migrations
- Active Python ecosystem support and comprehensive documentation
- Applying migrations at container start keeps the schema and the image in step

### Negative

- Auto-generated migrations require manual review and editing (not fully automated)
- A failing migration stops the API from starting; with no staging environment, the CI upgrade/downgrade check is the main protection
- There are no database backups ([ADR-004](./adr-004-database.md)), so a destructive migration cannot be undone by restoring data
- Long-running migrations on large tables would delay a deploy
- Learning curve for developers unfamiliar with Alembic patterns

## Alternatives Considered

1. **Django Migrations**
   - Considered for integrated migration tooling with auto-generation and rollback support
   - Not selected: requires the Django framework; not compatible with the FastAPI + SQLAlchemy stack

2. **Flyway**
   - Considered for enterprise-grade versioned SQL migrations with strong rollback capabilities
   - Not selected: less integration with SQLAlchemy; adds a JVM dependency; the Python ecosystem prefers Alembic

3. **Raw SQL Scripts with Custom Version Tracking**
   - Considered for maximum control and simplicity
   - Not selected: reinvents the wheel; lacks auto-generation; higher maintenance overhead; no built-in downgrade support

4. **Prisma Migrate**
   - Considered for modern developer experience with a declarative schema
   - Not selected: TypeScript/Node.js ecosystem; not compatible with the Python backend stack

## Related ADRs

- [ADR-004: Database (PostgreSQL)](./adr-004-database.md): the database platform requiring migration tooling
- [ADR-007: ORM Choice (SQLAlchemy)](./adr-007-orm-choice.md): the ORM that Alembic integrates with natively

## References

- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [SQLAlchemy 2.0 Documentation](https://docs.sqlalchemy.org/en/20/)
- [Database Design Document](../03-architecture/database/database-design.md): schema entities requiring migration management

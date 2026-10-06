# Database Architecture

## Overview

Database architecture documentation defining the core schema, entity relationships, indexing strategy, Row-Level Security (RLS) policies, and data governance rules for the Open Projects Hub MVP.

## Documents

| Document                                   | Description                                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [database-design.md](./database-design.md) | Full schema design: 6-entity ERD, table definitions, constraints, indexes, RLS policies, access patterns, and requirements traceability |

## Related Architecture Decision Records

- [ADR-004: Database (Amazon RDS PostgreSQL)](../../04-decisions/adr-004-database.md)
- [ADR-005: Authentication and Authorization Strategy](../../04-decisions/adr-005-authentication.md)
- [ADR-007: ORM Choice (SQLAlchemy)](../../04-decisions/adr-007-orm-choice.md)
- [ADR-017: Database Migration Strategy](../../04-decisions/adr-017-database-migration-strategy.md)

## Scope

This domain covers:

- Database schema design and entity relationships (users, clients, projects, epics, user_stories)
- Migration strategy and version control (Alembic per ADR-017)
- Row-Level Security (RLS) policies
- Indexing strategy and query optimization
- Backup and disaster recovery procedures
- Data retention and archival policies

## Requirements Coverage

| Requirement | Database Coverage                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-001-01   | `clients` and `projects` with `client_id` FK                                                                                                   |
| FR-001-02   | `projects.status` and owner index for max-3-active-project validation                                                                          |
| FR-001-03   | `projects.phase` constrained to `discovery` and `planning`                                                                                     |
| FR-002-01   | Raw input acceptance handled at application layer; refined output stored in `user_stories`                                                     |
| FR-002-02   | `user_stories` with `story_id`, `title`, `description`, `acceptance_criteria`, `priority`, `story_points`, `labels`, and approval audit fields |
| FR-002-03   | `user_stories.status`, `approved_by_user_id`, and `approved_at` for explicit approval gate                                                     |
| FR-003-01   | `users.role` and `users.status` for authorization                                                                                              |
| FR-003-02   | `users.workspace_id` confines every account to one workspace                                                                                   |
| FR-003-03   | Approved stories and phase visibility model                                                                                                    |
| FR-004-01   | `epics` and `user_stories` with `acceptance_criteria`, `priority`, `status`, and `epic_id` FK for backlog views grouped by epic                |
| FR-007-01   | `users` identity projection and `password_hash`; custom auth bounded context owns credential lifecycle                                         |
| NFR-001-01  | Soft archive fields on `clients` and `projects`                                                                                                |
| NFR-003-01  | Membership-driven RBAC and RLS-compatible ownership fields                                                                                     |
| NFR-X01     | Auth-provider boundary and sensitive-field handling                                                                                            |
| NFR-X06     | UUID keys and targeted indexes for MVP growth                                                                                                  |

## Postgres Best Practices Applied

This schema follows PostgreSQL best practices across the following categories.

### Schema Design

- **UUID primary keys** for distributed-friendly identity generation
- **`timestamptz`** for all timestamp columns (timezone-aware)
- **`text`** for variable-length string fields (no `varchar(n)` limits)
- **Lowercase snake_case** identifiers throughout
- **Foreign key indexes** on all FK columns for join performance
- **Check constraints** for lifecycle enums on status, phase, and priority fields
- **JSONB `acceptance_criteria`** with GIN index for flexible checklist storage
- **`story_id`** unique human-readable identifier (e.g., `US-EP0-BE-001`) for API, exports, and backlog views

### Indexing Strategy

- Composite indexes matched to access patterns: `(owner_admin_user_id, status, created_at DESC)` for dashboard lists
- Unique `projects.access_code` for the public Client Review lookup
- Covering design avoids full table scans on dashboard, project detail, and refinement review queries
- All JOIN and WHERE columns indexed per PostgreSQL best practices

### Security & Access Control

- Row-Level Security (RLS) enforced with least-privilege defaults for Admin and Member boundaries
- Authentication via custom JWT auth bounded context (bcrypt/passlib per ADR-005)
- Sensitive fields (`email`, `contact_email`, `password_hash`) governed by auth boundary
- Lifecycle auditability via `created_at`, `updated_at`, `approved_at`, and `archived_at` columns
- Least-privilege role design with separate read/write access patterns

### Data Integrity

- Atomic upsert via `INSERT ... ON CONFLICT DO UPDATE` to eliminate race conditions
- Single-transaction business rule enforcement (max 3 active projects per Admin) with row-level locking
- Keyset/cursor-based pagination for API list endpoints (avoids OFFSET performance degradation)
- Batch inserts for bulk data operations over individual `INSERT` statements
- Foreign key constraints prevent orphaned child records across all entity relationships

### Connection Management

- Connection pooling (PgBouncer, transaction mode) for efficient server resource utilization
- Prepared statements configured for pooling compatibility (unnamed or session mode where needed)
- Idle timeout configuration to reclaim unused connections

## Source References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)
- [Amazon RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/)
- [PostgreSQL Performance Optimization](https://wiki.postgresql.org/wiki/Performance_Optimization)

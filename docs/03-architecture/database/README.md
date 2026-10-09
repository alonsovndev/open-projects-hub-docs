# Database Architecture

## Overview

Database documentation for Open Projects Hub: the schema as implemented, entity relationships,
indexes, and data governance rules. The source of truth is the SQLAlchemy models and Alembic
migrations in `open-projects-hub-api`.

## Documents

| Document | Description |
| --- | --- |
| [database-design.md](./database-design.md) | Schema design: ERD, the 11 tables and their constraints and indexes, access patterns, and requirements traceability |

## Related Architecture Decision Records

- [ADR-004: Database (Amazon RDS PostgreSQL)](../../04-decisions/adr-004-database.md)
- [ADR-005: Authentication and Authorization Strategy](../../04-decisions/adr-005-authentication.md)
- [ADR-007: ORM Choice (SQLAlchemy)](../../04-decisions/adr-007-orm-choice.md)
- [ADR-017: Database Migration Strategy](../../04-decisions/adr-017-database-migration-strategy.md)

## Scope

This domain covers:

- Schema design and entity relationships (workspaces, users, clients, projects, stories, AI keys and credits, auth state)
- Migration strategy and version control (Alembic, ADR-017)
- Indexing strategy for the main access patterns
- Data retention rules (hard deletes for keys, cascades for stories and codes)

## Requirements Coverage

| Requirement | Database Coverage |
| --- | --- |
| FR-001-01 | `clients` and `projects` with the `client_id` FK |
| FR-001-02 | `projects.status` and the `(workspace_id, status, created_at)` index for the max-3-active-projects check |
| FR-001-03 | `projects.phase` limited to `discovery` and `planning` |
| FR-002-02 | `stories` with `title`, `description`, `acceptance_criteria`, `priority`, and `points` |
| FR-002-03 | Only approved stories are stored (ADR-019) |
| FR-003-01 | `users.role` (`admin`, `member`) |
| FR-003-02 | `workspace_id` on users, clients, and projects confines every record to one workspace |
| FR-003-03 | Unique `projects.access_code` gives clients read-only access to one project's stories |
| FR-004-01 | `stories` with `acceptance_criteria`, `priority`, and `status` for the backlog view and export |
| FR-007-01 | `users.password_hash`, `account_lockouts`, and `revoked_refresh_tokens` |
| NFR-003-01 | Workspace-scoped foreign keys and repository filters |
| NFR-X01 | Hashed passwords, codes, and refresh tokens; encrypted provider keys |
| NFR-X06 | UUID keys and targeted indexes |

## PostgreSQL Practices Applied

### Schema Design

- UUID primary keys on entity tables
- `timestamptz` for every timestamp column
- Lowercase snake_case identifiers
- Postgres enums for roles, providers, and lifecycle fields
- `TEXT[]` for story acceptance criteria

### Indexing

- Composite indexes matched to access patterns, such as `(workspace_id, status, created_at)` for project lists and `(project_id, created_at)` for backlogs
- Unique `projects.access_code` for the public Client Review lookup
- Partial unique index on `(workspace_id, email)` for clients that have an email

### Security and Access Control

- Authorization is enforced in the application layer: every repository call is scoped by the caller's `workspace_id`. Row-Level Security is not used.
- Passwords and one-time codes are bcrypt hashes; refresh tokens are stored as SHA-256 hashes; provider keys are AES-256-GCM ciphertext.

### Data Integrity

- Atomic upserts (`INSERT ... ON CONFLICT DO UPDATE`) for the key-validation rate limit
- Conditional `UPDATE ... WHERE ai_credits_remaining > 0` for credit spending
- Primary-key conflicts make refresh-token rotation single-use under concurrent requests
- Foreign keys prevent orphaned rows; `workspace_id` references are `ON DELETE RESTRICT`

### Connection Management

- SQLAlchemy async engine with a connection pool (`pool_size`, `max_overflow`, `pool_pre_ping` set per environment in `config_<env>.yml`)

## Source References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)
- [Amazon RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/)

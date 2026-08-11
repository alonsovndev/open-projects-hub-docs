# Database Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Domain**       | Database Architecture       |
| **Last Updated** | 2026-08-11                  |

## Overview

This folder contains database architecture documentation including schema design, migration strategies, performance optimization, and data governance policies.

## Related Architecture Decision Records

- [ADR-004: Database](../adrs/adr-004-database.md) (Amazon RDS PostgreSQL)
- [ADR-007: ORM Choice](../adrs/adr-007-orm-choice.md) (SQLAlchemy)
- [ADR-017: Database Migration Strategy](../adrs/adr-017-database-migration-strategy.md) (Alembic)

## Scope

This domain covers:
- Database schema design and entity relationships (6-entity model: users, clients, projects, epics, project_memberships, user_stories)
- Migration strategy and version control
- Row-Level Security (RLS) policies
- Indexing strategy and query optimization
- Backup and disaster recovery procedures
- Data retention and archival policies

## Requirements Coverage

This domain addresses the following Must-priority requirements:

| Requirement | Description |
|-------------|-------------|
| FR-001 | Project and client CRUD operations |
| FR-002 | AI refinement and user story generation |
| FR-003 | Requirement and role-based access management |
| FR-004 | Requirements backlog with epic grouping and Markdown export |
| FR-006 | Project status tracking |
| NFR-001 | Authentication and authorization |
| NFR-005 | Performance (response time) |
| NFR-006 | Scalability and reliability |

## Future Documentation

The following documents are planned for this domain:

- **Schema Design**: Entity-relationship models, table definitions, constraints
- **RLS Policies**: Row-Level Security implementation patterns
- **Query Optimization**: Query patterns, indexing strategy, N+1 prevention
- **Backup & Recovery**: Backup strategy, point-in-time recovery, disaster recovery

> **Note**: Database design documentation will be added as schema evolves during implementation phases.

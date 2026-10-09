# ADR-004: Database (Amazon RDS PostgreSQL)

- **Status**: Accepted
- **Date**: 2026-02-28
- **Updated**: 2026-08-03

> **Implementation note (2026-10-07):** PostgreSQL Row Level Security was not implemented. Tenant isolation is enforced in the application layer: every repository query is scoped by the caller's `workspace_id`, and records in another workspace return 404. See [Database Design](../03-architecture/database/database-design.md#security-and-data-governance).

## Context

The system needs relational consistency, secure role-based data access, and operational simplicity for a small team. With the decision to adopt AWS as the primary cloud platform, the database solution must align with AWS infrastructure while maintaining PostgreSQL capabilities.

## Decision

Use **Amazon RDS PostgreSQL** (Free Tier: db.t3.micro) as the primary database with native PostgreSQL **Row Level Security (RLS)** and managed backup/recovery capabilities.

### Configuration

- **Instance Type**: db.t3.micro (Free Tier: 750 hours/month for 12 months)
- **Storage**: 20GB General Purpose SSD (Free Tier eligible)
- **PostgreSQL Version**: 15.x
- **Deployment**: Single-AZ for dev-as-production environment
- **Backups**: Automated daily backups with 7-day retention
- **Networking**: Private subnets within VPC, accessible only from App Runner service

## Consequences

### Positive

- ACID consistency and mature SQL ecosystem for core entities.
- Managed operations (automated backups, patching, monitoring) reduce DBA overhead for MVP.
- Native PostgreSQL RLS enables data-centric least-privilege authorization.
- AWS Free Tier eligible for 12 months (~750 hours/month).
- Seamless integration with AWS infrastructure (VPC, IAM, CloudWatch).
- Easy upgrade path to Multi-AZ and larger instance types as needs grow.
- Point-in-time recovery (PITR) available with automated backups.

### Negative

- Single-AZ deployment has single point of failure for dev environment (acceptable for MVP).
- RLS policies require manual SQL implementation (no GUI like Supabase).
- Connection management requires explicit pooling strategy.
- After 12 months, ongoing cost ~$15-20/month for db.t3.micro.

### Connection Configuration

- Use connection pooling via PgBouncer or SQLAlchemy pool
- Connection timeout: 30 seconds
- Pool size: 5-10 connections for MVP
- Max overflow: 10 connections

## Alternatives Considered

1. **Supabase-managed PostgreSQL**
   - Considered for built-in auth, RLS UI, and quick setup.
   - Not selected to consolidate infrastructure on AWS and reduce multi-platform complexity.
2. **Self-managed PostgreSQL on EC2**
   - Considered for maximum control.
   - Not selected due to higher operations burden (patching, backups, monitoring).
3. **Amazon Aurora PostgreSQL**
   - Considered for better performance and availability.
   - Not selected due to higher cost (no Free Tier, minimum ~$45/month) and overkill for MVP scale.
4. **MongoDB / DynamoDB**
   - Considered for schema flexibility.
   - Not selected because relational workflows, ACID guarantees, and constraints are central to requirements.

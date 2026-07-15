# Deployment & Infrastructure Architecture

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.1                         |
| **Status**       | Draft                       |
| **Last Updated** | 2026-03-24                  |

## 1. Scope and NFR Alignment

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [Non-Functional Requirements](../../01-requirements/non-functional-requirements.md)

---

This document defines production deployment architecture for the MVP and aligns it with:

- **NFR-005:** Core views respond within 2 seconds under MVP load.
- **NFR-006:** Support at least 3 active projects and 500 user stories without data loss.
- **Reliability target (MVP):** 99.9% monthly availability for frontend and backend services.

## 2. Cloud Platform Selection and Rationale

### 2.1 Options Considered

| Option                                      | Strengths                                                          | Risks/Trade-offs                            | Decision             |
| ------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- | -------------------- |
| AWS-first IaaS/PaaS                         | Maximum service breadth and infra control                          | Higher ops overhead and slower MVP delivery | Not selected for MVP |
| Azure-first                                 | Strong enterprise tooling and Microsoft integration                | Similar ops complexity for small team       | Not selected for MVP |
| GCP-first                                   | Good pricing and data tooling                                      | Similar platform-management burden          | Not selected for MVP |
| Hybrid (cloud + on-prem)                    | Regulatory flexibility                                             | Highest complexity for MVP                  | Not selected         |
| **Managed multi-platform cloud (selected)** | Low-ops, fast delivery, built-in scaling and deployment ergonomics | Multi-vendor governance required            | **Selected**         |

### 2.2 Selected Platform Model

- **Frontend:** Vercel (edge CDN, preview deployments, global delivery).
- **Backend:** Render (Docker container services, autoscaling, health checks).
- **Database/Auth/Storage:** Supabase (PostgreSQL, Auth, Storage, PITR/backups).
- **Observability:** Sentry (error + performance monitoring).
- **CI/CD:** GitHub Actions.

This model is compatible with long-term migration to consolidated cloud infrastructure if scale or compliance requirements change.

## 3. Deployment Architecture

Reference diagram: [`../diagrams/deployment-cloud.mmd`](../diagrams/deployment-cloud.mmd)

### 3.1 Compute Resources

- **Web compute:** Render FastAPI service (Docker, stateless API processes).
- **Edge compute:** Vercel Edge Functions for middleware/proxy and edge-aware request handling.
- **Serverless usage:** Limited to edge middleware needs; core business logic remains in backend container services.

### 3.2 Database and Storage

- **Primary database:** Supabase PostgreSQL (managed, automated backups, point-in-time recovery).
- **Auth:** Supabase Auth (JWT issuance + identity providers).
- **File/object storage:** Supabase Storage for exports and attachments.

### 3.3 Networking

- Public ingress via HTTPS to:
  - Vercel frontend domain,
  - Render API endpoint (behind managed load balancing),
  - Supabase managed endpoints (auth/storage/database APIs as needed).
- Logical network segmentation:
  - Public edge endpoints (frontend and API ingress),
  - Private service-to-service traffic (backend ↔ database/auth providers).
- DNS:
  - Public DNS managed at registrar/provider level with CNAME/A/ALIAS to Vercel/Render.
  - Environment-specific domains (`dev`, `staging`, `prod`) for isolation and safe rollouts.

### 3.4 Scaling Strategy

- **Horizontal scaling (primary):**
  - Render API instances scale out based on CPU/memory/request pressure.
  - Stateless design ensures safe horizontal replication.
- **Vertical scaling (secondary):**
  - Increase Render service size only when necessary and after profiling.
- **Database scaling:**
  - Connection pooling via Supabase PgBouncer.
  - Read replica strategy introduced when query volume requires it.

### 3.5 High Availability and Failover

- Multi-zone managed provider infrastructure for frontend, backend platform, and database services.
- Health checks for backend instances with automatic replacement.
- Auth and data paths use managed service failover capabilities where available.

## 4. Backup and Disaster Recovery

| Data/Service                        | Backup Approach                                        | RPO          | RTO       |
| ----------------------------------- | ------------------------------------------------------ | ------------ | --------- |
| Supabase PostgreSQL                 | Automated managed backups + PITR                       | ≤ 15 minutes | ≤ 4 hours |
| Supabase Storage                    | Managed object redundancy + scheduled export snapshots | ≤ 24 hours   | ≤ 8 hours |
| Application config/secrets metadata | Versioned in IaC + secure secret stores                | ≤ 1 hour     | ≤ 2 hours |

Disaster recovery runbook includes incident triage, restore order (database first, then API, then frontend), and post-incident verification on critical user journeys.

## 5. Environment Strategy

- **Development:** Fast iteration, lower cost profiles, relaxed scaling.
- **Staging:** Production-like topology with representative data shape and release candidates.
- **Production:** Highest availability settings, strict access controls, and monitored SLOs.

Promotion path: `develop` → staging verification → `main` production release.

## 6. Cost Optimization Strategy

- Prefer managed services to reduce operational FTE cost during MVP.
- Use autoscaling to match usage and avoid constant over-provisioning.
- Keep a single backend runtime for MVP until sustained load justifies workload separation.
- Monthly budget review with provider usage dashboards and anomaly alerts.

## 7. Infrastructure as Code (IaC) Approach

- **Tooling direction:** Terraform as the primary IaC tool for cross-provider configuration orchestration.
- **Scope:**
  - Environment variables and service wiring metadata,
  - DNS and edge routing records,
  - managed provider resources where APIs are available.
- **Governance:**
  - All IaC changes reviewed by PR,
  - Plan/apply controlled through GitHub Actions,
  - drift checks in scheduled pipelines.

## 8. Security Architecture Considerations

- HTTPS enforced on all public endpoints.
- Supabase Auth for identity; backend validates JWT claims.
- Supabase RLS policies for data-level authorization.
- Secrets managed in provider secret stores and GitHub Actions encrypted secrets.
- Rate limiting and input validation at API layer.

## 9. Deployment Impact Summary (GitHub Actions)

- CI verifies docs and architecture artifacts where checks exist.
- CD deploys frontend, backend, and migrations in environment-gated stages.
- Rollback is performed by redeploying last known-good artifact/commit and, if needed, restoring database from PITR.

## 10. Related ADRs

- [ADR-006: Deployment Platform (Vercel + Render)](../adrs/adr-006-deployment-platform.md)
- [ADR-013: Containerization Approach for Render Services](../adrs/adr-013-containerization.md)
- [ADR-014: Infrastructure as Code Strategy (Terraform)](../adrs/adr-014-infrastructure-as-code.md)

---

## Change Log

| Date       | Version | Change Summary                                             | Author |
| ---------- | ------- | ---------------------------------------------------------- | ------ |
| 2026-02-28 | 1.0     | Initial draft — deployment and infrastructure architecture | —      |
| 2026-03-24 | 1.1     | Aligned deployment guidance with simplified MVP scope      | —      |

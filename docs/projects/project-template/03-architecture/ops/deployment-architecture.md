# Deployment Architecture Template (AI-Ready)

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |

## How to Use (AI Agent Instructions)

- Select a platform model before filling in compute and networking sections.
- Align scaling strategy choices with the NFRs (latency, availability, data volume targets).
- Link to corresponding ADRs for platform, database, and caching decisions.
- Keep the architecture diagram synchronized with the compute/networking sections.

## Sources

- [Architecture Solution Design](../architecture-solution-design.md)
- [Technology Stack](../technology-stack.md)
- [Non-Functional Quality View](../../01-requirements/non-functional-requirements.md)

---

## 1. Scope and NFR Alignment

This document defines production deployment architecture and aligns it with:

- **[NFR ID]:** [e.g., Core views respond within 2 seconds under expected load]
- **[NFR ID]:** [e.g., Support at least N concurrent users without data loss]
- **Reliability target:** [e.g., 99.9% monthly availability for frontend and backend services]

## 2. Cloud Platform Selection

### 2.1 Options Considered

| Option                 | Strengths                                 | Risks / Trade-offs                           | Decision                  |
| ---------------------- | ----------------------------------------- | -------------------------------------------- | ------------------------- |
| AWS-first IaaS/PaaS    | Maximum service breadth and infra control | Higher ops overhead, slower initial delivery | [Selected / Not Selected] |
| Azure-first            | Strong enterprise tooling                 | Similar ops complexity for small team        | [Selected / Not Selected] |
| GCP-first              | Good pricing and data tooling             | Platform-management burden                   | [Selected / Not Selected] |
| Managed multi-platform | Low-ops, fast delivery, built-in scaling  | Multi-vendor governance required             | [Selected / Not Selected] |

### 2.2 Selected Platform Model

- **Frontend hosting:** [e.g., Vercel / Cloudflare Pages — edge CDN, preview deployments]
- **Backend hosting:** [e.g., Render / Railway / AWS ECS — container services, autoscaling]
- **Database / Auth / Storage:** [e.g., Managed PostgreSQL + Auth provider + Object storage]
- **Observability:** [e.g., Sentry / Datadog / OpenTelemetry]
- **CI/CD:** [e.g., GitHub Actions]

Reference diagram: [`../diagrams/deployment.mmd`](../diagrams/deployment.mmd)

## 3. Compute Resources

- **Web compute:** [Backend container service — stateless API processes]
- **Background compute:** [Worker service for async jobs, e.g., exports, notifications]
- **Edge compute:** [e.g., Edge functions for middleware/proxy; limit to non-business-logic use cases]
- **Serverless:** [If used — scope and constraints]

## 4. Database and Storage

- **Primary database:** [Managed relational/NoSQL DB with automated backups and point-in-time recovery]
- **Auth:** [Auth provider — JWT issuance and identity management]
- **File / object storage:** [Object store for exports, attachments, or media]
- **Cache:** [Managed cache, e.g., Redis, for hot reads, rate limiting, and ephemeral state]

## 5. Networking

- Public ingress via HTTPS to: [frontend domain], [backend API endpoint]
- Logical segmentation:
  - Public edge: frontend and API ingress
  - Private: service-to-service traffic (backend ↔ database/cache/auth)
- DNS: [environment-specific domains for dev/staging/prod isolation]

## 6. Scaling Strategy

- **Horizontal scaling (primary):** [Backend scales out on CPU/memory/request pressure; stateless design ensures safe replication]
- **Vertical scaling (secondary):** [Only when profiling confirms the bottleneck is resource-bound]
- **Database scaling:** [Connection pooling, read replica strategy when query volume requires]
- **Cache scaling:** [Cluster mode or replica if cache becomes a bottleneck]

## 7. Environment Strategy

| Environment | Purpose                         | Deployment Trigger      | Approvals              |
| ----------- | ------------------------------- | ----------------------- | ---------------------- |
| Dev         | Fast feedback, frequent deploys | Branch push             | None                   |
| Staging     | Production-like validation      | PR merge to main branch | [Optional manual gate] |
| Production  | Live system                     | Staging promotion       | [Required approvals]   |

## 8. Disaster Recovery

- **RTO (Recovery Time Objective):** [e.g., < 1 hour for critical failures]
- **RPO (Recovery Point Objective):** [e.g., < 1 hour data loss tolerance]
- **Strategy:** [e.g., managed database PITR restore + stateless service redeploy]
- **Runbook location:** [Link or TBD]

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

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

Reference diagram: [`docs/03-architecture/diagrams/deployment-aws.mmd`](./diagrams/deployment-aws.mmd)

### 3.1 Compute Resources

- **Web compute:** Render FastAPI service (Docker, stateless API processes).
- **Background compute:** Render worker service for async jobs (exports, notifications, future AI refinement tasks).
- **Edge compute:** Vercel Edge Functions for middleware/proxy and edge-aware request handling.
- **Serverless usage:** Limited to edge middleware needs; core business logic remains in backend container services.

### 3.2 Database and Storage

- **Primary database:** Supabase PostgreSQL (managed, automated backups, point-in-time recovery).
- **Auth:** Supabase Auth (JWT issuance + identity providers).
- **File/object storage:** Supabase Storage for exports and attachments.
- **Cache:** Managed Redis (Render-managed or equivalent) for hot reads, throttling counters, and ephemeral workflow state.

### 3.3 Networking

- Public ingress via HTTPS to:
  - Vercel frontend domain,
  - Render API endpoint (behind managed load balancing),
  - Supabase managed endpoints (auth/storage/database APIs as needed).
- Logical network segmentation:
  - Public edge endpoints (frontend and API ingress),
  - Private service-to-service traffic (backend ↔ database/cache/auth providers).
- DNS:
  - Public DNS managed at registrar/provider level with CNAME/A/ALIAS to Vercel/Render.
  - Environment-specific domains (`dev`, `staging`, `prod`) for isolation and safe rollouts.

### 3.4 Scaling Strategy

- **Horizontal scaling (primary):**
  - Render API and worker instances scale out based on CPU/memory/request pressure.
  - Stateless design ensures safe horizontal replication.
- **Vertical scaling (secondary):**
  - Increase Render service size only when necessary and after profiling.
- **Database scaling:**
  - Connection pooling via Supabase PgBouncer.
  - Read replica strategy introduced when query volume requires it.
- **Caching strategy:**
  - Cache high-read project and requirements views to protect PostgreSQL.

### 3.5 High Availability and Failover

- Multi-zone managed provider infrastructure for frontend, backend platform, and database services.
- Health checks for backend instances with automatic replacement.
- Graceful degradation:
  - Cache failures fall back to database reads.
  - Non-critical async workloads retried through workers.
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
- Separate worker/web services for right-sized compute allocation.
- Use caching to reduce database load and expensive scaling events.
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

- [ADR-006: Deployment Platform (Vercel + Render)](./adrs/adr-006-deployment-platform.md)
- [ADR-013: Containerization Approach for Render Services](./adrs/adr-013-containerization.md)
- [ADR-014: Infrastructure as Code Strategy (Terraform)](./adrs/adr-014-infrastructure-as-code.md)

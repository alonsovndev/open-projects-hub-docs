# Orthopedic Spine — Architecture Styles Decision

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-18       |
| **Owner**        | Tech Lead        |

## Sources

- [Project Overview](../overview.md)
- [Open Questions](../open-questions.md)
- [Project Requirements by Feature](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [ADR-001: High-Level Architecture Pattern](./adrs/adr-001-high-level-architecture.md)

---

## Decision Summary

The project will use a **separately deployed React frontend with a modular monolith backend** for MVP, with **Clean Architecture + DDD-inspired module boundaries** inside the backend service.

This decision aligns with:

- the 6-8 week MVP timeline and small-team delivery model,
- the need to separate public browsing from protected admin and staff workflows,
- the approved minimal-data inquiry model and two-role access-control baseline,
- a low-operations preference that still preserves a clean future extraction path.

## Architecture Style Evaluation

| Style / Pattern                           | Benefits                                                                    | Drawbacks                                                                  | Fit for Current Context                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Static site + external CMS/forms          | Fast public-page delivery and low initial setup                             | Weak fit for custom inquiry review, role boundaries, and approval rules    | Partial fit for marketing content, but weak fit for integrated admin needs  |
| Traditional full-stack monolith           | Simple deployment model and fast MVP setup                                  | Public, admin, and data concerns can blur quickly                          | Acceptable short-term option, but weaker long-term boundary control         |
| Serverless or API-per-feature             | Flexible scaling and isolated workloads                                     | Higher operational fragmentation and more delivery overhead for a small team | Not justified for current traffic, team size, or MVP scope                 |
| **React frontend + modular monolith API** | Clear runtime and domain boundaries with manageable operations and evolution | Requires discipline to protect internal module contracts                   | **Best fit for bilingual public content, inquiry workflows, and admin scope** |

## Bounded Context Alignment

The selected style maps the MVP into clear backend modules and frontend route areas:

- **Public Content**: bilingual service pages, clinic profile content, trust signals, and CTA content.
- **Testimonials**: draft, moderation, approval state, and publication eligibility.
- **Inquiries**: public intake, validation, minimal-data persistence, and staff review workflows.
- **Access Control**: admin/staff sign-in, session identity, role mapping, and route authorization.
- **Shared Platform**: audit metadata, media references, anti-spam verification, and notification hooks.

Each backend module owns:

- its own use cases and validation rules,
- repository interfaces and application contracts,
- infrastructure adapters behind those contracts.

## Supporting Patterns

### Clean Architecture inside the modular monolith

- Keep domain and application logic independent from FastAPI, SQLAlchemy, and provider SDK details.
- Use ports and adapters for persistence, auth-context lookup, anti-spam verification, and notifications.
- Reserve framework concerns for presentation and infrastructure boundaries.

### Runtime separation between public and protected flows

- Keep the public website and admin workspace in the same frontend codebase only when route trees, auth checks, and data access remain clearly separated.
- Route all protected mutations and inquiry-review reads through authenticated API boundaries.

### Managed-service integration pattern

- Use managed auth, relational storage, media storage, and anti-spam services as replaceable edge integrations.
- Keep clinic-facing business rules in application code rather than inside provider-specific automation.

## Rationale and Trade-offs

### Why this is the right decision now

1. It preserves MVP delivery speed without introducing distributed-system overhead.
2. It keeps privacy-sensitive inquiry handling and publishing controls behind explicit backend boundaries.
3. It gives the project a practical evolution path if inquiry volume, operational complexity, or integrations grow after MVP.

### Key trade-offs accepted

- A single backend deployable is easier to ship now, but module boundaries must be protected with ADR-guided change discipline.
- A shared React codebase improves delivery speed, but public and admin route separation must stay explicit to avoid trust-boundary leakage.
- Managed platforms reduce ops work, but platform coupling must stay behind replaceable adapters and contracts.

## Evolution Strategy

The preferred path is **modular monolith first, selective extraction later only when justified by measured pressure**.

### Extraction triggers

Consider extracting a backend module only when one or more conditions are sustained:

- inquiry throughput or SLA pressure creates a real hotspot,
- a module needs an independent release cadence,
- fault isolation becomes important for a workflow,
- ownership splits across teams create delivery bottlenecks.

### Migration path

1. Keep domain contracts stable inside existing module boundaries.
2. Extract one bounded context at a time behind existing API contracts.
3. Introduce asynchronous integration only when proven workflow coupling or scale requires it.
4. Keep public content delivery cache-friendly even if protected operational flows evolve separately later.

## Scalability Alignment

- Public marketing pages can favor static or cache-friendly delivery paths without changing the core style decision.
- The backend remains stateless so inquiry and admin traffic can scale horizontally if needed.
- The current style supports later extraction of inquiry handling or content management without forcing an MVP rewrite.
- Analytics pipelines, direct booking, and clinical-system integrations remain intentionally out of scope for this phase.

## Related Documents

- [Architecture Solution Design](./architecture-solution-design.md)
- [Technology Stack](./technology-stack.md)
- [ADR-001: High-Level Architecture Pattern](./adrs/adr-001-high-level-architecture.md)

---

## Change Log

| Date       | Version | Change Summary                                      | Author    |
| ---------- | ------- | --------------------------------------------------- | --------- |
| 2026-04-18 | 1.0     | Added architecture styles and pattern decision doc. | Tech Lead |

# Orthopedic Spine — Technology Stack

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.1              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-18       |
| **Owner**        | Tech Lead        |

## Sources

- [Project Overview](../overview.md)
- [Open Questions](../open-questions.md)
- [Project Requirements by Feature](../01-requirements/readme.md)
- [Phased Roadmap](../02-planning/phased-roadmap.md)
- [Architecture Styles Decision](./architecture-styles.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [ADR-001: High-Level Architecture Pattern](./adrs/adr-001-high-level-architecture.md)

---

## Decision Drivers

- Deliver an MVP in a 6-8 week window with a small team and low operational overhead.
- Support a bilingual public website plus protected admin/staff workflows in one coherent solution.
- Keep inquiry handling privacy-conscious by collecting minimal data and avoiding unsupported clinical-system scope.
- Preserve strong mobile performance, accessibility, and simple content management for non-technical clinic users.
- Favor managed services for commodity capabilities such as auth, storage, email, and anti-spam protection.

## Technology Stack Matrix

| Component                | Selected Technology                | Version / Compatibility              | Role in System                                                        | Rationale                                                                                       | Trade-offs                                                                 |
| ------------------------ | ---------------------------------- | ------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Frontend Framework       | React + TypeScript                 | React 18.x, TypeScript 5.x           | Public website and protected admin/staff interface                    | Already aligned with the approved architecture and supports reusable bilingual/admin UI patterns | Requires disciplined routing and state boundaries between public/admin UX  |
| UI Library               | Ant Design                         | 5.x                                  | Accessible, consistent admin-facing components and form patterns      | Speeds MVP delivery for CRUD-heavy admin workflows and clear validation feedback                | Public marketing pages may need design customization beyond default styles |
| Localization             | react-i18next                      | 15.x                                 | Spanish and English content delivery and translation key management   | Good fit for launch-ready bilingual content with explicit locale switching                      | Translation-key maintenance adds content governance overhead               |
| Frontend Build Tool      | Vite                               | 5.x                                  | Fast frontend build pipeline and optimized static asset delivery      | Keeps delivery fast for a small team and supports modern React defaults                         | Requires plugin/version coordination as integrations grow                  |
| Backend Framework        | FastAPI (Python)                   | Python 3.12 + FastAPI 0.11x          | REST API, validation entry points, admin workflow orchestration       | Strong fit for modular monolith boundaries, typed contracts, and fast MVP delivery              | Requires discipline to keep framework concerns out of deeper domain logic  |
| Data Validation          | Pydantic                           | 2.x                                  | Request/response validation and internal DTO contracts                | Tight FastAPI integration and explicit schema handling for privacy-conscious inquiry payloads    | Framework ecosystem versions need to stay compatible                      |
| Persistence Layer        | SQLAlchemy                         | 2.x                                  | Infrastructure-layer persistence for content, testimonials, inquiries | Mature Python ORM with clear repository-layer patterns                                          | Query tuning and migration discipline are still required                   |
| Database                 | Supabase PostgreSQL                | PostgreSQL 15+ (managed by Supabase) | Primary transactional store for bilingual content, inquiries, and roles | Managed PostgreSQL reduces ops burden while preserving relational integrity and auditability     | Schema evolution must stay controlled as content and admin workflows grow  |
| Authentication           | Supabase Auth + JWT                | Provider-managed                     | Admin/staff sign-in, session lifecycle, and role-bearing identity     | Managed auth reduces implementation risk for MVP secure access                                   | External dependency requires clear token validation and fallback planning  |
| Authorization            | Backend RBAC + database role data  | App-layer policy + relational roles  | Enforces admin versus staff capabilities across protected workflows   | Matches the approved two-role MVP model without overcomplicating permissions                     | Role rules can drift if UI and API checks are not kept synchronized        |
| Object Storage           | Supabase Storage                   | Provider-managed                     | Stores testimonial images and future clinic media assets              | Keeps media close to the managed data/auth platform and avoids extra infrastructure              | Tighter platform coupling than a separate storage provider                 |
| Anti-spam Verification   | Cloudflare Turnstile               | Managed service                      | Protects public inquiry and appointment-request submissions           | Lower-friction spam protection aligns with the minimal-data, mobile-first inquiry flow          | Adds third-party dependency and token verification path                    |
| Transactional Email      | Resend                             | Managed service                      | Sends staff notifications for new inquiries and content workflow alerts | Lightweight developer experience and low operational overhead for MVP notifications              | Another managed vendor to configure and monitor                            |
| Observability            | Sentry                             | SaaS (latest SDKs)                   | Error tracking for frontend, backend, and release issues              | Focuses MVP visibility on submission, auth, and publishing failures                              | Requires careful PII scrubbing for healthcare-adjacent workflows           |
| CI/CD                    | GitHub Actions                     | Hosted runners                       | Automated quality checks and deployment orchestration                 | Native repository integration and simple environment automation                                  | Workflow sprawl can grow without discipline                                |
| Frontend Hosting         | Vercel                             | Managed platform                     | Fast public delivery, previews, and edge caching for the React app    | Strong fit for public-content performance and low-ops deployment                                 | Vendor-specific deployment conventions                                     |
| Backend Hosting          | Render                             | Managed container platform           | Hosts the modular monolith API with health checks and environment config | Simple container hosting model for a small team without Kubernetes overhead                     | Less infrastructure control than self-managed environments                 |

## Integration Guidelines

1. **Frontend → Backend**
   - Use HTTPS-only JSON APIs for public inquiries and protected admin operations.
   - Keep public and admin route trees isolated even when served from the same React application.
   - Localize validation and confirmation messaging in both launch languages.
2. **Frontend → Auth and anti-spam providers**
   - Supabase Auth handles admin/staff sign-in and session refresh.
   - Cloudflare Turnstile protects public submission flows before API acceptance.
   - The public experience must continue to avoid direct handling of sensitive health data.
3. **Backend → Database and storage**
   - SQLAlchemy remains inside the infrastructure layer; domain logic must not depend on ORM models directly.
   - PostgreSQL stores bilingual content, inquiry records, testimonial approval state, clinic profile data, and role assignments.
   - Media assets are stored separately in Supabase Storage with backend-owned access rules.
4. **Backend → Notifications and external channels**
   - Resend sends internal notifications for new inquiries and selected publishing events.
   - WhatsApp remains a user-facing continuation path, not a system-of-record integration, in MVP.
5. **Delivery and observability**
   - Vercel and Render deploy independently to reduce rollback blast radius.
   - Sentry should capture frontend, API, and release issues while redacting inquiry PII.

## Scalability and Performance Alignment

- Public pages should favor static or cache-friendly delivery paths wherever protected data is not involved.
- The backend remains stateless so the API can scale horizontally if inquiry volume increases.
- PostgreSQL indexes should prioritize inquiry status/date access, testimonial approval filters, and bilingual content lookup paths.
- No cache layer, message broker, or analytics pipeline is required for MVP; add them only after real usage proves the need.

## Trade-offs and Deferred Choices

| Decision Area | Chosen for MVP | Deferred Alternative | Why Deferred |
| ------------- | -------------- | -------------------- | ------------ |
| Application shape | React frontend + FastAPI modular monolith | Full-stack monolith or API-per-feature/serverless | The chosen stack keeps boundaries explicit without adding distributed-system overhead |
| Managed platform scope | Supabase for PostgreSQL, Auth, and Storage | Self-managed database/auth/storage services | MVP priorities favor low ops and faster delivery over maximum infrastructure control |
| Public form protection | Cloudflare Turnstile | Heavier CAPTCHA or custom abuse tooling | MVP needs lower friction on mobile and a simpler rollout |
| Async infrastructure | Direct synchronous processing + email notifications | Redis, queues, or event brokers | Current inquiry volume and workflow complexity do not justify extra moving parts |
| Measurement tooling | Operational observability only | Product analytics and attribution tooling | Analytics is explicitly deferred out of MVP scope |

## ADR Follow-Up Candidates

- Backend framework and service boundary confirmation
- Managed data platform selection and ownership boundaries
- Authentication and role-enforcement strategy
- Deployment platform and release rollback model

## References

- [Architecture Styles Decision](./architecture-styles.md)
- [Architecture Solution Design](./architecture-solution-design.md)
- [ADR-001: High-Level Architecture Pattern](./adrs/adr-001-high-level-architecture.md)
- [F-002 Inquiry and Appointment Request Flow](../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [F-004 Admin Content and Testimonial Management](../01-requirements/f-004-admin-content-and-testimonial-management.md)
- [F-006 Admin Access and Role Boundaries](../01-requirements/f-006-admin-access-and-role-boundaries.md)

---

## Change Log

| Date       | Version | Change Summary                                      | Author    |
| ---------- | ------- | --------------------------------------------------- | --------- |
| 2026-04-18 | 1.1     | Added architecture styles as a source and reference. | Tech Lead |
| 2026-04-17 | 1.0     | Added initial technology stack decision baseline.   | Tech Lead |

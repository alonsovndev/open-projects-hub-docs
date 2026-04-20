# Role Mapping

| Attribute        | Value            |
| ---------------- | ---------------- |
| **Project**      | Orthopedic Spine |
| **Version**      | 1.0              |
| **Status**       | Draft            |
| **Last Updated** | 2026-04-17       |
| **Owner**        | Product Owner    |

## Sources

- [Project Overview](../overview.md)
- [Open Questions](../open-questions.md)
- [Feature Requirements](../01-requirements/readme.md)
- [Phased Roadmap](./phased-roadmap.md)

---

## Role Definitions

| Role                   | Primary Planning Focus                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| Product Owner          | Scope control, requirement traceability, prioritization, and stakeholder alignment         |
| Tech Lead              | Security, role boundaries, quality gates, and cross-workstream dependency management       |
| UI/UX Designer         | Accessibility, mobile usability, bilingual content presentation, and trust signals         |
| Frontend Engineer      | Public CTA behavior, form feedback, and admin/staff workflow feasibility                   |
| Backend Engineer       | Protected workflow feasibility, inquiry handling boundaries, and moderation constraints    |
| Clinic Owner / Admin   | Content approval, testimonial governance, bilingual content readiness, and launch sign-off |
| Front Desk Coordinator | Inquiry follow-up workflow fit, operational detail updates, and staff usability feedback   |

---

## Workstream Ownership Matrix

| Workstream                                   | Feature(s)     | Owner                  | Primary           | Support                     | Informed               |
| -------------------------------------------- | -------------- | ---------------------- | ----------------- | --------------------------- | ---------------------- |
| Public trust content and CTA alignment       | F-001          | Product Owner          | UI/UX Designer    | Frontend Engineer           | Clinic Owner / Admin   |
| Inquiry/request scope and privacy guardrails | F-002          | Product Owner          | Frontend Engineer | Tech Lead, Backend Engineer | Front Desk Coordinator |
| Location, schedule, map, and social accuracy | F-003          | Clinic Owner / Admin   | Frontend Engineer | Product Owner               | Front Desk Coordinator |
| Content publishing and testimonial approval  | F-004          | Clinic Owner / Admin   | Backend Engineer  | Product Owner               | Front Desk Lead        |
| Inquiry review and operational update flow   | F-005          | Front Desk Coordinator | Backend Engineer  | Product Owner               | Clinic Owner / Admin   |
| Secure admin access and role boundaries      | F-006          | Tech Lead              | Backend Engineer  | Frontend Engineer           | Product Owner          |
| Cross-cutting launch quality baselines       | F-001 to F-006 | Tech Lead              | UI/UX Designer    | Frontend Engineer           | Product Owner          |

---

## Phase-Level Task Ownership (RACI)

### MVP Phase

| Priority | Epic / Task                              | Accountable            | Responsible                         | Consulted                           |
| -------- | ---------------------------------------- | ---------------------- | ----------------------------------- | ----------------------------------- |
| Must     | Public trust and bilingual launch        | Product Owner          | UI/UX Designer, Frontend Engineer   | Clinic Owner / Admin                |
| Must     | Inquiry and request workflow baseline    | Product Owner          | Frontend Engineer, Backend Engineer | Tech Lead, Front Desk Coordinator   |
| Must     | Content publishing and testimonial guard | Clinic Owner / Admin   | Backend Engineer                    | Product Owner, Frontend Engineer    |
| Must     | Inquiry review and staff workflow fit    | Front Desk Coordinator | Backend Engineer                    | Product Owner, Clinic Owner / Admin |
| Must     | Secure admin access and quality gates    | Tech Lead              | Backend Engineer, Frontend Engineer | Product Owner, UI/UX Designer       |

### Phase 1

| Priority | Epic / Task                            | Accountable          | Responsible                       | Consulted                           |
| -------- | -------------------------------------- | -------------------- | --------------------------------- | ----------------------------------- |
| Should   | WhatsApp continuation and CTA polish   | Product Owner        | Frontend Engineer, UI/UX Designer | Front Desk Coordinator              |
| Should   | Social/discovery hardening             | Clinic Owner / Admin | Frontend Engineer                 | Product Owner                       |
| Should   | Performance and discoverability uplift | Tech Lead            | Frontend Engineer, UI/UX Designer | Product Owner, Clinic Owner / Admin |

### Phase 2

| Priority | Epic / Task                            | Accountable   | Responsible                           | Consulted                             |
| -------- | -------------------------------------- | ------------- | ------------------------------------- | ------------------------------------- |
| Could    | Post-MVP scheduling workflow discovery | Product Owner | Product Owner, Front Desk Coordinator | Tech Lead, Clinic Owner / Admin       |
| Could    | Role maturity and workflow review      | Tech Lead     | Tech Lead, Backend Engineer           | Product Owner, Front Desk Coordinator |
| Could    | Growth optimization candidate review   | Product Owner | Product Owner, UI/UX Designer         | Tech Lead, Clinic Owner / Admin       |

---

## Coordination Cadence

| Cadence                | Participants                                                   | Purpose                                                            |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| Weekly planning sync   | Product Owner, Tech Lead, UI/UX Designer, Engineers            | Review phase scope, blockers, and requirement traceability         |
| Content approval check | Product Owner, Clinic Owner / Admin                            | Confirm bilingual content, testimonials, and public copy readiness |
| Operations review      | Product Owner, Front Desk Coordinator, Clinic Owner / Admin    | Validate inquiry-handling fit and operational-detail ownership     |
| Launch gate review     | Product Owner, Tech Lead, UI/UX Designer, Clinic Owner / Admin | Approve MVP readiness before moving to implementation sign-off     |

## Escalation Path

- Scope or prioritization conflicts -> Product Owner -> Clinic Owner / Admin
- Security or role-boundary concerns -> Tech Lead -> Product Owner
- Content approval or testimonial disputes -> Clinic Owner / Admin -> Product Owner
- Staff workflow usability concerns -> Front Desk Coordinator -> Product Owner -> Tech Lead

---

## Requirement-Level Ownership

| Requirement ID(s)               | Requirement Summary                                                             | Owner (DRI)            | Reviewer               | Implementer                         | Phase   |
| ------------------------------- | ------------------------------------------------------------------------------- | ---------------------- | ---------------------- | ----------------------------------- | ------- |
| FR-001-01 to FR-001-04          | Public value proposition, trust signals, bilingual content, CTAs                | Product Owner          | Clinic Owner / Admin   | Frontend Engineer, UI/UX Designer   | MVP     |
| NFR-001-01, NFR-001-02          | Plain-language public content and accessibility baseline                        | UI/UX Designer         | Product Owner          | Frontend Engineer                   | MVP     |
| FR-002-01 to FR-002-03          | Minimal-data inquiry/request flow and submission feedback                       | Product Owner          | Tech Lead              | Frontend Engineer, Backend Engineer | MVP     |
| FR-002-04                       | WhatsApp continuation path                                                      | Product Owner          | Front Desk Coordinator | Frontend Engineer                   | Phase 1 |
| NFR-002-01, NFR-002-02          | Anti-spam baseline and low-friction mobile completion                           | Tech Lead              | Product Owner          | Frontend Engineer, Backend Engineer | MVP     |
| FR-003-01, FR-003-02, FR-003-04 | Address, hours, contact details, map, and bilingual operations info             | Clinic Owner / Admin   | Product Owner          | Frontend Engineer                   | MVP     |
| FR-003-03, NFR-003-02           | Social channel exposure and graceful mobile behavior                            | Product Owner          | Clinic Owner / Admin   | Frontend Engineer                   | Phase 1 |
| NFR-003-01                      | Ongoing operational-detail accuracy                                             | Clinic Owner / Admin   | Front Desk Coordinator | Front Desk Coordinator              | MVP     |
| FR-004-01 to FR-004-04          | Content CRUD, testimonial approval, bilingual maintenance, MVP boundary control | Clinic Owner / Admin   | Product Owner          | Backend Engineer, Frontend Engineer | MVP     |
| NFR-004-01, NFR-004-02          | Simple admin workflows and safe testimonial publishing                          | Clinic Owner / Admin   | Product Owner          | Backend Engineer                    | MVP     |
| FR-005-01 to FR-005-03          | Staff inquiry review, operational updates, and manual follow-up                 | Front Desk Coordinator | Product Owner          | Backend Engineer                    | MVP     |
| NFR-005-01, NFR-005-02          | Low-training staff workflows and scoped access                                  | Tech Lead              | Front Desk Coordinator | Backend Engineer                    | MVP     |
| FR-006-01 to FR-006-04          | Two-role access model, admin/staff scope, and secure sign-in                    | Tech Lead              | Product Owner          | Backend Engineer, Frontend Engineer | MVP     |
| NFR-006-01, NFR-006-02          | Consistent role enforcement and safe authentication feedback                    | Tech Lead              | Product Owner          | Backend Engineer, Frontend Engineer | MVP     |
| NFR-X01, NFR-X06                | Cross-cutting privacy and security baseline                                     | Tech Lead              | Product Owner          | Backend Engineer, Frontend Engineer | MVP     |
| NFR-X02, NFR-X03                | Cross-cutting accessibility and bilingual launch quality                        | UI/UX Designer         | Product Owner          | Frontend Engineer                   | MVP     |
| NFR-X04                         | Mobile performance target                                                       | Tech Lead              | Product Owner          | Frontend Engineer                   | Phase 1 |
| NFR-X05                         | Testimonial approval governance                                                 | Clinic Owner / Admin   | Product Owner          | Backend Engineer                    | MVP     |

> **Rule:** No Must-priority requirement should enter active delivery planning without a named DRI and reviewer in this table.

---

## Change Log

| Date       | Version | Change Summary                               | Author        |
| ---------- | ------- | -------------------------------------------- | ------------- |
| 2026-04-17 | 1.0     | Added initial role mapping for planning work | Product Owner |

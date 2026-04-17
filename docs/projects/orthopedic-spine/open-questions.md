# Open Questions

**Purpose:** Capture the highest-impact unresolved decisions affecting scope, patient experience, admin workflows, and launch readiness for Orthopedic Spine.

**Status:** Draft
**Owner:** Product Owner
**Last Updated:** 2026-04-17

---

## Open Questions Register

> Maximum active items in this register: **10**.

| ID | Category | Question | Proposed Answer | Decision | Status | Priority | Due Date | Owner | Dependencies | Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Q-001 | Product Behavior | Should MVP support direct appointment booking or only a contact/request workflow? | Start with inquiry/request flow and validate manual scheduling operations first. | TBD | Open | High | 2026-04-24 | Product Owner | Clinic operations alignment | Kickoff brief |
| Q-002 | Security/Compliance | What patient or health-related information is allowed in contact and appointment forms? | Collect only minimal inquiry data unless explicit compliance guidance expands scope. | TBD | Open | High | 2026-04-24 | Product Owner | Legal/privacy input | Kickoff brief |
| Q-003 | Access Control | Which admin roles are required in MVP: owner only, owner plus staff, or more granular permissions? | Owner plus one scoped staff role may be enough for MVP. | TBD | Open | High | 2026-04-24 | Product Owner | Admin workflow definition | Kickoff brief |
| Q-004 | Scope | How far does the admin panel go in MVP: content management only, or also patient and appointment management? | Prioritize content and inquiry management; defer full operational management unless required. | TBD | Open | High | 2026-04-24 | Product Owner | Q-001, Q-003 | Kickoff brief |
| Q-005 | Product Behavior | What languages must be available at launch, and is content translation manual or system-assisted? | Launch in Spanish and English with manual translation review. | TBD | Open | High | 2026-04-29 | Product Owner | Content readiness | Kickoff brief |
| Q-006 | Documentation/Delivery | What approvals or consent are required before publishing testimonials and patient stories? | Require explicit approval and keep moderation inside admin workflows. | TBD | Open | Medium | 2026-04-29 | Clinic Owner | Legal/privacy input | Kickoff brief |
| Q-007 | Architecture/Technical | Which map/location implementation is preferred for MVP: Google Maps embed, API-based map, or static fallback? | Use low-maintenance embed unless brand or UX needs require something richer. | TBD | Open | Medium | 2026-04-29 | Tech Lead | Third-party integration choice | Kickoff brief |
| Q-008 | Scope | Which social platforms must be integrated at launch, and are they simple outbound links or managed content feeds? | Start with outbound profile links only. | TBD | Open | Medium | 2026-04-29 | Product Owner | Marketing alignment | Kickoff brief |
| Q-009 | Data/Reporting | What analytics and lead attribution data are needed to measure SEO and conversion success? | Capture basic traffic and inquiry conversion reporting first. | TBD | Open | Medium | 2026-05-01 | Product Owner | Analytics setup | Kickoff brief |
| Q-010 | Documentation/Delivery | What accessibility standard and multilingual quality bar are required before launch approval? | Use WCAG 2.2 AA as the target baseline and validate translated critical flows. | TBD | Open | High | 2026-05-01 | Product Owner | UX/content review | Kickoff brief |

---

## Decision Log (Closed Items)

No closed decisions yet.

---

## Propagation Checklist

For each closed question, update impacted docs:

- [ ] [./overview.md](./overview.md)
- [ ] [./user-personas.md](./user-personas.md)

---

## Escalation Rules

- Escalate any High-priority question still open past its due date.
- Escalate questions affecting legal/privacy scope before form, admin, or data decisions are finalized.
- Do not close a question without a confirmed owner and documented rationale.

---

## Change Log

| Date | Version | Change Summary | Author |
| :--- | :--- | :--- | :--- |
| 2026-04-17 | v0.1 | Initial open question register created for kickoff | Copilot |

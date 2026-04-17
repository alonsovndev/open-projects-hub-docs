# Open Questions

**Purpose:** Capture the highest-impact unresolved decisions affecting scope, patient experience, admin workflows, and launch readiness for Orthopedic Spine.

**Status:** Done
**Owner:** Product Owner
**Last Updated:** 2026-04-17

---

## Open Questions Register

> Maximum active items in this register: **10**.

| ID    | Category               | Question                                                                                                          | Proposed Answer                                                                                                                   | Decision                                                                               | Status | Priority | Due Date   | Owner         | Dependencies                   | Source                   |
| :---- | :--------------------- | :---------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :----- | :------- | :--------- | :------------ | :----------------------------- | :----------------------- |
| Q-001 | Product Behavior       | Should MVP support direct appointment booking or only a contact/request workflow?                                 | Use an inquiry/request flow that captures preferred appointment schedule and redirects to a WhatsApp appointment request message. | Inquiry/request flow with WhatsApp redirect approved for MVP.                          | Closed | High     | 2026-04-24 | Product Owner | Clinic operations alignment    | Stakeholder confirmation |
| Q-002 | Security/Compliance    | What patient or health-related information is allowed in contact and appointment forms?                           | Collect only minimal inquiry data unless explicit compliance guidance expands scope.                                              | Minimal inquiry data only for MVP unless compliance guidance expands scope.            | Closed | High     | 2026-04-24 | Product Owner | Legal/privacy input            | Stakeholder confirmation |
| Q-003 | Access Control         | Which admin roles are required in MVP: owner only, owner plus staff, or more granular permissions?                | Use two MVP roles: admin and staff.                                                                                               | Admin and staff roles approved for MVP.                                                | Closed | High     | 2026-04-24 | Product Owner | Admin workflow definition      | Stakeholder confirmation |
| Q-004 | Scope                  | How far does the admin panel go in MVP: content management only, or also patient and appointment management?      | Prioritize content and inquiry management; defer full operational management unless required.                                     | MVP admin scope set to content and inquiry management only; full operations deferred.  | Closed | High     | 2026-04-24 | Product Owner | Q-001, Q-003                   | Stakeholder confirmation |
| Q-005 | Product Behavior       | What languages must be available at launch, and is content translation manual or system-assisted?                 | Launch in Spanish and English with manual translation review.                                                                     | Launch language scope approved as Spanish and English with manual translation review.  | Closed | High     | 2026-04-29 | Product Owner | Content readiness              | Stakeholder confirmation |
| Q-006 | Documentation/Delivery | What approvals or consent are required before publishing testimonials and patient stories?                        | Require explicit approval and keep moderation inside admin workflows.                                                             | Explicit approval required before publishing testimonials and patient stories.         | Closed | Medium   | 2026-04-29 | Clinic Owner  | Legal/privacy input            | Stakeholder confirmation |
| Q-007 | Architecture/Technical | Which map/location implementation is preferred for MVP: Google Maps embed, API-based map, or static fallback?     | Use low-maintenance embed unless brand or UX needs require something richer.                                                      | Low-maintenance map embed approved for MVP baseline.                                   | Closed | Medium   | 2026-04-29 | Tech Lead     | Third-party integration choice | Stakeholder confirmation |
| Q-008 | Scope                  | Which social platforms must be integrated at launch, and are they simple outbound links or managed content feeds? | Integrate outbound profile links for Facebook, Instagram, WhatsApp, and YouTube.                                                  | Outbound links for Facebook, Instagram, WhatsApp, and YouTube approved for MVP.        | Closed | Medium   | 2026-04-29 | Product Owner | Marketing alignment            | Stakeholder confirmation |
| Q-009 | Data/Reporting         | What analytics and lead attribution data are needed to measure SEO and conversion success?                        | Out of scope for MVP. No analytics capture in this release.                                                                       | Analytics and lead attribution deferred out of MVP scope.                              | Closed | Medium   | 2026-05-01 | Product Owner | None for MVP                   | Stakeholder confirmation |
| Q-010 | Documentation/Delivery | What accessibility standard and multilingual quality bar are required before launch approval?                     | Use WCAG 2.2 AA as the target baseline and validate translated critical flows.                                                    | WCAG 2.2 AA baseline and translated critical-flow validation approved for launch gate. | Closed | High     | 2026-05-01 | Product Owner | UX/content review              | Stakeholder confirmation |

---

## Propagation Checklist

For each closed question, update impacted docs:

- [ ] [./overview.md](./overview.md)
- [ ] [./user-personas.md](./user-personas.md)

---

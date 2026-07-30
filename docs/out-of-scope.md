# Out of Scope for MVP

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Purpose

This document explicitly lists features, capabilities, and enhancements that are **intentionally excluded** from the MVP scope. These may be considered for future releases.

---

## Deferred Features

### Collaboration & Communication

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Audit logs and activity history | Complexity vs. MVP value; monitoring can use infrastructure logs | Q-013 |
| Viewer comments or feedback on requirements | Simplifies MVP; Viewer role is strictly read-only | Q-011 |
| Real-time collaboration or live editing | Not critical for discovery/planning phase; async workflow sufficient | — |
| Team-wide access grants or role customization | Single Admin + Viewers sufficient for freelancer use case | Q-012 |
| Subcontractor or external collaborator invitations | Out of scope; focus on Admin ↔ Client relationship | Q-012 |

### Requirements Management

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Requirement versioning or change history | Complex feature; not necessary for MVP | Q-016 |
| Test case generation from user stories | Out of scope; AI generates acceptance criteria only | Q-007 |
| Advanced AI capabilities (edge cases, test scenarios) | MVP focuses on user story + acceptance criteria generation | Q-007 |
| Bulk operations for user stories (delete, archive, reorder) | Single-item operations sufficient for MVP load | — |
| Requirements templates beyond basic user story format | MVP uses standard "As a..., I want..., so that..." template | Q-004 |

### Project Lifecycle

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Delivery and handoff project phases | MVP scope limited to discovery and planning | Q-003 |
| Sprint planning or iteration management | Out of scope; deliverable is backlog, not sprint plan | Q-014 |
| Project phase workflow automation | Manual status changes sufficient for MVP | — |
| Project templates or cloning | Not required for 3-active-project limit | — |

### Account & Access Management

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Viewer self-registration | Invitation-only model enforces Admin control | F-011 Out of Scope |
| Viewer-to-Viewer invitation | Only Admin can invite Viewers | F-011 Out of Scope |
| Admin notification when Viewer accepts invitation | Out of scope; Admin can check status manually | Q-036 |
| Viewer-initiated access requests | Only Admin grants access proactively | Q-037 |
| Viewer limit per project | No hard limit for MVP; performance target in NFR-011-05 | Q-038 |
| Support staff ability to grant additional AI credits | No support credit grants for MVP | Q-034 |

### AI Credits & API Keys

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Remember last-selected AI provider as default | Out of scope; user selects per refinement | Q-031 |
| Periodic API key re-validation and notification | Validation only on save and during use | Q-032 |
| Team-shared API keys | Per-user keys only for MVP | Q-033 |
| Credit purchase or paid plans | MVP is free tier with bring-your-own-key model | — |

### Export & Integrations

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Export formats beyond Markdown (PDF, CSV, JSON) | Markdown sufficient for MVP | Q-015 |
| Integrations with GitHub, Jira, Trello | Deferred to post-MVP | Q-023 |
| Automated backlog sync to external tools | Manual export workflow sufficient | — |

### Reporting & Analytics

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Advanced reporting (velocity, burndown, story metrics) | Out of scope; basic list view sufficient | Q-023 |
| Admin dashboard with usage analytics | Not required for MVP | — |
| AI refinement quality scoring or feedback loops | Out of scope; manual approval workflow only | — |

### Infrastructure & Operations

| Item | Rationale | Traceability |
|------|-----------|--------------|
| Multi-region deployment | Single-region deployment sufficient for MVP | — |
| Advanced monitoring and alerting | Basic infrastructure monitoring sufficient | — |
| Automated backups beyond platform defaults | Supabase/Render defaults sufficient | — |

---

## Community & Documentation

| Item | Rationale | Traceability |
|------|-----------|--------------|
| CONTRIBUTING.md with detailed setup and PR process | Basic contribution guide sufficient for MVP | Q-022 |
| Public roadmap or feature voting | Deferred to post-MVP when user base grows | — |

---

## Revisit Criteria

These out-of-scope items may be reconsidered when:
- MVP has validated core value proposition with real users
- User feedback indicates strong demand for specific capabilities
- Technical debt from MVP has been addressed
- Team capacity allows for expansion beyond core workflows

---

## Change Log

| Date       | Version | Change Summary                           | Author        |
| ---------- | ------- | ---------------------------------------- | ------------- |
| 2026-07-30 | 1.0     | Initial out-of-scope documentation for MVP baseline. | Product Owner |

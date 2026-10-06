---
sidebar_position: 4
---

# Out of Scope for MVP

| Attribute   | Value             |
| ----------- | ----------------- |
| **Project** | Open Projects Hub |
| **Version** | 1.0               |
| **Status**  | Accepted          |
| **Owner**   | Product Owner     |

## Purpose

This document explicitly lists features, capabilities, and enhancements that are **intentionally excluded** from the MVP scope. These may be considered for future releases.

---

## Deferred Features

### Collaboration & Communication

| Item                                               | Rationale                                                            | Traceability |
| -------------------------------------------------- | -------------------------------------------------------------------- | ------------ |
| Audit logs and activity history                    | Complexity vs. MVP value; monitoring can use infrastructure logs     | Q-013        |
| Client comments or feedback on requirements        | Simplifies MVP; the Client Review Portal is strictly read-only       | Q-011        |
| Real-time collaboration or live editing            | Not critical for discovery/planning phase; async workflow sufficient | —            |
| Promoting or demoting a workspace member           | An Admin can add and remove Members, but there is only one assignable role | Q-012        |
| Subcontractor or external collaborator invitations | Out of scope; focus on Admin ↔ Client relationship                   | Q-012        |

### Requirements Management

| Item                                                        | Rationale                                                   | Traceability |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ------------ |
| Requirement versioning or change history                    | Complex feature; not necessary for MVP                      | Q-016        |
| Test case generation from user stories                      | Out of scope; AI generates acceptance criteria only         | Q-007        |
| Advanced AI capabilities (edge cases, test scenarios)       | MVP focuses on user story + acceptance criteria generation  | Q-007        |
| Bulk operations for user stories (delete, archive, reorder) | Single-item operations sufficient for MVP load              | —            |
| Requirements templates beyond basic user story format       | MVP uses standard "As a..., I want..., so that..." template | Q-004        |

### Project Lifecycle

| Item                                    | Rationale                                             | Traceability |
| --------------------------------------- | ----------------------------------------------------- | ------------ |
| Delivery and handoff project phases     | MVP scope limited to discovery and planning           | Q-003        |
| Sprint planning or iteration management | Out of scope; deliverable is backlog, not sprint plan | Q-014        |
| Project phase workflow automation       | Manual status changes sufficient for MVP              | —            |
| Project templates or cloning            | Not required for 3-active-project limit               | —            |

### Account & Access Management

| Item                                                 | Rationale                                               | Traceability       |
| ---------------------------------------------------- | ------------------------------------------------------- | ------------------ |
| Client accounts or per-stakeholder logins            | Clients review through a shared project access code (ADR-020) | F-011 Out of Scope |
| Per-stakeholder revocation or audit of client views  | Revoking means regenerating the project's access code   | ADR-020            |
| Expiring or signed client-review links               | A regenerable access code covers revocation for MVP     | ADR-020            |
| Support staff ability to grant additional AI credits | No support credit grants for MVP                        | Q-034              |

### AI Credits & API Keys

| Item                                            | Rationale                                      | Traceability |
| ----------------------------------------------- | ---------------------------------------------- | ------------ |
| Remember last-selected AI provider as default   | Out of scope; user selects per refinement      | Q-031        |
| Periodic API key re-validation and notification | Validation only on save and during use         | Q-032        |
| Team-shared API keys                            | Per-user keys only for MVP                     | Q-033        |
| Credit purchase or paid plans                   | MVP is free tier with bring-your-own-key model | —            |

### Export & Integrations

| Item                                            | Rationale                         | Traceability |
| ----------------------------------------------- | --------------------------------- | ------------ |
| Export formats beyond Markdown (PDF, CSV, JSON) | Markdown sufficient for MVP       | Q-015        |
| Integrations with GitHub, Jira, Trello          | Deferred to post-MVP              | Q-023        |
| Automated backlog sync to external tools        | Manual export workflow sufficient | —            |

### Reporting & Analytics

| Item                                                   | Rationale                                   | Traceability |
| ------------------------------------------------------ | ------------------------------------------- | ------------ |
| Advanced reporting (velocity, burndown, story metrics) | Out of scope; basic list view sufficient    | Q-023        |
| Admin dashboard with usage analytics                   | Not required for MVP                        | —            |
| AI refinement quality scoring or feedback loops        | Out of scope; manual approval workflow only | —            |

### Infrastructure & Operations

| Item                                       | Rationale                                   | Traceability |
| ------------------------------------------ | ------------------------------------------- | ------------ |
| Multi-region deployment                    | Single-region deployment sufficient for MVP | —            |
| Advanced monitoring and alerting           | Basic infrastructure monitoring sufficient  | —            |
| Automated backups beyond platform defaults | Supabase/Render defaults sufficient         | —            |

---

## Community & Documentation

| Item                                               | Rationale                                   | Traceability |
| -------------------------------------------------- | ------------------------------------------- | ------------ |
| CONTRIBUTING.md with detailed setup and PR process | Basic contribution guide sufficient for MVP | Q-022        |
| Public roadmap or feature voting                   | Deferred to post-MVP when user base grows   | —            |

---

## Revisit Criteria

These out-of-scope items may be reconsidered when:

- MVP has validated core value proposition with real users
- User feedback indicates strong demand for specific capabilities
- Technical debt from MVP has been addressed
- Team capacity allows for expansion beyond core workflows

---

---

**Last Updated**: 2026-09-08

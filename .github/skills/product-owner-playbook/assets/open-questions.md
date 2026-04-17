# Open Questions Template (AI-Ready)

**Purpose:** Capture unresolved decisions that impact scope, workflows, architecture, delivery, and success criteria.

**Status:** [Draft | In Progress | Closed]
**Owner:** [Role/Name]
**Last Updated:** [YYYY-MM-DD]

---

## How to Use (AI Agent Instructions)

- Record only questions that can change requirements, roadmap, architecture, UX, or operations.
- Keep a maximum of 10 open questions in the register at any time.
- Keep only the highest-impact and most relevant unresolved questions; move lower-priority items to backlog notes.
- Keep each question atomic (one decision per row).
- Prefer evidence-based answers; if unknown, keep status as `Open`.
- For each `Closed` item, ensure the decision is reflected in related docs.
- Use IDs sequentially (`Q-001`, `Q-002`, ...).

### Prioritization Rule (Top 10 Only)

Use this order when deciding which questions remain in the active register:

1. Blocks MVP scope or release readiness.
2. Impacts security, privacy, or compliance.
3. Changes functional behavior, role boundaries, or acceptance criteria.
4. Changes architecture, data model, or cross-team dependencies.
5. Impacts UX clarity for primary persona workflows.

If there are more than 10 candidates, keep the top 10 by impact and urgency and defer the rest.

## Status Definitions

- **Open**: Question identified, no decision yet.
- **In Review**: Candidate answer exists, pending confirmation.
- **Blocked**: Depends on external input or unresolved dependency.
- **Closed**: Decision approved and propagated to docs.

---

## Open Questions Register

> Maximum active items in this register: **10** (highest priority only).

| ID    | Category | Question   | Proposed Answer      | Decision                         | Status | Priority | Due Date     | Owner       | Dependencies         | Source                                        |
| :---- | :------- | :--------- | :------------------- | :------------------------------- | :----- | :------- | :----------- | :---------- | :------------------- | :-------------------------------------------- |
| Q-001 | Scope    | [Question] | [Initial hypothesis] | [Final approved answer or `TBD`] | Open   | High     | [YYYY-MM-DD] | [Role/Name] | [None or dependency] | [Discovery, stakeholder interview, ADR, etc.] |
| Q-002 | Product  | [Question] | [Initial hypothesis] | [Final approved answer or `TBD`] | Open   | Medium   | [YYYY-MM-DD] | [Role/Name] | [None or dependency] | [Source]                                      |

---

## Suggested Categories

Use one of the following categories in the register:

- Scope
- Product Behavior
- AI/Automation
- Access Control
- Security/Compliance
- Architecture/Technical
- Data/Reporting
- Documentation/Delivery
- Open Source Governance

---

## Decision Log (Closed Items)

Summarize final decisions for quick scanning.

| ID    | Final Decision | Rationale                        | Approved By | Approved On  |
| :---- | :------------- | :------------------------------- | :---------- | :----------- |
| Q-001 | [Decision]     | [Why this decision was selected] | [Role/Name] | [YYYY-MM-DD] |

---

## Propagation Checklist

For each `Closed` question, update impacted docs:

- [ ] [./overview.md](./overview.md)
- [ ] [./requirements/prd-template-by-feature.md](./requirements/prd-template-by-feature.md)
- [ ] [./planning/phased-roadmap.md](./planning/phased-roadmap.md)
- [ ] [./planning/role-mapping.md](./planning/role-mapping.md)
- [ ] [./work-item-templates/epic-template.md](./work-item-templates/epic-template.md)
- [ ] [./work-item-templates/stories-template.md](./work-item-templates/stories-template.md)

---

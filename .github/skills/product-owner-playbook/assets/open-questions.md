# Open Questions Template (AI-Ready)

**Purpose:** Capture unresolved decisions that impact scope, workflows, architecture, delivery, and success criteria.

**Status:** [Draft | In Progress | Closed]
**Owner:** [Role/Name]
**Last Updated:** [YYYY-MM-DD]

---

## How to Use (AI Agent Instructions)

- Record only questions that can change requirements, roadmap, architecture, UX, or operations.
- Keep each question atomic (one decision per row).
- Prefer evidence-based answers; if unknown, keep status as `Open`.
- For each `Closed` item, ensure the decision is reflected in related docs.
- Use IDs sequentially (`Q-001`, `Q-002`, ...).

## Status Definitions

- **Open**: Question identified, no decision yet.
- **In Review**: Candidate answer exists, pending confirmation.
- **Blocked**: Depends on external input or unresolved dependency.
- **Closed**: Decision approved and propagated to docs.

---

## Open Questions Register

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

## Escalation Rules

- Escalate **High** priority questions that remain `Open` beyond due date.
- Escalate any `Blocked` question affecting MVP scope or release readiness.
- Do not close a question without a clear owner and rationale.

---

## Change Log

| Date         | Version | Change Summary | Author |
| :----------- | :------ | :------------- | :----- |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

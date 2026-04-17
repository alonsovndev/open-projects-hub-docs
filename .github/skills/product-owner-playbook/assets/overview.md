# Project Overview Template (AI-Ready)

Use this file as the canonical project overview template for new projects.

## How to Use (AI Agent Instructions)

- Keep content concise and implementation-ready.
- Replace all placeholders in `[brackets]`.
- If data is unknown, write `TBD` and add an item to `Open Questions`.
- Do not repeat details that already exist in linked docs; summarize and reference.
- Keep scope aligned with MVP constraints.

## Folder Index Map (Canonical)

Use this map as the single source of truth for folder-index references.

- `requirements/`
- `planning/`
- `work-item-templates/`
- `overview.md`
- `open-questions.md`
- `user-personas.md`

---

## 1) Project Snapshot

- **Project Name**: [Name]
- **Tagline**: [One-sentence value statement]
- **Version**: [vX.Y]
- **Status**: [Draft | In Review | Approved]
- **Owner**: [Primary owner]
- **Last Updated**: [YYYY-MM-DD]
- **Target Delivery Window**: [e.g., 4-6 weeks]

## 2) Product Context

### 2.1 Product Type

[Web platform / SaaS / Open source tool / Internal system]

### 2.2 Why This Project Exists

[2-4 bullets describing business/user context]

## 3) Problem Statement

### 3.1 Current Pain Points

- [Pain point 1]
- [Pain point 2]
- [Pain point 3]

### 3.2 Desired Future State

- [Outcome 1]
- [Outcome 2]
- [Outcome 3]

## 4) Target Users and Roles

| Role       | Description    | Core Needs            | Permission Level         |
| ---------- | -------------- | --------------------- | ------------------------ |
| [Admin]    | [Who they are] | [What they need most] | [Full/Partial/Read-only] |
| [Operator] | [Who they are] | [What they need most] | [Scoped]                 |
| [Viewer]   | [Who they are] | [What they need most] | [Read-only]              |

## 5) Goals and Success Metrics

### 5.1 Business Goals

- [Goal 1]
- [Goal 2]

### 5.2 Product/Technical Goals

- [Goal 1]
- [Goal 2]

### 5.3 Success Metrics (Measurable)

| Metric                               | Baseline  | Target   | Timeframe | Owner  |
| ------------------------------------ | --------- | -------- | --------- | ------ |
| [Example: Story generation accuracy] | [Current] | [Target] | [When]    | [Role] |
| [Example: Time-to-spec]              | [Current] | [Target] | [When]    | [Role] |

## 6) MVP Scope

### 6.1 In Scope (Must Have)

- [Feature/capability 1]
- [Feature/capability 2]
- [Feature/capability 3]

### 6.2 Out of Scope (Not in MVP)

- [Deferred item 1]
- [Deferred item 2]
- [Deferred item 3]

### 6.3 Constraints

- **Time**: [Constraint]
- **Team**: [Constraint]
- **Budget/Infra**: [Constraint]
- **Operational Limits**: [e.g., max projects per user]

## 7) Functional Summary

Provide a short capability list (not full requirements).

- [Capability 1]
- [Capability 2]
- [Capability 3]

## 8) Non-Functional Expectations

- **Security**: [e.g., OWASP Top 10, RBAC, secure auth]
- **Quality**: [e.g., testing strategy, minimum coverage]
- **Performance**: [e.g., response time target]
- **Usability**: [e.g., error clarity, form feedback]
- **Observability**: [e.g., logs, tracing, error monitoring]

## 9) Solution Direction

### 9.1 Architecture Approach

[Example: Modular monolith now, migration path later]

### 9.2 Technology Direction

- **Frontend**: [Stack]
- **Backend**: [Stack]
- **Data**: [Database + ORM]
- **Infra/CI-CD**: [Tooling]

### 9.3 Key Design Principles

- [Principle 1]
- [Principle 2]
- [Principle 3]

## 10) Delivery Plan (High Level)

| Phase / Week | Focus                               | Expected Output                 |
| ------------ | ----------------------------------- | ------------------------------- |
| [W1]         | [Discovery + architecture baseline] | [Approved scope + initial docs] |
| [W2]         | [Core backend/auth]                 | [Core flows working]            |
| [W3]         | [Primary domain features]           | [End-to-end MVP flows]          |
| [W4+]        | [Stabilization + hardening]         | [Release-ready MVP]             |

## 11) Risks, Dependencies, and Assumptions

### 11.1 Top Risks and Mitigations

| Risk     | Impact  | Mitigation | Owner  |
| -------- | ------- | ---------- | ------ |
| [Risk 1] | [H/M/L] | [Action]   | [Role] |
| [Risk 2] | [H/M/L] | [Action]   | [Role] |

### 11.2 Dependencies

- [Dependency 1]
- [Dependency 2]

### 11.3 Assumptions

- [Assumption 1]
- [Assumption 2]

## 12) Release Readiness Criteria

- [ ] MVP scope complete
- [ ] Critical security checks passed
- [ ] Minimum quality gates passed
- [ ] Core user flows validated
- [ ] Required documentation published

## 13) Required Linked Artifacts

- [Requirements Template](./requirements/prd-template-by-feature.md)
- [Planning: Phased Roadmap](./planning/phased-roadmap.md)
- [Planning: Role Mapping](./planning/role-mapping.md)
- [Work Item Templates](./work-item-templates/)
- [Open Questions](./open-questions.md)
- [User Personas](./user-personas.md)

## 14) Open Questions

- [Question 1]
- [Question 2]
- [Question 3]

## 15) Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

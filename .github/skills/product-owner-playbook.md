# Unified Product Owner Playbook

Use this playbook for the unified `product-owner` role. It absorbs former business-analyst responsibilities.

## Mission

Turn stakeholder goals into clear, prioritized, implementation-ready documentation.

## Scope

- Stakeholder discovery and clarification
- Functional and non-functional requirements capture
- Requirement traceability and dependency tracking
- User story creation and acceptance criteria
- Prioritization, roadmap framing, and planning artifacts

## Workflow

### 1. Discover

- Ask targeted questions in small batches.
- Understand context, pain points, desired outcomes, constraints, and priorities.
- Quantify vague language such as "fast", "secure", or "simple".

### 2. Structure

- Separate functional requirements from non-functional requirements.
- Capture assumptions, risks, dependencies, and open questions.
- Align with existing architecture and planning docs before introducing new constraints.

### 3. Prioritize

- Use `MoSCoW` by default.
- Use `RICE` when ranking multiple competing items.
- Call out blockers, sequencing, and cross-role dependencies.

### 4. Deliver

- Draft concise, implementation-ready Markdown.
- Keep outputs traceable to source context and supporting docs.
- End user stories with a mandatory `## Reference` section.

## Required Output Types

### Stakeholder Discovery Summary

```markdown
# Discovery Summary: [Topic]

## Context
- [Current workflow or situation]

## Pain Points
- [Pain point]

## Desired Outcomes
- [Outcome]

## Constraints
- [Constraint]

## Open Questions
- [Question]
```

### Requirements Document

```markdown
# Requirements Document: [Feature Name]

## Executive Summary
[Brief overview]

## Functional Requirements
| ID | Requirement | Priority | Acceptance Criteria |
| -- | ----------- | -------- | ------------------- |
| FR-001 | [Statement] | [MoSCoW] | [Criteria] |

## Non-Functional Requirements
| ID | Requirement | Metric | Target |
| -- | ----------- | ------ | ------ |
| NFR-001 | [Statement] | [Measure] | [Value] |

## Risks & Dependencies
- **Risk:** [Description] -> **Mitigation:** [Action]
```

### User Story

```markdown
**Story ID**: US-[Phase]-[Epic]-[Number]
**Epic**: [Epic Name]
**Priority**: [Must Have | Should Have | Could Have | Won't Have]
**Effort Estimate**: [Story Points: 1, 2, 3, 5, 8, 13]

**As a** [user type/role],
**I want to** [action/goal/feature],
**So that** [benefit/value/outcome].

**Acceptance Criteria (BDD Format)**:
- [ ] Given [context], When [action], Then [expected outcome]
- [ ] Include edge cases, validation rules, and error scenarios where relevant.

**Technical Considerations**:
- Clean Architecture layers impacted
- Security/performance constraints

## Reference
- [Architecture Diagram](path/to/diagram)
- [API Contract](path/to/api)
- [Use Case Document](path/to/use-case)

---
```

## Operating Rules

- Check `prd.md`, `v1.md`, and relevant docs in `docs/` before drafting new planning artifacts.
- Keep discovery and planning collaborative, but avoid long questionnaires.
- Do not create separate business-analyst outputs; integrate discovery directly into `product-owner` deliverables.
- In this repository, write documentation only.

---
name: product-owner-playbook
description: "Use when handling product-owner work such as discovery, requirements, prioritization, PRDs, roadmaps, and implementation-ready user stories."
---

# Product Owner Playbook

Use this playbook for the unified `product-owner` role.

## Mission

Turn stakeholder goals into clear, prioritized, implementation-ready documentation.

## Output Policy Alignment

- Apply output verbosity and token policy from `AGENTS.md` Section 5; do not redefine token limits here.
- Keep this skill focused on role workflow and avoid redefining separate token limits.

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

### Work Item Templates (06-work-items)

For epic work-item creation, use the templates below as the source format:

- Epic template: `assets/work-item-templates/epic-template.md`
- Stories template: `assets/work-item-templates/stories-template.md`
- PRD template: `assets/work-item-templates/prd-template-by-feature.md`

When generating work items under `docs/projects/{project}/06-work-items/EPIC-*/`:

- Keep the same heading and section order as the templates.
- Keep story IDs and epic links consistent with the epic key.
- Keep acceptance criteria in checklist BDD style.
- Remove empty role sections if no stories are needed for that role.
- Do not omit required metadata fields in epic and story headers.

For PRD drafting from requirements files under `docs/projects/{project}/01-requirements/`:

- Use `assets/work-item-templates/prd-template-by-feature.md` as the baseline structure.
- Consolidate FR/NFR rows from the selected feature requirement files.
- Preserve requirement IDs and source feature IDs exactly as written.
- Include measurable success criteria and a traceability matrix to epics/stories.
- Carry unresolved requirement questions into the PRD `Open Questions` section.

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

| ID     | Requirement | Priority | Acceptance Criteria |
| ------ | ----------- | -------- | ------------------- |
| FR-001 | [Statement] | [MoSCoW] | [Criteria]          |

## Non-Functional Requirements

| ID      | Requirement | Metric    | Target  |
| ------- | ----------- | --------- | ------- |
| NFR-001 | [Statement] | [Measure] | [Value] |

## Risks & Dependencies

- **Risk:** [Description] -> **Mitigation:** [Action]
```

## Operating Rules

- Check relevant docs in `docs/` before drafting new planning artifacts.
- Keep discovery and planning collaborative, but avoid long questionnaires.
- Do not create separate planning-role outputs; integrate discovery directly into `product-owner` deliverables.
- In this repository, write documentation only.

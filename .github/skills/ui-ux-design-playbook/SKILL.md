---
name: ui-ux-design-playbook
description: "Use when creating wireframes, user flows, design specifications, component definitions, accessibility guidance, or prototype-ready UI documentation for the repository."
---

# UI/UX Design Playbook

Use this playbook for the canonical `ui-ux-designer` role.

## Mission

Translate product requirements into clear design documentation, flows, prototypes, and developer-ready UI specifications.

## Output Policy Alignment

- Apply output verbosity and token policy from `AGENTS.md` Section 5; do not redefine token limits here.
- Keep this skill focused on role workflow and avoid redefining separate token limits.

## Scope

- User flows and information architecture
- Wireframes and prototype planning
- Component-level specifications
- Accessibility and responsive behavior guidance
- Design-system notes and handoff documentation

## Workflow

### 1. Anchor On Product Context

- Read the relevant PRD, requirements, user stories, and personas first.
- Confirm the primary user, primary task, and critical states.

### 2. Design The Flow Before The Surface

- Define entry points, key actions, states, and outcomes.
- Capture empty, loading, error, and success states before styling details.

### 3. Specify For Handoff

- Name layout regions, components, variants, and interactions clearly.
- Include accessibility, responsiveness, and content guidance.
- Prefer structured specs over vague aesthetic language.

## Expected Deliverables

- User-flow documentation
- Wireframe briefs
- Prototype briefs
- UI specs and component behavior notes
- Accessibility review notes

## Skill Asset References

Use these skill-local assets as canonical starting points for UI/UX documentation:

- Design direction template: `assets/design-direction.md`
- Prototype brief template: `assets/prototype-brief.md`
- Stitch prompt template: `assets/stitch-prompt.md`

When a task depends on feature-level requirement scope and traceability, align UX scope with:

- `../product-owner-playbook/assets/requirements/prd-template-by-feature.md`

When a task depends on architecture constraints, align UX decisions with:

- `../technical-design-playbook/assets/architecture/architecture-solution-design.md`

## Required Checklist

- [ ] Persona and user goal are explicit
- [ ] Key states are documented
- [ ] Layout behavior is responsive
- [ ] Accessibility constraints are included
- [ ] Handoff notes are specific enough for implementation

<!-- AI AGENT INSTRUCTIONS
Purpose: Provide a reusable Stitch prompt template for [Project Name].
Replace placeholders with project-specific workflow, roles, and states before using in Stitch.
Do not add out-of-scope features not present in project requirements.
-->

# Stitch Prompt: [Project Name]

## Purpose

Use this file to generate a consistent clickable prototype in Stitch that aligns with project requirements and prototype brief.

## Scope Guardrails

The prototype must not introduce:

- Undocumented workflows outside MVP scope
- Extra roles beyond documented role mapping
- Collaboration, audit, delivery, billing, or operational features unless explicitly required
- Complex navigation shells not defined in source docs

## Consolidated Stitch Prompt (Copy & Paste)

```markdown
Generate a clickable responsive stakeholder prototype for **[Project Name]**.

## Objective

[Describe the core workflow goal in 2-3 lines.]

## Product Scope

- Roles: [Role A], [Role B]
- MVP boundaries: [describe approved boundaries]
- Primary flow: [core end-to-end flow]
- Secondary flow: [read-only/review/approval flow]

## Design System Direction

- Use [UI system, e.g., Ant Design-style components].
- Keep layout content-first and accessible.
- Ensure visible status labels and role clarity.

## Required Pages

1. **[Entry Screen]**
   - [required section]
   - [required section]

2. **[Primary Workflow Screen]**
   - [required section]
   - [required section]
   - Required states: empty, loading, error, success

3. **[Review/Backlog Screen]**
   - [required section]
   - [required section]

4. **[Read-Only/Stakeholder Screen]**
   - [required section]
   - Explicit omissions: [no edit controls / no internal notes / etc.]

## Interaction Expectations

- [interaction rule 1]
- [interaction rule 2]
- [interaction rule 3]

## Responsive Behavior

- Desktop (1200px+): [behavior]
- Tablet (768px-1199px): [behavior]
- Mobile (<768px): [behavior]

## Accessibility Requirements

- Keyboard-accessible actions and dialogs
- Visible focus states
- Explicit labels for inputs and controls
- Do not rely on color alone for status communication

## Sample Content Guidance

- Use realistic placeholder data
- Keep terminology aligned with source requirements
- Keep copy concise and stakeholder-readable
```

## Supporting References

- [Prototype Brief](./prototype-brief.md)
- [Design Direction](./design-direction.md)
- [Project Requirements by Feature](../01-requirements/project-requirements-by-feature.md)
- [Role Mapping](../02-planning/role-mapping.md)
- [UI/UX Designer User Stories](../04-user-stories/ui-ux-designer-stories.md)

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

---
name: stitch-prototype-prompting
description: "Use when crafting Stitch prompts for low or high fidelity prototypes, structured UI explorations, or design handoff prompts aligned with Ant Design and reusable design tokens."
---

# Stitch Prototype Prompting

Craft detailed and effective prompts to generate high-quality prototypes using Stitch. A well-structured prompt is crucial for ensuring the AI understands the context, requirements, and desired output.

## Prompting Principles

- **Be Specific and Explicit**: Clearly describe the layout, components, and interactions. Avoid ambiguity.
- **Provide Context**: Explain the user's goal and the screen's purpose.
- **Reference the Design System**: Use existing design tokens and component names when they are available.
- **Define Interactions**: Detail what happens on user actions like clicks, hover, and form submissions.
- **Specify States**: Include default, loading, error, empty, and success states.
- **Set Responsive Expectations**: Define breakpoints and how the layout should adapt.
- **Iterate and Refine**: Start broad, then refine with more detail based on the first output.

## Prompt Template

```markdown
Generate a Stitch prototype for a [Screen Name] screen.

**Persona**: [Target user]

**User Story**: As a [Persona], I want to [Action] so that I can [Goal].

**Layout**:

- [Describe the overall structure]
- [Specify responsive behavior]

**Components**:

- **Header**: [Title, navigation, or status area]
- **Main Content**: [Cards, forms, tables, content blocks]
- **Actions**:
  - Primary action: [Label and intent]
  - Secondary action: [Label and intent]

**Styling**:

- Use the project's documented design tokens when available.
- Define spacing, typography emphasis, borders, and elevation.

**States**:

- **Default**: [Initial state]
- **Loading**: [Behavior while processing]
- **Error**: [Error presentation]
- **Success**: [Feedback on completion]
- **Empty**: [No-data or first-run state]

**Interactions**:

- [Describe key interactions step by step]

**Accessibility**:

- Keyboard accessibility requirements
- Labeling requirements
- Minimum touch target guidance
```

## Output Quality Checklist

- [ ] Persona and story are clearly defined
- [ ] Layout sections and components are named and described
- [ ] Relevant states are covered
- [ ] Interactions are described step by step
- [ ] Responsive behavior is specified
- [ ] Accessibility expectations are included
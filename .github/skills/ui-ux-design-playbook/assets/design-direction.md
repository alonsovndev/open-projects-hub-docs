<!-- AI AGENT INSTRUCTIONS
Purpose: Define design direction for [Project Name] prototype work.
Replace [placeholder] blocks with concrete design choices while preserving accessibility and scope guardrails.
Keep language implementation-ready for design handoff.
-->

# Design Direction Snapshot: [Project Name]

## Design Intent

[Describe desired experience quality in 2-4 lines: clarity, trust, speed, accessibility, etc.]

## Product Language and Scope Rules

- Use documented product terms only.
- Keep flows inside approved MVP scope.
- Do not introduce undocumented workflows or roles.

## Visual Direction Rules

### Overall Direction

- **Content-first:** prioritize readability over decoration.
- **Low-friction:** emphasize obvious primary actions.
- **Role clarity:** make permission boundaries clear.

### Layout Guidance

- [Desktop behavior]
- [Tablet behavior]
- [Mobile behavior]

## Color Strategy

| Token category | Purpose                    | Constraint                         |
| -------------- | -------------------------- | ---------------------------------- |
| Primary        | Main actions               | Use only for high-priority actions |
| Neutral        | Layout/text                | Keep interface calm and readable   |
| Success        | Positive completion states | Pair with visible text labels      |
| Warning        | Caution/ambiguity states   | Never rely on color alone          |
| Error          | Validation/failure states  | Use for blocking and inline errors |

## Typography Strategy

- **Page title:** [usage]
- **Section title:** [usage]
- **Body text:** [usage]
- **Secondary text:** [usage]

## Component Inventory

| Component               | Purpose            | Required states                          |
| ----------------------- | ------------------ | ---------------------------------------- |
| Header/summary bar      | Context and status | Default                                  |
| Text input area         | User input         | Default, focus, disabled, error          |
| Primary action button   | Main action        | Default, hover, focus, disabled, loading |
| Secondary action button | Secondary actions  | Default, hover, focus, disabled          |
| Card/list item          | Content display    | Default, hover, focus-within             |
| Badge/tag               | Status visibility  | Default                                  |
| Alert                   | User feedback      | Error, warning, success                  |
| Empty state             | No data            | Empty                                    |
| Loading indicator       | Processing state   | Loading                                  |

## Interaction Expectations

- [Interaction rule 1]
- [Interaction rule 2]
- [Interaction rule 3]

## Responsive Behavior

- **Desktop (1200px+)**: [behavior]
- **Tablet (768px-1199px)**: [behavior]
- **Mobile (<768px)**: [behavior]

## Accessibility Notes

- WCAG 2.1 AA baseline.
- Keyboard accessibility for all primary actions.
- Visible focus states and semantic heading structure.
- Do not rely on color alone for state communication.

## Prototype Constraints

- Prototype is for stakeholder validation, not production implementation.
- Use placeholders for copy unless explicit content is provided.
- Keep updates lightweight and easy to maintain.

## Traceability

| Design Area       | Requirement / Story Link |
| ----------------- | ------------------------ |
| [Primary flow]    | [FR-XXX, US-XXX]         |
| [Role visibility] | [FR-XXX, NFR-XXX]        |
| [Accessibility]   | [NFR-XXX, US-XXX]        |

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

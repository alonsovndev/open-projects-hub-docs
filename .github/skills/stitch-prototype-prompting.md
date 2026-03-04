---
name: stitch-prototype-prompting
description: Skill for crafting detailed and effective prompts to generate high-quality UI prototypes using Stitch. Ensures outputs are aligned with the project's design system, Ant Design components, and SCSS design tokens.
---

# Skill: Stitch Prototype Prompting

Craft detailed and effective prompts to generate high-quality prototypes using Stitch. A well-structured prompt is crucial for ensuring the AI understands the context, requirements, and desired output.

## Prompting Principles

- **Be Specific and Explicit**: Clearly describe the layout, components, and interactions. Avoid ambiguity.
- **Provide Context**: Explain the user's goal and the screen's purpose.
- **Reference the Design System**: Use existing design tokens (e.g., `$color-primary`, `$spacing-4`) and component names from Ant Design.
- **Define Interactions**: Detail what happens on user actions like clicks, hover, and form submissions.
- **Specify States**: Include default, loading, error, empty, and success states.
- **Set Responsive Expectations**: Define breakpoints and how the layout should adapt.
- **Iterate and Refine**: Start with a broad prompt and refine it with more details based on the output.

## Prompt Template

Copy and fill in the following template when generating a Stitch prototype:

```markdown
Generate a Stitch prototype for a [Screen Name] screen.

**Persona**: [Target user, e.g., "Admin User," "Freelancer," "New Customer"]

**User Story**: As a [Persona], I want to [Action] so that I can [Goal].

**Layout**:

- [Describe the overall structure, e.g., "A two-column layout with a sidebar on the left."]
- [Specify responsive behavior, e.g., "The layout should stack into a single column on mobile (<768px)."]

**Components**:

- **Header**: Use a `PageHeader` from Ant Design with the title "[Title]".
- **[Section Name]**: [Describe the section and content, e.g., "A stats summary row with 3 `Statistic` cards."]
- **Form** (if applicable): Include the following fields using Ant Design components:
  - `Input` for "[Field Label]"
  - `Select` with options "[Option 1], [Option 2]"
  - `DatePicker` for "[Field Label]"
  - `Checkbox` for "[Label]"
- **Actions**:
  - A `Button` with `type="primary"` labeled "[Primary Action]".
  - A `Button` labeled "[Secondary Action]".

**Styling**:

- Primary action button uses `$color-primary`.
- Apply `$spacing-4` (16px) padding inside cards and form containers.
- Use `$font-size-lg` for section headings, `$font-size-base` for body text.
- Wrap content sections inside `Card` components with `$shadow-base`.
- Border radius on cards and inputs: `$radius-base`.

**States**:

- **Default**: [Describe the initial view]
- **Loading**: [e.g., "Show a spinner on the submit button and disable the form."]
- **Error**: [e.g., "Display inline validation messages below each invalid field."]
- **Success**: [e.g., "Show an Ant Design `notification` with a success message."]
- **Empty**: [e.g., "Show an Ant Design `Empty` component with the message '[No data message]'."]

**Interactions**:

- [Describe the key interactions, e.g., "Clicking '[Action]' triggers a loading state and calls the API."]
- [e.g., "Hovering over a table row highlights it with `$color-gray-100`."]
- [e.g., "Clicking 'Cancel' discards changes and navigates back to the previous screen."]

**Accessibility**:

- All interactive elements must be keyboard accessible.
- Form fields must have explicit `<label>` elements.
- Minimum touch target size: 44x44px.
```

## Example Prompt

```markdown
Generate a Stitch prototype for a user profile settings page.

**Persona**: Registered User (Freelancer)

**User Story**: As a registered user, I want to update my profile information so that my details are current and visible to potential clients.

**Layout**:

- A single-column layout centered on the page with a max-width of 800px.
- A `PageHeader` with the title "Profile Settings" at the top.
- Below the header, a `Card` component wrapping the settings form.

**Components**:

- **Form** with the following fields:
  - `Input` for "Email" (read-only, prefilled).
  - `Input` for "Username".
  - `Input.TextArea` for "Bio" with a 200-character limit.
  - `Upload` component with an avatar preview for "Profile Photo".
- **Actions**:
  - A `Button` with `type="primary"` labeled "Save Changes".
  - A `Button` labeled "Cancel".

**Styling**:

- The `Card` uses `$shadow-base` and `$radius-lg`.
- Apply `$spacing-6` (24px) padding inside the card.
- "Save Changes" button uses `$color-primary`.

**States**:

- **Default**: The form is pre-filled with existing user data. "Save Changes" is disabled.
- **Dirty**: "Save Changes" becomes enabled when any field is modified.
- **Loading**: "Save Changes" shows a spinner and the form is disabled.
- **Success**: Show an Ant Design `notification` with "Profile updated successfully."
- **Error**: Show an inline `Alert` with `type="error"` above the form.

**Interactions**:

- The "Save Changes" button is disabled by default.
- It becomes enabled only when any field value changes from its initial state.
- Clicking "Cancel" resets the form to its pre-filled state and disables "Save Changes".

**Accessibility**:

- All form fields must have explicit labels.
- The "Profile Photo" upload area must have an `aria-label`.
```

## Output Quality Checklist

Before submitting a Stitch prompt, verify:

- [ ] User persona and story are clearly defined
- [ ] All layout sections and components are named and described
- [ ] Ant Design components are referenced by name
- [ ] Design tokens are used for all styling values
- [ ] All relevant states (default, loading, error, success, empty) are defined
- [ ] Key interactions are described step-by-step
- [ ] Responsive behavior is specified
- [ ] Accessibility requirements are included

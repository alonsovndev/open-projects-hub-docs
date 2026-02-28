# Design Direction (MVP)

## Brand Adjectives
- Professional
- Clear
- Trustworthy
- Practical
- Calm

## Visual Direction Rules
- Use Ant Design components as the base; customize with SCSS Modules only.
- Prioritize scannable layouts: strong headings, short labels, consistent spacing.
- Keep interaction model explicit: one primary CTA per section.
- Surface AI ambiguity highlights inline near source text.
- Separate draft vs approved artifacts visually and with labels.
- Keep Viewer screens simpler than Admin screens (fewer controls, same language).

## Color Strategy Constraints
- Use semantic tokens (primary, success, warning, error, neutral); avoid hardcoded one-off colors.
- Reserve high-emphasis color for primary actions (run refinement, explicit approval, markdown export).
- Use a distinct highlight treatment for ambiguity highlights that remains readable in light backgrounds.
- Maintain minimum contrast: 4.5:1 text, 3:1 UI boundaries/focus indicators.
- Never use color alone; pair status with text/icon labels.

## Typography Strategy Constraints
- Use one system sans-serif stack for all MVP screens.
- Keep a limited type scale (e.g., page title, section title, body, helper text).
- Prefer plain-language labels and short sentence case headings for Viewer readability.
- Preserve consistent line length and spacing in user story cards for scanning.
- Keep acceptance criteria text style visually subordinate but fully readable.

## Component Inventory and Required Interaction States

| Component | Usage | Required States |
| --- | --- | --- |
| Button (primary/secondary) | Main actions (Refine, Approve, Export) | default, hover, focus-visible, active, disabled, loading |
| Text Area / Input | Raw notes and bullet-list input | default, focus, error, disabled, filled |
| Highlighted Text Block | Ambiguity highlights inline | default, highlighted, focused highlight, resolved |
| Story Card | Generated/approved user stories | draft, editing, approved, error |
| Tabs/Segmented Control | Draft vs approved backlog views | default, selected, focus-visible, disabled |
| Badge/Tag | Role and phase (Admin/Viewer, discovery/planning) | default, informational, warning |
| Tooltip / Onboarding Hint | Minimal onboarding guidance | hidden, visible, focus-triggered, dismissed |
| Export Confirmation | Markdown export feedback | idle, processing, success, error |

## Accessibility Notes (WCAG 2.1 AA)
- All interactive controls must be keyboard reachable with visible focus indicators.
- Ambiguity highlights and status tags must include text equivalents (not color-only meaning).
- Use semantic page structure (`main`, headings, lists) for backlog readability.
- Announce async updates (refinement loading, approval success, export success/error) via ARIA live regions.
- Ensure minimum touch targets of 44x44px on mobile.

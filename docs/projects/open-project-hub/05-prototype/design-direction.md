# Design Direction Snapshot: MVP Prototype

## Design Intent

Create a prototype direction that feels **professional**, **clear**, **structured**, **accessible**, and **trustworthy** while staying lightweight enough for rapid iteration.

The interface should feel like a planning workspace, not a delivery tool. It should help stakeholders understand how requirements move from raw notes to approved backlog content with minimal friction.

## Product Language and Scope Rules

- Use the documented terms: **Discovery**, **Planning**, **Admin**, **Viewer**, **user stories**, **acceptance criteria**, and **internal notes**.
- Keep the prototype focused on planning workflows only.
- Treat AI output as draft content until explicit Admin approval.
- Show Viewer screens as readable and read-only.
- Do not introduce delivery, sprint, handoff, collaboration, or comment workflows.

## Visual Direction Rules

### Overall Direction

- **Content-first**: prioritize story readability over decorative UI.
- **Low-friction**: use familiar web patterns and obvious primary actions.
- **Structured hierarchy**: story title first, user story body second, acceptance criteria third, status metadata last.
- **Moderate density**: enough information for review without overwhelming non-technical stakeholders.
- **Role clarity**: Admin controls and Viewer restrictions should be obvious at a glance.

### Layout Guidance

- Desktop-first review layout with preserved hierarchy on tablet and mobile.
- Use card-based sections or simple stacked panels for refinement and backlog content.
- Keep project context pinned near the top of each page.
- Make draft vs approved distinctions visible through labels, tags, and section grouping.

## Color Strategy

No official brand palette is documented, so the prototype should use constrained placeholder rules instead of open-ended styling.

| Token category | Purpose | Constraint |
| --- | --- | --- |
| Primary | Main actions and emphasis | Use for refine, approve, and export actions only |
| Neutral | Layout, text, backgrounds, borders | Keep the interface calm and readable |
| Success | Approved state | Use with a visible text label such as "Approved" |
| Warning | Ambiguity highlights and caution states | Pair with iconography or text, not color alone |
| Error | Validation or processing failure | Use for inline errors and blocking alerts |

## Typography Strategy

No documented brand type system exists, so use a constrained, highly readable system-sans approach aligned to Ant Design defaults.

- **Page title**: clear, prominent, reserved for project/workspace context
- **Section title**: used for major areas such as Raw Notes, Draft Stories, Approved Backlog
- **Card title**: used for user story titles
- **Body text**: used for "As a / I want / so that" and acceptance criteria
- **Secondary text**: used for help copy, phase labels, and internal-note labels

Typography should support non-technical readability and avoid dense, low-contrast microcopy.

## Component Inventory

Use Ant Design-style components as the baseline for the prototype.

| Component | Purpose | Required states |
| --- | --- | --- |
| Page header / summary bar | Show project name, client, phase, role | Default |
| `Input.TextArea` | Accept raw notes and bullet lists | Default, focus, disabled, error |
| Primary button | Refine notes, approve content, export Markdown | Default, hover, focus, disabled, loading |
| Secondary button | Cancel, clear, skip onboarding | Default, hover, focus, disabled |
| Story card | Display draft or approved user story content | Default, hover, focus-within |
| Tag / badge | Show Discovery, Planning, Draft, Approved, Read-only | Default |
| Tooltip / popover | Explain ambiguity highlights or onboarding guidance | Default, focus, dismissible |
| Modal / confirmation dialog | Confirm explicit approval | Open, focus trap, dismissible |
| Alert | Validation and error messaging | Error, warning, success |
| Empty state | Show no-content scenarios | Empty |
| Spinner / loading indicator | Show processing states | Loading |

## Interaction Expectations

- Ambiguity must appear **inline** with the raw notes context.
- Approval must feel intentional and separate from generation.
- Viewer pages must show the same planning context without edit controls.
- Internal notes must be clearly separated in Admin views and fully absent in Viewer views.
- Optional onboarding should explain note entry, ambiguity review, editing, and approval in plain language.

## Responsive Behavior

- **Desktop (1200px+)**: primary review layout with visible sections and supporting metadata.
- **Tablet (768px-1199px)**: stack secondary panels below the main workflow while preserving section order.
- **Mobile (<768px)**: single-column layout with full-width actions, visible section labels, and no loss of role/status context.
- Maintain readable spacing and touch targets of at least 44x44px.

## Accessibility Notes

- Follow **WCAG 2.1 AA** baseline expectations.
- Keep all primary actions keyboard accessible.
- Provide visible focus indicators with sufficient contrast.
- Use semantic headings and explicit labels for inputs and controls.
- Do not rely on color alone for ambiguity, approval, or error states.
- Ensure onboarding tooltips and approval dialogs are dismissible via keyboard.
- Keep Viewer-facing content easy to read for non-technical stakeholders.

## Prototype Constraints

- This is a stakeholder prototype, not a production UI specification.
- Prefer reusable placeholders over final client-facing copy.
- Keep the document easy to update in under 30 minutes by avoiding unnecessary design-system depth.
- Stay within the documented architecture and requirements language.

## Traceability

- Refinement workflow: `FR-004` to `FR-007`, `US-MVP-UX-001`
- Backlog visibility and export: `FR-011`, `FR-012`, `US-MVP-UX-002`
- Role boundaries and internal-note isolation: `FR-008`, `FR-010`, `FR-014`, `NFR-004`
- Accessibility baseline: `NFR-007`, `US-P1-UX-003`
- Prototype package expectation: `US-P1-UX-004`

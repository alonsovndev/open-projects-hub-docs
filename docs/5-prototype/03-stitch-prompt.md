# Stitch Prompt (MVP Prototype)

## COPY/PASTE INTO STITCH

Design a concise MVP prototype for **Open Freelancer Project Hub** focused only on **discovery/planning** workflows.

### 1) Navigation Model and Page List
- Role-based app with two roles: **Admin** and **Viewer**.
- Global navigation model:
  - Dashboard
  - Project Workspace (Admin)
  - Backlog (Admin)
  - Backlog (Viewer)
  - Export (Admin)
- Navigation behavior rules:
  - Admin has full CRUD for refinement/backlog and can run **markdown export**.
  - Viewer is strictly read-only and can only view approved requirements and phase status.
  - Show blocked-state guidance when Admin hits 3 active-project limit (prompt to archive one project).

### 2) Page Layouts and Sections
Create these pages with clear section labels:

1. **Dashboard**
   - Header: product name, role tag, sign-out
   - Projects section: project cards list, phase badge (discovery/planning), create project CTA
   - Constraint message area: active-project-limit warning

2. **Project Workspace (Admin)**
   - Project metadata strip: `project_name`, `client_name`, `phase`
   - AI refinement input panel: raw notes / bullet list input
   - Inline ambiguity highlights area tied to input text
   - Generated stories panel with editable story cards
   - Internal notes panel (Admin-only)
   - Primary CTA: `approve_stories`

3. **Backlog (Admin)**
   - Draft tab and Approved tab
   - Story card template: title, "As a... I want... so that...", acceptance criteria
   - Controls: edit, approve, reject/revise

4. **Backlog (Viewer)**
   - Approved stories only (no edit controls)
   - Discovery/planning status summary
   - Readability-first structure for non-technical users

5. **Export (Admin)**
   - Export scope summary (approved stories only)
   - `export_markdown` primary action
   - Export result message (success/error)

### 3) Required Component States
For all relevant components, show:
- default
- hover
- focus-visible
- active (where applicable)
- disabled
- loading (for AI refinement and export)
- error
- success confirmation

### 4) Responsive Behavior
- Desktop: >=1200px, multi-panel layout for Admin workspace.
- Tablet: 768-1199px, two-column layout where possible.
- Mobile: <768px, stacked single-column layout.
- Keep primary actions visible without horizontal scrolling.
- Minimum touch target size: 44x44px.

### 5) Accessibility Constraints
- Meet WCAG 2.1 AA contrast targets (4.5:1 text, 3:1 UI boundaries/focus).
- Keyboard-only operation for all interactive controls.
- Visible focus indicators on every actionable element.
- No color-only status communication; pair with icon/text labels.
- Use ARIA live-region notes for loading/success/error states.

### 6) Content Placeholders (Use Exactly These Field Names)
Use realistic placeholder values:
- `project_name`: "Client Portal Refresh"
- `client_name`: "Jordan Lee"
- `phase`: "Discovery"
- `raw_notes_input`: "Need client login, dashboard summary, and simple reporting."
- `ambiguity_highlight_1`: "simple reporting"
- `story_title_1`: "View project dashboard"
- `story_body_1`: "As a Viewer, I want to see approved requirements, so that I understand what will be delivered."
- `acceptance_criteria_1`: "Given I open the backlog, when stories are approved, then I can read them in a structured list."
- `internal_notes`: "Admin-only: clarify metrics scope before planning sign-off."
- `export_filename`: "client-portal-refresh-requirements.md"

## Assumptions & Open Questions
- Assume authentication exists; prototype starts post-login.
- Confirm whether Viewer should access dashboard cards or only direct project links.
- Confirm whether ambiguity highlights need severity levels in MVP.
- Confirm if export needs in-app preview before markdown download.
- Confirm whether onboarding tooltip appears only once or is user-resettable.

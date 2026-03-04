# Stitch Prompt (MVP Prototype)

> **Status:** Ready to use
> **Last Updated:** 2026-03-03
> **Scope:** MVP — discovery/planning phases only. No delivery, handoff, or billing flows.
> **Stitch Project Link:** [Add your Stitch project link here]

---

## How to Use This File

1. For a full 5-page prototype in one pass, copy the block under **Section 1 — Full Prompt** and paste it into Stitch.
2. For individual page iteration or refinement, copy the relevant **Per-Page Prompt** from Section 2.
3. Do not modify field names in the Content Placeholders — they map directly to API contract field names.

---

## Section 1 — Full Prompt (Copy/Paste Into Stitch)

```
Generate a multi-page MVP prototype for "Open Freelancer Project Hub" — a web app for freelancers to manage client projects and AI-refine requirements. Scope is strictly discovery/planning phases only.

---

PERSONA A — Admin (Alex Rivera, Freelancer)
Goal: Paste raw project notes → run AI refinement → review ambiguity highlights → approve structured user stories → export as Markdown.

PERSONA B — Viewer (Jordan Lee, Client)
Goal: Read approved requirements and project phase status. Strictly read-only with no edit controls visible.

---

GLOBAL DESIGN RULES
- UI library: Ant Design components only.
- Color strategy: semantic tokens only — primary (blue), success (green), warning (amber), error (red), neutral (gray). No one-off colors.
- Typography: single system sans-serif stack. Scale: page-title (24px), section-title (16px semi-bold), body (14px), helper (12px).
- Spacing unit: 8px base grid. Apply 24px padding inside cards and panels.
- One primary CTA per section. Never two primary buttons side by side.
- Separate draft vs approved visually with labels AND color (never color alone).
- Ambiguity highlights: inline yellow/amber background on source text, paired with a tooltip or label.
- All Admin-only elements (internal notes, edit controls, approve/reject, export) must be hidden from Viewer layouts — do not just disable them, remove them entirely.
- Minimum touch target: 44x44px.

---

PAGES — create all 5:

PAGE 1: Dashboard
- Header bar: app name "Open Freelancer Project Hub" | role tag (Admin badge, blue) | Sign Out link (right-aligned)
- Section heading: "My Projects"
  - Project card grid (3-col desktop, 2-col tablet, 1-col mobile)
  - Each card: project_name | client_name | phase badge (Tag: discovery=blue, planning=purple) | status badge (Tag: active=green, archived=gray) | actions: "Open" (primary link) + "Archive" (text link, danger)
  - Create Project: Button type="primary" top-right of section, label "New Project"
- Constraint banner (Alert type="warning", dismissible): "You have reached the 3 active project limit. Archive a project to create a new one." — visible only when limit is hit; "New Project" button disabled simultaneously
- Empty state: Ant Design Empty component, message "No projects yet.", CTA button "Create your first project"
- Loading state: 3 Skeleton.Card placeholders while data loads

PAGE 2: Project Workspace (Admin only)
- Project metadata strip (full-width, top): project_name "Client Portal Refresh" | client_name "Jordan Lee" | Phase Tag "Discovery" | Back to Dashboard link
- Desktop layout: two columns (Input panel left 40%, Stories panel right 60%). Tablet/mobile: stacked single column
- Left Panel — AI Refinement Input:
  - Section heading: "AI Refinement"
  - TextArea (min 8 rows): label "Raw Notes / Bullet List", placeholder text: raw_notes_input, maxLength 20000, show character count
  - Below textarea: ambiguity highlight output area — show source text with "simple reporting" (ambiguity_highlight_1) marked with amber background. Tooltip on hover: "Scope unclear — does this mean charts, tables, or data export?"
  - Primary CTA: Button type="primary" — "Run AI Refinement". Loading state: spinner + disabled form
  - Helper text: "Your notes are processed by AI. Review generated stories and ambiguities before approving."
- Right Panel — Generated Stories:
  - Section heading: "Generated Stories (Draft)"
  - Story card list. Each card (Ant Design Card, amber left-border for draft):
    - Title: story_title_1 (bold)
    - Body: story_body_1 (italic)
    - Acceptance criteria: acceptance_criteria_1 as checklist item
    - Badge (Tag amber): "Draft"
    - Card actions (icon buttons with tooltips): Edit (EditOutlined) | Approve (CheckOutlined, success) | Reject (CloseOutlined, danger)
  - Section bottom: Button type="primary" success color — "Approve All Stories". Disabled if no draft stories. Loading state when approving.
  - Error state: Alert type="error" above panel — "AI refinement failed. Please try again."
- Internal Notes (collapsible Ant Design Collapse, below both columns):
  - Label: "Internal Notes (Admin Only)"
  - TextArea prefilled: internal_notes
  - Warning below: "This content is never visible to Viewer role."

PAGE 3: Backlog (Admin)
- Page heading: "Requirements Backlog — Client Portal Refresh"
- Tabs (Ant Design Tabs): "Draft (2)" | "Approved (1)"
- Story card per tab (Ant Design Card):
  - Title: story_title_1 (bold, 16px)
  - Body: story_body_1 (italic, 14px — "As a... I want... so that..." format)
  - Acceptance criteria: acceptance_criteria_1 as bulleted checklist
  - Status badge (Tag): Draft = amber "Draft" | Approved = green "Approved"
  - Actions (Admin only): Edit (EditOutlined) | Approve (CheckOutlined, success) | Reject/Revise (RollbackOutlined) — Approve and Reject visible in Draft tab only
- Edit mode: title becomes Input, body becomes TextArea, criteria become editable inputs. Actions: "Save" (primary) + "Cancel" (default)
- Empty state per tab: Draft → "No draft stories. Run AI refinement to generate stories." | Approved → "No approved stories yet."

PAGE 4: Backlog (Viewer)
- Page heading: "Project Requirements — Client Portal Refresh"
- Phase status: Tag "Discovery" (blue) with label "Current Phase" — read-only, no controls
- Story card list (approved only, Ant Design Card, no action buttons visible):
  - Title: story_title_1 (bold, 16px)
  - Body: story_body_1 (14px, line-height 1.6 for non-technical readability)
  - Acceptance criteria: acceptance_criteria_1 as a static bulleted list
  - Badge (Tag green): "Approved"
- NO Edit, Approve, Reject, Archive, Export, or Internal Notes elements anywhere on this page
- Empty state: Ant Design Empty, message "No approved requirements to display yet. Check back soon."

PAGE 5: Export (Admin only)
- Page heading: "Export Requirements — Client Portal Refresh"
- Export scope summary card:
  - "Approved stories included": 1 (green count badge)
  - "Draft stories (not included)": 2 (amber count badge)
  - Disclaimer (small, neutral): "Only explicitly approved stories are included in the Markdown export."
- Primary CTA: Button type="primary" size="large" — "Export as Markdown". Loading state: spinner + disabled + label "Generating export…"
- Success result: Alert type="success" (inline, above button) — "Export ready: client-portal-refresh-requirements.md" with Download link (DownloadOutlined icon)
- Error result: Alert type="error" (inline, above button) — "Export failed. Please try again." with Retry button

---

REQUIRED COMPONENT STATES — show for all interactive elements:
- default
- hover
- focus-visible (2px offset focus ring, 3:1 contrast minimum)
- disabled
- loading (spinner on buttons triggering async: Run AI Refinement, Approve All, Export)
- error (inline message below field or alert above form)
- success confirmation (notification or inline alert)

---

RESPONSIVE BEHAVIOR:
- Desktop ≥1200px: Project Workspace uses side-by-side panels. Dashboard uses 3-column card grid.
- Tablet 768–1199px: Workspace stacks panels vertically. Dashboard uses 2-column card grid.
- Mobile <768px: Single column throughout. Primary CTAs remain above the fold. No horizontal scroll on any breakpoint.
- Minimum touch target: 44×44px on all controls.

---

ACCESSIBILITY:
- WCAG 2.1 AA: 4.5:1 text contrast, 3:1 UI boundaries and focus indicators.
- All interactive elements reachable by keyboard (Tab order: header → main content → actions).
- Visible focus ring on every button, input, tab, and card control.
- No color-only status — every badge, highlight, and state indicator must include a text label or icon.
- ARIA live regions on: AI refinement loading, story approval confirmation, export result.
- All form fields have explicit visible labels (not placeholder-only).
- Ambiguity highlights must include a text tooltip/description, not just color.

---

CONTENT PLACEHOLDERS (use exactly these values):
- project_name: "Client Portal Refresh"
- client_name: "Jordan Lee"
- phase: "Discovery"
- raw_notes_input: "Need client login, dashboard summary, and simple reporting."
- ambiguity_highlight_1: "simple reporting"
- story_title_1: "View project dashboard"
- story_body_1: "As a Viewer, I want to see approved requirements, so that I understand what will be delivered."
- acceptance_criteria_1: "Given I open the backlog, when stories are approved, then I can read them in a structured list."
- internal_notes: "Admin-only: clarify metrics scope before planning sign-off."
- export_filename: "client-portal-refresh-requirements.md"
```

---

## Section 2 — Per-Page Prompts (Individual Iteration)

Use these when regenerating or refining a single page without re-running the full prompt.

---

### Page 1 — Dashboard

```
Generate a Dashboard page for "Open Freelancer Project Hub".

Persona: Admin (Alex Rivera, Freelancer)
Goal: See all projects at a glance, create new ones, and manage the 3-project active limit.

Layout: Single-column page, max-width 1200px centered.

Components:
- PageHeader (Ant Design): app name "Open Freelancer Project Hub", role badge (Admin, blue), Sign Out link (text button, right-aligned).
- Section heading: "My Projects" (h2, 20px semi-bold). "New Project" Button type="primary" top-right.
- Project Card Grid: Ant Design Card in responsive grid (3-col desktop, 2-col tablet, 1-col mobile).
  - Each card: project_name (bold title), client_name (secondary text), phase badge (Tag: discovery=blue, planning=purple), status badge (Tag: active=green, archived=gray), actions: "Open" (primary link, aria-label="Open project: project_name") + "Archive" (text link, danger color).
- Constraint Banner: Alert type="warning" dismissible — "You have reached the 3 active project limit. Archive a project to create a new one." Shown only when limit is hit; "New Project" button is disabled simultaneously.
- Empty State: Ant Design Empty, message "No projects yet.", Button type="primary" "Create your first project".
- Loading State: 3 Skeleton.Card placeholders while data loads.

States:
- Default: 2 project cards visible.
- Limit hit: warning banner shown, "New Project" button disabled.
- Empty: Empty component shown, no cards, CTA visible.
- Loading: Skeleton cards.

Styling:
- Card: $shadow-base, $radius-lg, 24px padding.
- Phase tag: discovery=blue, planning=purple.
- Status tag: active=green, archived=gray.

Accessibility:
- Constraint banner announced via role="alert" ARIA live region.
- Tab order: Header → "New Project" CTA → card list (left to right, top to bottom).
- Each card action has a descriptive aria-label.
```

---

### Page 2 — Project Workspace (Admin)

```
Generate a Project Workspace page for "Open Freelancer Project Hub" — Admin role only.

Persona: Admin (Alex Rivera, Freelancer)
Goal: Paste raw notes → run AI refinement → review ambiguity highlights → edit generated stories → approve all.

Layout: Desktop ≥1200px — two-column (Input panel left 40%, Stories panel right 60%). Tablet/mobile — stacked single column.

Project metadata strip (full-width top): project_name "Client Portal Refresh" | client_name "Jordan Lee" | Phase Tag "Discovery" | Back to Dashboard link.

Left Panel — AI Refinement Input:
- Section heading: "AI Refinement".
- TextArea (min 8 rows): label "Raw Notes / Bullet List", placeholder: raw_notes_input, maxLength 20000, character count shown.
- Ambiguity highlight output (below textarea): source text rendered with ambiguity_highlight_1 "simple reporting" marked in amber background inline. Tooltip on hover/focus: "Scope unclear — does this mean charts, tables, or data export?"
- Primary CTA: Button type="primary" — "Run AI Refinement". Loading state: spinner + disabled form.
- Helper text: "Your notes are processed by AI. Review generated stories and ambiguities before approving."

Right Panel — Generated Stories:
- Section heading: "Generated Stories (Draft)".
- Story card (Ant Design Card, amber left-border for draft):
  - Title: story_title_1 "View project dashboard" (bold).
  - Body: story_body_1 (italic) — "As a Viewer, I want to see approved requirements, so that I understand what will be delivered."
  - Acceptance criteria: acceptance_criteria_1 as a checklist item.
  - Badge (Tag amber): "Draft".
  - Card actions (icon buttons with tooltips): Edit (EditOutlined) | Approve (CheckOutlined, success) | Reject (CloseOutlined, danger). Each has aria-label="[Action] story: story_title_1".
- Section bottom: Button type="primary" success color — "Approve All Stories". Disabled when no draft stories. Loading state when approving.
- Error state: Alert type="error" above panel — "AI refinement failed. Please try again."

Internal Notes (Ant Design Collapse, below both panels):
- Label: "Internal Notes (Admin Only)".
- TextArea prefilled: internal_notes.
- Note below: "This content is never visible to Viewer role."

States:
- Default: empty textarea, no stories, "Run AI Refinement" active.
- Loading (AI running): spinner on CTA, textarea disabled, Skeleton in stories panel, aria-live="polite" announces "AI refinement in progress."
- Results returned: ambiguity highlights shown, stories panel populated.
- Story approved: card border turns green, badge updates to "Approved" (Tag green). Approved card no longer shows Approve/Reject actions.
- All stories approved: "Approve All Stories" shows success state, then Ant Design notification "All stories approved."
- Error: Alert type="error" above stories panel, aria-live="assertive".

Accessibility:
- Ambiguity highlights must have aria-label describing the flag reason.
- "Run AI Refinement" announces loading via aria-live="polite".
- Collapse trigger keyboard accessible (Enter/Space).
- Tab order: metadata strip → left panel (top to bottom) → right panel → internal notes.
```

---

### Page 3 — Backlog (Admin)

```
Generate an Admin Backlog page for "Open Freelancer Project Hub".

Persona: Admin (Alex Rivera, Freelancer)
Goal: Review draft and approved stories, edit and finalize the requirements backlog.

Layout: Single column, max-width 900px.

Page heading: "Requirements Backlog — Client Portal Refresh" (h1).

Tabs (Ant Design Tabs, navigable by arrow keys):
- Tab 1: "Draft" with count badge (e.g., "Draft 2")
- Tab 2: "Approved" with count badge (e.g., "Approved 1")

Story card (Ant Design Card — show 1 sample per tab):
- Title: story_title_1 (bold, 16px).
- Body: story_body_1 (italic, 14px — "As a… I want… so that…" format).
- Acceptance criteria: acceptance_criteria_1 as a bulleted checklist (read-only checkboxes, checked for approved).
- Status badge (Tag): Draft = amber "Draft" | Approved = green "Approved".
- Actions row (visible in Draft tab only): Edit (EditOutlined) | Approve (CheckOutlined, success color) | Reject/Revise (RollbackOutlined, neutral). Each has aria-label="[Action] story: story_title_1".

Edit mode (inline on card):
- Title → Input.
- Body → TextArea.
- Each criteria → Input.
- Actions: "Save" Button type="primary" + "Cancel" Button type="default". Focus trapped within card while editing.

Empty states:
- Draft tab: Ant Design Empty, message "No draft stories. Run AI refinement in the Project Workspace to generate stories."
- Approved tab: Ant Design Empty, message "No approved stories yet."

States:
- Tab switching: count badges update.
- Approving: button loading state → card moves to Approved tab → success Notification "Story approved."
- Rejecting: card stays in Draft, badge resets, optional inline comment field appears.

Accessibility:
- Tabs navigable by arrow keys (left/right).
- Edit mode focus trap within card.
- Approval action announces result via aria-live="polite".
```

---

### Page 4 — Backlog (Viewer)

```
Generate a Viewer Backlog page for "Open Freelancer Project Hub".

Persona: Viewer (Jordan Lee, Client)
Goal: Read approved requirements and project phase status. No editing or admin controls.

Layout: Single column, max-width 800px, readability-first.

Page heading: "Project Requirements — Client Portal Refresh" (h1).

Phase status: Tag "Discovery" (blue, read-only) with label "Current Phase:". aria-label="Current project phase: Discovery". No interactive controls.

Story card list (Ant Design Card, no action buttons anywhere on this page):
- Title: story_title_1 (bold, 16px).
- Body: story_body_1 (14px, line-height 1.6).
- Acceptance criteria: acceptance_criteria_1 as a static bulleted list (no checkboxes).
- Badge (Tag green): "Approved".

NO Edit, Approve, Reject, Archive, Export, Internal Notes, or any Admin element visible on this page.

Empty state: Ant Design Empty, message "No approved requirements to display yet. Check back soon."

Styling:
- Line-height 1.6, body text 14-15px for non-technical readability.
- Card: subtle border ($border-color-base), no action indicators, $radius-base.
- Phase tag: read-only cursor.

Accessibility:
- Page navigable by heading structure alone (h1 → h2 per card title).
- Cards are non-interactive; use semantic list structure (ul > li > article).
- Phase tag must not be announced as a button or link.
```

---

### Page 5 — Export (Admin)

```
Generate an Export page for "Open Freelancer Project Hub" — Admin role only.

Persona: Admin (Alex Rivera, Freelancer)
Goal: Export only approved requirements as a downloadable Markdown file.

Layout: Single column, max-width 700px, centered.

Page heading: "Export Requirements — Client Portal Refresh" (h1).

Export scope summary (Ant Design Card, $shadow-base, 24px padding, $radius-lg):
- Row: "Approved stories included" → count badge (green) "1".
- Row: "Draft stories (not included)" → count badge (amber) "2".
- Disclaimer (12px, neutral gray): "Only explicitly approved stories are included in the Markdown export."

Primary CTA: Button type="primary" size="large" — "Export as Markdown". Full-width on mobile.
- Loading state: spinner + disabled + label "Generating export…". Announced via aria-live="polite".

Result states (shown above button, inline Alert):
- Success: Alert type="success", DownloadOutlined icon — "Export ready: client-portal-refresh-requirements.md" with Download link. aria-label="Download client-portal-refresh-requirements.md". Announced via aria-live="polite".
- Error: Alert type="error", WarningOutlined icon — "Export failed. Please try again." with Retry button. Announced via aria-live="assertive".

States:
- Default: scope summary visible, CTA active, no alerts.
- Loading: CTA spinner, no alerts.
- Success: success Alert shown, CTA returns to default (re-exportable).
- Error: error Alert + Retry button shown.

Accessibility:
- Export result Alert announced via aria-live region.
- Download link has explicit aria-label.
- CTA loading state change announced to screen readers.
```

---

## Assumptions & Open Questions

- Prototype starts post-login. Authentication flow is out of scope.
- Viewer accesses project via direct link — confirm if they also see Dashboard project cards.
- Ambiguity highlights have no severity levels in MVP — confirm if needed.
- Export has no in-app preview — confirm if a preview modal is required before download.
- Onboarding tooltip appears on first Admin login only — confirm if user-resettable.

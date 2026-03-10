# Stitch Prompt (MVP Prototype)

> **Status:** Ready to use
> **Last Updated:** 2026-03-03
> **Scope:** MVP — discovery/planning phases only. No delivery, handoff, or billing flows.
> **Stitch Project Link:** [Open Projects Hub Prototype](https://stitch.withgoogle.com/projects/15812972902674048372)

---

## How to Use This File

1. For a full 5-page prototype in one pass, copy the block under **Section 1 — Full Prompt** and paste it into Stitch.
2. For individual page iteration or refinement, copy the relevant **Per-Page Prompt** from Section 2.
3. Do not modify field names in the Content Placeholders — they map directly to API contract field names.

---

## Section 1 — Full Prompt (Copy/Paste Into Stitch)

```markdown
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
```

---

### Page 6 — User Authentication

```markdown
Generate a User Authentication page for "Open Freelancer Project Hub".

Persona: Admin (Alex Rivera, Freelancer)
Goal: Log in securely to access the dashboard and manage projects.

Layout: Single column, max-width 400px, centered vertically and horizontally.

Components:

- Page heading: "Welcome Back" (h1, centered, 24px semi-bold).
- Login Form (Ant Design Form):
  - Email Input: label "Email Address", placeholder "Enter your email", required, validation for valid email format.
  - Password Input: label "Password", placeholder "Enter your password", required, validation for minimum 8 characters.
  - Remember Me Checkbox: label "Remember Me".
  - Submit Button: Button type="primary" full-width — "Log In". Loading state: spinner + disabled.
- Forgot Password Link: Text link below form, aligned left — "Forgot your password?".

States:

- Default: Empty form, Submit button active.
- Validation Error: Inline error message below field (e.g., "Invalid email address").
- Loading: Submit button shows spinner, form disabled.
- Success: Redirect to Dashboard.
- Error: Alert type="error" above form — "Login failed. Please check your credentials."

Accessibility:

- Form fields have explicit labels and aria-required attributes.
- Submit button announces loading state via aria-live="polite".
- Error messages announced via aria-live="assertive".
- Tab order: Email → Password → Remember Me → Submit → Forgot Password.
```

---

### Page 7 — User Authorization

```markdown
Generate a User Authorization page for "Open Freelancer Project Hub".

Persona: Admin (Alex Rivera, Freelancer)
Goal: Manage user roles and permissions for the project.

Layout: Single column, max-width 800px.

Page heading: "User Roles & Permissions" (h1, 24px semi-bold).

Components:

- Role Table (Ant Design Table):
  - Columns: User Name, Email, Role (dropdown: Admin, Viewer), Actions (Edit, Remove).
  - Rows: Populate with sample data (e.g., "Jordan Lee", "jordan@example.com", "Viewer").
- Add User Section:
  - Heading: "Add New User" (h2, 20px semi-bold).
  - Email Input: label "Email Address", placeholder "Enter user email", required.
  - Role Dropdown: label "Role", options "Admin", "Viewer", default "Viewer".
  - Add Button: Button type="primary" — "Add User". Loading state: spinner + disabled.

States:

- Default: Table populated, Add User form empty.
- Adding User: Add button shows spinner, form disabled.
- Success: Notification type="success" — "User added successfully." Table updates with new row.
- Error: Inline error below form field (e.g., "Invalid email address").
- Removing User: Confirmation modal — "Are you sure you want to remove this user?". Actions: Confirm (danger) + Cancel.

Accessibility:

- Table rows and actions keyboard-navigable.
- Add User form fields have explicit labels and aria-required attributes.
- Notifications announced via aria-live="polite".
- Confirmation modal focus trapped until action taken.
```

---

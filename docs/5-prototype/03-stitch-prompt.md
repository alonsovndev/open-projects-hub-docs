# Stitch Prompt: Open Freelancer Project Hub MVP Prototype

## Purpose

Use this file to generate a fast, consistent prototype in Stitch. The consolidated prompt below is the primary handoff artifact and is designed to stay aligned with the prototype brief and design-direction documents.

## Why This Version Is Tighter

- It removes extra screens that are not required to validate the MVP planning workflow.
- It keeps the prototype focused on Discovery and Planning only.
- It makes Admin and Viewer permissions explicit.
- It includes scope guardrails inside the prompt so Stitch is less likely to invent product behavior.

## Out of Scope

The prototype must not introduce the following:

- Full application navigation beyond a lightweight page switcher or review tabs
- Delivery, sprint, handoff, maintenance, or execution workflows
- Additional collaborator roles beyond Admin and Viewer
- Comments, chat, collaboration threads, approvals by multiple people, or activity feeds
- Audit history, version comparison, rollback, or change logs
- File attachments, budget tracking, time tracking, invoicing, or resource management
- OAuth, social login, MFA, or self-service client signup
- Rich text editors, Markdown authoring surfaces, or complex formatting tools
- Dark mode or heavily branded visual exploration

## Consolidated Stitch Prompt (Copy & Paste)

```markdown
Design a clickable responsive stakeholder prototype for the **Open Freelancer Project Hub**.

## Objective

Show how an **Admin** turns ambiguous client notes into approved planning artifacts, and how a **Viewer** safely reviews only the approved content.

The prototype is limited to **Discovery** and **Planning** workflows. It should feel professional, structured, accessible, and trustworthy. It should feel like a planning workspace, not a delivery tool.

## Product Scope Guardrails

- Only show two roles: **Admin** and **Viewer**.
- Keep the prototype focused on planning workflows only.
- Treat AI-generated output as **draft** until explicit Admin approval.
- Viewer screens must be clearly **read-only**.
- Do not introduce delivery, sprint, handoff, collaboration, comments, audit history, version comparison, file management, budget tracking, or extra roles.
- Do not invent a large application shell. Use a **small multi-page prototype** with simple page switching only.

## Global Design System

- **Framework direction**: Ant Design-style web components.
- **Typography**: highly readable system-sans, close to Ant Design defaults.
- **Accessibility**: WCAG 2.1 AA, visible keyboard focus, semantic headings, and minimum 44x44px touch targets.
- **Tone**: calm, content-first, low-friction, structured.
- **Color roles**:
  - **Primary**: main actions only
  - **Neutral**: layout, text, backgrounds, borders
  - **Success**: approved states only, always paired with text labels
  - **Warning**: ambiguity highlights and caution states, never color alone
  - **Error**: validation and blocking issues

## Shared Layout Rules

- Keep a compact **project context header** at the top of each page.
- The header should show: **Project Name**, **Client Name**, **Current Phase**, and **Current Role**.
- Use simple stacked panels or card-based sections.
- Keep hierarchy obvious: page title first, section titles second, story cards third, metadata last.
- On mobile, collapse to a single-column layout without losing role or status clarity.

## Required Components

- Summary header bar
- TextArea for raw notes
- Primary button for refine, approve, and export actions
- Secondary button for cancel, clear, skip, or dismiss actions
- Story cards for draft and approved content
- Tags or badges for **Discovery**, **Planning**, **Draft**, **Approved**, and **Read-only**
- Tooltips or popovers for ambiguity explanations and onboarding
- Confirmation modal for approval
- Alerts for warning, success, and error states
- Empty state and loading state

## Page 1: Admin AI Refinement Workspace

### Purpose

This is the main MVP screen. Show how raw notes become structured draft user stories.

### Required Sections

1. **Project Context Header**
   - Project: "Client Portal Refresh"
   - Client: placeholder client name
   - Phase: **Discovery** or **Planning**
   - Role badge: **Admin**

2. **Raw Notes Input**
   - Large TextArea for ambiguous notes or bullet lists
   - Primary action: **Refine Notes**
   - Secondary action: **Clear**

3. **Ambiguity Review**
   - Show the original notes with inline warning highlights
   - Use tooltips or small inline explanations to describe ambiguity risks
   - Do not rely on yellow color alone; pair highlights with iconography or text labels

4. **Generated Draft Stories**
   - Story cards with:
     - Story title
     - User story in the format: "As a... I want... so that..."
     - Acceptance criteria list
     - Status tag: **Draft**
   - Admin may see edit affordances on this page only

5. **Approval Area**
   - Primary action: **Approve Stories**
   - Confirmation modal that makes approval feel explicit and intentional

### Required States

- Empty
- Loading
- Validation or processing error
- Draft ready
- Approved confirmation

## Page 2: Admin Backlog View

### Purpose

Show the official approved planning backlog for the Admin role.

### Required Content

- Same project context header at the top
- Role badge: **Admin**
- Approved story cards only
- Optional grouping or labels to distinguish approved content clearly
- **Internal Notes** area visible only to Admin
- Primary action: **Export Markdown**

### Required States

- Empty backlog
- Mixed review context if helpful, but approved content must remain visually clear
- Export-ready state

## Page 3: Viewer Backlog View

### Purpose

Show how a client safely reviews approved planning content.

### Required Content

- Same project context header at the top
- Role badge: **Viewer**
- Approved user stories and acceptance criteria in plain language
- Strong visual cue that the page is **Read-only**
- Phase visibility in plain language

### Explicit Omissions

- No edit controls
- No draft content
- No internal notes
- No Admin-only actions

## Page 4: Optional Onboarding Overlay

### Purpose

Provide lightweight first-time guidance for the Admin workflow.

### Required Steps

- Welcome message
- Tooltip for note entry
- Tooltip for ambiguity review
- Tooltip for draft review and editing
- Tooltip for approval action
- Skip, dismiss, and "don't show again" behaviors

## Interaction Expectations

- Ambiguity must appear inline with the raw notes context.
- Approval must feel separate from generation.
- Viewer screens must preserve planning context without exposing editing.
- Internal notes must be clearly separated in Admin views and entirely absent from Viewer views.
- Labels such as **Draft**, **Approved**, and **Read-only** must be obvious at a glance.

## Responsive Behavior

- **Desktop (1200px+)**: primary review layout with visible sections and metadata
- **Tablet (768px-1199px)**: stack secondary sections beneath the main workflow
- **Mobile (<768px)**: single-column layout, full-width buttons, preserved role and status labels

## Accessibility Requirements

- Keyboard-accessible actions and dialogs
- Visible focus states with sufficient contrast
- Explicit labels for inputs and controls
- Semantic heading hierarchy
- Do not rely on color alone for ambiguity, approval, or error states

## Sample Content Guidance

- Use realistic placeholder content rather than final marketing copy.
- Keep terminology aligned with: **Discovery**, **Planning**, **Admin**, **Viewer**, **user stories**, **acceptance criteria**, and **internal notes**.
- Keep copy concise and easy for non-technical stakeholders to review.
```

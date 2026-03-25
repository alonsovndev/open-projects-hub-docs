# Stitch Prompt: Open Freelancer Project Hub MVP Prototype

## Purpose

Use this file to generate a fast, consistent prototype in Stitch. The consolidated prompt below is the primary handoff artifact and is designed to stay aligned with the prototype brief and design-direction documents.

## Why This Version Is Tighter

- It removes extra screens that are not required to validate the MVP planning workflow.
- It now covers the lightweight authentication entry flow needed to access the planning workflow.
- It keeps the prototype focused on Discovery and Planning only.
- It makes Admin and Viewer permissions explicit.
- It includes scope guardrails inside the prompt so Stitch is less likely to invent product behavior.

## Current Prototype Asset Alignment

Use this table to map generated `stitch/` assets to the canonical page set in this prompt.

| Canonical Page | Preferred Existing Asset Folder |
| --- | --- |
| Page 1: Entry and Role Selection | `entry-role-selection-with-home-link/` |
| Page 2: Admin Sign Up | `create-admin-account/` |
| Page 3: Admin Sign In | `admin-sign-in/` |
| Page 4: Forgot Password | _(generate if missing)_ |
| Page 5: Reset Password | `reset-password-refined/` |
| Page 6: Admin AI Requirements Refinement Workspace | `ai-refinement-workspace-updated-sidebar/` |
| Page 7: Admin Backlog View and Markdown Export | `simplified-admin-backlog/` |
| Page 8: Viewer Backlog View | `final-approved-stories-streamlined-view/` |
| Page 9: Optional Onboarding Overlay | _(generate if needed)_ |

### Not Canonical for This MVP Prompt

The following generated variants are not part of the current MVP prototype path and should be treated as exploratory or archived variants:

- `project-hub-home-page-refined/`
- `project-id-entry/`
- `projects-overview-refined/`
- `projects-overview-create-project-modal/`
- `admin-dashboard-project-summary-refined/`
- `admin-settings-top-options-removed/`

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

## Source Alignment

Use these as the source of truth before regenerating prototype pages:

- [Project Overview](../overview.md)
- [Project Requirements by Feature](../01-requirements/readme.md)
- [F-002 AI Refinement and Approval Workflow](../01-requirements/f-002-ai-refinement-and-approval-workflow.md)
- [F-003 Access Control and Visibility Boundaries](../01-requirements/f-003-access-control-and-visibility-boundaries.md)
- [F-004 Requirements Backlog and Markdown Export](../01-requirements/f-004-requirements-backlog-and-markdown-export.md)
- [F-005 Minimal Onboarding](../01-requirements/f-005-minimal-onboarding.md)
- [F-006 Landing Page](../01-requirements/f-006-landing-page.md)
- [F-007 Admin Login](../01-requirements/f-007-admin-login.md)
- [F-008 Create Account](../01-requirements/f-008-create-account.md)
- [F-009 Reset Password](../01-requirements/f-009-reset-password.md)
- [UI/UX Designer User Stories](../07-user-stories/ui-ux-designer-stories.md)

## Consolidated Stitch Prompt (Copy & Paste)

```markdown
Design a clickable responsive stakeholder prototype for the **Open Freelancer Project Hub**.

## Objective

Show the end-to-end MVP journey: lightweight account entry, role selection, Admin authentication, AI-assisted requirements refinement, explicit approval, Markdown export, and safe Viewer review of approved content.

The prototype is limited to **Discovery** and **Planning** workflows. It should feel professional, structured, accessible, and trustworthy. It should feel like a planning workspace, not a delivery tool.

## Product Scope Guardrails

- Only show two roles: **Admin** and **Viewer**.
- Keep the prototype focused on planning workflows only.
- Treat AI-generated output as **draft** until explicit Admin approval.
- Viewer screens must be clearly **read-only**.
- Support only lightweight email/password authentication views: **Sign Up**, **Sign In**, **Forgot Password**, and **Reset Password**.
- Treat **Sign Up** as a simple Admin account creation flow only. Do not create client self-registration.
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
- Role-selection cards
- Sign-up, sign-in, forgot-password, and reset-password forms
- TextArea for raw notes
- Primary button for refine, approve, and export actions
- Secondary button for cancel, clear, skip, or dismiss actions
- Story cards for draft and approved content
- Tags or badges for **Discovery**, **Planning**, **Draft**, **Approved**, and **Read-only**
- Tooltips or popovers for ambiguity explanations and onboarding
- Confirmation modal for approval
- Alerts for warning, success, and error states
- Empty state and loading state

## Page 1: Entry and Role Selection

### Purpose

Provide a lightweight entry point that helps users choose the correct prototype path without inventing a large application shell.

### Required Content

- Short product summary explaining that the platform turns ambiguous notes into approved planning artifacts
- Two role cards only:
   - **Admin**: create, refine, approve, and export planning content
   - **Viewer**: review approved planning content in read-only mode
- Primary emphasis on **Continue as Admin**
- Secondary emphasis on **Continue as Viewer**
- Calm, content-first layout with minimal navigation

## Page 2: Admin Sign Up

### Purpose

Show a simple Admin account creation view that supports prototype entry without implying open client registration.

### Required Content

- Page title: **Create Admin Account**
- Fields:
   - Full name
   - Work email
   - Password
   - Confirm password
- Checkbox for agreeing to terms or prototype conditions
- Primary action: **Create Account**
- Secondary link: **Already have an account? Sign In**
- Helper text that only Admin users create and manage planning workspaces

### Required States

- Default
- Validation error
- Loading / creating account
- Success confirmation

### Explicit Omissions

- No social signup
- No client self-service signup
- No advanced profile setup

## Page 3: Admin Sign In

### Purpose

Show a minimal and trustworthy login experience before the Admin enters the planning workspace.

### Required Content

- Page title: **Admin Sign In**
- Email field
- Password field
- Optional **Remember me** checkbox
- Primary action: **Sign In**
- Secondary links:
   - **Forgot password?**
   - **Create account**
- Optional informational link or inline state for email confirmation

### Required States

- Default
- Validation error
- Loading / signing in
- Unconfirmed account notice

## Page 4: Forgot Password

### Purpose

Show the request step for password recovery.

### Required Content

- Page title: **Forgot Password**
- Short explanation telling the Admin to enter their email to receive a reset link
- Email field
- Primary action: **Send Reset Link**
- Secondary action: **Back to Sign In**

### Required States

- Default
- Validation error
- Loading
- Success message: **Reset link sent. Please check your inbox.**

## Page 5: Reset Password

### Purpose

Show the password reset completion step after the Admin follows the email link.

### Required Content

- Page title: **Reset Password**
- New password field
- Confirm new password field
- Primary action: **Update Password**
- Secondary action: **Back to Sign In**

### Required States

- Default
- Validation error
- Loading
- Success confirmation: **Password updated successfully. You can now sign in.**

## Page 6: Admin AI Requirements Refinement Workspace

### Purpose

This is the core application functionality. Show how raw notes become structured draft requirements and user stories.

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
   - Optional helper text that explains the AI turns vague notes into structured requirements drafts

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
     - Optional requirement summary or requirement grouping label such as **Functional Requirement** or **Planning Note**
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

## Page 7: Admin Backlog View and Markdown Export

### Purpose

Show the official approved planning backlog for the Admin role and the export-to-Markdown outcome.

### Required Content

- Same project context header at the top
- Role badge: **Admin**
- Approved story cards only
- Optional grouping or labels to distinguish approved content clearly
- **Internal Notes** area visible only to Admin
- Primary action: **Export Markdown**
- Export panel, modal, or inline confirmation that clarifies the export creates a `.md` file containing approved stories and acceptance criteria only
- Success state that confirms the Markdown file was prepared or downloaded

### Required States

- Empty backlog
- Mixed review context if helpful, but approved content must remain visually clear
- Export-ready state
- Export success state

## Page 8: Viewer Backlog View

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

## Page 9: Optional Onboarding Overlay

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

- Role selection must clearly split the Admin editing path from the Viewer read-only path.
- Sign Up, Sign In, Forgot Password, and Reset Password must feel simple, trustworthy, and low-friction.
- Ambiguity must appear inline with the raw notes context.
- AI refinement must feel like the core workflow of the product.
- Approval must feel separate from generation.
- Export must clearly represent a Markdown file output for approved stories only.
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
- For auth screens, use concise placeholder copy for account creation, sign in, password recovery, and reset confirmation.
- For export, show a believable file name such as `client-portal-refresh-approved-stories.md`.
- Keep copy concise and easy for non-technical stakeholders to review.
```

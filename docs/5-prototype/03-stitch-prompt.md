# Stitch Prompt: Open Freelancer Project Hub MVP Prototype

## Purpose

Use this file to generate a fast, consistent prototype in Stitch without re-discovering project scope.

## COPY/PASTE INTO STITCH

```markdown
Design a clickable responsive prototype for the **Open Freelancer Project Hub**.

## Product context
This product helps freelancers turn ambiguous client notes into structured planning artifacts. The MVP is limited to **Discovery** and **Planning** workflows only.

Do **not** include:
- delivery workflows
- sprint planning or execution
- handoff flows
- team collaboration features
- external collaborator invitations
- comments, audit logs, or version history

## Users and roles
- **Admin**: the freelancer owner with full CRUD over planning content
- **Viewer**: the client with read-only access to approved requirements and project phase visibility

Do not include any additional roles.

## Prototype goal
Show how:
1. raw notes or bullet lists become draft user stories
2. ambiguity is surfaced inline
3. the Admin reviews, edits, and explicitly approves content
4. approved requirements appear in a readable backlog
5. the Viewer sees a safe read-only version with no internal notes

## Navigation model
Create a **multi-page prototype**, not a single-page concept.

Required pages:
1. **Admin AI Refinement Workspace**
2. **Admin Backlog View**
3. **Viewer Backlog View**
4. **Optional Phase 1 Onboarding Overlay** attached to the Admin AI Refinement Workspace and clearly labeled as **Phase 1 / not MVP-blocking**

Keep navigation lightweight. Use simple page switching or tabs for prototype review. Do not invent a full application navigation system.

## Page-by-page requirements

### Page 1: Admin AI Refinement Workspace
Use a content-first workspace layout with these sections:
- **Project header** with:
  - project name
  - client name
  - current phase tag: Discovery or Planning
  - Admin role indicator
- **Raw notes input section** with:
  - a large text area for raw notes and bullet lists
  - helper text that file upload is not required
  - primary action: Refine Notes
  - secondary action: Clear Draft
- **Ambiguity review section** with:
  - the notes content showing **inline ambiguity highlights**
  - a short explanation of what the highlight means
  - optional tooltip or popover for clarification
- **Generated draft stories section** with cards that include:
  - story title
  - user story statement using the exact pattern: "As a ..., I want ..., so that ..."
  - acceptance criteria list
  - draft status tag
- **Approval controls** with:
  - Edit Draft action
  - Approve Stories action
  - approval confirmation dialog before stories become official

Required states for this page:
- empty
- loading
- validation error
- draft ready
- approved confirmation

### Page 2: Admin Backlog View
Use a structured backlog page with these sections:
- **Project header** with project name, client, phase, and Admin label
- **Backlog summary** showing approved requirements count or section label
- **Approved story list** where each card shows:
  - title
  - user story statement
  - acceptance criteria
  - approved status tag
- **Internal notes area** visible only on this Admin page
- **Export action** labeled Export Markdown

Optional review context on this page:
- show a draft vs approved distinction only if it helps explain Admin workflow

Required states for this page:
- empty backlog
- mixed draft and approved backlog
- export-ready backlog

### Page 3: Viewer Backlog View
Use a read-only, stakeholder-friendly page with these sections:
- **Project header** with project name, client, phase, and Viewer or Read-only label
- **Approved requirements list** with:
  - title
  - user story statement
  - acceptance criteria
- **Project phase visibility** written in plain language
- **Read-only cues** showing there are no editing actions

This page must explicitly omit:
- internal notes
- draft-only content
- edit actions
- approval actions
- comment affordances

### Page 4: Optional Phase 1 Onboarding Overlay
This page or overlay is optional and must be labeled **Phase 1 / not MVP-blocking**.

Include:
- welcome message
- tooltip for note entry
- tooltip for ambiguity highlights
- tooltip for draft review and editing
- tooltip for approval
- Skip, Dismiss, and Don't Show Again actions

## Component expectations
Use Ant Design-style web components and familiar patterns, including:
- page header or summary bar
- Input.TextArea
- primary and secondary buttons
- story cards
- tags or badges for phase and status
- tooltip or popover
- modal dialog for approval confirmation
- alert for validation or error messages
- loading spinner
- empty state

## Interaction state expectations
At minimum, define these states where relevant:
- default
- hover
- focus
- disabled
- loading
- error
- empty
- success or approved

Make Admin vs Viewer differences immediately obvious. Make draft vs approved differences immediately obvious.

## Responsive behavior
Show desktop first, then specify tablet and mobile behavior.

Required behavior:
- desktop: content sections can sit side-by-side if helpful
- tablet: secondary sections stack below the main workflow
- mobile: single-column layout with full-width actions and preserved content hierarchy
- all touch targets must be at least 44x44px

## Accessibility constraints
Follow **WCAG 2.1 AA** baseline.

Requirements:
- all primary actions must be keyboard accessible
- visible focus states must be present
- inputs and actions need clear labels
- semantic headings should structure the page
- do not rely on color alone for ambiguity, approval, or error states
- dialogs and tooltips must be dismissible via keyboard
- Viewer content must be easy to read for non-technical stakeholders

## Design direction
Use a UI that feels:
- professional
- clear
- structured
- accessible
- trustworthy

Visual rules:
- keep the interface clean and content-first
- use moderate information density
- emphasize readability over decoration
- keep project phase and role context visible near the top of each page
- do not use delivery-oriented metaphors or labels

## Color and typography constraints
No official brand palette or type system is documented, so use constrained placeholders rather than open-ended choices.

Color rules:
- use a **Primary** color for main actions only
- use **Neutral** colors for layout, text, and backgrounds
- use **Success** for approved states with a visible text label
- use **Warning** for ambiguity highlights with supporting icon or text
- use **Error** for validation and blocking issues

Typography rules:
- use a readable system-sans style similar to Ant Design defaults
- create clear hierarchy for page titles, section titles, card titles, body text, and helper text
- optimize for non-technical readability

## Content model placeholders
Use realistic placeholder content with these field names and examples:

- **Project Name**: "Client Portal Refresh"
- **Client Name**: "BrightSide Studio"
- **Phase**: "Discovery"
- **Raw Notes**:
  - "Client needs a clearer dashboard for tracking project requests"
  - "Users should upload request details without emailing attachments"
  - "Need visibility into request status"
- **Story Title**: "Track project requests in one place"
- **User Story**: "As a client stakeholder, I want to see request status in one place so that I can understand progress without extra follow-up"
- **Acceptance Criterion 1**: "Given approved requirements exist, when the backlog is opened, then each story shows a title, user story statement, and acceptance criteria"
- **Acceptance Criterion 2**: "Given a Viewer opens the project, when the page loads, then the Viewer sees approved stories but no internal notes"
- **Internal Note**: "Clarify whether attachments belong in MVP or Phase 2"

## Output request
Produce a clickable prototype with clear labels for:
- role differences
- draft vs approved states
- ambiguity handling
- approval flow
- responsive behavior notes

Annotate any optional Phase 1 onboarding content so it is not confused with MVP scope.
```

## Assumptions & Open Questions

- The source docs define workflow pages clearly, but they do not define a full production navigation shell.
- No official brand palette or typeface is documented, so constrained placeholders are used instead of final design tokens.
- The onboarding overlay is included as optional because it is a Phase 1 usability enhancement, not an MVP blocker.

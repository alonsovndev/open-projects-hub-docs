# Stitch Prompt: Open Freelancer Project Hub MVP Prototype

## Purpose

Use this file to generate a fast, consistent prototype in Stitch using an iterative prompt strategy. Follow the prompts in sequence to build and refine each mockup.

## ITERATIVE PROMPT STRATEGY

### Prompt 1: Foundation, Global Shell & Home

**Goal**: Establish the design system and the high-level navigation entry point.

```markdown
Design a clickable responsive prototype for the **Open Freelancer Project Hub**.

## Global Design System

- **Framework**: Ant Design-style web components.
- **Typography**: System-sans stack (inter-like).
- **Accessibility**: WCAG 2.1 AA (44x44px targets, keyboard accessible).
- **Colors**: Primary (Actions), Neutral (Layout/Text), Success (Approved), Warning (Highlights).
- **Shared Layers**:
  - **Header**: Logo "Open Projects Hub", simple navigation links, and User Profile dropdown.
  - **Footer**: Simplified links (Privacy, Terms, Help).

## Page 1: Landing / Home

- **Context**: A clean, professional hero section explaining the tool: "Turn Ambiguous Notes into Technical Requirements."
- **Primary CTA**: "Get Started" (links to Role Selection).
- **Secondary CTA**: "Learn More".
```

### Prompt 2: Authentication & Role Selection

**Goal**: Define the entry gates for both types of users.

```markdown
Based on the previous Home page, design **Page 2: Role Selection & Authorization**.

## Page 2: Role Selection

- **Role Cards**:
  - **Freelancer (Admin)**: "Create projects and refine requirements."
  - **Client (Viewer)**: "Review and approve requirements for your projects."

## Page 3: Admin Login Flow

- **Login Page**: Email and Password inputs + "Remember Me" toggle.
- **Links**: "Forgot Password?" (leads to recovery email state) and "Confirmations" (simulated email verification UI).
- **Confirmation State**: "Verification link sent! Please check your inbox."
```

### Prompt 3: Admin Dashboard & Project Creation

**Goal**: The central hub for the freelancer.

```markdown
Now, design **Page 4: Admin Dashboard** and project management.

## Page 4: Admin Dashboard

- **Welcome**: "Welcome back, [Freelancer Name]".
- **Project List**: Cards showing active projects (e.g., "Client Portal Refresh").
- **Metrics**: Quick count of "Drafts" vs "Approved" requirements across all projects.
- **Action**: A prominent "Create New Project" button.

## Page 5: Create Project Modal/Page

- **Fields**: Project Name, Client Name, Initial Phase (Discovery/Planning).
- **Transitions**: After creation, navigate to the AI Refinement Workspace.
```

### Prompt 4: AI Refinement Workspace (The Core MVP)

**Goal**: The main business logic for turn notes into stories.

```markdown
Design **Page 6: Admin AI Refinement Workspace**.

## Page 6 Requirements

- **Context**: Freelancer turning raw notes into stories for "Client Portal Refresh".
- **Sections**:
  1. **Raw Notes Input**: Large TextArea + "Refine Notes" button.
  2. **Ambiguity Review**: Notes shown with inline yellow highlights + tooltips explaining risks.
  3. **Generated Stories**: Cards with Title, "As a... I want... so that...", and Acceptance Criteria.
  4. **Approval**: "Approve Stories" button + confirmation modal.
- **States**: Empty, Loading, Draft Ready, Approved Confirmation.
```

### Prompt 5: Backlog Views & Onboarding

**Goal**: Finalize data persistence and the stakeholder experience.

```markdown
Finally, design **Page 7: Admin Backlog** and **Page 8: Viewer Backlog**.

## Page 7: Admin Backlog View (Internal)

- **Approved List**: Shows official story cards.
- **Internal Content**: Card includes an **Internal Notes** area for technical ideas (hidden from clients).
- **Action**: "Export Markdown".

## Page 8: Viewer Backlog View (Client)

- **Constraint**: Read-only access.
- **Privacy**: NO internal notes, NO drafts, NO editing actions.
- **Visual**: Clearly labeled "Viewer Mode".

## Phase 1 Onboarding

- Add tooltips to the Workspace (Page 6) explaining "Note Entry" and "Ambiguity Review".
```

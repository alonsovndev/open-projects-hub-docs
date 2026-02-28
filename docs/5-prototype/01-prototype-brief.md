# Prototype Brief (MVP)

## Goals and Success Criteria

### Goals
- Validate the MVP discovery/planning workflow for Admin and Viewer roles.
- Reduce time to turn raw notes into approved user stories with AI refinement.
- Keep Viewer visibility clear and strictly read-only.
- Produce export-ready artifacts through markdown export.

### Success Criteria
- Admin can complete: raw notes input → ambiguity highlights review → story edits → explicit approval.
- Only explicitly approved stories appear in backlog and markdown export.
- Viewer can read approved requirements and phase status (discovery/planning) with no edit controls.
- Prototype covers default, loading, ambiguity-highlighted, validation error, and approved confirmation states.

## Personas Summary

| Persona | Role in MVP | Primary Need |
| --- | --- | --- |
| Alex Rivera | Admin (freelancer) | Fast AI refinement and controlled approval of requirements |
| Jordan Lee | Viewer (client) | Clear, non-technical read-only visibility into approved requirements |
| Maya Chen | Contributor/Student (indirect) | Clear structure and terminology for maintainable, open documentation |

## MVP Pages and Sections

| Page | Key Sections |
| --- | --- |
| Sign In | Email/password form, role-aware entry |
| Dashboard | Project list, active-project limit (max 3), create/archive actions |
| Project Workspace (Admin) | Project header (client + phase), AI refinement workspace, ambiguity highlights, generated stories panel, internal notes |
| Backlog (Admin) | Draft vs approved stories, story editor, explicit approval controls |
| Backlog (Viewer) | Approved stories only, phase status, no edit/internal-notes visibility |
| Export (Admin) | Markdown export action, export preview/confirmation |

## Sitemap and Navigation Behavior

### Sitemap
- Dashboard
  - Project Workspace (Admin)
    - AI Refinement
    - Backlog (Admin)
    - Export (Markdown)
  - Backlog (Viewer)

### Navigation Behavior
- Primary nav is project-first: Dashboard → selected project workspace.
- Role-based routing:
  - Admin sees AI refinement, draft editing, explicit approval, internal notes, and markdown export.
  - Viewer sees read-only backlog and discovery/planning status only.
- On blocked actions (e.g., 4th active project), show inline guidance to archive an existing project.

## Key User Flows (Persona-Tied)

### Flow 1: Admin AI Refinement and Approval (Alex)
1. Open project in discovery/planning.
2. Paste raw notes or bullet list.
3. Run AI refinement.
4. Review ambiguity highlights inline.
5. Edit generated stories.
6. Trigger explicit approval.
7. Approved stories move to official backlog.

### Flow 2: Admin Markdown Export (Alex)
1. Open approved backlog.
2. Confirm only approved stories are included.
3. Select markdown export.
4. Download/use exported markdown requirements package.

### Flow 3: Viewer Read-Only Review (Jordan)
1. Open shared project view.
2. Review approved user stories and acceptance criteria.
3. Check current phase label (discovery/planning).
4. Exit with no edit/comment options shown.

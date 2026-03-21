---
name: "7 🗂️ Epics Creation"
about: "Define high-level epics for the project, aligned with product objectives."
title: "[epic] Epic Creation"
labels: ["epic", "planning", "documentation"]
assignees: ["product-owner"]
---

- **As a** Product Owner,
- **I want to** define high-level epics for the project,
- **So that** I can break down the development process into manageable, goal-oriented chunks.

---

## Objective

The goal of this task is to define detailed epics that organize and group related user stories into manageable high-level features. These epics provide clear objectives contributing to the product roadmap and align with both the MVP and the overall product vision.

---

## Scope

### In-Scope

1. Define epics with clear objectives aligned with the product vision.
2. Include key details such as the problem being solved, the desired outcome, and the measurable success criteria.
3. Ensure each epic aligns with existing project documentation and dependencies.
4. Group related user stories under each epic to provide clarity and structure.

### Out of Scope

1. Detailed implementation plans or technical specifications.
2. Dividing epics into granular user stories.

---

## Structure of the Epic

Each epic should follow the structure below:

1. **Epic Title** (e.g., "Create and Manage Tasks")
2. **Problem Statement**:
   - What problem does this solve for the users or the project?
3. **Objective**:
   - What is the desired outcome of this epic?
4. **Scope**:
   - What is included within this epic's scope?
   - What is explicitly excluded?

---

## Example Epic

### Title

"Implement User Collaboration Features"

### Problem Statement

Users need the ability to collaborate effectively within the task management tool, enabling real-time updates and communication.

### Objective

To create a collaborative environment that allows users to share tasks, comment, and assign responsibilities, improving productivity and teamwork.

### Scope

- **Included**:
  - Task sharing between users.
  - Real-time updates on task changes.
  - Adding comments and mentions.
- **Excluded**:
  - Detailed permissioning system for task privacy.
  - External integrations (e.g., Slack or Teams).

---

## 📁 Project Folder Output

### Folder Location

The epics should be created in the following directory:
`docs/04-user-stories/`

### Folder Content

The folder should include:

1. **Epics**:
   - Create a file named: `epics.md`
   - Define high-level epics in this file, ensuring clarity and alignment with the project goals.

2. **Example File Structure**

   ```plaintext
   ## Epics
   - Epic 1: Create and Manage Tasks
   - Epic 2: Collaborate with Team Members
   ```

---

## Dependencies

- **Project Overview** `/docs/overview.md`
- **Functional Requirements Document** `/docs/01-requirements/`
- **Non-Functional Requirements Document** `/docs/01-requirements/`
- **Role Mapping Document** `/docs/02-planning/02.02-role-mapping.md`
- **Phased Roadmap Document** `/docs/02-planning/02.01-phased-roadmap.md`
- **Architecture Solution Design Documents** `/docs/03-architecture/`
- **Database Design Document** `/docs/06-database/`

## Tasks

- [ ] Review project dependencies and requirements.
- [ ] Define at least one high-level epic aligned with the MVP.
- [ ] Create `/docs/04-user-stories/04.02-epics.md` if it does not exist.
- [ ] Add detailed epics to the file:
  - Identify related user stories.
  - Ensure epics have clear objectives, scope, dependencies, and acceptance criteria.
- [ ] Conduct a review with the product team to validate epics.

---

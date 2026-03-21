<!-- AI AGENT INSTRUCTIONS
Purpose: Define the canonical status vocabulary for all documentation artifacts in [Project Name].
Apply these statuses consistently across requirements, epics, stories, ADRs, design docs, and open questions.
Never invent new status values without adding them to this file first and notifying all owners.
-->

# Status Definitions

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |
| **Owner**        | [Tech Lead]                      |

## Purpose

This file is the single source of truth for status vocabulary used across all project documentation. Consistent statuses enable at-a-glance lifecycle tracking and phase-gate enforcement.

## Sources

- [Phase Gates](./PHASE-GATES.md)
- [Project Requirements by Feature](./01-requirements/project-requirements-by-feature.md)
- [Phased Roadmap](./02-planning/phased-roadmap.md)

---

## Document-Level Statuses

Apply these to the metadata table at the top of every documentation file.

| Status     | Meaning                                                                      | Who Sets It    |
| ---------- | ---------------------------------------------------------------------------- | -------------- |
| Draft      | Work in progress; not ready for review.                                      | Author         |
| In Review  | Ready for stakeholder review; no further authoring until review is complete. | Author         |
| Approved   | Reviewed and accepted; serves as the canonical reference for this phase.     | Tech Lead / PO |
| Superseded | Replaced by a newer version; kept for traceability only.                     | Tech Lead      |
| Archived   | No longer active; retained for audit history.                                | Tech Lead      |

---

## Requirement Statuses

Apply these to every row in FR/NFR tables in `project-requirements-by-feature.md`.

| Status    | Meaning                                                                                  | Who Sets It    |
| --------- | ---------------------------------------------------------------------------------------- | -------------- |
| Draft     | Requirement identified but not yet reviewed for completeness or testability.             | Tech Lead / PO |
| Clarified | All open questions resolved; acceptance criteria written and agreed.                     | Tech Lead      |
| Approved  | Requirements signed off; stable input for planning and architecture.                     | Tech Lead / PO |
| Changed   | Requirement modified after approval; prior version noted in change log.                  | Tech Lead      |
| Deferred  | Intentionally moved out of current phase; linked to a future phase entry in the roadmap. | Tech Lead / PO |
| Cancelled | Removed from scope with justification.                                                   | Product Owner  |

---

## Open Question Statuses

Apply these to every Q-ID row in `open-questions.md`.

| Status    | Meaning                                                            | Who Sets It    |
| --------- | ------------------------------------------------------------------ | -------------- |
| Open      | Question raised; no decision yet.                                  | Discoverer     |
| In Review | Under active discussion; decision expected before next phase gate. | Owner          |
| Resolved  | Decision made; answer documented and linked to affected artifacts. | Owner          |
| Deferred  | Decision not needed yet; linked to a future phase or milestone.    | Tech Lead / PO |

---

## Epic and Story Statuses

Apply these to epics in `04-user-stories/epics.md` and stories in `*-stories.md` files.

| Status      | Meaning                                                          | Who Sets It     |
| ----------- | ---------------------------------------------------------------- | --------------- |
| Draft       | Placeholder only; not ready for development input.               | Author          |
| Refined     | Acceptance criteria, dependencies, and story points agreed upon. | Tech Lead / Eng |
| Ready       | Fully specified, unblocked, and approved for sprint entry.       | Tech Lead       |
| In Progress | Being implemented in an active sprint.                           | Engineer        |
| Done        | Implementation complete and acceptance criteria verified.        | Tech Lead / PO  |
| Deferred    | Moved to a later phase; reason documented.                       | Product Owner   |
| Cancelled   | Removed from scope.                                              | Product Owner   |

---

## ADR Statuses

Apply these to every ADR in `03-architecture/adrs/`.

| Status     | Meaning                                                 | Who Sets It |
| ---------- | ------------------------------------------------------- | ----------- |
| Proposed   | Decision under consideration; options documented.       | Author      |
| Accepted   | Decision approved and in effect.                        | Tech Lead   |
| Superseded | Replaced by a newer ADR; link to replacement recorded.  | Tech Lead   |
| Deprecated | Decision no longer applies; context no longer relevant. | Tech Lead   |

---

## Prototype and Design Statuses

Apply these to files in `05-prototype/`.

| Status    | Meaning                                              | Who Sets It    |
| --------- | ---------------------------------------------------- | -------------- |
| Draft     | Concept only; not ready for design review.           | UI/UX Designer |
| In Review | Ready for team review and feedback.                  | UI/UX Designer |
| Approved  | Accepted as the reference design for implementation. | Tech Lead / PO |
| Iterating | Actively being revised based on review feedback.     | UI/UX Designer |
| Archived  | Superseded by a newer design; kept for reference.    | Tech Lead      |

---

## Phase Statuses

Apply these to the Phase Overview table in `02-planning/phased-roadmap.md`.

| Status      | Meaning                                                          | Who Sets It    |
| ----------- | ---------------------------------------------------------------- | -------------- |
| Planned     | Phase defined and committed to the roadmap; not yet started.     | Tech Lead / PO |
| In Progress | Active development or documentation work ongoing for this phase. | Tech Lead      |
| Done        | All phase deliverables complete; phase gate signed off.          | Tech Lead / PO |
| On Hold     | Paused due to dependency or priority change; reason documented.  | Tech Lead / PO |
| Cancelled   | Phase removed from scope; affected items deferred or cancelled.  | Product Owner  |

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

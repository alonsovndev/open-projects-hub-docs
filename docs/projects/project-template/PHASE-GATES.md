<!-- AI AGENT INSTRUCTIONS
Purpose: Define lifecycle phase gates for [Project Name].
Each gate is a mandatory quality checkpoint between documentation phases.
Replace all [placeholder] blocks with project-specific sign-off owners and criteria thresholds.
Do not advance a phase without completing all mandatory checks in the prior gate.
-->

# Phase Gates

| Attribute        | Value                            |
| ---------------- | -------------------------------- |
| **Project**      | [Project Name]                   |
| **Version**      | [vX.Y]                           |
| **Status**       | [Draft \| In Review \| Approved] |
| **Last Updated** | [YYYY-MM-DD]                     |
| **Owner**        | [Tech Lead]                      |

## How to Use (AI Agent Instructions)

- Treat each phase gate as a blocking checkpoint; work on the next phase may not begin until all mandatory checks are marked complete.
- Record sign-off in the Sign-Off Log at the bottom of this file.
- Any gate that cannot be passed must have a documented exception with a date and owner.
- Review this file at every phase kickoff to confirm prior gates remain valid.

## Sources

- [Project Overview](./overview.md)
- [Project Requirements by Feature](./01-requirements/project-requirements-by-feature.md)
- [Phased Roadmap](./02-planning/phased-roadmap.md)
- [Status Definitions](./STATUS-DEFINITIONS.md)

---

## Gate 1: Discovery Complete → Requirements Ready

**Advance from:** Discovery / kickoff  
**Advance to:** Requirements definition

### Mandatory Checks

- [ ] Problem statement and product goal documented in `overview.md`.
- [ ] At least one persona documented with job-to-be-done and pain points in `user-personas.md`.
- [ ] All open questions logged with unique Q-IDs in `open-questions.md`; none left without an owner.
- [ ] Feature list approved by Product Owner; each feature has a priority (MoSCoW) and expected outcome.

### Sign-Off

| Role          | Name   | Date         | Notes   |
| ------------- | ------ | ------------ | ------- |
| Product Owner | [Name] | [YYYY-MM-DD] | [Notes] |
| Tech Lead     | [Name] | [YYYY-MM-DD] | [Notes] |

---

## Gate 2: Requirements Approved → Planning Ready

**Advance from:** Requirements definition  
**Advance to:** Planning and roadmap

### Mandatory Checks

- [ ] All Must-priority FRs are atomic, testable, and have acceptance criteria in `project-requirements-by-feature.md`.
- [ ] All Must-priority NFRs have a quantifiable metric/target.
- [ ] Every FR and NFR has an assigned Owner (DRI).
- [ ] All Q-IDs referenced in requirements have a resolution status in `open-questions.md` (`Resolved` or `Deferred` with owner).
- [ ] Cross-cutting NFR baseline completed and approved.

### Sign-Off

| Role          | Name   | Date         | Notes   |
| ------------- | ------ | ------------ | ------- |
| Tech Lead     | [Name] | [YYYY-MM-DD] | [Notes] |
| Product Owner | [Name] | [YYYY-MM-DD] | [Notes] |

---

## Gate 3: Planning Approved → Architecture Ready

**Advance from:** Planning and roadmap  
**Advance to:** Architecture design

### Mandatory Checks

- [ ] MVP phase epics finalized with MoSCoW priorities in `phased-roadmap.md`.
- [ ] Feature Traceability Matrix complete: every Must feature links to at least one epic and one story ID.
- [ ] Role ownership matrix complete: every workstream has a named Owner (DRI) and Primary in `role-mapping.md`.
- [ ] Phase 1 and Phase 2 candidates are in the roadmap with explicit dependency notes.
- [ ] No architecture decisions required before planning sign-off; all outstanding decisions are in ADR pipeline.

### Sign-Off

| Role         | Name   | Date         | Notes   |
| ------------ | ------ | ------------ | ------- |
| Tech Lead    | [Name] | [YYYY-MM-DD] | [Notes] |
| Backend Lead | [Name] | [YYYY-MM-DD] | [Notes] |

---

## Gate 4: Architecture Approved → Stories and Prototype Ready

**Advance from:** Architecture design  
**Advance to:** Story writing and prototype

### Mandatory Checks

- [ ] All ADRs for Must-priority decisions are in `Accepted` status in `03-architecture/adrs/`.
- [ ] Architecture Domain → Requirements Coverage matrix complete; no Must FR/NFR without coverage in `README.md`.
- [ ] API contract has at least one entry per Must-priority endpoint; endpoint traceability table linked to stories.
- [ ] Sequence diagrams cover all Must-priority user flows.
- [ ] Database design has all Must entities, bounded contexts, and FR traceability populated.
- [ ] Security threat model reviewed for Must-priority data flows.

### Sign-Off

| Role             | Name   | Date         | Notes   |
| ---------------- | ------ | ------------ | ------- |
| Tech Lead        | [Name] | [YYYY-MM-DD] | [Notes] |
| Backend Engineer | [Name] | [YYYY-MM-DD] | [Notes] |
| UI/UX Designer   | [Name] | [YYYY-MM-DD] | [Notes] |

---

## Gate 5: Stories and Prototype Approved → Implementation Ready

**Advance from:** Stories and prototype  
**Advance to:** Implementation sprint

### Mandatory Checks

- [ ] All Must-priority epics have at least two refined stories (one BE, one FE) in `04-user-stories/`.
- [ ] Every BE story has Given/When/Then acceptance criteria and links to an FR/NFR.
- [ ] Prototype brief Requirements Coverage Matrix confirms all Must FRs appear in at least one screen/flow.
- [ ] Stitch prompt is finalized and references correct requirement IDs.
- [ ] Design direction document `design-direction.md` has component inventory and accessibility notes.
- [ ] Internal link validation passes with zero broken links across all `project-template/**/*.md` files.

### Sign-Off

| Role           | Name   | Date         | Notes   |
| -------------- | ------ | ------------ | ------- |
| Tech Lead      | [Name] | [YYYY-MM-DD] | [Notes] |
| UI/UX Designer | [Name] | [YYYY-MM-DD] | [Notes] |
| Product Owner  | [Name] | [YYYY-MM-DD] | [Notes] |

---

## Exception Log

If a gate check cannot be completed, document the exception here. No exceptions allowed for Must-priority items without Tech Lead approval.

| Gate | Skipped Check                  | Reason   | Owner  | Resolution Date |
| ---- | ------------------------------ | -------- | ------ | --------------- |
| [1]  | [Description of skipped check] | [Reason] | [Name] | [YYYY-MM-DD]    |

---

## Change Log

| Date         | Version | Change Summary | Author |
| ------------ | ------- | -------------- | ------ |
| [YYYY-MM-DD] | [vX.Y]  | [What changed] | [Name] |

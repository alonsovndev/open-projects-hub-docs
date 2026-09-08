---
description: Guided fill-in of docs/04-decisions — creates one ADR per significant decision from adr-template.md, asking up to 10 open questions per pass (fewer if that's enough).
---

# /docs-decisions

Guide the user through populating `docs/04-decisions/`. Prerequisite:
`docs/01-requirements/` (at least one feature doc); `docs/02-planning/` is helpful
but not required — decisions can be captured as soon as they come up.

Follow this procedure:

1. **Prerequisite check.** Confirm at least one non-template file exists in
   `docs/01-requirements/`. If not, tell the user and confirm whether to proceed
   anyway or run `/docs-requirements` first.

2. **Read the section.** Read `docs/04-decisions/README.md` (note the
   "Recommended Decision Areas" checklist and the Proposed → Accepted →
   Superseded/Deprecated lifecycle) and `adr-template.md`.

3. **Establish scope.** Cross-check the README's "Recommended Decision Areas"
   checklist against existing `adr-0XX-*.md` files to see which areas are still
   unaddressed. `/docs-architecture` also writes ADRs inline during its subfolder
   passes, so read the existing ADRs before assuming an area is open. Use this
   command for decisions that are not tied to an architecture pass, and for
   revisiting an existing ADR's status (Proposed → Accepted, superseded,
   deprecated). Ask the user (as one of your questions) which decision(s) to
   record in this pass — prefer decisions already implied by answers given in
   `/docs-requirements` or `/docs-planning` (e.g. an infrastructure choice that was
   deferred out of a feature doc) before asking about new ones.

4. **Per decision, scan and rank.** Treat the template's placeholders (context,
   decision, alternatives considered, consequences) as the open-item list. The
   decision statement and its rationale matter most; consequences can often be
   drafted from those two.

5. **Ask, capped at 10 total per command run** (across all decisions requested this
   pass). Use as few as the pass needs — often one focused question per decision is
   enough; go higher only when a decision has genuinely independent open facets.
   Ask directly in chat, batching questions into a short numbered list.

6. **Write.** Copy `adr-template.md` to `adr-0XX-<slug>.md` (numbering continues
   from the highest existing ADR). Apply clear technical-writing/Markdown practice
   (use a technical-writer/markdown-author skill or subagent if available) to fill
   in the sections covered by the answers, set status to `Proposed` or `Accepted`,
   and set the date fields. Leave uncovered sections as placeholders. Then add the
   row to the Decision Log table in
   `docs/04-decisions/README.md` and tick the matching "Recommended Decision
   Areas" item.

7. **Summarize.** List the ADRs created/updated and what's still open. Tell the
   user to run `/docs-architecture` next — it links back to these ADRs and will
   add further ADRs inline as each subfolder pass raises a decision.

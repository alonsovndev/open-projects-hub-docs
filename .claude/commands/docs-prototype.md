---
description: Guided fill-in of docs/05-prototype (prototype brief, design direction) — asks up to 10 open questions (fewer if that's enough), then writes the answers into the docs.
---

# /docs-prototype

Guide the user through completing `docs/05-prototype/`. Prerequisite:
`docs/00-context/overview.md`, `docs/01-requirements/` (feature docs), and
`docs/03-architecture/` — this is the last of the numbered sections and depends on
all three.

Follow this procedure:

1. **Prerequisite check.** Confirm `docs/00-context/overview.md` has its core
   fields filled, at least one feature doc exists in `docs/01-requirements/`, and
   `docs/03-architecture/core/` has at least the solution design/tech stack filled
   in. If any is still templated, tell the user and confirm whether to proceed
   anyway or run the relevant earlier command first.

2. **Read the section.** Read `docs/05-prototype/README.md`,
   `prototype-brief.md`, and `design-direction.md`.

3. **Scan for open items.** Prioritize: which feature(s) the prototype will cover,
   the primary user flow to demonstrate (pull from `docs/01-requirements/` and
   `docs/00-context/user-personas.md`), and the design direction basics (visual
   style, platform/device target).

4. **Ask, capped at 10.** Use as few as the section needs — often 5 or fewer is
   plenty. Ask the user interactively (e.g., using `ask_question` in Antigravity,
   `AskUserQuestion` in Claude Code, or standard conversational prompts in Copilot/OpenCode).
   Always include a tool-selection question: which tool the engineer plans to use to
   create the prototype — **Stitch** (hosted, no local file), **pen.dev / Pencil**
   (`.pen` file in `pen/`), **simple mockups** (ASCII, inline in the brief), **draw.io**
   (`.drawio` file in `drawio/`), or **other**.

5. **Write.** Use `technical-writer` and `markdown-author` skills. Edit
   `prototype-brief.md` and `design-direction.md` directly with the answers,
   update status/date fields, and record the selected tool in the **Prototyping Tool**
   row of `prototype-brief.md`'s attribute table. Leave uncovered sections as
   placeholders. Do not create or edit the actual prototype files (e.g., `.pen`,
   `.drawio`) — creating the prototype is a separate step outside this command's scope.

6. **Summarize.** List what was written and what's still open. Note that the
   remaining step in `docs/intro.md` (work items in Jira) is external to this repo
   and not covered by these commands — point to `examples/work-items/` as a
   reference for that format if useful.

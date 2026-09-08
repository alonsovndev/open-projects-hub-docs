---
mode: agent
description: Guided fill-in of docs/03-architecture — one subfolder per run (core → database → contracts → security → ops → diagrams), ≤10 questions per pass, drafting ADRs into 04-decisions as decisions come up.
---

# /docs-architecture

Guide the user through populating `docs/03-architecture/`. Prerequisite:
`docs/01-requirements/` (at least one feature doc) and ideally `docs/04-decisions/`
(architecture docs should link to ADRs, not restate decisions inline).

This section is large (6 subfolders), so run **one subfolder per invocation** — do
not attempt the whole section in one go.

Authoring pass order: **core → database → contracts → security → ops → diagrams**.
Diagrams come last because they synthesize the other passes; this differs from the
reader-facing order in `docs/03-architecture/README.md`, where diagrams sit second
— that difference is intentional.

- If the user named a subfolder when invoking the command, start with that one.
- Otherwise, report which subfolders already look complete and run the earliest
  incomplete one in the authoring order above.
- Run additional passes in the same invocation only if the user explicitly asks;
  by default stop after one pass and offer the next.

For this pass:

1. **Read** the subfolder's `README.md` and content file(s)
   (`core/architecture-solution-design.md`, `core/architecture-styles.md`,
   `core/technology-stack.md`; `database/database-design.md`;
   `contracts/contract-design-standards.md`, `contracts/contract-catalog.md`;
   `security/security-architecture.md`, `security/threat-model.md`;
   `ops/deployment-architecture.md`, `ops/ci-cd-pipeline.md`,
   `ops/monitoring-observability.md`; `diagrams/sequence-diagrams.md`).

2. **Cross-reference** against `docs/01-requirements/` feature docs and
   `docs/04-decisions/` ADRs — architecture content should implement/reference
   those, not invent new scope. Note the coverage matrix in
   `docs/03-architecture/README.md` (§7, Domain → Requirements) as the
   authoritative link between FR/NFR IDs and ADR IDs; keep it updated if this
   pass adds or resolves items it references.

3. **Scan and rank** this subfolder's placeholders; prioritize whichever
   decisions most constrain the rest of the subfolder (e.g. in `core`:
   architecture style and tech stack before secondary design notes; in
   `security`: authn/authz model before secondary threat entries).

4. **Ask, capped at 10 for this pass.** Use as few as the subfolder needs — often
   5 or fewer covers a subfolder; go up to 10 only when it genuinely has that many
   independent open items. Ask directly in chat, batching questions into a short
   numbered list. In the `contracts` pass, always include a Contract Type
   question early — REST API, CLI, gRPC, Event/Message, Library/SDK, or a
   combination — since it shapes every other answer in that pass. If an earlier
   pass — including an earlier invocation of this command — already answered
   something relevant (e.g. tech stack chosen in `core` also answers a
   `database` question), read it back from the written docs and ADRs instead of
   asking again.

5. **Capture decisions as ADRs in this same pass.** Treat an answer as ADR-worthy
   when it matches an item in the "Recommended Decision Areas" checklist in
   `docs/04-decisions/README.md`, constrains a later pass, or is expensive to
   reverse. For each one:

   - Copy `docs/04-decisions/adr-template.md` to `adr-0XX-<slug>.md`, numbering
     continuing from the highest existing ADR.
   - Fill context, decision, alternatives considered, and consequences from this
     pass's answers; set status (`Proposed` or `Accepted`) and the date fields.
     Leave genuinely unknown sections as placeholders.
   - Add the row to the Decision Log table in `docs/04-decisions/README.md` and
     tick the matching "Recommended Decision Areas" item.

   Spend extra questions here only when a decision's rationale or alternatives are
   missing; any such question counts against this pass's cap of 10.

6. **Write.** Apply clear technical-writing/Markdown practice for prose (use a
   technical-writer/markdown-author chat mode or extension if available), and
   follow Mermaid best practices for any diagram edits (chiefly
   `diagrams/sequence-diagrams.md`). Edit files directly, update status/date
   fields, and link to the ADRs from step 5 instead of restating their rationale —
   update the "Source References" section and the §7 coverage matrix "Key ADR(s)"
   column in `docs/03-architecture/README.md` accordingly. Leave uncovered
   sections as placeholders.

7. **Summarize and stop.** List what was written in this subfolder, the ADRs
   created or updated, and what's still open. Name the next subfolder in the
   authoring order and offer to run it (re-run `/docs-architecture`, optionally
   with the subfolder name). Once all six subfolders are done, tell the user to
   run `/docs-prototype` next.

# AI Workspace Setup

This repository uses a small canonical AI setup for documentation work.

## Canonical Agents

- `product-owner`: discovery, requirements, prioritization, PRDs, roadmap planning, and user stories.
- `tech-lead`: architecture, API design, backend and frontend technical planning, deployment, observability, and database design.
- `ui-ux-designer`: user flows, prototype briefs, design specifications, accessibility, and Stitch prompting.

## Skill Layout

- `.github/skills/docs-only-guardrails/SKILL.md`
- `.github/skills/product-owner-playbook/SKILL.md`
- `.github/skills/technical-design-playbook/SKILL.md`
- `.github/skills/database-design-playbook/SKILL.md`
- `.github/skills/ui-ux-design-playbook/SKILL.md`
- `.github/skills/stitch-prototype-prompting/SKILL.md`

## Prompt Layout

- `.github/prompts/markdown-format-refiner.prompt.md`

### Prompt Usage

- In chat, type `/` and select **markdown-format-refiner**.
- Provide target file path(s) and optional strictness: `light`, `standard`, or `strict`.
- Use this prompt to check and refine Markdown formatting while preserving original meaning.

## Design Principles

- Keep shared guidance in skills, not duplicated in every agent.
- Use compatibility aliases only to avoid breaking older templates.
- Prefer updating existing project docs over creating overlapping guidance.
- Treat this repository as documentation-only.

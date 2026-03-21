# GitHub Copilot Instructions for Open Projects Hub Docs

This repository is a freelance documentation hub. Use GitHub Copilot to create, refine, and maintain documentation assets only.

## Operational Guardrails

- Produce Markdown documents, ADRs, diagrams, templates, prompts, and reference snippets.
- Do not implement application features, scaffold production code, run migrations, or execute app build and test workflows for this repository.
- Reuse and extend existing docs before creating new parallel guidance.

## Instruction Order

Follow instructions in this order:

1. `AGENTS.md`
2. Canonical docs under `docs/`
3. Shared skills under `.github/skills/`
4. Agent files under `.github/agents/`

## Canonical Agent Model

- `product-owner`: planning, discovery, requirements, roadmap, PRDs, user stories
- `tech-lead`: architecture, API design, backend and frontend technical planning, database design, deployment, observability
- `ui-ux-designer`: user flows, prototypes, design specs, accessibility, Stitch prompting

## Repository Standards

- Use lowercase hyphenated file names.
- Keep content concise, structured, and easy to scan.
- Use tables and Mermaid only when they improve clarity.
- Keep code examples illustrative and aligned with Clean Architecture and DDD guidance documented in the repo.
- Prefer references to shared skills instead of duplicating long role guidance.

## Primary Use Cases

- Project kickoff and discovery documentation
- Functional and non-functional requirements
- Architecture decision records and technical design notes
- API standards and contracts
- User stories, roadmaps, and role-specific planning artifacts
- UI and prototype briefs, including Stitch-ready prompts

## License

This repository is proprietary and confidential. All contents are copyright Naranjo Solutions. Unauthorized copying, distribution, or modification is prohibited.

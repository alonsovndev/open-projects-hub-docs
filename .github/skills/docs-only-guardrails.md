# Docs-Only Guardrails

This repository is a documentation hub. All agent behavior must respect that constraint.

## Core Rules

- Produce Markdown documents, architecture notes, diagrams, templates, and reference snippets.
- Do not implement application features, scaffold production folders, run migrations, or execute app build/test workflows for this repository.
- If code is included, keep it as a documentation snippet or example only.
- Search existing docs before creating new guidance to avoid contradictions.
- Prefer updating an existing document over creating a duplicate file.

## Instruction Precedence

Follow guidance in this order:

1. `AGENTS.md`
2. Canonical project docs in `docs/`
3. Shared skills in `.github/skills/`
4. System-specific agent files in `.github/agents/` and `.opencode/agents/`

## Output Rules

- Keep responses concise and structured.
- Avoid repeating context already available in the repository or conversation.
- Use headings, bullets, tables, and Mermaid only when they improve clarity.
- Write or update files only when the task calls for repository documentation changes.

# Repository Agent Instructions

This file contains repository-specific rules and preferences.

## Scope

- Apply only to this repository.
- Do not duplicate global rules from ${HOME}/.config/opencode.

## What to Define Here

1. Domain boundaries and terminology for this repo
2. Build, test, and lint commands
3. Security and data constraints unique to this repo
4. Performance and reliability goals
5. Any local conventions not already covered globally

## Token Discipline

- Keep this file short.
- Link to local docs instead of copying large guides.
- Add only rules that are specific to this repository.

## Repository Scope

**This repository is the single source of truth for requirements specification.**

### What This Repository Contains

- ✅ Functional and non-functional requirements
- ✅ User flows and acceptance criteria
- ✅ Business rules and constraints
- ✅ Cross-cutting quality baselines
- ✅ Terminology and glossary
- ✅ Infrastructure decisions that impact requirements scope

### What This Repository Does NOT Contain

- ❌ Implementation code or technical design details
- ❌ Deployment scripts or CI/CD pipelines
- ❌ Test implementation code
- ❌ API client libraries or SDKs

### Relationship to Implementation

Requirements in this repository must be implementation-agnostic where possible, but may specify infrastructure choices that constrain implementation (e.g., Supabase for database, Render for hosting) when those decisions impact scope, timelines, or feature feasibility.

## Docusaurus Site

This repo is also the source for its own documentation *site* (Docusaurus, `docs/` as
content root). This is distinct from the product CI/CD documented under
`docs/03-architecture/ops/` — `.github/workflows/deploy.yml` builds and publishes this
docs site itself, not the Open Projects Hub product.

- Follow the existing numbered top-level structure (`00-context` … `06-work-items`) and
  each folder's `_category_.json` / `README.md` conventions when adding new pages.
- `npm run build` must pass with zero broken-link/anchor errors before considering a
  docs change complete (`onBrokenLinks`/`onBrokenAnchors: "throw"` in
  `docusaurus.config.ts`).
- Use the `technical-writer`, `markdown-author`, and `mermaid-author` skills for
  drafting/reviewing content — see also root `CLAUDE.md`.

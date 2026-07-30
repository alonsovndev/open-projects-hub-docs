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

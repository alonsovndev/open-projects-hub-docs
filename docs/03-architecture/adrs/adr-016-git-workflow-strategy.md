# ADR-016: Git Workflow and Branch Strategy

- **Status**: Accepted
- **Date**: 2026-08-04
- **Updated**: 2026-08-07

## Context

The project requires clear git conventions to support collaboration between a small core team (1-3 developers) and potential external contributors, while maintaining code quality and traceability. Key constraints: GitHub free tier, $0 tooling cost, and low friction for rapid iteration.

The team needs a workflow that separates development integration from production releases, provides review gates with increasing rigor, and keeps the upstream repository clean. All contributors should follow the same contribution model regardless of access level.

## Decision

Adopt a **two-branch model (`dev` + `main`)** with **fork-based contributions**, **standard merge commits**, **Conventional Commits**, and **tag-based production deployment**.

**Summary:**

- **Two permanent branches**: `dev` (integration) and `main` (production). No direct pushes — all changes arrive via pull request from a fork.
- **Fork workflow**: All contributors (core and external) fork the upstream repository and submit PRs from their fork. No one pushes directly to upstream.
- **Two-tier PR flow**: Feature branches merge into `dev` (1 approval). A separate release PR promotes `dev` into `main` (2 approvals).
- **Standard merge commits**: Preserves full feature branch history for traceability and easier rollback.
- **Conventional Commits**: `<type>(<scope>): <description>` format enforced via CI on PR titles.
- **Tag-based deployment**: Merge to `main` builds and freezes a production candidate. A semantic version tag (`vX.Y.Z`) on `main` triggers the production deployment pipeline.

For the full operational workflow — branch naming, fork setup, PR conventions, branch protection rules, commit types, hotfix process, and pipeline stages — see [CI/CD Pipeline Architecture](../ops/ci-cd-pipeline.md).

## Consequences

### Positive

- Two-branch model separates integration (`dev`) from production (`main`), absorbing development churn before reaching users.
- Two-tier PR flow (1 approval → dev, 2 approvals → main) provides increasing review rigor closer to production.
- Fork-based model ensures consistent workflow for all contributors and prevents accidental upstream pushes.
- Tag-based deployment creates a deliberate release gate: merge builds a candidate, tag deploys it.
- Standard merge commits preserve traceable history and make rollback straightforward (revert a single merge commit).
- Protected branches and CI gates prevent bad code from reaching either `dev` or `main`.

### Negative

- Two-branch model adds an extra promotion step (dev → main PR) compared to trunk-based development.
- Merge commits create noisier history than squash/rebase strategies.
- Fork sync maintenance is required — contributors must keep their fork's `dev` current with upstream.
- Team must learn Conventional Commits and fork workflow.

## Alternatives Considered

### 1. Squash Merge Strategy

Considered for clean, linear commit history with single commit per PR. Not selected because it loses intermediate commit history from feature branches, making debugging harder. User preference for full history preservation.

### 2. Rebase Merge Strategy

Considered for linear history without merge commits. Not selected because it rewrites commit SHAs, adds complexity for contributors unfamiliar with interactive rebase, and merge commits provide clearer integration points for rollback and bisect.

### 3. Single-Branch Trunk-Based Development

Considered for simplicity with only `main` and no `dev` branch. Not selected because it lacks a dedicated integration branch for features to converge and bake, and provides no intermediate release gate before production. The `dev` → `main` → tag flow adds safety with minimal additional friction.

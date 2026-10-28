# ADR-016: Git Workflow and Branch Strategy

- **Status**: Accepted
- **Date**: 2026-08-04

## Context

The project requires clear git conventions to support collaboration between a small core team (1-3 developers) and potential external contributors, while maintaining code quality and traceability. Key constraints: GitHub free tier, $0 tooling cost, and low friction for rapid iteration.

The team needs a workflow that separates development integration from production releases, provides review gates with increasing rigor, and keeps the upstream repository clean. All contributors should follow the same contribution model regardless of access level.

## Decision

Adopt a **two-branch model (`dev` + `main`)** with **fork-based contributions**, **standard merge commits**, **Conventional Commits**, and **tag-based releases**.

**Summary:**

- **Two permanent branches**: `dev` (integration) and `main` (production). No direct pushes: all changes arrive via pull request from a fork.
- **Fork workflow**: All contributors (core and external) fork the upstream repository and submit PRs from their fork. No one pushes directly to upstream.
- **Two-tier PR flow**: Feature branches merge into `dev`. A separate release PR promotes `dev` into `main`, with stricter review.
- **Standard merge commits**: Preserves full feature branch history for traceability and easier rollback.
- **Conventional Commits**: `<type>(<scope>): <description>` format.
- **Tag-based releases**: A semantic version tag (`vX.Y.Z`) on `main` publishes the API image to GHCR. The operator then deploys it by hand with `scripts/deploy-release.sh <tag>` ([ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md)). The web app and this documentation site are published by Cloudflare Builds from GitHub ([ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md)).

For the full operational workflow (branch naming, fork setup, PR conventions, branch protection rules, commit types, hotfix process, and pipeline stages) see [CI/CD Pipeline Architecture](../03-architecture/ops/ci-cd-pipeline.md).

## Consequences

### Positive

- The two-branch model separates integration (`dev`) from production (`main`), absorbing development churn before it reaches users.
- The two-tier PR flow provides increasing review rigor closer to production.
- The fork-based model ensures a consistent workflow for all contributors and prevents accidental upstream pushes.
- Tagging and deploying are separate steps, so a release is a deliberate gate: a tag builds the image, a person deploys it.
- Standard merge commits preserve traceable history and make rollback straightforward (revert a single merge commit).

### Negative

- The two-branch model adds an extra promotion step (dev → main PR) compared to trunk-based development.
- Merge commits create noisier history than squash/rebase strategies.
- Fork sync maintenance is required: contributors must keep their fork's `dev` current with upstream.
- The team must learn Conventional Commits and the fork workflow.
- Hosted branch protection and approval counts are repository settings, not code, and are not verified by this documentation.

## Alternatives Considered

### 1. Squash Merge Strategy

Considered for a clean, linear commit history with a single commit per PR. Not selected because it loses intermediate commit history from feature branches, making debugging harder.

### 2. Rebase Merge Strategy

Considered for a linear history without merge commits. Not selected because it rewrites commit SHAs, adds complexity for contributors unfamiliar with interactive rebase, and merge commits provide clearer integration points for rollback and bisect.

### 3. Single-Branch Trunk-Based Development

Considered for simplicity with only `main` and no `dev` branch. Not selected because it lacks a dedicated integration branch for features to converge and bake, and provides no intermediate release gate before production. The `dev` → `main` → tag flow adds safety with minimal additional friction.

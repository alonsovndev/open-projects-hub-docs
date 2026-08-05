# ADR-016: Git Workflow and Branch Strategy

**Status**: Accepted  
**Date**: 2026-08-04

## Context

The project requires clear git conventions to support collaboration between core team members and external contributors while maintaining code quality and traceability.

**Team Structure:**
- MVP Phase: 1-3 core developers with direct repository access
- Post-MVP: Potential external contributors (students, open-source community)
- Small, co-located team with async collaboration needs

**Problems:**
- Inconsistent commit messages make history hard to navigate and debug
- Unclear branching strategy leads to merge conflicts and confusion
- No defined process for PR review and approval
- Risk of breaking changes merged directly to production (main branch)
- Need balance between traceability and development velocity

**Constraints:**
- Must work with GitHub free tier (no advanced branch protection features beyond basic rules)
- Must support both core team (direct repo access) and external contributors (forks)
- Must maintain $0 cost (no paid git workflow tools or services)
- Must balance speed of iteration with code quality gates
- Cannot add significant friction to local development workflow

**Requirements:**
- Traceable commit history for debugging and rollback
- Structured commit messages following industry standards
- Branch protection preventing direct pushes to main
- PR review process with automated quality checks
- Clear branching conventions for different change types
- Preserve full feature branch history for debugging

## Decision

Adopt a **standard merge commit workflow** with Conventional Commits and branch protection:

**Branching Strategy:**
- **Main branch**: `main` (protected, always deployable)
- **Feature branches**: `feature/<short-description>` (e.g., `feature/ai-refinement-ui`)
- **Bug fixes**: `fix/<issue-description>` (e.g., `fix/login-redirect-loop`)
- **Documentation**: `docs/<topic>` (e.g., `docs/update-readme`)
- **Refactoring**: `refactor/<component>` (e.g., `refactor/auth-service`)
- **Tests**: `test/<scope>` (e.g., `test/auth-endpoints`)
- **Chores**: `chore/<task>` (e.g., `chore/update-dependencies`)

**Commit Message Convention:**
- **Standard**: Conventional Commits (https://www.conventionalcommits.org/)
- **Format**: `<type>(<scope>): <description>`
- **Types**:
  - `feat`: New feature for users
  - `fix`: Bug fix
  - `docs`: Documentation only changes
  - `style`: Code formatting, whitespace (no logic change)
  - `refactor`: Code change with no functional change
  - `test`: Adding or updating tests
  - `chore`: Build process, tooling, dependencies
  - `perf`: Performance improvements
  - `ci`: CI/CD configuration changes
- **Examples**:
  - `feat(auth): add JWT refresh token rotation`
  - `fix(ui): resolve modal close button alignment`
  - `docs(adr): add code quality tooling strategy`
  - `refactor(api): extract validation logic to shared module`

**Merge Strategy:**
- **Standard merge commits** (not squash, not rebase)
- Preserves full commit history from feature branch
- Creates explicit merge commit with PR reference in message
- Rationale: Full traceability for debugging and rollback; easier to revert entire feature

**Branch Protection Rules (main):**
- ❌ Direct pushes disabled — all changes via pull request
- ✅ Require PR review: 1 approval minimum (when team > 1 developer)
- ✅ Require status checks: All CI checks must pass (lint, test, type-check)
- ✅ Require branch up-to-date: Must rebase or merge latest `main` before merge
- ❌ No required signed commits (adds setup friction for MVP)
- ✅ Dismiss stale reviews when new commits pushed

**Pull Request Workflow:**
1. Create feature branch from latest `main`
2. Make focused changes (one concern per PR)
3. Commit following Conventional Commits format
4. Push branch and open PR targeting `main`
5. Automated CI runs (lint, format, type-check, tests)
6. Request review from team member (if team size > 1)
7. Address review feedback with additional commits
8. Ensure branch is up-to-date with `main` (rebase or merge)
9. Merge via standard merge commit after approval + passing checks

**Fork vs. Branch Strategy:**
- **Core team**: Use branches directly in main repository
- **External contributors**: Fork repository, submit PR from fork to upstream main
- Rationale: Core team has write access; external contributors follow standard open-source workflow

**Commit Message Enforcement:**
- **CI validation**: GitHub Actions checks PR title follows Conventional Commits format
- **No local enforcement**: No commitlint pre-commit hook (reduces developer friction)
- **Education**: CONTRIBUTING.md documents format with clear examples
- **Rationale**: PR title becomes merge commit message; CI validation sufficient guard

## Consequences

### Positive

- Clear commit history with traceable changes via Conventional Commits
- Full feature branch history preserved (helpful for debugging multi-commit features)
- Protected main branch prevents accidental breaking changes
- Automated quality gates (CI) prevent bad code from merging
- Flexible workflow supports both internal team and external contributors
- Standard merge commits make rollback straightforward (revert single merge commit)
- No local commit message enforcement reduces developer friction during rapid iteration
- Explicit merge commits show clear integration points in git history
- Branch naming convention makes it easy to understand PR purpose at a glance

### Negative

- Merge commits create "noisy" history compared to squash/rebase strategies
- Full feature branch history preserved (including "WIP" and "fix typo" commits)
- PR titles must follow Conventional Commits (can be forgotten without local enforcement)
- Standard merges may create more merge commits than linear history approaches
- Team must learn Conventional Commits format (small learning curve)
- No automated changelog generation without additional tooling (e.g., conventional-changelog)
- Reviewing feature branches with many small commits requires extra attention

## Alternatives Considered

**1. Squash Merge Strategy**
- Considered for clean, linear commit history with single commit per PR
- Not selected because:
  - Loses intermediate commit history from feature branch
  - Harder to debug when feature branch had logical progression across multiple commits
  - Difficult to cherry-pick specific changes from a squashed commit
  - User preference for full history preservation for traceability

**2. Rebase Merge Strategy**
- Considered for linear history without merge commits (cleaner git log)
- Not selected because:
  - Rewrites commit history (changes commit SHAs)
  - More complex for contributors unfamiliar with interactive rebase
  - Merge commits provide clear "merge points" for rollback and bisect operations
  - User preference for standard merge commits with explicit integration points

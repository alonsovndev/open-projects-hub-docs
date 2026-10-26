# Work Items & Epics

Jira-bound epics and stories for Open Projects Hub, generated from the documentation in
`docs/`. These files are the import source for Jira and are **not** published to the
documentation site.

Each epic folder contains:

- `epic.md`: epic metadata, description, scope, requirement traceability, dependencies,
  measurable success criteria, and a release checklist.
- `stories.md`: the epic's stories and spikes, grouped by the role that owns them.

## Conventions

These conventions are used consistently across every epic and story file.

### Identifiers

| Item | Format | Example |
| --- | --- | --- |
| Epic key | `EPIC-<n>` | `EPIC-3` |
| Story | `US-EP<n>-<ROLE>-<nnn>` | `US-EP3-BE-002` |
| Spike | `US-EP<n>-SP-<nnn>` | `US-EP0-SP-001` |
| Release effort | `US-EP<n>-REL-<nnn>` | `US-EP3-REL-001` |

Role codes: `BE` Backend Engineer, `FE` Frontend Engineer, `UX` UI/UX Designer,
`QA` QA / Test Ownership, `PO` Product Owner, `SP` spike, `REL` release effort.
Sequence numbers are assigned per epic, per role.

### Field vocabulary

| Field | Allowed values | Jira mapping |
| --- | --- | --- |
| `Issue Type` | `Story`, `Spike`, `Task` | Issue Type |
| `Priority` | `Must Have`, `Should Have`, `Could Have` | Priority |
| `Status` | `TODO`, `IN PROGRESS`, `DONE`, `DEFERRED`, `SUPERSEDED` | Status |
| `Effort Estimate` | Fibonacci story points: 1, 2, 3, 5, 8 (13 must be split) | Story Points |
| `Fix Version` | `MVP-1`, `Phase 1` | Fix Version |
| `Components` | `Backend`, `Frontend`, `Database` | Components |
| `Labels` | lowercase kebab-case, comma separated | Labels |
| `Requirements` | `FR-*` / `NFR-*` IDs from `docs/01-requirements/` | custom field or label |
| `Epic Link` | the parent `EPIC-<n>` key | Epic Link |

Owner is expressed by the role group heading a story sits under, since
`docs/02-planning/role-mapping.md` defines roles rather than named assignees. Assignees are
set at import time.

Statuses reflect the code in `open-projects-hub-api` and `open-projects-hub-web` as of
2026-10-07; the release (`REL`) and deployment items were updated on 2026-10-19. Release (`REL`) stories stay `TODO` until each epic is released. The deployment
path they describe is the real one (tag, GHCR image, `scripts/deploy-release.sh` over SSM;
web and docs published by Cloudflare Builds); the API `v0.1.0` has been deployed that way. An epic is
`DONE` only when every story in it is done, so most epics read `IN PROGRESS` until their
release story ships.

**Terminology.** Stories written before 2026-10-02 refer to a **Viewer** role: an invited,
read-only client account. [ADR-020](../docs/04-decisions/adr-020-client-review-by-access-code.md)
replaced it with account-free Client Review through a project access code, and the shipped roles
are Admin and Member. Where a story says "Viewer", the shipped equivalent is the public Client
Review page (`/viewer/:accessCode`), which shows one project's approved stories and nothing else.

### Sizing anchors

| Points | Anchor |
| --- | --- |
| 1 | Config or copy change, single file, no new behavior |
| 2 | Small change on one surface, no new integration |
| 3 | Small feature slice, one component, straightforward tests |
| 5 | Standard story: one component plus its tests and error paths |
| 8 | Multi-component work, or one component with substantial edge cases |
| 13 | Too large or too uncertain — split before it enters a sprint |

`Fix Version` is set per story, not only per epic, because several epics have a core slice in
MVP-1 and a deferred tail in Phase 1. Each `epic.md` records the span its stories cover.

### Story structure

Every story carries, in order: the metadata block, the `As a / I want to / So that`
statement, `Acceptance Criteria` as Given/When/Then checkboxes, `Deliverables`,
`Dependencies`, and `Success Metrics`.

### Traceability

Every functional and non-functional requirement documented in `docs/01-requirements/`
(123 IDs: 76 `FR-*`, 37 feature-level `NFR-*`, 10 cross-cutting `NFR-X*`) is referenced by
at least one story's `Requirements` field. Foundational and release items that implement no
documented requirement state that explicitly rather than leaving the field blank.

### Release efforts

Each feature (F-001 to F-011) has its own `REL` story inside that feature's epic, covering
the real deployment path documented in `docs/03-architecture/ops/`: release PR `dev` to
`main` with required checks, migration compatibility review,
semver tag, GHCR image, manual deploy with `scripts/deploy-release.sh`, Cloudflare publish
for the web, production smoke test, optional Sentry release, and a documented rollback.
There is **no staging environment** (see ADR-014).

## Epic Index

Points are split by the `Fix Version` on each story: an epic can contribute to both phases.

| Epic | Summary | Stories | MVP-1 pts | Phase 1 pts |
| --- | --- | --- | --- | --- |
| [EPIC-0](./EPIC-0-foundational/epic.md) | Foundational project structure, local environment, and deployment baseline. | 11 | 64 | — |
| [EPIC-1](./EPIC-1-lifecycle-governance/epic.md) | Client and project lifecycle governance. | 9 | 40 | — |
| [EPIC-2](./EPIC-2-user-authentication/epic.md) | Authentication: login, password reset, sessions. | 10 | 48 | — |
| [EPIC-3](./EPIC-3-ai-refinement/epic.md) | Controlled refinement workflow from notes to approved stories. | 9 | 37 | 5 |
| [EPIC-4](./EPIC-4-access-boundaries/epic.md) | Admin and Member boundary enforcement (the Viewer role was removed by ADR-020). | 4 | 18 | — |
| [EPIC-5](./EPIC-5-backlog-export/epic.md) | Structured backlog viewing and Markdown export. | 7 | 24 | 3 |
| [EPIC-6](./EPIC-6-ai-monetization-config/epic.md) | AI credit tracking and user-managed API keys. | 9 | — | 45 |
| [EPIC-7](./EPIC-7-viewer-collaboration-lifecycle/epic.md) | **Superseded by ADR-020.** Viewer invitation, registration, and project access, replaced by account-free Client Review via a project access code. | 9 | 42 | 5 |
| [EPIC-8](./EPIC-8-entry-flow/epic.md) | Onboarding, landing page, and account creation flows. | 13 | — | 45 |
| [EPIC-9](./EPIC-9-quality-baseline/epic.md) | Cross-cutting quality baseline and validation. | 11 | 27 | 26 |
| [EPIC-11](./EPIC-11-ui-craft/epic.md) | Interface craft above component-library defaults. | 9 | — | 39 |
| [EPIC-12](./EPIC-12-code-quality/epic.md) | Automated code quality baseline across both stacks. | 7 | 17 | 6 |

**Totals**: 12 epics, 108 stories, 491 story points — **317 in MVP-1** (67 stories) and
**174 in Phase 1** (41 stories).

## Delivery capacity

EPIC-0's 64 points are already delivered (Phase -1 and Phase 0 are complete in the roadmap),
leaving **253 points of remaining MVP work** at the time of writing (317 − 64). At the roadmap's stated basis of 2 developers
and ~12 points each per week, that is roughly **10-11 weeks**, which is why `NFR-X08` was
revised from 1–1.5 months to 2.5 months rather than left as a target the plan would miss.

Scope already deferred to Phase 1 to reach that number: all of `F-010` (credits and API
keys), provider selection in refinement, export scoping, the Viewer management tail, the
validation and accessibility test pass, and the architecture guard tests. Cutting further
means removing part of the core loop, which would leave no shippable end-to-end workflow.

## Documentation reconciliation

Five defects found while reconciling these work items against `docs/` have been corrected in
the documentation itself:

1. `docs/02-planning/phased-roadmap.md` cited a phantom `NFR-011-06`; the row now enumerates
   `NFR-011-01` to `NFR-011-05`.
2. `docs/03-architecture/ops/ci-cd-pipeline.md` claimed no local hooks exist; it now reflects
   ADR-015 (pre-commit hooks for code quality, CI as the authoritative gate) while keeping
   commit *messages* hook-free.
3. `docs/01-requirements/README.md` `NFR-X03` now states that coverage is measured and
   reported per pull request as a target, not enforced as a merge-blocking gate (ADR-015).
   `docs/04-decisions/adr-010-testing-framework.md` was corrected to match, and to cite
   `NFR-X03` rather than the non-existent `NFR-003`.
4. `docs/05-prototype/design-direction.md` traceability now cites real story IDs.
5. The roadmap's phase tables now enumerate each feature's full requirement set, and the
   feature traceability matrix is regenerated from these work items, including EPIC-11
   and EPIC-12.

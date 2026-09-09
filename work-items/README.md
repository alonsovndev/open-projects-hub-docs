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
| `Status` | `TODO` | Status |
| `Effort Estimate` | Fibonacci story points: 1, 2, 3, 5, 8, 13 | Story Points |
| `Fix Version` | `MVP-1`, `Phase 1` | Fix Version |
| `Components` | `Backend`, `Frontend`, `Database` | Components |
| `Labels` | lowercase kebab-case, comma separated | Labels |
| `Requirements` | `FR-*` / `NFR-*` IDs from `docs/01-requirements/` | custom field or label |
| `Epic Link` | the parent `EPIC-<n>` key | Epic Link |

Owner is expressed by the role group heading a story sits under, since
`docs/02-planning/role-mapping.md` defines roles rather than named assignees. Assignees are
set at import time.

### Story structure

Every story carries, in order: the metadata block, the `As a / I want to / So that`
statement, `Acceptance Criteria` as Given/When/Then checkboxes, `Deliverables`,
`Dependencies`, and `Success Metrics`.

### Traceability

Every functional and non-functional requirement documented in `docs/01-requirements/`
(124 IDs: 76 `FR-*`, 37 feature-level `NFR-*`, 11 cross-cutting `NFR-X*`) is referenced by
at least one story's `Requirements` field. Foundational and release items that implement no
documented requirement state that explicitly rather than leaving the field blank.

### Release efforts

Each feature (F-001 to F-011) has its own `REL` story inside that feature's epic, covering
the real deployment path documented in `docs/03-architecture/ops/`: release PR `dev` to
`main` with two approvals, sha-tagged candidate image, migration compatibility review,
semver tag, `terraform apply`, App Runner rolling deploy, CloudFront invalidation,
production smoke test, Sentry release, release-health watch, and a documented rollback.
There is **no staging environment** (see ADR-014).

## MVP Epics (Phase 0 + MVP)

| Epic | Summary | Stories | Points |
| --- | --- | --- | --- |
| [EPIC-0](./EPIC-0-foundational/epic.md) | Establish foundational project structure, local environment setup, and deployment baseline. | 11 | 58 |
| [EPIC-1](./EPIC-1-lifecycle-governance/epic.md) | Provide stable client and project lifecycle governance. | 8 | 42 |
| [EPIC-2](./EPIC-2-user-authentication/epic.md) | Implement secure user authentication mechanisms (login, password reset, sessions). | 10 | 50 |
| [EPIC-3](./EPIC-3-ai-refinement/epic.md) | Create a controlled refinement workflow for converting client notes into approved user stories. | 9 | 45 |
| [EPIC-4](./EPIC-4-access-boundaries/epic.md) | Enforce Admin and Viewer boundaries for safe collaboration. | 4 | 21 |
| [EPIC-5](./EPIC-5-backlog-export/epic.md) | Enable structured backlog viewing and Markdown export. | 7 | 27 |
| [EPIC-6](./EPIC-6-ai-monetization-config/epic.md) | Provide AI credit tracking and user-managed API key configuration. | 9 | 45 |
| [EPIC-7](./EPIC-7-viewer-collaboration-lifecycle/epic.md) | Implement Viewer invitation, registration, and project access lifecycle. | 9 | 43 |
| [EPIC-9](./EPIC-9-quality-baseline/epic.md) | Enforce cross-cutting quality baselines (security, session, email, coverage, performance, accessibility, scope governance). | 9 | 38 |
| [EPIC-12](./EPIC-12-code-quality/epic.md) | Automate the code quality baseline across both stacks so defects are caught before review. | 7 | 30 |

## Phase 1 Epics

| Epic | Summary | Stories | Points |
| --- | --- | --- | --- |
| [EPIC-8](./EPIC-8-entry-flow/epic.md) | Improve first-use quality through onboarding, landing page, and account creation flows. | 13 | 60 |
| [EPIC-10](./EPIC-10-seo-discoverability/epic.md) | Make the public entry pages discoverable, correctly previewed when shared, and fast. | 6 | 21 |
| [EPIC-11](./EPIC-11-ui-craft/epic.md) | Raise the interface above default component-library output without adding design-system depth. | 8 | 34 |

**Totals**: 13 epics, 110 stories, 514 story points.

## Documentation reconciliation

Six defects found while reconciling these work items against `docs/` have been corrected in
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
5. `NFR-X11` (Discoverability) was added to the cross-cutting baseline, so EPIC-10 is fully
   traceable.
6. The roadmap's phase tables now enumerate each feature's full requirement set, and the
   feature traceability matrix is regenerated from these work items, including EPIC-10,
   EPIC-11, and EPIC-12.

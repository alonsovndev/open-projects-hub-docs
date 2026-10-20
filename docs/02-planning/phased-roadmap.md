# Phased roadmap

This roadmap preserves the project's phase structure while separating delivery plans from available evidence. Source revisions and verification boundaries are recorded in [evidence and limitations](../00-context/evidence-and-limitations.md).

## Phase overview

The windows below are relative planning assumptions, not measured delivery dates.

| Phase | Intended outcome | Planning window | Evidence and qualification |
| --- | --- | --- | --- |
| Phase -1: prototype | Explore core user journeys and visual direction | Week 0, alongside Phase 0 | Pencil file and exported screens exist; stakeholder sign-off and formal validation evidence are TBD |
| Phase 0: foundation | Establish repositories, persistence, environments, and checks | Week 0, alongside Phase -1 | Source, migrations, CI definitions, and run guides exist; some original quality gates differ from current CI |
| MVP: core planning | Connect lifecycle, refinement, approval, backlog, export, and access boundaries | Weeks 1–11 | Implementation present and first release documented; not every baseline criterion is independently verified |
| Phase 1: entry and quality | Improve onboarding, public entry, credits, provider configuration, interface quality, and validation | Weeks 12–19 | Several capabilities are implemented; complete accessibility, SEO, and E2E acceptance still requires evidence |
| Phase 2: future evolution | Revisit governance, collaboration, and scale when justified | TBD | Proposed scope, without delivery commitments |

## Planning principles

1. Prioritize the smallest complete workflow from client notes to approved requirements.
2. Keep requirements, implementation evidence, and validation results separate.
3. Record architecture changes in ADRs rather than silently changing the baseline.
4. Revisit estimates when scope, capacity, or implementation constraints change.
5. Resolve incomplete acceptance evidence before calling a phase fully validated.

## Phase -1: prototype and design

The [historical prototype](../05-prototype/README.md) provides screen exports, a Pencil source file, a design brief, and design tokens. It predates account-free Client Review and is not a current product specification.

| Planned acceptance activity | Available evidence |
| --- | --- |
| Core screen designs | Exported images and Pencil artifact |
| Stakeholder walkthrough with at least two participants | TBD — evidence not recorded |
| Product Owner sign-off and feedback resolutions | TBD — evidence not recorded |
| Designer-to-engineer handoff session | TBD — evidence not recorded |
| WCAG assessment of critical flows | TBD — no formal conformance report |
| Responsive validation | Design intentions exist; validation report TBD |

These activities were previously marked complete without linked evidence. They remain evaluation or documentation gaps until supporting artifacts can be inspected.

## Phase 0: engineering foundation

Available artifacts include separate API, web, infrastructure, and documentation repositories; versioned database migrations; environment examples; automated checks; and setup guidance.

The implemented foundation differs from the original plan:

- Deployment uses Cloudflare and one EC2 host, rather than App Runner and RDS.
- API releases publish an image in CI; an operator deploys through SSM.
- Backend mypy is advisory, and repository integration tests are excluded from CI.
- Web CI runs lint, unit tests, type-check, and build; Playwright is separate.
- Hosted branch-protection settings and onboarding-time claims were not verified during this review.

See [CI/CD architecture](../03-architecture/ops/ci-cd-pipeline.md) for the current checks and release process.

## MVP: core planning workflow

The delivered workflow covers client and project records, workspace boundaries, note refinement, explicit story approval, backlog views, Markdown export, authentication, and account-free Client Review.

### Original capacity basis

The earlier estimate assumed two developers at approximately 12 story points per developer per week. These figures are planning inputs retained for traceability, not evidence of actual staffing or measured velocity.

| Planning measure | Original value |
| --- | --- |
| MVP-1 scope | 314 points across 66 stories |
| Foundation allocated separately | 64 points |
| Remaining estimated MVP scope | 250 points |
| Assumed team velocity | Approximately 24 points/week |
| Implied duration | Approximately 10–11 weeks |

This estimate replaced the earlier 1–1.5-month target. It should not be used to infer actual effort or completion dates.

### Review criteria

- Follow the [worked example](../00-context/reviewer-guide.md#worked-example-a-clients-contact-form) from notes to approved backlog.
- Inspect tenant isolation and access-code response boundaries.
- Compare exported requirements with approved content.
- Separate implemented capabilities from deferred behavior, such as manual story ordering.
- Check quality targets against recorded evidence rather than phase labels.

## Phase 1: entry, provider configuration, and quality

The implementation includes registration and verification, password recovery, onboarding, public entry, individual provider keys, credit accounting, and export scoping. Each capability still needs evaluation against its complete feature baseline.

Remaining review work includes accessibility and usability assessment, provider failure behavior, broader E2E execution, SEO acceptance, load measurements, and repair of stale integration tests. Existing test files do not establish that these activities have passed.

## Phase 2: future work

Reconsider the following only when user evidence or operational demand justifies them:

- Requirement history and stronger change traceability.
- Richer client feedback and collaboration.
- Backups, recovery exercises, and availability improvements.
- Shared rate limiting, observability, and trusted origin certificates.
- Additional integrations or service extraction for demonstrated bottlenecks.

## Feature traceability matrix

This matrix identifies planning associations, not completion status. Story-level plans are in the repository's [work items](https://github.com/alonsovndev/open-projects-hub-docs/tree/main/work-items); some retain historical statuses.

| Feature or concern | Planning association | Current review focus |
| --- | --- | --- |
| Foundation | EPIC-0 | Repository setup, migrations, checks, and manual deployment |
| F-001: clients and projects | EPIC-1 | Workspace lifecycle and active-project constraints |
| F-007, F-008, F-009: authentication | EPIC-2; EPIC-8 entry flow | Registration, sessions, verification, and recovery |
| F-002: refinement and approval | EPIC-3 | Candidate generation, browser drafts, and approval |
| F-003: access boundaries | EPIC-4 | Roles, workspace isolation, and public route policy |
| F-004: backlog and export | EPIC-5 | Approved artifacts, scope filters, and deferred ordering |
| F-010: credits and keys | EPIC-6 | Credit handling and encrypted per-user provider keys |
| F-011: client review | EPIC-7, superseded by ADR-020 | Shared access codes replace Viewer accounts |
| F-005, F-006, F-008: first use | EPIC-8 | Onboarding, landing, and registration |
| Quality targets | EPIC-9 | Security, test evidence, accessibility, and performance gaps |
| Discoverability | EPIC-10 | Public metadata and SEO validation |
| Interface quality | EPIC-11 | Responsive behavior and accessible interaction |
| Maintainability | EPIC-12 | Tooling and architecture boundaries |

## Risks and outstanding evidence

| Risk | Effect | Next evidence needed |
| --- | --- | --- |
| AI output does not match client intent | Incorrect scope can enter the backlog | Independent review of candidate and approved stories |
| Historical statuses overstate completion | Reviewers cannot distinguish plans from results | Linked acceptance artifacts and dated verification results |
| Incomplete integration/E2E execution | Regressions may escape unit-level checks | Repaired suites and reproducible execution reports |
| Single host without backups | Service interruption or permanent data loss | Recovery design and a recorded restore exercise |
| Unmeasured usability or capacity | Quality targets remain unproven | Defined tasks/load profiles and measured outcomes |

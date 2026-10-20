---
sidebar_position: 7
description: Traceability from project objectives to implementation evidence, verification boundaries, and known limitations.
---

# Evidence and limitations

This page separates implementation evidence, configured checks, and outcomes that still need evaluation. It supports an academic technical review without treating a design target or an existing test file as a measured result.

## Source baseline

The documentation review uses the following local source revisions. Repository links are pinned to those revisions so reviewers can inspect the same implementation. Production state and hosted CI results were not queried during this review.

| Repository | Reviewed revision | Main evidence |
| --- | --- | --- |
| API | [`48b1cee`](https://github.com/alonsovndev/open-projects-hub-api/tree/48b1cee6113527dedb054abfc0b4170697fafec0) | Routes, DTOs, use cases, migrations, and tests |
| Web | [`6408eca`](https://github.com/alonsovndev/open-projects-hub-web/tree/6408eca68f1415612e4275c1a7d61c97a26ba5f8) | User flows, browser state, and component/E2E test artifacts |
| Infrastructure | [`fbecdaf`](https://github.com/alonsovndev/open-projects-hub-infra/tree/fbecdafbf62f093db89d8582fa96eca8839d0d08) | Deployment resources, ingress, and operational constraints |

## Objectives and evidence

| Objective | Available evidence | What it does not establish |
| --- | --- | --- |
| Convert notes into structured requirements with human control | [Refinement contract](../03-architecture/api/api-contract.md), [approval workflow](../03-architecture/diagrams/sequence-diagrams.md), and [worked example](./reviewer-guide.md#worked-example-a-clients-contact-form) | Generated content quality, factual accuracy, or time saved across real projects |
| Keep clients, projects, and requirements organized | Workspace-scoped lifecycle and backlog use cases; [database design](../03-architecture/database/database-design.md) | Usability or productivity improvements over existing tools |
| Limit client access to approved project content | [Client Review requirements](../01-requirements/f-011-client-review-access.md), minimized public response, and isolation tests | A penetration test or independent security certification |
| Make engineering decisions inspectable and reproducible | Versioned [ADRs](../04-decisions/README.md), [run guide](./run-the-system.md), CI definitions, and local build checks | Production availability, disaster recovery, or compliance with a formal standard |

## Feature traceability

The implementation and test directories linked below are source artifacts. Their presence indicates where a reviewer can inspect behavior; it does not report a passing test run or full acceptance of every requirement in a feature.

| Requirement | Implementation evidence | Verification artifacts and gaps |
| --- | --- | --- |
| [F-001: clients and projects](../01-requirements/f-001-client-and-project-lifecycle-management.md) | API `features/clients`, `features/projects` | Client/project endpoint tests; deletion and archive terminology must follow current persistence behavior |
| [F-002: refinement and approval](../01-requirements/f-002-ai-refinement-and-approval-workflow.md) | API `features/refinement`; web `features/refinement` | Refinement endpoint and use-case tests; provider quality and reliability need separate evaluation |
| [F-003: access boundaries](../01-requirements/f-003-access-control-and-visibility-boundaries.md) | Route access policy and workspace-scoped repositories | Cross-workspace isolation and route-access tests |
| [F-004: backlog and export](../01-requirements/f-004-requirements-backlog-and-markdown-export.md) | API `features/backlog`, `features/stories` | Backlog endpoint and Markdown-renderer tests; manual ordering remains deferred |
| [F-005: onboarding](../01-requirements/f-005-minimal-onboarding.md) | Web onboarding components | UI artifacts available; usability study and stakeholder sign-off evidence TBD |
| [F-006: public landing](../01-requirements/f-006-landing-page.md) | Web public home | Home and theme E2E artifacts; discoverability/performance targets are not measured results |
| [F-007: login](../01-requirements/f-007-admin-login.md) | API `features/auth`; web authentication flow | Login, browser-session, refresh, and route-protection tests |
| [F-008: registration](../01-requirements/f-008-create-account.md) | Registration and email-verification use cases | Registration and verification tests; SMTP delivery guarantees unmeasured |
| [F-009: password reset](../01-requirements/f-009-reset-password.md) | Reset-code issuance and password-reset use cases | Password-reset tests; reset codes expire after 30 minutes |
| [F-010: credits and keys](../01-requirements/f-010-ai-credits-and-api-key-management.md) | API `features/ai_config`; per-user encrypted provider keys | Credit, encryption, and provider-failure tests; external provider behavior not validated by mocked tests |
| [F-011: client review](../01-requirements/f-011-client-review-access.md) | Public access-code lookup and minimized backlog response | Client-review endpoint tests; shared codes do not identify individual stakeholders |

Inspect the [API test tree](https://github.com/alonsovndev/open-projects-hub-api/tree/48b1cee6113527dedb054abfc0b4170697fafec0/src/tests), [web source](https://github.com/alonsovndev/open-projects-hub-web/tree/6408eca68f1415612e4275c1a7d61c97a26ba5f8/src), and [web E2E tests](https://github.com/alonsovndev/open-projects-hub-web/tree/6408eca68f1415612e4275c1a7d61c97a26ba5f8/e2e) for the underlying artifacts.

## Verification boundaries

| Area | What is configured or available | Qualification |
| --- | --- | --- |
| Documentation | `npm run typecheck`; `npm run build` with broken-link and anchor failures enabled | Local results are reported with the documentation handoff; no dedicated lint or automated test script is configured |
| API CI | Ruff lint/format, Bandit, non-integration pytest suite, migration apply/rollback | Mypy is advisory (`continue-on-error`); repository integration tests are excluded from CI and noted as stale in the workflow |
| Web CI | `npm run verify`: lint, unit tests, type-check, build | Playwright tests exist but are not run by the current CI workflow |
| Infrastructure CI | Terraform formatting and validation | This does not apply infrastructure or prove the deployed account configuration |
| Coverage | A 70% target is recorded in NFR-X03 | No fresh coverage measurement or passing threshold is established by this documentation review |

These descriptions come from the committed [API CI](https://github.com/alonsovndev/open-projects-hub-api/blob/48b1cee6113527dedb054abfc0b4170697fafec0/.github/workflows/ci.yml) and [web CI](https://github.com/alonsovndev/open-projects-hub-web/blob/6408eca68f1415612e4275c1a7d61c97a26ba5f8/.github/workflows/ci.yml) definitions. Configured jobs are not a claim that the latest hosted run passed.

### Documentation checks performed

Local checks during this revision on 2026-10-19 used Node.js 23.10.0; the repository CI specifies Node.js 22. The documentation typecheck and production build passed, including strict internal-link and anchor checks.

A local Chromium smoke check rendered all 24 Mermaid diagrams and inspected seven representative pages at 375, 768, and 1440 pixels in light and dark modes (42 combinations). It found no page-wide overflow, broken images, or browser JavaScript errors. All 15 gallery figures loaded; the primary review link, visible focus, and mobile navigation were checked. Wide diagrams retain native text size inside named, keyboard-scrollable regions. This is focused browser verification, not a full accessibility assessment.

The built site was served by a local static HTTP server for these checks. The Docusaurus `npm run serve` preview exhausted the local Node process's default heap. Production hosting, application backend tests, external AI calls, and email delivery were not exercised by these documentation checks.

## Known limitations

- **AI output:** model responses can be incomplete or incorrect. Human approval is required; sanitization and structured parsing do not establish resistance to every prompt-injection attempt. No separate moderation service or prompt-leak detector is implemented.
- **Draft durability:** unapproved stories live in browser session storage, not the database. Closing the tab loses them; generating them may already have consumed a credit.
- **Shared review access:** anyone holding a project access code can read the approved stories. Revocation replaces the shared code; individual stakeholder revocation and access auditing are absent.
- **Availability and recovery:** one EC2 host runs the API and PostgreSQL, with no automated backups, failover, or autoscaling. Host-volume loss can lose all project data.
- **Transport:** Cloudflare Full mode encrypts the origin connection without validating Caddy's origin certificate. Full (strict) with a trusted origin certificate remains a hardening step.
- **Abuse controls and telemetry:** some rate limits are process-local. Centralized log retention, external uptime checks, and CloudWatch alarms are not deployed. Sentry collection depends on configuration.
- **Quality claims:** WCAG conformance, GDPR compliance, load capacity, email delivery targets, and measured productivity gains are not established by the available evidence.

See the [threat model](../03-architecture/security/threat-model.md) and [deployment architecture](../03-architecture/ops/deployment-architecture.md) for control details and trade-offs.

## Evaluation still needed

| Evaluation | Proposed evidence to collect | Recorded result |
| --- | --- | --- |
| Requirements clarity | Independent review of generated and manually revised stories against agreed criteria | TBD — no recorded evaluation dataset or scoring |
| Documentation effort | Comparable manual and assisted tasks, recorded completion time, and participant context | TBD — no recorded comparison |
| Usability and accessibility | Task observations, keyboard/screen-reader checks, contrast audit, and findings log | TBD — no formal sign-off or conformance report |
| Reliability and capacity | Repeatable load profile, latency/error measurements, and environment details | TBD — no benchmark report |

These are proposed evaluation activities, not completed experiments. Reviewers can assess the implementation and its engineering trade-offs while keeping the unmeasured outcomes separate.

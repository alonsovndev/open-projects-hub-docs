# Open Projects Hub Docs

> Requirements, architecture, and decision records for Open Projects Hub, an AI-assisted open-source platform that transforms raw software requirements into structured, reviewable user stories and project backlogs.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Part of [alonsovndev](https://github.com/alonsovndev), the open-source engineering lab by [Alonso Villanueva](https://alonsovndev.com).

For the master's project review, start with the [reviewer guide](./docs/00-context/reviewer-guide.md), then consult [evidence and limitations](./docs/00-context/evidence-and-limitations.md). The guide includes a worked example and a demonstration checklist; the evidence page distinguishes implementation artifacts from unmeasured outcomes.

## Master's project submission

This repository is the entry point for the master's final project. The code is split across four public repositories, linked below.

| Deliverable | Where |
| --- | --- |
| Live application | https://oph.alonsovndev.com |
| Documentation site | https://oph-docs.alonsovndev.com |
| Slides | [`static/tfm/open-projects-hub-tfm.pptx`](./static/tfm/open-projects-hub-tfm.pptx) (also served at https://oph-docs.alonsovndev.com/tfm/open-projects-hub-tfm.pptx) |
| Demo video | TBD |
| Test user | TBD — credentials are provided in the submission form, not in this public repository |
| Source code | [api](https://github.com/alonsovndev/open-projects-hub-api) · [web](https://github.com/alonsovndev/open-projects-hub-web) · [infra](https://github.com/alonsovndev/open-projects-hub-infra) · docs (this repository) |

## Overview

A client request often starts as an email, a call, or a list of ideas. Before development can begin, a freelancer has to remove ambiguity, agree on scope, and write requirements that both sides understand. Open Projects Hub brings that work into one workflow:

1. Create a client and a project in your workspace.
2. Paste the client's raw notes and let an AI provider propose user stories with acceptance criteria.
3. Review each candidate story: edit it, discard it, or approve it. Only approved stories are stored.
4. Inspect the approved backlog and export it to Markdown.
5. Share the project's access code so the client can read the approved stories without an account.

AI output is always a proposal: nothing reaches the backlog or the client without explicit human approval. The intended benefits (less admin work, clearer agreement) are hypotheses, not measured results; see [evidence and limitations](./docs/00-context/evidence-and-limitations.md).

## Who it is for

- **Software freelancers and small teams** who need to turn ambiguous client input into delivery-ready requirements
- **Their clients**, who get a transparent, read-only view of approved stories through a project access code
- **Contributors** looking for a reference implementation of Clean Architecture, DDD, and security-by-design

## Main features

- **Accounts and workspaces:** self-service sign-up with an emailed verification code, login, password reset, and refresh-cookie sessions. Each registration creates a workspace; its owner is the Admin and can invite teammates as Members (up to five users per workspace).
- **Clients and projects:** manage clients and projects, archive and reactivate projects, with a limit of three active projects per workspace.
- **AI-assisted refinement:** turn raw notes into candidate user stories with acceptance criteria. Drafts stay in the browser tab until approved ([ADR-019](./docs/04-decisions/adr-019-no-persisted-draft-stories.md)).
- **AI providers and credits:** platform credits (Gemini) or your own Gemini, OpenAI, or DeepSeek key, stored encrypted per user.
- **Approved backlog:** browse, filter, and export approved stories as Markdown.
- **Client Review:** an account-free, read-only page where a client enters the project's access code to see its approved stories.
- **Dashboard and entry page:** workspace summary statistics and a welcome page where users choose between managing projects and client review.

Requirements behind each feature: [F-001 to F-011](./docs/01-requirements/).

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript 5, Vite 7, Redux Toolkit + RTK Query, Ant Design 6, SCSS Modules, Zod |
| Backend | Python 3.12, FastAPI, Pydantic, SQLAlchemy, Alembic, Gunicorn + Uvicorn, JWT (PyJWT) + bcrypt |
| Database | PostgreSQL 15 |
| AI | Gemini (platform credits), OpenAI and DeepSeek (user keys), mock provider for local development |
| Infrastructure | Terraform, AWS EC2 + Docker Compose + Caddy, AWS SSM Parameter Store, Cloudflare (Workers, DNS, proxy), Resend (email) |
| Quality and CI/CD | Ruff, mypy, Bandit, pytest, ESLint, Vitest, React Testing Library, Playwright, GitHub Actions, GHCR |
| Observability | Sentry (optional, API and web) |
| Documentation | Docusaurus, Mermaid, 24 ADRs |

Rationale for each choice: [technology stack](./docs/03-architecture/core/technology-stack.md) and the [decision log](./docs/04-decisions/README.md).

## Project structure

```text
open-projects-hub-api/      FastAPI modular monolith (Clean Architecture / DDD)
├── src/app/features/       auth, user, workspaces, clients, projects, refinement,
│                           stories, backlog, client_review, ai_config, dashboard
│   └── <feature>/          domain/ · application/ · infrastructure/ · presentation/
├── src/app/composition/    dependency injection (composition root)
├── src/app/shared/         cross-feature kernel, persistence, logging
├── src/tests/              unit, application, presentation, integration tests
└── alembic/                database migrations

open-projects-hub-web/      React single-page app
├── src/app/                shell, routing, store, base API
├── src/features/           auth, onboarding, home, dashboard, clients, projects,
│                           refinement, backlog, settings, viewer, legal
├── src/shared/             layout, hooks, UI primitives
└── e2e/                    Playwright tests

open-projects-hub-infra/    Terraform for the production environment
├── bootstrap/              remote state
├── envs/prod/              EC2 host, Elastic IP, security group, SSM, budgets, DNS
└── modules/                compute, deploy

open-projects-hub-docs/     this repository (Docusaurus site)
├── docs/                   context, requirements, planning, architecture, ADRs, prototype
├── static/tfm/             master's project slides
└── work-items/             epics and stories
```

## Install and run

Requires Python 3.12 (in an isolated virtual environment), Docker, and Node.js 22. Clone the API and web repositories side by side.

```bash
# API: http://localhost:8000 (Swagger UI at /docs)
cd open-projects-hub-api
cp .env.example .env      # set SECRET_KEY, POSTGRES_PASSWORD, API_KEY_ENCRYPTION_KEY
make install-dev
docker compose up postgres -d
alembic upgrade head
ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="<strong-password>" make seed-admin
make seed-sample-data     # optional: sample clients, projects, and stories
make run

# Web: http://localhost:5173
cd ../open-projects-hub-web
cp .env.example .env      # VITE_API_BASE_URL=http://localhost:8000
npm ci
npm run dev
```

`make seed-admin` creates a verified administrator, so you can sign in without email. Without `GEMINI_API_KEY`, refinement uses the mock AI service. Full instructions, Docker-only setup, and verification commands: [run the system](./docs/00-context/run-the-system.md).

## Deployment

| Part | Hosting | URL |
| --- | --- | --- |
| Web app | Cloudflare Workers (static assets), built by Cloudflare Builds from `main` | https://oph.alonsovndev.com |
| API + PostgreSQL | One AWS EC2 host running Caddy, the API container, and PostgreSQL via Docker Compose, behind the Cloudflare proxy | https://api-oph.alonsovndev.com (`/v1/*`) |
| Documentation | Cloudflare Workers, built from `main` | https://oph-docs.alonsovndev.com |

API releases are tagged `vX.Y.Z` and built into a GHCR image by GitHub Actions, then deployed manually with `scripts/deploy-release.sh`, which runs an AWS SSM document. The infrastructure is defined in Terraform. Details, costs, and limits: [deployment architecture](./docs/03-architecture/ops/deployment-architecture.md) and [CI/CD pipeline](./docs/03-architecture/ops/ci-cd-pipeline.md).

## Navigating the documentation

| Section | Description |
| --- | --- |
| [Project context](./docs/00-context/) | Overview, personas, glossary, scope, [how to run the system](./docs/00-context/run-the-system.md) |
| [Functional requirements](./docs/01-requirements/) | Feature-level requirements (F-001 to F-011) |
| [Planning](./docs/02-planning/) | Phased roadmap and role mapping |
| [Architecture](./docs/03-architecture/) | System design, API, database, security, operations |
| [Decisions (ADRs)](./docs/04-decisions/) | 24 architecture decision records |
| [Prototype and UX](./docs/05-prototype/) | Design direction and screens |

## Links

| Resource | URL |
| --- | --- |
| Web app (production) | https://oph.alonsovndev.com |
| API (production) | https://api-oph.alonsovndev.com (`/v1/*`) |
| Documentation site | https://oph-docs.alonsovndev.com |
| Backend repository | [open-projects-hub-api](https://github.com/alonsovndev/open-projects-hub-api) |
| Frontend repository | [open-projects-hub-web](https://github.com/alonsovndev/open-projects-hub-web) |
| Infrastructure repository | [open-projects-hub-infra](https://github.com/alonsovndev/open-projects-hub-infra) |
| Documentation repository | this repository |

New here? Start with the [system overview](./docs/00-context/overview.md), then
[how to run the system](./docs/00-context/run-the-system.md) and the
[deployment architecture](./docs/03-architecture/ops/deployment-architecture.md).

## Run the docs site locally

Requires Node.js 22+; CI and Cloudflare Builds use Node.js 22.

```bash
npm ci
npm start        # http://localhost:3000
npm run typecheck
npm run build    # broken links fail the build
```

## Deploy the docs to Cloudflare

The site is live at **https://oph-docs.alonsovndev.com**, served by a separate
Cloudflare Worker (`open-projects-hub-docs`) using static assets from `build/`. The
product frontend at https://oph.alonsovndev.com and the apex domain are not affected.
GitHub Pages is no longer used.

### How it publishes

Cloudflare Builds is connected to this repository and publishes production commits on
`main`. GitHub Actions only validates: typecheck and build run for PRs to `main`/`dev`,
pushes to those branches, and manual runs (the `Build Docs` workflow's `Build` job is
the required check).

| Setting | Value |
| --- | --- |
| Worker name | `open-projects-hub-docs` (must match `wrangler.jsonc`) |
| Production branch | `main` |
| Build environment variable | `NODE_VERSION=22` |
| Build command | `npm run typecheck && npm run build` |
| Deploy command | `npm run deploy` |

`wrangler.jsonc` declares the docs hostname as a Workers **Custom Domain**, so the
production deploy keeps its DNS record and certificate. No Cloudflare credentials are
needed in GitHub Actions or in the site code.

### Preview locally

```bash
npm run typecheck
npm run build
npx wrangler dev --local   # http://localhost:8787
```

Check the homepage, `/docs/intro/`, a deep page such as
`/docs/04-decisions/adr-022-cloudflare-edge-instead-of-cloudfront/`, and that an
unknown URL returns HTTP 404 with the docs 404 page.

For an explicitly authorized manual release, authenticate Wrangler to the correct
Cloudflare account, then run `npm run build && npm run deploy`.

### Rollback

Roll back to a known-good Worker deployment in Cloudflare and pause automatic builds
until the repository fix is ready, or revert the merge commit on `main`. Do not change
the frontend or apex-domain bindings during rollback.

## Contributing

See the [contribution guide](./CONTRIBUTING.md).

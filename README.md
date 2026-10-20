# Open Projects Hub Docs

> Requirements, architecture, and decision records for Open Projects Hub, an AI-assisted open-source platform that transforms raw software requirements into structured, reviewable user stories and project backlogs.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Part of [alonsovndev](https://github.com/alonsovndev), the open-source engineering lab by [Alonso Villanueva](https://alonsovndev.com).

For the master's project review, start with the [reviewer guide](./docs/00-context/reviewer-guide.md), then consult [evidence and limitations](./docs/00-context/evidence-and-limitations.md). The guide includes a worked example and a demonstration checklist; the evidence page distinguishes implementation artifacts from unmeasured outcomes.

## Who it is for

- **Software freelancers and small teams** who need to turn ambiguous client input into delivery-ready requirements
- **Their clients**, who get a transparent, read-only view of approved stories through a project access code
- **Contributors** looking for a reference implementation of Clean Architecture, DDD, and security-by-design

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

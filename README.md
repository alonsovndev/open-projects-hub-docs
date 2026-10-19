# Open Projects Hub Docs

> Requirements, architecture, and decision records for [Open Projects Hub](https://github.com/alonsovndev/open-projects-hub), an AI-assisted open-source platform that transforms raw software requirements into structured, reviewable user stories and project backlogs.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Part of [alonsovndev](https://github.com/alonsovndev), the open-source engineering lab by [Alonso Villanueva](https://alonsovndev.com).

## Who it is for

- **Software freelancers and small teams** who need to turn ambiguous client input into delivery-ready requirements
- **Their clients**, who get a transparent, read-only view of approved stories through a project access code
- **Contributors** looking for a reference implementation of Clean Architecture, DDD, and security-by-design

## Navigating the documentation

| Section | Description |
| --- | --- |
| [Project context](./docs/00-context/) | Overview, personas, glossary, scope |
| [Functional requirements](./docs/01-requirements/) | Feature-level requirements (F-001 to F-011) |
| [Planning](./docs/02-planning/) | Phased roadmap and role mapping |
| [Architecture](./docs/03-architecture/) | System design, API, database, security, operations |
| [Decisions (ADRs)](./docs/04-decisions/) | 20 architecture decision records |
| [Prototype and UX](./docs/05-prototype/) | Design direction and screens |

## Related repositories

[open-projects-hub](https://github.com/alonsovndev/open-projects-hub) (overview) · [open-projects-hub-api](https://github.com/alonsovndev/open-projects-hub-api) · [open-projects-hub-web](https://github.com/alonsovndev/open-projects-hub-web)

## Run the docs site locally

Requires Node.js 22+; CI and Cloudflare Builds use Node.js 22.

```bash
npm ci
npm start        # http://localhost:3000
npm run typecheck
npm run build    # broken links fail the build
```

## Deploy the docs to Cloudflare

The deployment target is **https://oph-docs.alonsovndev.com**, served by a separate
Cloudflare Worker using static assets from `build/`. The product frontend at
https://oph.alonsovndev.com and the apex domain are not changed by this deployment.
Cloudflare account setup and the first production deployment must be completed
before the docs hostname is live.

### Connect Cloudflare Builds

In **Workers & Pages**, create a Worker connected to this GitHub repository, not a
Pages project and not the existing product frontend Worker. Use these settings:

| Setting | Value |
| --- | --- |
| Worker name | `open-projects-hub-docs` (must match `wrangler.jsonc`) |
| Repository | `alonsovndev/open-projects-hub-docs` |
| Production branch | `main` |
| Root directory | Repository root |
| Build environment variable | `NODE_VERSION=22` |
| Build command | `npm run typecheck && npm run build` |
| Deploy command | `npm run deploy` |
| Non-production branch builds | Disabled for the initial cutover |

Install dependencies with development dependencies included: the pinned Wrangler
version is a development dependency. Cloudflare Builds handles deployment
authentication; no Cloudflare credentials are needed in GitHub Actions or site
code. Review the build token's permissions in Cloudflare before the first deploy.

Before deploying, inspect DNS records and Workers routes for
`oph-docs.alonsovndev.com`. Stop if it is already in use; do not replace an existing
record or bind the product frontend hostname. `wrangler.jsonc` declares the docs
hostname as a Workers **Custom Domain**, so the production deploy provisions its
DNS record and certificate. The `alonsovndev.com` zone must be active in the same
Cloudflare account. Do not create a Pages CNAME or a wildcard Worker route.

### Validate and cut over

GitHub Actions runs typecheck and build validation for PRs to `main`/`dev`, pushes
to those branches, and manual runs. It no longer publishes to GitHub Pages.
Before merging, confirm required checks still reference the retained
`Build Docs` workflow's `Build` job rather than the retired Pages workflow.

For a local Cloudflare preview, without publishing or changing DNS:

```bash
npm run typecheck
npm run build
npx wrangler dev --local
```

Open http://localhost:8787 and verify the homepage, `/docs/intro/`, a deep page such
as `/docs/04-decisions/adr-022-cloudflare-edge-instead-of-cloudfront/`, navigation,
images, and diagrams. Refresh a deep URL directly. URLs without trailing slashes
must redirect to their slash-ending equivalents; an unknown URL must return HTTP
404 with the docs 404 page, not the homepage with HTTP 200.

Cloudflare Builds publishes production commits on `main`. After the first deploy,
repeat these checks over HTTPS at the docs hostname and confirm canonical URLs and
`/sitemap.xml` use `https://oph-docs.alonsovndev.com/`, without the old
`/open-projects-hub-docs/` prefix. Then disable GitHub Pages in the repository's
**Settings → Pages**. This is a clean cutover: old GitHub Pages URLs are not
redirected. Live DNS, certificates, and GitHub required-check settings cannot be
verified by the local build.

For an explicitly authorized manual release, authenticate Wrangler to the correct
Cloudflare account, then run `npm run build && npm run deploy`. The deploy script
uploads the existing build and can change the configured Custom Domain; it does
not build the site itself.

### Rollback

Keep the previous GitHub Pages deployment available until the Cloudflare smoke
checks pass. To return to Pages, first pause automatic Cloudflare Builds so the
Pages configuration is not also published to the docs Worker. If Pages was
disabled, re-enable its GitHub Actions publishing source. Restore the Pages
deployment workflow and the previous Docusaurus URL/base-path configuration
(`https://alonsovndev.github.io` and `/open-projects-hub-docs/`) together in a reviewed
change, then rebuild, publish, and verify Pages. Restoring only the workflow would
publish assets using the wrong paths.

For a later Cloudflare-only regression, roll back to a known-good Worker deployment
and stop automatic builds until the repository fix is ready. Do not change the
frontend or apex-domain bindings during rollback.

## Contributing

See the [contribution guide](./CONTRIBUTING.md).

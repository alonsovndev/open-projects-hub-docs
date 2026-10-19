# Repository Standards

Add concise, repository-specific standards here.

## Suggested Sections

- Architecture boundaries
- API contract rules
- Data and migration constraints
- Testing strategy for this repo
- Deployment notes (if needed)

## Keep It Lean

- Document only what differs from global standards.
- Avoid duplicating global guidance.

## Documentation Site Build

- Node >= 22, npm (see `package.json` `engines`); CI and Cloudflare Builds use Node 22.
- `npm start` — local dev server with hot reload, http://localhost:3000.
- `npm run typecheck` — TypeScript check (`tsconfig.json` extends `@docusaurus/tsconfig`).
- `npm run build` — production build into `build/`; fails on any broken internal link
  or anchor. Treat this as the required pre-PR check for any `docs/` change.
- `.github/workflows/build.yml` typechecks and builds PRs to `main`/`dev`, pushes to
  those branches, and manual runs. It never deploys.
- Once configured per `README.md`, Cloudflare Builds publishes `main` to a separate
  docs Worker at `https://oph-docs.alonsovndev.com`, with static assets and a Custom
  Domain declared in `wrangler.jsonc`. Do not modify the product frontend or
  apex-domain bindings.
- `npm run deploy` uploads the existing `build/`; build first. Deployment and DNS
  changes require explicit authorization. See `README.md` for setup and cutover.

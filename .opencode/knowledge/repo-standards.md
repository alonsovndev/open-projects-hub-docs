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

- Node >= 20, npm (see `package.json` `engines`).
- `npm start` — local dev server with hot reload, http://localhost:3000.
- `npm run typecheck` — TypeScript check (`tsconfig.json` extends `@docusaurus/tsconfig`).
- `npm run build` — production build into `build/`; fails on any broken internal link
  or anchor. Treat this as the required pre-PR check for any `docs/` change.
- `.github/workflows/deploy.yml` is manual-trigger only (`workflow_dispatch`) — GitHub
  Pages auto-deploy on push to `main` is intentionally not wired up yet.

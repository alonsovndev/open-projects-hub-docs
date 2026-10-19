---
sidebar_position: 6
---

# Run the System

How to reach the deployed system, and how to run all of it on a workstation. The system is split across four repositories; this page ties them together.

## Deployed system

| Part | URL | Repository |
| --- | --- | --- |
| Web app | https://oph.alonsovndev.com | [open-projects-hub-web](https://github.com/alonsovndev/open-projects-hub-web) |
| API | https://api-oph.alonsovndev.com (all routes under `/v1/*`) | [open-projects-hub-api](https://github.com/alonsovndev/open-projects-hub-api) |
| Documentation | https://oph-docs.alonsovndev.com | this repository |
| AWS infrastructure (Terraform) | not public | [open-projects-hub-infra](https://github.com/alonsovndev/open-projects-hub-infra) |

To try it, open the web app, choose **Register**, and enter an email address you can read. The API emails a six-character code that expires after five minutes; enter it to verify the account, then sign in. Registration creates a new workspace with you as its administrator. Client Review needs no account: it uses a project's access code.

The API root and health paths are not public through Cloudflare (only `/v1/*` is routed), so the interactive API reference is not available in production; the committed OpenAPI file is `docs/api/openapi.json` in the API repository.

## Ports and URLs when running locally

| Component | Command | URL |
| --- | --- | --- |
| PostgreSQL | `docker compose up postgres -d` | `localhost:5432` |
| API (local Python) | `make run` | http://localhost:8000 (Swagger UI at `/docs`) |
| API (all in Docker) | `docker compose up --build` | http://localhost:8080 |
| Web | `npm run dev` | http://localhost:5173 |
| Docs site | `npm start` | http://localhost:3000 |

## Run the API

Requires Python 3.12 and Docker. From the API repository:

```bash
cp .env.example .env      # set SECRET_KEY, POSTGRES_PASSWORD, API_KEY_ENCRYPTION_KEY
make install-dev
docker compose up postgres -d
alembic upgrade head
ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="<strong-password>" make seed-admin
make run
```

`make seed-admin` creates a verified administrator, so you can sign in without email. Registration through the UI additionally needs working SMTP settings (`SMTP_*` in `.env`, see the API repository's `docs/configuration/email-deliverability.md`); without them the verification email is not delivered and the account cannot be activated. `GEMINI_API_KEY` is optional: without it, refinement uses a mock AI service.

## Run the web app

Requires Node.js 22 (the CI version). From the web repository:

```bash
cp .env.example .env      # VITE_API_BASE_URL=http://localhost:8000
npm install
npm run dev
```

If the API runs in Docker (port 8080), set `VITE_API_BASE_URL=http://localhost:8080`. `VITE_API_BASE_URL` is an origin only (no path) and is baked in at build time.

## Configuration shared by the API and the web app

| Variable | Where | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | web `.env` / `.env.production` | API origin the browser calls (production: `https://api-oph.alonsovndev.com`) |
| `FRONTEND_BASE_URL` | API | Web origin (default `http://localhost:5173`) |
| `CORS_ORIGINS`, `CORS_ALLOW_CREDENTIALS` | API (SSM in production) | Allowed browser origins; credentials must be on for the refresh cookie |

## Verify each repository

| Repository | Command |
| --- | --- |
| API | `make test-unit`, `ruff check .`, `mypy src/app --config-file=pyproject.toml` |
| Web | `npm run verify` (lint, tests, type-check, build) |
| Docs | `npm run typecheck && npm run build` (broken links fail the build) |
| Infra | `terraform fmt -check -recursive` and `terraform validate` in `envs/prod` |

API integration tests (`make test-integration`) need PostgreSQL and **reset the database they connect to**; point them at a throwaway database.

## Further reading

- [Deployment architecture](../03-architecture/ops/deployment-architecture.md): how the production system is built, what it costs and its limits.
- [CI/CD pipeline](../03-architecture/ops/ci-cd-pipeline.md): branches, releases and rollback.
- [Technology stack](../03-architecture/core/technology-stack.md).

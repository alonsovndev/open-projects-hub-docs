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

Requires Node.js 20+.

```bash
npm install
npm start        # http://localhost:3000
npm run build    # broken links fail the build
```

## Contributing

See the [contribution guide](./CONTRIBUTING.md).

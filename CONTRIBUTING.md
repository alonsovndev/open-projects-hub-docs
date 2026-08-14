# Contributing to Open Projects Hub

Thank you for your interest in contributing to the **Open Projects Hub**! 🎉

This is an open-source project, and we welcome contributions from developers, students, and freelancers of all experience levels. Whether it's a bug fix, a new feature, improved documentation, or an architectural suggestion — every contribution matters.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Project Context](#project-context)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Questions & Discussions](#questions--discussions)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Be kind, constructive, and professional in all interactions.

---

## Project Context

The Open Projects Hub is a full-stack web application built to help freelancers manage clients, structure project requirements, and use AI to refine ambiguous ideas into actionable technical specifications.

**Key characteristics:**

- **Backend**: Python 3.12, FastAPI, Modular Monolith with Clean Architecture and DDD
- **Frontend**: React 18, TypeScript 5, Ant Design, Redux Toolkit
- **Database**: PostgreSQL (via Supabase) with Row Level Security
- **Deployment**: Vercel (frontend) + Render (backend)
- **Testing**: Pytest (backend), Vitest + React Testing Library (frontend), Playwright (E2E)

For the full picture, start with the [Project Overview](./docs/00-context/overview.md) and the [Architecture README](./docs/03-architecture/README.md).

---

## How to Contribute

### Ways to Contribute

- 🐛 **Report bugs** — Found a bug? Open an issue with clear reproduction steps.
- ✨ **Suggest features** — Have an idea? We'd love to hear it.
- 📝 **Improve documentation** — Docs are never perfect. Help us make them clearer.
- 🧪 **Write tests** — Help us maintain our 70% minimum coverage target.
- 🔧 **Fix bugs** — Pick an issue labeled `good first issue` or `help wanted`.
- 🏗️ **Implement features** — Check the [Epics Index](./docs/06-work-items/README.md) for planned work.

### Good First Issues

Look for issues labeled:

| Label             | Meaning                                                       |
| ----------------- | ------------------------------------------------------------- |
| `good first issue` | Small, self-contained tasks ideal for newcomers               |
| `help wanted`      | Tasks we'd especially welcome community help on              |
| `documentation`    | Documentation improvements                                    |
| `bug`              | Confirmed bugs that need fixing                               |

---

## Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/<your-username>/open-projects-hub-docs.git
cd open-projects-hub-docs
git remote add upstream https://github.com/<original-owner>/open-projects-hub-docs.git
```

### 2. Create a Branch

Always create a new branch for your work. Do not work directly on `main`.

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**

| Type         | Prefix         | Example                        |
| ------------ | -------------- | ------------------------------ |
| Feature      | `feature/`    | `feature/ai-refinement-ui`     |
| Bug fix      | `fix/`        | `fix/login-redirect-loop`       |
| Documentation| `docs/`       | `docs/update-readme`           |
| Refactor     | `refactor/`   | `refactor/auth-service`         |
| Test         | `test/`       | `test/auth-endpoints`           |

### 3. Make Your Changes

- Keep changes focused — one concern per pull request.
- Follow existing code patterns and conventions.
- Write or update tests for any logic you change.

### 4. Commit Your Changes

Write clear, meaningful commit messages.

```bash
git add .
git commit -m "feat: add AI refinement draft preview component"
```

**Commit message format** (Conventional Commits):

| Type       | Usage                                  |
| ---------- | -------------------------------------- |
| `feat`     | A new feature                         |
| `fix`      | A bug fix                             |
| `docs`     | Documentation only changes            |
| `style`    | Formatting, missing semicolons, etc.  |
| `refactor`| Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or correcting tests           |
| `chore`    | Build process, tooling, dependencies  |

### 5. Push and Open a Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub targeting the `main` branch.

---

## Project Structure

```
open-projects-hub-docs/
├── docs/
│   ├── 01-requirements/      # Feature-based functional requirements
│   ├── 02-planning/          # Phased roadmap and role mapping
│   ├── 03-architecture/      # Architecture design, ADRs, API, security, ops
│   ├── 04-database/          # Database schema and design
│   ├── 05-prototype/         # UI prototypes and design direction
│   └── 06-work-items/       # Epics and user stories
├── README.md
├── CONTRIBUTING.md           # You are here
├── LICENSE                   # MIT License
└── settings.yml
```

---

## Coding Standards

### General Principles

- **Follow existing patterns** — Don't impose new patterns without discussion.
- **Small, focused commits** — One logical change per commit.
- **No dead code** — Remove unused imports, variables, and functions.
- **Self-documenting code** — Use clear names; add comments only for non-obvious logic.

### Backend (Python / FastAPI)

- Follow Clean Architecture layer boundaries (domain, application, infrastructure, presentation).
- Domain and application layers must remain framework-agnostic.
- Use type hints throughout.
- Follow PEP 8 with the project's configured linter/formatter.

### Frontend (React / TypeScript)

- Use TypeScript strict mode — no `any` unless absolutely necessary and documented.
- Follow the established component structure (feature-based organization).
- Use functional components with hooks.
- Manage state with Redux Toolkit for shared state; local state with `useState`/`useReducer` for component-scoped data.

### Documentation

- Use clear, professional language.
- Keep documents up to date when you change related code.
- Follow the existing document header format (title, attribute table where applicable).
- Link to related documents rather than duplicating content.

---

## Testing Guidelines

This project follows a **Test-Driven Development (TDD)** approach with a minimum of **70% test coverage** for core logic.

| Layer     | Framework                          | Purpose                              |
| --------- | ---------------------------------- | ------------------------------------ |
| Backend   | Pytest                             | Unit and integration testing         |
| Frontend  | Vitest + React Testing Library    | Unit and component testing           |
| E2E       | Playwright                         | Critical user workflow validation    |

**Before submitting a PR:**

- Run all existing tests and ensure they pass.
- Add tests for any new logic or changed behavior.
- Do not skip, weaken, or remove tests to make builds pass — fix the underlying issue.

---

## Pull Request Process

### Before Opening a PR

- [ ] Your code follows the project's coding standards.
- [ ] You've added tests for any new or changed logic.
- [ ] All existing tests pass.
- [ ] Your commit messages follow the Conventional Commits format.
- [ ] You've updated relevant documentation if applicable.

### PR Review

1. A maintainer will review your PR.
2. Address any feedback by pushing additional commits to the same branch (do not close and reopen the PR).
3. Once approved, a maintainer will merge your PR.

### PR Template

When opening a PR, include:

```markdown
## Description
Brief description of what this PR does and why.

## Related Issue
Fixes # (issue number) / Refs # (issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactor
- [ ] Test improvement

## Checklist
- [ ] Code follows project standards
- [ ] Tests added/updated and passing
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventional commits
```

---

## Reporting Issues

When reporting a bug, please include:

1. **Summary** — A clear description of the problem.
2. **Steps to reproduce** — Numbered list of actions that trigger the issue.
3. **Expected behavior** — What you expected to happen.
4. **Actual behavior** — What actually happened.
5. **Environment** — OS, browser, Node/Python version, etc.
6. **Screenshots/logs** — If applicable.

---

## Questions & Discussions

- **Issues** — For bugs, feature requests, and task tracking.
- **Discussions** — For questions, ideas, and open-ended conversations (if enabled on the repository).

Don't hesitate to ask — we're happy to help!

---

Thank you for contributing to the Open Projects Hub! 🚀
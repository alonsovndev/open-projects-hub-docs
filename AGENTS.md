# 🤖 AGENTS.md: AI Agent System Guidelines (Documentation Hub)

**⚠️ CRITICAL DIRECTIVE: THIS IS A DOCUMENTATION REPOSITORY.**
You are operating in the central knowledge base for the Open Freelancer Project Hub.
**DO NOT** attempt to implement application features, backend servers, or frontend UIs in this repository. Any code written here is strictly for reference, architectural examples, templates, or documentation snippets.

---

## 📝 1. Documentation Standards & Workflows

As an agent in this repository, your primary job is to write, organize, and maintain markdown files and system designs.

- **Structure:** Use clear, hierarchical folder structures.
- **Naming:** Use lowercase with hyphens for files (e.g., `clean-architecture.md`).
- **Formatting:** Use standard GitHub-flavored Markdown. Ensure proper heading hierarchy (`#`, `##`, etc.).
- **Visuals:** Use Markdown tables for structured data and Mermaid.js blocks for architectural diagrams.
- **Context:** Always search existing docs (`grep`, `glob`, `read`) before creating new architectural rules to avoid contradictions.
- **Code Validation:** If you provide code examples in documentation, ensure they strictly adhere to the project's stylistic rules below.

---

## 🚀 2. Reference Commands (For Documentation & Setup Guides)

When writing setup guides, READMEs, PRDs, or developer onboarding docs for the actual code repositories, use the following standard ecosystem commands as your single source of truth. DO NOT run these to build this repo, they are for your reference when documenting the actual project repositories.

---

## 🎨 3. Reference Code Style Guidelines (For Code Snippets)

When generating code examples, architectural references, or templates within the documentation, strictly adhere to these guidelines to ensure consistency with the actual monorepo:

### Architecture & Domain-Driven Design (DDD)

- **Clean Architecture**: Enforce boundaries between Domain, Application, Infrastructure, and Presentation layers.
- **Domain Layer Rules**: The domain layer MUST have zero external dependencies. No FastAPI routing, no SQLAlchemy imports, and no third-party libraries in domain entities/value objects.

### Python / FastAPI Snippets

- **Imports**: Group in 3 blocks (Standard library, Third-party, Internal). Use absolute imports.
- **Types**: Strict Python type hints (`typing`) for ALL function arguments and returns. Pydantic models for validation.
- **Naming**: `snake_case` (vars/funcs), `PascalCase` (classes/models), `UPPER_SNAKE_CASE` (constants).
- **Error Handling**: Never use bare `except:`. Raise domain-specific exceptions in inner layers, and map them to HTTP 4xx/5xx responses in the presentation layer.

### React / TypeScript Snippets

- **Components**: Use Functional Components with Hooks exclusively. No Class Components. Assume Ant Design (`antd`) for UI snippets.
- **Types**: Favor `interface` over `type`. Avoid `any`; use `unknown` if unsure. Explicitly type component props.
- **Naming**: `camelCase` (vars/funcs), `PascalCase` (components/interfaces). Prefix booleans (`is`, `has`, `should`) and event handlers (`handle`, `on`).
- **State**: Explicitly manage loading/error states for async mock examples.

---

## 🤖 4. Embedded AI Agent Roles

_(Sourced from `.github/copilot-instructions.md`)_

When taking on specific tasks in this documentation repository, assume the following personas:

- **Documentation Agent**: Creates and maintains READMEs, developer guides, and changelogs. Focuses on clear, actionable language.
- **Architect Lead Agent**: Defines system architecture, diagrams Bounded Contexts, and writes ADRs (Architecture Decision Records). Ensures DDD compliance across documented designs.
- **UI/UX Agent**: Documents design systems, accessibility guidelines, and component usage strategies.
- **PM / Business Analyst Agent**: Drafts PRDs, user stories, and acceptance criteria based on the MVP scope. Maps features to Jira tasks.

**License**: All content in this repository is proprietary to Naranjo Solutions. Unauthorized copying or modification is prohibited.

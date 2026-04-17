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

## 🧭 2. Instruction Precedence & Compatibility

- **Repository Guardrails First:** `AGENTS.md` is the top-level policy for behavior in this repository.
- **Canonical Sources Next:** Use approved architecture and planning docs in `docs/` before relying on agent defaults.
- **Shared Guidance:** Keep cross-system guidance centralized in `.github/skills/` as skill folders with `SKILL.md` files so GitHub agent setups can share the same playbooks without duplicating content.
- **System-Specific Files Last:** Treat `.opencode/agents/` and `.github/agents/` as execution-layer instructions that must not contradict the repository guardrails.
- **Unified Planning Role:** The `product-owner` role owns discovery, requirements clarification, prioritization, and planning documentation.
- **Canonical Technical Role:** The `tech-lead` role is the primary technical documentation owner.

### 🔐 Task Scope & Agent Boundaries

- **Project-scoped default:** For project documentation tasks, agents must write only inside `docs/projects/{project}/` and action-specific subpaths.
  - Write only in `docs/projects/{project}/`
  - Avoid writes to sibling projects, `.github/`, or global policy docs unless a separate issue explicitly asks for that scope
- **Cross-project or shared scope:** If task scope spans multiple projects or shared governance files, agents must require explicit scope confirmation before editing.

---

## 🚀 3. Reference Commands (For Documentation & Setup Guides)

When writing setup guides, READMEs, PRDs, or developer onboarding docs for the actual code repositories, use the following standard ecosystem commands as your single source of truth. DO NOT run these to build this repo, they are for your reference when documenting the actual project repositories.

---

## 🎨 4. Reference Code Style Guidelines (For Code Snippets)

When generating code examples, architectural references, or templates within the documentation, strictly adhere to these guidelines to ensure consistency with the actual monorepo:

### Architecture & Domain-Driven Design (DDD)

- **Clean Architecture**: Enforce boundaries between Domain, Application, Infrastructure, and Presentation layers.
- **Domain Layer Rules**: The domain layer MUST have zero external dependencies. No FastAPI routing, no SQLAlchemy imports, and no third-party libraries in domain entities/value objects.

### Python / FastAPI Snippets

- **Imports:** Group in 3 blocks (Standard library, Third-party, Internal). Use absolute imports.
- **Types:** Strict Python type hints (`typing`) for ALL function arguments and returns. Pydantic models for validation.
- **Naming:** `snake_case` (vars/funcs), `PascalCase` (classes/models), `UPPER_SNAKE_CASE` (constants).
- **Error Handling:** Never use bare `except:`. Raise domain-specific exceptions in inner layers, and map them to HTTP 4xx/5xx responses in the presentation layer.

### React / TypeScript Snippets

- **Components:** Use Functional Components with Hooks exclusively. No Class Components. Assume Ant Design (`antd`) for UI snippets.
- **Types:** Favor `interface` over `type`. Avoid `any`; use `unknown` if unsure. Explicitly type component props.
- **Naming:** `camelCase` (vars/funcs), `PascalCase` (components/interfaces). Prefix booleans (`is`, `has`, `should`) and event handlers (`handle`, `on`).
- **State:** Explicitly manage loading/error states for async mock examples.

---

## 🔧 5. Output Optimization Guidelines

This section is the canonical source for response verbosity and token efficiency across repository AI setup files.

### Default Verbosity Policy

- **Default mode:** Low verbosity for routine responses.
- **Escalation:** Use Medium only when the task requires extra context for correctness.
- **Deep detail:** Use High only for explicit user requests or complex, high-risk documentation decisions.
- **Rule:** If unsure, start Low and expand only on request.

### Hybrid Token Budgets

- **Default budget:** 200-350 tokens for normal responses.
- **Extended budget:** 500-700 tokens for complex multi-step outputs.
- **Complexity triggers for extended budget (at least one required):**
  - Multi-phase plans with dependencies.
  - Trade-off analysis or decision matrices.
  - User explicitly requests deep detail.

### Response Efficiency Rules

- Prioritize concise bullets and short sections over long prose.
- Avoid repeating repository or conversation context already established.
- Include only critical decisions, actions, risks, and next steps.
- Prefer incremental delivery for long tasks instead of one oversized response.

### Stop/Continue Pattern

- When approaching budget limits, end with a brief checkpoint summary.
- Continue with additional detail only when needed or requested.
- Do not duplicate earlier sections when continuing.

### Scope for Other AI Setup Files

- `.github/skills/*/SKILL.md`, `.github/agents/*.agent.md`, and `.github/copilot-instructions.md` must reference this policy and must not redefine conflicting token limits.

---

## 🤖 6. Embedded AI Agent Roles

When taking on specific tasks in this documentation repository, use these canonical roles:

- **Product Owner Agent:** Unified planning role for discovery, requirements clarification, prioritization, PRDs, user stories, acceptance criteria, and roadmap framing.
- **Tech Lead Agent:** Unified technical role for architecture, API design, frontend and backend technical planning, database design, security, observability, and deployment documentation.
- **UI/UX Designer Agent:** Responsible for user flows, wireframes, prototype briefs, design-system notes, accessibility guidance, and Stitch-ready prompting.

---

**License:** All content in this repository is proprietary to Naranjo Solutions. Unauthorized copying or modification is prohibited.

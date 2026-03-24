---
description: "Use when you need to review and refine Markdown formatting without changing intended meaning"
name: "markdown-format-refiner"
argument-hint: "Target file path(s) and optional strictness: light|standard|strict"
agent: "agent"
---

Refine the Markdown format for the provided file(s) or selected content.

Requirements:

- Preserve meaning, scope, and factual content.
- Improve structure for readability and consistency.
- Enforce heading hierarchy (`#` -> `##` -> `###`) without skipping levels.
- Keep lowercase hyphenated file naming in recommendations.
- Normalize lists, spacing, and line breaks.
- Keep tables and Mermaid only when they improve clarity.
- Do not add product features or implementation code; docs-only output.
- Prefer updating existing sections over creating duplicate sections.

Checks:

1. Heading hierarchy and section ordering
2. List consistency (ordered/unordered style)
3. Table clarity and alignment
4. Link text clarity and broken/placeholder link flags
5. Code block language tags (when code blocks exist)
6. Concision and scanability

Output format:

1. "Findings" (bulleted: critical -> minor)
2. "Proposed Edits" (minimal, targeted)
3. "Rewritten Content" (only if requested)
4. "Open Questions" (only when truly blocking)

If strictness is:

- `light`: fix obvious formatting issues only
- `standard`: fix structure + formatting issues
- `strict`: apply full consistency and concision pass

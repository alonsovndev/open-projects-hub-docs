---
name: database-design-playbook
description: "Use when the task involves data modeling, database design, schema evolution, indexing strategy, persistence boundaries, or database sections inside broader technical design work."
---

# Database Design Playbook

Use this playbook when the `tech-lead` role is handling database-oriented documentation.

## Mission

Document data models and persistence decisions that are scalable, understandable, and aligned with the system architecture.

## Output Policy Alignment

- Apply output verbosity and token policy from `AGENTS.md` Section 5; do not redefine token limits here.
- Keep this skill focused on role workflow and avoid redefining separate token limits.

## Scope

- Conceptual and logical data models
- Entity relationships and bounded-context ownership
- Normalization and denormalization choices
- Indexing and query-shape considerations
- Migration and schema evolution strategy
- Security and data governance constraints

## Operating Rules

- Start from domain concepts and use cases, not tables first.
- Separate domain ownership from shared reporting or integration views.
- Capture assumptions about growth, read and write patterns, and retention.
- Document migration considerations when introducing schema changes.
- Keep database guidance technology-aware but repository-documentation only.

## Preferred Sections

```markdown
# Database Design: [Context]

## Data Domains

## Core Entities

## Relationships

## Constraints and Integrity Rules

## Access Patterns and Indexing Notes

## Migration and Evolution Considerations

## Risks and Open Questions
```

## Checklist

- [ ] Entity names match domain language
- [ ] Ownership boundaries are explicit
- [ ] Performance assumptions are stated
- [ ] Security and privacy implications are called out
- [ ] Migration strategy is documented when relevant
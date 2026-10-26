---
sidebar_position: 1
---

# Project overview

Open Projects Hub is an open-source platform for freelancers preparing software requirements. It brings client records, project context, AI-generated candidate stories, human review, and Markdown export into one workflow.

## Problem statement

A client request often starts as an email, a conversation, or a list of ideas. Before development can begin, the freelancer must identify ambiguity, agree on scope, and write requirements that both the client and developer can understand.

The project addresses three practical needs:

- Structure informal notes as user stories with acceptance criteria.
- Keep requirements associated with the correct client and project.
- Share approved requirements without exposing internal workspace information.

The intended benefit is less administrative effort and clearer agreement before implementation. These benefits are hypotheses to evaluate, not measured outcomes established by this repository.

## Objectives and contribution

| Objective                           | Delivered capability                                                                              | Review material                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Support requirements preparation    | Text-based AI refinement followed by explicit human editing and approval                          | [Worked example](./reviewer-guide.md#worked-example-a-clients-contact-form)                   |
| Organize project context            | Workspace-scoped clients, projects, stories, and a three-active-project limit                     | [Lifecycle requirements](../01-requirements/f-001-client-and-project-lifecycle-management.md) |
| Share an agreed backlog             | Markdown export and account-free, read-only client review                                         | [Backlog requirements](../01-requirements/f-004-requirements-backlog-and-markdown-export.md)  |
| Demonstrate inspectable engineering | Separate web, API, infrastructure, and documentation repositories with versioned design decisions | [Architecture](../03-architecture/README.md) and [ADRs](../04-decisions/README.md)            |

The contribution is the integration of these capabilities into an implemented planning workflow. It is not a claim to introduce a new AI model or a validated requirements-engineering method.

## Intended users

**Freelancers and small teams** create a workspace, manage clients and projects, refine notes, and approve stories. The workspace owner is its Admin; teammates are Members.

**Client stakeholders** enter a shared project access code to read approved stories. They do not create accounts or edit the backlog.

**Reviewers and contributors** can inspect requirements, source code, design trade-offs, and verification artifacts. The [personas](./user-personas.md) are fictional design aids rather than interview evidence.

## Workflow

1. Create a client and a project in the workspace.
2. Submit plain-text requirements notes to an available AI provider.
3. Review generated candidate stories; correct, discard, or approve them.
4. Inspect the approved backlog and export its selected scope to Markdown.
5. Share the project access code with stakeholders for read-only review.

Unapproved AI stories stay in the browser tab; approval is required before they are stored on the server or shown to the client. A provider response does not replace agreement with the client.

## Scope and constraints

The implemented MVP concentrates on **discovery and planning**. It does not manage sprint execution, delivery, or maintenance. Each workspace is limited to three active projects and up to five users. AI providers include Gemini, OpenAI, and DeepSeek, using platform credits or an individual user's configured key.

The deployment favors low operating cost for a small review audience over availability and recovery. It uses a Cloudflare-hosted frontend and a single EC2 host for the API and PostgreSQL. It has no automated database backups or failover. See [deployment architecture](../03-architecture/ops/deployment-architecture.md) for the complete limitations.

## Engineering approach

The web app uses React and TypeScript. The FastAPI backend is a modular monolith organized around domain features and Clean Architecture layers. PostgreSQL stores approved artifacts; workspace-scoped application queries enforce tenant boundaries. PostgreSQL row-level security is not implemented.

Tests and CI checks provide engineering evidence, with important gaps: backend type checking is advisory, API integration tests are excluded from CI, and frontend E2E tests are not part of the current CI job. The recorded 70% coverage and WCAG targets are goals rather than proof of achievement.

## Evaluation status

The project can be reviewed through source inspection, local verification, and the [demonstration checklist](./reviewer-guide.md#demonstration-checklist).

Read [evidence and limitations](./evidence-and-limitations.md) for objective-to-artifact traceability, source revisions, and the distinction between implemented behavior and unverified quality claims.

---
sidebar_position: 3
---

# Glossary

This document defines key terms used throughout the requirements and architecture documentation.

## User Roles

**Admin**  
Freelancer account with full CRUD permissions on clients, projects, and user stories. Can invite Viewers, manage API keys, and export requirements.

**Viewer**  
Client contact role with read-only access to granted projects. Can view approved user stories but cannot edit content or access Admin features. Must be invited by Admin.

## Project Lifecycle

**Active Project**  
Project with status "active"; counts toward the 3-project limit per Admin account. Can have user stories added and edited.

**Archived Project**  
Project with status "archived"; does not count toward project limit. Read-only; can be reactivated by changing status to active.

**Deleted Project**  
Soft-deleted project; inaccessible to Admin and Viewer within 24 hours per NFR-X02. Recoverable via support for limited time.

## User Stories

**User Story**  
Approved requirement in standard format: title + "As a [persona], I want [capability], so that [benefit]" + acceptance criteria. Visible to Viewer if approved.

**Draft Story**  
Unapproved AI-refined story pending Admin review. Held only in the Admin's browser tab (session storage) and never stored server-side, so it cannot appear in exports or to a Viewer. Can be edited, approved (which saves it as a User Story), or discarded by Admin.

## Epics & Backlog

**Epic**  
Grouping container for related user stories within a project. Maps to an implementation phase or feature area. Each epic has a unique key (e.g., `EPIC-0`), priority, and lifecycle status (`open`, `in_progress`, `done`). User stories reference their parent epic via `epic_id`.

**Epic Key**  
Human-readable identifier for an epic, unique per project. Follows the convention `EPIC-{n}` (e.g., `EPIC-0`, `EPIC-1`). Used in `story_id` prefixes (`US-EP0-BE-001`) and for Jira integration.

**Backlog**  
Structured view of user stories organized by epic, priority, and status. Supports filtering and reordering per FR-004. Approved stories with acceptance criteria form the backlog deliverable.

## Projects & Clients

**Client**  
Person or organization represented in the system. Projects are associated with one client. Represented by Viewer accounts for requirements review.

**Project**  
Container for user stories; associated with one client. Supports discovery and planning phases in MVP; limited to 3 active projects per Admin.

**Project Status**  
Enum: `active` (counts toward limit), `archived` (excluded from limit), `deleted` (soft-deleted, inaccessible).

## AI & Credits

**Platform Provider**  
AI service using the platform's API keys; consumes user's free credits (5 per account). Limited to 5 refinements unless user adds own API key.

**User Provider**  
AI service using user's own API key (Gemini, OpenAI, or DeepSeek). Unlimited refinements; does not consume platform credits.

**AI Refinement**  
Process of submitting raw notes to AI service and generating structured user story with title, standard format, and acceptance criteria.

**AI Credit**  
Unit of platform AI usage; 1 credit consumed per successful refinement using platform provider. New accounts receive 5 free credits (one-time).

## Authentication & Sessions

**Invitation Token**  
Secure single-use token for Viewer account creation; valid for 7 days. Sent via email; invalidated after first use or expiry.

**Verification Code**  
6-digit alphanumeric code (0-9, A-Z, excluding O/0/I/1) for email verification during account creation or password reset. Expires after 5 minutes.

**Session**  
Authenticated user connection; standard sessions expire after 24 hours, extended sessions after 7 days per NFR-X09. Managed via JWT access tokens and refresh tokens.

## Technical Terms

**MVP Load**  
Expected system capacity for minimum viable product: 10 concurrent Admins + 20 Viewers, 100 requests/min peak, 3 active projects per Admin, 200 total user stories (per NFR-X05).

**RLS (Row Level Security)**  
Database-layer access control enforcing that users can only query data they have permission to access. Used to restrict Viewer access to granted projects only.

**Cross-Cutting NFR**  
Non-functional requirement applying to multiple features; defined in README Cross-Cutting Quality Baseline section (e.g., NFR-X01 through NFR-X10).

---

**Version**: 1.1  
**Last Updated**: 2026-07-30  
**Owner**: Product Owner

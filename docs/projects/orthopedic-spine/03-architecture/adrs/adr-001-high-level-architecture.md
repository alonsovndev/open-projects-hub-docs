# ADR-001: High-Level Architecture Pattern

- **Status**: Proposed
- **Date**: 2026-04-17

## Context

Orthopedic Spine must deliver a bilingual public website, a lightweight admin experience, secure admin/staff access, testimonial approval controls, and minimal-data inquiry handling inside a small-business MVP timeline.

The solution must avoid unnecessary operational complexity while still supporting:

- clear separation between public and protected workflows,
- simple content management for non-technical clinic users,
- role-aware inquiry review for admin and staff,
- privacy-conscious handling of health-adjacent contact requests,
- future evolution if post-MVP demand grows.

## Decision

Adopt a **separate React frontend backed by one modular monolith API** with managed database, authentication, and storage services.

- The frontend serves both the public website and protected admin/staff interfaces.
- The backend is organized around content, testimonials, inquiries, and access-control modules.
- Role and publishing rules are enforced centrally at the API boundary.
- Managed infrastructure is preferred for auth, relational storage, and commodity integrations such as media storage and anti-spam support.

## Consequences

### Positive

- Preserves fast MVP delivery without introducing distributed-system overhead.
- Supports secure role boundaries for admin and staff workflows.
- Keeps future growth options open through explicit internal module boundaries.
- Simplifies operations by relying on managed platform capabilities.

### Negative

- Requires discipline to stop module boundaries from eroding over time.
- A shared frontend means public and admin concerns must be isolated carefully in routing and authorization.
- The single backend deployable can become a bottleneck if future integrations or inquiry volume grow sharply.

## Alternatives Considered

1. **Static site + external CMS/forms**
   - Why it was considered: low setup effort and strong fit for public marketing content.
   - Why it was not selected: weaker fit for scoped staff inquiry review, custom publishing rules, and unified access control.
2. **Traditional full-stack monolith**
   - Why it was considered: simple MVP delivery and fewer moving parts.
   - Why it was not selected: higher risk of mixing public, admin, and data-handling concerns without explicit boundaries.
3. **Serverless/API-per-feature**
   - Why it was considered: scalable and flexible for isolated workloads.
   - Why it was not selected: unnecessary operational fragmentation for the MVP team size and scope.

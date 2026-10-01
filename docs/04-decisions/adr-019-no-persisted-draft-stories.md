# ADR-019: Do Not Persist Draft Stories

**Status**: Accepted  
**Date**: 2026-09-30

## Context

The first implementation of F-002 saved every AI-refined story to a `story_drafts` table
as soon as the provider returned it, so the Admin could edit, discard, and approve by
draft id. The product owner decided this storage is not wanted: refined output is
throwaway until an Admin approves it, and only approved stories belong in the database.

## Decision

- `POST /v1/refinement/generate-stories` returns the refined stories (`title`,
  `description`, `acceptanceCriteria`) and stores nothing. The platform credit is still
  charged after a successful run.
- The web app holds the refined stories in client state and mirrors them to the browser
  tab's `sessionStorage` (keyed by account), so a reload restores them. The browser asks
  for confirmation (`beforeunload`) while unapproved stories exist. Editing and discarding
  are local operations with no API call.
- Approval sends the story content: `POST /v1/refinement/approve-story` (one) and
  `POST /v1/refinement/approve-stories` (several). The server checks that the project is
  in the caller's workspace, validates the content, and saves a `stories` row with the
  caller as creator.
- The `story_drafts` table, its `draftstatus` enum, and the draft endpoints
  (`PATCH`/`DELETE /refinement/drafts/{id}`, `GET /refinement/projects/{id}/drafts`,
  `POST /refinement/drafts/{id}/approve`, `POST /refinement/approve-drafts`) are removed.
  Drafts that existed at migration time are dropped.

## Consequences

### Positive

- Unapproved AI output cannot leak to exports or Viewer paths: it is never stored.
- Less schema, fewer endpoints, and no draft lifecycle (status, applied/duplicate handling).

### Negative

- Unapproved stories survive a reload and in-app navigation, but are lost when the tab is
  closed (or storage is blocked), and the credit spent on that run is not refunded. The raw
  notes can be resubmitted.
- The server cannot detect a repeated approval of the same content (previously a `409`),
  so the client must prevent double submits.
- Approval requests are larger and carry content the client could alter; the server
  re-validates it with the same rules as manual story creation.

## Alternatives Considered

**1. Keep drafts server-side (status quo)**

- Survives refresh and supports resuming from another device.
- Rejected: the product owner does not want draft storage.

**2. Keep refined stories only in memory**

- Simplest client; no storage rules.
- Not selected: a reload loses the output of a paid run. Replaced by `sessionStorage`
  persistence, deliberately not `localStorage`, so unapproved AI output does not outlive
  the tab or cross tabs.

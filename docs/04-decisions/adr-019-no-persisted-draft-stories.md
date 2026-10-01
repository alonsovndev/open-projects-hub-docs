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
- The web app holds the refined stories in client state. Editing and discarding are
  local operations with no API call.
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

- Unapproved stories are lost on refresh or when leaving the page, and the credit spent
  on that run is not refunded. The raw notes can be resubmitted.
- The server cannot detect a repeated approval of the same content (previously a `409`),
  so the client must prevent double submits.
- Approval requests are larger and carry content the client could alter; the server
  re-validates it with the same rules as manual story creation.

## Alternatives Considered

**1. Keep drafts server-side (status quo)**

- Survives refresh and supports resuming from another device.
- Rejected: the product owner does not want draft storage.

**2. Persist drafts in browser storage**

- Would survive a refresh without server storage.
- Not selected: not requested, and it adds client persistence and cleanup rules; it can be
  added later without changing the API.

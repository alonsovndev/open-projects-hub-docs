# ADR-019: Do Not Persist Draft Stories

- **Status**: Accepted
- **Date**: 2026-09-30

## Context

Refined output is throwaway until an Admin or Member approves it, and only approved stories belong in the database. Storing every AI-refined story as a draft would add a draft lifecycle (status, duplicate handling) and risk unapproved output reaching exports or Client Review.

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

## Consequences

### Positive

- Unapproved AI output cannot leak to exports or Client Review: it is never stored.
- Less schema, fewer endpoints, and no draft lifecycle (status, applied/duplicate handling).

### Negative

- Unapproved stories survive a reload and in-app navigation, but are lost when the tab is
  closed (or storage is blocked), and the credit spent on that run is not refunded. The raw
  notes can be resubmitted.
- The server cannot detect a repeated approval of the same content, so the client must
  prevent double submits.
- Approval requests are larger and carry content the client could alter; the server
  re-validates it with the same rules as manual story creation.

## Alternatives Considered

**1. Persist drafts server-side**

- Survives refresh and supports resuming from another device.
- Rejected: the product owner does not want draft storage.

**2. Keep refined stories only in memory**

- Simplest client; no storage rules.
- Not selected: a reload loses the output of a paid run. Replaced by `sessionStorage`
  persistence, deliberately not `localStorage`, so unapproved AI output does not outlive
  the tab or cross tabs.

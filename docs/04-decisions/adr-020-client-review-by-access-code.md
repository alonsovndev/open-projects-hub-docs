# ADR-020: Client Review by Project Access Code (No Viewer Accounts)

- **Status**: Accepted
- **Date**: 2026-10-02

## Context

The platform's users are freelancers: an Admin who owns a workspace and the Members the Admin adds. A freelancer's clients (and the stakeholders at those clients) only need to look at a project's approved user stories to confirm the project is on the right track.

The first design modelled that as a `viewer` user role: an invited, authenticated account with read-only access (F-011). That brought an invitation lifecycle, a role to maintain in every guard and test, and an account for people who never use the rest of the product. It also left the Client Viewer page (`/viewer`) as a demo that returned mock data for any code.

The existing `projects.code` cannot serve as a public key. A freelancer chooses it (`WEB`), it is unique only within a workspace (two freelancers can both use `WEB`), and it is short enough to guess.

## Decision

1. **Remove the `viewer` user role.** Only `admin` and `member` exist. Stakeholders have no account.
2. **Give every project a `access_code`.** Server-generated, `PRJ-` plus 8 characters from a 32-symbol alphabet without `O`, `0`, `I`, `1` (about 10^12 values), unique across all workspaces. Admins and Members see it on the project and can regenerate it, which revokes the previous code immediately.
3. **Expose one public, read-only route**, `GET /v1/viewer/{access_code}`, no token. It returns the project name, phase, and approved stories (priority then age order). It returns no project id, client record, user reference, or workspace identifier.
4. **Resolve the workspace from the code, never from the request.** The access code is the single deliberate cross-workspace read in the repository layer; every other repository method still takes a `workspace_id`.
5. **Rate limit and answer uniformly.** 30 requests per minute per IP. An unknown code and a malformed code both answer `404 Project not found`, so a guesser learns nothing about how close they were.
6. **Name it Client Review.** The page stays at `/viewer`. The word "viewer" no longer names a person or a role.
7. **Migrate existing viewer accounts by deactivating them**, not promoting them, so nobody silently gains write access.

## Consequences

### Positive

- Clients review requirements with no sign-up, invitation email, or password.
- One role fewer in guards, tests, and docs; the access policy reduces to authenticated (Admin or Member) plus one small public surface.
- A leaked link is revoked by regenerating one code.

### Negative

- The access code is a bearer secret: anyone holding it can read that project's approved stories. Sharing it is the freelancer's decision, and the portal is read-only.
- No per-person audit trail or per-stakeholder revocation; revoking means regenerating for everyone.
- The rate limiter is in memory and keyed by IP, so it is not shared across workers and may see only a proxy's address. Entropy of the code, not the limiter, is the primary defence; shared storage and forwarded-IP handling are follow-ups.
- Existing viewer accounts stop working. The migration deactivates them and the downgrade restores only the enum value.

## Alternatives Considered

1. ### Keep the Viewer role and invitations (F-011)
   - Gives per-person access control and an audit trail.
   - Not selected: clients do not use the product beyond reading approved stories, and an account per stakeholder is the wrong cost for that.
2. ### Use the existing `projects.code` as the public key
   - No new column.
   - Not selected: it is unique per workspace only, so a public lookup is ambiguous, and short codes are guessable.
3. ### Signed, expiring share links
   - Stronger revocation and expiry semantics.
   - Not selected for now: more moving parts than the need justifies; a regenerable code covers revocation. Can be layered on later.

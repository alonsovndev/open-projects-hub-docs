---

US-EP2-BE-001 — User Authentication Service

▎ Reviewed and validated — correctly implemented. Verified live against the running API: valid credentials return an access token, refresh token, and `sessionExpiresAt`; invalid credentials return 401 "Invalid credentials" with no account-existence disclosure. Login is rate-limited 10/minute per IP on top of per-account lockout. No code changes needed.

US-EP2-BE-002 — Password Reset and Recovery

▎ Reviewed and validated — implemented as a 6-digit emailed code, not the reset *link* this story originally described. The code-based design is what F-009, ADR-005, and the API contract all specify, so the story's acceptance criteria were the stale artifact and have been corrected here rather than the code. Verified live: codes are stored bcrypt-hashed (`$2b$12$…`, never plaintext), superseded codes are marked used, and an unknown or expired code returns 404 with a non-specific message.

US-EP2-BE-003 — Login Lockout and Logout

▎ Found and fixed one AC violation: the failed-attempt counting window was 30 minutes, while FR-007-04 and NFR-007-01 both specify "5 attempts per 15 minutes per account". Set `ATTEMPT_WINDOW_MINUTES = 15` in `account_lockout_service.py`. Verified live: the 6th consecutive failure returns 429 "Account temporarily locked. Try again in 15.0 minutes.", and a non-existent email locks out identically so the response never discloses whether the account exists. Logout was validated end-to-end through the UI — the request carries its access token, returns 200, records the revocation in `revoked_refresh_tokens`, and a replay of that refresh token is rejected with 401. Note: the access token itself stays valid for its remaining ≤15 minutes, which is the documented short-expiry mitigation, not a defect.

US-EP2-BE-004 — Session Lifetime, Remember-Me, and Token Rotation

▎ Reviewed and validated — correctly implemented. Verified live: a standard login expires in 24 hours and a `rememberMe` login in 7 days (confirmed from the returned `sessionExpiresAt`); refresh rotates single-use tokens and rejects any reuse; forced logout via the `users.token_version` bump invalidates every refresh token issued earlier, and is triggered automatically after a password reset. The 5-minutes-remaining signal is delivered as `sessionExpiresAt` on login and refresh for the client to schedule against. No code changes needed.

US-EP2-BE-005 — Reset Code Lifecycle and Rate Limiting

▎ Found and fixed a real gap: the "3 code requests per email per 15-minute window" cap (NFR-009-02, FR-009-04) was enforced only on `/resend-reset-code`. `POST /forgot-password` had no per-email cap at all — verified live by issuing **5 codes for the same address in seconds**, each one emailed. Extracted the window check into `issue_reset_code.is_request_rate_limited` and applied it to both paths so they count against one shared window and cannot drift. The initial-request path answers a capped address with the same generic 200 rather than a 429, because a 429 there would distinguish a rate-limited address from an unregistered one and reopen account enumeration; resend keeps its 429, since the caller has already identified the account by that step. Re-verified live: the 4th and 5th requests now issue no code and send no email. Added two unit tests. Expiry (5 min), single-use invalidation, hashed storage, and the 5-attempt validation cap (429 on the 6th) were all already correct and are verified live.

US-EP2-FE-001 — Login Page and Authentication Flows

▎ Found and fixed a blocker reproduced live in the browser: the login form ran the **new-password** policy against the sign-in field, so a password lacking an uppercase letter or symbol was rejected client-side and the request was never sent — any account whose password predates the current UI policy could not log in at all, and the policy was disclosed on a public login screen. Removed the policy validator from the login field (it still requires a non-empty password) and dropped the now-dead policy/strength returns from the hook. Verified live: an account with `legacypass1` — valid per the API's letter+digit policy — is now rejected or accepted by the server, not the form. Added `use-admin-login-form.test.tsx` as a regression guard. The expired-session redirect message now renders on the login page.

US-EP2-FE-002 — Password Reset Page and Flows

▎ Reviewed and validated — reworked correctly to the code-based flow (6-character code input with `autocomplete="one-time-code"`, resend action, server-error surfacing). One design consequence worth recording: the reset step takes the email from router state, so opening `/reset-password` directly — including after a page reload — shows a "Start from Forgot Password" prompt with submit disabled rather than a usable form. That is deliberate for a same-session flow, but it means the reset step is not resumable. Two FR details from F-009 are not surfaced yet: the masked-email confirmation (FR-009-02) and remaining-attempts feedback (FR-009-04).

US-EP2-FE-003 — Session Expiry Warning and Remember-Me

▎ Reviewed and validated — remember-me is present, labelled, and keyboard reachable (confirmed in the live accessibility tree), and drives the extended 7-day session. The 5-minute warning modal offers "Stay signed in" backed by a token refresh, and expiry redirects to login with an explanatory message. Gap closed during review: this was the epic's most intricate new logic and shipped with no unit tests — added `use-session-expiry-warning.test.tsx` (6 tests) covering the quiet period, the warning firing at the 5-minute lead, mounting already inside the lead window, the expiry redirect, a malformed timestamp treated as expired, and a session with no expiry.

US-EP2-REL-001 / US-EP2-REL-002 — Release F-007 and F-009

▎ Not release-ready. Both stories require every F-007/F-009 story to be complete **on `dev`**, and none of the three feature branches (`feature/auth-session-management`, `feature/auth-session-refresh-expiry`, `feature/docs-auth-api-updates`) has a PR open or is merged. Quality gates on the branches are green: 556 backend unit tests and ruff clean; 120 frontend tests, ESLint and `tsc --noEmit` clean. Two caveats for the release checklist: (1) the backend unit suite only passes with `APP_ENV=test` — without it the `dev` profile is selected and the presentation tests hit a live Postgres, which is how CI runs it but is a trap locally; (2) `src/tests/conftest.py` was missing the three new auth models from the model-import list it explicitly mirrors from `alembic/env.py`, which made SQLAlchemy mapper resolution depend on test collection order — imports added.

Cross-cutting findings (no story owns these)

▎ Pre-existing, outside this epic's diff, recorded so they are not lost: unhandled 500s return the raw SQLAlchemy error and SQL text in `detail` (observed while the local database was un-migrated) — an information-disclosure risk that belongs with the EPIC-9 error-contract work. The API contract also still documents the base path as `/api/v1` while the service serves `/v1`, and lists `410` for an expired reset code where the implementation returns `404`.

# ADR-018: User API Key Encryption at Rest

**Status**: Accepted  
**Date**: 2026-09-20

## Context

F-010 lets a user store their own AI provider credentials (Gemini, OpenAI, DeepSeek) so
refinement runs on their quota once their free platform credits are gone. Those keys are
third-party secrets belonging to the user, and a leak bills them and exposes their account.

NFR-010-01 requires them encrypted at rest with "AES-256 or equivalent". NFR-010-04 adds
OWASP secret-handling expectations: no keys in logs or traces, transport over HTTPS only,
and secure deletion rather than a soft flag.

**What did not already answer this:**

- [ADR-011](./adr-011-secrets-management.md) covers *platform* secrets — the JWT signing
  key, database credentials, the Sentry DSN — and says how they reach the runtime. It says
  nothing about encrypting an application data field, and it rules out paid secret
  infrastructure with a hard $0-cost constraint.
- [Security Architecture](../03-architecture/security/security-architecture.md) lists
  "future encryption keys for sensitive fields" as **deferred post-MVP**.
- F-010's NFR-010-04 cites "ADR-012 Secrets Management", which does not exist: ADR-012 is
  containerization, and the secrets ADR is ADR-011. Those references are corrected as part
  of this decision.

RDS already encrypts storage at rest with AWS-managed KMS keys, but that only protects the
physical volume. It does not protect against a SQL injection, an over-broad read grant, a
leaked database dump, or a backup restored somewhere else — all of which return plaintext
if the column is plaintext. Field-level encryption is what closes those.

## Decision

Encrypt each stored provider key at the application layer with **AES-256-GCM**, using a
single master key supplied to the runtime as an environment variable.

**1. Algorithm: AES-256-GCM**

- `cryptography.hazmat.primitives.ciphers.aead.AESGCM` with a 32-byte key.
- A fresh 12-byte nonce per encryption, stored alongside the ciphertext, so two users with
  the same key — or one user re-saving the same key — never produce identical rows.
- AEAD, so the ciphertext is authenticated: tampering is detected rather than decrypting
  to garbage that then gets sent to a provider.
- The owning `user_id` is bound as **associated data**. A ciphertext copied onto another
  user's row fails authentication instead of decrypting, so a row-level mix-up cannot hand
  one user another's credentials.

**2. Master key: `API_KEY_ENCRYPTION_KEY`**

- Base64-encoded 32 bytes, injected exactly as `SECRET_KEY` already is (ADR-011 §3).
- Validated at construction: absent, placeholder, non-base64, or wrong-length values fail
  fast rather than silently writing rows nobody can read later.
- `dev`, `container`, and `prod` have **no default** and fail to start without it. `local`
  and `test` carry a repo-visible throwaway default so the suite and a laptop run need no
  setup; that key is public by construction, which is why it is confined to those two.

**3. Key versioning**

- Every row stores `key_version`. A ciphertext whose version does not match the running
  deployment is refused outright rather than decrypted with the wrong key.
- This is what makes the rotation runbook below possible at all.

**4. Handling rules**

- No plaintext column, and no endpoint that returns a key. The only representation the API
  exposes is `masked_key` (first 7 and last 4 characters).
- Decryption happens at one point only: immediately before calling the provider.
- Keys travel to providers in request **headers**, never a query string — `httpx` embeds
  the request URL in its exception messages, which would carry the key into logs and Sentry.
- Provider failures are logged by exception *type*, never message, for the same reason.
- Deletion is a hard `DELETE`.

## Consequences

**Positive:**

- Meets NFR-010-01 literally, at $0, within ADR-011's constraints.
- Defends against the realistic leak paths RDS volume encryption does not cover: dumps,
  backups, over-broad grants, injection.
- AEAD plus user binding turns two whole classes of bug — silent corruption and
  cross-account key mix-up — into loud failures.
- One dependency (`cryptography`), already a transitive dependency of much of the Python
  ecosystem and actively maintained.

**Negative:**

- The platform holds a master key that can decrypt every stored user key. That is the
  trade for not paying for a KMS.
- Rotation is a deliberate operational task, not automatic (see the runbook).
- One more required environment variable per deployed environment.

**Risks:**

- **Master key leaked** — every stored user key is compromised.
  - _Mitigation_: same injection path and access controls as `SECRET_KEY`; keys are
    user-scoped so blast radius is bounded by rotation speed; rotation runbook below.
- **Master key lost** — every stored key becomes permanently undecryptable.
  - _Mitigation_: the failure is explicit, not silent — an undecryptable row returns a 422
    telling the user to re-enter the key, so the recovery path is self-service rather than
    an opaque 500.
- **Rotation performed without re-encryption** — every existing row stops working at once.
  - _Mitigation_: `key_version` makes stale rows detectable rather than mysterious; the
    runbook sequences re-encryption before the version bump.

## Rotation Runbook

NFR-010-01 requires a documented rotation procedure. Rotation is **not** automatic.

1. Generate a new key:
   `python -c "import base64, os; print(base64.b64encode(os.urandom(32)).decode())"`
2. Deploy with both keys available (new as `API_KEY_ENCRYPTION_KEY`, previous retained) so
   the re-encryption step can read old rows and write new ones.
3. Run the re-encryption job: for each `user_api_keys` row, decrypt under the old key and
   version, re-encrypt under the new key, and write the new `key_version`.
4. Verify no rows remain at the old `key_version`.
5. Remove the previous key from the environment and bump `CURRENT_KEY_VERSION`.
6. Rehearse in `dev` before `prod`. Re-encryption is idempotent per row and safe to resume.

If step 3 is skipped, every stored key returns the 422 "delete it and add the key again"
path. That is recoverable by the user but visible to them, so it is not an acceptable
substitute for the runbook.

## Alternatives Considered

**1. AWS KMS envelope encryption**

- Strongest key custody: the master key never leaves KMS, rotation is managed, and every
  decrypt is auditable in CloudTrail.
- Rejected: adds a `boto3` dependency and an AWS round-trip on every refinement, requires
  credentials and network access in local development and CI, and carries a per-request
  cost that violates ADR-011's $0 constraint.

**2. Fernet (`cryptography.fernet`)**

- Simpler API, and handles nonces and timestamps for you.
- Rejected: Fernet is AES-**128**-CBC with HMAC. Defensible as "equivalent strong
  encryption", but it does not satisfy the literal "AES-256" in NFR-010-01, and it has no
  associated-data channel, so the user-binding property above would be lost.

**3. Rely on RDS storage encryption alone**

- Zero application work; already enabled.
- Rejected: protects the volume, not the value. A dump, a restored backup, an over-broad
  grant, or a SQL injection all yield plaintext, and a column of live third-party
  credentials is exactly the wrong thing to leave readable to anyone who can read the table.

**4. Do not store keys; ask per refinement**

- Nothing at rest, so nothing to leak.
- Rejected: F-010's whole purpose is uninterrupted use once free credits run out. Pasting a
  key per refinement is worse for the user and pushes the secret through the UI repeatedly.

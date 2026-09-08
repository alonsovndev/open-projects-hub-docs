# F-010 AI Credits and API Key Management

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.4                         |
| **Status**       | Accepted                    |
| **Readiness**    | Ready for Implementation    |
| **Owner**        | Product Owner               |

## Context

- **Problem**: New users need frictionless access to AI refinement features without upfront API key setup, while power users need unlimited usage with their own provider credentials.
- **Primary Persona**: Admin (Freelancer)
- **In Scope**: 5 free AI refinement credits per account, credit tracking and consumption, secure API key management for Gemini/OpenAI/DeepSeek, immediate key validation, provider selection UI.
- **Out of Scope**: Credit purchase/payment system, credit renewal/regeneration, team-shared API keys (keys are per-user), automatic provider fallback, per-provider usage analytics, support-assisted credit grants, automatic key re-validation, persistent provider selection memory.

## Functional Requirements

| ID        | Requirement                                                                                                            | Source               | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                                                              | Status    |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| FR-010-01 | New Admin accounts receive 5 free AI refinement credits granted after email verification completion (F-008 FR-008-06). | MVP scope            | Must     | Product Owner | —                            | User sees credit balance (5/5) in UI header/navigation; credits persist across sessions; initialized automatically via post-verification hook from F-008; credit counter visible before first refinement attempt. | Clarified |
| FR-010-02 | Each successful AI refinement consumes 1 credit; failed refinements do not consume credits.                            | Fair usage policy    | Must     | Product Owner | —                            | Credit counter decrements by 1 only after successful AI response returned; counter visible before and after action with visual feedback (e.g., "4/5 remaining"); failed requests (timeout, error, cancellation) leave balance unchanged; counter updates immediately without page refresh. | Clarified |
| FR-010-03 | When credits reach 0, AI refinement action is blocked with clear prompt to add API key.                                | Conversion flow      | Must     | Product Owner | —                            | Refinement button disabled when credits = 0 and no user API keys configured; modal or banner displays "No credits remaining. Add your own API key to continue unlimited refinements." with "Add API Key" CTA linking to settings page; user can dismiss prompt and navigate to settings manually. | Clarified |
| FR-010-04 | Admin can add, update, and delete API key for each supported provider (Gemini, OpenAI, DeepSeek) via settings page.    | Provider flexibility | Must     | Product Owner | —                            | Settings page has dedicated "AI Providers" section with three provider forms (Gemini, OpenAI, DeepSeek); one active key per provider allowed; keys persist securely in database; users can replace existing key with new one (overwrite) or delete key entirely; delete action requires confirmation prompt. | Clarified |
| FR-010-05 | API keys are validated immediately on save using provider's test endpoint.                                             | Security baseline    | Must     | Product Owner | —                            | Invalid keys rejected before save with specific errors: format error ("Invalid key format"), auth error ("Unauthorized - check your key"), network error ("Unable to reach provider"); valid keys save successfully with confirmation toast "API key saved successfully"; validation rate-limited to 5 attempts per user per hour; validation in progress shows loading indicator. | Clarified |
| FR-010-06 | When valid API key exists for any provider, user can select which provider to use for refinement.                      | User control         | Must     | Product Owner | —                            | AI refinement UI shows provider dropdown selector with options: "Platform" (if credits > 0), "Gemini", "OpenAI", "DeepSeek" (filtered to only show configured providers); default selection: Platform if credits > 0, otherwise first configured provider alphabetically; selection persists for current session; selector disabled if only one option available. | Clarified |
| FR-010-07 | API keys are displayed masked (e.g., `sk-proj-***...abc`) and can be replaced/deleted but not viewed in plaintext.     | Security baseline    | Must     | Product Owner | —                            | Settings shows key status as "Configured" with last 4 characters visible (e.g., "***xyz123"); no plaintext retrieval endpoint exists; user can overwrite with new key or delete entirely; masked format consistent across all UI (settings, error messages, logs); "Copy" button not provided (prevents accidental sharing). | Clarified |
| FR-010-08 | Users with active API keys bypass platform credit checks and use their own provider quota when selected.               | Unlimited user usage | Must     | Product Owner | —                            | Refinements using user-provided API key do not decrement platform credit counter; provider-specific quota/rate limit errors surface with actionable messages per FR-010-10; credit counter UI shows "Using your [provider] API key" during refinement; switch to platform provider re-enables credit consumption. | Clarified |
| FR-010-09 | Deleting API key reverts active refinements to platform provider (if credits available); otherwise blocks refinement.  | Provider fallback    | Should   | Product Owner | —                            | Key deletion triggers provider selector refresh; if platform credits > 0, selector defaults to "Platform"; if credits = 0 and no other keys configured, refinement blocked with FR-010-03 prompt; deletion shows confirmation: "Delete [provider] API key? Future refinements will use platform credits or other configured providers."; deletion takes effect immediately. | Clarified |
| FR-010-10 | Provider-specific errors return actionable messages with guidance.                                                     | Error handling       | Must     | Product Owner | —                            | Quota exceeded → "Your [provider] quota is exhausted. Upgrade your plan or switch providers."; Auth failed → "API key rejected by [provider]. Check your key in Settings."; Network error → "Unable to connect to [provider]. Check your connection and retry."; Rate limit → "Rate limit exceeded for [provider]. Try again in [duration] or switch providers."; messages include link to settings or provider selector. | Clarified |
| FR-010-11 | System detects invalid/expired keys during refinement and prompts user to update key in settings.                      | Key validation       | Must     | Product Owner | —                            | Invalid/expired key error during refinement shows modal: "[Provider] API key is invalid or expired. Update your key in Settings to continue." with "Go to Settings" and "Switch Provider" buttons; modal blocks refinement retry until resolved; user can switch to another provider or update key; modal dismissible, but refinement remains blocked for that provider until fixed. | Clarified |
| FR-010-12 | System warns user when their API key is approaching provider quota limits (if detectable).                            | User experience      | Should   | Product Owner | Q-030                        | When provider API returns quota warning header or usage response indicates >80% consumed, display dismissible banner: "Your [provider] quota is running low. Consider upgrading your plan or adding another provider."; shown once per session; relies on provider API exposing usage metrics (best-effort, not guaranteed for all providers). | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                         | Metric / Target                                                                                                                      | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status    |
| ---------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- | ---------------------------- | --------- |
| NFR-010-01 | API keys are encrypted at rest using AES-256 or equivalent strong encryption.       | Keys stored encrypted in database using AES-256; decryption only at runtime per request; encryption secret managed in secure environment store (not in code or config files); encryption key rotation procedure documented.    | Must     | Tech Lead   | —                            | Clarified |
| NFR-010-02 | API keys are never logged, exposed in error payloads, or returned in API responses. | Code review + automated checks enforce no plaintext key exposure; masked format (last 4 chars only) in all UI/API responses; audit logging redacts keys from all log entries; integration tests verify no key leakage in error responses. | Must     | Tech Lead   | —                            | Clarified |
| NFR-010-03 | API key validation requests are rate-limited to prevent abuse.                      | Max 5 validation attempts per user per hour; lockout message shown after limit: "Validation limit reached. Try again in [time]."; rate limits logged for security monitoring; per-user tracking prevents enumeration attacks.            | Must     | Tech Lead   | —                            | Clarified |
| NFR-010-04 | API key management satisfies OWASP secret handling best practices.                  | Aligns with ADR-012 Secrets Management; keys stored in dedicated table with row-level security; no keys in application logs or error traces; transmission over HTTPS only; secure deletion (not soft delete) when user removes key.        | Must     | Tech Lead   | —                            | Clarified |
| NFR-010-05 | Credit balance and API key settings load within 500ms.                              | Credit counter and key status render without blocking main navigation; lazy-loaded if needed; satisfies NFR-X05 performance baseline; loading states shown for >200ms delays.                                        | Should   | Tech Lead   | —                            | Clarified |
| NFR-010-06 | API key management UI meets WCAG 2.1 AA accessibility standards.                    | Form inputs, masked key display, validation feedback, error messages, and action buttons are keyboard-navigable; screen-reader compatible with proper ARIA labels; focus indicators visible; error messages announced to assistive tech.        | Should   | UI/UX Lead  | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**:
  - **F-008 Account Creation** (integration point) - credit initialization triggered after email verification per F-008 FR-008-06
  - **F-002 AI Refinement workflow** (consumer) - F-002 calls credit consumption API and uses provider selection data; F-010 provides credit system contract
  - Security Architecture and ADR-012 Secrets Management for encryption strategy
  - Email delivery service for account verification (prevents multi-account credit farming)
  - Provider SDK integration for Gemini, OpenAI, and DeepSeek APIs
  - Environment secret store for master encryption key and platform API keys

- **Risks**:
  - **Master encryption key leaked**: All user API keys compromised; **mitigation**: secure secret management, access auditing, and key rotation runbook
  - **Provider API validation costs**: Validation requests consume platform quota; **mitigation**: rate limiting (5/hr per user) and minimal test requests
  - **Credit fraud via multiple accounts**: Platform quota abuse; **mitigation**: email verification requirement, IP-based rate limiting, and usage monitoring
  - **User API key becomes invalid after saving**: Refinements fail unexpectedly; **mitigation**: clear provider-specific error messages per FR-010-10/FR-010-11 and easy key replacement flow
  - **Encryption key rotation needed**: Potential downtime if not planned; **mitigation**: pre-launch re-encryption script, staging testing, and documented runbook
  - **Provider SDK version incompatibility**: Refinements fail after provider updates; **mitigation**: pinned SDK versions, provider changelog monitoring, and integration tests

## Traceability

- **Related Open Questions**: Q-004, Q-005, Q-006, Q-007, Q-008 (AI refinement workflow context)
- **Related User Stories**: [Backend Engineer Stories](../06-work-items/README.md), [Frontend Engineer Stories](../06-work-items/README.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security/security-architecture.md), [ADR-012: Secrets Management Strategy](../04-decisions/adr-011-secrets-management.md)
- **Related Features**: [F-002: AI Refinement and Approval Workflow](./f-002-ai-refinement-and-approval-workflow.md), [F-008: Account Creation](./f-008-create-account.md)
- **Related Prototype**: [Stitch Prompt](../05-prototype/README.md)

---

## User Experience Flows

### Flow 1: New User Trial (Platform Credits)

1. User completes account creation and email verification
2. User is granted 5 AI refinement credits automatically
3. User sees credit balance in UI (e.g., "5 credits remaining")
4. User submits raw notes for AI refinement
5. System processes refinement using platform's AI provider
6. Credit counter decrements to 4 after successful refinement
7. User continues until credits reach 0
8. System blocks refinement action and displays prompt: "You've used all 5 free refinements. Add your own API key to continue unlimited."

### Flow 2: Adding Custom API Key

1. User navigates to Settings → API Keys (via prompt or menu)
2. User sees provider options: Gemini, OpenAI, DeepSeek
3. User enters API key for chosen provider (e.g., OpenAI key)
4. System validates key immediately by testing with provider
5. **If valid**: Key is saved securely; confirmation message shown; provider becomes available in refinement UI
6. **If invalid**: Error message displayed (e.g., "Invalid API key format" or "Unauthorized - check your key"); key is not saved
7. User can repeat for additional providers if desired

### Flow 3: Refinement with Custom API Key

1. User with configured API key(s) initiates AI refinement
2. System shows provider selector dropdown: Platform (if credits remain), Gemini, OpenAI, DeepSeek (filtered to configured keys)
3. User selects preferred provider
4. System processes refinement using selected provider's API with user's key
5. Platform credits are **not consumed** when using user's own key
6. If provider returns error (quota exceeded, rate limit), system surfaces provider-specific message
7. User can switch to different provider or address provider issue

### Flow 4: Managing API Keys

1. User navigates to Settings → API Keys
2. User sees list of configured providers with masked keys (e.g., "sk-proj-\*\*\*...abc")
3. User can:
   - **Replace key**: Enter new key for same provider; system validates and replaces if valid
   - **Delete key**: Remove key; provider no longer available in selector
   - **View status**: See when key was last validated successfully
4. User cannot retrieve original plaintext key after saving

## Open Questions for Implementation Team

| ID    | Question                                                                                                               | Impact Area        | Status   | Resolution |
| ----- | ---------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- | ---------- |
| Q-030 | Should the system detect and warn users when their API key is approaching provider quota limits?                       | User Experience    | Resolved | **Yes** - Added FR-010-12 for quota warning notification |
| Q-031 | Should the system remember user's last-selected provider as default for next refinement?                               | User Experience    | Resolved | **No** - Out of scope; user selects provider per refinement |
| Q-032 | Should platform support re-validating stored keys periodically and notifying users if keys become invalid?             | Reliability        | Resolved | **No** - Out of scope; validation only on save and during use (FR-010-11) |
| Q-033 | If team features are added later, should API keys be team-shared or remain per-user?                                  | Future Scope       | Resolved | **Per-user** - API keys remain user-scoped; team sharing deferred to future |
| Q-034 | Should support staff have ability to manually grant additional credits for edge cases (e.g., user encountered bug)?   | Support Operations | Resolved | **No** - Out of scope for MVP; no support credit grants |

---

**Last Updated**: 2026-07-30

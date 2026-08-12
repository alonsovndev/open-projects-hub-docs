# Stories for Epic: AI Monetization and Configuration

## UI/UX Designer

### US-EP6-UX-001: API Key & Credits Settings Interface Design

**Story ID**: US-EP6-UX-001
**Epic Link**: EPIC-6
**Priority**: Must Have
**Effort Estimate**: 3
**Status**: TODO
**Labels**: design, ux, ai, monetization, configuration

**As a** UI/UX Designer,
**I want to** design the settings interface for API key management and credit status,
**So that** users can clearly understand their credit balance and configure provider keys without confusion.

**Acceptance Criteria**:

- [ ] Given a user on the settings page, when they review their AI section, then credit balance and remaining free credits are clearly visible.
- [ ] Given a user adding an API key, when they submit, then validation feedback is clear and secure (no key echoing).
- [ ] Given a user with zero credits, when they attempt refinement, then the prompt to add a key is actionable and non-blocking.

**Deliverables**:

- Settings page wireframes for credit display and API key CRUD.
- High-fidelity mockups for provider selection and key input states.
- Accessibility annotations for labels, errors, and keyboard flow.

**Dependencies**:

- [Feature Requirements: F-010](../../01-requirements/f-010-ai-credits-and-api-key-management.md).
- [Prototype Brief](../../04-prototype/prototype-brief.md).

**Success Metrics**:

- Users can identify their credit status and configure keys without guidance.
- Design assets support accessible implementation across target devices.

---

## Backend Engineer

### US-EP6-BE-001: AI Credit Management Service

**Story ID**: US-EP6-BE-001
**Epic Link**: EPIC-6
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: backend, ai, monetization, configuration

**As a** Backend Engineer,
**I want to** implement a service to manage AI credits,
**So that** user's AI usage can be tracked and limited.

**Acceptance Criteria**:

- [ ] Given a new user is created, when their account is finalized, then they are allocated 5 free AI credits.
- [ ] Given a user with credits performs an AI refinement, when the action is complete, then their credit count is decremented by one.
- [ ] Given a user with zero credits attempts an AI refinement, when they do not have their own API key configured, then the action is blocked with an error message.

**Deliverables**:

- Service to track and update user AI credit counts.
- Database modifications to store credit information.
- Unit tests for credit allocation, decrementation, and blocking logic.

**Dependencies**:

- [Database Design](../../03-architecture/database/database-design.md).
- [API Contract](../../03-architecture/api/api-contract.md).

**Success Metrics**:

- Credit system accurately tracks usage.
- The 5 free credits are correctly allocated to new users.

---

### US-EP6-BE-002: User API Key Management

**Story ID**: US-EP6-BE-002
**Epic Link**: EPIC-6
**Priority**: Must Have
**Effort Estimate**: 5
**Status**: TODO
**Labels**: backend, ai, monetization, configuration

**As a** Backend Engineer,
**I want to** create endpoints for managing user API keys,
**So that** users can securely store and use their own AI provider credentials.

**Acceptance Criteria**:

- [ ] Given a user provides a valid API key for a supported provider, when they save it, then the key is securely encrypted and stored.
- [ ] Given a user has a saved API key, when they perform an AI refinement, then the system uses their key instead of the platform's.
- [ ] Given a user deletes their API key, when they save the change, then the key is removed from the system.

**Deliverables**:

- API endpoints for CRUD operations on user API keys.
- Secure storage mechanism for encrypted keys.
- Unit tests for API key management.

**Dependencies**:

- [ADR-006: Secret Management](../../03-architecture/adrs/adr-011-secrets-management.md).
- [API Contract](../../03-architecture/api/api-contract.md).

**Success Metrics**:

- User API keys are stored securely.
- The system correctly prioritizes user keys over platform credits/keys.

## Frontend Engineer

### US-EP6-FE-001: API Key Management Interface

**Story ID**: US-EP6-FE-001
**Epic Link**: EPIC-6
**Priority**: Must Have
**Effort Estimate**: 8
**Status**: TODO
**Labels**: frontend, ai, monetization, configuration

**As a** Frontend Engineer,
**I want to** create a settings page for API key management,
**So that** users can configure their own AI provider keys.

**Acceptance Criteria**:

- [ ] Given the settings page, when a user navigates to it, then they see options to add, view, and delete API keys.
- [ ] Given a user adds a new key, when they submit the form, then the key is sent to the backend.
- [ ] Given the user's free credits are exhausted, when they attempt an AI refinement, then they are prompted to add their own API key.

**Deliverables**:

- A settings page or modal for API key management.
- Integration with backend endpoints for managing keys.
- UI feedback for credit status and key configuration.

**Dependencies**:

- [Prototype Brief](../../04-prototype/prototype-brief.md).
- [API Contract](../../03-architecture/api/api-contract.md).

**Success Metrics**:

- Users can manage their API keys through the UI.
- The UI clearly communicates credit status and prompts for key entry when needed.

# F-002 AI Refinement and Approval Workflow

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.3                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: Admin needs to turn unstructured input into consistent user stories while preserving review control.
- **Primary Persona**: Admin (Freelancer)
- **In Scope**: Raw note input, ambiguity highlighting, AI-generated story template, Admin edits, explicit approval gate.
- **Out of Scope**: Automatic publishing without approval, non-text input formats.

## Functional Requirements

| ID        | Requirement                                                                                                | Source                      | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                               | Status    |
| --------- | ---------------------------------------------------------------------------------------------------------- | --------------------------- | -------- | ------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------- |
| FR-002-01 | AI refinement accepts raw notes and bullet lists as input.                                                 | Open Questions Q-005        | Must     | Product Owner | Q-005                        | AI input field accepts plain text without markdown, HTML, or file upload requirements.                            | Clarified |
| FR-002-02 | AI output generates user stories using title, standard user story format, and acceptance criteria.         | Open Questions Q-004, Q-007 | Must     | Product Owner | Q-004, Q-007                 | Each generated story includes a title, the standard user story sentence, and at least one acceptance criterion.   | Clarified |
| FR-002-03 | Admin can edit AI-generated content and explicitly approve before it becomes an official project artifact. | Open Questions Q-006        | Must     | Product Owner | Q-006                        | Generated stories remain draft until Admin approval; unapproved content is excluded from exports.                 | Clarified |
| FR-002-04 | When AI service fails or times out, system displays error, preserves draft input, and allows retry.        | Reliability                 | Must     | Product Owner | —                            | AI failures show actionable error message (timeout: "Request timed out after 30 seconds", network: "Connection failed", provider error: specific message); user input preserved in draft; retry button available; draft can be saved for later. | Clarified     |
| FR-002-05 | Admin can save, edit, and delete draft (unapproved) stories.                                               | Workflow flexibility        | Must     | Product Owner | —                            | Draft stories persist in project with "Draft" badge; Admin can resume editing from project view; delete removes draft without affecting approved stories; confirmation prompt shown before delete. | Clarified     |
| FR-002-06 | AI input is limited to 5000 characters and sanitized for script injection.                                 | Security and constraints    | Must     | Product Owner | —                            | Input field enforces 5000 char limit with live counter (e.g., "2341/5000"); input sanitized server-side before processing; script tags, HTML, and SQL injection patterns rejected with error "Input contains invalid characters".       | Clarified     |
| FR-002-07 | Each successful AI refinement consumes 1 credit from F-010 credit system when using platform provider.                   | Credit integration          | Must     | Product Owner | —                            | Platform provider refinements call F-010 credit consumption API; credit counter decrements per F-010 FR-010-02; user-provided API keys bypass credit system per F-010 FR-010-08.  | Clarified     |
| FR-002-08 | Admin can select AI provider (Platform/Gemini/OpenAI/DeepSeek) before initiating refinement.               | Provider flexibility        | Must     | Product Owner | —                            | Provider selector shows available options per F-010 FR-010-06 (platform if credits > 0, configured user providers); selection persisted for session; defaults to platform if credits available, otherwise first configured provider. | Clarified     |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                          | Metric / Target                                                                                                          | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status    |
| ---------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- | ---------------------------- | --------- |
| NFR-002-01 | AI workflow follows baseline security protections for login and credential handling. | Satisfies NFR-X01 security baseline (OWASP Top 10, rate limiting, credential protection).    | Must     | Tech Lead   | —                            | Clarified |
| NFR-002-02 | AI refinement interactions remain responsive for core flows.                         | Satisfies NFR-X05 performance baseline; refinement request completes within 30 seconds with progress indicator shown after 3 seconds; timeout after 30 seconds with error per FR-002-04. | Should   | Tech Lead   | —                            | Clarified     |
| NFR-002-03 | AI refinement interaction patterns meet baseline accessibility.                      | Requirements views and primary workflows meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels; provider selector, input field, error messages, and action buttons are keyboard-accessible and screen-reader compatible.   | Should   | UI/UX Lead  | —                            | Clarified     |

## Dependencies and Risks

- **Dependencies**: 
  - **F-010 AI Credits and API Key Management** - provides credit system (FR-010-01, FR-010-02), provider selection (FR-010-06), and API key validation; F-002 consumes credit consumption API and provider availability data
  - Prompt design consistency for reliable AI output quality
  - Approval state persistence in database
  
- **Risks**: 
  - Ambiguity highlights can be noisy and reduce trust; **mitigation**: manual override capability and tunable sensitivity threshold
  - AI service unavailability disrupts workflow; **mitigation**: error handling per FR-002-04 (preserve input, allow retry), fallback provider options per FR-002-08
  - Credit system dependency creates hard coupling; **mitigation**: F-010 defines stable credit consumption API contract (decrement on success, no charge on failure)

## Traceability

- **Related Open Questions**: Q-004, Q-005, Q-006, Q-007, Q-008
- **Related User Stories**: [Backend Engineer Stories](../06-user-stories/backend-engineer-stories.md)
- **Related Architecture/ADR**: [API Contract](../03-architecture/api-contract.md)
- **Related Features**: [F-010: AI Credits and API Key Management](./f-010-ai-credits-and-api-key-management.md)
- **Related Prototype**: [Stitch Prompt](../05-prototype/stitch-prompt.md)

---

---

**Last Updated**: 2026-07-30

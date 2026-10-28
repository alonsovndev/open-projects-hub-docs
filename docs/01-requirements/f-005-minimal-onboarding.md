# F-005 Minimal Onboarding

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Projects Hub |
| **Version**      | 1.3                         |
| **Status**       | Accepted                    |
| **Document role** | Requirements baseline |
| **Owner**        | Product Owner               |

These requirements record the design baseline. “Clarified” describes specification status, not a passing acceptance test. See [evidence and limitations](../00-context/evidence-and-limitations.md) for implementation support and validation gaps.

## Context

- **Problem**: New Admin users need immediate guidance to adopt the AI refinement workflow.
- **Primary Persona**: Admin (first-time user)
- **In Scope**: Welcome message, contextual tooltip guidance for core workflow.
- **Out of Scope**: Extended onboarding tours and training modules.

## Functional Requirements

| ID        | Requirement                                                                            | Source               | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                          | Status    |
| --------- | -------------------------------------------------------------------------------------- | -------------------- | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------ | --------- |
| FR-005-01 | The MVP provides minimal onboarding through a welcome message and contextual tooltips triggered on first login after account creation and email verification. | Open Questions Q-021 | Should   | Product Owner | Q-021                        | First-time Admin users see a welcome message and at least one tooltip explaining the AI refinement workflow. | Clarified |
| FR-005-02 | User can dismiss onboarding tooltips permanently via settings or temporarily via X button.                 | User control                | Should   | Product Owner | —                            | Tooltips have X button; dismissal persisted; settings page has "Reset onboarding" option; dismissed tooltips don't reappear.           | Clarified |
| FR-005-03 | System detects first login after email verification (F-008) and triggers onboarding flow.                  | Trigger logic               | Must     | Product Owner | —                            | First-login flag set after F-008 email verification completion; onboarding triggered on first F-007 login; flag cleared after onboarding shown. | Clarified |

## Implementation note

The current system meets FR-005-01 and FR-005-03 with a different shape than the criteria describe:

- **Welcome, not tooltips.** A single welcome modal is shown on the dashboard to workspace Admins who have not dismissed it. It carries the AI refinement guidance; there are no anchored tooltips, so the "at least one tooltip" criterion of FR-005-01 and the X-button-per-tooltip wording of FR-005-02 are not met literally.
- **A timestamp, not a cleared flag.** `users.onboarding_completed_at` is `NULL` until the Admin dismisses the welcome (`PATCH /v1/users/me/onboarding`). Existing accounts were backfilled as completed when the column was added. Instead of clearing a flag after showing, the welcome stays until it is dismissed.
- **Dismissal is persisted and reversible.** The Settings page has a "Reset onboarding" control, which meets the persistence and reset parts of FR-005-02.
- **No step tracker.** US-EP8-BE-001 (resumable progress) was deferred.

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                     | Metric / Target                                                                                                        | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | ------ |
| NFR-005-01 | Onboarding guidance meets baseline accessibility expectations.  | Requirements views and primary workflows meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels. | Should   | UI/UX Lead    | —                            | Clarified |
| NFR-005-02 | Onboarding scope remains consistent with MVP delivery timeline. | Onboarding scope stays within the Phase 1 allocation of the delivery window defined by NFR-X08.               | Should   | Product Owner | —                            | Clarified |

## Dependencies and Risks

- **Dependencies**: UX copy decisions, tooltip placement in core flow, first-login detection logic.
- **Risks**: Overly sparse guidance may increase abandonment; mitigation is validating tooltip clarity with first-time user feedback.

## Traceability

- **Related Open Questions**: Q-021
- **Related Architecture/ADR**: [Architecture Solution Design](../03-architecture/core/architecture-solution-design.md)
- **Related Prototype**: [Design Direction](../05-prototype/design-direction.md)

---

**Last Updated**: 2026-07-30

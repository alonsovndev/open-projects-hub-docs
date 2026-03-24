# F-005 Minimal Onboarding

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.0                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-03-23                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: New Admin users need immediate guidance to adopt the AI refinement workflow.
- **Primary Persona**: Admin (first-time user)
- **In Scope**: Welcome message, contextual tooltip guidance for core workflow.
- **Out of Scope**: Extended onboarding tours and training modules.

## Functional Requirements

| ID        | Requirement                                                                            | Source               | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                          | Status    |
| --------- | -------------------------------------------------------------------------------------- | -------------------- | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------ | --------- |
| FR-005-01 | The MVP provides minimal onboarding through a welcome message and contextual tooltips. | Open Questions Q-021 | Should   | Product Owner | Q-021                        | First-time Admin users see a welcome message and at least one tooltip explaining the AI refinement workflow. | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                     | Metric / Target                                                                                                        | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Status |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------- | ------ |
| NFR-005-01 | Onboarding guidance meets baseline accessibility expectations.  | Requirements views and primary workflows meet WCAG 2.1 AA for contrast, keyboard navigation, and screen reader labels. | Should   | UI/UX Lead    | —                            | Draft  |
| NFR-005-02 | Onboarding scope remains consistent with MVP delivery timeline. | MVP scope remains achievable within 1–1.5 month delivery window, assuming defined scope and constraints.               | Should   | Product Owner | —                            | Draft  |

## Dependencies and Risks

- **Dependencies**: UX copy decisions, tooltip placement in core flow, first-login detection logic.
- **Risks**: Overly sparse guidance may increase abandonment; mitigation is validating tooltip clarity with first-time user feedback.

## Traceability

- **Related Open Questions**: Q-021
- **Related User Stories**: [UI/UX Designer Stories](../../04-user-stories/ui-ux-designer-stories.md)
- **Related Architecture/ADR**: [Architecture Solution Design](../../03-architecture/architecture-solution-design.md)
- **Related Prototype**: [Design Direction](../../05-prototype/design-direction.md)

---

## Change Log

| Date       | Version | Change Summary                        | Author        |
| ---------- | ------- | ------------------------------------- | ------------- |
| 2026-03-23 | 1.0     | Initial feature requirements created. | Product Owner |

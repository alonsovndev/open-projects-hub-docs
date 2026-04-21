# Epic: Minimal Onboarding and Entry Flow

**Epic Key**: EPIC-7
**Summary**: Improve first-use quality through onboarding and entry clarity.
**Labels**: onboarding, entry-flow
**Priority**: Must Have
**Components**: Frontend
**Fix Version**: MVP-1

---

**Problem Statement:** The MVP can be functional without polished first-use flows, but account creation, onboarding, and landing clarity are needed to reduce friction after the core planning workflow is stable.

**Objective:** Improve first-use quality through better onboarding, clearer public entry messaging, and a smoother account-creation path.

Included scope:

- Minimal onboarding guidance for first-time Admin users
- Landing page value proposition and CTA clarity
- Account-creation flow and next-step routing

Excluded scope:

- Full guided tours, marketing content systems, and campaign pages
- Paid plan, subscription, or commercial conversion workflows
- Team onboarding and collaborator provisioning

Related feature and requirement IDs: F-005, F-006, F-008; FR-005-01, FR-006-01, FR-006-02, FR-006-03, FR-008-01, FR-008-02, FR-008-03; NFR-005-01, NFR-005-02, NFR-006-01, NFR-006-02, NFR-008-01, NFR-008-02

Dependencies:

- [Feature Requirements](../../01-requirements/f-005-minimal-onboarding.md)
- [Feature Requirements](../../01-requirements/f-006-landing-page.md)
- [Feature Requirements](../../01-requirements/f-008-create-account.md)
- [Phased Roadmap](../../02-planning/phased-roadmap.md)

Measurable success criteria:

- First-time users can identify the next valid action after landing, registration, and first login.
- Account creation and onboarding flows use accessible, plain-language guidance.
- Phase 1 improvements do not expand MVP scope into team or commercial features.

Acceptance criteria:

- Given a visitor lands on the public entry page, when they scan the hero and CTA area, then login and account creation paths are immediately clear.
- Given a new Admin completes registration, when the flow ends, then the next step routes clearly to login or onboarding.
- Given a first-time Admin enters the core workflow, when onboarding guidance is shown, then it explains the refinement path without becoming a blocker to task completion.

# Stories for Epic: Inquiry and appointment request baseline

## Product Owner

### US-PO-MVP-002: Confirm MVP request-flow scope and privacy guardrails

**Story ID**: US-PO-MVP-002
**Epic Link**: EPIC-02
**Priority**: Must Have
**Effort Estimate**: 3

**As a** Product Owner,
**I want to** finalize the MVP inquiry-flow scope, approved field set, and submission expectations,
**So that** the clinic can capture qualified requests without creating privacy or delivery risk.

**Acceptance Criteria**:

- [ ] Given MVP request scope, when the story is approved, then the flow captures only minimal contact and request details allowed by Q-002.
- [ ] Given the approved MVP behavior, when launch scope is reviewed, then the request flow does not include direct booking or automated scheduling commitments.
- [ ] Given Phase 1 follow-up options, when backlog boundaries are reviewed, then WhatsApp continuation is tracked as a later validation path rather than an MVP dependency.

**Deliverables**:

- Approved field-scope checklist for the MVP request flow.
- Requirement traceability for F-002 and privacy-related launch constraints.
- Stakeholder notes for success messaging and manual follow-up expectations.

Dependencies:

- [F-002 Inquiry and Appointment Request Flow](../../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [Open Questions](../../open-questions.md)
- [Phased Roadmap](../../02-planning/phased-roadmap.md)

Success Metrics:

- Scope approval removes ambiguity around direct booking, minimal data capture, and follow-up expectations.
- Phase 1 WhatsApp continuation remains explicitly deferred from MVP delivery.

## Frontend Engineer

### US-FE-MVP-001: Build the MVP inquiry request interaction

**Story ID**: US-FE-MVP-001
**Epic Link**: EPIC-02
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Frontend Engineer,
**I want to** implement the mobile-first inquiry and appointment-request interaction,
**So that** prospective patients can submit a request quickly and receive clear feedback about the next step.

**Acceptance Criteria**:

- [ ] Given the MVP request form, when required data is missing or invalid, then users receive clear field-level validation feedback.
- [ ] Given an approved submission, when the form completes successfully, then the UI confirms receipt and explains that follow-up remains manual.
- [ ] Given a mobile-first visitor, when the interaction is tested, then the flow stays short and usable without unnecessary field expansion.

**Deliverables**:

- Request-form interaction definition aligned to the approved MVP field set.
- Success, validation, and failure-state requirements for the request flow.
- Traceability to the request endpoint and launch privacy baseline.

Dependencies:

- [F-002 Inquiry and Appointment Request Flow](../../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [Prototype Brief](../../05-prototype/prototype-brief.md)
- [API Contract](../../03-architecture/api/api-contract.md)

Success Metrics:

- The request interaction remains understandable and completable within the target mobile time budget.
- Feedback states align with privacy and non-booking MVP expectations.

## Reference

- [F-002 Inquiry and Appointment Request Flow](../../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [Open Questions](../../open-questions.md)
- [Prototype Brief](../../05-prototype/prototype-brief.md)

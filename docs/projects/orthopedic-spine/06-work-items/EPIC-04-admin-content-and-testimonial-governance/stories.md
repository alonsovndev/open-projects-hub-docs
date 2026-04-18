# Stories for Epic: Admin content and testimonial governance

## Product Owner

### US-PO-MVP-004: Finalize admin content-governance scope for MVP

**Story ID**: US-PO-MVP-004
**Epic Link**: EPIC-04
**Priority**: Must Have
**Effort Estimate**: 3

**As a** Product Owner,
**I want to** define the approved MVP boundaries for content maintenance and testimonial moderation,
**So that** admin workflows stay simple, safe, and aligned with launch needs.

**Acceptance Criteria**:

- [ ] Given the MVP admin backlog, when scope is approved, then service content, testimonial moderation, and bilingual content updates are included.
- [ ] Given testimonial publication rules, when governance is reviewed, then explicit approval is required before public release.
- [ ] Given launch boundaries, when admin scope is validated, then full operations management and non-essential workflow complexity remain out of scope.

**Deliverables**:

- MVP scope definition for content CRUD and testimonial approval.
- Requirement traceability for F-004 and related governance NFRs.
- Stakeholder sign-off on content-maintenance boundaries.

Dependencies:

- [F-004 Admin Content and Testimonial Management](../../01-requirements/f-004-admin-content-and-testimonial-management.md)
- [Open Questions](../../open-questions.md)
- [Phased Roadmap](../../02-planning/phased-roadmap.md)

Success Metrics:

- Admin content-governance scope is approved without ambiguity around publishing authority.
- MVP boundaries remain limited to approved content and moderation workflows.

## Backend Engineer

### US-BE-MVP-001: Define admin content and testimonial moderation workflow

**Story ID**: US-BE-MVP-001
**Epic Link**: EPIC-04
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** support admin content and testimonial moderation flows,
**So that** approved public content can be updated safely without exposing unapproved testimonials.

**Acceptance Criteria**:

- [ ] Given admin content workflows, when services or public content are managed, then the flow supports the approved MVP CRUD scope.
- [ ] Given testimonial records, when a publication action is attempted, then approval status is required before the record can go live.
- [ ] Given bilingual content maintenance, when content is updated, then the workflow preserves launch-language coverage expectations.

**Deliverables**:

- Workflow definition for admin service and testimonial management endpoints.
- Approval-state handling notes for testimonial publication.
- Traceability to admin content and moderation API contracts.

Dependencies:

- [F-004 Admin Content and Testimonial Management](../../01-requirements/f-004-admin-content-and-testimonial-management.md)
- [API Contract](../../03-architecture/api/api-contract.md)
- [Role Mapping](../../02-planning/role-mapping.md)

Success Metrics:

- Content-management workflows stay within the approved MVP boundary and role model.
- Testimonial publication controls clearly enforce the required approval state.

## Reference

- [F-004 Admin Content and Testimonial Management](../../01-requirements/f-004-admin-content-and-testimonial-management.md)
- [API Contract](../../03-architecture/api/api-contract.md)
- [Role Mapping](../../02-planning/role-mapping.md)

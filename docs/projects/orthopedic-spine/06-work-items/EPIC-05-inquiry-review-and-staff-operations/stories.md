# Stories for Epic: Inquiry review and staff operations

## Product Owner

### US-PO-MVP-005: Approve staff workflow boundaries for inquiry review

**Story ID**: US-PO-MVP-005
**Epic Link**: EPIC-05
**Priority**: Must Have
**Effort Estimate**: 3

**As a** Product Owner,
**I want to** define the approved MVP scope for staff inquiry review and operational-detail updates,
**So that** daily clinic operations stay simple without expanding into unsupported admin or CRM workflows.

**Acceptance Criteria**:

- [ ] Given the MVP staff workflow, when scope is approved, then staff can review inquiries and maintain approved operational details only.
- [ ] Given the inquiry-handling model, when MVP boundaries are reviewed, then follow-up remains manual and does not require automated scheduling.
- [ ] Given role boundaries, when scope is validated, then staff access excludes full content governance and other admin-only workflows.

**Deliverables**:

- Staff workflow scope definition for inquiry review and operational-detail updates.
- Requirement traceability for F-005 and related role-boundary dependencies.
- Stakeholder alignment notes with clinic operations participants.

Dependencies:

- [F-005 Inquiry Review and Staff Operations](../../01-requirements/f-005-inquiry-review-and-staff-operations.md)
- [Role Mapping](../../02-planning/role-mapping.md)
- [Prototype Brief](../../05-prototype/prototype-brief.md)

Success Metrics:

- Staff workflow scope is approved without ambiguity around manual follow-up or edit permissions.
- Operational users can identify the MVP inbox and update surfaces they own.

## Backend Engineer

### US-BE-MVP-002: Define scoped inquiry inbox and operational-detail workflow

**Story ID**: US-BE-MVP-002
**Epic Link**: EPIC-05
**Priority**: Must Have
**Effort Estimate**: 5

**As a** Backend Engineer,
**I want to** support the staff inquiry inbox and operational-detail update workflow,
**So that** authorized staff can review requests and keep clinic information current within role boundaries.

**Acceptance Criteria**:

- [ ] Given authorized staff access, when the inquiry inbox is opened, then only essential request details needed for follow-up are exposed.
- [ ] Given a staff update to operational details, when the workflow is used, then only approved fields such as hours or contact details are within scope.
- [ ] Given the MVP role model, when inquiry or clinic-profile changes are submitted, then role enforcement prevents access outside the staff workflow boundary.

**Deliverables**:

- Workflow definition for inquiry-list, inquiry-update, and operational-detail update endpoints.
- Scoped field-access notes for staff-visible inquiry and clinic-profile data.
- Traceability to role-enforcement and manual follow-up requirements.

Dependencies:

- [F-005 Inquiry Review and Staff Operations](../../01-requirements/f-005-inquiry-review-and-staff-operations.md)
- [F-006 Admin Access and Role Boundaries](../../01-requirements/f-006-admin-access-and-role-boundaries.md)
- [API Contract](../../03-architecture/api/api-contract.md)

Success Metrics:

- Staff workflows expose only approved inquiry and operational-detail fields.
- Inquiry review and operational updates remain aligned to the two-role MVP model.

## Reference

- [F-005 Inquiry Review and Staff Operations](../../01-requirements/f-005-inquiry-review-and-staff-operations.md)
- [Role Mapping](../../02-planning/role-mapping.md)
- [API Contract](../../03-architecture/api/api-contract.md)

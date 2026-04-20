# Epic: Inquiry review and staff operations

**Epic Title**: Inquiry review and staff operations
**Epic Key**: EPIC-05
**Summary**: Support staff inquiry review and scoped operational-detail updates without adding full CRM complexity.
**Labels**: mvp, staff-workflows, inquiries, operations
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1

---

**Epic Description:**
Problem Statement: Staff need lightweight inquiry-review workflows and operational-detail updates that fit daily clinic work without broad admin complexity.

Objective: Deliver a scoped staff workflow for inquiry visibility, manual follow-up support, and approved operational-detail maintenance.

Included scope:

- Staff visibility into incoming inquiries and essential follow-up details
- Scoped updates for approved operational details such as hours and contact information
- Manual follow-up workflow support without CRM or scheduling expansion

Excluded scope:

- Automated scheduling, CRM pipelines, or detailed reporting dashboards
- Broad content-management capabilities beyond approved staff scope
- Complex workflow routing or attribution requirements

Related feature and requirement IDs: F-005; FR-005-01, FR-005-02, FR-005-03, NFR-005-01, NFR-005-02

Dependencies:

- [Project Requirements by Feature](../../01-requirements/readme.md)
- [F-005 Inquiry Review and Staff Operations](../../01-requirements/f-005-inquiry-review-and-staff-operations.md)
- [Role Mapping](../../02-planning/role-mapping.md)
- [API Contract](../../03-architecture/api/api-contract.md)

Measurable success criteria:

- New staff can review and route an inquiry in under five minutes during validation.
- Staff can update approved operational details without gaining full admin access.
- Inquiry handling remains clearly manual for MVP and avoids unsupported CRM scope.

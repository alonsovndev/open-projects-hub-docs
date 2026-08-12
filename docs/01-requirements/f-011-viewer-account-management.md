# F-011 Viewer Account Management

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Project**      | Open Freelancer Project Hub |
| **Version**      | 1.2                         |
| **Status**       | Clarified                   |
| **Last Updated** | 2026-07-30                  |
| **Owner**        | Product Owner               |

## Context

- **Problem**: Admins need to grant project access to client contacts (Viewers) for requirements review, but Viewers should not be able to create accounts independently or access projects without explicit permission.
- **Primary Persona**: Admin (for invitation management), Viewer (for account setup and project access)
- **In Scope**: Email-based Viewer invitation, secure invitation token workflow, Viewer password setup, project access grant/revoke, Viewer account listing, invitation expiry and resend.
- **Out of Scope**: Viewer self-registration, Viewer-to-Viewer invitation, team-wide access grants, role-based permission customization beyond read-only, Viewer account deletion by Viewer, Admin notification on Viewer acceptance, Viewer-initiated access requests.

## Functional Requirements

| ID        | Requirement                                                                                                | Source                  | Priority | Owner (DRI)   | Decision Traceability (Q-ID) | Acceptance Criteria                                                                                                                               | Status |
| --------- | ---------------------------------------------------------------------------------------------------------- | ----------------------- | -------- | ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| FR-011-01 | Admin can invite Viewer by entering email address and selecting projects to grant access to.               | Access control baseline | Must     | Product Owner | —                            | Invitation form accepts email; Admin selects one or more projects; system generates invitation and sends email.                                   | Clarified |
| FR-011-02 | Viewer receives email invitation with secure single-use token link valid for 7 days.                       | Security baseline       | Must     | Product Owner | —                            | Email delivered within 30 seconds per NFR-X10; link format: `/invite/accept?token=<token>`; token expires after 7 days or first use.              | Clarified |
| FR-011-03 | Viewer can set password and complete account setup via invitation link.                                    | Onboarding workflow     | Must     | Product Owner | —                            | Invitation link routes to setup page; Viewer enters name and password (per F-008 password rules); account created upon submission.                | Clarified |
| FR-011-04 | Admin can grant or revoke Viewer access to specific projects after invitation is accepted.                 | Access management       | Must     | Product Owner | —                            | Admin settings show list of Viewers per project; Admin can add/remove project access; changes effective immediately.                              | Clarified |
| FR-011-05 | Viewer can only view projects they have been explicitly granted access to.                                 | Access control baseline | Must     | Product Owner | —                            | Viewer dashboard shows only granted projects; attempting to access non-granted project returns 403 Forbidden.                                     | Clarified |
| FR-011-06 | Admin can view list of all Viewers with their project access permissions and invitation status.            | Admin visibility        | Must     | Product Owner | —                            | Admin settings page shows: Viewer email, name, invitation status (pending/accepted), projects granted, invitation date.                           | Clarified |
| FR-011-07 | Admin can resend invitation email if Viewer did not receive it or if invitation expired.                   | User support            | Should   | Product Owner | —                            | Admin can click "Resend Invitation" for pending invitations; new token generated; previous token invalidated; rate-limited to 3 resends per hour. | Clarified |
| FR-011-08 | Admin can revoke invitation before Viewer accepts it.                                                      | Access control baseline | Should   | Product Owner | —                            | Admin can cancel pending invitation; invitation token invalidated; invitation link returns error message.                                         | Clarified |
| FR-011-09 | Viewer account is created only after invitation acceptance; unaccepted invitations do not create accounts. | Data integrity          | Must     | Product Owner | —                            | System stores pending invitations separately; account record created only upon password setup completion.                                         | Clarified |
| FR-011-10 | Expired invitations are automatically cleaned up after 7 days from expiry date.                            | Data management         | Should   | Product Owner | Q-035                        | System purges invitation records 7 days after expiry; Admin can no longer resend; Viewer sees generic error if attempting to use cleaned-up link. | Clarified |
| FR-011-11 | Viewer can change their own password after account creation.                                              | Account management      | Must     | Product Owner | Q-039                        | Viewer account settings include "Change Password" option; password validation per F-008 FR-008-09; old password required for change.              | Clarified |
| FR-011-12 | When Admin deletes a project, all Viewer access grants for that project are automatically revoked.         | Data integrity          | Must     | Product Owner | Q-040                        | Project deletion triggers cascade revocation of Viewer access; Viewers no longer see deleted project in their list; access check returns 404.     | Clarified |

## Feature-Scoped Non-Functional Requirements

| ID         | Requirement                                                                            | Metric / Target                                                                                                     | Priority | Owner (DRI) | Decision Traceability (Q-ID) | Status |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | ---------------------------- | ------ |
| NFR-011-01 | Invitation tokens are cryptographically secure and single-use.                         | Tokens generated with 32+ bytes of entropy; invalidated after first use or 7-day expiry; stored hashed in database. | Must     | Tech Lead   | —                            | Clarified |
| NFR-011-02 | Viewer access permissions are enforced at data layer via Row Level Security.           | Supabase RLS policies restrict Viewer queries to only granted projects; verified via security testing.              | Must     | Tech Lead   | —                            | Clarified |
| NFR-011-03 | Invitation email delivery satisfies NFR-X10 email notification requirements.           | 95% delivered within 30 seconds; retry logic per NFR-X10; failure feedback shown to Admin.                          | Must     | Tech Lead   | —                            | Clarified |
| NFR-011-04 | Viewer invitation and access management UI meets WCAG 2.1 AA standards.                | Forms, lists, and feedback messages are keyboard-navigable and screen-reader compatible.                            | Should   | UI/UX Lead  | —                            | Clarified |
| NFR-011-05 | Admin can manage unlimited Viewer accounts per project without performance degradation for MVP scope.      | Viewer list and project access management pages load within 500ms; no hard limit on Viewers per project for MVP.                | Should   | Tech Lead   | Q-038                        | Clarified |

## Dependencies and Risks

- **Dependencies**:
  - F-003 Access Control and Visibility Boundaries for role definitions and permission enforcement.
  - F-008 Account Creation for password validation rules and account setup patterns.
  - NFR-X10 Email Notification System for invitation delivery infrastructure.
  - Security Architecture and RLS policies for permission enforcement at data layer.
  - F-001 Client and Project Lifecycle Management for project association.

- **Risks**:
  - **Invitation email delivery failures**: Viewer cannot accept invitation; mitigation is NFR-X10 retry logic and Admin resend capability (FR-011-07).
  - **Token exposure via forwarded emails**: Invitation link could be shared; mitigation is single-use tokens and 7-day expiry.
  - **Viewer access not properly restricted**: Viewer could access unauthorized projects; mitigation is RLS enforcement (NFR-011-02) and security testing.
  - **Admin overwhelmed by Viewer management**: Large projects with many Viewers become difficult to manage; mitigation is NFR-011-05 performance target and future bulk operations.
  - **Expired invitation confusion**: Viewer attempts to use old link and sees unclear error; mitigation is clear expiry messaging and Admin resend option.

## Traceability

- **Related Open Questions**: Q-001 (workspace definition), Q-008 (access control scope)
- **Related User Stories**: [Backend Engineer Stories](../06-user-stories/backend-engineer-stories.md), [Frontend Engineer Stories](../06-user-stories/frontend-engineer-stories.md)
- **Related Architecture/ADR**: [Security Architecture](../03-architecture/security/security-architecture.md), [ADR-005: Authentication and Authorization Strategy](../03-architecture/adrs/adr-005-authentication.md)
- **Related Features**: [F-003: Access Control and Visibility Boundaries](./f-003-access-control-and-visibility-boundaries.md), [F-008: Account Creation](./f-008-create-account.md)
- **Related Prototype**: [Design Direction](../05-prototype/design-direction.md)

---

## User Experience Flows

### Flow 1: Admin Invites Viewer

1. Admin navigates to Project Settings → Viewers
2. Admin clicks "Invite Viewer" button
3. Admin enters Viewer email address
4. Admin selects one or more projects to grant access to
5. Admin clicks "Send Invitation"
6. System validates email format
7. **If email already has pending invitation**: System shows warning "Invitation already sent to this email. Resend?"
8. **If valid**: System generates secure token, stores invitation, sends email per NFR-X10
9. Admin sees confirmation: "Invitation sent to [email]"
10. Admin sees Viewer in pending invitations list with status "Pending"

### Flow 2: Viewer Accepts Invitation

1. Viewer receives email with subject: "You've been invited to review [Project Name]"
2. Viewer clicks invitation link in email
3. System validates token
4. **If expired or invalid**: System shows error "This invitation has expired or is no longer valid. Contact the project admin for a new invitation."
5. **If valid**: System routes to invitation acceptance page
6. Viewer sees welcome message and project(s) they'll have access to
7. Viewer enters full name and password (validation per F-008 FR-008-09)
8. Viewer clicks "Complete Setup"
9. System creates Viewer account, invalidates token, grants project access
10. System routes Viewer to login page with success message: "Account created! Please log in."

### Flow 3: Admin Manages Viewer Access

1. Admin navigates to Project Settings → Viewers
2. Admin sees list of Viewers (pending and active) with columns: Name, Email, Status, Projects, Invited Date
3. Admin clicks on Viewer row to expand details
4. Admin sees project access list for that Viewer
5. **To add project access**: Admin clicks "Add Project", selects from dropdown, clicks "Grant Access"
6. **To revoke project access**: Admin clicks "Revoke" next to project name, confirms in modal
7. System updates access immediately; Viewer sees change on next page load
8. Admin sees updated project list for Viewer

### Flow 4: Admin Resends or Revokes Invitation

1. Admin navigates to Project Settings → Viewers
2. Admin sees pending invitation with status "Pending" and date "Invited 5 days ago"
3. **To resend**: Admin clicks "Resend Invitation", system generates new token, invalidates old token, sends new email
4. **To revoke**: Admin clicks "Revoke Invitation", confirms in modal, system invalidates token and removes pending invitation
5. Admin sees confirmation message for action taken

### Flow 5: Viewer Logs In and Accesses Granted Projects

1. Viewer logs in via F-007 Admin Login (same login page for both roles)
2. System authenticates Viewer credentials
3. System routes Viewer to Viewer Dashboard (distinct from Admin workspace)
4. Viewer sees list of projects they have access to
5. Viewer clicks on project name
6. System shows project's approved user stories per F-004 (Viewer read-only view)
7. Viewer can export requirements if FR-004-05 allows (or blocked if Admin-only)
8. Viewer sees only approved requirements per F-004 (read-only view).

## Open Questions for Implementation Team

| ID    | Question                                                                                              | Impact Area        | Status   | Resolution |
| ----- | ----------------------------------------------------------------------------------------------------- | ------------------ | -------- | ---------- |
| Q-035 | Should expired invitations be automatically cleaned up after X days or persist indefinitely?          | Data management    | Resolved | **Cleaned up after 7 days** - Added FR-011-10 for automatic invitation cleanup |
| Q-036 | Should Admin be notified when Viewer accepts invitation?                                              | User experience    | Resolved | **No** - Out of scope; Admin can check invitation status manually |
| Q-037 | Can Viewer request access to additional projects or must Admin grant proactively?                     | Access workflow    | Resolved | **No** - Out of scope; only Admin can grant access proactively |
| Q-038 | Should there be a limit on number of Viewers per project for MVP?                                     | Scalability        | Resolved | **No** - Updated NFR-011-05; no hard limit for MVP |
| Q-039 | Should Viewer be able to change their own password after account creation?                            | Account management | Resolved | **Yes** - Added FR-011-11 for Viewer password change capability |
| Q-040 | If Admin deletes a project, what happens to Viewer access grants for that project?                    | Data integrity     | Resolved | **Revoked** - Added FR-011-12 for cascade revocation on project deletion |

---

## Change Log

| Date       | Version | Change Summary                                                                                                       | Author        |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------- | ------------- |
| 2026-07-30 | 1.2     | Validated requirements and moved all requirements to Clarified status after implementation team review. | Product Owner |
| 2026-07-30 | 1.1     | Resolved open questions Q-035 to Q-040; added FR-011-10 to FR-011-12; updated NFR-011-05; clarified out-of-scope.   | Product Owner |
| 2026-07-30 | 1.0     | Initial feature requirements for Viewer account management.                                                          | Product Owner |

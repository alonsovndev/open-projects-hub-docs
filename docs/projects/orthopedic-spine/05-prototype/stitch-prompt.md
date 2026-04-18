# Stitch Prompt: Orthopedic Spine MVP Prototype

## Purpose

Use this file to generate a fast, consistent clickable prototype in Stitch that stays aligned with the orthopedic-spine requirements and prototype brief.

## Scope Guardrails

The prototype must not introduce:

- Direct booking flows, calendar slot picking, or patient portal behavior
- Patient records, billing, telehealth, or unsupported health-data workflows
- CRM, analytics dashboards, or automation-heavy follow-up features
- Extra roles beyond public visitor, admin, and staff
- Large dashboard shells or complex navigation not defined in project docs

## Source Alignment

Use these as the source of truth before regenerating prototype pages:

- [Project Overview](../overview.md)
- [User Personas](../user-personas.md)
- [Project Requirements by Feature](../01-requirements/readme.md)
- [F-001 Public Website and Trust Experience](../01-requirements/f-001-public-website-and-trust-experience.md)
- [F-002 Inquiry and Appointment Request Flow](../01-requirements/f-002-inquiry-and-appointment-request-flow.md)
- [F-003 Clinic Profile, Location, and Social Presence](../01-requirements/f-003-clinic-profile-location-and-social-presence.md)
- [F-004 Admin Content and Testimonial Management](../01-requirements/f-004-admin-content-and-testimonial-management.md)
- [F-005 Inquiry Review and Staff Operations](../01-requirements/f-005-inquiry-review-and-staff-operations.md)
- [F-006 Admin Access and Role Boundaries](../01-requirements/f-006-admin-access-and-role-boundaries.md)
- [Prototype Brief](./prototype-brief.md)
- [Design Direction](./design-direction.md)

## Consolidated Stitch Prompt (Copy & Paste)

```markdown
Generate a clickable responsive stakeholder prototype for **Orthopedic Spine**.

## Objective

Show a trustworthy bilingual clinic website experience that helps prospective patients understand services, trust the practice, and submit a low-friction inquiry or appointment request.

Also show the lightweight internal MVP workflows for:

- **Admin** users who manage content and publish approved testimonials
- **Staff** users who review inquiries and update approved operational details

Keep the experience calm, accessible, and practical. It should feel like a modern clinic website plus a small internal operations workspace, not a patient portal or complex medical system.

## Product Scope

- Roles:
  - **Public visitor / prospective patient**
  - **Admin**
  - **Staff**
- MVP boundaries:
  - Public website with services, testimonials, contact/request flow, location details, and bilingual-ready content
  - Secure sign-in for internal users
  - Admin content editing and testimonial approval
  - Staff inquiry review and scoped operational-detail updates
- Primary flow:
  - Public visitor learns about the clinic and submits a short inquiry/request
- Secondary flows:
  - Admin updates content and intentionally publishes approved testimonials
  - Staff reviews incoming inquiries and updates hours/contact details

## Global Design System

- Use Ant Design-style web components.
- Keep the interface content-first, reassuring, and easy to scan.
- Use a restrained neutral palette with one primary accent for high-priority actions.
- Make trust signals, CTA clarity, and role boundaries obvious.
- Public pages should feel warm and professional.
- Internal pages should feel lightweight, structured, and safe.

## Shared Layout Rules

- Public pages should keep one dominant CTA visible above the fold.
- Keep a lightweight language toggle visible on public pages.
- Use clear section spacing for services, testimonials, inquiry form, and location blocks.
- Internal pages should show the current role and page purpose near the top.
- Use simple stacked panels or two-column layouts on desktop, but avoid a heavy dashboard shell.
- On mobile, collapse to single-column layouts with full-width CTAs and preserved helper text.

## Required Pages

### 1. Public Home and Trust Landing

**Purpose**

Help a prospective patient decide whether the clinic is relevant and trustworthy.

**Required content**

- Hero with bilingual-ready value proposition
- Primary CTA: **Request an Appointment**
- Secondary CTA: **Contact the Clinic**
- Plain-language service summary cards
- Trust signals:
  - testimonials
  - clinician credibility or experience summary
  - reassurance copy about care approach
- Lightweight language toggle for Spanish and English
- Short privacy-safe note that the website supports inquiries, not direct booking

**Required states**

- Default
- Language-switched variant
- Testimonial-empty fallback

### 2. Inquiry and Appointment Request

**Purpose**

Provide a short, privacy-conscious request flow without implying real-time booking.

**Required content**

- Page title: **Request an Appointment or Contact the Clinic**
- Minimal fields only:
  - full name
  - phone or preferred contact method
  - email
  - service or reason for inquiry
  - preferred day/time window
  - short message
- Helper text telling users not to submit sensitive medical details
- Anti-spam confidence cue
- Primary action: **Send Request**
- Secondary action: **Back to Services**

**Required states**

- Default
- Validation error
- Loading
- Success confirmation that explains the clinic will follow up manually

### 3. Location, Hours, and Contact Details

**Purpose**

Help users confirm practical visit and contact details before or after submitting a request.

**Required content**

- Clinic address
- Business hours
- Phone and WhatsApp contact blocks
- Email/contact option
- Embedded map or map placeholder
- Social links for Facebook, Instagram, WhatsApp, and YouTube
- Clear CTA back to inquiry/request flow
- Bilingual-ready operational content

**Required states**

- Default
- Map fallback
- Language-switched variant

### 4. Admin Sign In

**Purpose**

Provide a secure but simple entry point to protected clinic workflows.

**Required content**

- Page title: **Admin and Staff Sign In**
- Email field
- Password field
- Primary action: **Sign In**
- Short helper text explaining this area is for protected clinic workflows only

**Required states**

- Default
- Validation error
- Loading
- Generic invalid-credentials message that does not reveal sensitive details

### 5. Admin Content and Testimonial Management

**Purpose**

Show how an Admin updates public-facing content and explicitly approves testimonials before publishing.

**Required sections**

1. **Role and page header**
   - Role badge: **Admin**
   - Page title for content management
   - Small status note such as draft or published

2. **Content management panels**
   - Services content
   - Clinic profile content
   - Bilingual editing cue or language tabs

3. **Testimonials section**
   - Testimonial cards or list
   - Approval status labels such as **Pending Approval** and **Approved**
   - Explicit publish or approve action

4. **Confirmation behavior**
   - Modal or dialog that confirms intentional publication

**Required states**

- Empty
- Editing / unsaved changes
- Saving
- Publish success
- Publish blocked because approval is missing

### 6. Staff Inquiry Inbox and Operational Updates

**Purpose**

Show the scoped internal workflow for reviewing new inquiries and updating approved operational details.

**Required sections**

1. **Role and page header**
   - Role badge: **Staff**
   - Page title for inquiry review

2. **Inquiry list**
   - Recent inquiries
   - Lightweight status or priority labels

3. **Inquiry detail**
   - Minimal follow-up information only
   - Manual next-step note

4. **Operational detail editor**
   - Hours
   - Phone
   - Contact details

5. **Permission boundary cue**
   - Clear notice that testimonial publishing and broader content administration are unavailable

**Required states**

- Empty inbox
- Default with inquiries
- Filtered or selected inquiry
- Save success
- Permission-restricted notice

### 7. Optional Phase 1 Success Variant: WhatsApp Continuation

**Purpose**

Validate the future-state success panel for WhatsApp continuation without making it a core MVP dependency.

**Required content**

- Success confirmation after inquiry submission
- Secondary CTA: **Continue on WhatsApp**
- Supporting note that scheduling remains manual

## Interaction Expectations

- The public landing page should quickly move from trust-building to action.
- Inquiry submission must feel short and non-threatening on mobile.
- Validation messages should be clear and close to the field.
- Admin publish actions must feel separate from editing.
- Staff workflows must clearly show scoped access.
- Public and internal prototypes should feel related, but internal pages should not look like patient-facing pages.
- WhatsApp continuation should appear only as an optional Phase 1 variant.

## Responsive Behavior

- **Desktop (1200px+)**: public sections can use clean two-column composition; internal workflows can use list/detail or panel layouts
- **Tablet (768px-1199px)**: stack secondary panels below main task areas while preserving CTA visibility
- **Mobile (<768px)**: single-column layouts, full-width buttons, visible helper text, and touch targets of at least 44x44px

## Accessibility Requirements

- Follow WCAG 2.2 AA expectations
- Keep all buttons, links, dialogs, and form controls keyboard accessible
- Use visible focus states with sufficient contrast
- Use explicit labels and helper text for all form controls
- Do not rely on color alone for errors, warnings, approvals, or role restrictions
- Keep public-facing copy plain-language and easy to scan under stress

## Sample Content Guidance

- Use realistic placeholder clinic content, but avoid unsupported medical claims
- Keep public copy concise, reassuring, and bilingual-ready
- Keep inquiry examples minimal and privacy-conscious
- Use believable placeholder operational data for address, hours, and contact channels
- Keep admin and staff sample data practical and low-complexity
```

## Change Log

| Date | Version | Change Summary | Author |
| --- | --- | --- | --- |
| 2026-04-18 | 1.0 | Added initial orthopedic-spine Stitch prototype prompt. | UI/UX Designer |

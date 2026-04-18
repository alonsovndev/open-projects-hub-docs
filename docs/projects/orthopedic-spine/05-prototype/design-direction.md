# Design Direction Snapshot: Orthopedic Spine MVP Prototype

## Design Intent

Create a prototype direction that feels **trustworthy**, **calm**, **mobile-friendly**, and **easy to act on** for patients while staying **simple**, **structured**, and **role-safe** for clinic staff.

The prototype should help stakeholders validate a bilingual public website plus lightweight internal workflows without implying unsupported clinical, booking, or patient-record capabilities.

## Product Language and Scope Rules

- Use documented terms only: **inquiry**, **appointment request**, **services**, **testimonials**, **admin**, **staff**, **hours**, **location**, and **bilingual content**.
- Keep public flows focused on trust-building, service clarity, and low-friction contact.
- Keep internal flows focused on content management, testimonial approval, inquiry review, and operational-detail updates.
- Show **Admin** and **Staff** as separate internal roles with visibly different permissions.
- Do not introduce direct booking, patient records, billing, analytics dashboards, or complex CRM workflows.

## Visual Direction Rules

### Overall Direction

- **Trust-first:** lead with credibility, clarity, and next-step confidence.
- **Content-first:** prioritize readable service summaries, testimonial proof, and clear contact options over decorative UI.
- **Low-friction:** make the primary CTA obvious on every public screen.
- **Role clarity:** make Admin-only and Staff-scoped actions visually distinct.
- **Healthcare-adjacent restraint:** feel professional and reassuring without looking like a clinical records system.

### Layout Guidance

- Public pages should use generous spacing, clear section breaks, and one dominant CTA per viewport.
- Keep bilingual controls visible but lightweight on public pages.
- Keep inquiry forms short, stacked, and easy to complete on mobile.
- Use card or panel groupings for admin and staff workflows to keep tasks scannable.
- Pin status context near the top of internal pages: current role, content state, and last updated cues.

## Color Strategy

No brand palette is documented, so use constrained placeholder rules for the prototype.

| Token category | Purpose | Constraint |
| --- | --- | --- |
| Primary | Main CTA and publish/save emphasis | Use for high-priority actions only |
| Neutral | Layout, text, borders, surfaces | Keep the interface calm and readable |
| Success | Submission, publish, approval confirmation | Pair with text labels |
| Warning | Privacy reminders, scoped-permission cues, unsaved changes | Never rely on color alone |
| Error | Validation and blocking issues | Use for inline and summary feedback |

## Typography Strategy

- **Hero/Page title:** clear value proposition or task name
- **Section title:** services, testimonials, contact, inquiries, operational details
- **Card title:** service card, testimonial, inquiry subject, content block
- **Body text:** plain-language explanations and task copy
- **Secondary text:** privacy notes, bilingual helpers, timestamps, and scoped-permission hints

Typography should stay highly readable for stressed or time-limited users and avoid dense medical wording.

## Component Inventory

Use Ant Design-style components as the prototype baseline.

| Component | Purpose | Required states |
| --- | --- | --- |
| Hero/banner section | Value proposition and CTA | Default |
| Language toggle | Spanish/English switching cue | Default, active |
| CTA button | Contact, request appointment, save, publish | Default, hover, focus, disabled, loading |
| Service card | Summarize offerings | Default, hover, focus-within |
| Testimonial card | Trust signal | Default |
| Inquiry form fields | Patient contact/request capture | Default, focus, error, success |
| Map/location panel | Hours, address, map, contact channels | Default |
| Sign-in form | Secure internal entry | Default, focus, error, loading |
| Content editor panel | Admin content updates | Default, dirty, saving, success |
| Approval modal | Testimonial publish confirmation | Open, focus trap, dismissible |
| Inquiry list/table | Staff review workflow | Empty, default, filtered |
| Alert/banner | Privacy, validation, success, role scope | Success, warning, error |

## Interaction Expectations

- Public CTAs should always reinforce the next step without suggesting direct booking.
- Inquiry forms must clearly state that only minimal contact/request information is collected.
- Successful inquiry submission should confirm manual follow-up expectations.
- Admin content workflows should separate **draft/edit** from **publish/approve** actions.
- Staff workflows should allow inquiry review and operational-detail updates, but not testimonial publishing or full content control.

## Responsive Behavior

- **Desktop (1200px+)**: balanced multi-section public pages and two-panel internal workflows where helpful
- **Tablet (768px-1199px)**: stack secondary panels below primary task areas while keeping CTA visibility high
- **Mobile (<768px)**: single-column public and internal layouts, full-width CTAs, persistent labels, and large touch targets
- Keep bilingual controls, privacy notes, and validation messages visible without crowding the form

## Accessibility Notes

- Follow **WCAG 2.2 AA** baseline expectations.
- Keep all CTAs, toggles, forms, and dialogs keyboard accessible.
- Use visible focus indicators and explicit field labels.
- Pair iconography with text for warnings, approval states, and scoped-permission messaging.
- Keep error messages specific, adjacent to inputs, and readable on mobile.
- Use plain language on public pages and avoid jargon-heavy medical phrasing.

## Prototype Constraints

- This is a stakeholder-validation prototype, not a production UI spec.
- Use realistic placeholder copy and clinic data where needed, but avoid unsupported medical claims.
- Keep internal workflows lightweight and explicitly manual where the requirements say manual follow-up.
- Treat WhatsApp continuation as an optional **Phase 1** success-state variant, not a core MVP dependency.

## Traceability

| Design Area | Requirement / Story Link |
| --- | --- |
| Public trust landing and bilingual messaging | FR-001-01, FR-001-02, FR-001-03, FR-001-04, NFR-001-01, NFR-001-02, NFR-X03 |
| Inquiry request form and success feedback | FR-002-01, FR-002-02, FR-002-03, NFR-002-02, NFR-X01 |
| Location, map, and contact visibility | FR-003-01, FR-003-02, FR-003-04, NFR-003-02 |
| Admin content and testimonial controls | FR-004-01, FR-004-02, FR-004-03, FR-004-04, NFR-004-01, NFR-004-02 |
| Staff inquiry review and scoped updates | FR-005-01, FR-005-02, FR-005-03, NFR-005-01, NFR-005-02 |
| Internal role safety and sign-in clarity | FR-006-01, FR-006-02, FR-006-03, FR-006-04, NFR-006-01, NFR-006-02, NFR-X06 |

## Change Log

| Date | Version | Change Summary | Author |
| --- | --- | --- | --- |
| 2026-04-18 | 1.0 | Added initial orthopedic-spine prototype design direction snapshot. | UI/UX Designer |

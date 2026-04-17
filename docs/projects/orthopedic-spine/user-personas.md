# User Personas

## Document Metadata

- **Project**: Orthopedic Spine
- **Status**: Draft
- **Owner**: Product Owner
- **Last Updated**: 2026-04-17
- **Related Overview**: [./overview.md](./overview.md)

## Persona Portfolio Summary

| Persona ID | Persona Name | Segment | Priority | Main Outcome |
| --- | --- | --- | --- | --- |
| P-01 | Elena Morales | Prospective patient | Primary | Understand services and confidently request care |
| P-02 | Dr. Andrés Vega | Clinic owner / administrator | Primary | Maintain trustworthy content and capture qualified leads |
| P-03 | Sofía Ruiz | Front desk coordinator | Secondary | Respond to inquiries and keep operational details accurate |

---

## P-01: Elena Morales

- **Priority**: Primary
- **Role/Archetype**: Prospective patient researching spine and physiotherapy services
- **Experience Level**: Moderate web and mobile user, non-technical
- **Context of Use**: Usually discovers the clinic through search, referrals, or social links on a mobile device

#### 1) Goals and Jobs-to-be-Done

- **Functional Goal(s)**: Understand whether the clinic offers the right treatment, where it is located, and how to request an appointment or callback.
- **Emotional Goal(s)**: Feel reassured, safe, and confident about contacting the clinic.
- **JTBD Statement**: When I am dealing with pain or need specialist care, I want to quickly understand whether this clinic can help me, so I can confidently take the next step.

#### 2) Pain Points and Frictions

- Medical services can feel hard to compare or understand online.
- Unclear contact options or missing schedule details create hesitation.
- Long or confusing forms reduce trust and completion.

#### 3) Needs and Expectations

- Clear service descriptions in plain language.
- Strong trust signals such as testimonials, clinician credibility, and location details.
- A fast, mobile-friendly contact path with accessible form feedback.

#### 4) Behaviors and Decision Patterns

- **Typical Workflow**: Searches online, scans top sections first, checks testimonials and location, then decides whether to contact.
- **Decision Drivers**: Trust, convenience, clarity of services, and ease of reaching the clinic.
- **Adoption Barriers**: Complex forms, poor mobile experience, weak credibility signals, or unclear next steps.

#### 5) Access and Security Profile

- **Permissions Needed**: View and submit inquiry
- **Security Sensitivity**: High, because health-adjacent inquiries require privacy-conscious handling
- **Critical Trust Signals**: Clear privacy messaging, professional presentation, accessible forms, and responsive contact expectations

#### 6) Success Indicators

| Indicator | Baseline | Target | Measurement Method |
| --- | --- | --- | --- |
| Time to understand whether the clinic is relevant | TBD | Under 2 minutes | Usability test and session review |
| Contact form completion rate | TBD | 60%+ for qualified visitors | Funnel analytics |

#### 7) Representative Quote

> "I want to know very quickly whether this clinic can help me and how to reach someone without filling out a complicated form."

#### 8) Design and Product Implications

- **Must Support**: Clear service summaries, trust-building content, location/hours visibility, mobile-first contact flow, and multilingual clarity.
- **Should Avoid**: Dense medical jargon, long forms, and hidden contact steps.
- **Priority Features Influenced**: Services pages, testimonials, contact form, maps, schedule information, accessibility baseline.

#### 9) Traceability

- **Related Requirements**: TBD in future requirements drafting
- **Related User Stories**: TBD in future work items
- **Related Screens/Flows**: Home, services, testimonials, contact, and location flows

---

## P-02: Dr. Andrés Vega

- **Priority**: Primary
- **Role/Archetype**: Clinic owner and content decision-maker
- **Experience Level**: Business domain expert with moderate comfort using admin tools
- **Context of Use**: Reviews performance, updates content, and ensures the website reflects current services and brand positioning

#### 1) Goals and Jobs-to-be-Done

- **Functional Goal(s)**: Keep clinic content current, publish testimonials safely, and monitor inbound inquiries.
- **Emotional Goal(s)**: Feel in control of the clinic's reputation and digital presence.
- **JTBD Statement**: When clinic services or messaging change, I want to update the website quickly and safely, so the public-facing experience stays accurate and professional.

#### 2) Pain Points and Frictions

- Reliance on technical help for routine content updates slows the business.
- Inconsistent messaging across channels weakens trust and SEO.
- Unclear admin scope can lead to manual workarounds for inquiries and content.

#### 3) Needs and Expectations

- Simple admin workflows for testimonials, services, schedules, and contact details.
- Confidence that public content is accurate, branded, and easy to update.
- Basic visibility into lead volume and inquiry handling.

#### 4) Behaviors and Decision Patterns

- **Typical Workflow**: Reviews inquiries periodically, requests content changes, approves testimonials, and updates clinic profile information as needed.
- **Decision Drivers**: Simplicity, reliability, brand consistency, and measurable patient acquisition value.
- **Adoption Barriers**: Admin complexity, unclear permissions, or workflows that require too much operational overhead.

#### 5) Access and Security Profile

- **Permissions Needed**: Admin
- **Security Sensitivity**: High, because admin access controls clinic content and incoming inquiry data
- **Critical Trust Signals**: Secure login, clear permissions, content accuracy, and simple moderation controls

#### 6) Success Indicators

| Indicator | Baseline | Target | Measurement Method |
| --- | --- | --- | --- |
| Routine content update time | TBD | Under 15 minutes | Admin usability review |
| Time to publish approved testimonial or service change | TBD | Same business day | Operational tracking |

#### 7) Representative Quote

> "I need the site to reflect the clinic accurately without turning every small update into a technical project."

#### 8) Design and Product Implications

- **Must Support**: Lightweight CRUD operations, testimonial approval, manageable clinic profile updates, and secure admin access.
- **Should Avoid**: Overly technical admin language, excessive approval layers, and unclear ownership boundaries.
- **Priority Features Influenced**: Admin panel, testimonial management, services management, inquiry handling, SEO content control.

#### 9) Traceability

- **Related Requirements**: TBD in future requirements drafting
- **Related User Stories**: TBD in future work items
- **Related Screens/Flows**: Admin dashboard, content editing, testimonial approval, inquiry review

---

## P-03: Sofía Ruiz

- **Priority**: Secondary
- **Role/Archetype**: Front desk coordinator supporting patient communication
- **Experience Level**: Operational user with low tolerance for complex systems
- **Context of Use**: Reviews inquiries, confirms clinic information, and helps maintain schedule or contact accuracy

#### 1) Goals and Jobs-to-be-Done

- **Functional Goal(s)**: Respond to incoming inquiries efficiently and keep public-facing operational details current.
- **Emotional Goal(s)**: Feel organized and confident that patients receive clear information.
- **JTBD Statement**: When a patient reaches out online, I want the inquiry details and clinic information to be easy to review, so I can respond quickly and correctly.

#### 2) Pain Points and Frictions

- Fragmented inquiry channels can create missed follow-up.
- Inaccurate hours or contact details cause avoidable calls and confusion.
- Overly broad admin interfaces can make simple tasks harder than necessary.

#### 3) Needs and Expectations

- Simple visibility into inquiry details and status.
- Easy updates for hours, phone numbers, and location-related content.
- Clear distinction between what staff can edit and what needs owner approval.

#### 4) Behaviors and Decision Patterns

- **Typical Workflow**: Checks inquiries during the day, responds manually, and updates operational details when the clinic schedule changes.
- **Decision Drivers**: Speed, clarity, and minimal training needs.
- **Adoption Barriers**: Permission confusion, too many steps, or systems that mix content and operations without structure.

#### 5) Access and Security Profile

- **Permissions Needed**: Scoped edit access
- **Security Sensitivity**: Medium to High, depending on exposure to inquiry data
- **Critical Trust Signals**: Clear role boundaries, simple workflows, and reliable data visibility

#### 6) Success Indicators

| Indicator | Baseline | Target | Measurement Method |
| --- | --- | --- | --- |
| Time to review and route a new inquiry | TBD | Under 5 minutes | Workflow observation |
| Accuracy of public schedule/contact details | TBD | 95%+ | Monthly content audit |

#### 7) Representative Quote

> "I need to answer people quickly and keep the clinic details accurate without navigating a complicated system."

#### 8) Design and Product Implications

- **Must Support**: Clear inquiry visibility, scoped permissions, and easy operational detail updates.
- **Should Avoid**: Role ambiguity, overloaded dashboards, and workflows that assume technical expertise.
- **Priority Features Influenced**: Inquiry review flow, contact detail management, hours/location updates, staff permissions.

#### 9) Traceability

- **Related Requirements**: TBD in future requirements drafting
- **Related User Stories**: TBD in future work items
- **Related Screens/Flows**: Inquiry review, operational info updates, scoped admin access

---

## Cross-Persona Conflict Check

| Conflict | Personas Involved | Decision | Rationale |
| --- | --- | --- | --- |
| Simplicity for patients vs richer data capture for clinic operations | P-01, P-02, P-03 | Favor a short inquiry flow in MVP | Lower friction improves conversion while keeping operations manageable |
| Broad admin power vs safe delegated staff access | P-02, P-03 | Use role-based admin scope | Protects sensitive actions while enabling day-to-day updates |

## Validation Plan

- **Validation Method**: Stakeholder review plus lightweight usability interviews
- **Sample Size**: 3-5 participants across patient-facing and clinic staff segments
- **Cadence**: Revisit at requirements and prototype milestones
- **Exit Criteria**: Personas are accepted by stakeholders and reflected in scope, content, and admin workflow decisions

## Open Questions

- Is the front desk role in scope for MVP admin access, or is admin limited to the clinic owner?
- What level of patient detail should be visible to staff in early releases?
- Which languages matter most for patient-facing content at launch?

## Change Log

| Date | Version | Change Summary | Author |
| --- | --- | --- | --- |
| 2026-04-17 | v0.1 | Initial persona set created for orthopedic-spine kickoff | Copilot |

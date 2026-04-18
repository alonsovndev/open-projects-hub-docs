# C4 Level 1 — System Context

This diagram shows Orthopedic Spine as one product system from the perspective of public users, protected clinic users, and external dependencies.

## Scope

- **Primary users:**
  - **Prospective Patient** browses bilingual clinic content and submits inquiries or appointment requests.
  - **Clinic Admin** manages public content, testimonial approval, and inquiry workflows.
  - **Front Desk Staff** reviews inquiries and updates scoped operational details.
- **External systems:**
  - **Supabase Auth** manages admin/staff authentication and session lifecycle.
  - **Cloudflare Turnstile** protects public inquiry submission from spam.
  - **Resend** delivers internal notifications for new inquiries or workflow events.
  - **Google Maps / WhatsApp** remain user-facing integrations outside the protected data plane.
  - **Sentry** captures operational issues with PII redaction.

## Notes

The diagram stays technology-light and focuses on the system boundary chosen in ADR-001: one product system with a shared frontend, a modular backend, and managed platform dependencies.

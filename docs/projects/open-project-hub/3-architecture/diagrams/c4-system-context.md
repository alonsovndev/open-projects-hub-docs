# C4 Level 1 — System Context

This diagram shows the Open Freelancer Project Hub as a single system from the perspective of users and external dependencies.

## Scope

- **Primary users:**
  - **Admin Freelancer** manages clients, projects, AI-assisted requirements, and approvals.
  - **Client Viewer** consumes read-only project status and approved requirements.
- **External systems:**
  - **Supabase Auth** for identity and token lifecycle.
  - **Sentry** for frontend/backend observability.
  - **SendGrid/Mailgun** for outbound transactional messages.

## Notes

The diagram intentionally stays technology-light at this level and focuses on system boundaries and responsibilities.

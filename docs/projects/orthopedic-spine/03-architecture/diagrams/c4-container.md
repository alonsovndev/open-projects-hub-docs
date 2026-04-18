# C4 Level 2 — Container Diagram

This diagram decomposes the approved MVP architecture into runtime containers aligned with the current stack decisions.

## Container Responsibilities

- **Vercel Frontend (React + TypeScript):** public website, bilingual rendering, and protected admin/staff routes in one application.
- **Render Backend API (FastAPI modular monolith):** content, testimonial, inquiry, and access-control orchestration behind one API boundary.
- **Supabase PostgreSQL:** system of record for bilingual content, inquiries, testimonial approval state, and role mappings.
- **Supabase Auth:** admin/staff sign-in, token lifecycle, and identity context.
- **Supabase Storage:** clinic media and testimonial assets.
- **Cloudflare Turnstile / Resend / Sentry:** server-verified spam protection, operational notifications, and observability services.

## Integration Notes

- Public and protected route trees stay isolated even though they share one React deployment.
- The backend remains stateless so it can scale independently from the frontend.
- Public inquiry submissions are challenged in the frontend and verified by the backend before persistence.
- WhatsApp and map integrations stay outside the protected system-of-record boundary.

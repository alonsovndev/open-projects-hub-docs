# C4 Level 2 — Container Diagram

This diagram decomposes the system into deployable/runtime containers aligned with the selected stack (Vercel, Render, Supabase, Sentry, GitHub Actions).

## Container Responsibilities

- **Vercel Frontend (React + TypeScript):** Admin/Viewer UX, workflow orchestration, and API consumption.
- **Vercel Edge Functions:** edge middleware for request shaping, auth checks, and routing.
- **Render Backend API (FastAPI):** domain/application orchestration and API contract enforcement.
- **Supabase PostgreSQL:** system-of-record for projects, users, stories, and audit data.
- **Supabase Auth:** identity provider and JWT issuance/refresh lifecycle.
- **Supabase Storage:** managed file/object storage for exported artifacts.
- **Sentry:** shared error and performance telemetry.

## Integration Notes

- Frontend-to-backend communication is HTTPS REST with bearer tokens.
- Backend remains stateless for horizontal scaling on Render.
- Authorization is enforced by backend checks plus Supabase RLS.

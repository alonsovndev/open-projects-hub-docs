---

US-EP1-BE-001 — Client and Project CRUD Operations

▎ Found and fixed a critical bug during release validation: ClientRepositoryImpl.save/update/delete only called flush(), never commit() — every client create/update/delete was silently discarded once the DB session closed, directly violating this story's core AC. Fixed in client_repository_impl.py; added regression tests (test_client_repository.py, 5 tests) asserting each write path commits. Verified live: created/edited/deleted clients via API and the new Clients UI, confirmed persistence with follow-up reads. Project CRUD was already correct — no change needed there.

US-EP1-BE-002 — Active Project Limit Enforcement

▎ Found and fixed a bypass: PATCH /v1/projects/{id} accepted a status field and let an admin reactivate a project with no limit check — only the dedicated /reactivate endpoint enforced it. Removed status from UpdateProjectRequest; status transitions now only go through /archive and /reactivate. Added a regression test. Verified live: archived a project, confirmed PATCH {status:"active"} no longer reactivates it.

US-EP1-BE-003 — Client and Project Archival and Deletion Guards

▎ Reviewed and validated — already correctly implemented. Verified live: deleting a client with active projects returns 409 with a clear reason; deleting a client with none succeeds and cascades archived projects; archived projects are excluded from the active count. No code changes needed.

US-EP1-BE-004 — Project Search and Filtering

▎ Reviewed and validated — already fully implemented (status/client/date-range/search filters + supporting index on client_id), despite the board still showing TODO. No backend change needed; the frontend wasn't forwarding these params — fixed under FE-002.

US-EP1-FE-001 — Project Management UI

▎ Found two AC gaps: (1) no phase selection on the create form, despite it being required by the UX spec and FR-001-01/02; (2) a "Status" dropdown that did nothing (backend didn't accept it, and half its options weren't even valid). Removed the dead Status field, added a required Phase selector (Discovery/Planning) backed by a new phase column (migration 172de3a42b18). Also fixed the limit-exceeded error message: backend returns {detail: ...}, frontend only read .message, so real rejections showed a generic fallback — fixed at the single normalization point in base-api.ts. Verified live end-to-end via browser automation.

US-EP1-FE-002 — Project Search, Filter, and Archive Controls

▎ Found the list only fetched {page, limit} — filters ran client-side over the current page only, so results and the "X of Y" count broke once data exceeded one page. Wired all filters through to the server, fixed a param-name mismatch (startDate/endDate → createdFrom/createdTo), and decoupled the active-project count from the filtered view so the create-limit guard can't be fooled by an active filter. Also pointed Archive at the dedicated /archive endpoint instead of a generic PATCH. Verified live.

US-EP1-FE-003 — Client Management UI (new — added during this review)

▎ Added because FR-001-01 requires full client CRUD but no story owned a client list/create/edit/delete UI — FE-002 assumed one existed and it didn't. Built list page, create/edit form, and delete flow with inline rejection reason, reusing existing clients-api.ts hooks. Verified live: create, edit, and both delete paths (blocked and successful) work correctly.

US-EP1-REL-001 — Release F-001

▎ Code-level blockers across BE-001, BE-002, FE-001, FE-002, and new story FE-003 are fixed and verified (520 backend + 111 frontend tests, full lint/type-check/build, and a live end-to-end browser+API walkthrough). Not release-ready yet: neither feature/ep1-projects-clients nor feature/US-EP1-FE-001-project-management-ui has a PR open or is merged to dev, which this story's own AC requires before the dev→main release PR. Next step: open both PRs.

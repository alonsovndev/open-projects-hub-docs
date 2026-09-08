---
description: One-time template setup — replaces [Project Name] placeholders across docs/ and README.md, updates docusaurus.config.ts (title, tagline, url, org, project name), and flags what still needs manual work. Run this first, before /docs-context.
---

# /docs-setup

Run this once, before `/docs-context`, when adopting this template for a new project.
Covers the "Template Setup Checklist" in `docs/intro.md`.

1. **Ask.** Use `AskUserQuestion` to collect:
   - Project name (replaces `[Project Name]`)
   - One-line tagline (optional — for `docusaurus.config.ts`)
   - GitHub org/user name
   - Repository name
   - Production URL (e.g. `https://<org>.github.io`), if different from the default
     GitHub Pages pattern
   Skip any question whose answer is already obvious from repo state (check
   `git remote -v` first). Split across multiple `AskUserQuestion` calls if needed
   (max 4 questions per call).

2. **Replace `[Project Name]`.** Search every file under `docs/` and `README.md` for
   the literal `[Project Name]` placeholder and replace it with the provided project
   name. Do not touch other bracketed placeholders (e.g. `[Feature Name]`,
   `[Persona]`) — those are filled in by the other `/docs-*` commands, not this one.

3. **Update `docusaurus.config.ts`.**
   - `title` → project name
   - `tagline` → provided tagline, or leave the existing placeholder tagline if none given
   - `url` → provided production URL, or `https://<org>.github.io` if not given
   - `organizationName` → provided org/user
   - `projectName` → provided repo name
   - `editUrl` (inside the docs preset) → `https://github.com/<org>/<repo>/edit/main/`

4. **Update `README.md`.** Replace the `your-org` placeholders (badge URL, TODO
   comment) with the real org/repo, matching the values used above.

5. **Branding — flag, don't fake.** `static/img/logo.svg` and `static/img/favicon.svg`
   need real project artwork; do not generate placeholder graphics. Tell the user
   these two files still need manual replacement.

6. **Examples folder.** Ask (don't assume) whether to delete `examples/work-items/`
   now or keep it as reference. Only delete it if the user explicitly confirms —
   treat this as a destructive action.

7. **Dates.** Leave `YYYY-MM-DD` placeholders alone — those get filled in as each
   document is written by `/docs-context` and later commands, not during setup.

8. **Summarize.** Report what was changed (files touched, config keys updated) and
   what's still pending (logo/favicon, and the `examples/` decision if deferred).
   Tell the user to run `/docs-context` next.

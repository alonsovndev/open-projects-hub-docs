# Prototype — Open Projects Hub

UI/UX prototype for the MVP planning experience, built in **Pencil** (`.pen` file) with reusable components and design tokens.

## Files

| File | Purpose |
|------|---------|
| `README.md` | This file — directory overview and quick start |
| `prototype-brief.md` | Authoritative source of truth: page definitions, user flows, scope, requirements coverage matrix |
| `design-direction.md` | Visual direction, color strategy, typography, component inventory, accessibility, responsive breakpoints |
| `pen/prototype.pen` | Interactive Pencil design file with 12 screens and 11 reusable components |

## Opening the Prototype

The `.pen` file opens in **Pencil** — a collaborative design tool.

```bash
# File location
open-projects-hub-docs/docs/04-prototype/pen/prototype.pen
```

Open it from Pencil via **File → Open** and navigate to the path above, or use the Pencil CLI.

## What's Inside

### 12 Pages

| # | Page | Layout | Key Features |
|---|------|--------|-------------|
| 1 | Landing / Home | Public | Hero, features grid, info cards, CTA section, footer |
| 2 | Entry & Role Selection | Public | Two role cards (Admin / Viewer) with CTAs |
| 3 | Admin Sign Up | Public | Registration form: name, email, password, confirm, terms |
| 4 | Admin Sign In | Public | Email + password, remember-me, forgot/create links |
| 5 | Forgot Password | Public | Email capture for reset code |
| 6 | Reset Password | Public | 6-digit code + new password + confirm |
| 7 | AI Refinement Workspace | Admin | Split-pane: raw notes → generated epics & stories, ambiguity bar, approve |
| 8 | Admin Backlog | Admin | Filter bar, epic + story list, Markdown export |
| 9 | Admin Dashboard | Admin | Welcome card, stats (projects/stories/credits), recent projects list |
| 10 | Admin Settings | Admin | Profile, password, API keys management, danger zone |
| 11 | Viewer Backlog | Public | Read-only stories with epic tags, phase badge, no edit controls |
| 12 | Onboarding Overlay | Overlay | 4-step welcome tour: notes, ambiguities, epics & stories, approval |

### 11 Reusable Components

| Component | Type |
|-----------|------|
| `Button/Primary` | Filled blue button |
| `Button/Secondary` | Outlined button |
| `Tag/Draft` | Blue-light pill |
| `Tag/Approved` | Green pill |
| `Tag/Phase` | Surface pill (Discovery/Planning) |
| `FormField` | Label + bordered input |
| `StoryCard` | Title + description + acceptance criteria |
| `EpicCard` | Title + description + criteria + nested story cards |
| `SiderNavItem` | Icon + label navigation item |
| `Sider` | Sidebar: logo, 5 nav items, user area |
| `AdminLayout` | 240px sider + page header + scrollable content body |

### 38 Design Tokens

Colors (`$primary`, `$surface`, `$text-primary`, `$success`, `$warning`, `$error`, etc.), spacing scale (4px grid, 7 tiers), typography (Inter, 5 sizes, 4 weights), layout constants (sider widths, radii, shadows).

## Scope

The prototype covers the MVP **Discovery** and **Planning** workflows only. Out of scope: delivery, sprint, handoff, collaboration, and maintenance workflows.

## History

| Date | Event |
|------|-------|
| 2026-03 | Initial Stitch-generated prototype (14 static HTML screens) |
| 2026-08-11 | Migrated to Pencil — interactive `.pen` file, reusable components, design tokens, epic support |
| 2026-08-11 | Removed Stitch screens; added Home, Dashboard, Settings pages |

## Related Docs

- [Prototype Brief](./prototype-brief.md)
- [Design Direction](./design-direction.md)
- [Project Overview](../overview.md)
- [Requirements by Feature](../01-requirements/)
- [Architecture](../03-architecture/)

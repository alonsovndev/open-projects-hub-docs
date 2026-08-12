# Design System Specification: The Architectural Sentinel

## 1. Overview & Creative North Star
**The Creative North Star: "Precision Editorial"**

This design system moves beyond the "utility-first" constraints of standard enterprise frameworks to embrace a **Precision Editorial** aesthetic. While inspired by the structured logic of Ant Design, our goal is to elevate the stakeholder experience from a "tool" to a "destination." 

We break the traditional "boxed-in" template by utilizing **intentional asymmetry, tonal layering, and high-contrast typographic scales.** We replace rigid lines with spatial breathing room and subtle background shifts. The result is a professional environment that feels authoritative yet fluid—minimizing cognitive load through a clear, content-first hierarchy that directs the eye with surgical precision.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in a professional "Enterprise Blue" (`primary: #0057c2`), but its application is governed by high-end environmental principles.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or layout containment. 
Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` (`#f3f3f3`) sidebar sitting against a `surface` (`#f9f9f9`) main workspace. This creates a seamless, modern flow that prevents "grid fatigue."

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked physical layers—like fine vellum or frosted glass.
- **Base Layer:** `surface` (#f9f9f9) – The global canvas.
- **Sectioning:** `surface_container` (#eeeeee) – For large structural blocks.
- **Emphasis Containers:** `surface_container_highest` (#e2e2e2) – Use for high-priority data blocks.
- **Floating Elements:** `surface_container_lowest` (#ffffff) – Reserved for the most important interactive cards or modals to create a "pop" against the gray background.

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" look, use **Glassmorphism** for floating navigation or overlays. 
- **Token:** `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur.
- **Signature Textures:** For primary CTAs, apply a subtle linear gradient from `primary` (#0057c2) to `primary_container` (#006ef2) at a 135-degree angle. This adds "soul" and a tactile, premium feel to action points.

---

## 3. Typography
We utilize **Inter** for its neutral, high-legibility architecture. Our hierarchy is designed to lead the stakeholder’s eye through complex data sets via dramatic scale shifts.

*   **The Hero Scale (Display):** Use `display-lg` (3.5rem) and `display-md` (2.75rem) sparingly for high-level dashboard summaries.
*   **The Editorial Hook (Headline):** `headline-md` (1.75rem) should be used for section headers to establish immediate context.
*   **The Workhorse (Body):** `body-md` (0.875rem) is the default for all content. We prioritize `on_surface_variant` (#414755) for secondary body text to reduce visual "vibration" against the white surface.
*   **The Data Label:** `label-sm` (0.6875rem) in **All Caps** with `0.05rem` letter-spacing for metadata and table headers. This provides an authoritative, industrial feel.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Stack `surface_container_low` on `surface` to create natural containment. If a card needs to feel "active," move it to `surface_container_lowest` (#ffffff).
*   **Ambient Shadows:** For floating elements (Modals/Popovers), use a "Ghost Shadow": `0 12px 32px rgba(26, 28, 28, 0.06)`. The tint is derived from `on_surface`, making it feel like natural ambient light.
*   **The "Ghost Border" Fallback:** If a container lacks contrast (e.g., white on white), use the `outline_variant` (#c1c6d7) at **15% opacity**. Never use a 100% opaque border.
*   **Glassmorphism:** Use `backdrop-filter: blur(12px)` on all floating navigation menus to allow the content colors to bleed through, softening the edges of the UI.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary` to `primary_container`), `rounded-md` (0.375rem), white text. Use for the single most important action.
*   **Secondary:** `surface_container_highest` background with `on_surface` text. No border.
*   **Tertiary:** Transparent background, `on_primary_fixed_variant` (#004398) text. 
*   **Interaction:** All buttons must maintain a **44px minimum height** for accessibility.

### Input Fields
*   **Style:** `surface_container_lowest` background.
*   **States:** On focus, transition the "Ghost Border" from 15% to 100% opacity using the `primary` token.
*   **Validation:** Use `error` (#ba1a1a) for text and `error_container` (#ffdad6) for subtle background highlighting of the field.

### Cards & Lists (The Editorial Approach)
*   **Rule:** Forbid the use of horizontal divider lines.
*   **Separation:** Use `spacing-6` (1.3rem) of vertical whitespace or a subtle background toggle (Alternating between `surface` and `surface_container_low`) to separate list items.
*   **Selection:** Use a `2px` vertical pill of `primary` color on the far left edge to indicate an active/selected state in a list, rather than highlighting the whole box.

### Signature Component: The "Status Badge"
Instead of standard pill shapes, use a square-proportioned badge with `rounded-sm` (0.125rem). 
*   **Success:** `on_tertiary_fixed` text on `tertiary_fixed` background for a sophisticated "Sage/Earth" tone that signals approval without being neon.

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use whitespace as a functional tool. If content feels crowded, increase padding to `spacing-8` (1.75rem).
*   **DO** use "surface-nesting" to group related information.
*   **DO** ensure all interactive elements have a visible focus ring using the `outline` token (#727786) with a 2px offset.

### Don’t:
*   **DON'T** use 1px solid #ddd borders. It breaks the "Precision Editorial" flow.
*   **DON'T** use pure black (#000) for text. Always use `on_surface` (#1a1c1c).
*   **DON'T** use heavy drop shadows. If it looks like it’s "floating" too high, it’s too much.
*   **DON'T** use more than one Primary CTA per view. Guide the stakeholder; don't distract them.
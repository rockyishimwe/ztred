# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ztred — a Next.js 14 App Router **frontend demo** of a team collaboration workspace (messaging, meetings, docs, whiteboard, projects, AI assistant, admin control panel).

There is **no backend, no auth, no API layer, and no tests**. Every page holds its own hardcoded mock data as module-level `const` arrays and simulates async work with `setTimeout`. Treat "make it work" requests as "make the UI behave correctly against local state", not "wire up a server", unless the user says otherwise.

## Commands

```bash
npm install --legacy-peer-deps   # peer deps are not clean; the plain install fails
npm run dev                      # dev server on :3000
npm run build
npm run typecheck                # tsc --noEmit  — strict mode, must stay at 0 errors
npm run lint                     # next lint     — must stay at 0 warnings
```

After any non-trivial edit run `npm run typecheck && npm run lint`. There is no test runner; those two are the only automated gate.

## Architecture

### Route groups
`src/app/` uses three separate shells, each with its own duplicated nav chrome. All three list the same main nav hrefs, so a nav change usually has to be made in more than one place — grep for the href before assuming one edit is enough:

- `workspace/(workspace)/layout.tsx` — the main product shell: icon rail + mobile top bar / slide-out menu / bottom tab bar.
- `workspace/(control)/layout.tsx` — the admin "control panel" shell. It re-declares the same `mainNavItems` list plus `controlNavItems`.
- `workspace/(workspace)/settings/layout.tsx` — the single settings shell. `/settings/*` used to be a second, drifted copy; it is now a catch-all at `app/settings/[[...slug]]/page.tsx` that redirects into this tree.

**Special case:** `workspace/(workspace)/layout.tsx` short-circuits (`return <>{children}</>`) for any path starting with `/workspace/channels` — that page renders its own full chrome (including its own theme toggle, since it inherits no header).

Every dynamic segment (`dm/[userId]`, `meetings/[meetingId]`, `docs/[docId]`, `whiteboard/[wbId]`, `tasks/[projectId]/{board,gantt}`, `projects/[projectId]`) reads its param via `useParams()` and resolves it through a `get*()` helper that falls back to a default when the id is unknown. Keep that pattern.

Shared mock data lives in `src/lib/mock/` (`projects.ts`, `docs.ts`, `meetings.ts`) so list and detail routes agree. Other pages still hold their own module-level `const` arrays; move data there when a second route needs it.

`/workspace/{dm,tasks,whiteboard,channels}` are `redirect()`-only index routes that exist so the nav can prefix-match for the active state instead of pointing at a hardcoded id. `/workspace/meetings` is a real list page.

Nearly every page is `"use client"`. The only server components are the `redirect()` index routes and the thin per-section `layout.tsx` files that carry `metadata.title` — a client page cannot export `metadata`, so a new section needs one of those to get its own browser-tab title.

Nav active state comes from `isRouteActive(pathname, href, exact?)` in `src/lib/utils.ts` (prefix match; pass `exact` for index routes like `/workspace`). All four shells use it — do not reintroduce a bare `pathname === href`.

### Theming — the important part
Two coordinated systems; getting this wrong produces classes that silently generate no CSS.

1. **CSS variables** in `src/styles/globals.css` under `:root` (light) and `[data-theme="dark"]`. Layouts and most page chrome apply them via inline `style={{ backgroundColor: 'var(--bg-card)' }}` rather than utility classes.
2. **Tailwind palette** in `tailwind.config.ts` maps `theme-*` names to those vars (`theme-card`, `theme-brand`, `theme-sidebar-hover`, …), plus `purple.*` and the nested `ztred.*` scale. `darkMode` is `['class', '[data-theme="dark"]']`.

Rules that follow from this:

- `bg-theme-primary`, `bg-theme-secondary`, `text-theme-primary`, `text-theme-secondary` are **hand-authored plain classes** in globals.css (same name means a different variable for text vs. background). Their `hover:`/`focus:` variants are also hand-authored, one rule at a time, in the variant block near the bottom of globals.css. If you need a new variant of one of these, add the escaped rule there — Tailwind will not generate it.
- When hand-authoring a variant, the `:` in the class name takes **exactly one** backslash: `.hover\:bg-theme-card:hover`. Two backslashes makes the browser parse `.hover\` plus an unknown pseudo-class and drop the rule silently — the whole variant block was dead this way once already.
- **Opacity modifiers do not work** on hand-authored classes or on palette entries whose value is a bare `var(...)` string. `bg-theme-brand/10` renders full strength. Use the `color-mix` helpers instead: `.bg-theme-primary-subtle`, `.bg-theme-secondary-subtle`, `.bg-theme-brand-subtle`.
- Native form controls do not inherit the palette. Use `.control-theme` (checkbox/radio/range) and `.select-theme` (select), plus `.settings-card` / `.settings-row` / `.form-label` / `.form-hint` for settings screens.
- **Verify new theme classes actually generate CSS.** A misspelled or undefined `theme-*` class fails silently. After a build, check every used class against `.next/static/css/*.css` rather than trusting the page to look right in one mode.

**Accent color** is user-chosen and drives every brand surface. `src/lib/accent.ts` turns one hex into an 11-stop scale written to `<html>` as space-separated RGB channels (`--accent-600: 95 61 255`); the Tailwind `purple` scale and the `theme-brand*` entries are declared as `rgb(var(--accent-N) / <alpha-value>)`, which is what makes `bg-purple-600/20` resolve — a bare `var(--primary)` value cannot carry an alpha. Never reintroduce a hardcoded brand hex: `#5F3DFF` should appear nowhere outside `accent.ts`.

- The mark is `<ZtredLogo />` (`src/components/ui/ZtredLogo.tsx`), not `/ztred-logo.svg` — the static file paints the Z as a clipped raster image that CSS cannot recolor. The static files remain only as the pre-JS favicon.
- The favicon is re-tinted at runtime by `applyFavicon()`, which replaces the `link[rel="icon"]` tags Next renders from `metadata`.
- Text on an accent-filled surface should use `var(--on-primary)` or the `text-theme-on-brand` class, which flips to dark for light accents (amber, lime). `text-theme-brand` is the accent *as* a text colour — the two are easy to confuse, and were once conflated under a single misnamed class.
- Bare `text-white` on a brand background still exists in places and will be low-contrast under a light accent.
- The pre-paint script in `app/layout.tsx` duplicates both the shade math (`accentShades()`) and the luminance test (`isLightColor()`) so the accent *and* `--on-primary` land before first paint. All three must stay in sync, as must the `--accent-*` fallbacks in `:root`.

**Theme state** lives in `uiStore`: `themePreference` is what the user chose (`'dark' | 'light' | 'system'`) and `theme` is the resolved mode — always render from `theme`, drive settings UI from `themePreference`. The pre-paint inline script in `app/layout.tsx` resolves and applies the stored preference before first paint; `ThemeProvider` then calls `hydrateTheme()` (which must not re-persist, or `'system'` would collapse to a fixed mode) and subscribes to OS and cross-tab changes.

Routes rendered outside the workspace shell — `/workspace/channels/*`, `/auth/*` — need to carry their own theme toggle; there is no shared header to inherit one from.
- The design tokens (HIG-derived type scale `text-display`…`text-micro`, `min-h-touch` 44px targets, `shadow-elevated/floating/overlay`, `--radius-*`) exist in both the Tailwind config and as CSS vars. Prefer the existing tokens over ad-hoc values.

### State
`src/stores/uiStore.ts` (Zustand) is the only store: sidebar collapse, right-panel selection, theme, accent, and accessibility preferences. Everything else is component-local `useState`. `src/types/api.ts` describes a fuller domain model (User, Workspace, Stream, Message, …) but is only imported by four messaging/AI components — page mock data is shaped ad hoc and does not conform to it.

### Components
`src/components/` holds the few genuinely shared pieces: `ui/` primitives (Button, Badge, Avatar, dropdown-menu, emoji-picker, skeleton), `messaging/`, `collaboration/` (DocEditor, Whiteboard), `automate/AIAssistantPanel`, `tasks/GanttChart`, `projects/CreateProjectModal`. Most screens are single large page files (`projects/[projectId]/page.tsx` is ~1500 lines) with their UI inlined — that is the prevailing style; don't extract components unless asked.

`cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) exists but is used in only two files; most code concatenates template strings.

## Known state

Modals go through `src/components/ui/Modal.tsx` — it supplies `role="dialog"`, `aria-modal`, Escape, a focus trap, focus restore, backdrop dismissal and scroll lock. Do not hand-roll another `fixed inset-0` overlay; pass `contained` when the dialog must sit inside its own pane rather than the viewport.

Accessibility preferences (`reduceMotion`, `highContrast`) live in `uiStore` and are reflected onto `<html>` as `data-reduce-motion` / `data-high-contrast`; the rules that act on them are at the bottom of globals.css.

**Known gaps.** ~134 buttons still have no click handler (mostly secondary icon chrome); `src/components/messaging/*`, `automate/AIAssistantPanel`, `ui/Avatar` and `ui/skeleton` are not imported by anything, and `@tanstack/react-virtual` is only reachable through that dead `MessageList`. About 20 `<label>` elements caption groups of buttons (colour swatches, priority pills) rather than a form control and still need `role="group"`/`aria-label` instead.

`README.md`'s "Project Structure" section is stale: it lists `components/layout/`, `components/sidebar/`, and `hooks/` (useWebSocket), none of which exist, and a tech stack (TipTap, Radix beyond `react-slot`, socket.io, yjs) that is no longer in `package.json`.

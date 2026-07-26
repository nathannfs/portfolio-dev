# Phases 2 & 3 — Secondary Public Pages + Admin Repaint

> Executed in-session with subagents consuming the committed Aurora Terminal design system (Phase 0) and home patterns (Phase 1). Central verification via `pnpm build` + browser.

## Design system contract (all pages must follow)

- **Theme:** dark-first, keep the light/dark toggle working. Base `#08080b`/zinc-950 dark; surfaces via `bg-surface-1`/`bg-surface-2` (Tailwind → `--surface-1/2`).
- **Accent:** aurora ramp — Tailwind `text-aurora-cyan|blue|violet`, `border-aurora-cyan`, etc. (`--aurora-1 #22d3ee`, `--aurora-2 #3b82f6`, `--aurora-3 #8b5cf6`). Existing `sky-*` buttons stay.
- **Primitives:** `import { Reveal, Magnetic, AuroraCanvas } from "@/components/motion"`. `<Reveal>` = scroll reveal wrapper; `<Magnetic>` = pointer attraction on CTAs; `<AuroraCanvas className="pointer-events-none absolute inset-0 -z-10" />` inside a `relative overflow-hidden` hero. Add `data-cursor="hover"` to cards/interactive tiles.
- **Bans (hard):** no `background-clip:text` gradient headings; no default glassmorphism; **no side-stripe borders** (`border-l/r` > 1px as accent).
- **Invariants:** exactly one `<h1>` per page; preserve all data/logic (server actions, react-query hooks, zod, ky, auth); reduced-motion safe (primitives already handle it).

## Phase 2 — Secondary public pages

1. **/about** (`src/app/about/about.tsx`): remove the `border-l-4 border-sky-*` side-stripe borders on section `<h2>`s and `<li>`s; give the page an aurora hero header; wrap sections in `<Reveal>`; cards use full borders + `bg-surface-1`. Keep the single `<h1>` ("About Me").
2. **/projects** (`src/app/projects/page.tsx`): premium card grid — tilt/magnetic hover, `data-cursor="hover"`, aurora accents, reveals. Keep admin add/edit/delete controls and all logic.
3. **/projects/[id]** (`src/app/projects/[id]/...`): cinematic case-study — aurora hero with project name, then features/challenges/learnings as scroll-revealed sections.
4. **/sign-in** (`src/app/auth/sign-in/...`): focused card over subtle aurora.
5. **/404** (`src/app/not-found.tsx`): aurora scene + witty copy; fix PT typo "está"→"esta"; return-home CTA.

## Phase 3 — Admin/CRUD repaint

Modals, forms, tables, badges under `src/app/**/components`, `src/components/form/*`, `src/components/ui/*` (as used by admin): repaint to the aurora system, keep every server action / hook / submit path intact.

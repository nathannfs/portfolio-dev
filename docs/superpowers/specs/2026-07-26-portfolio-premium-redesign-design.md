# Portfolio Premium Redesign — "Aurora Terminal"

**Date:** 2026-07-26
**Owner:** Nathan Santos (nathannfs.com)
**Status:** Approved direction — ready for phased implementation planning

## 1. Goal

Redesign every page of the personal portfolio to a premium, cinematic standard
with advanced (maximal) animations, while preserving all existing functionality
(auth, admin CRUD via server actions + react-query, contact form, dark/light
toggle) and the SEO/a11y gains already landed on branch `critique-improvements`.

## 2. Locked decisions

| Axis | Decision |
|---|---|
| Aesthetic lane | Cinematic / expressive — **"Aurora Terminal"** (ref: Linear release pages, Vercel Ship, Paper/Family hero shaders) |
| Motion | Maximal — WebGL hero, custom cursor, scroll-driven choreography, route transitions |
| Scroll model | Conventional long-scroll (retire the 100vh scroll-snap deck); deep-linkable `#anchors`; back-to-top |
| Color | Aurora cyan→violet over near-black `#08080b`, glow, animated mesh |
| Scope | **Everything** — all public pages + admin/CRUD repaint |
| Theme | **Keep the toggle.** Dark is the hero experience; light is a refined "soft aurora" variant |
| Package manager | **Standardize on pnpm** (matches installed `node_modules`); start versioning `pnpm-lock.yaml`, remove `package-lock.json` |

## 3. Design system

### Color (dark-first)
- Background `#08080b`; surfaces `#0e0e13`, `#14141b`; hairline border `rgba(255,255,255,.08)`
- Aurora ramp: cyan `#22d3ee` → blue `#3b82f6` → violet `#8b5cf6`
  - Used in: WebGL mesh, glow/blur halos, focus rings, small emphasis accents
  - **Bans respected:** no `background-clip:text` gradient on headings; no glassmorphism-by-default; no side-stripe borders
- Text `#ededf2`; muted `#9a9aa8` (verify ≥4.5:1 body / ≥3:1 large)
- Light variant: off-white `#fafafb` base, softened pastel aurora (dimmed chroma), same ramp hues
- Implement as CSS custom properties layered onto the existing shadcn HSL token
  system in `globals.css` so shadcn components keep working; add aurora-specific
  tokens (`--aurora-1..3`, `--glow`, `--surface-1/2`).

### Typography
- Geist (sans) + Geist Mono — already wired via `next/font` into Tailwind `font-sans`/`font-mono`
- Fluid scale: hero `clamp(3rem, 8vw, 6rem)` (impeccable ceiling ≤6rem), `tracking-tight` (≥ -0.04em floor), `text-balance` on h1–h3
- Mono for technical labels/metadata/eyebrows-used-sparingly

### Layout & spacing
- 12-col responsive grid; generous vertical rhythm; intentional asymmetric breaks
- No identical card-grid monotony; vary section treatments (art-direction per section allowed)

## 4. Motion system & tech stack

New dependencies (install with pnpm): `lenis`, `gsap`, `ogl`. Keep `framer-motion@12`.

- **Smooth scroll:** Lenis, mounted once at the root; integrate with framer-motion `useScroll` and GSAP ScrollTrigger via Lenis' `scroll` events / `requestAnimationFrame` loop.
- **Scroll choreography:** GSAP + ScrollTrigger for pinned/sequenced reveals; framer-motion for component-level reveals and list stagger.
- **Route transitions:** framer-motion in an App Router `template.tsx` (reliable across browsers); optionally progressive-enhance with the native View Transitions API where supported.
- **WebGL hero (aurora):** custom fragment shader via `ogl` (~10kb). Lazy-mounted **after hydration**, client-only, with an SSR CSS-gradient fallback painted immediately so the **text heading stays the LCP** and WebGL never blocks it.
- **Custom cursor:** pointer-following element with magnetic attraction on interactive targets; **disabled** on touch/coarse pointers and under `prefers-reduced-motion`.
- **Reduced motion (non-negotiable):** every animation has a `@media (prefers-reduced-motion: reduce)` alternative (crossfade/instant); WebGL + cursor fully disabled; Lenis falls back to native scroll.
- **Motion primitives** (reusable, isolated components/hooks): `<Reveal>`, `<Magnetic>`, `<AuroraCanvas>`, `<SmoothScroll>` (Lenis provider), `<CustomCursor>`, `useScrollProgress`.

### Performance budget
- Hero LCP remains text-based; `fetchpriority="high"` retained on the profile image.
- All heavy motion code (`gsap`, `ogl`, cursor) behind `next/dynamic` with `ssr:false` where appropriate.
- Target: keep current TTFB; no CLS from reveals (reserve space; reveals enhance already-visible content, never gate visibility on a class-triggered transition).

## 5. Page-by-page treatment

- **Home** (`src/app/(public)/page.tsx`): retire scroll-snap; `<AuroraCanvas>` hero with oversized name + mono tagline + parallax; long-scroll → About teaser → Expertise → Featured Work (scroll-linked timeline) → Tech Stack (staggered, magnetic, keep the 3-group/curated-15 structure) → Contact. Header nav becomes anchor links with scroll-spy (reuse existing IntersectionObserver); add back-to-top.
- **/about** (`src/app/about/about.tsx`): editorial hero + photo; experience/education/certs as on-scroll reveal timeline; **remove the pre-existing side-stripe (`border-l-4`) borders** flagged by impeccable.
- **/projects** (`src/app/projects/page.tsx`): premium card grid with tilt/magnetic hover; optional tech filter; keep admin add/edit/delete affordances.
- **/projects/[id]**: cinematic case-study — project hero, then features / challenges / learnings as scroll-revealed sections.
- **/sign-in** (`src/app/auth/sign-in`): focused card over subtle aurora.
- **/404** (`src/app/not-found.tsx`): aurora scene + witty copy (fix existing PT typo "está"→"esta") + return-home.
- **Admin/CRUD** (modals, forms, tables, badges across `src/app/**/components`, `src/components/ui/*`, `src/components/form/*`): repaint to the new system. **Logic untouched** — server actions, react-query hooks, zod schemas, ky client all stay as-is.

## 6. Decomposition (each phase = its own plan → build → review)

- **Phase 0 — Foundation:** pnpm migration; aurora tokens in `globals.css` + Tailwind; `<SmoothScroll>` (Lenis); motion primitives (`<Reveal>`, `<Magnetic>`, `<CustomCursor>`, `useScrollProgress`); `<AuroraCanvas>` (ogl shader + fallback); route `template.tsx` transition; reduced-motion wiring. **Acceptance:** primitives demoable on the home hero; no regression to build/SEO/a11y; reduced-motion verified.
- **Phase 1 — Home:** full cinematic home per §5. **Acceptance:** single H1 preserved, LCP text-based, deep-link anchors work, reduced-motion clean, Lighthouse a11y no regressions.
- **Phase 2 — Secondary public pages:** about, projects, project detail, sign-in, 404.
- **Phase 3 — Admin/CRUD repaint:** modals/forms/tables/badges; all CRUD flows still functional.

## 7. Constraints / non-goals

- Do not rewrite data layer, auth, or API routes.
- Preserve the SEO/a11y work on `critique-improvements` (single H1, JSON-LD, skip link, aria-labels, consolidated metadata, fetchpriority).
- No new brand colors beyond the approved aurora ramp; no generic "AI-slop" patterns (see impeccable bans in §3).

## 8. Handoff

Implement on top of `critique-improvements` (or a new branch off it). After this
spec is approved: recommend `/clear` + switch to Sonnet (build model) and execute
**phase by phase** starting with Phase 0, each phase getting its own
implementation plan. This spec carries the full context.

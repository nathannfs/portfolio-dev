# Phase 1 — Cinematic Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the home page into a cinematic, conventional long-scroll experience using the Phase 0 motion foundation — without breaking the SEO/a11y guardrails.

**Architecture:** Retire the 100vh scroll-snap slide-deck for natural window scroll (which Lenis now drives), make the hero a full-height parallax scene over the aurora, reveal each section on scroll, upgrade nav to Lenis-powered anchor scrolling with the existing scroll-spy, and add a back-to-top control.

**Tech Stack:** Next.js 15 App Router, Tailwind 3, framer-motion 12, lenis, gsap, ogl (all installed in Phase 0).

## Global Constraints

- Single `<h1>` on the page (the hero "Nathan Santos"); section titles stay `<h2>`. Spec §7.
- Hero LCP stays text-based; hero image keeps `priority` + `fetchPriority="high"`. Spec §4/§7.
- Preserve JSON-LD, skip link (`#main-content`), one `<main>`, aria-labels, consolidated metadata. Spec §7.
- Reduced motion: parallax, reveals, smooth-scroll, back-to-top smooth behavior all degrade to static/instant under `prefers-reduced-motion`. Spec §4.
- Deep-linkable anchors: `#home`, `#about`, `#specialties`, `#project`, `#techs`, `#contact` must scroll to their sections. Spec §5.
- Bans: no gradient-text headings, no default glassmorphism, no side-stripe borders. Spec §3.
- Keep theme toggle working (dark-first + light). Spec §2.
- No test runner in repo; per-task verification = `pnpm build` + browser check on `pnpm dev`.
- Reveals enhance already-visible content; never gate visibility on a class transition (headless renderers must still show content). Spec §4.

---

## File Structure

- Modify `src/components/section.tsx` — `Root` drops fixed-height/snap; gains long-scroll padding + `scroll-mt`.
- Modify `src/app/(public)/page.tsx` — remove inner scroll container; normal flow.
- Modify `src/components/motion/smooth-scroll.tsx` — expose Lenis via context + `useLenis()`.
- Modify `src/components/header.tsx` — nav uses `useLenis().scrollTo`, fallback to native.
- Modify `src/components/sections/hero.tsx` — full-height parallax hero.
- Modify `src/components/sections/{about,specialties,project,tech-stack,contact}.tsx` — scroll reveals / magnetic accents.
- Create `src/components/motion/back-to-top.tsx` — fixed back-to-top control.
- Modify `src/app/layout.tsx` — mount `<BackToTop/>`.
- Modify `src/components/motion/index.ts` — export `BackToTop`, `useLenis`.

---

## Task 1: Retire the scroll-snap deck → conventional long-scroll

**Files:**
- Modify: `src/components/section.tsx` (Root classes)
- Modify: `src/app/(public)/page.tsx` (container classes)

**Interfaces:**
- Produces: sections in normal document flow with generous spacing and `scroll-mt-24` so anchored navigation clears the 80px fixed header.

- [ ] **Step 1: Convert `Section.Root` to long-scroll spacing**

In `src/components/section.tsx`, change the `Root` className from:

```tsx
"mx-auto flex w-full flex-col items-center justify-center gap-10 px-4 py-10 md:h-[calc(100vh-80px)] md:snap-start md:py-4 lg:max-w-7xl",
```

to:

```tsx
"mx-auto flex w-full scroll-mt-24 flex-col items-center justify-center gap-10 px-4 py-20 md:py-28 lg:max-w-7xl",
```

- [ ] **Step 2: Remove the inner scroll container on the home page**

In `src/app/(public)/page.tsx`, change the wrapper `<div>` className from:

```tsx
className="min-h-full overflow-y-auto transition-all ease-in-out md:h-[calc(100vh-80px)] md:snap-y md:snap-mandatory md:overflow-y-scroll"
```

to:

```tsx
className="flex flex-col"
```

The `ref={containerRef}` is now unused — remove `containerRef` and the `useRef` import if nothing else uses them.

- [ ] **Step 3: Verify**

Run: `pnpm build` → compiles.
Run: `pnpm dev`, open `/` → the page scrolls naturally (no per-section snap), each section has breathing room, header stays fixed. In console: `document.querySelectorAll('h1').length` → `1`.

- [ ] **Step 4: Commit**

```bash
git add src/components/section.tsx "src/app/(public)/page.tsx"
git commit -m "feat(home): retire scroll-snap deck for conventional long-scroll"
```

---

## Task 2: Lenis context + anchor navigation

**Files:**
- Modify: `src/components/motion/smooth-scroll.tsx` (provide context)
- Modify: `src/components/motion/index.ts` (export `useLenis`)
- Modify: `src/components/header.tsx` (nav uses Lenis)

**Interfaces:**
- Produces: `useLenis(): Lenis | null` — the active Lenis instance (null under reduced motion / before mount). Consumers call `lenis.scrollTo(target, { offset })`.

- [ ] **Step 1: Expose Lenis through context**

Replace the body of `src/components/motion/smooth-scroll.tsx` with a context-providing version:

```tsx
"use client"

import { useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) {
      return
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })
    setLenis(instance)
    instance.on("scroll", ScrollTrigger.update)

    const onRaf = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onRaf)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
```

- [ ] **Step 2: Export `useLenis` from the barrel**

In `src/components/motion/index.ts` add:

```ts
export { SmoothScroll, useLenis } from "./smooth-scroll"
```

(remove the old `export { SmoothScroll } from "./smooth-scroll"` line to avoid a duplicate export.)

- [ ] **Step 3: Use Lenis for nav in the header**

In `src/components/header.tsx`, import `useLenis` and rewrite the scroll logic inside `handleNavigation` to prefer Lenis. Add near the top of the component:

```tsx
import { useLenis } from "@/components/motion"
// ...
const lenis = useLenis()
```

Replace the desktop/mobile scroll branches of `handleNavigation` with a single Lenis-first path:

```tsx
function handleNavigation(id: string) {
  if (!isHomePage) {
    sessionStorage.setItem("scrollToSection", id)
    window.location.href = "/"
    return
  }

  const element = document.getElementById(id)
  if (!element) {
    return
  }

  setActiveSection(id)
  setIsSheetOpen(false)

  if (lenis) {
    lenis.scrollTo(element, { offset: -80 })
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: "smooth" })
  }
}
```

Apply the same Lenis-first logic to the `sessionStorage` "scrollToSection" restore effect (replace its inner mobile/desktop branches with the same `lenis ? lenis.scrollTo(element,{offset:-80}) : window.scrollTo(...)` shape).

- [ ] **Step 4: Verify**

Run: `pnpm build` → compiles.
Run: `pnpm dev`, open `/`. Click each nav item → smooth-scrolls to the section, offset clears the header, the active underline tracks the section. Direct-load `http://localhost:3000/#techs` → lands on Tech Stack. Enable Reduce Motion → nav still jumps to sections (native), no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/smooth-scroll.tsx src/components/motion/index.ts src/components/header.tsx
git commit -m "feat(home): lenis-powered anchor navigation via useLenis context"
```

---

## Task 3: Cinematic parallax hero

**Files:**
- Modify: `src/components/sections/hero.tsx`

**Interfaces:**
- Consumes: `AuroraCanvas`, `Magnetic`, `Reveal` (already imported in Phase 0).
- Produces: a full-height hero where the aurora and photo parallax as the page scrolls; single `<h1>` and `fetchPriority` image preserved.

- [ ] **Step 1: Make the hero full-height and add parallax**

In `src/components/sections/hero.tsx`:

1. Add imports: `import { useScroll, useTransform } from "framer-motion"` (merge into the existing framer-motion import line).
2. Give the hero root a min height and keep it the positioning context. Change the `Section.Root` opening tag to:

```tsx
<Section.Root
  className="relative min-h-[calc(100vh-80px)] justify-center overflow-hidden"
  id="home"
>
```

3. Inside the component, before `return`, add a scroll-driven parallax bound to the hero root:

```tsx
const heroScrollRef = useRef<HTMLDivElement>(null)
const { scrollYProgress } = useScroll({
  target: heroScrollRef,
  offset: ["start start", "end start"],
})
const auroraY = useTransform(scrollYProgress, [0, 1], [0, 140])
const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
```

4. Attach `ref={heroScrollRef}` to the `Section.Root` (add it as a prop).
5. Wrap the `<AuroraCanvas .../>` in a `motion.div` that uses `style={{ y: auroraY }}`:

```tsx
<motion.div
  className="pointer-events-none absolute inset-0 -z-10"
  style={{ y: auroraY }}
>
  <AuroraCanvas className="absolute inset-0" />
</motion.div>
```

6. Wrap the existing hero content `motion.div` (the one with `animate={controls}`) so it drifts/fades on scroll: add `style={{ y: contentY, opacity: contentOpacity }}` to that element (keep its existing `variants`/`animate`).

- [ ] **Step 2: Enlarge the hero headline**

Change the hero `<motion.h1>` className to a fluid display size:

```tsx
className="font-bold text-[clamp(3rem,8vw,5.5rem)] leading-[1.05] tracking-tight"
```

- [ ] **Step 3: Verify (guardrails + feel)**

Run: `pnpm build` → compiles.
Run: `pnpm dev`, open `/`. The hero fills the viewport; scrolling makes the aurora drift and the hero content rise/fade. Console checks:

```js
document.querySelectorAll('h1').length            // 1
document.querySelector('img[alt*="Nathan"]').getAttribute('fetchpriority') // "high"
```

Enable Reduce Motion → no parallax drift, content static and fully visible, aurora shows static gradient only.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat(home): full-height parallax hero over aurora"
```

---

## Task 4: Scroll reveals + magnetic accents across sections

**Files:**
- Modify: `src/components/sections/about.tsx`
- Modify: `src/components/sections/specialties.tsx`
- Modify: `src/components/sections/project.tsx`
- Modify: `src/components/sections/tech-stack.tsx`
- Modify: `src/components/sections/contact.tsx`

**Interfaces:**
- Consumes: `Reveal`, `Magnetic` from `@/components/motion`.
- Produces: each section's heading + body reveal on scroll; primary CTAs are magnetic. No visibility gated on class transitions (Reveal keeps content visible under reduced motion).

- [ ] **Step 1: Specialties — reveal header + stagger cards**

In `src/components/sections/specialties.tsx`, import `Reveal` and `Magnetic` from `@/components/motion`. Wrap the `Section.Header` contents in `<Reveal>`. The cards already stagger via framer variants — leave them, but wrap each card's inner content is not needed. Add `data-cursor="hover"` to each card's root `motion.div` so the custom cursor grows over them.

- [ ] **Step 2: Featured Work — scroll-reveal the timeline + magnetic CTA**

In `src/components/sections/project.tsx`, import `Reveal`, `Magnetic`. Wrap the `Section.Header` in `<Reveal>`. Wrap the "View all projects" button in `<Magnetic>`. Keep the timeline's existing per-item variants.

- [ ] **Step 3: Tech Stack — magnetic featured tiles**

In `src/components/sections/tech-stack.tsx`, import `Magnetic`. Wrap the `Section.Header` in `<Reveal>`. For featured tiles only (`tech.featured`), wrap the tile in `<Magnetic strength={0.2}>`. Add `data-cursor="hover"` to every tile root.

- [ ] **Step 4: About — reveal the tab content**

In `src/components/sections/about.tsx`, import `Reveal`. Wrap the `Section.Block` inside the "about" `TabsContent` in `<Reveal>`. Leave education/certification tabs as-is.

- [ ] **Step 5: Contact — reveal both panels + magnetic submit**

In `src/components/sections/contact.tsx`, import `Reveal`. Wrap the heading + intro paragraph block in `<Reveal>`. (The form panel already animates in via `rightVariants`.)

- [ ] **Step 6: Verify**

Run: `pnpm build` → compiles.
Run: `pnpm dev`, scroll `/` top to bottom → headers and content reveal smoothly once as they enter; featured tech tiles and CTAs react to the cursor; the cursor enlarges over cards. Enable Reduce Motion → everything is immediately visible, no transforms. Confirm still one `<h1>`.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/about.tsx src/components/sections/specialties.tsx src/components/sections/project.tsx src/components/sections/tech-stack.tsx src/components/sections/contact.tsx
git commit -m "feat(home): scroll reveals and magnetic accents across sections"
```

---

## Task 5: Back-to-top control

**Files:**
- Create: `src/components/motion/back-to-top.tsx`
- Modify: `src/components/motion/index.ts` (export)
- Modify: `src/app/layout.tsx` (mount)

**Interfaces:**
- Consumes: `useLenis` (Task 2).
- Produces: `<BackToTop />` — a fixed bottom-right button that appears after 600px of scroll and returns to top via Lenis (or native fallback).

- [ ] **Step 1: Implement the component**

`src/components/motion/back-to-top.tsx`:

```tsx
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

import { useLenis } from "./smooth-scroll"

export function BackToTop() {
  const lenis = useLenis()
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 600)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function toTop() {
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          animate={{ opacity: 1, scale: 1 }}
          aria-label="Voltar ao topo"
          className="fixed right-6 bottom-6 z-[90] flex size-11 items-center justify-center rounded-full border border-aurora-cyan/40 bg-surface-2/80 text-foreground shadow-lg backdrop-blur transition-colors hover:border-aurora-cyan hover:text-aurora-cyan"
          exit={{ opacity: 0, scale: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          onClick={toTop}
          type="button"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Export + mount**

In `src/components/motion/index.ts` add `export { BackToTop } from "./back-to-top"`.
In `src/app/layout.tsx`, render `<BackToTop />` inside `<SmoothScroll>` (after `<main>`), and import it.

- [ ] **Step 3: Verify**

Run: `pnpm build` → compiles.
Run: `pnpm dev`, scroll `/` down past ~600px → button appears bottom-right; click → smooth-scrolls to top; button hides near the top. Tab to it → focusable, `aria-label` present. Enable Reduce Motion → still works (native smooth/instant), no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/back-to-top.tsx src/components/motion/index.ts src/app/layout.tsx
git commit -m "feat(home): back-to-top control (lenis-aware, accessible)"
```

---

## Task 6: Final home verification pass

**Files:** none (verification + any fixups uncovered).

- [ ] **Step 1: Build + full guardrail sweep**

Run: `pnpm build` → compiles, all pages generate.
Run: `pnpm dev`, open `/`, run in console:

```js
({
  h1: document.querySelectorAll('h1').length,                 // 1
  main: document.querySelectorAll('main').length,             // 1
  fetchpri: document.querySelector('img[alt*="Nathan"]').getAttribute('fetchpriority'), // "high"
  jsonld: document.querySelectorAll('script[type="application/ld+json"]').length,       // 1
  viewport: document.querySelectorAll('meta[name="viewport"]').length,                  // 1
})
```

- [ ] **Step 2: Interaction + motion sweep**

Verify manually: nav anchors scroll correctly and deep-link (`/#contact`); reveals fire once per section; parallax hero; back-to-top; custom cursor; theme toggle (dark ↔ light, aurora adapts); no layout shift as sections reveal. Then toggle OS Reduce Motion and re-verify everything degrades to static/instant with no console errors (ignore the pre-existing prod-API CORS noise).

- [ ] **Step 3: Commit any fixups**

```bash
git add -A
git commit -m "fix(home): phase 1 verification fixups" || echo "nothing to fix"
```

---

## Self-Review (completed during authoring)

- **Spec coverage (§5 home):** long-scroll retirement (T1), aurora hero + parallax (T3), section reveals + tech-stack magnetic (T4), anchor nav + scroll-spy reuse (T2), back-to-top (T5). Acceptance criteria (single H1, LCP text, deep-link anchors, reduced-motion) verified in T3/T6.
- **Placeholder scan:** none — code provided for every non-mechanical step; mechanical wraps name the exact file, component, and insertion point.
- **Type consistency:** `useLenis(): Lenis | null` defined in T2, consumed by T5 and the header with matching null-guarded usage; `Reveal`/`Magnetic` props match Phase 0 definitions.
- **Out of scope (Phase 2+):** /about, /projects, /projects/[id], /sign-in, /404, admin/CRUD. Removing the pre-existing side-stripe borders on /about is Phase 2.

## Notes for the implementer

- Continue on branch `critique-improvements` (Phase 0 foundation is already there).
- The custom cursor and aurora come from Phase 0 — do not re-add them.
- If a reveal ever ships a section blank in a headless render, it means visibility was gated on the transition — fix by ensuring `Reveal` starts visible under reduced motion (it already does) and content is never `hidden` by default.

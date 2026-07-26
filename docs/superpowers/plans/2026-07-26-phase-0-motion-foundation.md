# Phase 0 — Motion Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the reusable design-token + motion foundation ("Aurora Terminal") that every later page redesign consumes — without changing any page's content yet.

**Architecture:** Standardize the toolchain on pnpm, layer aurora tokens onto the existing shadcn HSL system, and add a small set of isolated, reduced-motion-aware motion primitives (smooth scroll, reveal, magnetic, custom cursor, WebGL aurora, route transition). Everything heavy is client-only and lazy so the text hero stays the LCP.

**Tech Stack:** Next.js 15 App Router, Tailwind 3, framer-motion 12 (installed), **new:** `lenis`, `gsap`, `ogl`. Package manager: **pnpm**.

## Global Constraints

- Package manager is **pnpm**; remove `package-lock.json`, commit `pnpm-lock.yaml`. Copied verbatim from spec §2.
- Aurora ramp (exact): cyan `#22d3ee` → blue `#3b82f6` → violet `#8b5cf6`; base `#08080b`; surfaces `#0e0e13`, `#14141b`; border `rgba(255,255,255,.08)`; text `#ededf2`; muted `#9a9aa8`. Spec §3.
- **Bans:** no `background-clip:text` gradient on headings; no default glassmorphism; no side-stripe borders. Spec §3.
- **Reduced motion is non-negotiable:** every animation has a `prefers-reduced-motion: reduce` alternative; WebGL + custom cursor fully disabled under it; Lenis falls back to native scroll. Spec §4.
- **Keep the theme toggle** (dark-first + light variant). Spec §2.
- Preserve existing SEO/a11y: single H1, JSON-LD, skip link, aria-labels, consolidated metadata, hero image `fetchpriority="high"`. Spec §7.
- Heavy motion code (`gsap`, `ogl`, custom cursor) behind `next/dynamic` / client-only mount; no SSR of WebGL. Spec §4.
- No test runner exists in this repo; per-task verification = `pnpm build` (typecheck + lint) plus a browser check on `pnpm dev`. Do **not** add jest/vitest in this phase.
- Reveal animations enhance already-visible content; never gate content visibility on a class-triggered transition. Spec §4.

---

## File Structure

- Create `src/components/motion/smooth-scroll.tsx` — Lenis provider (client), RAF loop, reduced-motion fallback.
- Create `src/hooks/use-reduced-motion-safe.ts` — imperative `prefersReducedMotion()` + re-export of framer's hook for one import site.
- Create `src/components/motion/reveal.tsx` — `<Reveal>` scroll-reveal wrapper.
- Create `src/components/motion/magnetic.tsx` — `<Magnetic>` pointer-attraction wrapper.
- Create `src/components/motion/custom-cursor.tsx` — pointer-following cursor.
- Create `src/components/motion/aurora-canvas.tsx` — ogl aurora shader + CSS fallback.
- Create `src/hooks/use-scroll-progress.ts` — thin framer `useScroll` wrapper.
- Create `src/app/template.tsx` — route transition wrapper.
- Create `src/components/motion/index.ts` — barrel export.
- Modify `src/app/globals.css` — aurora tokens, Lenis CSS, reduced-motion base rules.
- Modify `tailwind.config.ts` — aurora colors + keyframes.
- Modify `src/app/layout.tsx` — mount `<SmoothScroll>` + `<CustomCursor>`.
- Modify `package.json` / delete `package-lock.json` / commit `pnpm-lock.yaml`.

---

## Task 1: Standardize on pnpm + install motion dependencies

**Files:**
- Modify: `package.json` (adds deps + `packageManager` field)
- Delete: `package-lock.json`
- Create/commit: `pnpm-lock.yaml`

**Interfaces:**
- Produces: `lenis`, `gsap`, `ogl` importable; pnpm as the canonical PM.

- [ ] **Step 1: Confirm pnpm is available**

Run: `pnpm --version`
Expected: prints a version (e.g. `9.x`). If missing: `corepack enable && corepack prepare pnpm@latest --activate`.

- [ ] **Step 2: Remove the npm lockfile and pin pnpm**

Run: `rm -f package-lock.json`
Then add a `packageManager` field to `package.json` (use the version printed in Step 1), e.g.:

```json
"packageManager": "pnpm@9.15.0"
```

- [ ] **Step 3: Install existing deps cleanly with pnpm**

Run: `pnpm install`
Expected: resolves and writes `pnpm-lock.yaml`, no errors.

- [ ] **Step 4: Add the motion libraries**

Run: `pnpm add lenis gsap ogl`
Expected: `package.json` dependencies now include `lenis`, `gsap`, `ogl`.

- [ ] **Step 5: Verify the app still builds**

Run: `pnpm build`
Expected: `✓ Compiled successfully`, all pages generated, no type errors.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml
git rm --cached package-lock.json 2>/dev/null || true
git commit -m "chore: standardize on pnpm and add lenis/gsap/ogl"
```

---

## Task 2: Aurora design tokens

**Files:**
- Modify: `src/app/globals.css` (add aurora custom properties + reduced-motion base + Lenis CSS)
- Modify: `tailwind.config.ts` (aurora colors + keyframes)

**Interfaces:**
- Produces: CSS vars `--aurora-1/2/3`, `--surface-1/2`, `--glow`; Tailwind colors `aurora.cyan/blue/violet`, `surface.1/2`; utility `bg-aurora-radial`.

- [ ] **Step 1: Add aurora tokens + Lenis CSS + reduced-motion base to `globals.css`**

Inside the existing `@layer base { :root { … } }` block, append the aurora vars (dark defaults):

```css
--aurora-1: #22d3ee;
--aurora-2: #3b82f6;
--aurora-3: #8b5cf6;
--surface-1: #0e0e13;
--surface-2: #14141b;
--glow: 34 211 238;
```

In the `.dark { … }` block keep the same values (dark is default). Add a light-variant override under `:root` is not needed; instead add softened values in a new rule so the toggle still works:

```css
:root:not(.dark) {
  --aurora-1: #67e8f9;
  --aurora-2: #93c5fd;
  --aurora-3: #c4b5fd;
  --surface-1: #ffffff;
  --surface-2: #f4f4f6;
}
```

After the `@layer base` blocks, add Lenis + reduced-motion CSS:

```css
/* ─── Lenis smooth scroll ─── */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-stopped {
  overflow: hidden;
}

/* ─── Reduced motion: kill decorative motion ─── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

/* ─── Aurora radial helper ─── */
.bg-aurora-radial {
  background:
    radial-gradient(60% 50% at 20% 20%, color-mix(in oklab, var(--aurora-1) 45%, transparent), transparent 70%),
    radial-gradient(55% 45% at 80% 30%, color-mix(in oklab, var(--aurora-3) 40%, transparent), transparent 70%);
}
```

- [ ] **Step 2: Extend Tailwind with aurora colors + keyframes**

In `tailwind.config.ts` `theme.extend`, add alongside the existing `fontFamily`:

```ts
colors: {
  // ...existing colors stay...
  aurora: {
    cyan: "var(--aurora-1)",
    blue: "var(--aurora-2)",
    violet: "var(--aurora-3)",
  },
  surface: {
    1: "var(--surface-1)",
    2: "var(--surface-2)",
  },
},
keyframes: {
  "aurora-drift": {
    "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
    "50%": { transform: "translate3d(2%,-2%,0) scale(1.05)" },
  },
},
animation: {
  "aurora-drift": "aurora-drift 18s ease-in-out infinite",
},
```

(Merge into the existing `colors` object — do not drop the shadcn colors already there.)

- [ ] **Step 3: Verify build + tokens resolve**

Run: `pnpm build`
Expected: compiles. Then `pnpm dev`, open `http://localhost:3000`, in devtools console run:
`getComputedStyle(document.documentElement).getPropertyValue('--aurora-1')`
Expected (dark): `#22d3ee`.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat(theme): add aurora tokens, lenis + reduced-motion base css"
```

---

## Task 3: Reduced-motion helper + Lenis SmoothScroll provider

**Files:**
- Create: `src/hooks/use-reduced-motion-safe.ts`
- Create: `src/components/motion/smooth-scroll.tsx`
- Modify: `src/app/layout.tsx` (wrap children in `<SmoothScroll>`)

**Interfaces:**
- Produces: `prefersReducedMotion(): boolean` (imperative, SSR-safe); `<SmoothScroll>{children}</SmoothScroll>` client component that drives window scroll via Lenis and syncs GSAP ScrollTrigger.

- [ ] **Step 1: Create the imperative reduced-motion helper**

`src/hooks/use-reduced-motion-safe.ts`:

```ts
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(pointer: coarse)").matches
}
```

- [ ] **Step 2: Create the SmoothScroll provider**

`src/components/motion/smooth-scroll.tsx`:

```tsx
"use client"

import { useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { type ReactNode, useEffect } from "react"

import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })

    lenis.on("scroll", ScrollTrigger.update)

    const onRaf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
    }
  }, [reduced])

  return <>{children}</>
}
```

- [ ] **Step 3: Mount it in the root layout**

In `src/app/layout.tsx`, import `SmoothScroll` and wrap the existing `<Providers>` subtree's children. The `<main>` and `<Header>` stay inside. Concretely, wrap the `<Header/><main>…</main>` region:

```tsx
import { SmoothScroll } from "@/components/motion/smooth-scroll"
// ...
<Providers>
  <SmoothScroll>
    <Header />
    <main className="pt-[80px]" id="main-content">
      {children}
    </main>
  </SmoothScroll>
</Providers>
```

- [ ] **Step 4: Verify build + runtime**

Run: `pnpm build` → compiles.
Run: `pnpm dev`, open `/about` (a long, normally-scrolling page). Scrolling should feel eased/smooth. Toggle OS "Reduce Motion" on → reload → scroll is native (no easing), no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/use-reduced-motion-safe.ts src/components/motion/smooth-scroll.tsx src/app/layout.tsx
git commit -m "feat(motion): lenis smooth-scroll provider + reduced-motion helper"
```

---

## Task 4: `<Reveal>` scroll-reveal primitive

**Files:**
- Create: `src/components/motion/reveal.tsx`

**Interfaces:**
- Consumes: `prefersReducedMotion` (Task 3, not imported — uses framer's `useReducedMotion` internally).
- Produces: `<Reveal>` — props `{ children, delay?, y?, as?, className }`. Enhances visible content: initial state is a small offset+opacity that resolves in view; under reduced motion it renders fully visible with no transform.

- [ ] **Step 1: Implement `<Reveal>`**

`src/components/motion/reveal.tsx`:

```tsx
"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={variants}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: compiles (no runtime wiring yet; integration happens in Task 10).

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/reveal.tsx
git commit -m "feat(motion): Reveal scroll primitive"
```

---

## Task 5: `<Magnetic>` pointer-attraction primitive

**Files:**
- Create: `src/components/motion/magnetic.tsx`

**Interfaces:**
- Consumes: `isCoarsePointer` from `@/hooks/use-reduced-motion-safe`; framer `useReducedMotion`.
- Produces: `<Magnetic>` — props `{ children, strength?, className }`. Wraps an interactive element; translates it toward the cursor within its bounds. No-op on coarse pointer / reduced motion.

- [ ] **Step 1: Implement `<Magnetic>`**

`src/components/motion/magnetic.tsx`:

```tsx
"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { type ReactNode, useRef } from "react"

import { isCoarsePointer } from "@/hooks/use-reduced-motion-safe"

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const disabled = reduced || isCoarsePointer()

  function onMove(e: React.PointerEvent) {
    if (disabled || !ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      onPointerLeave={reset}
      onPointerMove={onMove}
      ref={ref}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build` → compiles.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/magnetic.tsx
git commit -m "feat(motion): Magnetic pointer-attraction primitive"
```

---

## Task 6: `<CustomCursor>`

**Files:**
- Create: `src/components/motion/custom-cursor.tsx`
- Modify: `src/app/layout.tsx` (mount cursor once, inside `<SmoothScroll>`)

**Interfaces:**
- Consumes: `isCoarsePointer` from `@/hooks/use-reduced-motion-safe`; framer `useReducedMotion`.
- Produces: `<CustomCursor />` — a fixed, top-layer dot+ring that follows the pointer and grows over `a, button, [data-cursor="hover"]`. Renders `null` on coarse pointer / reduced motion.

- [ ] **Step 1: Implement `<CustomCursor>`**

`src/components/motion/custom-cursor.tsx`:

```tsx
"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

import { isCoarsePointer } from "@/hooks/use-reduced-motion-safe"

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 })
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (reduced || isCoarsePointer()) {
      return
    }
    setEnabled(true)

    function onMove(e: PointerEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement
      setHovering(Boolean(el.closest('a, button, [data-cursor="hover"]')))
    }

    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduced, x, y])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
      style={{ x: rx, y: ry }}
    >
      <motion.div
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.4 : 0.8 }}
        className="-translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border border-aurora-cyan"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  )
}
```

- [ ] **Step 2: Hide the native cursor on pointer-fine devices**

In `globals.css`, add:

```css
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  body {
    cursor: none;
  }
  body a,
  body button {
    cursor: none;
  }
}
```

- [ ] **Step 3: Mount in layout**

In `src/app/layout.tsx`, render `<CustomCursor />` as the first child inside `<SmoothScroll>` (before `<Header/>`).

- [ ] **Step 4: Verify build + runtime**

Run: `pnpm build` → compiles.
Run: `pnpm dev` → on desktop, a cursor dot follows the pointer and enlarges over links/buttons. Native cursor hidden. Enable OS Reduce Motion → reload → native cursor back, no custom dot, no errors. Resize devtools to a touch device emulation → cursor absent.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/custom-cursor.tsx src/app/globals.css src/app/layout.tsx
git commit -m "feat(motion): custom magnetic cursor (desktop, motion-safe)"
```

---

## Task 7: `<AuroraCanvas>` WebGL background

**Files:**
- Create: `src/components/motion/aurora-canvas.tsx`

**Interfaces:**
- Consumes: `prefersReducedMotion` from `@/hooks/use-reduced-motion-safe`.
- Produces: `<AuroraCanvas className?>` — an absolutely-positioned WebGL layer running a flowing cyan→violet aurora shader. Renders a static `bg-aurora-radial` div immediately (SSR-safe); mounts the `ogl` canvas only after hydration and only when motion is allowed. Never the LCP element.

- [ ] **Step 1: Implement `<AuroraCanvas>`**

`src/components/motion/aurora-canvas.tsx`:

```tsx
"use client"

import { Mesh, Program, Renderer, Triangle } from "ogl"
import { useEffect, useRef, useState } from "react"

import { prefersReducedMotion } from "@/hooks/use-reduced-motion-safe"

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // cheap 2D value-noise + fbm
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p*=2.0; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime * 0.05;
    float f = fbm(uv*3.0 + vec2(t, t*0.6));
    f = fbm(uv*3.0 + f + vec2(-t*0.4, t));

    vec3 cyan   = vec3(0.133, 0.827, 0.933);
    vec3 blue   = vec3(0.231, 0.510, 0.965);
    vec3 violet = vec3(0.545, 0.361, 0.965);

    vec3 col = mix(blue, cyan, smoothstep(0.2, 0.6, f));
    col = mix(col, violet, smoothstep(0.5, 0.9, f));

    // vignette + fade toward bottom so text stays readable
    float glow = smoothstep(1.0, 0.2, length(uv - vec2(0.5, 0.35)));
    float alpha = f * glow * 0.55;
    gl_FragColor = vec4(col, alpha);
  }
`

export function AuroraCanvas({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || !hostRef.current) {
      return
    }
    setActive(true)

    const host = hostRef.current
    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) })
    const gl = renderer.gl
    gl.canvas.style.width = "100%"
    gl.canvas.style.height = "100%"
    host.appendChild(gl.canvas)

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [host.clientWidth, host.clientHeight] },
      },
      transparent: true,
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    function resize() {
      renderer.setSize(host.clientWidth, host.clientHeight)
      program.uniforms.uResolution.value = [host.clientWidth, host.clientHeight]
    }
    resize()
    window.addEventListener("resize", resize)

    let raf = 0
    function loop(time: number) {
      program.uniforms.uTime.value = time * 0.001
      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      gl.canvas.remove()
      const ext = gl.getExtension("WEBGL_lose_context")
      ext?.loseContext()
    }
  }, [])

  return (
    <div aria-hidden="true" className={className}>
      {/* SSR-safe static fallback — paints immediately, never the LCP */}
      <div className="absolute inset-0 bg-aurora-radial opacity-60" />
      <div
        className="absolute inset-0"
        ref={hostRef}
        style={{ opacity: active ? 1 : 0, transition: "opacity 1s ease" }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify build + runtime**

Run: `pnpm build` → compiles.
Run: `pnpm dev` → temporarily drop `<AuroraCanvas className="absolute inset-0 -z-10" />` behind the hero (revert after) and confirm: static gradient paints instantly, WebGL fades in, colors are cyan→violet, no console WebGL errors. Enable Reduce Motion → only the static gradient shows, no canvas.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/aurora-canvas.tsx
git commit -m "feat(motion): ogl aurora WebGL background with static fallback"
```

---

## Task 8: `useScrollProgress` hook

**Files:**
- Create: `src/hooks/use-scroll-progress.ts`

**Interfaces:**
- Produces: `useScrollProgress(ref)` → framer `MotionValue<number>` (0→1) for a target element's scroll through the viewport, for parallax/scrubbed effects in later phases.

- [ ] **Step 1: Implement the hook**

`src/hooks/use-scroll-progress.ts`:

```ts
"use client"

import { type MotionValue, useScroll } from "framer-motion"
import type { RefObject } from "react"

export function useScrollProgress(
  ref: RefObject<HTMLElement>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  return scrollYProgress
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build` → compiles.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-scroll-progress.ts
git commit -m "feat(motion): useScrollProgress hook"
```

---

## Task 9: Route transition `template.tsx`

**Files:**
- Create: `src/app/template.tsx`

**Interfaces:**
- Produces: a root `template.tsx` that fades/rises each route on navigation, reduced-motion aware.

- [ ] **Step 1: Implement the template**

`src/app/template.tsx`:

```tsx
"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <>{children}</>
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify build + runtime**

Run: `pnpm build` → compiles.
Run: `pnpm dev` → navigate `/` → `/projects` → `/about`; each route fades/rises in. Enable Reduce Motion → instant swaps, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/template.tsx
git commit -m "feat(motion): route transition template"
```

---

## Task 10: Barrel export + foundation smoke integration

**Files:**
- Create: `src/components/motion/index.ts`
- Modify: `src/components/sections/hero.tsx` (mount `<AuroraCanvas>` behind hero; wrap one block in `<Reveal>`; wrap a CTA in `<Magnetic>`)

**Interfaces:**
- Consumes: all primitives from Tasks 3–9.
- Produces: proof the foundation composes on the real home hero without regressing SEO/a11y.

- [ ] **Step 1: Create the barrel**

`src/components/motion/index.ts`:

```ts
export { AuroraCanvas } from "./aurora-canvas"
export { CustomCursor } from "./custom-cursor"
export { Magnetic } from "./magnetic"
export { Reveal } from "./reveal"
export { SmoothScroll } from "./smooth-scroll"
```

- [ ] **Step 2: Mount aurora behind the hero (minimal, non-destructive)**

In `src/components/sections/hero.tsx`, make `Section.Root` the positioning context and add the canvas as the first child of the hero's outer wrapper:

```tsx
import { AuroraCanvas, Magnetic, Reveal } from "@/components/motion"
// inside the hero root, as first child:
<AuroraCanvas className="pointer-events-none absolute inset-0 -z-10" />
```

Ensure the hero's root element has `relative` and `overflow-hidden`. Wrap the existing description block in `<Reveal>` and wrap the "Let's Talk" CTA in `<Magnetic>`. Do not remove the current animations yet (full home is Phase 1); this is a smoke test.

- [ ] **Step 3: Verify no regression (build + SEO/a11y invariants)**

Run: `pnpm build` → compiles.
Run: `pnpm dev`, open `/`, in console verify the guardrails still hold:

```js
document.querySelectorAll('h1').length            // 1
document.querySelectorAll('main').length          // 1
document.querySelector('img[alt*="Nathan"]').getAttribute('fetchpriority') // "high"
document.querySelectorAll('script[type="application/ld+json"]').length     // 1
```

Confirm: aurora renders behind the hero, cursor works, CTA is magnetic, description reveals. Enable Reduce Motion → static gradient only, native cursor, content fully visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/index.ts src/components/sections/hero.tsx
git commit -m "feat(motion): barrel export + wire foundation into hero (smoke)"
```

---

## Self-Review (completed during authoring)

- **Spec coverage:** pnpm migration (T1), aurora tokens (T2), Lenis (T3), reduced-motion (T2 base CSS + every primitive), Reveal/Magnetic/Cursor/Aurora/useScrollProgress (T4–T8), route transition (T9), foundation demoable on hero + no SEO/a11y regression (T10). All Phase 0 spec items map to a task.
- **Placeholder scan:** none — every code step has real code.
- **Type consistency:** `prefersReducedMotion`/`isCoarsePointer` defined in T3 and consumed by T5/T6/T7 with matching signatures; primitive prop names consistent across barrel (T10).
- **Out of scope (correctly deferred to Phase 1+):** retiring the home scroll-snap deck, full section redesigns, GSAP pinned sequences, page-specific work. `useScrollProgress` and GSAP are wired but only exercised heavily later.

## Notes for the implementer

- Work on top of branch `critique-improvements` (or a new branch off it).
- The current home still uses an inner scroll container (`md:overflow-y-scroll`); Lenis drives window scroll, so verify smooth scroll on `/about` in Phase 0. The snap deck is retired in Phase 1.
- If `pnpm build` flags unused exports from the barrel before Phase 1 consumes them, that's expected; keep them.

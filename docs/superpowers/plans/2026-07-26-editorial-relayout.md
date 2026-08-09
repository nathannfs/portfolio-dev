# Editorial Relayout — complete structural recomposition

The previous pass re-skinned the existing composition. This is a **structural
rebuild**: new layout skeleton, big-type editorial system, horizontal work
showcase. Keep the committed visual system (aurora dark palette, Geist, motion
primitives) and **reuse all existing content/data sources**; change the
composition itself.

## Hard rule
Do NOT keep: the centered hero (text-left / photo-right split), the stacked
full-width sections with centered titles + uniform card grids. That is the old
layout. Replace the skeleton.

## Visual system (unchanged, reuse)
- Aurora dark tokens, Geist sans/mono, `bg-surface-1/2`, `text-aurora-cyan/blue/violet`.
- Primitives: `@/components/motion` → `AuroraCanvas`, `Reveal`, `Magnetic`, `useLenis`; `@/hooks/use-scroll-progress`; `gsap` + `ScrollTrigger` installed.
- Bans still apply: no gradient-text headings, no glassmorphism, no side-stripe borders. Reduced-motion safe. One `<h1>` per page.

## New HOME structure (editorial big-type + horizontal showcase)
1. **Hero (~100vh):** name as a massive full-bleed typographic statement — "Nathan" / "Santos" stacked, `clamp(4rem, 16vw, 18rem)`, leading ~0.85, tracking tight, left-aligned poster feel. Aurora behind. Small offset annotation: role + mono tagline (`Product Engineer · TypeScript · Next.js · Supabase`). Availability pill ("Open to Full-Stack Engineer Roles"). Corner: social text-links (GH/LI/IG). Bottom scroll cue. No photo-right split.
2. **Selected Work — horizontal showcase:** the signature piece. `useProjects()` (first ~5). Horizontal scrolling rail of large project panels (GSAP ScrollTrigger horizontal-pin on desktop; native `overflow-x` snap rail on mobile / reduced-motion). Each panel: big project name, year, description, tech badges, "View" link (Magnetic). Section index/label ("Selected Work").
3. **About strip:** asymmetric — a large statement paragraph (existing about copy) + the profile photo integrated as an offset element (not a centered avatar). Big label "About".
4. **Expertise:** editorial numbered rows (01/02/03 from `specialities`) — large titles, hover-revealed descriptions; NOT small identical cards.
5. **Tech Stack:** editorial treatment of `techGroups` — big group labels, techs as refined inline wrap/marquee, featured emphasized. Not the plain tile grid.
6. **Contact:** big editorial CTA — oversized "Let's build something", email as a large link, plus the existing contact channels + form. Footer.

Header/nav stays (anchor nav + scroll-spy already wired); update section ids to match (`home`, `work`/`project`, `about`, `specialties`, `techs`, `contact`).

## Secondary pages (after home approved)
Recompose in the same editorial system, reusing content:
- **/projects:** big editorial index/list of all projects (large rows), not a small-card grid.
- **/projects/[id]:** editorial case study (already close; align type scale).
- **/about:** editorial long-form (already de-striped in Phase 2; elevate type/rhythm).
- **/sign-in, /404:** already on-system; leave or light-touch.

## Reuse map (data sources — do not re-invent)
- Projects: `useProjects()` from `@/hooks/use-query-data` (Project type: name, description, techs[], year, href, completed, features/challenges/learnings).
- Specialties: `specialties` from `@/utils/specialities`.
- Tech: `techGroups` from `@/utils/techs`.
- Contact: email `nathann.santoss2@gmail.com`, phone `+55 (16) 99143-7961`, `linkedin.com/in/nathannfs`, `github.com/nathannfs`, Sertãozinho, SP.
- Photo: `/nathan.jpeg` (hero image — keep `priority` + `fetchPriority="high"` wherever it lands, LCP-safe).

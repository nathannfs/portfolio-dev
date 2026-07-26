"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

import { Magnetic, Reveal } from "@/components/motion"
import { useProjects } from "@/hooks/use-query-data"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion-safe"
import { useI18n } from "@/i18n/provider"
import type { Project as ProjectType } from "@/types/project"

import { Badge } from "../ui/badge"

function ProjectPanel({
  project,
  index,
}: {
  project: ProjectType
  index: number
}) {
  const { t } = useI18n()

  return (
    <article className="flex h-full w-[85vw] shrink-0 snap-center flex-col justify-between border-border border-l px-6 py-10 md:w-[60vw] md:px-12 md:py-16 lg:w-[46vw]">
      <div className="flex items-center justify-between font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
        <span>
          {String(index + 1).padStart(2, "0")} / {project.year ?? "2024"}
        </span>
        {project.completed && (
          <span className="text-aurora-cyan">{t("work.shipped")}</span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-bold text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tighter">
          {project.name}
        </h3>
        <p className="max-w-lg text-base text-muted-foreground leading-relaxed md:text-lg">
          {project.description}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <Badge key={tech} variant="blue">
              {tech}
            </Badge>
          ))}
        </div>
        <Magnetic className="w-fit">
          <Link
            className="inline-flex items-center gap-2 border-foreground border-b pb-1 font-semibold text-foreground transition-colors hover:border-aurora-cyan hover:text-aurora-cyan"
            href="/projects"
          >
            {t("common.viewProject")}
            <ArrowUpRight className="size-4" />
          </Link>
        </Magnetic>
      </div>
    </article>
  )
}

export function Project() {
  const { data: projects } = useProjects()
  const { t } = useI18n()
  const sectionRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  const items = projects?.slice(0, 5) ?? []

  useEffect(() => {
    if (prefersReducedMotion() || items.length === 0) {
      return
    }
    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      gsap.registerPlugin(ScrollTrigger)
      const rail = railRef.current
      const section = sectionRef.current
      if (!(rail && section)) {
        return
      }

      const getScrollDistance = () => rail.scrollWidth - window.innerWidth

      const tween = gsap.to(rail, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [items.length])

  return (
    <section
      className="relative scroll-mt-20 overflow-hidden md:scroll-mt-0"
      id="project"
      ref={sectionRef}
    >
      {/* Section label — pinned visually at top of the pinned viewport */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-6 pt-24 md:px-10 lg:px-16">
        <Reveal>
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
            {t("work.label")}
          </span>
        </Reveal>
        <span className="hidden font-mono text-muted-foreground text-xs uppercase tracking-[0.3em] md:inline">
          {t("work.projectsCount", {
            count: String(items.length).padStart(2, "0"),
          })}
        </span>
      </div>

      {/* Desktop: pinned horizontal rail. Mobile / reduced-motion: native snap scroll. */}
      <div
        className="flex min-h-[calc(100vh-80px)] snap-x snap-mandatory items-center overflow-x-auto scroll-smooth pt-28 [-ms-overflow-style:none] [scrollbar-width:none] md:h-[calc(100vh-80px)] md:snap-none md:overflow-visible md:pt-0 [&::-webkit-scrollbar]:hidden"
        ref={railRef}
      >
        {/* Intro panel */}
        <div className="flex h-full w-[85vw] shrink-0 snap-center flex-col justify-center px-6 md:w-[42vw] md:px-16 lg:w-[36vw]">
          <h2 className="font-bold text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] tracking-tighter">
            {t("work.headingLine1")}
            <br />
            <span className="text-muted-foreground">
              {t("work.headingLine2")}
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-base text-muted-foreground leading-relaxed md:text-lg">
            {t("work.intro")}
          </p>
          <Magnetic className="mt-8 w-fit">
            <Link
              className="inline-flex items-center gap-2 font-mono text-muted-foreground text-sm uppercase tracking-[0.15em] transition-colors hover:text-foreground"
              href="/projects"
            >
              {t("common.viewAll")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Magnetic>
        </div>

        {items.map((project, idx) => (
          <ProjectPanel index={idx} key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

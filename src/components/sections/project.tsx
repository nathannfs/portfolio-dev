"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Magnetic, Reveal } from "@/components/motion"
import { useProjects } from "@/hooks/use-query-data"
import { useI18n } from "@/i18n/provider"
import type { Project as ProjectType } from "@/types/project"

import { Badge } from "../ui/badge"

function ProjectRow({
  project,
  index,
}: {
  project: ProjectType
  index: number
}) {
  const { t } = useI18n()

  return (
    <Reveal>
      <article className="grid grid-cols-1 gap-6 border-border border-t py-10 md:grid-cols-12 md:gap-8 md:py-14">
        <span className="font-mono text-muted-foreground text-sm md:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="md:col-span-6">
          <div className="mb-3 flex items-center gap-3 font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
            <span>{project.year ?? "2024"}</span>
            {project.completed && (
              <span className="text-aurora-cyan">{t("work.shipped")}</span>
            )}
          </div>
          <h3 className="font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-tighter">
            {project.name}
          </h3>
          <Magnetic className="mt-6 w-fit">
            <Link
              className="inline-flex items-center gap-2 border-foreground border-b pb-1 font-semibold text-foreground transition-colors hover:border-aurora-cyan hover:text-aurora-cyan"
              href="/projects"
            >
              {t("common.viewProject")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Magnetic>
        </div>

        <div className="md:col-span-5">
          <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techs.map((tech) => (
              <Badge key={tech} variant="blue">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Project() {
  const { data: projects } = useProjects()
  const { t } = useI18n()

  // Home shows a curated 2; the "View all" link goes to /projects (full list).
  const items = (projects ?? []).slice(0, 2)

  return (
    <section
      className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:scroll-mt-0 md:px-10 md:py-32 lg:px-16"
      id="project"
    >
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
            {t("work.label")}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="max-w-3xl font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter">
          {t("work.headingLine1")}{" "}
          <span className="text-muted-foreground">
            {t("work.headingLine2")}
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg">
          {t("work.intro")}
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col">
        {items.map((project, idx) => (
          <ProjectRow index={idx} key={project.id ?? project.name} project={project} />
        ))}
        <div aria-hidden="true" className="border-border border-t" />
      </div>

      <Magnetic className="mt-10 w-fit">
        <Link
          className="inline-flex items-center gap-2 font-mono text-muted-foreground text-sm uppercase tracking-[0.15em] transition-colors hover:text-foreground"
          href="/projects"
        >
          {t("common.viewAll")}
          <ArrowUpRight className="size-4" />
        </Link>
      </Magnetic>
    </section>
  )
}

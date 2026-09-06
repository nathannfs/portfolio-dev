"use client"

import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/button"
import { AuroraCanvas, Magnetic, Reveal } from "@/components/motion"
import { Badge } from "@/components/ui/badge"
import { localize } from "@/i18n/localize"
import { useI18n } from "@/i18n/provider"
import type { Project } from "@/types/project"

export function ProjectDetailView({ project }: { project: Project }) {
  const { t, locale } = useI18n()

  const description = localize(
    project.description,
    project.translations,
    "description",
    locale
  )
  const features = localize(
    project.features,
    project.translations,
    "features",
    locale
  )
  const challenges = localize(
    project.challenges,
    project.translations,
    "challenges",
    locale
  )
  const learnings = localize(
    project.learnings,
    project.translations,
    "learnings",
    locale
  )

  return (
    <main className="flex flex-col">
      {/* ─── Aurora hero band ─── */}
      <section className="relative overflow-hidden">
        <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10" />
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
          <Magnetic className="inline-block">
            <Link className="inline-flex" href="/projects">
              <Button
                className="gap-2 text-aurora-cyan hover:bg-aurora-cyan/10 hover:text-aurora-cyan"
                variant="ghost"
              >
                <ArrowLeft className="size-4" />
                {t("projectDetail.backToProjects")}
              </Button>
            </Link>
          </Magnetic>

          <div className="mt-8 flex flex-col gap-6">
            {project.year ? (
              <span className="font-mono text-aurora-cyan text-sm tracking-widest">
                {project.year}
              </span>
            ) : null}

            <h1 className="font-bold text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] tracking-tight">
              {project.name}
            </h1>

            {project.techs?.length ? (
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech: string) => (
                  <Badge key={tech} variant="blue">
                    {tech}
                  </Badge>
                ))}
              </div>
            ) : null}

            {project.href ? (
              <Magnetic className="inline-block">
                <a
                  className="inline-flex"
                  href={project.href}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Button className="gap-2" variant="primary">
                    {t("projectDetail.visitProject")}
                    <ExternalLink className="size-4" />
                  </Button>
                </a>
              </Magnetic>
            ) : null}
          </div>
        </div>
      </section>

      {/* ─── Case-study body ─── */}
      <div className="container mx-auto max-w-4xl space-y-8 px-4 pb-24">
        <Reveal>
          <section className="rounded-xl border bg-surface-1 p-6 sm:p-8">
            <h2 className="font-bold text-xl tracking-tight">
              {t("projectDetail.description")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </section>
        </Reveal>

        {features?.length ? (
          <Reveal>
            <section className="rounded-xl border bg-surface-1 p-6 sm:p-8">
              <h2 className="font-bold text-xl tracking-tight">
                {t("projectDetail.features")}
              </h2>
              <ul className="mt-4 space-y-3">
                {features.map((item: string) => (
                  <li className="flex gap-3 text-muted-foreground" key={item}>
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-aurora-cyan"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ) : null}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {challenges?.length ? (
            <Reveal>
              <section className="h-full rounded-xl border bg-surface-1 p-6 sm:p-8">
                <h2 className="font-bold text-xl tracking-tight">
                  {t("projectDetail.challenges")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {challenges.map((item: string) => (
                    <li className="flex gap-3 text-muted-foreground" key={item}>
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-aurora-cyan"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}

          {learnings?.length ? (
            <Reveal delay={0.1}>
              <section className="h-full rounded-xl border bg-surface-1 p-6 sm:p-8">
                <h2 className="font-bold text-xl tracking-tight">
                  {t("projectDetail.learnings")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {learnings.map((item: string) => (
                    <li className="flex gap-3 text-muted-foreground" key={item}>
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-aurora-cyan"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}
        </div>
      </div>
    </main>
  )
}

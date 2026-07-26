import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/button"
import { AuroraCanvas, Magnetic, Reveal } from "@/components/motion"
import { Badge } from "@/components/ui/badge"
import { getProjects } from "@/http/projects/get-projects"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const projects = await getProjects()

  const project = projects.find((p) => p.id === id)

  if (!project) {
    return notFound()
  }

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
                Back to projects
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
              <div>
                <Magnetic className="inline-block">
                  <Link
                    className="inline-flex"
                    href={project.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Button variant="primary">
                      Visit project
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </Link>
                </Magnetic>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ─── Case-study body ─── */}
      <div className="container mx-auto max-w-4xl space-y-8 px-4 pb-24">
        <Reveal>
          <section className="rounded-xl border bg-surface-1 p-6 sm:p-8">
            <h2 className="font-bold text-xl tracking-tight">Descrição</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </section>
        </Reveal>

        {project.features?.length ? (
          <Reveal>
            <section className="rounded-xl border bg-surface-1 p-6 sm:p-8">
              <h2 className="font-bold text-xl tracking-tight">
                Funcionalidades
              </h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((item: string) => (
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
          {project.challenges?.length ? (
            <Reveal>
              <section className="h-full rounded-xl border bg-surface-1 p-6 sm:p-8">
                <h2 className="font-bold text-xl tracking-tight">Desafios</h2>
                <ul className="mt-4 space-y-3">
                  {project.challenges.map((item: string) => (
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

          {project.learnings?.length ? (
            <Reveal delay={0.1}>
              <section className="h-full rounded-xl border bg-surface-1 p-6 sm:p-8">
                <h2 className="font-bold text-xl tracking-tight">
                  Aprendizados
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.learnings.map((item: string) => (
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

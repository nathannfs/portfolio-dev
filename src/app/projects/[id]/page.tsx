import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/button"
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
    <main className="container mx-auto max-w-2xl space-y-4 px-4 py-4">
      <Link className="flex items-center" href="/projects">
        <Button
          className="gap-2 text-sky-700 hover:bg-sky-100 hover:text-sky-900 dark:text-sky-300 dark:hover:bg-sky-900/20 dark:hover:text-sky-200"
          variant="ghost"
        >
          <ArrowLeft className="size-4" />
          Back to projects
        </Button>
      </Link>

      <div className="flex flex-col space-y-8 overflow-hidden rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-50 p-0 shadow-sm dark:border-sky-800 dark:from-sky-950 dark:via-zinc-950 dark:to-sky-900">

        <div className="flex flex-col space-y-4 px-6">
          <h1 className="font-extrabold text-3xl text-slate-800 tracking-tight drop-shadow-sm dark:text-slate-100">
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-3">
            {project.techs?.map((tech: string) => (
              <Badge key={tech} variant="blue">
                {tech}
              </Badge>
            ))}
          </div>

          <a href={project.href} rel="noopener noreferrer" target="_blank">
            <Button
              className="w-fit border-sky-600 bg-sky-600 text-white transition-all hover:scale-105 hover:bg-sky-700 dark:border-sky-500 dark:bg-sky-600 dark:hover:bg-sky-700"
              size="md"
              variant="secondary"
            >
              View project online <ExternalLink className="size-4" />
            </Button>
          </a>
        </div>

        <div className="space-y-8 px-6 pb-6">
          <section className="space-y-3">
            <h2 className="border-sky-600 border-l-4 pl-3 font-bold text-sky-900/90 text-xl dark:border-sky-400 dark:text-sky-200">
              Descrição
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed dark:text-slate-300">
              {project.description}
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="border-sky-600 border-l-4 pl-3 font-bold text-sky-900/90 text-xl dark:border-sky-400 dark:text-sky-200">
              Funcionalidades
            </h2>
            <ul className="list-disc space-y-2 pl-8 text-base text-slate-700 dark:text-slate-300">
              {project.features.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-sky-700 dark:text-sky-300">
                Desafios
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-base text-slate-700 dark:text-slate-300">
                {project.challenges.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-sky-700 dark:text-sky-300">
                Aprendizados
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-base text-slate-700 dark:text-slate-300">
                {project.learnings.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

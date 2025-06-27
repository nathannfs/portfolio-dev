import { ArrowLeft, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Button } from '@/components/button'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/utils/projects'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) return notFound()

  return (
    <main className="container mx-auto max-w-2xl space-y-2 px-4 py-4">
      <Link href="/projects" className="flex items-center">
        <Button
          variant="ghost"
          className="gap-2 text-sky-700 hover:bg-sky-100 hover:text-sky-900"
        >
          <ArrowLeft className="size-4" />
          Voltar para projetos
        </Button>
      </Link>

      <div className="flex flex-col space-y-8 overflow-hidden rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-50 p-0 shadow-sm dark:from-sky-950 dark:via-zinc-950 dark:to-sky-900">
        <div className="group relative h-56 w-full overflow-hidden md:h-72">
          <Image
            src={project.image}
            alt={project.name}
            width={1200}
            height={500}
            className="h-full w-full border-b border-sky-50 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-sky-100" />
        </div>

        <div className="flex flex-col space-y-4 px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 drop-shadow-sm">
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-3">
            {project.techs?.map((tech: string) => (
              <Badge variant="blue" key={tech}>
                {tech}
              </Badge>
            ))}
          </div>

          <a href={project.href} target="_blank" rel="noopener noreferrer">
            <Button
              variant="secondary"
              size="md"
              className="w-fit border-sky-600 bg-sky-600 text-white transition-all hover:scale-105 hover:bg-sky-700"
            >
              Ver projeto online <ExternalLink className="size-4" />
            </Button>
          </a>
        </div>

        <div className="space-y-8 px-6 pb-6">
          <section className="space-y-3">
            <h2 className="border-l-4 border-sky-600 pl-3 text-xl font-bold text-sky-900/90">
              Descrição
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              {project.description}
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="border-l-4 border-sky-600 pl-3 text-xl font-bold text-sky-900/90">
              Funcionalidades
            </h2>
            <ul className="list-disc space-y-2 pl-8 text-base text-slate-700">
              {project.features.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300">
                Desafios
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-base text-slate-700">
                {project.challenges.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300">
                Aprendizados
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-base text-slate-700">
                {project.learnings.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
          {project.screenshots.length > 1 && (
            <section className="space-y-3">
              <h2 className="border-l-4 border-sky-600 pl-3 text-xl font-bold text-sky-900/90">
                Screenshots
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.screenshots.map((src: string, i: number) => (
                  <Image
                    key={src + i}
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    width={300}
                    height={180}
                    className="rounded-lg border border-sky-100 object-cover shadow-md"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

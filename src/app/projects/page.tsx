import { ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/button'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/utils/projects'

export default function ProjectsPage() {
  return (
    <main className="container mx-auto space-y-8 px-4 py-12">
      <h1 className="text-3xl font-bold">Meus Projetos</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm"
          >
            <Image
              src={project.image}
              alt={project.name}
              width={600}
              height={340}
              className="h-48 w-full rounded-md object-cover"
            />
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-xl font-bold text-primary">{project.name}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techs?.map((tech) => (
                <Badge variant="blue" key={tech}>
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-auto flex gap-2">
              <Link href={`/projects/${project.id}`}>
                <Button variant="primary">
                  Ver detalhes <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href={project.href} target="_blank">
                <Button variant="link">
                  Live <ExternalLink className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

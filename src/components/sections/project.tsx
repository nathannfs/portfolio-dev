import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../button'
import { Section } from '../section'
import { Badge } from '../ui/badge'

type ProjectItem = {
  title: string
  description: string
  image?: string // opcional, pode usar placeholder
  techs: string[]
}

const projects: ProjectItem[] = [
  {
    title: 'SaaS Financeiro',
    description: 'Plataforma para gestão financeira de pequenas empresas.',
    techs: ['Next.js', 'Tailwind', 'Stripe'],
    image: '/projects/to-do-list-interview.png',
  },
  {
    title: 'E-commerce Moderno',
    description: 'Loja virtual com pagamentos integrados e painel admin.',
    techs: ['Next.js', 'Stripe', 'Prisma'],
    image: '/projects/to-do-list-interview.png',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Dashboard de análise de dados com gráficos interativos.',
    techs: ['React', 'Recharts', 'Supabase'],
    image: '/projects/to-do-list-interview.png',
  },
  {
    title: 'App de Agendamentos',
    description: 'Sistema de agendamentos com integração ao Google Calendar.',
    techs: ['Next.js', 'Supabase', 'Shadcn UI'],
    image: '/projects/to-do-list-interview.png',
  },
]

export function Project() {
  return (
    <Section.Root id="project">
      <Section.Header>
        <Section.Title>Projetos</Section.Title>
        <Section.Description>
          Alguns dos projetos que desenvolvi, focando sempre em performance,
          design bonito e código limpo.
        </Section.Description>
      </Section.Header>

      <Section.Content>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-5xl">
          {projects.slice(0, 4).map((project) => (
            <div
              key={project.title}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-background shadow-sm"
            >
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <Badge variant="blue" key={tech}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link href="/projects">
            <Button>
              Ver mais projetos
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </Section.Content>
    </Section.Root>
  )
}

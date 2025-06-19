import { motion } from 'framer-motion'
import { ArrowRight, CheckIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../button'
import { Section } from '../section'
import { Badge } from '../ui/badge'
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '../ui/timeline'

type ProjectItem = {
  title: string
  description: string
  image?: string // opcional, pode usar placeholder
  techs: string[]
  year?: string
  completed?: boolean
}

const projects: ProjectItem[] = [
  {
    title: 'SaaS Financeiro',
    description: 'Plataforma para gestão financeira de pequenas empresas.',
    techs: ['Next.js', 'Tailwind', 'Stripe'],
    image: '/projects/to-do-list-interview.png',
    year: '2024',
    completed: true,
  },
  {
    title: 'E-commerce Moderno',
    description: 'Loja virtual com pagamentos integrados e painel admin.',
    techs: ['Next.js', 'Stripe', 'Prisma'],
    image: '/projects/to-do-list-interview.png',
    year: '2024',
    completed: true,
  },
  {
    title: 'Dashboard Analytics',
    description: 'Dashboard de análise de dados com gráficos interativos.',
    techs: ['React', 'Recharts', 'Supabase'],
    image: '/projects/to-do-list-interview.png',
    year: '2024',
    completed: false,
  },
  {
    title: 'App de Agendamentos',
    description: 'Sistema de agendamentos com integração ao Google Calendar.',
    techs: ['Next.js', 'Supabase', 'Shadcn UI'],
    image: '/projects/to-do-list-interview.png',
    year: '2024',
    completed: false,
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
        <div className="flex w-full items-center justify-center">
          <Timeline
            value={
              projects
                .slice(0, 4)
                .map((p, i) => (p.completed ? i + 1 : 0))
                .filter(Boolean)
                .pop() || 1
            }
            className="flex w-full max-w-3xl flex-col items-center"
          >
            {projects.slice(0, 4).map((project, idx) => (
              <TimelineItem
                key={project.title}
                step={idx + 1}
                className="py-4 group-data-[orientation=vertical]/timeline:ms-10"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-full" />
                  <TimelineDate>{project.year ?? '2024'}</TimelineDate>
                  <TimelineTitle>{project.title}</TimelineTitle>
                  <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-completed/timeline-item:border-none flex size-6 items-center justify-center group-data-[orientation=vertical]/timeline:-left-7">
                    <CheckIcon
                      className="group-not-data-completed/timeline-item:hidden"
                      size={16}
                    />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent className="flex flex-col gap-2">
                  <div className="w-[400px] text-muted-foreground">
                    {project.description}
                  </div>
                  <div className="flex gap-2">
                    {project.techs.map((tech) => (
                      <Badge variant="blue" key={tech}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
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

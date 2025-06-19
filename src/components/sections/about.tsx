import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../button'
import { Section } from '../section'
import { Separator } from '../separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

interface Certificate {
  title: string
  institution: string
  start?: string
  end?: string
  hours?: number
  type?: 'degree' | 'certification'
  status: 'completed' | 'in_progress' | 'planned'
  description?: string
}

const certificates: Certificate[] = [
  {
    title: 'Pós Graduação em Engenharia de Software',
    institution: 'Descomplica EAD',
    start: 'Out/2024',
    end: 'Abr/2025',
    type: 'degree',
    status: 'in_progress',
  },
  {
    title: 'Tecnólogo em Mecatrônica Industrial',
    institution: 'FATEC',
    start: 'Jan/2019',
    end: 'Dez/2023',
    type: 'degree',
    status: 'completed',
  },
  {
    title: 'ReactJS',
    institution: 'Rocketseat',
    hours: 50,
    type: 'certification',
    status: 'completed',
    description:
      'Fundamentos do ReactJS, Criação de SPAs com ReactJS, Consumo de API e performance no ReactJS, Fundamentos do Next.js, Design System e Storybook e Criação de aplicação FullStack com NextJS.',
  },
  {
    title: 'NodeJS',
    institution: 'Rocketseat',
    hours: 50,
    type: 'certification',
    status: 'completed',
    description:
      'Fundamentos do Node.js, Streams, TypeScript, Clean Architecture, Domain-driven Design (DDD), Docker, Pirâmide de Testes, Vitest, Criação de API Rest com Fastify e Knex, Criação de API utilizando Fastify, Prisma, SOLID e autenticação com JWT, Fundamentos do NestJS, além de outros Design Patterns, como repository e factory pattern.',
  },
]

function statusLabel(status: Certificate['status']) {
  switch (status) {
    case 'completed':
      return 'Concluído'
    case 'in_progress':
      return 'Em andamento'
    case 'planned':
      return 'Planejado'
    default:
      return ''
  }
}

function statusColor(status: Certificate['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'planned':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return ''
  }
}

export function About() {
  return (
    <Section.Root id="about">
      <Tabs defaultValue="about" className="items-center justify-center">
        <TabsList className="mb-6 flex justify-center gap-1 bg-transparent">
          <TabsTrigger
            value="about"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            Sobre mim
          </TabsTrigger>
          <TabsTrigger
            value="degree"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            Formações
          </TabsTrigger>
          <TabsTrigger
            value="certifications"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            Certificações
          </TabsTrigger>
        </TabsList>

        <div className="flex w-full flex-col items-center justify-start">
          <Section.Content>
            <TabsContent value="about" className="w-full">
              <Section.Block>
                <Section.Description>
                  Sou um desenvolvedor Full Stack com sólida experiência em
                  desenvolvimento web, apaixonado por criar soluções inovadoras
                  e eficientes. Meu foco é transformar ideias em realidade
                  através de tecnologia, combinando criatividade, lógica e as
                  melhores práticas de programação. Tenho entusiasmo por
                  enfrentar desafios e encontrar soluções para problemas
                  complexos, sempre buscando impacto positivo e excelência nos
                  projetos que realizo. Meu trabalho reflete um compromisso com
                  aprendizado contínuo, inovação e entrega de resultados que
                  superem expectativas.
                </Section.Description>
              </Section.Block>
            </TabsContent>

            <TabsContent value="degree" className="w-full">
              <Section.Block>
                <div className="flex flex-col gap-4">
                  {certificates
                    .filter((c) => c.type === 'degree')
                    .map((certificate) => (
                      <div
                        key={certificate.title}
                        className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-foreground">
                            {certificate.title}
                          </span>
                          <span
                            className={`ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(
                              certificate.status,
                            )}`}
                          >
                            {statusLabel(certificate.status)}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium">
                            {certificate.institution}
                          </span>
                          <Separator orientation="vertical" className="h-3" />
                          <span className="text-xs text-zinc-400">
                            {certificate.start} - {certificate.end}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </Section.Block>
            </TabsContent>

            <TabsContent value="certifications" className="w-full">
              <Section.Block>
                <div className="flex flex-col gap-4">
                  {certificates
                    .filter((c) => c.type === 'certification')
                    .map((certificate) => (
                      <div
                        key={certificate.title}
                        className="flex max-w-lg flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-foreground">
                            {certificate.title}
                          </span>
                          <span
                            className={`ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(
                              certificate.status,
                            )}`}
                          >
                            {statusLabel(certificate.status)}
                          </span>
                        </div>
                        {certificate.description && (
                          <div className="text-xs text-muted-foreground">
                            {certificate.description}
                          </div>
                        )}
                        <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium">
                            {certificate.institution}
                          </span>
                          <Separator orientation="vertical" className="h-3" />
                          <span className="text-xs text-zinc-400">
                            {certificate.hours} horas
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </Section.Block>
            </TabsContent>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/about">
                <Button>
                  Mais sobre mim
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </motion.div>
          </Section.Content>
        </div>
      </Tabs>
    </Section.Root>
  )
}

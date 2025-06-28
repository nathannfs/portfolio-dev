'use client'

import { easeInOut, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { useCertifications, useDegrees } from '@/hooks/use-query-data'
import { statusColor, statusLabel } from '@/utils/status'

import { Button } from '../button'
import { Section } from '../section'
import { Separator } from '../separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
}

export function About() {
  const { data: certificates } = useCertifications()
  const { data: degrees } = useDegrees()

  return (
    <Section.Root id="about" className="scroll-mt-20 md:scroll-mt-0">
      <motion.div
        className="flex w-full flex-col items-center justify-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
      >
        <Tabs
          defaultValue="about"
          className="items-center justify-center space-y-6"
        >
          <TabsList className="flex justify-center gap-1 bg-transparent">
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
                <motion.div
                  key="about-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Section.Block>
                    <Section.Description>
                      Sou um desenvolvedor Full Stack com sólida experiência em
                      desenvolvimento web, apaixonado por criar soluções
                      inovadoras e eficientes. Meu foco é transformar ideias em
                      realidade através de tecnologia, combinando criatividade,
                      lógica e as melhores práticas de programação. Tenho
                      entusiasmo por enfrentar desafios e encontrar soluções
                      para problemas complexos, sempre buscando impacto positivo
                      e excelência nos projetos que realizo. Meu trabalho
                      reflete um compromisso com aprendizado contínuo, inovação
                      e entrega de resultados que superem expectativas.
                      <br />
                      <br />
                      <b>
                        Atualmente, busco desafios que me permitam crescer e
                        colaborar em projetos inovadores. Vamos construir algo
                        incrível juntos?
                      </b>
                    </Section.Description>
                  </Section.Block>
                </motion.div>
              </TabsContent>

              <TabsContent value="degree" className="w-full">
                <motion.div
                  key="degree-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Section.Block>
                    <div className="flex flex-col gap-4">
                      {degrees && degrees.map((degree) => (
                        <div
                          key={degree.title}
                          className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-foreground">
                              {degree.title}
                            </span>
                            <span
                              className={twMerge([
                                'ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium',
                                statusColor(degree.status),
                              ])}
                            >
                              {statusLabel(degree.status)}
                            </span>
                          </div>
                          <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-medium">
                              {degree.institution}
                            </span>
                            <Separator orientation="vertical" className="h-3" />
                            <span className="text-xs text-zinc-400">
                              {degree.period}
                            </span>
                          </div>
                          {degree.description && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {degree.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section.Block>
                </motion.div>
              </TabsContent>

              <TabsContent value="certifications" className="w-full">
                <motion.div
                  key="certifications-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Section.Block>
                    <div className="flex flex-col gap-4">
                      {certificates && certificates.splice(0, 2).map((certificate) => (
                        <div
                          key={certificate.title}
                          className="flex max-w-lg flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-foreground">
                              {certificate.title}
                            </span>
                            <span
                              className={twMerge([
                                'ml-2 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium',
                                statusColor(certificate.status),
                              ])}
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
                </motion.div>
              </TabsContent>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  translateY: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
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
      </motion.div>
    </Section.Root>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../button'
import { Section } from '../section'
import { Separator } from '../separator'

interface Certificate {
  title: string
  institution: string
  date: string
}

const certificates: Certificate[] = [
  {
    title: 'Pós Graduação em Engenharia de Software',
    institution: 'Descomplica EAD',
    date: '2025',
  },
  {
    title: 'Tecnólogo em Mecatrônica Industrial',
    institution: 'FATEC',
    date: '2023',
  },
  {
    title: 'Certificação ReactJS',
    institution: 'Rocketseat',
    date: '2024',
  },
  {
    title: 'Certificação NodeJS',
    institution: 'Rocketseat',
    date: '2025',
  },
]

export function About() {
  return (
    <Section.Root id="about">
      <Section.Content>
        <Section.Block>
          <Section.Title>Sobre mim</Section.Title>

          <Section.Description>
            Sou um desenvolvedor Full Stack com sólida experiência em
            desenvolvimento web, apaixonado por criar soluções inovadoras e
            eficientes. Meu foco é transformar ideias em realidade através de
            tecnologia, combinando criatividade, lógica e as melhores práticas
            de programação. Tenho entusiasmo por enfrentar desafios e encontrar
            soluções para problemas complexos, sempre buscando impacto positivo
            e excelência nos projetos que realizo. Meu trabalho reflete um
            compromisso com aprendizado contínuo, inovação e entrega de
            resultados que superem expectativas.
          </Section.Description>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/about">
              <Button>
                Mais sobre mim
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </Section.Block>

        <Separator />

        <Section.Block>
          <Section.Title>Formações / Certificações</Section.Title>

          <Section.List>
            {certificates.map((certificate) => (
              <li
                key={certificate.title}
                className="list-none text-center text-muted-foreground"
              >
                {certificate.title} - {certificate.institution} (
                {certificate.date})
              </li>
            ))}
          </Section.List>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/certifications">
              <Button>
                Ver mais
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </Section.Block>
      </Section.Content>
    </Section.Root>
  )
}

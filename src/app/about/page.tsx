import Image from 'next/image'

import { Section } from '@/components/section'
import { certifications } from '@/utils/certifications'
import { degrees } from '@/utils/degrees'
import { experiences } from '@/utils/experiences'
import { hobbies } from '@/utils/hobbies'
import { statusLabel } from '@/utils/status'

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-10 px-4 py-10 lg:max-w-7xl">
      <Section.Header className="space-y-4">
        <Image
          src="/avatar.jpeg"
          alt="Foto de perfil de Nathan"
          width={120}
          height={120}
          className="rounded-full border-4 border-sky-100 dark:border-sky-800"
        />
        <Section.Title className="text-sky-900 dark:text-sky-100">
          Sobre mim
        </Section.Title>

        <Section.Description className="text-sky-900/90 dark:text-sky-200/90">
          Olá! Sou Nathan Santos, desenvolvedor Full Stack apaixonado por
          tecnologia, inovação e desafios. Tenho experiência sólida em
          desenvolvimento web, sempre buscando criar soluções eficientes,
          performáticas e com ótimo design. Gosto de aprender coisas novas,
          compartilhar conhecimento e trabalhar em equipe para construir
          produtos incríveis.
        </Section.Description>
      </Section.Header>

      <Section.Content className="space-y-4">
        <div className="w-full space-y-4">
          <h2 className="border-l-4 border-sky-100 pl-2 text-xl font-bold text-sky-800 dark:border-sky-700 dark:text-sky-200">
            Formações
          </h2>
          <ul className="space-y-3">
            {degrees.map((degree) => (
              <li
                key={degree.title}
                className="border-l-4 border-sky-100 pl-4 dark:border-sky-700"
              >
                <div className="font-semibold text-sky-900 dark:text-sky-100">
                  {degree.title}
                </div>
                <div className="text-sm text-sky-800/80 dark:text-sky-200/80">
                  {degree.institution}
                </div>
                <div className="text-xs text-sky-700/60 dark:text-sky-300/60">
                  {degree.period}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full space-y-4">
          <h2 className="border-l-4 border-sky-100 pl-2 text-xl font-bold text-sky-800 dark:border-sky-700 dark:text-sky-200">
            Cursos & Certificações
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="space-y-2 rounded-lg border border-sky-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-sky-800 dark:bg-zinc-900"
              >
                <div className="font-semibold text-sky-900 dark:text-sky-100">
                  {cert.title}
                </div>
                <div className="text-sm text-sky-800/80 dark:text-sky-200/80">
                  {cert.institution}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-sky-700/80 dark:text-sky-300/80">
                    {cert.hours} horas
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      cert.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {statusLabel(cert.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full space-y-4">
          <h2 className="border-l-4 border-sky-100 pl-2 text-xl font-bold text-sky-800 dark:border-sky-700 dark:text-sky-200">
            Experiências Profissionais
          </h2>

          <div className="space-y-6">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="space-y-4 rounded-lg border border-sky-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-sky-800 dark:bg-zinc-900"
              >
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold text-sky-900 dark:text-sky-100">
                      {experience.position}
                    </h3>
                    <p className="text-base font-medium text-sky-800 dark:text-sky-200">
                      {experience.company}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                    {experience.period}
                  </span>
                </div>
                <p className="text-sm text-sky-800/80 dark:text-sky-300/80">
                  {experience.description}
                </p>
                <ul className="space-y-1">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm text-sky-700 dark:text-sky-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400 dark:bg-sky-500" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-12 space-y-0 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="border-l-4 border-sky-100 pl-2 text-xl font-bold text-sky-800 dark:border-sky-700 dark:text-sky-200">
              O que gosto de fazer para relaxar
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-base text-sky-900/80 dark:text-sky-200/80">
              {hobbies.map((hobby) => (
                <li key={hobby}>{hobby}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="border-l-4 border-sky-100 pl-2 text-xl font-bold text-sky-800 dark:border-sky-700 dark:text-sky-200">
              Mais sobre mim
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-base text-sky-900/90 dark:text-sky-200/90">
              <li>Sou curioso e adoro aprender coisas novas.</li>
              <li>
                Tenho facilidade para trabalhar em equipe e comunicar ideias.
              </li>
              <li>Busco sempre evoluir como pessoa e profissional.</li>
              <li>Gosto de desafios e de sair da zona de conforto.</li>
              <li>Estou sempre aberto a novas oportunidades e conexões!</li>
            </ul>
          </div>
        </div>
      </Section.Content>
    </div>
  )
}

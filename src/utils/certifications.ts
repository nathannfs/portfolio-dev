import type { Status } from '@/types/status'

export type Certificate = {
  title: string
  description?: string
  institution: string
  hours?: number
  status?: Status
}

export const certifications: Certificate[] = [
  {
    title: 'Formação C#',
    institution: 'Rocketseat',
    hours: 100,
    status: 'completed',
    description:
      'Formação completa em C# com foco em desenvolvimento backend e APIs.',
  },
  {
    title: 'Formação NodeJS',
    institution: 'Rocketseat',
    hours: 50,
    status: 'completed',
    description:
      'Desenvolvimento backend com Node.js, Express e banco de dados.',
  },
  {
    title: 'Desenvolvimento Web Full Stack',
    institution: 'ProgramadorBR',
    hours: 60,
    status: 'completed',
    description:
      'Curso completo de desenvolvimento web full stack com HTML, CSS, JavaScript e Node.js.',
  },
  {
    title: 'Lógica de Programação em Java',
    institution: 'Pós Descomplica',
    hours: 30,
    status: 'completed',
    description:
      'Fundamentos de lógica de programação utilizando Java como linguagem base.',
  },
  {
    title: 'Interface de Software',
    institution: 'Pós Descomplica',
    hours: 30,
    status: 'completed',
    description:
      'Design de interfaces de usuário e experiência do usuário (UX/UI).',
  },
  {
    title: 'Acessibilidade React',
    institution: 'Rocketseat',
    hours: 3,
    status: 'completed',
    description:
      'Implementação de acessibilidade em aplicações React seguindo padrões WCAG.',
  },
  {
    title: 'Navegação Expo Router',
    institution: 'Rocketseat',
    hours: 2,
    status: 'completed',
    description:
      'Sistema de navegação para aplicações React Native com Expo Router.',
  },
  {
    title: 'Clean Code',
    institution: 'Rocketseat',
    hours: 3,
    status: 'completed',
    description:
      'Práticas e princípios para escrever código limpo e manutenível.',
  },
  {
    title: 'Gerenciamento Avançado De Projetos',
    institution: 'Pós Descomplica',
    hours: 30,
    status: 'completed',
    description:
      'Metodologias e ferramentas para gerenciamento eficiente de projetos.',
  },
  {
    title: 'Formação ReactJS',
    institution: 'Rocketseat',
    hours: 50,
    status: 'completed',
    description:
      'Formação completa em React.js com hooks, context API e boas práticas.',
  },
]

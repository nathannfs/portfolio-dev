import type { Status } from '@/types/status'

export type Degree = {
  title: string
  description?: string
  institution: string
  period: string
  status?: Status
}

export const degrees: Degree[] = [
  {
    title: 'Pós Graduação em Engenharia de Software',
    institution: 'Descomplica EAD',
    period: 'Out/2024 - Abr/2025',
    status: 'completed',
    description:
      'Minha formação em Engenharia de Software me proporcionou uma base sólida em lógica, algoritmos e estrutura de dados, princípios que aplico diariamente no desenvolvimento de software.',
  },
  {
    title: 'Tecnólogo em Mecatrônica Industrial',
    institution: 'FATEC',
    period: 'Jan/2019 - Dez/2023',
    status: 'completed',
    description:
      'Minha formação em Mecatrônica me proporcionou uma base sólida em lógica, automação e resolução de problemas complexos, princípios que aplico diariamente no desenvolvimento de software.',
  },
]

type Experience = {
  id: string
  company: string
  position: string
  period: string
  description: string
  responsibilities: string[]
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'OMD do Brasil',
    position: 'Desenvolvedor Front-End',
    period: 'Mai 2025 - Atualmente',
    description:
      'Desenvolvimento de interfaces web modernas e responsivas usando Angular, com foco em acessibilidade e boas práticas.',
    responsibilities: [
      'Desenvolvimento de interfaces web modernas, responsivas e acessíveis usando Angular',
      'Construção de APIs RESTful e integração front-end/back-end com NestJS e Prisma',
      'Participação ativa em code reviews, manutenções e melhorias contínuas nas aplicações',
      'Garantia de compatibilidade cross-browser e entre dispositivos',
      'Aplicação de boas práticas como Clean Code e componentização',
    ],
  },
  {
    id: 'exp-2',
    company: 'Drivetech Soluções Tecnológicas',
    position: 'Analista de Inovação',
    period: 'Ago 2024 - Abr 2025',
    description:
      'Desenvolvimento full stack com foco em escalabilidade e usabilidade, participando de decisões técnicas de arquitetura.',
    responsibilities: [
      'Desenvolvimento de aplicações full stack (web e mobile), com foco em escalabilidade, usabilidade e integração com back-end',
      'Construção de APIs RESTful e modelagem de banco de dados',
      'Participação na análise de requisitos e decisões técnicas de arquitetura',
      'Uso de ferramentas modernas e metodologias ágeis para entregas eficientes',
    ],
  },
  {
    id: 'exp-3',
    company: 'Drivetech Soluções Tecnológicas',
    position: 'Desenhista Pleno',
    period: 'Out 2023 - Ago 2024',
    description:
      'Elaboração de diagramas elétricos e layouts mecânicos, com análise de especificações técnicas.',
    responsibilities: [
      'Elaboração de diagramas elétricos',
      'Elaboração de layout mecânico',
      'Análise de especificações técnicas do projeto',
    ],
  },
  {
    id: 'exp-4',
    company: 'Drivetech Soluções Tecnológicas',
    position: 'Trainee Engenharia de Projetos',
    period: 'Abr 2023 - Out 2023',
    description:
      'Desenvolvimento de habilidades em engenharia de projetos com foco em diagramas e especificações técnicas.',
    responsibilities: [
      'Elaboração de diagramas elétricos',
      'Elaboração de layout mecânico',
      'Análise de especificações técnicas do projeto',
    ],
  },
  {
    id: 'exp-5',
    company: 'Drivetech Soluções Tecnológicas',
    position: 'Trainee Engenharia de Aplicações',
    period: 'Jan 2023 - Abr 2023',
    description:
      'Desenvolvimento de planilhas e controle de informações técnicas para projetos.',
    responsibilities: [
      'Orçamento de projeto',
      'Desenvolvimento de planilhas para melhor controle de informações técnicas',
    ],
  },
  {
    id: 'exp-6',
    company: 'Drivetech Soluções Tecnológicas',
    position: 'Trainee Gestão de Projetos',
    period: 'Ago 2022 - Jan 2023',
    description: 'Gestão do ciclo do projeto e desenvolvimento de indicadores.',
    responsibilities: [
      'Gestão do ciclo do projeto',
      'Análise e desenvolvimento de indicadores',
    ],
  },
  {
    id: 'exp-7',
    company: 'Drivetech Soluções Tecnológicas',
    position: 'Estagiário de Qualidade',
    period: 'Mar 2022 - Ago 2022',
    description:
      'Inspeção de painéis elétricos e controle de documentos de inspeções.',
    responsibilities: [
      'Inspeção de painéis elétricos',
      'Controle de documentos de inspeções',
    ],
  },
]

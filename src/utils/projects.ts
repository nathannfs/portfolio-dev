type Project = {
  id: string
  name: string
  description: string
  image: string
  href: string
  techs: string[]
  year?: string
  completed?: boolean
  features: string[]
  challenges: string[]
  learnings: string[]
  screenshots: string[]
}

export const projects: Project[] = [
  {
    id: 'b1e2c3d4-5f6a-4b8c-9d0e-1f2a3b4c5d6e',
    name: 'To do List',
    description:
      'Desenvolvido para um teste técnico, o To do List Interview é uma lista de tarefas dinâmica com recursos de adicionar e remover tarefas.',
    image: '/projects/to-do-list-interview.png',
    href: 'https://to-do-list-test-ten.vercel.app/',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: [
      'Adicionar, remover e marcar tarefas como concluídas',
      'Persistência de dados no localStorage',
      'Interface responsiva e acessível',
      'Feedback visual para ações do usuário',
    ],
    challenges: [
      'Implementar drag-and-drop acessível',
      'Garantir performance com listas grandes',
    ],
    learnings: [
      'Gerenciamento de estado com React',
      'Boas práticas de UX para listas de tarefas',
    ],
    screenshots: ['/projects/to-do-list-interview.png'],
  },
  {
    id: 'a2b3c4d5-6e7f-4a9b-8c1d-2e3f4a5b6c7d',
    name: 'Spotify Clone',
    description: 'Clone do Spotify, desenvolvido em React.',
    image: '/projects/spotify-clone.png',
    href: 'https://nathannfs.github.io/spotify-clone',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: [
      'Reprodução de músicas (mock)',
      'Navegação entre playlists',
      'Interface inspirada no Spotify',
    ],
    challenges: [
      'Recriar layout fiel ao original',
      'Gerenciar estado de reprodução',
    ],
    learnings: ['Styled Components', 'Gerenciamento de rotas no React'],
    screenshots: ['/projects/spotify-clone.png'],
  },
  {
    id: 'c3d4e5f6-7a8b-4c0d-9e2f-3a4b5c6d7e8f',
    name: 'Ignite Timer',
    description:
      'Desenvolvido na trilha de React da Rocketseat, o Ignite Timer é uma aplicação de tempo que permite o usuário criar e gerenciar countdowns.',
    image: '/projects/ignite-timer.png',
    href: 'https://nathannfs.github.io/ignite-timer',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: [
      'Criar e gerenciar ciclos de contagem regressiva',
      'Histórico de ciclos',
      'Notificações visuais',
    ],
    challenges: ['Gerenciar múltiplos timers', 'Persistência de dados'],
    learnings: ['Context API', 'Hooks personalizados'],
    screenshots: ['/projects/ignite-timer.png'],
  },
  {
    id: 'd4e5f6a7-8b9c-4d1e-8f3a-4b5c6d7e8f9a',
    name: 'To do list',
    description:
      'Lista de tarefas dinâmica desenvolvida na formação de React da Rocketseat',
    image: '/projects/to-do-list.png',
    href: 'https://nathannfs.github.io/to-do-list',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: [
      'Adicionar e remover tarefas',
      'Marcar tarefas como concluídas',
      'Interface simples e intuitiva',
    ],
    challenges: ['Gerenciar estado de tarefas'],
    learnings: ['Componentização no React'],
    screenshots: ['/projects/to-do-list.png'],
  },
  {
    id: 'e5f6a7b8-9c0d-4e2f-8a4b-5c6d7e8f9a0b',
    name: 'Guess Number',
    description: 'Jogo de adivinha o número, desenvolvido em React.',
    image: '/projects/guess-number.png',
    href: 'https://nathannfs.github.io/guess-number',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: ['Gerar número aleatório', 'Feedback para tentativas'],
    challenges: ['Lógica de comparação de números'],
    learnings: ['Uso de useState e eventos'],
    screenshots: ['/projects/guess-number.png'],
  },
  {
    id: 'f6a7b8c9-0d1e-4f3a-8b5c-6d7e8f9a0b1c',
    name: 'Gerador de senha',
    description:
      'Gerador de senhas seguras e personalizáveis. O usuário pode escolher o tamanho da senha.',
    image: '/projects/gerador-senha.png',
    href: 'https://nathannfs.github.io/gerador-senha',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: ['Gerar senhas seguras', 'Personalização do tamanho da senha'],
    challenges: ['Gerar strings aleatórias seguras'],
    learnings: ['Manipulação de arrays e strings'],
    screenshots: ['/projects/gerador-senha.png'],
  },
  {
    id: 'a7b8c9d0-1e2f-4a4b-8c6d-7e8f9a0b1c2d',
    name: 'Jogo da velha',
    description: 'Jogo clássico da velha, desenvolvido em React.',
    image: '/projects/jogo-da-velha.png',
    href: 'https://nathannfs.github.io/jogo-da-velha',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: [
      'Jogo da velha para dois jogadores',
      'Detecção de vitória ou empate',
    ],
    challenges: ['Lógica de verificação de vitória'],
    learnings: ['Matriz bidimensional no React'],
    screenshots: ['/projects/jogo-da-velha.png'],
  },
  {
    id: 'b8c9d0e1-2f3a-4b5c-8d7e-8f9a0b1c2d3e',
    name: 'Jogo de memória',
    description: 'Jogo de memória desenvolvido em React.',
    image: '/projects/jogo-memoria.png',
    href: 'https://nathannfs.github.io/jogo-memoria',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: ['Jogo de memória com cartas', 'Contador de tentativas'],
    challenges: ['Gerenciar estado das cartas'],
    learnings: ['Animações e transições'],
    screenshots: ['/projects/jogo-memoria.png'],
  },
  {
    id: 'c9d0e1f2-3a4b-4c6d-8e8f-9a0b1c2d3e4f',
    name: 'Calculadora',
    description:
      'Calculadora desenvolvida em React, com recursos de cálculo de expressões matemáticas e conversão de unidades.',
    image: '/projects/calculadora.png',
    href: 'https://nathannfs.github.io/calculadora',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: ['Cálculo de expressões matemáticas', 'Conversão de unidades'],
    challenges: ['Parsing de expressões'],
    learnings: ['Avaliação dinâmica de strings'],
    screenshots: ['/projects/calculadora.png'],
  },
  {
    id: 'd0e1f2a3-4b5c-4d7e-8f9a-0b1c2d3e4f5a',
    name: 'Mega Sena',
    description: 'Aplicação para gerar apostas para a Mega Sena.',
    image: '/projects/mega-sena.png',
    href: 'https://nathannfs.github.io/mega-sena',
    techs: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    completed: true,
    features: ['Gerar apostas aleatórias para Mega Sena'],
    challenges: ['Garantir números únicos por aposta'],
    learnings: ['Funções matemáticas em JS'],
    screenshots: ['/projects/mega-sena.png'],
  },
]

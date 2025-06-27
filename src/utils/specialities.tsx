import { Layers, Rocket, Server } from 'lucide-react'

export const specialties = [
  {
    icon: <Layers className="size-8 text-primary" />,
    title: 'Desenvolvimento Web Completo',
    description:
      'Crio aplicações web robustas e escaláveis do zero, cuidando do front-end ao back-end para uma experiência de usuário coesa e performática.',
  },
  {
    icon: <Server className="size-8 text-primary" />,
    title: 'Criação de APIs RESTful',
    description:
      'Projeto e desenvolvo APIs seguras e eficientes com Node.js e NestJS, prontas para serem consumidas por diferentes tipos de clientes (web, mobile).',
  },
  {
    icon: <Rocket className="size-8 text-primary" />,
    title: 'Performance e Otimização',
    description:
      'Focado em entregar interfaces rápidas e responsivas, utilizando as melhores práticas de Next.js para garantir uma excelente performance e SEO.',
  },
]

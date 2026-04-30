import { Layers, Rocket, Server } from 'lucide-react'

export const specialties = [
  {
    icon: <Layers className="size-8 text-primary" />,
    title: 'Full-Stack Product Engineering',
    description:
      'I architect and ship complete SaaS products from database schema to polished UI, leveraging Next.js App Router, Server Actions, and edge-first deployment strategies.',
  },
  {
    icon: <Server className="size-8 text-primary" />,
    title: 'API Design & Backend Architecture',
    description:
      'Engineered scalable REST and GraphQL APIs with Node.js, NestJS, and Hono. Deep experience with Supabase real-time, Row-Level Security, and multi-tenant data isolation.',
  },
  {
    icon: <Rocket className="size-8 text-primary" />,
    title: 'Performance & DX Optimization',
    description:
      'Spearheaded performance-first frontends using React Server Components, Turbopack, and code-splitting patterns. Reduced build times and TTI through cutting-edge tooling.',
  },
]

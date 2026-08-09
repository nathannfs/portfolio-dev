import { Layers, Rocket, Server } from "lucide-react"

export const specialties = [
  {
    icon: <Layers className="size-8 text-primary" />,
    title: "Full-Stack Product Engineering",
    description:
      "I build and ship complete SaaS products, from the database schema to the UI, using the Next.js App Router, Server Actions, and containerized deploys.",
  },
  {
    icon: <Server className="size-8 text-primary" />,
    title: "API Design & Backend Architecture",
    description:
      "Built REST APIs with Node.js, NestJS, and Hono. I isolate tenants with Row Level Security in Postgres, applied per request, instead of trusting every query to remember the filter.",
  },
  {
    icon: <Rocket className="size-8 text-primary" />,
    title: "Performance & DX Optimization",
    description:
      "Built performance-first frontends with React Server Components, Turbopack, and code-splitting. I profile before optimizing, so the work goes where the time is actually spent.",
  },
]

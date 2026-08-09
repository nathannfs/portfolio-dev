import type { ReactNode } from "react"

import { Biome } from "@/components/icons/biome"
import { Docker } from "@/components/icons/docker"
import { Drizzle } from "@/components/icons/drizzle"
import { Git } from "@/components/icons/git"
import { Nestjs } from "@/components/icons/nest"
import { Nextjs } from "@/components/icons/nextjs"
import { Nodejs } from "@/components/icons/node"
import { Playwright } from "@/components/icons/playwright"
import { PostgreSQL } from "@/components/icons/postgresql"
import { React } from "@/components/icons/react"
import { Redis } from "@/components/icons/redis"
import { Tailwindcss } from "@/components/icons/tailwindcss"
import { TanStackQuery } from "@/components/icons/tanstack"
import { Typescript } from "@/components/icons/typescript"

export interface TechItem {
  icon: ReactNode
  name: string
  /** Highest-proficiency, day-to-day tools — visually emphasized. */
  featured?: boolean
}

export interface TechGroup {
  category: string
  items: TechItem[]
}

export const techGroups: TechGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: <Nextjs />, featured: true },
      { name: "React", icon: <React />, featured: true },
      { name: "TypeScript", icon: <Typescript />, featured: true },
      { name: "Tailwind CSS", icon: <Tailwindcss /> },
      { name: "TanStack Query", icon: <TanStackQuery /> },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "NestJS", icon: <Nestjs />, featured: true },
      { name: "Node.js", icon: <Nodejs /> },
      { name: "PostgreSQL", icon: <PostgreSQL />, featured: true },
      { name: "Drizzle ORM", icon: <Drizzle /> },
      { name: "Redis", icon: <Redis /> },
    ],
  },
  {
    category: "Infra & Tooling",
    items: [
      { name: "Docker", icon: <Docker />, featured: true },
      { name: "Git", icon: <Git /> },
      { name: "Playwright", icon: <Playwright /> },
      { name: "Biome", icon: <Biome /> },
    ],
  },
]

/** Flat list (derived) — used by the hero marquee carousel. */
export const techs: TechItem[] = techGroups.flatMap((group) => group.items)

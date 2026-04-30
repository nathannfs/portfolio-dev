import {
  Globe,
  ShieldCheck,
  TestTube
} from 'lucide-react'
import type { ReactNode } from 'react'

import { Angular } from '@/components/icons/angular'
import { Biome } from '@/components/icons/biome'
import { Css3 } from '@/components/icons/css'
import { Docker } from '@/components/icons/docker'
import { Drizzle } from '@/components/icons/drizzle'
import { ECharts } from '@/components/icons/echarts'
import { Expo } from '@/components/icons/expo'
import { Figma } from '@/components/icons/figma'
import { Git } from '@/components/icons/git'
import { Github } from '@/components/icons/github'
import { Hono } from '@/components/icons/hono'
import { Html5 } from '@/components/icons/html'
import { Javascript } from '@/components/icons/javascript'
import { MQTT } from '@/components/icons/mqtt'
import { Nestjs } from '@/components/icons/nest'
import { Nextjs } from '@/components/icons/nextjs'
import { Nodejs } from '@/components/icons/node'
import { Playwright } from '@/components/icons/playwright'
import { PostgreSQL } from '@/components/icons/postgresql'
import { Prisma } from '@/components/icons/prisma'
import { Puppeteer } from '@/components/icons/puppeteer'
import { RadixUI } from '@/components/icons/radixui'
import { React } from '@/components/icons/react'
import { ReactNative } from '@/components/icons/react-native'
import { Redis } from '@/components/icons/redis'
import { Shopify } from '@/components/icons/shopify'
import { Stripe } from '@/components/icons/stripe'
import { Supabase } from '@/components/icons/supabase'
import { Tailwindcss } from '@/components/icons/tailwindcss'
import { TanStackQuery } from '@/components/icons/tanstack'
import { Typescript } from '@/components/icons/typescript'

interface TechsProps {
  name: string
  icon: ReactNode
}

export const techs: TechsProps[] = [
  // ─── Frontend Core ───
  { name: 'React', icon: <React /> },
  { name: 'Next.js', icon: <Nextjs /> },
  { name: 'TypeScript', icon: <Typescript /> },
  { name: 'Tailwind CSS', icon: <Tailwindcss /> },
  { name: 'JavaScript', icon: <Javascript /> },
  { name: 'HTML5', icon: <Html5 /> },
  { name: 'CSS3', icon: <Css3 /> },
  { name: 'Angular', icon: <Angular /> },

  // ─── Frontend Ecosystem ───
  { name: 'TanStack Query', icon: <TanStackQuery /> },
  { name: 'Radix UI', icon: <RadixUI /> },
  { name: 'next-intl', icon: <Globe className="size-5" /> },

  // ─── Backend & APIs ───
  { name: 'Node.js', icon: <Nodejs /> },
  { name: 'NestJS', icon: <Nestjs /> },
  { name: 'Hono', icon: <Hono /> },
  { name: 'MQTT', icon: <MQTT /> },

  // ─── Database & ORM ───
  { name: 'PostgreSQL', icon: <PostgreSQL /> },
  { name: 'Redis', icon: <Redis /> },
  { name: 'Supabase', icon: <Supabase /> },
  { name: 'Prisma ORM', icon: <Prisma /> },
  { name: 'Drizzle ORM', icon: <Drizzle /> },

  // ─── DevOps & Infrastructure ───
  { name: 'Docker', icon: <Docker /> },

  // ─── Data Visualization ───
  { name: 'ECharts', icon: <ECharts /> },

  // ─── Authentication & Integrations ───
  { name: 'Better-auth', icon: <ShieldCheck className="size-5" /> },
  { name: 'Stripe', icon: <Stripe /> },
  { name: 'Shopify API', icon: <Shopify /> },

  // ─── Mobile ───
  { name: 'React Native', icon: <ReactNative /> },
  { name: 'Expo', icon: <Expo /> },

  // ─── Testing & Tooling ───
  { name: 'Playwright', icon: <Playwright /> },
  { name: 'Puppeteer', icon: <Puppeteer /> },
  { name: 'Biome', icon: <Biome /> },
  { name: 'Git', icon: <Git /> },
  { name: 'GitHub', icon: <Github /> },
  { name: 'Figma', icon: <Figma /> },
]

'use client'

import { useRef } from 'react'

import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Hero } from '@/components/sections/hero'
import { Project } from '@/components/sections/project'
import { Specialties } from '@/components/sections/specialties'
import { TechStack } from '@/components/sections/tech-stack'
import { Separator } from '@/components/separator'

export default function Home() {
  const containerRef = useRef(null)

  return (
    <main
      ref={containerRef}
      className="min-h-full overflow-y-auto transition-all ease-in-out md:h-[calc(100vh-80px)] md:snap-y md:snap-mandatory md:overflow-y-scroll"
    >
      <Hero />

      <Separator />

      <About />

      <Separator />

      <Specialties />

      <Separator />

      <Project />

      <Separator />

      <TechStack />

      <Separator />

      <Contact />
    </main>
  )
}

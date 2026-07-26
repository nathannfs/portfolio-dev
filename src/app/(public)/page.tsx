"use client"

import { Reveal } from "@/components/motion"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Project } from "@/components/sections/project"
import { Specialties } from "@/components/sections/specialties"
import { TechStack } from "@/components/sections/tech-stack"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <Project />

      <Reveal>
        <About />
      </Reveal>

      <Reveal>
        <Specialties />
      </Reveal>

      <Reveal>
        <TechStack />
      </Reveal>

      <Reveal>
        <Contact />
      </Reveal>
    </div>
  )
}

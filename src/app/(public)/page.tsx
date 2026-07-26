"use client"

import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Project } from "@/components/sections/project"
import { Specialties } from "@/components/sections/specialties"
import { TechStack } from "@/components/sections/tech-stack"
import { Separator } from "@/components/separator"

export default function Home() {
  return (
    <div className="flex flex-col">
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
    </div>
  )
}

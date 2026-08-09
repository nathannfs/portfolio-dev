import { Reveal } from "@/components/motion"
import { About } from "@/components/sections/about"
import { AiWorkflow } from "@/components/sections/ai-workflow"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Project } from "@/components/sections/project"
import { Specialties } from "@/components/sections/specialties"
import { TechStack } from "@/components/sections/tech-stack"
import { getCertifications, getDegrees, getProjects } from "@/server/content"

export default async function Home() {
  const [projects, certificates, degrees] = await Promise.all([
    getProjects(),
    getCertifications(),
    getDegrees(),
  ])

  return (
    <div className="flex flex-col">
      <Hero />

      <Project initialProjects={projects} />

      <Reveal>
        <About initialCertificates={certificates} initialDegrees={degrees} />
      </Reveal>

      <Reveal>
        <Specialties />
      </Reveal>

      <Reveal>
        <AiWorkflow />
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

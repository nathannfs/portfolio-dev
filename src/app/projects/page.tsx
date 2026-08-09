import type { Metadata } from "next"

import { getProjects } from "@/server/content"

import { ProjectsView } from "./projects-view"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack products I built and shipped, from multi-tenant SaaS platforms to internal tooling.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return <ProjectsView initialProjects={projects} />
}

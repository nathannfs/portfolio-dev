import { localizedMetadata } from "@/lib/page-metadata"
import { getProjects } from "@/server/content"

import { ProjectsView } from "./projects-view"

export function generateMetadata() {
  return localizedMetadata({
    title: { en: "Projects", "pt-BR": "Projetos" },
    description: {
      en: "Full-stack products I built and shipped, from multi-tenant SaaS platforms to internal tooling.",
      "pt-BR":
        "Produtos full-stack que construí e coloquei em produção, de plataformas SaaS multi-tenant a ferramentas internas.",
    },
  })
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return <ProjectsView initialProjects={projects} />
}

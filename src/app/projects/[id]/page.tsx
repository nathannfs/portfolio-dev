import { notFound } from "next/navigation"

import { getProjects } from "@/http/projects/get-projects"

import { ProjectDetailView } from "./project-detail-view"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const projects = await getProjects()

  const project = projects.find((p) => p.id === id)

  if (!project) {
    return notFound()
  }

  return <ProjectDetailView project={project} />
}

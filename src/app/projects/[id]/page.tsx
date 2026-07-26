import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProjects } from "@/http/projects/get-projects"

import { ProjectDetailView } from "./project-detail-view"

async function findProject(id: string) {
  try {
    const projects = await getProjects()
    return projects.find((p) => p.id === id) ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await findProject(id)

  if (!project) {
    return { title: "Project not found | Nathan Santos" }
  }

  const title = `${project.name} | Nathan Santos`
  const description = project.description.slice(0, 160)
  const url = `/projects/${id}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await findProject(id)

  if (!project) {
    return notFound()
  }

  return <ProjectDetailView project={project} />
}

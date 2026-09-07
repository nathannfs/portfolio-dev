import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProjectById, getProjects } from "@/server/content"

import { ProjectDetailView } from "./project-detail-view"

/** Pre-renders every project at build time and keeps them static until revalidated. */
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ id: project.id }))
}

async function findProject(id: string) {
  try {
    return await getProjectById(id)
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
    return { title: "Project not found" }
  }

  // A aba recebe só o nome: o `template` do layout raiz é quem acrescenta
  // " | Nathan Ferreira Santos". As redes sociais não têm template nenhum, então
  // o título social carrega o nome completo.
  const socialTitle = `${project.name} | Nathan Ferreira Santos`
  const description = project.description.slice(0, 160)
  const url = `/projects/${id}`

  return {
    title: project.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
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

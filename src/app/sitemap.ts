import type { MetadataRoute } from "next"

import { getProjects } from "@/server/content"

const BASE_URL = "https://www.nathannfs.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ]

  try {
    const projects = await getProjects()
    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))
    return [...staticRoutes, ...projectRoutes]
  } catch {
    // Database unreachable at build time, ship the static routes only.
    return staticRoutes
  }
}

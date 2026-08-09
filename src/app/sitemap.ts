import type { MetadataRoute } from "next"

import { getProjects } from "@/server/content"

const BASE_URL = "https://www.nathannfs.com"

/** English lives at the root, Portuguese under /pt. See src/middleware.ts. */
function entry(
  path: string,
  changeFrequency: "weekly" | "monthly",
  priority: number
) {
  const pt = path === "/" ? "/pt" : `/pt${path}`
  return {
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${BASE_URL}${path}`,
        "pt-BR": `${BASE_URL}${pt}`,
      },
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", "monthly", 1),
    entry("/projects", "weekly", 0.9),
    entry("/about", "monthly", 0.8),
  ]

  try {
    const projects = await getProjects()
    return [
      ...staticRoutes,
      ...projects.map((project) =>
        entry(`/projects/${project.id}`, "monthly", 0.7)
      ),
    ]
  } catch {
    // Database unreachable at build time, ship the static routes only.
    return staticRoutes
  }
}

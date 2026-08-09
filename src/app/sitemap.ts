import type { MetadataRoute } from "next"

import { getProjects } from "@/server/content"

const BASE_URL = "https://www.nathannfs.com"

/** English lives at the root, Portuguese under /pt. See src/middleware.ts. */
function ptPath(path: string) {
  return path === "/" ? "/pt" : `/pt${path}`
}

/**
 * Google expects every language version to be its own <url> entry, each
 * listing the complete set of alternates including itself. Listing only the
 * English URLs would leave the Portuguese ones out of the language group.
 */
function pair(
  path: string,
  changeFrequency: "weekly" | "monthly",
  priority: number
): MetadataRoute.Sitemap {
  const languages = {
    en: `${BASE_URL}${path}`,
    "pt-BR": `${BASE_URL}${ptPath(path)}`,
    "x-default": `${BASE_URL}${path}`,
  }
  const lastModified = new Date()

  return [
    { url: languages.en, lastModified, changeFrequency, priority, alternates: { languages } },
    {
      url: languages["pt-BR"],
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    ...pair("/", "monthly", 1),
    ...pair("/projects", "weekly", 0.9),
    ...pair("/about", "monthly", 0.8),
  ]

  try {
    const projects = await getProjects()
    return [
      ...staticRoutes,
      ...projects.flatMap((project) =>
        pair(`/projects/${project.id}`, "monthly", 0.7)
      ),
    ]
  } catch {
    // Database unreachable at build time, ship the static routes only.
    return staticRoutes
  }
}

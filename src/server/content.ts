import { asc } from "drizzle-orm"
import { cache } from "react"

import {
  aboutMe,
  certifications,
  degrees,
  experiences,
  hobbies,
  projects,
} from "@/db/schema"
import { db } from "@/lib/db"
import type { AboutMe } from "@/types/about-me"
import type { Certificate } from "@/types/certificate"
import type { Degree } from "@/types/degree"
import type { Experience } from "@/types/experiences"
import type { Hobby } from "@/types/hobby"
import type { Project } from "@/types/project"

/**
 * Server-side reads for the public pages.
 *
 * The API routes under /api exist for the admin area, which mutates from the
 * browser. Public pages do not go through them: a Server Component calling its
 * own HTTP API is a round trip over the network to reach the same process, and
 * it leaves the rendered HTML empty for crawlers. These read straight from the
 * database instead.
 *
 * `cache` dedupes repeated calls within a single request, so a page and its
 * `generateMetadata` share one query.
 */

/** Dates cross to the client as JSON strings, matching what /api returns. */
function serialize<T extends { createdAt?: Date | null }>(row: T) {
  return {
    ...row,
    createdAt: row.createdAt?.toISOString(),
  }
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = await db.select().from(projects).orderBy(asc(projects.createdAt))
  return rows.map(serialize) as Project[]
})

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const rows = await db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.createdAt))
  return rows.map(serialize) as Experience[]
})

export const getDegrees = cache(async (): Promise<Degree[]> => {
  const rows = await db.select().from(degrees).orderBy(asc(degrees.createdAt))
  return rows.map(serialize) as Degree[]
})

export const getCertifications = cache(async (): Promise<Certificate[]> => {
  const rows = await db
    .select()
    .from(certifications)
    .orderBy(asc(certifications.createdAt))
  return rows.map(serialize) as Certificate[]
})

export const getAboutMe = cache(async (): Promise<AboutMe[]> => {
  const rows = await db.select().from(aboutMe).orderBy(asc(aboutMe.createdAt))
  return rows.map(serialize) as AboutMe[]
})

export const getHobbies = cache(async (): Promise<Hobby[]> => {
  const rows = await db.select().from(hobbies).orderBy(asc(hobbies.createdAt))
  return rows.map(serialize) as Hobby[]
})

export const getProjectById = cache(async (id: string) => {
  const all = await getProjects()
  return all.find((project) => project.id === id) ?? null
})

import "dotenv/config"

import { writeFileSync } from "node:fs"

import { db } from "@/db"
import {
  aboutMe,
  certifications,
  degrees,
  experiences,
  projects,
} from "@/db/schema"

async function main() {
  const dump = {
    projects: await db
      .select({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        features: projects.features,
        challenges: projects.challenges,
        learnings: projects.learnings,
      })
      .from(projects),
    experiences: await db
      .select({
        id: experiences.id,
        company: experiences.company,
        position: experiences.position,
        description: experiences.description,
        responsibilities: experiences.responsibilities,
      })
      .from(experiences),
    aboutMe: await db
      .select({ id: aboutMe.id, content: aboutMe.content })
      .from(aboutMe),
    degrees: await db
      .select({ id: degrees.id, title: degrees.title, description: degrees.description })
      .from(degrees),
    certifications: await db
      .select({
        id: certifications.id,
        title: certifications.title,
        description: certifications.description,
      })
      .from(certifications),
  }

  const out =
    "./tmp/db-content.json"
  writeFileSync(out, JSON.stringify(dump, null, 2))
  console.log(`wrote ${out}`)
  console.log(
    `projects=${dump.projects.length} experiences=${dump.experiences.length} aboutMe=${dump.aboutMe.length} degrees=${dump.degrees.length} certs=${dump.certifications.length}`
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

import { getExperiences, getProjects } from "@/server/content"

const BASE_URL = "https://www.nathannfs.com"

/**
 * Generated from the database instead of kept as a static file.
 *
 * The previous static version drifted badly: it still described a role I no
 * longer use and listed three projects that were never in the portfolio.
 * This is the file AI search engines read, so a stale copy is worse than none.
 */
export const dynamic = "force-dynamic"

export async function GET() {
  const [projects, experiences] = await Promise.all([
    getProjects(),
    getExperiences(),
  ])

  const current = experiences.at(0)

  const body = `# Nathan Ferreira Santos

> Full-stack software engineer. TypeScript end to end: NestJS and Node on the API, Next.js and React on the interface, PostgreSQL underneath. Based in Sertãozinho, SP, Brazil, open to remote work.

## About

Nathan Ferreira Santos builds multi-tenant SaaS in the TypeScript ecosystem, usually starting from the data model. Most of his work sits on the backend: access control enforced by the database through Row Level Security, invariants the schema guarantees on its own, and versioned migrations.

${current ? `Currently ${current.position} at ${current.company} (${current.period}), working on two SaaS platforms: an agricultural management system, where he wrote the backend, and a fleet telemetry platform, which he started.` : ""}

Before writing software he spent two years in electrical and mechatronic engineering in industry, which is where his work with telemetry and MQTT comes from.

## Pages

- [Home](${BASE_URL}/): Overview, selected work, how he works with AI, and tech stack.
- [About](${BASE_URL}/about): Experience, education and certifications.
- [Projects](${BASE_URL}/projects): Every shipped project, with the decisions behind each one.

Portuguese versions live under ${BASE_URL}/pt.

## Projects

${projects
  .map(
    (project) =>
      `- ${project.name}${project.year ? ` (${project.year})` : ""}: ${project.description} Stack: ${(project.techs ?? []).join(", ")}.`
  )
  .join("\n")}

## Contact

- Email: nathann.santoss2@gmail.com
- GitHub: https://github.com/nathannfs
- LinkedIn: https://linkedin.com/in/nathannfs
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}

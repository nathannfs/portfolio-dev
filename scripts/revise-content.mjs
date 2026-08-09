import "dotenv/config"

import { writeFileSync } from "node:fs"

import pg from "pg"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const q = (sql, params = []) => pool.query(sql, params).then((r) => r.rows)

const TABLES = [
  "about_me",
  "projects",
  "experiences",
  "degrees",
  "certifications",
  "hobbies",
]

async function snapshot() {
  const out = {}
  for (const table of TABLES) {
    out[table] = await q(`select * from ${table} order by created_at`)
  }
  return out
}

const PROJECTS_TO_DROP = [
  "Checkout Hub",
  "Finance-AI",
  "Travel Hub",
  "Agendar-j",
]

const PROJECTS = [
  {
    name: "OMD Farm",
    description:
      "Agricultural management SaaS I work on at OMD do Brasil. I wrote the backend from the ground up in NestJS, Prisma and PostgreSQL, with a layered architecture of domain, use cases and repositories that the team adopted as its standard. I also containerized the application and wrote the deploy pipeline, which is what let us move the platform off Google App Engine.",
    techs: [
      "NestJS",
      "Prisma ORM",
      "PostgreSQL",
      "Angular",
      "Docker",
      "GitHub Actions",
      "MQTT",
      "Redis",
      "TypeScript",
    ],
    year: "2025",
    completed: true,
    features: [
      "Layered backend in NestJS: domain, use cases and repositories",
      "Session auth, tenant context resolution and RBAC through middleware",
      "Device data ingestion over MQTT, feeding live tracking and notifications",
      "Interactive map with the Google Maps API, route history and live data",
      "Docker Compose for production, development and database, with deploy on GitHub Actions",
    ],
    challenges: [
      "Holding response times steady on the highest-volume routes as the dataset grew",
      "Containerizing an application that had been deployed straight to Google App Engine",
      "Getting a team of eight to adopt a new architecture without stalling delivery",
    ],
    learnings: [
      "How MQTT ingestion behaves once device volume stops being a demo",
      "Where Redis caching pays off, and where it only hides a bad query",
      "That an architecture becomes the standard only if the team can follow it without me",
    ],
  },
  {
    name: "OMD Eco Control",
    description:
      "Fleet telemetry platform at OMD do Brasil. I started the project and wrote its initial structure: the monorepo, the data model, the multi-tenant isolation and the geospatial layer. Six developers work on it today.",
    techs: [
      "NestJS",
      "Drizzle ORM",
      "PostgreSQL",
      "PostGIS",
      "Better Auth",
      "CASL",
      "Turborepo",
      "Next.js",
      "TypeScript",
    ],
    year: "2026",
    completed: false,
    features: [
      "Turborepo monorepo with four applications and eight shared packages",
      "Multi-tenant isolation with Row Level Security, applied per request",
      "Policy-based authorization with CASL, permission groups and session management",
      "Geospatial data in PostGIS: fleet, points of interest and routes, with RLS per tenant and per team",
      "Google Maps foundation with canvas, overlays and drawing tools",
    ],
    challenges: [
      "Making Row Level Security hold per request, so no query has to remember the tenant on its own",
      "Splitting telemetry and video telemetry into separate services without duplicating the contracts",
      "Setting the frontend defaults early enough that six people would build on the same ones",
    ],
    learnings: [
      "That access control in the database survives mistakes the application layer does not",
      "How PostGIS changes the shape of a schema once routes and areas become first-class",
      "Where a monorepo pays off, and where it only moves the coupling somewhere else",
    ],
  },
  {
    name: "Multi-tenant scheduling platform",
    description:
      "A booking SaaS I built on my own, around 13 thousand lines. Clients book through a widget embedded in the business's own site, the owner runs everything from a panel, and each tenant's data is isolated by Row Level Security.",
    techs: [
      "Next.js",
      "Drizzle ORM",
      "PostgreSQL",
      "Docker",
      "Vitest",
      "Playwright",
      "TypeScript",
    ],
    year: "2026",
    completed: true,
    features: [
      "Row Level Security with 16 policies across 29 tables",
      "Booking widget that embeds into third-party sites",
      "Owner panel with week view, pending requests, blocks and services",
      "Runs on a VPS with Docker Compose, reverse proxy and a daily backup routine",
      "Business rules and access policies covered by tests",
    ],
    challenges: [
      "Stopping double bookings for good, which ended up as an exclusion constraint in Postgres instead of a check in the code",
      "Keeping the availability calculation in one place, shared by the widget, the panel and the API",
      "Moving the whole thing off a managed platform without rewriting the business rules",
    ],
    learnings: [
      "That an invariant the database can enforce should not live in application code",
      "How much a versioned migration file is worth on the day you change platforms",
      "Testing what breaks expensively, business rules and access policies, instead of chasing coverage",
    ],
  },
  {
    name: "Curriculum SaaS",
    description:
      "A resume builder that generates PDFs, with billing in three currencies and routing between Stripe and PIX depending on the country. Interface and content are available in English and Portuguese through next-intl.",
    techs: [
      "Next.js",
      "PostgreSQL",
      "Drizzle ORM",
      "Stripe",
      "next-intl",
      "TypeScript",
    ],
    year: "2025",
    completed: true,
    features: [
      "PDF generation from HTML templates",
      "Billing in three currencies, routing between Stripe and PIX by country",
      "English and Portuguese through next-intl, with the locale in the URL",
      "Subscription lifecycle handling: trials, upgrades and cancellations",
    ],
    challenges: [
      "Getting PDF output to match the template exactly across different content lengths",
      "Choosing between currency by IP and locale by URL without blinding the crawler",
      "Handling payment providers with different constraints: Stripe bills inline, the PIX provider requires a catalogue",
    ],
    learnings: [
      "That currency can follow the visitor, but language has to follow the URL",
      "How the Stripe subscription lifecycle behaves outside the happy path",
      "Where PDF generation gets expensive, and what to cache",
    ],
  },
  {
    name: "SaaS Templates",
    description:
      "An opinionated starting point for SaaS products, with Hono, Drizzle ORM, Better Auth and Biome. I use it as the base for my own projects, which is also where its rules get tested and, when they do not survive, dropped on purpose.",
    techs: ["Hono", "Drizzle ORM", "Better Auth", "Biome", "TypeScript"],
    year: "2026",
    completed: true,
    features: [
      "Auth wired up with Better Auth: email, OAuth and magic links",
      "Type-safe data layer with Drizzle ORM and versioned migrations",
      "Biome for linting and formatting, in place of ESLint and Prettier",
      "Docker Compose setup that matches what runs in production",
    ],
    challenges: [
      "Designing a structure flexible enough for different kinds of SaaS without turning into a framework",
      "Deciding which template rules are worth breaking on a real project, and writing down why",
      "Moving from Auth.js to Better Auth without losing type safety",
    ],
    learnings: [
      "That a template earns its rules only after a real project breaks a few of them",
      "Hono as a lightweight API layer next to Next.js",
      "Drizzle patterns for type-safe queries without giving up raw SQL where it reads better",
    ],
  },
]

const DRIVETECH = "Drivetech Soluções Tecnológicas"

const EXPERIENCES = [
  {
    company: "OMD do Brasil",
    position: "Full-Stack Software Engineer",
    period: "May 2025 — Present",
    description:
      "I work on two SaaS platforms: an agricultural management system, where I wrote the backend, and a fleet telemetry platform, which I started.",
    responsibilities: [
      "Wrote the backend of the agricultural platform in NestJS, Prisma and PostgreSQL, with a layered architecture the team adopted",
      "Started the telemetry platform: monorepo, data model, multi-tenant isolation with Row Level Security and geospatial data in PostGIS",
      "Containerized the applications with Docker Compose and wrote the deploy pipeline on GitHub Actions",
      "Built device data ingestion over MQTT for live tracking and notifications",
      "Implemented session auth, tenant context and RBAC through middleware",
    ],
  },
  {
    company: DRIVETECH,
    position: "Innovation Analyst",
    period: "Aug 2024 — Apr 2025",
    description:
      "Full-stack development across web and mobile, and a part in the technical architecture decisions.",
    responsibilities: [
      "Built web apps in Next.js and TypeScript, and mobile apps in React Native",
      "Built REST APIs in Node.js with Fastify, Prisma and PostgreSQL, containerized with Docker",
      "Refactored a corporate portal to server-side rendering, which cut its load time",
      "Took part in requirements analysis, data modelling and architecture decisions",
    ],
  },
  {
    company: DRIVETECH,
    position: "Project Engineering and Quality",
    period: "Mar 2022 — Aug 2024",
    description:
      "From intern to mid-level draftsman in electrical and mechatronic engineering. It is where the industrial background behind my telemetry work comes from.",
    responsibilities: [
      "Drafted electrical diagrams and mechanical layouts",
      "Reviewed and validated technical project specifications",
      "Managed project lifecycle and tracked delivery through KPIs",
      "Inspected electrical panels and kept inspection documentation in order",
    ],
  },
]

const CERTIFICATIONS_TO_KEEP = [
  "Node.js Path",
  "React.js Path",
  "Full Stack Web Development",
]

const ABOUT_ME = `I build full-stack SaaS in the TypeScript ecosystem, usually from the data model up. Most of what I enjoy sits on the backend: access control that lives in the database instead of scattered across queries, invariants the schema can enforce on its own, and migrations you can actually replay.

Before I wrote software I spent two years in electrical and mechatronic engineering in industry. It taught me to distrust systems that only work when everyone remembers the right step, which is more or less how I approach code now.

Right now I'm at OMD do Brasil, working on an agricultural SaaS and a fleet telemetry platform, and building my own products on the side.`

async function main() {
  const before = await snapshot()
  const backupPath = new URL(
    `../.content-backup-${before.projects.length}p.json`,
    import.meta.url
  ).pathname
  writeFileSync(backupPath, JSON.stringify(before, null, 2))
  console.log(`backup: ${backupPath}\n`)

  // ---------- projects ----------
  for (const name of PROJECTS_TO_DROP) {
    const r = await q("delete from projects where name = $1 returning name", [
      name,
    ])
    if (r.length) {
      console.log(`REMOVIDO projeto: ${name}`)
    }
  }

  for (const p of PROJECTS) {
    const existing = await q(
      "select id from projects where name = $1 or name = $2",
      [p.name, `${p.name} ERP`]
    )
    if (existing.length) {
      await q(
        `update projects set name=$1, description=$2, techs=$3, year=$4,
         completed=$5, features=$6, challenges=$7, learnings=$8 where id=$9`,
        [
          p.name,
          p.description,
          p.techs,
          p.year,
          p.completed,
          p.features,
          p.challenges,
          p.learnings,
          existing[0].id,
        ]
      )
      console.log(`ATUALIZADO projeto: ${p.name}`)
    } else {
      await q(
        `insert into projects (name, description, techs, year, completed, features, challenges, learnings)
         values ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          p.name,
          p.description,
          p.techs,
          p.year,
          p.completed,
          p.features,
          p.challenges,
          p.learnings,
        ]
      )
      console.log(`ADICIONADO projeto: ${p.name}`)
    }
  }

  // ---------- experiences ----------
  await q("delete from experiences")
  for (const e of EXPERIENCES) {
    await q(
      `insert into experiences (company, position, period, description, responsibilities)
       values ($1,$2,$3,$4,$5)`,
      [e.company, e.position, e.period, e.description, e.responsibilities]
    )
    console.log(`EXPERIENCIA: ${e.company} — ${e.position}`)
  }

  // ---------- certifications ----------
  const dropped = await q(
    `delete from certifications where title <> all($1::text[]) returning title`,
    [CERTIFICATIONS_TO_KEEP]
  )
  for (const c of dropped) {
    console.log(`REMOVIDA certificacao: ${c.title}`)
  }

  // ---------- hobbies ----------
  const h = await q("delete from hobbies returning title")
  for (const x of h) {
    console.log(`REMOVIDO hobby: ${x.title}`)
  }

  // ---------- about ----------
  await q("update about_me set content = $1, updated_at = now()", [ABOUT_ME])
  console.log("ATUALIZADO: about me")

  const after = await snapshot()
  console.log("\n===== CONTAGEM =====")
  for (const t of TABLES) {
    console.log(
      `  ${t.padEnd(16)} ${String(before[t].length).padStart(2)} -> ${String(after[t].length).padStart(2)}`
    )
  }

  await pool.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

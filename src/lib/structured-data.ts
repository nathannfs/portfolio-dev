const SITE_URL = "https://www.nathannfs.com"

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * Featured projects mirrored from the "Featured Work" section (first 4 of the
 * projects dataset). Kept here so the structured data is server-rendered and
 * crawlable — the on-page list is fetched client-side.
 */
const featuredProjects = [
  {
    name: "OMD Farm ERP",
    description:
      "Enterprise-grade ERP platform spanning inventory, financial controls, production tracking, and supply chain. NestJS + Prisma backend with an Angular frontend, using MQTT and Redis for real-time sensor data.",
    keywords: ["Angular", "NestJS", "PostgreSQL", "Prisma", "Docker", "MQTT", "Redis"],
  },
  {
    name: "Precifica Agora",
    description:
      "Marketplace-intelligence SaaS with an automated pricing engine integrated with the Mercado Livre API. It handles real-time tax and tariff calculation, margin analysis, and inventory cost optimization. Built with Next.js, Supabase, and TanStack Query.",
    keywords: ["Next.js", "Supabase", "React", "TanStack Query", "Tailwind CSS"],
  },
  {
    name: "Inventory Predictor",
    description:
      "Multi-tenant inventory-forecasting SaaS with Shopify OAuth integration, a Reorder Point engine, and Stripe billing that lets businesses predict stock needs and automate purchase orders.",
    keywords: ["Next.js", "Shopify API", "Stripe", "PostgreSQL", "OAuth 2.0"],
  },
  {
    name: "Checkout Hub",
    description:
      "Centralized webhook-routing infrastructure for automatic user provisioning across multiple Supabase instances after Stripe payments, connecting payment events to multi-database onboarding.",
    keywords: ["Node.js", "Stripe", "Supabase", "Hono", "TypeScript"],
  },
]

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Nathan Ferreira Santos",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/nathan.jpeg`,
  jobTitle: "Full-Stack Software Engineer",
  description:
    "Full-stack engineer building multi-tenant SaaS with TypeScript, NestJS, Next.js and PostgreSQL.",
  knowsAbout: [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Drizzle ORM",
    "Docker",
    "Multi-tenant architecture",
    "Row Level Security",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sertãozinho",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: [
    "https://github.com/nathannfs",
    "https://linkedin.com/in/nathannfs",
    "https://instagram.com/nathannfss",
  ],
}

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "Nathan Ferreira Santos · Full-Stack Software Engineer",
  publisher: { "@id": PERSON_ID },
  inLanguage: ["en-US", "pt-BR"],
}

const profilePage = {
  "@type": "ProfilePage",
  url: `${SITE_URL}/`,
  name: "Nathan Ferreira Santos | Full-Stack Software Engineer",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  mainEntity: { "@id": PERSON_ID },
}

const creativeWorks = featuredProjects.map((project) => ({
  "@type": "SoftwareSourceCode",
  name: project.name,
  description: project.description,
  author: { "@id": PERSON_ID },
  keywords: project.keywords.join(", "),
  programmingLanguage: "TypeScript",
}))

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [person, website, profilePage, ...creativeWorks],
}

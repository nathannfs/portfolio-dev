import { ImageResponse } from "next/og"

import { getProjectById, getProjects } from "@/server/content"

export const alt = "Project by Nathan Ferreira Santos"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Prerenders one card per project so a crawler never waits on a cold render. */
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ id: project.id }))
}

const INK = "#FAFAFA"
const MUTED = "#A1A1AA"
const GROUND = "#09090B"
const RULE = "#27272A"

function truncate(text: string, limit: number) {
  if (text.length <= limit) {
    return text
  }
  const cut = text.slice(0, limit)
  const lastSpace = cut.lastIndexOf(" ")
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).trimEnd()}…`
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProjectById(id)

  const name = project?.name ?? "Nathan Ferreira Santos"
  const description = project
    ? truncate(project.description, 118)
    : "Full-stack engineer working with TypeScript end to end."
  const techs = project?.techs.slice(0, 6) ?? []
  const year = project?.year ?? ""

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: GROUND,
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        <span>Project</span>
        <span>{year}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            fontSize: name.length > 34 ? 68 : 84,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 700,
            color: INK,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "900px",
            fontSize: 30,
            lineHeight: 1.4,
            color: MUTED,
          }}
        >
          {description}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {techs.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                border: `1px solid ${RULE}`,
                borderRadius: "999px",
                padding: "10px 22px",
                fontSize: 22,
                color: "#D4D4D8",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", borderTop: `1px solid ${RULE}`, paddingTop: "28px" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 24,
              color: MUTED,
            }}
          >
            <span style={{ color: INK }}>Nathan Ferreira Santos</span>
            <span>nathannfs.com</span>
          </div>
        </div>
      </div>
    </div>,
    size
  )
}

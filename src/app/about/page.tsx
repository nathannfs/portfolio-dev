import { localizedMetadata } from "@/lib/page-metadata"
import {
  getAboutMe,
  getCertifications,
  getDegrees,
  getExperiences,
  getHobbies,
} from "@/server/content"

import { About } from "./about"

export function generateMetadata() {
  return localizedMetadata({
    title: { en: "About", "pt-BR": "Sobre" },
    description: {
      en: "Full-stack engineer working with TypeScript end to end. Experience, education and the tools I reach for.",
      "pt-BR":
        "Engenheiro full-stack que trabalha com TypeScript nas duas pontas. Experiência, formação e as ferramentas que eu uso.",
    },
  })
}

export default async function AboutPage() {
  const [aboutMe, certifications, degrees, experiences, hobbies] =
    await Promise.all([
      getAboutMe(),
      getCertifications(),
      getDegrees(),
      getExperiences(),
      getHobbies(),
    ])

  return (
    <About
      initial={{ aboutMe, certifications, degrees, experiences, hobbies }}
    />
  )
}

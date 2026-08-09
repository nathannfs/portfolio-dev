import type { Metadata } from "next"

import {
  getAboutMe,
  getCertifications,
  getDegrees,
  getExperiences,
  getHobbies,
} from "@/server/content"

import { About } from "./about"

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack engineer working with TypeScript end to end. Experience, education and the tools I reach for.",
  alternates: { canonical: "/about" },
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

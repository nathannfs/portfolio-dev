import type { AboutMe } from "@/types/about-me"

import { api } from "../api-client"

export async function updateAboutMe(id: string, about: Partial<AboutMe>) {
  await api.patch(`about-me/${id}`, { json: about }).json<void>()
}

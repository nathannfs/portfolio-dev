import type { AboutMe } from "@/types/about-me"

import { api } from "../api-client"

export async function createAboutMe(about: Omit<AboutMe, "id">) {
  await api.post("about-me", { json: about }).json<void>()
}

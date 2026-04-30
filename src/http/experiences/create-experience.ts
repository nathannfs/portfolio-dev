import type { Experience } from "@/types/experiences"

import { api } from "../api-client"

export async function createExperience(
  experience: Omit<Experience, "id" | "createdAt">
) {
  await api.post("experiences", { json: experience }).json<void>()
}

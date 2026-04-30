import type { Experience } from "@/types/experiences"

import { api } from "../api-client"

export async function updateExperience(
  id: string,
  experience: Partial<Experience>
) {
  await api.patch(`experiences/${id}`, { json: experience }).json<void>()
}

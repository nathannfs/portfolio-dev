import type { Experience } from "@/types/experiences"

import { api } from "../api-client"

export function getExperiences() {
  return api.get("experiences").json<Experience[]>()
}

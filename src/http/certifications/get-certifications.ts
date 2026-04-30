import type { Certificate } from "@/types/certificate"

import { api } from "../api-client"

export function getCertifications() {
  return api.get("certifications").json<Certificate[]>()
}

import type { Certificate } from "@/types/certificate"

import { api } from "../api-client"

export async function updateCertification(
  id: string,
  cert: Partial<Certificate>
) {
  await api.patch(`certifications/${id}`, { json: cert }).json<void>()
}

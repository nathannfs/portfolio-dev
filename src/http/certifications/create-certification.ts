import type { Certificate } from "@/types/certificate"

import { api } from "../api-client"

export async function createCertification(cert: Omit<Certificate, "id">) {
  await api.post("certifications", { json: cert }).json<void>()
}

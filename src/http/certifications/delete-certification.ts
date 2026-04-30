import { api } from "../api-client"

export async function deleteCertification(id: string) {
  await api.delete(`certifications/${id}`).json<void>()
}

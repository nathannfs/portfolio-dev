import { api } from "../api-client"

export async function deleteExperience(id: string) {
  await api.delete(`experiences/${id}`).json<void>()
}

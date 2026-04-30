import { api } from "../api-client"

export async function deleteProject(id: string) {
  await api.delete(`projects/${id}`).json<void>()
}

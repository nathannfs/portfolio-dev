import { api } from "../api-client"

export async function deleteAboutMe(id: string) {
  await api.delete(`about-me/${id}`).json<void>()
}

import { api } from "@/http/api-client"

export async function deleteDegree(id: string) {
  await api.delete(`degrees/${id}`)
}

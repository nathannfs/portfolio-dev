import { api } from "@/http/api-client"

export async function deleteHobby(id: string) {
  await api.delete(`hobbies/${id}`).json<void>()
}

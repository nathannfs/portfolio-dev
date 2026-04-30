import { api } from "@/http/api-client"
import type { Hobby } from "@/types/hobby"

export async function updateHobby(id: string, hobby: Partial<Hobby>) {
  await api
    .patch(`hobbies/${id}`, {
      json: hobby,
    })
    .json<void>()
}

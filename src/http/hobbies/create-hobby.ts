import { api } from "@/http/api-client"
import type { Hobby } from "@/types/hobby"

export async function createHobby(hobby: Omit<Hobby, "id">) {
  await api
    .patch("hobbies", {
      json: hobby,
    })
    .json<void>()
}

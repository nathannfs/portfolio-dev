import { api } from "@/http/api-client"
import type { Degree } from "@/types/degree"

export async function createDegree(degree: Omit<Degree, "id">) {
  await api
    .patch("degrees", {
      json: degree,
    })
    .json<void>()
}

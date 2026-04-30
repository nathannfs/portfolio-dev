import { api } from "@/http/api-client"
import type { Degree } from "@/types/degree"

export async function updateDegree(id: string, degree: Partial<Degree>) {
  await api
    .patch(`degrees/${id}`, {
      json: degree,
    })
    .json<void>()
}

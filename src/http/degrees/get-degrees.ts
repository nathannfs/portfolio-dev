import { api } from '@/http/api-client'
import type { Degree } from '@/types/degree'

export async function getDegrees() {
  return api.get('degrees').json<Degree[]>()
}

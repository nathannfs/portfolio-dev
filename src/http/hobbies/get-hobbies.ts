import { api } from '@/http/api-client'
import type { Hobby } from '@/types/hobby'

export async function getHobbies() {
  return api.get('hobbies').json<Hobby[]>()
}

import type { Experience } from '@/types/experiences'

import { api } from '../api-client'

export async function getExperiences() {
  return api.get('experiences').json<Experience[]>()
}

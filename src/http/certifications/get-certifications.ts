import type { Certificate } from '@/types/certificate'

import { api } from '../api-client'

export async function getCertifications() {
  return api.get('certifications').json<Certificate[]>()
}

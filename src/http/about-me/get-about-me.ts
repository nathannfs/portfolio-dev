import type { AboutMe } from '@/types/about-me'

import { api } from '../api-client'

export async function getAboutMe() {
  return api.get('about-me').json<AboutMe[]>()
}

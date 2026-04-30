import { Project } from '@/types/project'

import { api } from '../api-client'

export async function getProjects() {
  return api.get('projects').json<Project[]>()
}

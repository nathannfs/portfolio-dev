import { Project } from '@/types/project'

import { api } from '../api-client'

export async function updateProject(id: string, project: Partial<Project>) {
  await api.patch(`projects/${id}`, {
    json: project,
  }).json<void>()
}

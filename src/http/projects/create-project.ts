import type { Project } from "@/types/project"

import { api } from "../api-client"

export async function createProject(project: Omit<Project, "id">) {
  await api
    .post("projects", {
      json: project,
    })
    .json<void>()
}

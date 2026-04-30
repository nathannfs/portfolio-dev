import type { Project } from "@/types/project"

import { api } from "../api-client"

export function getProjects() {
  return api.get("projects").json<Project[]>()
}

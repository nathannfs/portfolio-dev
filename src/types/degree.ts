import type { Status } from "./status"

export interface Degree {
  description?: string
  id: string
  institution: string
  period: string
  status?: Status
  title: string
  translations?: Record<string, unknown> | null
}

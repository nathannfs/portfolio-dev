import type { Status } from "./status"

export interface Certificate {
  description?: string
  hours?: number
  id: string
  institution: string
  status?: Status
  title: string
}

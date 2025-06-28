import type { Status } from './status'

export type Certificate = {
  id: string
  title: string
  description?: string
  institution: string
  hours?: number
  status?: Status
}

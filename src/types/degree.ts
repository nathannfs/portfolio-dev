import type { Status } from './status'

export type Degree = {
  id: string
  title: string
  description?: string
  institution: string
  period: string
  status?: Status
}

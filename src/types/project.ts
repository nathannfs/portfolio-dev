export interface Project {
  challenges: string[]
  completed?: boolean
  createdAt?: string
  description: string
  features: string[]
  href?: string
  id: string
  learnings: string[]
  name: string
  techs: string[]
  translations?: Record<string, unknown> | null
  year?: string
}

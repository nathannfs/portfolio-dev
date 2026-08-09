export interface Experience {
  company: string
  createdAt?: string
  description: string
  id: string
  period: string
  position: string
  responsibilities: string[]
  translations?: Record<string, unknown> | null
}

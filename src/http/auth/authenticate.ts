import { api } from "../api-client"

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  email: string | null
  emailVerified: Date | null
  id: string
  image: string | null
  name: string | null
}

export function authenticate(auth: AuthenticateRequest) {
  return api.post("auth", { json: auth }).json<AuthenticateResponse>()
}

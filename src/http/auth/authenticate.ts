import { api } from '../api-client'

type AuthenticateRequest = {
  email: string
  password: string
}

type AuthenticateResponse = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export async function authenticate(auth: AuthenticateRequest) {
  return api.post('auth', { json: auth }).json<AuthenticateResponse>()
}

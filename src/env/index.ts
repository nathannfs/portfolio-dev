import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  RESEND_API_KEY: z.string(),
  AUTH_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Variáveis de ambiente inválidas.', _env.error.format())
  throw new Error('Variáveis de ambiente inválidas.')
}

export const env = _env.data

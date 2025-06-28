'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createHobby } from '@/http/hobbies/create-hobby'
import { updateHobby } from '@/http/hobbies/update-hobby'

const hobbySchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
})

export async function createHobbyAction(data: FormData) {
  const result = hobbySchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await createHobby(result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao criar hobby',
          errors: null,
        }
      } catch {
        return {
          success: false,
          message: 'Erro ao processar resposta do servidor',
          errors: null,
        }
      }
    }

    return {
      success: false,
      message: 'Erro inesperado ao criar hobby.',
      errors: null,
    }
  }
}

const updateHobbySchema = hobbySchema.partial()

export async function updateHobbyAction(id: string, data: FormData) {
  const result = updateHobbySchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await updateHobby(id, result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao atualizar hobby',
          errors: null,
        }
      } catch {
        return {
          success: false,
          message: 'Erro ao processar resposta do servidor',
          errors: null,
        }
      }
    }

    return {
      success: false,
      message: 'Erro inesperado ao editar hobby.',
      errors: null,
    }
  }
}

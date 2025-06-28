'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createAboutMe } from '@/http/about-me/create-about-me'
import { updateAboutMe } from '@/http/about-me/update-about-me'

const aboutMeSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório'),
})

export async function createAboutMeAction(data: FormData) {
  const result = aboutMeSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await createAboutMe(result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao criar about-me',
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
      message: 'Erro inesperado ao criar about-me.',
      errors: null,
    }
  }
}

const updateAboutMeSchema = aboutMeSchema.partial()

export async function updateAboutMeAction(id: string, data: FormData) {
  const result = updateAboutMeSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await updateAboutMe(id, result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao atualizar about-me',
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
      message: 'Erro inesperado ao editar about-me.',
      errors: null,
    }
  }
}

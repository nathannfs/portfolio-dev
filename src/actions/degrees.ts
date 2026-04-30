'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createDegree } from '@/http/degrees/create-degree'
import { updateDegree } from '@/http/degrees/update-degree'

const degreeSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  institution: z.string().min(1, 'Instituição é obrigatória'),
  period: z.string().min(1, 'Período é obrigatório'),
  status: z.enum(['completed', 'in_progress', 'planned']),
  description: z.string().optional(),
})

export async function createDegreeAction(data: FormData) {
  const result = degreeSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await createDegree(result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao criar degree',
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
      message: 'Erro inesperado ao criar degree.',
      errors: null,
    }
  }
}

const updateDegreeSchema = degreeSchema.partial()

export async function updateDegreeAction(id: string, data: FormData) {
  const result = updateDegreeSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await updateDegree(id, result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao atualizar degree',
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
      message: 'Unexpected error editing degree.',
      errors: null,
    }
  }
}

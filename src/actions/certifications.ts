'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createCertification } from '@/http/certifications/create-certification'
import { updateCertification } from '@/http/certifications/update-certification'

const certificationSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório!' }),
  institution: z.string().min(1, { message: 'A instituição é obrigatória!' }),
  hours: z.coerce
    .number()
    .min(1, { message: 'A carga horária é obrigatória!' }),
  status: z.enum(['completed', 'in_progress', 'planned'], {
    errorMap: () => ({ message: 'O status é obrigatório!' }),
  }),
  description: z.string().optional(),
})

export async function createCertificationAction(data: FormData) {
  const result = certificationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await createCertification(result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao criar certificação',
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
      message: 'Erro inesperado ao criar certificação.',
      errors: null,
    }
  }
}

const updateCertificationSchema = certificationSchema.partial()

export async function updateCertificationAction(id: string, data: FormData) {
  const result = updateCertificationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await updateCertification(id, result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao atualizar certificação',
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
      message: 'Erro inesperado ao editar certificação.',
      errors: null,
    }
  }
}

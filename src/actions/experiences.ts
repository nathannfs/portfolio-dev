'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createExperience } from '@/http/experiences/create-experience'
import { deleteExperience } from '@/http/experiences/delete-experience'
import { updateExperience } from '@/http/experiences/update-experience'

const experienceSchema = z.object({
  company: z.string().min(1, 'Empresa é obrigatória'),
  position: z.string().min(1, 'Cargo é obrigatório'),
  period: z.string().min(1, 'Período é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  responsibilities: z.array(z.string()).min(1, 'Responsabilidades são obrigatórias'),
})

export async function createExperienceAction(data: FormData) {
  const formDataObj = Object.fromEntries(data)
  const responsibilities: string[] = []

  Object.keys(formDataObj).forEach(key => {
    if (key.startsWith('responsibilities[')) {
      const value = formDataObj[key] as string
      if (value.trim()) {
        responsibilities.push(value.trim())
      }
    }
  })

  const experienceData = {
    company: formDataObj.company as string,
    position: formDataObj.position as string,
    period: formDataObj.period as string,
    description: formDataObj.description as string,
    responsibilities,
  }

  const result = experienceSchema.safeParse(experienceData)

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await createExperience(result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao criar experiência',
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
      message: 'Erro inesperado ao criar experiência.',
      errors: null,
    }
  }
}

const updateExperienceSchema = experienceSchema.partial()

export async function updateExperienceAction(id: string, data: FormData) {
  const formDataObj = Object.fromEntries(data)
  const responsibilities: string[] = []

  Object.keys(formDataObj).forEach(key => {
    if (key.startsWith('responsibilities[')) {
      const value = formDataObj[key] as string
      if (value.trim()) {
        responsibilities.push(value.trim())
      }
    }
  })

  const experienceData = {
    company: formDataObj.company as string,
    position: formDataObj.position as string,
    period: formDataObj.period as string,
    description: formDataObj.description as string,
    responsibilities,
  }

  const result = updateExperienceSchema.safeParse(experienceData)

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await updateExperience(id, result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao atualizar experiência',
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
      message: 'Erro inesperado ao editar experiência.',
      errors: null,
    }
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    await deleteExperience(id)
    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao deletar experiência',
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
      message: 'Erro inesperado ao deletar experiência.',
      errors: null,
    }
  }
}

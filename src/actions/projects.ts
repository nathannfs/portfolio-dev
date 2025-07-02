'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createProject } from '@/http/projects/create-project'
import { updateProject } from '@/http/projects/update-project'

const projectSchema = z.object({
  name: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  image: z.string().min(1, 'Imagem é obrigatória'),
  href: z.string().min(1, 'Link é obrigatório'),
  techs: z.array(z.string()).min(1, 'Tecnologias são obrigatórias'),
  year: z.string().min(1, 'Ano é obrigatório'),
  completed: z.boolean().optional(),
  features: z.array(z.string()).min(1, 'Características são obrigatórias'),
  challenges: z.array(z.string()).min(1, 'Desafios são obrigatórios'),
  learnings: z.array(z.string()).min(1, 'Aprendizados são obrigatórios'),
})

function parseFormDataToProject(data: FormData) {
  const obj = Object.fromEntries(data)

  return {
    ...obj,
    techs: data.getAll('techs').filter(Boolean),
    features: data.getAll('features').filter(Boolean),
    challenges: data.getAll('challenges').filter(Boolean),
    learnings: data.getAll('learnings').filter(Boolean),
  }
}

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(parseFormDataToProject(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await createProject(result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao criar projeto',
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
      message: 'Erro inesperado ao criar projeto.',
      errors: null,
    }
  }
}

const updateProjectSchema = projectSchema.partial()

export async function updateProjectAction(id: string, data: FormData) {
  const result = updateProjectSchema.safeParse(parseFormDataToProject(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await updateProject(id, result.data)

    return { success: true, message: null, errors: null }
  } catch (err) {
    if (err instanceof HTTPError) {
      try {
        const errorData = await err.response.json()
        return {
          success: false,
          message: errorData.error || 'Erro ao atualizar projeto',
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
      message: 'Erro inesperado ao editar projeto.',
      errors: null,
    }
  }
}

import { Loader2, Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { createExperienceAction, updateExperienceAction } from '@/actions/experiences'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { Textarea } from '@/components/textarea'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import type { Experience } from '@/types/experiences'

type ExperienceModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Experience | null
}

export function ExperienceModal({ open, onOpenChange, initialData }: ExperienceModalProps) {
  const [responsibilities, setResponsibilities] = useState<string[]>([])
  const [newResponsibility, setNewResponsibility] = useState('')

  useEffect(() => {
    if (initialData?.responsibilities && initialData.responsibilities.length > 0) {
      setResponsibilities(initialData.responsibilities)
    } else {
      setResponsibilities([])
    }
  }, [initialData])

  const action = initialData
    ? (data: FormData) => updateExperienceAction(initialData.id, data)
    : createExperienceAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false),
  )

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setResponsibilities([...responsibilities, newResponsibility.trim()])
      setNewResponsibility('')
    }
  }

  const removeResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index))
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    responsibilities.forEach((responsibility, index) => {
      if (responsibility.trim()) {
        formData.append(`responsibilities[${index}]`, responsibility.trim())
      }
    })

    const modifiedEvent = {
      ...event,
      currentTarget: {
        ...event.currentTarget,
        formData: () => formData,
      },
    } as React.FormEvent<HTMLFormElement>

    handleSubmit(modifiedEvent)
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData
        ? 'Editar Experiência'
        : 'Adicionar Experiência'}
      description={initialData
        ? 'Edite os dados da experiência profissional abaixo.'
        : 'Adicione uma nova experiência profissional preenchendo os campos abaixo.'}
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="company"
              placeholder="Empresa"
              defaultValue={initialData?.company}
            />
          </Input.Root>

          {errors?.company && <span className="text-red-500 text-sm">{errors.company[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="position"
              placeholder="Cargo"
              defaultValue={initialData?.position}
            />
          </Input.Root>

          {errors?.position && <span className="text-red-500 text-sm">{errors.position[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="period"
              placeholder="Período (ex: Jan 2023 - Dez 2023)"
              defaultValue={initialData?.period}
            />
          </Input.Root>
          {errors?.period && <span className="text-red-500 text-sm">{errors.period[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Textarea.Root>
            <Textarea.Control
              name="description"
              placeholder="Descrição da experiência"
              defaultValue={initialData?.description}
              rows={3}
            />
          </Textarea.Root>
          {errors?.description && <span className="text-red-500 text-sm">{errors.description[0]}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Responsabilidades</Label>

          <ul className="flex flex-col gap-2">
            {responsibilities.length > 0 && responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="flex-1 text-sm">{responsibility}</span>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeResponsibility(index)}
                  className="shrink-0"
                  aria-label="Remover responsabilidade"
                >
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 items-center">
            <Input.Root className="flex-1">
              <Input.Control
                placeholder="Adicionar nova responsabilidade"
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addResponsibility()
                  }
                }}
              />
            </Input.Root>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addResponsibility}
              className="w-fit shrink-0"
              aria-label="Adicionar responsabilidade"
              disabled={!newResponsibility.trim()}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          {errors?.responsibilities && <span className="text-red-500 text-sm">{errors.responsibilities[0]}</span>}
        </div>

        {message && <div className="text-red-500">{message}</div>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="destructive" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancelar
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending
              ? <Loader2 className="animate-spin" />
              : initialData
                ? 'Salvar'
                : 'Adicionar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

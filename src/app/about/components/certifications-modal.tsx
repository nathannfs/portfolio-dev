'use client'

import { Loader2 } from 'lucide-react'

import {
  createCertificationAction,
  updateCertificationAction,
} from '@/actions/certifications'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { Textarea } from '@/components/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'
import type { Certificate } from '@/types/certificate'

type CertificationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Certificate | null
}

export function CertificationModal({
  open,
  onOpenChange,
  initialData,
}: CertificationModalProps) {
  const action = initialData
    ? (data: FormData) => updateCertificationAction(initialData.id!, data)
    : createCertificationAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['certifications'] })
      onOpenChange(false)
    },
  )

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData
        ? 'Editar Certificação'
        : 'Adicionar Certificação'}
      description={initialData
        ? 'Edite os dados da certificação abaixo.'
        : 'Adicione uma nova certificação preenchendo os campos abaixo.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="title"
              placeholder="Título"
              defaultValue={initialData?.title}
            />
          </Input.Root>

          {errors?.title && (
            <span className="text-red-500 text-sm">{errors.title[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="institution"
              placeholder="Instituição"
              defaultValue={initialData?.institution}
            />
          </Input.Root>

          {errors?.institution && (
            <span className="text-red-500 text-sm">{errors.institution[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="hours"
              placeholder="Horas"
              defaultValue={initialData?.hours}
            />
          </Input.Root>

          {errors?.hours && (
            <span className="text-red-500 text-sm">{errors.hours[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Select name="status" defaultValue={initialData?.status}>
            <SelectTrigger className="text-sm text-zinc-600">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="completed">Finalizado</SelectItem>
              <SelectItem value="in_progress">Cursando</SelectItem>
              <SelectItem value="planned">Planejado</SelectItem>
            </SelectContent>
          </Select>

          {errors?.status && (
            <span className="text-red-500 text-sm">{errors.status[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Textarea.Root>
            <Textarea.Control
              name="description"
              placeholder="Descrição"
              defaultValue={initialData?.description}
            />
          </Textarea.Root>

          {errors?.description && (
            <span className="text-red-500 text-sm">{errors.description[0]}</span>
          )}
        </div>

        {message && <div className="mt-2 text-red-500">{message}</div>}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isPending}
          >
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

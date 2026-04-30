import { Loader2 } from 'lucide-react'

import { createDegreeAction, updateDegreeAction } from '@/actions/degrees'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { Textarea } from '@/components/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'
import type { Degree } from '@/types/degree'

type DegreeModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Degree | null
}

export function DegreeModal({ open, onOpenChange, initialData }: DegreeModalProps) {
  const action = initialData
    ? (data: FormData) => updateDegreeAction(initialData.id, data)
    : createDegreeAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false),
  )

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData
        ? 'Edit Degree'
        : 'Add Degree'}
      description={initialData
        ? 'Edit the details of the degree below.'
        : 'Add a new degree by filling out the fields below.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="title"
              placeholder="Degree title"
              required
              defaultValue={initialData?.title}
            />
          </Input.Root>
          {errors?.title && <span className="text-red-500 text-sm">{errors.title[0]}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="institution"
              placeholder="Institution"
              defaultValue={initialData?.institution}
            />
          </Input.Root>
          {errors?.institution && <span className="text-red-500 text-sm">{errors.institution[0]}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="period"
              placeholder="Period"
              defaultValue={initialData?.period}
            />
          </Input.Root>
          {errors?.period && <span className="text-red-500 text-sm">{errors.period[0]}</span>}
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
          {errors?.status && <span className="text-red-500 text-sm">{errors.status[0]}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <Textarea.Root>
            <Textarea.Control
              name="description"
              placeholder="Descrição"
              defaultValue={initialData?.description}
            />
          </Textarea.Root>
          {errors?.description && <span className="text-red-500 text-sm">{errors.description[0]}</span>}
        </div>
        {message && <div className="mt-2 text-red-500">{message}</div>}
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

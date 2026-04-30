import { Loader2 } from "lucide-react"

import { createDegreeAction, updateDegreeAction } from "@/actions/degrees"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Modal } from "@/components/modal"
import { Textarea } from "@/components/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormState } from "@/hooks/use-form-state"
import type { Degree } from "@/types/degree"

interface DegreeModalProps {
  initialData?: Degree | null
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function DegreeModal({
  open,
  onOpenChange,
  initialData,
}: DegreeModalProps) {
  const action = initialData
    ? (data: FormData) => updateDegreeAction(initialData.id, data)
    : createDegreeAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false)
  )

  const buttonLabel = initialData ? "Salvar" : "Adicionar"

  return (
    <Modal
      description={
        initialData
          ? "Edit the details of the degree below."
          : "Add a new degree by filling out the fields below."
      }
      onOpenChange={onOpenChange}
      open={open}
      title={initialData ? "Edit Degree" : "Add Degree"}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.title}
              name="title"
              placeholder="Degree title"
              required
            />
          </Input.Root>
          {errors?.title && (
            <span className="text-red-500 text-sm">{errors.title[0]}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.institution}
              name="institution"
              placeholder="Institution"
            />
          </Input.Root>
          {errors?.institution && (
            <span className="text-red-500 text-sm">
              {errors.institution[0]}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.period}
              name="period"
              placeholder="Period"
            />
          </Input.Root>
          {errors?.period && (
            <span className="text-red-500 text-sm">{errors.period[0]}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Select defaultValue={initialData?.status} name="status">
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
              defaultValue={initialData?.description}
              name="description"
              placeholder="Descrição"
            />
          </Textarea.Root>
          {errors?.description && (
            <span className="text-red-500 text-sm">
              {errors.description[0]}
            </span>
          )}
        </div>
        {message && <div className="mt-2 text-red-500">{message}</div>}
        <div className="flex justify-end gap-2">
          <Button
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="destructive"
          >
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : buttonLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

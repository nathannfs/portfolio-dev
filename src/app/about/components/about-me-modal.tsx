import { Loader2 } from 'lucide-react'

import { createAboutMeAction, updateAboutMeAction } from '@/actions/about-me'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { Textarea } from '@/components/textarea'
import { useFormState } from '@/hooks/use-form-state'
import type { AboutMe } from '@/types/about-me'

type AboutMeModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: AboutMe | null
}

export function AboutMeModal({ open, onOpenChange, initialData }: AboutMeModalProps) {
  const action = initialData
    ? (data: FormData) => updateAboutMeAction(initialData.id, data)
    : createAboutMeAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false),
  )

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData
        ? 'Editar Sobre Mim'
        : 'Adicionar Sobre Mim'}
      description={initialData
        ? 'Edite o texto sobre você abaixo.'
        : 'Adicione um texto sobre você.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Textarea.Root>
            <Textarea.Control
              name="content"
              placeholder="Conte sobre você... Use quebras de linha para separar parágrafos."
              defaultValue={initialData?.content}
              rows={8}
            />
          </Textarea.Root>
          {errors?.content && <span className="text-red-500 text-sm">{errors.content[0]}</span>}
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

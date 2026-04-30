import { Loader2 } from 'lucide-react'

import { createHobbyAction, updateHobbyAction } from '@/actions/hobbies'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { useFormState } from '@/hooks/use-form-state'
import type { Hobby } from '@/types/hobby'

type HobbyModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Hobby | null
}

export function HobbyModal({ open, onOpenChange, initialData }: HobbyModalProps) {
  const action = initialData
    ? (data: FormData) => updateHobbyAction(initialData.id, data)
    : createHobbyAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false),
  )

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData
        ? 'Edit Hobby'
        : 'Add Hobby'}
      description={initialData
        ? 'Edit the details of the hobby below.'
        : 'Add a new hobby by filling out the fields below.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="title"
              placeholder="Hobby title"
              required
              defaultValue={initialData?.title}
            />
          </Input.Root>
          {errors?.title && <span className="text-red-500 text-sm">{errors.title[0]}</span>}
        </div>
        {message && <div className="mt-2 text-red-500">{message}</div>}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? <Loader2 className="size-4 animate-spin" />
              : initialData
                ? 'Save'
                : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

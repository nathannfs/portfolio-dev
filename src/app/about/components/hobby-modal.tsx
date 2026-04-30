import { Loader2 } from "lucide-react"

import { createHobbyAction, updateHobbyAction } from "@/actions/hobbies"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Modal } from "@/components/modal"
import { useFormState } from "@/hooks/use-form-state"
import type { Hobby } from "@/types/hobby"

interface HobbyModalProps {
  initialData?: Hobby | null
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function HobbyModal({
  open,
  onOpenChange,
  initialData,
}: HobbyModalProps) {
  const action = initialData
    ? (data: FormData) => updateHobbyAction(initialData.id, data)
    : createHobbyAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false)
  )

  const buttonLabel = initialData ? "Save" : "Add"

  return (
    <Modal
      description={
        initialData
          ? "Edit the details of the hobby below."
          : "Add a new hobby by filling out the fields below."
      }
      onOpenChange={onOpenChange}
      open={open}
      title={initialData ? "Edit Hobby" : "Add Hobby"}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.title}
              name="title"
              placeholder="Hobby title"
              required
            />
          </Input.Root>
          {errors?.title && (
            <span className="text-red-500 text-sm">{errors.title[0]}</span>
          )}
        </div>
        {message && <div className="mt-2 text-red-500">{message}</div>}
        <div className="flex justify-end gap-2">
          <Button
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              buttonLabel
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

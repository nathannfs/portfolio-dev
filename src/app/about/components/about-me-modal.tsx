import { Loader2 } from "lucide-react"

import { createAboutMeAction, updateAboutMeAction } from "@/actions/about-me"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { Textarea } from "@/components/textarea"
import { useFormState } from "@/hooks/use-form-state"
import type { AboutMe } from "@/types/about-me"

interface AboutMeModalProps {
  initialData?: AboutMe | null
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function AboutMeModal({
  open,
  onOpenChange,
  initialData,
}: AboutMeModalProps) {
  const action = initialData
    ? (data: FormData) => updateAboutMeAction(initialData.id, data)
    : createAboutMeAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false)
  )

  const buttonLabel = initialData ? "Save" : "Add"

  return (
    <Modal
      description={
        initialData ? "Edit the text about you below." : "Add a text about you."
      }
      onOpenChange={onOpenChange}
      open={open}
      title={initialData ? "Edit About Me" : "Add About Me"}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <Textarea.Root>
            <Textarea.Control
              defaultValue={initialData?.content}
              name="content"
              placeholder="Tell us about yourself... Use line breaks to separate paragraphs."
              rows={8}
            />
          </Textarea.Root>
          {errors?.content && (
            <span className="text-red-500 text-sm">{errors.content[0]}</span>
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

import { Loader2, Plus, X } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

import {
  createExperienceAction,
  updateExperienceAction,
} from "@/actions/experiences"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Modal } from "@/components/modal"
import { Textarea } from "@/components/textarea"
import { Label } from "@/components/ui/label"
import { useFormState } from "@/hooks/use-form-state"
import type { Experience } from "@/types/experiences"

interface ExperienceModalProps {
  initialData?: Experience | null
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function ExperienceModal({
  open,
  onOpenChange,
  initialData,
}: ExperienceModalProps) {
  const [responsibilities, setResponsibilities] = useState<string[]>([])
  const [newResponsibility, setNewResponsibility] = useState("")

  useEffect(() => {
    const data =
      initialData?.responsibilities && initialData.responsibilities.length > 0
        ? initialData.responsibilities
        : []
    setTimeout(() => setResponsibilities(data), 0)
  }, [initialData])

  const action = initialData
    ? (data: FormData) => updateExperienceAction(initialData.id, data)
    : createExperienceAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    () => onOpenChange(false)
  )

  const buttonLabel = initialData ? "Save" : "Add"

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setResponsibilities([...responsibilities, newResponsibility.trim()])
      setNewResponsibility("")
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
      description={
        initialData
          ? "Edit the details of the professional experience below."
          : "Add a new professional experience by filling out the fields below."
      }
      onOpenChange={onOpenChange}
      open={open}
      title={initialData ? "Edit Experience" : "Add Experience"}
    >
      <form className="space-y-5" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.company}
              name="company"
              placeholder="Company name"
            />
          </Input.Root>

          {errors?.company && (
            <span className="text-red-500 text-sm">{errors.company[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.position}
              name="position"
              placeholder="Position"
            />
          </Input.Root>

          {errors?.position && (
            <span className="text-red-500 text-sm">{errors.position[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.period}
              name="period"
              placeholder="Period (e.g. Jan 2023 - Dec 2023)"
            />
          </Input.Root>
          {errors?.period && (
            <span className="text-red-500 text-sm">{errors.period[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Textarea.Root>
            <Textarea.Control
              defaultValue={initialData?.description}
              name="description"
              placeholder="Experience description"
              rows={3}
            />
          </Textarea.Root>
          {errors?.description && (
            <span className="text-red-500 text-sm">
              {errors.description[0]}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Responsibilities</Label>

          <ul className="flex flex-col gap-2">
            {responsibilities.length > 0 &&
              responsibilities.map((responsibility, index) => (
                <li
                  className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2"
                  key={`${responsibility}-${index}`}
                >
                  <span className="flex-1 text-sm">{responsibility}</span>

                  <Button
                    aria-label="Remove responsibility"
                    className="shrink-0"
                    onClick={() => removeResponsibility(index)}
                    size="sm"
                    type="button"
                    variant="destructive"
                  >
                    <X className="size-4" />
                  </Button>
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-2">
            <Input.Root className="flex-1">
              <Input.Control
                onChange={(e) => setNewResponsibility(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addResponsibility()
                  }
                }}
                placeholder="Add new responsibility"
                value={newResponsibility}
              />
            </Input.Root>

            <Button
              aria-label="Add responsibility"
              className="w-fit shrink-0"
              disabled={!newResponsibility.trim()}
              onClick={addResponsibility}
              size="sm"
              type="button"
              variant="ghost"
            >
              <Plus className="size-4" />
            </Button>
          </div>

          {errors?.responsibilities && (
            <span className="text-red-500 text-sm">
              {errors.responsibilities[0]}
            </span>
          )}
        </div>

        {message && <div className="text-red-500">{message}</div>}

        <div className="flex justify-end gap-2 border-border border-t pt-4">
          <Button
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="destructive"
          >
            Cancel
          </Button>

          <Button
            className="focus-visible:ring-2 focus-visible:ring-aurora-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
            disabled={isPending}
            type="submit"
          >
            {isPending ? <Loader2 className="animate-spin" /> : buttonLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

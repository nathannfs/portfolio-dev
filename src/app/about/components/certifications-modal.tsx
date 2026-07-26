"use client"

import { Loader2 } from "lucide-react"

import {
  createCertificationAction,
  updateCertificationAction,
} from "@/actions/certifications"
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
import { queryClient } from "@/lib/react-query"
import type { Certificate } from "@/types/certificate"

interface CertificationModalProps {
  initialData?: Certificate | null
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function CertificationModal({
  open,
  onOpenChange,
  initialData,
}: CertificationModalProps) {
  const action = initialData
    ? (data: FormData) => updateCertificationAction(initialData.id, data)
    : createCertificationAction

  const [{ errors, message }, handleSubmit, isPending] = useFormState(
    action,
    async () => {
      await queryClient.invalidateQueries({ queryKey: ["certifications"] })
      onOpenChange(false)
    }
  )

  const buttonLabel = initialData ? "Save" : "Add"

  return (
    <Modal
      description={
        initialData
          ? "Edit the details of the certification below."
          : "Add a new certification by filling out the fields below."
      }
      onOpenChange={onOpenChange}
      open={open}
      title={initialData ? "Edit Certification" : "Add Certification"}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.title}
              name="title"
              placeholder="Certification title"
            />
          </Input.Root>

          {errors?.title && (
            <span className="text-red-500 text-sm">{errors.title[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
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

        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.hours}
              name="hours"
              placeholder="Hours"
            />
          </Input.Root>

          {errors?.hours && (
            <span className="text-red-500 text-sm">{errors.hours[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Select defaultValue={initialData?.status} name="status">
            <SelectTrigger className="text-muted-foreground text-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
            </SelectContent>
          </Select>

          {errors?.status && (
            <span className="text-red-500 text-sm">{errors.status[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Textarea.Root>
            <Textarea.Control
              defaultValue={initialData?.description}
              name="description"
              placeholder="Description"
            />
          </Textarea.Root>

          {errors?.description && (
            <span className="text-red-500 text-sm">
              {errors.description[0]}
            </span>
          )}
        </div>

        {message && <div className="mt-2 text-red-500">{message}</div>}

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

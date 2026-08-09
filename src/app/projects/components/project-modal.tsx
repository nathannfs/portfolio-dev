import { Loader2, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"

import { createProjectAction, updateProjectAction } from "@/actions/projects"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Modal } from "@/components/modal"
import { Textarea } from "@/components/textarea"
import { Label } from "@/components/ui/label"
import { useFormState } from "@/hooks/use-form-state"
import type { Project } from "@/types/project"

interface ProjectModalProps {
  initialData?: Project | null
  onOpenChange: (open: boolean) => void
  open: boolean
}

interface DynamicListProps {
  errors?: string[]
  label: string
  list: string[]
  onAdd: (value: string) => void
  onChange: (value: string) => void
  onRemove: (index: number) => void
  placeholder: string
  value: string
}

function DynamicList({
  label,
  list,
  value,
  placeholder,
  errors,
  onAdd,
  onRemove,
  onChange,
}: DynamicListProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground">{label}</Label>

      {list.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {list.map((item, idx) => (
            <li
              className="flex items-center gap-1 rounded-md border border-border bg-surface-2 px-2 py-1 text-sm"
              key={`${item}-${idx}`}
            >
              {item}
              <button
                aria-label={`Remove ${label.toLowerCase()}`}
                className="rounded text-muted-foreground transition-colors hover:text-aurora-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-cyan"
                onClick={() => onRemove(idx)}
                type="button"
              >
                <X className="ml-1 size-3" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <Input.Root className="flex-1">
          <Input.Control
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                onAdd(value)
              }
            }}
            placeholder={placeholder}
            value={value}
          />
        </Input.Root>

        <Button
          className="shrink-0"
          disabled={!value.trim()}
          onClick={() => onAdd(value)}
          size="sm"
          type="button"
          variant="ghost"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {errors && <span className="text-red-500 text-sm">{errors[0]}</span>}
    </div>
  )
}

export function ProjectModal({
  open,
  onOpenChange,
  initialData,
}: ProjectModalProps) {
  const [techs, setTechs] = useState<string[]>(initialData?.techs || [])
  const [newTech, setNewTech] = useState("")

  const [features, setFeatures] = useState<string[]>(
    initialData?.features || []
  )
  const [newFeature, setNewFeature] = useState("")

  const [challenges, setChallenges] = useState<string[]>(
    initialData?.challenges || []
  )
  const [newChallenge, setNewChallenge] = useState("")

  const [learnings, setLearnings] = useState<string[]>(
    initialData?.learnings || []
  )
  const [newLearning, setNewLearning] = useState("")

  useEffect(() => {
    setTimeout(() => {
      if (initialData) {
        setTechs(initialData.techs || [])
        setFeatures(initialData.features || [])
        setChallenges(initialData.challenges || [])
        setLearnings(initialData.learnings || [])
      } else {
        setTechs([])
        setFeatures([])
        setChallenges([])
        setLearnings([])
      }
    }, 0)
  }, [initialData])

  const [{ errors }, handleSubmit, isPending] = useFormState(
    async (data: FormData) => {
      for (const item of techs) {
        data.append("techs", item)
      }
      for (const item of features) {
        data.append("features", item)
      }
      for (const item of challenges) {
        data.append("challenges", item)
      }
      for (const item of learnings) {
        data.append("learnings", item)
      }

      if (initialData) {
        return await updateProjectAction(initialData.id, data)
      }
      return await createProjectAction(data)
    },
    () => onOpenChange(false)
  )

  const buttonLabel = initialData ? "Save" : "Add"

  function addToList(
    list: string[],
    setList: (v: string[]) => void,
    value: string,
    setValue: (v: string) => void
  ) {
    if (value.trim()) {
      setList([...list, value.trim()])
      setValue("")
    }
  }

  function removeFromList(
    list: string[],
    setList: (v: string[]) => void,
    idx: number
  ) {
    setList(list.filter((_, i) => i !== idx))
  }

  return (
    <Modal
      description={
        initialData
          ? "Edit the details of the project below."
          : "Add a new project by filling out the fields below."
      }
      onOpenChange={onOpenChange}
      open={open}
      title={initialData ? "Edit Project" : "Add Project"}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.name}
              name="name"
              placeholder="Project name"
            />
          </Input.Root>

          {errors?.name && (
            <span className="text-red-500 text-sm">{errors.name[0]}</span>
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

        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.href}
              name="href"
              placeholder="Project link"
            />
          </Input.Root>

          {errors?.href && (
            <span className="text-red-500 text-sm">{errors.href[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Input.Root>
            <Input.Control
              defaultValue={initialData?.year}
              name="year"
              placeholder="Year"
            />
          </Input.Root>

          {errors?.year && (
            <span className="text-red-500 text-sm">{errors.year[0]}</span>
          )}
        </div>

        <DynamicList
          errors={errors?.techs}
          label="Technologies"
          list={techs}
          onAdd={(v) => addToList(techs, setTechs, v, setNewTech)}
          onChange={setNewTech}
          onRemove={(i) => removeFromList(techs, setTechs, i)}
          placeholder="Add technology"
          value={newTech}
        />

        <DynamicList
          errors={errors?.features}
          label="Features"
          list={features}
          onAdd={(v) => addToList(features, setFeatures, v, setNewFeature)}
          onChange={setNewFeature}
          onRemove={(i) => removeFromList(features, setFeatures, i)}
          placeholder="Add feature"
          value={newFeature}
        />

        <DynamicList
          errors={errors?.challenges}
          label="Challenges"
          list={challenges}
          onAdd={(v) =>
            addToList(challenges, setChallenges, v, setNewChallenge)
          }
          onChange={setNewChallenge}
          onRemove={(i) => removeFromList(challenges, setChallenges, i)}
          placeholder="Add challenge"
          value={newChallenge}
        />

        <DynamicList
          errors={errors?.learnings}
          label="Learnings"
          list={learnings}
          onAdd={(v) => addToList(learnings, setLearnings, v, setNewLearning)}
          onChange={setNewLearning}
          onRemove={(i) => removeFromList(learnings, setLearnings, i)}
          placeholder="Add learning"
          value={newLearning}
        />

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

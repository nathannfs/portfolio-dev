import { Loader2, Plus, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>

      <ul className="flex flex-wrap gap-2">
        {list.map((item, idx) => (
          <li
            className="flex items-center gap-1 rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800"
            key={`${item}-${idx}`}
          >
            {item}
            <button
              aria-label={`Remove ${label.toLowerCase()}`}
              onClick={() => onRemove(idx)}
              type="button"
            >
              <X className="ml-1 size-3" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-1 flex gap-2">
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
  const [imagePath, setImagePath] = useState(initialData?.image || "")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image || null
  )
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

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
        setImagePath(initialData.image || "")
        setPreviewUrl(initialData.image || null)
        setSelectedFileName(null)
      } else {
        setTechs([])
        setFeatures([])
        setChallenges([])
        setLearnings([])
        setImagePath("")
        setPreviewUrl(null)
        setSelectedFileName(null)
      }
    }, 0)
  }, [initialData])

  const [{ errors }, handleSubmit, isPending] = useFormState(
    async (data: FormData) => {
      if (!imagePath && fileInputRef.current?.files?.[0]) {
        setUploading(true)
        const formData = new FormData()
        formData.append("file", fileInputRef.current.files[0])
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const { path } = await res.json()
        setImagePath(path)
        data.set("image", path)
        setUploading(false)
      } else {
        data.set("image", imagePath)
      }

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
        return updateProjectAction(initialData.id, data)
      }
      return createProjectAction(data)
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
          <Label>Imagem principal</Label>

          <input
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImagePath("")
                const file = e.target.files[0]
                setSelectedFileName(file.name)
                const reader = new FileReader()
                reader.onload = (ev) => {
                  setPreviewUrl(ev.target?.result as string)
                }
                reader.readAsDataURL(file)
              } else {
                setSelectedFileName(null)
                setPreviewUrl(initialData?.image || null)
              }
            }}
            ref={fileInputRef}
            style={{ display: "none" }}
            type="file"
          />

          <Button
            onClick={() => fileInputRef.current?.click()}
            size="sm"
            type="button"
          >
            Selecionar imagem
          </Button>

          {selectedFileName && (
            <span className="truncate text-sm text-zinc-700 dark:text-zinc-200">
              {selectedFileName}
            </span>
          )}

          {previewUrl && (
            <Image
              alt="Preview"
              className="mt-2 rounded border object-cover"
              height={200}
              src={previewUrl}
              width={400}
            />
          )}

          {errors?.image && (
            <span className="text-red-500 text-sm">{errors.image[0]}</span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            disabled={uploading || isPending}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="destructive"
          >
            Cancel
          </Button>
          <Button disabled={uploading || isPending} type="submit">
            {uploading || isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              buttonLabel
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

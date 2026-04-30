import { Loader2, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { createProjectAction, updateProjectAction } from '@/actions/projects'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { Textarea } from '@/components/textarea'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { Project } from '@/types/project'

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Project | null
}

export function ProjectModal({ open, onOpenChange, initialData }: ProjectModalProps) {
  const [imagePath, setImagePath] = useState(initialData?.image || '')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image || null)

  const [techs, setTechs] = useState<string[]>(initialData?.techs || [])
  const [newTech, setNewTech] = useState('')

  const [features, setFeatures] = useState<string[]>(initialData?.features || [])
  const [newFeature, setNewFeature] = useState('')

  const [challenges, setChallenges] = useState<string[]>(initialData?.challenges || [])
  const [newChallenge, setNewChallenge] = useState('')

  const [learnings, setLearnings] = useState<string[]>(initialData?.learnings || [])
  const [newLearning, setNewLearning] = useState('')

  useEffect(() => {
    if (initialData) {
      setTechs(initialData.techs || [])
      setFeatures(initialData.features || [])
      setChallenges(initialData.challenges || [])
      setLearnings(initialData.learnings || [])
      setImagePath(initialData.image || '')
      setPreviewUrl(initialData.image || null)
    } else {
      setTechs([])
      setFeatures([])
      setChallenges([])
      setLearnings([])
      setImagePath('')
      setPreviewUrl(null)
    }
  }, [initialData, open])

  const [{ errors }, handleSubmit, isPending] = useFormState(
    async (data: FormData) => {
      if (!imagePath && fileInputRef.current?.files?.[0]) {
        setUploading(true)
        const formData = new FormData()
        formData.append('file', fileInputRef.current.files[0])
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const { path } = await res.json()
        setImagePath(path)
        data.set('image', path)
        setUploading(false)
      } else {
        data.set('image', imagePath)
      }

      techs.forEach((item) => data.append('techs', item))
      features.forEach((item) => data.append('features', item))
      challenges.forEach((item) => data.append('challenges', item))
      learnings.forEach((item) => data.append('learnings', item))

      if (initialData) {
        return updateProjectAction(initialData.id, data)
      }
      return createProjectAction(data)
    },
    () => onOpenChange(false),
  )

  function addToList(list: string[], setList: (v: string[]) => void, value: string, setValue: (v: string) => void) {
    if (value.trim()) {
      setList([...list, value.trim()])
      setValue('')
    }
  }
  function removeFromList(list: string[], setList: (v: string[]) => void, idx: number) {
    setList(list.filter((_, i) => i !== idx))
  }

  return (
    <Modal
      open={open} onOpenChange={onOpenChange}
      title={initialData
        ? 'Edit Project'
        : 'Add Project'}
      description={initialData
        ? 'Edit the details of the project below.'
        : 'Add a new project by filling out the fields below.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="name"
              defaultValue={initialData?.name}
              placeholder="Project name"
            />
          </Input.Root>

          {errors?.name && <span className="text-red-500 text-sm">{errors.name[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Textarea.Root>
            <Textarea.Control
              name="description"
              defaultValue={initialData?.description}
              placeholder="Description"
            />
          </Textarea.Root>

          {errors?.description && <span className="text-red-500 text-sm">{errors.description[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="href"
              defaultValue={initialData?.href}
              placeholder="Project link"
            />
          </Input.Root>

          {errors?.href && <span className="text-red-500 text-sm">{errors.href[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Input.Root>
            <Input.Control
              name="year"
              defaultValue={initialData?.year}
              placeholder="Year"
            />
          </Input.Root>

          {errors?.year && <span className="text-red-500 text-sm">{errors.year[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Technologies</Label>

          <ul className="flex flex-wrap gap-2">
            {techs.map((tech, idx) => (
              <li key={idx} className="flex items-center gap-1 rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">
                {tech}
                <button type="button" onClick={() => removeFromList(techs, setTechs, idx)} aria-label="Remove technology">
                  <X className="size-3 ml-1" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 mt-1">
            <Input.Root className="flex-1">
              <Input.Control
                placeholder="Add technology"
                value={newTech}
                onChange={e => setNewTech(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList(techs, setTechs, newTech, setNewTech) } }}
              />
            </Input.Root>

            <Button type="button" variant="ghost" size="sm" onClick={() => addToList(techs, setTechs, newTech, setNewTech)} disabled={!newTech.trim()}>
              <Plus className="size-4" />
            </Button>
          </div>

          {errors?.techs && <span className="text-red-500 text-sm">{errors.techs[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Features</Label>

          <ul className="flex flex-wrap gap-2">
            {features.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1 rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">
                {item}
                <button type="button" onClick={() => removeFromList(features, setFeatures, idx)} aria-label="Remove feature">
                  <X className="size-3 ml-1" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 mt-1">
            <Input.Root className="flex-1">
              <Input.Control
                placeholder="Add feature"
                value={newFeature}
                onChange={e => setNewFeature(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList(features, setFeatures, newFeature, setNewFeature) } }}
              />
            </Input.Root>

            <Button type="button" variant="ghost" size="sm" onClick={() => addToList(features, setFeatures, newFeature, setNewFeature)} disabled={!newFeature.trim()}>
              <Plus className="size-4" />
            </Button>
          </div>

          {errors?.features && <span className="text-red-500 text-sm">{errors.features[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Challenges</Label>

          <ul className="flex flex-wrap gap-2">
            {challenges.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1 rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">
                {item}
                <button type="button" onClick={() => removeFromList(challenges, setChallenges, idx)} aria-label="Remove challenge">
                  <X className="size-3 ml-1" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 mt-1">
            <Input.Root className="flex-1">
              <Input.Control
                placeholder="Add challenge"
                value={newChallenge}
                onChange={e => setNewChallenge(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList(challenges, setChallenges, newChallenge, setNewChallenge) } }}
              />
            </Input.Root>

            <Button type="button" variant="ghost" size="sm" onClick={() => addToList(challenges, setChallenges, newChallenge, setNewChallenge)} disabled={!newChallenge.trim()}>
              <Plus className="size-4" />
            </Button>
          </div>

          {errors?.challenges && <span className="text-red-500 text-sm">{errors.challenges[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Learnings</Label>

          <ul className="flex flex-wrap gap-2">
            {learnings.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1 rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">
                {item}
                <button type="button" onClick={() => removeFromList(learnings, setLearnings, idx)} aria-label="Remove learning">
                  <X className="size-3 ml-1" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 mt-1">
            <Input.Root className="flex-1">
              <Input.Control
                placeholder="Add learning"
                value={newLearning}
                onChange={e => setNewLearning(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList(learnings, setLearnings, newLearning, setNewLearning) } }}
              />
            </Input.Root>

            <Button type="button" variant="ghost" size="sm" onClick={() => addToList(learnings, setLearnings, newLearning, setNewLearning)} disabled={!newLearning.trim()}>
              <Plus className="size-4" />
            </Button>
          </div>

          {errors?.learnings && <span className="text-red-500 text-sm">{errors.learnings[0]}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Imagem principal</Label>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImagePath('')
                const file = e.target.files[0]
                const reader = new FileReader()
                reader.onload = (ev) => {
                  setPreviewUrl(ev.target?.result as string)
                }
                reader.readAsDataURL(file)
              } else {
                setPreviewUrl(initialData?.image || null)
              }
            }}
          />

          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Selecionar imagem
          </Button>

          {fileInputRef.current?.files?.[0] && (
            <span className="truncate text-sm text-zinc-700 dark:text-zinc-200">
              {fileInputRef.current.files[0].name}
            </span>
          )}

          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mt-2 rounded border object-cover" />
          )}

          {errors?.image && <span className="text-red-500 text-sm">{errors.image[0]}</span>}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="destructive" onClick={() => onOpenChange(false)} disabled={uploading || isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={uploading || isPending}>
            {uploading || isPending
              ? <Loader2 className="animate-spin" />
              : initialData
                ? 'Save'
                : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

'use client'

import { ArrowRight, Edit, ExternalLink, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/button'
import { ConfirmModal } from '@/components/confirm-modal'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useConfirmModal } from '@/hooks/use-confirm-modal'
import { useProjects } from '@/hooks/use-query-data'
import { deleteProject } from '@/http/projects/delete-project'
import { queryClient } from '@/lib/react-query'
import type { Project } from '@/types/project'

import { ProjectModal } from './components/project-modal'

export default function ProjectsPage() {
  const { data: session } = useSession()
  const { data: projects, isLoading: isLoadingProjects } = useProjects()

  const { isOpen, config, confirm, close, handleConfirm } = useConfirmModal()

  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState<Project | null>(null)

  async function handleDeleteProject(id: string) {
    const confirmed = await confirm({
      title: 'Confirmar exclusão',
      description: 'Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita.',
      confirmText: 'Deletar',
      cancelText: 'Cancelar',
      variant: 'delete',
    })

    if (confirmed) {
      await deleteProject(id)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  }

  return (
    <main className="container mx-auto space-y-8 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Projetos</h1>

        {session?.user && (
          <Button
            onClick={() => {
              setEditData(null)
              setModalOpen(true)
            }}
          >
            <span className="sr-only md:not-sr-only">Adicionar</span>
            <Plus className="size-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects && projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm"
          >
            <Image
              src={project.image}
              alt={project.name}
              width={600}
              height={340}
              className="h-48 w-full rounded-md object-cover"
            />

            <div className="flex flex-col items-start gap-2">
              <h2 className="text-xl font-bold text-primary">{project.name}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.techs?.map((tech) => (
                <Badge variant="blue" key={tech}>
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex gap-2">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="primary">
                    Ver detalhes <ArrowRight className="size-4" />
                  </Button>
                </Link>

                <Link href={project.href || ''} target="_blank" rel="noreferrer">
                  <Button variant="link">
                    Live <ExternalLink className="size-4" />
                  </Button>
                </Link>
              </div>

              {session?.user && (
                <div className="flex gap-2">
                  <Button
                    className="text-sm"
                    onClick={() => {
                      setEditData(project)
                      setModalOpen(true)
                    }}
                  >
                    <Edit className="size-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    className="text-sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoadingProjects && (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm"
            >
              <Skeleton className="h-48 w-full rounded-md object-cover" />

              <Skeleton className="h-6" />
              <Skeleton className="h-10" />

              <Skeleton className="h-4" />

              <Skeleton className="h-8" />
            </div>
          ))
        )}
      </div>

      <ProjectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={editData}
      />

      {config && (
        <ConfirmModal
          open={isOpen}
          onOpenChange={close}
          title={config.title}
          description={config.description}
          confirmText={config.confirmText}
          cancelText={config.cancelText}
          variant={config.variant}
          icon={config.icon}
          onConfirm={handleConfirm}
        />
      )}
    </main>
  )
}

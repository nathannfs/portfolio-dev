"use client"

import { ArrowRight, Edit, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"

import { Button } from "@/components/button"
import { ConfirmModal } from "@/components/confirm-modal"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useConfirmModal } from "@/hooks/use-confirm-modal"
import { useProjects } from "@/hooks/use-query-data"
import { deleteProject } from "@/http/projects/delete-project"
import { queryClient } from "@/lib/react-query"
import type { Project } from "@/types/project"

import { ProjectModal } from "./components/project-modal"

export default function ProjectsPage() {
  const { data: session } = useSession()
  const { data: projects, isLoading: isLoadingProjects } = useProjects()

  const { isOpen, config, confirm, close, handleConfirm } = useConfirmModal()

  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState<Project | null>(null)

  async function handleDeleteProject(id: string) {
    const confirmed = await confirm({
      title: "Confirm deletion",
      description:
        "Are you sure you want to delete this project? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "delete",
    })

    if (confirmed) {
      await deleteProject(id)
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    }
  }

  return (
    <main className="container mx-auto space-y-8 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Projects</h1>

        {session?.user && (
          <Button
            onClick={() => {
              setEditData(null)
              setModalOpen(true)
            }}
          >
            <span className="sr-only md:not-sr-only">Add</span>
            <Plus className="size-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <div
            className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            key={project.id}
          >
            <div className="flex flex-col items-start gap-2">
              <h2 className="font-bold text-primary text-xl">{project.name}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.techs?.map((tech) => (
                <Badge key={tech} variant="blue">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex gap-2">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="primary">
                    View Details <ArrowRight className="size-4" />
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
                    className="text-sm"
                    onClick={() => handleDeleteProject(project.id)}
                    variant="destructive"
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoadingProjects &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm"
              key={`skeleton-${index}`}
            >
              <Skeleton className="h-6" />
              <Skeleton className="h-10" />

              <Skeleton className="h-4" />

              <Skeleton className="h-8" />
            </div>
          ))}
      </div>

      <ProjectModal
        initialData={editData}
        onOpenChange={setModalOpen}
        open={modalOpen}
      />

      {config && (
        <ConfirmModal
          cancelText={config.cancelText}
          confirmText={config.confirmText}
          description={config.description}
          icon={config.icon}
          onConfirm={handleConfirm}
          onOpenChange={close}
          open={isOpen}
          title={config.title}
          variant={config.variant}
        />
      )}
    </main>
  )
}

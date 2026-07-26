"use client"

import { motion } from "framer-motion"
import { ArrowRight, Edit, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"

import { Button } from "@/components/button"
import { ConfirmModal } from "@/components/confirm-modal"
import { AuroraCanvas, Magnetic, Reveal } from "@/components/motion"
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
    <main className="container mx-auto space-y-10 px-4 py-12">
      <div className="relative overflow-hidden rounded-2xl border bg-surface-1 px-6 py-10 md:px-10 md:py-14">
        <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10 opacity-70" />

        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-3xl tracking-tight md:text-4xl">
                Projects
              </h1>
              <p className="max-w-xl text-muted-foreground">
                A collection of products I&apos;ve designed, built, and
                shipped — explore the details behind each one.
              </p>
            </div>

            {session?.user && (
              <Magnetic strength={0.25}>
                <Button
                  onClick={() => {
                    setEditData(null)
                    setModalOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              </Magnetic>
            )}
          </div>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project, index) => (
          <Reveal delay={index * 0.08} key={project.id}>
            <motion.div
              className="group flex h-full flex-col gap-4 rounded-xl border bg-surface-1 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-aurora-cyan/30"
              data-cursor="hover"
              whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex flex-col items-start gap-2">
                <h2 className="font-bold text-primary text-xl transition-colors group-hover:text-aurora-cyan">
                  {project.name}
                </h2>
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
                  <Magnetic strength={0.25}>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="primary">
                        View Details <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </Magnetic>
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
            </motion.div>
          </Reveal>
        ))}

        {isLoadingProjects &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              className="flex flex-col gap-4 rounded-xl border bg-surface-1 p-6 shadow-sm"
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

"use client"

import { ArrowUpRight, Edit, Plus, Trash } from "lucide-react"
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

  const total = projects?.length ?? 0

  return (
    <main className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <AuroraCanvas className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] opacity-40" />

      {/* Editorial header */}
      <Reveal>
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Selected Work
          </span>
          <div className="h-px flex-1 bg-border" />
          {total > 0 && (
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
              {String(total).padStart(2, "0")} Projects
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-6">
          <h1 className="max-w-4xl font-bold text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-tighter">
            Products I&apos;ve architected &amp; shipped.
          </h1>

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

        <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg">
          A collection of products I&apos;ve designed, built, and shipped — from
          SaaS platforms to infrastructure tooling. Explore the details behind
          each one.
        </p>
      </Reveal>

      {/* Editorial project index — large full-width rows */}
      <ul className="mt-20 flex flex-col">
        {projects?.map((project, index) => (
          <Reveal key={project.id}>
            <li className="group grid grid-cols-1 gap-6 border-border border-t py-10 transition-colors hover:bg-muted/20 md:grid-cols-12 md:items-start md:gap-8 md:py-14">
              {/* Index + year */}
              <div className="flex items-center justify-between font-mono text-muted-foreground text-xs uppercase tracking-[0.2em] md:col-span-2 md:flex-col md:items-start md:gap-3">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-3">
                  {project.year ?? "2024"}
                  {project.completed && (
                    <span className="text-aurora-cyan md:hidden">Shipped</span>
                  )}
                </span>
                {project.completed && (
                  <span className="hidden text-aurora-cyan md:inline">
                    Shipped
                  </span>
                )}
              </div>

              {/* Name + view link */}
              <div className="flex flex-col gap-5 md:col-span-6">
                <h2 className="font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.02] tracking-tight transition-colors group-hover:text-aurora-cyan">
                  {project.name}
                </h2>

                <Magnetic className="w-fit">
                  <Link
                    className="inline-flex items-center gap-2 border-foreground border-b pb-1 font-semibold text-foreground transition-colors hover:border-aurora-cyan hover:text-aurora-cyan"
                    data-cursor="hover"
                    href={`/projects/${project.id}`}
                  >
                    View details
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Magnetic>

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

              {/* Description + techs */}
              <div className="flex flex-col gap-4 md:col-span-4 md:opacity-70 md:transition-opacity md:group-hover:opacity-100">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techs?.map((tech) => (
                    <Badge key={tech} variant="blue">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </li>
          </Reveal>
        ))}

        {isLoadingProjects &&
          Array.from({ length: 3 }).map((_, index) => (
            <li
              className="grid grid-cols-1 gap-6 border-border border-t py-10 md:grid-cols-12 md:gap-8 md:py-14"
              key={`skeleton-${index}`}
            >
              <div className="md:col-span-2">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex flex-col gap-4 md:col-span-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="flex flex-col gap-3 md:col-span-4">
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-8 w-40" />
              </div>
            </li>
          ))}

        {!isLoadingProjects && total > 0 && (
          <li aria-hidden="true" className="border-border border-t" />
        )}
      </ul>

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

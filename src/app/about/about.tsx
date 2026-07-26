"use client"

import { Edit, Plus, Trash } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

import { Button } from "@/components/button"
import { ConfirmModal } from "@/components/confirm-modal"
import { AuroraCanvas, Reveal } from "@/components/motion"
import { Section } from "@/components/section"
import { Skeleton } from "@/components/ui/skeleton"
import { useConfirmModal } from "@/hooks/use-confirm-modal"
import {
  useAboutMe,
  useCertifications,
  useDegrees,
  useExperiences,
  useHobbies,
} from "@/hooks/use-query-data"
import { deleteAboutMe } from "@/http/about-me/delete-about-me"
import { deleteCertification } from "@/http/certifications/delete-certification"
import { deleteDegree } from "@/http/degrees/delete-degree"
import { deleteExperience } from "@/http/experiences/delete-experience"
import { deleteHobby } from "@/http/hobbies/delete-hobby"
import { queryClient } from "@/lib/react-query"
import type { AboutMe } from "@/types/about-me"
import type { Certificate } from "@/types/certificate"
import type { Degree } from "@/types/degree"
import type { Experience } from "@/types/experiences"
import type { Hobby } from "@/types/hobby"
import { statusColor, statusLabel } from "@/utils/status"

import { AboutMeModal } from "./components/about-me-modal"
import { CertificationModal } from "./components/certifications-modal"
import { DegreeModal } from "./components/degree-modal"
import { ExperienceModal } from "./components/experience-modal"
import { HobbyModal } from "./components/hobby-modal"

export function About() {
  const { data: session } = useSession()

  const { isOpen, config, confirm, close, handleConfirm } = useConfirmModal()

  const [modalExperiencesOpen, setModalExperiencesOpen] = useState(false)
  const [editDataExperiences, setEditDataExperiences] =
    useState<Experience | null>(null)

  const [modalCertificationsOpen, setModalCertificationsOpen] = useState(false)
  const [editDataCertifications, setEditDataCertifications] =
    useState<Certificate | null>(null)

  const [modalDegreesOpen, setModalDegreesOpen] = useState(false)
  const [editDataDegrees, setEditDataDegrees] = useState<Degree | null>(null)

  const [modalHobbiesOpen, setModalHobbiesOpen] = useState(false)
  const [editDataHobbies, setEditDataHobbies] = useState<Hobby | null>(null)

  const [modalAboutMeOpen, setModalAboutMeOpen] = useState(false)
  const [editDataAboutMe, setEditDataAboutMe] = useState<AboutMe | null>(null)

  const { data: experiences, isLoading: isLoadingExperiences } =
    useExperiences()
  const { data: certifications, isLoading: isLoadingCertifications } =
    useCertifications()
  const { data: degrees, isLoading: isLoadingDegrees } = useDegrees()
  const { data: hobbies, isLoading: isLoadingHobbies } = useHobbies()
  const { data: aboutMe, isLoading: isLoadingAboutMe } = useAboutMe()

  async function handleDeleteExperience(id: string) {
    const confirmed = await confirm({
      title: "Confirm deletion",
      description:
        "Are you sure you want to delete this experience? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "delete",
    })

    if (confirmed) {
      await deleteExperience(id)
      queryClient.invalidateQueries({ queryKey: ["experiences"] })
    }
  }

  async function handleDeleteCertification(id: string) {
    const confirmed = await confirm({
      title: "Confirm deletion",
      description:
        "Are you sure you want to delete this certification? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "delete",
    })

    if (confirmed) {
      await deleteCertification(id)
      queryClient.invalidateQueries({ queryKey: ["certifications"] })
    }
  }

  async function handleDeleteDegree(id: string) {
    const confirmed = await confirm({
      title: "Confirm deletion",
      description:
        "Are you sure you want to delete this degree? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "delete",
    })

    if (confirmed) {
      await deleteDegree(id)
      queryClient.invalidateQueries({ queryKey: ["degrees"] })
    }
  }

  async function handleDeleteHobby(id: string) {
    const confirmed = await confirm({
      title: "Confirm deletion",
      description:
        "Are you sure you want to delete this hobby? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "delete",
    })

    if (confirmed) {
      await deleteHobby(id)
      queryClient.invalidateQueries({ queryKey: ["hobbies"] })
    }
  }

  async function handleDeleteAboutMe(id: string) {
    const confirmed = await confirm({
      title: "Confirm deletion",
      description:
        "Are you sure you want to delete this text? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "delete",
    })

    if (confirmed) {
      await deleteAboutMe(id)
      queryClient.invalidateQueries({ queryKey: ["about-me"] })
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-10 px-4 py-10 lg:max-w-7xl">
        <div className="relative isolate w-full overflow-hidden rounded-3xl border bg-surface-1 px-4 py-14 md:py-20">
          <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10" />
          <Section.Header className="space-y-4">
            <Image
              alt="Nathan Santos profile photo"
              className="rounded-full ring-2 ring-aurora-cyan/40 ring-offset-2 ring-offset-surface-1"
              height={120}
              src="/avatar.jpeg"
              width={120}
            />
            <Section.Title as="h1">About Me</Section.Title>

            <Section.Description>
              Product Engineer with a track record of architecting full-stack
              SaaS platforms that solve real business problems. I specialize in
              the TypeScript ecosystem (Next.js, React, Node.js, Supabase),
              building products from zero to production with a focus on
              performance, clean architecture, and developer experience.
            </Section.Description>
          </Section.Header>
        </div>

        <Section.Content className="space-y-10">
          <Reveal className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 font-bold text-foreground text-xl">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-aurora-cyan"
                />
                Education
              </h2>

              {session?.user && (
                <Button
                  onClick={() => {
                    setEditDataDegrees(null)
                    setModalDegreesOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )}
            </div>

            <ul className="space-y-4">
              {degrees?.map((degree) => (
                <li
                  className="flex items-center justify-between gap-6 rounded-xl border bg-surface-1 p-6 transition-all hover:ring-1 hover:ring-aurora-cyan/20"
                  data-cursor="hover"
                  key={degree.title}
                >
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-col gap-2 font-semibold text-foreground md:flex-row md:items-center">
                      {degree.title}

                      {degree.status && (
                        <span
                          className={twMerge([
                            "w-fit rounded bg-secondary px-2 py-0.5 font-medium text-secondary-foreground text-xs",
                            statusColor(degree.status),
                          ])}
                        >
                          {statusLabel(degree.status)}
                        </span>
                      )}
                    </div>

                    {degree.description && (
                      <span className="text-muted-foreground">
                        {degree.description}
                      </span>
                    )}

                    <div className="text-muted-foreground text-sm">
                      {degree.institution}
                    </div>

                    <div className="text-aurora-cyan text-xs">
                      {degree.period}
                    </div>
                  </div>

                  {session?.user && (
                    <div className="flex gap-2">
                      <Button
                        className="text-sm"
                        onClick={() => {
                          setEditDataDegrees(degree)
                          setModalDegreesOpen(true)
                        }}
                      >
                        <Edit className="size-4" />
                      </Button>

                      <Button
                        className="text-sm"
                        onClick={() => handleDeleteDegree(degree.id)}
                        variant="destructive"
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  )}
                </li>
              ))}

              {isLoadingDegrees &&
                Array.from({ length: 2 }).map((_, index) => (
                  <li
                    className="space-y-1.5 rounded-xl border bg-surface-1 p-6"
                    key={`skeleton-degree-${index}`}
                  >
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/2" />
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 font-bold text-foreground text-xl">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-aurora-cyan"
                />
                Courses & Certifications
              </h2>

              {session?.user && (
                <Button
                  onClick={() => {
                    setEditDataCertifications(null)
                    setModalCertificationsOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {certifications?.map((cert) => (
                <div
                  className="space-y-2 rounded-xl border bg-surface-1 p-6 transition-all hover:ring-1 hover:ring-aurora-cyan/20"
                  data-cursor="hover"
                  key={cert.title}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {cert.title}
                    </h3>

                    {session?.user && (
                      <div className="flex gap-2">
                        <Button
                          className="text-sm"
                          onClick={() => {
                            setEditDataCertifications(cert)
                            setModalCertificationsOpen(true)
                          }}
                        >
                          <Edit className="size-4" />
                        </Button>

                        <Button
                          className="text-sm"
                          onClick={() => handleDeleteCertification(cert.id)}
                          variant="destructive"
                        >
                          <Trash className="size-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="text-muted-foreground text-sm">
                    {cert.institution}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-aurora-cyan text-xs">
                      {cert.hours} hours
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${
                        cert.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {statusLabel(cert.status)}
                    </span>
                  </div>
                </div>
              ))}

              {isLoadingCertifications &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="space-y-2 rounded-xl border bg-surface-1 p-6"
                    key={`skeleton-cert-${index}`}
                  >
                    <Skeleton className="h-6" />
                    <Skeleton className="h-6" />
                    <Skeleton className="h-6" />
                  </div>
                ))}
            </div>
          </Reveal>

          <Reveal className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 font-bold text-foreground text-xl">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-aurora-cyan"
                />
                Professional Experience
              </h2>

              {session?.user && (
                <Button
                  onClick={() => {
                    setEditDataExperiences(null)
                    setModalExperiencesOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {experiences?.map((experience) => (
                <div
                  className="space-y-4 rounded-xl border bg-surface-1 p-6 transition-all hover:ring-1 hover:ring-aurora-cyan/20"
                  data-cursor="hover"
                  key={experience.id}
                >
                  <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {experience.position}
                      </h3>
                      <p className="font-medium text-base text-muted-foreground">
                        {experience.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium text-aurora-cyan text-sm">
                        {experience.period}
                      </span>

                      {session?.user && (
                        <div className="flex gap-2">
                          <Button
                            className="text-sm"
                            onClick={() => {
                              setEditDataExperiences(experience)
                              setModalExperiencesOpen(true)
                            }}
                          >
                            <Edit className="size-4" />
                          </Button>

                          <Button
                            className="text-sm"
                            onClick={() =>
                              handleDeleteExperience(experience.id)
                            }
                            variant="destructive"
                          >
                            <Trash className="size-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {experience.description}
                  </p>

                  <ul className="space-y-1.5">
                    {experience.responsibilities.map(
                      (responsibility, index) => (
                        <li
                          className="flex gap-2 text-muted-foreground text-sm"
                          key={`${responsibility}-${index}`}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-full bg-aurora-cyan"
                          />
                          <span>{responsibility}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}

              {isLoadingExperiences &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="space-y-4 rounded-xl border bg-surface-1 p-6"
                    key={`skeleton-exp-${index}`}
                  >
                    <Skeleton className="h-6" />
                    <Skeleton className="h-6" />
                    <Skeleton className="h-6" />
                    <Skeleton className="h-6" />
                  </div>
                ))}
            </div>
          </Reveal>

          <Reveal className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 font-bold text-foreground text-xl">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-aurora-cyan"
                />
                Hobbies & Interests
              </h2>

              {session?.user && (
                <Button
                  onClick={() => {
                    setEditDataHobbies(null)
                    setModalHobbiesOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )}
            </div>

            <ul className="space-y-2 text-base text-muted-foreground">
              {hobbies?.map((hobby) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-xl border bg-surface-1 px-5 py-3 transition-all hover:ring-1 hover:ring-aurora-cyan/20"
                  data-cursor="hover"
                  key={hobby.id}
                >
                  <li className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-aurora-cyan"
                    />
                    {hobby.title}
                  </li>

                  {session?.user && (
                    <div className="flex gap-2">
                      <Button
                        className="text-sm"
                        onClick={() => {
                          setEditDataHobbies(hobby)
                          setModalHobbiesOpen(true)
                        }}
                      >
                        <Edit className="size-4" />
                      </Button>

                      <Button
                        className="text-sm"
                        onClick={() => handleDeleteHobby(hobby.id)}
                        variant="destructive"
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {isLoadingHobbies &&
                Array.from({ length: 4 }).map((_, index) => (
                  <li
                    className="rounded-xl border bg-surface-1 px-5 py-3"
                    key={`skeleton-hobby-${index}`}
                  >
                    <Skeleton className="h-6" />
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 font-bold text-foreground text-xl">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-aurora-cyan"
                />
                More About Me
              </h2>

              {session?.user && (
                <Button
                  onClick={() => {
                    setEditDataAboutMe(null)
                    setModalAboutMeOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4 rounded-xl border bg-surface-1 p-6">
              {aboutMe?.map((about) => {
                const paragraphs = about?.content?.split("\n\n") || []

                return (
                  <div className="group relative" key={about.id}>
                    {paragraphs.map((paragraph) => (
                      <div className="space-y-1.5" key={paragraph}>
                        <p className="text-muted-foreground text-sm">
                          {paragraph}
                        </p>

                        {session?.user && (
                          <div className="flex gap-2">
                            <Button
                              className="px-2 py-1 text-xs"
                              onClick={() => {
                                setEditDataAboutMe(about)
                                setModalAboutMeOpen(true)
                              }}
                              size="sm"
                            >
                              <Edit className="size-4" />
                            </Button>

                            <Button
                              className="px-2 py-1 text-xs"
                              onClick={() => handleDeleteAboutMe(about.id)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash className="size-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}

              {isLoadingAboutMe &&
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton className="h-6" key={`skeleton-about-${index}`} />
                ))}
            </div>
          </Reveal>
        </Section.Content>
      </div>

      <CertificationModal
        initialData={editDataCertifications}
        onOpenChange={setModalCertificationsOpen}
        open={modalCertificationsOpen}
      />

      <DegreeModal
        initialData={editDataDegrees}
        onOpenChange={setModalDegreesOpen}
        open={modalDegreesOpen}
      />

      <ExperienceModal
        initialData={editDataExperiences}
        onOpenChange={setModalExperiencesOpen}
        open={modalExperiencesOpen}
      />

      <HobbyModal
        initialData={editDataHobbies}
        onOpenChange={setModalHobbiesOpen}
        open={modalHobbiesOpen}
      />

      <AboutMeModal
        initialData={editDataAboutMe}
        onOpenChange={setModalAboutMeOpen}
        open={modalAboutMeOpen}
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
    </>
  )
}

"use client"

import { Edit, Plus, Trash } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

import { Button } from "@/components/button"
import { ConfirmModal } from "@/components/confirm-modal"
import { AuroraCanvas, Reveal } from "@/components/motion"
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
import { localize } from "@/i18n/localize"
import { useI18n } from "@/i18n/provider"
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

function SectionLabel({
  children,
  action,
}: {
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <h2 className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
        {children}
      </h2>
      <div className="h-px flex-1 bg-border" />
      {action}
    </div>
  )
}

type AboutInitialData = {
  aboutMe: AboutMe[]
  certifications: Certificate[]
  degrees: Degree[]
  experiences: Experience[]
  hobbies: Hobby[]
}

export function About({ initial }: { initial: AboutInitialData }) {
  const { data: session } = useSession()
  const { locale } = useI18n()

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

  const { data: experiences, isLoading: isLoadingExperiences } = useExperiences(
    initial.experiences
  )
  const { data: certifications, isLoading: isLoadingCertifications } =
    useCertifications(initial.certifications)
  const { data: degrees, isLoading: isLoadingDegrees } = useDegrees(
    initial.degrees
  )
  const { data: hobbies, isLoading: isLoadingHobbies } = useHobbies(
    initial.hobbies
  )
  const { data: aboutMe, isLoading: isLoadingAboutMe } = useAboutMe(
    initial.aboutMe
  )

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
      <main className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <AuroraCanvas className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] opacity-40" />

        {/* Editorial hero */}
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
              About
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="max-w-4xl font-bold text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-tighter">
                About Me
              </h1>
              <p className="mt-8 max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
                Product Engineer with a track record of architecting full-stack
                SaaS platforms that solve real business problems. I specialize
                in the TypeScript ecosystem (Next.js, React, Node.js, Supabase),
                building products from zero to production with a focus on
                performance, clean architecture, and developer experience.
              </p>
            </div>

            <div className="lg:col-span-4">
              <Image
                alt="Nathan Santos profile photo"
                className="aspect-[4/5] w-full max-w-xs rounded-xl object-cover shadow-lg lg:ml-auto"
                height={400}
                sizes="(min-width: 1024px) 30vw, 80vw"
                src="/avatar.jpeg"
                width={320}
              />
            </div>
          </div>
        </Reveal>

        {/* Education */}
        <Reveal className="mt-24 w-full">
          <SectionLabel
            action={
              session?.user && (
                <Button
                  onClick={() => {
                    setEditDataDegrees(null)
                    setModalDegreesOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )
            }
          >
            Education
          </SectionLabel>

          <ul className="flex flex-col">
            {degrees?.map((degree) => (
              <li
                className="group flex items-start justify-between gap-6 border-border border-t py-8 transition-colors hover:bg-muted/20"
                data-cursor="hover"
                key={degree.title}
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-col gap-2 font-bold text-[clamp(1.25rem,2.2vw,1.75rem)] text-foreground leading-tight tracking-tight md:flex-row md:items-center">
                    {localize(
                      degree.title,
                      degree.translations,
                      "title",
                      locale
                    )}

                    {degree.status && (
                      <span
                        className={twMerge([
                          "w-fit whitespace-nowrap rounded-full px-2.5 py-0.5 font-medium text-xs",
                          statusColor(degree.status),
                        ])}
                      >
                        {statusLabel(degree.status)}
                      </span>
                    )}
                  </div>

                  {degree.description && (
                    <span className="text-muted-foreground leading-relaxed">
                      {localize(
                        degree.description,
                        degree.translations,
                        "description",
                        locale
                      )}
                    </span>
                  )}

                  <div className="font-mono text-muted-foreground text-sm">
                    {degree.institution} · {degree.period}
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
                  className="space-y-1.5 border-border border-t py-8"
                  key={`skeleton-degree-${index}`}
                >
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </li>
              ))}

            {!isLoadingDegrees && (degrees?.length ?? 0) > 0 && (
              <li aria-hidden="true" className="border-border border-t" />
            )}
          </ul>
        </Reveal>

        {/* Courses & Certifications */}
        <Reveal className="mt-24 w-full">
          <SectionLabel
            action={
              session?.user && (
                <Button
                  onClick={() => {
                    setEditDataCertifications(null)
                    setModalCertificationsOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )
            }
          >
            Courses &amp; Certifications
          </SectionLabel>

          <ul className="flex flex-col">
            {certifications?.map((cert) => (
              <li
                className="group flex items-start justify-between gap-6 border-border border-t py-6 transition-colors hover:bg-muted/20"
                data-cursor="hover"
                key={cert.title}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-foreground text-lg leading-tight tracking-tight md:text-xl">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-muted-foreground text-sm">
                    {cert.institution} · {cert.hours} hours
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={twMerge([
                      "w-fit whitespace-nowrap rounded-full px-2.5 py-0.5 font-medium text-xs",
                      statusColor(cert.status),
                    ])}
                  >
                    {statusLabel(cert.status)}
                  </span>

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
              </li>
            ))}

            {isLoadingCertifications &&
              Array.from({ length: 4 }).map((_, index) => (
                <li
                  className="space-y-2 border-border border-t py-6"
                  key={`skeleton-cert-${index}`}
                >
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </li>
              ))}

            {!isLoadingCertifications && (certifications?.length ?? 0) > 0 && (
              <li aria-hidden="true" className="border-border border-t" />
            )}
          </ul>
        </Reveal>

        {/* Professional Experience */}
        <Reveal className="mt-24 w-full">
          <SectionLabel
            action={
              session?.user && (
                <Button
                  onClick={() => {
                    setEditDataExperiences(null)
                    setModalExperiencesOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )
            }
          >
            Professional Experience
          </SectionLabel>

          <ul className="flex flex-col">
            {experiences?.map((experience) => (
              <li
                className="group grid grid-cols-1 gap-6 border-border border-t py-10 transition-colors hover:bg-muted/20 md:grid-cols-12 md:gap-8"
                data-cursor="hover"
                key={experience.id}
              >
                <div className="flex flex-col gap-2 md:col-span-5">
                  <h3 className="font-bold text-[clamp(1.5rem,3vw,2.25rem)] text-foreground leading-[1.05] tracking-tight">
                    {experience.position}
                  </h3>
                  <p className="font-medium text-base text-muted-foreground">
                    {experience.company}
                  </p>
                  <span className="font-mono text-muted-foreground text-sm uppercase tracking-[0.15em]">
                    {experience.period}
                  </span>

                  {session?.user && (
                    <div className="mt-2 flex gap-2">
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
                        onClick={() => handleDeleteExperience(experience.id)}
                        variant="destructive"
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 md:col-span-7">
                  <p className="text-muted-foreground leading-relaxed">
                    {localize(
                      experience.description,
                      experience.translations,
                      "description",
                      locale
                    )}
                  </p>

                  <ul className="space-y-2">
                    {localize(
                      experience.responsibilities,
                      experience.translations,
                      "responsibilities",
                      locale
                    ).map((responsibility, index) => (
                      <li
                        className="flex gap-3 text-muted-foreground leading-relaxed"
                        key={`${responsibility}-${index}`}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-aurora-cyan"
                        />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}

            {isLoadingExperiences &&
              Array.from({ length: 4 }).map((_, index) => (
                <li
                  className="grid grid-cols-1 gap-6 border-border border-t py-10 md:grid-cols-12"
                  key={`skeleton-exp-${index}`}
                >
                  <div className="space-y-2 md:col-span-5">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="space-y-2 md:col-span-7">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </li>
              ))}

            {!isLoadingExperiences && (experiences?.length ?? 0) > 0 && (
              <li aria-hidden="true" className="border-border border-t" />
            )}
          </ul>
        </Reveal>

        {/* Hobbies & Interests */}
        <Reveal className="mt-24 w-full">
          <SectionLabel
            action={
              session?.user && (
                <Button
                  onClick={() => {
                    setEditDataHobbies(null)
                    setModalHobbiesOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )
            }
          >
            Hobbies &amp; Interests
          </SectionLabel>

          <ul className="flex flex-col">
            {hobbies?.map((hobby) => (
              <li
                className="group flex items-center justify-between gap-4 border-border border-t py-5 transition-colors hover:bg-muted/20"
                data-cursor="hover"
                key={hobby.id}
              >
                <span className="flex items-center gap-3 font-medium text-foreground text-lg">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-aurora-cyan"
                  />
                  {hobby.title}
                </span>

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
              </li>
            ))}

            {isLoadingHobbies &&
              Array.from({ length: 4 }).map((_, index) => (
                <li
                  className="border-border border-t py-5"
                  key={`skeleton-hobby-${index}`}
                >
                  <Skeleton className="h-6 w-1/3" />
                </li>
              ))}

            {!isLoadingHobbies && (hobbies?.length ?? 0) > 0 && (
              <li aria-hidden="true" className="border-border border-t" />
            )}
          </ul>
        </Reveal>

        {/* More About Me */}
        <Reveal className="mt-24 w-full">
          <SectionLabel
            action={
              session?.user && (
                <Button
                  onClick={() => {
                    setEditDataAboutMe(null)
                    setModalAboutMeOpen(true)
                  }}
                >
                  <span className="sr-only md:not-sr-only">Add</span>
                  <Plus className="size-4" />
                </Button>
              )
            }
          >
            More About Me
          </SectionLabel>

          <div className="flex flex-col gap-8">
            {aboutMe?.map((about) => {
              const content = localize(
                about.content,
                about.translations,
                "content",
                locale
              )
              const paragraphs = content?.split("\n\n") || []

              return (
                <div className="group relative flex flex-col gap-4" key={about.id}>
                  {paragraphs.map((paragraph) => (
                    <p
                      className="max-w-3xl text-base text-muted-foreground leading-relaxed md:text-lg"
                      key={paragraph}
                    >
                      {paragraph}
                    </p>
                  ))}

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
              )
            })}

            {isLoadingAboutMe &&
              Array.from({ length: 2 }).map((_, index) => (
                <Skeleton className="h-6" key={`skeleton-about-${index}`} />
              ))}
          </div>
        </Reveal>
      </main>

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

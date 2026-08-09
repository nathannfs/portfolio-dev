import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { getAboutMe } from "@/http/about-me/get-about-me"
import { getCertifications } from "@/http/certifications/get-certifications"
import { getDegrees } from "@/http/degrees/get-degrees"
import { getExperiences } from "@/http/experiences/get-experiences"
import { getHobbies } from "@/http/hobbies/get-hobbies"
import { getProjects } from "@/http/projects/get-projects"
import type { AboutMe } from "@/types/about-me"
import type { Certificate } from "@/types/certificate"
import type { Degree } from "@/types/degree"
import type { Experience } from "@/types/experiences"
import type { Hobby } from "@/types/hobby"
import type { Project } from "@/types/project"

/**
 * Every hook accepts `initialData` so a Server Component can hand over rows it
 * already read from the database. Without it the first paint is empty and the
 * content only exists after the browser fetches, which leaves crawlers with a
 * blank page.
 */

const shared = {
  staleTime: 1000 * 60,
  placeholderData: keepPreviousData,
  refetchOnWindowFocus: true,
  refetchInterval: 1000 * 20,
  refetchIntervalInBackground: false,
} as const

export const useCertifications = (initialData?: Certificate[]) =>
  useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
    initialData,
    ...shared,
  })

export const useDegrees = (initialData?: Degree[]) =>
  useQuery({
    queryKey: ["degrees"],
    queryFn: getDegrees,
    initialData,
    ...shared,
  })

export const useHobbies = (initialData?: Hobby[]) =>
  useQuery({
    queryKey: ["hobbies"],
    queryFn: getHobbies,
    initialData,
    ...shared,
  })

export const useAboutMe = (initialData?: AboutMe[]) =>
  useQuery({
    queryKey: ["about-me"],
    queryFn: getAboutMe,
    initialData,
    ...shared,
  })

export const useExperiences = (initialData?: Experience[]) =>
  useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
    initialData,
    ...shared,
  })

export const useProjects = (initialData?: Project[]) =>
  useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    initialData,
    ...shared,
  })

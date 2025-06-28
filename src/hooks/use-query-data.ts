import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAboutMe } from '@/http/about-me/get-about-me'
import { getCertifications } from '@/http/certifications/get-certifications'
import { getDegrees } from '@/http/degrees/get-degrees'
import { getExperiences } from '@/http/experiences/get-experiences'
import { getHobbies } from '@/http/hobbies/get-hobbies'

export const useCertifications = () => {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
    staleTime: 1000 * 60, // 60 seconds
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 20, // 20 seconds
    refetchIntervalInBackground: false,
  })
}

export const useDegrees = () => {
  return useQuery({
    queryKey: ['degrees'],
    queryFn: getDegrees,
    staleTime: 1000 * 60, // 60 seconds
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 20, // 20 seconds
    refetchIntervalInBackground: false,
  })
}

export const useHobbies = () => {
  return useQuery({
    queryKey: ['hobbies'],
    queryFn: getHobbies,
    staleTime: 1000 * 60, // 60 seconds
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 20, // 20 seconds
    refetchIntervalInBackground: false,
  })
}

export const useAboutMe = () => {
  return useQuery({
    queryKey: ['about-me'],
    queryFn: getAboutMe,
    staleTime: 1000 * 60, // 60 seconds
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 20, // 20 seconds
    refetchIntervalInBackground: false,
  })
}

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  })
}

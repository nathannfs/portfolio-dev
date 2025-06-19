import type { ReactNode } from 'react'

import { Css3 } from '@/components/icons/css'
import { Expo } from '@/components/icons/expo'
import { Figma } from '@/components/icons/figma'
import { Git } from '@/components/icons/git'
import { Github } from '@/components/icons/github'
import { Html5 } from '@/components/icons/html'
import { Javascript } from '@/components/icons/javascript'
import { Nextjs } from '@/components/icons/nextjs'
import { React } from '@/components/icons/react'
import { ReactNative } from '@/components/icons/react-native'
import { Tailwindcss } from '@/components/icons/tailwindcss'
import { Typescript } from '@/components/icons/typescript'

interface TechsProps {
  name: string
  icon: ReactNode
}

export const techs: TechsProps[] = [
  {
    name: 'HTML',
    icon: <Html5 />,
  },
  {
    name: 'CSS',
    icon: <Css3 />,
  },
  {
    name: 'JavaScript',
    icon: <Javascript />,
  },
  {
    name: 'TypeScript',
    icon: <Typescript />,
  },
  {
    name: 'React',
    icon: <React />,
  },
  {
    name: 'Next.js',
    icon: <Nextjs />,
  },
  {
    name: 'Tailwind CSS',
    icon: <Tailwindcss />,
  },
  {
    name: 'Git',
    icon: <Git />,
  },
  {
    name: 'GitHub',
    icon: <Github />,
  },
  {
    name: 'Figma',
    icon: <Figma />,
  },
  {
    name: 'React Native',
    icon: <ReactNative />,
  },
  {
    name: 'Expo',
    icon: <Expo />,
  },
]

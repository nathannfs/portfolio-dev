import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Header } from '@/components/header'

import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Nathan Santos | Mid-Level Product Engineer',
  description:
    'Product Engineer specializing in TypeScript, Next.js, and scalable SaaS architecture. Building products that ship fast and scale to millions.',
  metadataBase: new URL('https://nathannfs.com'),
  openGraph: {
    title: 'Nathan Santos | Mid-Level Product Engineer',
    description:
      'Product Engineer specializing in TypeScript, Next.js, and scalable SaaS architecture. Building products that ship fast and scale to millions.',
    url: 'https://nathannfs.com',
    siteName: 'Nathan Santos — Product Engineer',
    images: [
      {
        url: '/nathan.jpeg',
        width: 800,
        height: 800,
        alt: 'Nathan Santos — Mid-Level Product Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nathan Santos | Mid-Level Product Engineer',
    description:
      'Product Engineer specializing in TypeScript, Next.js, and scalable SaaS architecture.',
    site: '@nathannfs',
    creator: '@nathannfs',
    images: ['/nathan.jpeg'],
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/icon.png',
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  applicationName: 'Nathan Santos — Product Engineer',
  generator: 'Next.js',
  keywords: [
    'Nathan Santos',
    'Product Engineer',
    'Mid-Level Developer',
    'TypeScript',
    'Next.js',
    'React',
    'Node.js',
    'Supabase',
    'SaaS Architecture',
    'Full Stack Engineer',
    'Frontend',
    'Backend',
    'Web Developer',
    'React 19',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Nathan Santos', url: 'https://nathannfs.com' }],
  creator: 'Nathan Santos',
  publisher: 'Nathan Santos',
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="canonical" href="https://nathannfs.com/" />
        <meta name="author" content="Nathan Santos" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="copyright" content="© 2025 Nathan Santos" />
      </head>
      <body
        className={twMerge([
          inter.className,
          'bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50',
        ])}
      >
        <Providers>
          <Header />
          <main className="pt-[80px]">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

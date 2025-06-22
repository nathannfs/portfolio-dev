import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Head from 'next/head'
import { twMerge } from 'tailwind-merge'

import { Header } from '@/components/header'

import Providers from './providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Nathan Santos | Portfolio',
  description: 'Portfolio Web - Nathan Santos',
  metadataBase: new URL('https://nathannfs-dev.vercel.app'),
  openGraph: {
    title: 'Nathan Santos | Portfolio',
    description: 'Portfolio Web - Nathan Santos',
    url: 'https://nathannfs-dev.vercel.app',
    siteName: 'Nathan Santos Portfolio',
    images: [
      {
        url: '/nathan.jpeg',
        width: 800,
        height: 800,
        alt: 'Nathan Santos',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nathan Santos | Portfolio',
    description: 'Portfolio Web - Nathan Santos',
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
  applicationName: 'Nathan Santos Portfolio',
  generator: 'Next.js',
  keywords: [
    'Nathan Santos',
    'Portfolio',
    'Full Stack',
    'Desenvolvedor',
    'Next.js',
    'React',
    'Node.js',
    'Frontend',
    'Backend',
    'Web Developer',
    'Dev',
  ],
  authors: [{ name: 'Nathan Santos', url: 'https://nathannfs-dev.vercel.app' }],
  creator: 'Nathan Santos',
  publisher: 'Nathan Santos',
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="canonical" href="https://nathannfs-dev.vercel.app/" />
        <meta name="author" content="Nathan Santos" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="copyright" content="© 2024 Nathan Santos" />
      </Head>
      <body
        className={twMerge([
          roboto.className,
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

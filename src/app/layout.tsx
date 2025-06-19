import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
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
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/icon.png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={twMerge([
          roboto.className,
          'bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50',
        ])}
      >
        <Providers>
          <div className="grid h-screen w-full grid-rows-[80px_1fr]">
            <Header />

            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

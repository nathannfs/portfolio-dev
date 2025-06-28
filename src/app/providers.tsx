'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { type ReactNode, useEffect, useState } from 'react'

import { PageLoader } from '@/components/page-loader'
import { queryClient } from '@/lib/react-query'

import { ThemeProvider } from '../components/theme/theme-provider'

export default function Providers({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [pathname])
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <PageLoader show={loading} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PageLoader } from '@/components/page-loader'

import { ThemeProvider } from '../components/theme/theme-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [pathname])
  return (
    <>
      <PageLoader show={loading} />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  )
}

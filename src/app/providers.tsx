"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react"
import { type ReactNode, useEffect, useState } from "react"

import { PageLoader } from "@/components/page-loader"
import type { Locale } from "@/i18n/config"
import { LocaleProvider } from "@/i18n/provider"
import { queryClient } from "@/lib/react-query"

import { ThemeProvider } from "../components/theme/theme-provider"

export default function Providers({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  const [loading, setLoading] = useState(false)

  const _pathname = usePathname()

  useEffect(() => {
    setTimeout(() => setLoading(true), 0)
    const timeout = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <PageLoader show={loading} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <LocaleProvider locale={locale}>{children}</LocaleProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

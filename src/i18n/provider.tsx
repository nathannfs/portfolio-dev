"use client"

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { defaultLocale, type Locale, locales } from "./config"
import { messages } from "./messages"

const COOKIE_NAME = "NEXT_LOCALE"
const STORAGE_KEY = "NEXT_LOCALE"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type TFn = (path: string, vars?: Record<string, string | number>) => string

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TFn
  /** Resolve a dotted key to its raw value (arrays, objects, etc.). */
  tRaw: (path: string) => unknown
}

const I18nContext = createContext<I18nContextValue | null>(null)

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") {
    return null
  }
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
  const value = match?.split("=")[1]
  return isLocale(value) ? value : null
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null
  }
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isLocale(value) ? value : null
  } catch {
    return null
  }
}

/** Resolve a dotted key path against a messages object. */
function resolve(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, source)
}

function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) {
    return template
  }
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  )
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Start from the SSR default to avoid hydration mismatch; switch after mount.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const persisted = readCookieLocale() ?? readStoredLocale()
    if (persisted && persisted !== defaultLocale) {
      setLocaleState(persisted)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${COOKIE_MAX_AGE}`
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [])

  const tRaw = useCallback(
    (path: string): unknown => {
      const current = resolve(messages[locale], path)
      if (current !== undefined) {
        return current
      }
      return resolve(messages[defaultLocale], path)
    },
    [locale]
  )

  const t = useCallback<TFn>(
    (path, vars) => {
      const value = tRaw(path)
      if (typeof value === "string") {
        return interpolate(value, vars)
      }
      // Missing or non-string key: fall back to the key itself for visibility.
      return path
    },
    [tRaw]
  )

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, tRaw }),
    [locale, setLocale, t, tRaw]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within a LocaleProvider")
  }
  return ctx
}

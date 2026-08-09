import type { Locale } from "./config"

type Translations = Record<string, unknown> | null | undefined

/**
 * Returns the localized value for a DB field. The base column holds English
 * (the default); `translations` holds pt-BR overrides keyed by field name.
 * Falls back to the base value when a translation is missing or empty.
 */
export function localize<T extends string | string[]>(
  base: T,
  translations: Translations,
  field: string,
  locale: Locale
): T {
  if (locale === "en") {
    return base
  }

  const value = translations?.[field]

  if (Array.isArray(base)) {
    return (Array.isArray(value) && value.length > 0 ? value : base) as T
  }

  return (typeof value === "string" && value.trim().length > 0
    ? value
    : base) as T
}

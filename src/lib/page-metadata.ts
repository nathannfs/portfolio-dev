import { headers } from "next/headers"

import type { Locale } from "@/i18n/config"

/**
 * Page titles and descriptions have to follow the URL's language too.
 * Without this, /pt/about ships an English title while hreflang claims it is
 * the Portuguese version, and the two pages read as duplicates.
 */
export async function currentLocale(): Promise<Locale> {
  const requestHeaders = await headers()
  return requestHeaders.get("x-locale") === "pt-BR" ? "pt-BR" : "en"
}

type Localized = { en: string; "pt-BR": string }

export async function localizedMetadata(copy: {
  title: Localized
  description: Localized
}) {
  const locale = await currentLocale()
  return {
    title: copy.title[locale],
    description: copy.description[locale],
  }
}

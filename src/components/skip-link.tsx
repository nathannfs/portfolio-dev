"use client"

import { useI18n } from "@/i18n/provider"

export function SkipLink() {
  const { t } = useI18n()

  return (
    <a
      className="sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:font-medium focus:text-foreground focus:shadow-md focus:ring-2 focus:ring-sky-500 focus:not-sr-only"
      href="#main-content"
    >
      {t("common.skipLink")}
    </a>
  )
}

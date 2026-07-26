"use client"

import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

import type { Locale } from "@/i18n/config"
import { useI18n } from "@/i18n/provider"

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "pt-BR", label: "PT" },
]

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n()

  return (
    <div
      aria-label="Language"
      className={twMerge(
        "inline-flex items-center gap-0.5 rounded-full border border-border/60 bg-surface-1/60 p-0.5",
        className
      )}
      role="group"
    >
      {options.map((option) => {
        const active = locale === option.value
        return (
          <button
            aria-label={
              option.value === "en"
                ? "Switch to English"
                : "Mudar para Português"
            }
            aria-pressed={active}
            className="relative rounded-full px-2.5 py-1 font-mono font-medium text-xs transition-colors"
            key={option.value}
            onClick={() => setLocale(option.value)}
            type="button"
          >
            {active && (
              <motion.span
                className="absolute inset-0 rounded-full bg-aurora-cyan/[0.14] ring-1 ring-aurora-cyan/25"
                layoutId="locale-active"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={twMerge(
                "relative z-10 transition-colors",
                active
                  ? "text-aurora-cyan"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

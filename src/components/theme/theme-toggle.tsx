"use client"

import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useI18n } from "@/i18n/provider"

import { Button } from "../button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const { t } = useI18n()

  return (
    <motion.div
      className="flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.97 }}
    >
      <Button
        aria-label={t("common.toggleTheme")}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant="ghost"
      >
        <Sun className="block dark:hidden" />
        <Moon className="hidden dark:block" />
      </Button>
    </motion.div>
  )
}

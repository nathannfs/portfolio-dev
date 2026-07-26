"use client"

import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <motion.div
      className="flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.97 }}
    >
      <Button
        aria-label="Alternar tema claro/escuro"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant="ghost"
      >
        <Sun className="block dark:hidden" />
        <Moon className="hidden dark:block" />
      </Button>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '../button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center">
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === 'dark'
          ? 'light'
          : 'dark')}
      >
        <Sun className="block dark:hidden" />
        <Moon className="hidden dark:block" />
        <span className="sr-only">Mudar tema</span>
      </Button>
    </motion.div>
  )
}

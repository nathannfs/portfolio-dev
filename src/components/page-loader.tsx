'use client'

import { motion } from 'framer-motion'

export function PageLoader({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-background/80">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <svg
          className="h-12 w-12 animate-spin text-sky-500"
          viewBox="0 0 50 50"
        >
          <circle
            className="opacity-20"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
          />
          <circle
            className="opacity-80"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeDasharray="90 150"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}

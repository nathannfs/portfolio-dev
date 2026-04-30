"use client"

import { motion } from "framer-motion"

export function PageLoader({ show }: { show: boolean }) {
  if (!show) {
    return null
  }
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-background/80">
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center"
        exit={{ scale: 0.8, opacity: 0 }}
        initial={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          className="h-12 w-12 animate-spin text-sky-500"
          viewBox="0 0 50 50"
        >
          <title>Loading...</title>
          <circle
            className="opacity-20"
            cx="25"
            cy="25"
            fill="none"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
          />
          <circle
            className="opacity-80"
            cx="25"
            cy="25"
            fill="none"
            r="20"
            stroke="currentColor"
            strokeDasharray="90 150"
            strokeLinecap="round"
            strokeWidth="5"
          />
        </svg>
      </motion.div>
    </div>
  )
}

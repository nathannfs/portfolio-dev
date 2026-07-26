"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { useEffect, useState } from "react"

import { isCoarsePointer } from "@/hooks/use-reduced-motion-safe"

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 })
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (reduced || isCoarsePointer()) {
      return
    }
    setEnabled(true)

    function onMove(e: PointerEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement
      setHovering(Boolean(el.closest('a, button, [data-cursor="hover"]')))
    }

    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduced, x, y])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
      style={{ x: rx, y: ry }}
    >
      <motion.div
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.4 : 0.8 }}
        className="-translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border border-aurora-cyan"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  )
}

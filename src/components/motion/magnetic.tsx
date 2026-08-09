"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { type ReactNode, useRef } from "react"

import { isCoarsePointer } from "@/hooks/use-reduced-motion-safe"

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const disabled = reduced || isCoarsePointer()

  function onMove(e: React.PointerEvent) {
    if (disabled || !ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      onPointerLeave={reset}
      onPointerMove={onMove}
      ref={ref}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  )
}

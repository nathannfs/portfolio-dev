"use client"

import { type MotionValue, useScroll } from "framer-motion"
import type { RefObject } from "react"

export function useScrollProgress(
  ref: RefObject<HTMLElement>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  return scrollYProgress
}

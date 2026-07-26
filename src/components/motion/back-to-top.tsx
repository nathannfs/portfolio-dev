"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

import { useI18n } from "@/i18n/provider"

import { useLenis } from "./smooth-scroll"

export function BackToTop() {
  const lenis = useLenis()
  const { t } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 600)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function toTop() {
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          animate={{ opacity: 1, scale: 1 }}
          aria-label={t("common.backToTop")}
          className="fixed right-6 bottom-6 z-[90] flex size-11 items-center justify-center rounded-full border border-aurora-cyan/40 bg-surface-2/80 text-foreground shadow-lg backdrop-blur transition-colors hover:border-aurora-cyan hover:text-aurora-cyan"
          exit={{ opacity: 0, scale: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          onClick={toTop}
          type="button"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

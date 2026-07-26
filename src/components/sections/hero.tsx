"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { AuroraCanvas, useLenis } from "@/components/motion"
import { useI18n } from "@/i18n/provider"

const socials = [
  { label: "GitHub", short: "GH", href: "https://github.com/nathannfs" },
  { label: "LinkedIn", short: "LI", href: "https://linkedin.com/in/nathannfs" },
  { label: "Instagram", short: "IG", href: "https://instagram.com/nathannfss" },
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const { t } = useI18n()

  const { scrollY } = useScroll()
  const nameY = useTransform(scrollY, [0, 700], [0, 120])
  const annotationY = useTransform(scrollY, [0, 700], [0, 40])

  const [displayText, setDisplayText] = useState("")
  const fullText = t("hero.tagline")

  useEffect(() => {
    setDisplayText("")
    let index = 0
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1))
      index++
      if (index > fullText.length) {
        clearInterval(interval)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [fullText])

  function scrollToWork() {
    const element = document.getElementById("project")
    if (!element) {
      return
    }
    if (lenis) {
      lenis.scrollTo(element, { offset: -80 })
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section
      className="relative flex min-h-[calc(100vh-80px)] flex-col justify-center overflow-hidden px-6 pt-28 pb-16 md:px-10 lg:px-16"
      id="home"
      ref={ref}
    >
      <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10" />

      {/* Availability pill */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 font-medium text-green-600 text-xs dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {t("common.availability")}
        </div>
      </motion.div>

      {/* Massive typographic statement */}
      <motion.h1
        className="font-bold text-[clamp(4rem,16vw,18rem)] leading-[0.85] tracking-tighter"
        style={{ y: nameY }}
      >
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="block"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Nathan
        </motion.span>
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="block text-muted-foreground"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Santos
        </motion.span>
      </motion.h1>

      {/* Offset annotation + socials */}
      <motion.div
        className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        style={{ y: annotationY }}
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md md:ml-[8vw]"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <p className="font-semibold text-foreground text-sm uppercase tracking-[0.2em]">
            {t("hero.role")}
          </p>
          <p className="mt-2 min-h-[24px] font-mono text-muted-foreground text-sm md:text-base">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        {/* Corner social text-links */}
        <motion.nav
          animate={{ opacity: 1 }}
          aria-label={t("hero.socialLinks")}
          className="flex items-center gap-5 font-mono text-sm"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {socials.map((s) => (
            <Link
              aria-label={`${s.label} — Nathan Santos`}
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-aurora-cyan hover:underline"
              href={s.href}
              key={s.short}
              rel="noreferrer"
              target="_blank"
            >
              {s.short}
            </Link>
          ))}
        </motion.nav>
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.button
        animate={{ opacity: 1 }}
        aria-label={t("hero.scrollToWork")}
        className="mt-14 inline-flex w-fit items-center gap-2 font-mono text-muted-foreground text-xs uppercase tracking-[0.2em] transition-colors hover:text-foreground"
        initial={{ opacity: 0 }}
        onClick={scrollToWork}
        transition={{ duration: 0.6, delay: 0.7 }}
        type="button"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
        {t("common.scrollCue")}
      </motion.button>
    </section>
  )
}

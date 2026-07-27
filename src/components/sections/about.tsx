"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

import { Magnetic, Reveal } from "@/components/motion"
import { useCertifications, useDegrees } from "@/hooks/use-query-data"
import { useI18n } from "@/i18n/provider"
import { normalizeStatus, statusColor } from "@/utils/status"

export function About() {
  const { data: certificates } = useCertifications()
  const { data: degrees } = useDegrees()
  const { t } = useI18n()

  const credentials = [
    ...(degrees?.map((d) => ({
      title: d.title,
      meta: d.institution,
      period: d.period,
      status: d.status,
    })) ?? []),
    ...(certificates?.slice(0, 2).map((c) => ({
      title: c.title,
      meta: c.institution,
      period: `${c.hours} ${t("about.hoursSuffix")}`,
      status: c.status,
    })) ?? []),
  ]

  return (
    <section
      className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:scroll-mt-0 md:px-10 md:py-32 lg:px-16"
      id="about"
    >
      {/* Big label */}
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
            {t("about.label")}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Statement paragraph — large */}
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-bold text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
              {t("about.heading")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg">
              {t("about.paragraph1")}
            </p>
            <p className="mt-4 max-w-xl font-medium text-base text-foreground leading-relaxed md:text-lg">
              {t("about.paragraph2")}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <Magnetic className="mt-8 w-fit">
              <Link
                className="inline-flex items-center gap-2 border-foreground border-b pb-1 font-semibold text-foreground transition-colors hover:border-aurora-cyan hover:text-aurora-cyan"
                href="/about"
              >
                {t("about.moreAboutMe")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        {/* Offset photo column — breaks the grid */}
        <div className="lg:col-span-5">
          <motion.div
            className="relative lg:-mt-16 lg:translate-x-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="Nathan Santos — Product Engineer"
              className="aspect-[4/5] w-full max-w-sm rounded-xl object-cover shadow-lg lg:ml-auto"
              height={640}
              sizes="(min-width: 1024px) 40vw, 90vw"
              src="/nathan.jpeg"
              width={512}
            />
            <span className="mt-3 block text-right font-mono text-muted-foreground text-xs">
              {t("contact.location")}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Credentials — secondary editorial rows */}
      {credentials.length > 0 && (
        <Reveal delay={0.1}>
          <div className="mt-20 border-border border-t pt-10">
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
              {t("about.education")}
            </span>
            <ul className="mt-6 flex flex-col">
              {credentials.map((c) => (
                <li
                  className="flex flex-col gap-2 border-border border-b py-5 md:flex-row md:items-center md:justify-between"
                  key={c.title}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-foreground text-lg">
                      {c.title}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {c.meta} · {c.period}
                    </span>
                  </div>
                  <span
                    className={twMerge([
                      "w-fit whitespace-nowrap rounded-full px-2.5 py-0.5 font-medium text-xs",
                      statusColor(c.status),
                    ])}
                  >
                    {c.status ? t(`common.status.${normalizeStatus(c.status)}`) : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  )
}

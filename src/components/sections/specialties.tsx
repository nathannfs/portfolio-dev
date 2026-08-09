"use client"

import { Reveal } from "@/components/motion"
import { useI18n } from "@/i18n/provider"
import { specialties } from "@/utils/specialities"

interface SpecialtyText {
  title: string
  description: string
}

export function Specialties() {
  const { t, tRaw } = useI18n()
  const texts = (tRaw("expertise.items") as SpecialtyText[] | undefined) ?? []

  return (
    <section
      className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:scroll-mt-0 md:px-10 md:py-32 lg:px-16"
      id="specialties"
    >
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
            {t("expertise.label")}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="max-w-3xl font-bold text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
          {t("expertise.statement")}
        </h2>
      </Reveal>

      <ul className="mt-16 flex flex-col">
        {specialties.map((item, idx) => {
          const title = texts[idx]?.title ?? item.title
          const description = texts[idx]?.description ?? item.description
          return (
            <Reveal key={item.title}>
              <li className="group grid grid-cols-1 gap-4 border-border border-t py-8 transition-colors hover:bg-muted/20 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
                <span className="font-mono text-muted-foreground text-sm md:col-span-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-4 md:col-span-6">
                  <span className="text-muted-foreground transition-colors group-hover:text-aurora-cyan">
                    {item.icon}
                  </span>
                  <h3 className="font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] tracking-tight">
                    {title}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed md:col-span-5 md:opacity-70 md:transition-opacity md:group-hover:opacity-100">
                  {description}
                </p>
              </li>
            </Reveal>
          )
        })}
        <li aria-hidden="true" className="border-border border-t" />
      </ul>
    </section>
  )
}

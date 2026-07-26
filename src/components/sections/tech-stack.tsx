"use client"

import { twMerge } from "tailwind-merge"

import { Reveal } from "@/components/motion"
import { useI18n } from "@/i18n/provider"
import { techGroups } from "@/utils/techs"

export function TechStack() {
  const { t } = useI18n()

  return (
    <section
      className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:scroll-mt-0 md:px-10 md:py-32 lg:px-16"
      id="techs"
    >
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
            {t("stack.label")}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="max-w-3xl font-bold text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
          {t("stack.heading")}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
          {t("stack.highlightNote")}
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col">
        {techGroups.map((group) => (
          <Reveal key={group.category}>
            <div className="grid grid-cols-1 gap-6 border-border border-t py-10 md:grid-cols-12 md:gap-8">
              <h3 className="font-bold text-2xl tracking-tight md:col-span-4 md:text-3xl">
                {t(`stack.categories.${group.category}`)}
              </h3>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-8">
                {group.items.map((tech) => (
                  <li
                    className={twMerge(
                      "group inline-flex items-center gap-2.5 font-semibold text-xl transition-colors md:text-2xl",
                      tech.featured
                        ? "text-aurora-cyan"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    key={tech.name}
                  >
                    <span
                      className={twMerge(
                        "shrink-0 text-2xl",
                        tech.featured
                          ? "opacity-100"
                          : "opacity-60 transition-opacity group-hover:opacity-100"
                      )}
                    >
                      {tech.icon}
                    </span>
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <div aria-hidden="true" className="border-border border-t" />
      </div>
    </section>
  )
}

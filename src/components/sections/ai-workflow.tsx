"use client"

import { Reveal } from "@/components/motion"
import { useI18n } from "@/i18n/provider"

interface Practice {
  title: string
  description: string
}

export function AiWorkflow() {
  const { t, tRaw } = useI18n()
  const practices = (tRaw("aiWorkflow.items") as Practice[] | undefined) ?? []

  if (practices.length === 0) {
    return null
  }

  return (
    <section
      className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-24 md:scroll-mt-0 md:px-10 md:py-32 lg:px-16"
      id="ai-workflow"
    >
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
            {t("aiWorkflow.label")}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="max-w-3xl font-bold text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
          {t("aiWorkflow.statement")}
        </h2>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        {practices.map((practice, index) => (
          <Reveal key={practice.title}>
            <li className="flex h-full flex-col gap-3 border-border border-t pt-6">
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-xl leading-snug tracking-tight">
                {practice.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {practice.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

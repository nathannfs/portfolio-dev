import Link from "next/link"

import { AuroraCanvas, Magnetic, Reveal } from "@/components/motion"

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10" />

      <Reveal>
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-bold text-7xl text-aurora-cyan tracking-tight md:text-9xl">
            404
          </h1>

          <p className="max-w-md text-lg text-muted-foreground">
            Esta página se perdeu na aurora. O caminho que você procura não
            existe por aqui.
          </p>

          <Magnetic strength={0.25}>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-aurora-cyan/40 bg-surface-1 px-6 py-3 font-semibold text-aurora-cyan shadow-sm outline-none transition-all duration-150 hover:border-aurora-cyan hover:bg-surface-2 focus-visible:ring-4 focus-visible:ring-aurora-cyan/30"
              data-cursor="hover"
              href="/"
            >
              Voltar para o início
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </main>
  )
}

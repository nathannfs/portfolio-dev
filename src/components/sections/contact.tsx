"use client"

import { Github, Linkedin, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { Magnetic, Reveal } from "@/components/motion"

import { Footer } from "../footer"
import { ContactForm } from "../form/contact-form"

const channels = [
  {
    icon: Phone,
    label: "+55 (16) 99143-7961",
    href: "tel:+5516991437961",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/nathannfs",
    href: "https://linkedin.com/in/nathannfs",
    external: true,
  },
  {
    icon: Github,
    label: "github.com/nathannfs",
    href: "https://github.com/nathannfs",
    external: true,
  },
]

export function Contact() {
  return (
    <section
      className="relative flex scroll-mt-20 flex-col justify-between md:scroll-mt-0"
      id="contact"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.3em]">
              Contact
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <h2 className="font-bold text-[clamp(2.5rem,9vw,8rem)] leading-[0.9] tracking-tighter">
            Let&apos;s build
            <br />
            <span className="text-muted-foreground">something</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Email as a large link + channels */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="max-w-md text-base text-muted-foreground leading-relaxed md:text-lg">
                Interested in working together, have a project idea, or just
                want to talk about engineering? Reach out through any channel
                below or send a message.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Magnetic className="mt-8 w-fit">
                <a
                  className="inline-block break-all font-bold text-[clamp(1.5rem,4vw,2.75rem)] leading-tight tracking-tight transition-colors hover:text-aurora-cyan"
                  href="mailto:nathann.santoss2@gmail.com"
                >
                  nathann.santoss2@gmail.com
                </a>
              </Magnetic>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-10 flex flex-col">
                {channels.map((c) => {
                  const Icon = c.icon
                  const inner = (
                    <>
                      <Icon className="size-5 text-aurora-cyan" />
                      <span className="group-hover:underline">{c.label}</span>
                    </>
                  )
                  return (
                    <li
                      className="border-border border-t py-4 last:border-b"
                      key={c.label}
                    >
                      {c.external ? (
                        <Link
                          className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                          href={c.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {inner}
                        </Link>
                      ) : (
                        <a
                          className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                          href={c.href}
                        >
                          {inner}
                        </a>
                      )}
                    </li>
                  )
                })}
                <li className="flex items-center gap-3 border-border border-b py-4 text-muted-foreground">
                  <MapPin className="size-5 text-aurora-cyan" />
                  Sertãozinho, SP — Brazil
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-8">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}

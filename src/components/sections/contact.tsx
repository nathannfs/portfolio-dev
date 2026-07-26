import { motion, spring } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { Footer } from "../footer"
import { ContactForm } from "../form/contact-form"
import { Section } from "../section"

const leftVariants = {
  hidden: { opacity: 0, x: -50, rotate: -5, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: spring,
      stiffness: 80,
      delay: 0.1,
    },
  },
}

const rightVariants = {
  hidden: { opacity: 0, x: 50, rotate: 5, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: spring,
      stiffness: 80,
      delay: 0.2,
    },
  },
}

export function Contact() {
  return (
    <Section.Root
      className="flex scroll-mt-20 flex-col justify-between md:scroll-mt-0"
      id="contact"
    >
      <div className="grid w-full grid-cols-1 grid-rows-2 flex-col items-stretch justify-between gap-4 py-4 md:py-20 lg:grid-cols-[1fr_1fr] lg:grid-rows-1">
        <motion.div
          className="flex h-full flex-col gap-6 rounded-xl border border-border bg-background p-8 shadow-md"
          exit="hidden"
          initial="hidden"
          variants={leftVariants}
          viewport={{ once: false, amount: 0.2 }}
          whileInView="visible"
        >
          <h2 className="text-balance font-bold text-4xl tracking-tight">
            Let&apos;s Build Something
          </h2>
          <p className="text-lg text-muted-foreground">
            Interested in working together, have a project idea, or just want to
            talk about engineering? Feel free to reach out through any of the
            channels below or send a message through the form.
          </p>
          <ul className="flex flex-col gap-4 text-base">
            <li className="flex items-center gap-3 text-muted-foreground">
              <Mail className="size-5 text-sky-600" />
              <a
                className="hover:underline"
                href="mailto:nathann.santoss2@gmail.com"
              >
                nathann.santoss2@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Phone className="size-5 text-sky-600" />
              <a className="hover:underline" href="tel:+5516991437961">
                +55 (16) 99143-7961
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Linkedin className="size-5 text-sky-600" />
              <Link
                className="hover:underline"
                href="https://linkedin.com/in/nathannfs"
                rel="noreferrer"
                target="_blank"
              >
                linkedin.com/in/nathannfs
              </Link>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Github className="size-5 text-sky-600" />
              <Link
                className="hover:underline"
                href="https://github.com/nathannfs"
                rel="noreferrer"
                target="_blank"
              >
                github.com/nathannfs
              </Link>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="size-5 text-sky-600" />
              Sertãozinho, SP — Brazil
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="h-full rounded-xl border border-border bg-background p-8 shadow-md"
          exit="hidden"
          initial="hidden"
          variants={rightVariants}
          viewport={{ once: false, amount: 0.2 }}
          whileInView="visible"
        >
          <ContactForm />
        </motion.div>
      </div>

      <Footer />
    </Section.Root>
  )
}

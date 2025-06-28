import { motion, spring } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { Footer } from '../footer'
import { ContactForm } from '../form/contact-form'
import { Section } from '../section'

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
      id="contact"
      className="flex scroll-mt-20 flex-col justify-between md:scroll-mt-0"
    >
      <div className="grid w-full grid-cols-1 grid-rows-2 flex-col items-stretch justify-between gap-4 py-4 md:py-20 lg:grid-cols-[1fr_1fr] lg:grid-rows-1">
        <motion.div
          className="flex h-full flex-col gap-6 rounded-xl border border-border bg-background p-8 shadow-md"
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl font-bold">Entre em contato</h2>
          <p className="text-lg text-muted-foreground">
            Ficou interessado em trabalhar comigo, tirar dúvidas ou só quer
            bater um papo sobre tecnologia? Sinta-se à vontade para me chamar em
            qualquer canal abaixo ou envie uma mensagem pelo formulário!
          </p>
          <ul className="flex flex-col gap-4 text-base">
            <li className="flex items-center gap-3 text-muted-foreground">
              <Mail className="size-5 text-sky-600" />
              <a href="mailto:seuemail@email.com" className="hover:underline">
                nathann.santoss2@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Phone className="size-5 text-sky-600" />
              <a href="tel:+5511999999999" className="hover:underline">
                (16) 99143-7961
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Linkedin className="size-5 text-sky-600" />
              <Link
                href="https://linkedin.com/in/nathannfs"
                target="_blank"
                className="hover:underline" rel="noreferrer"
              >
                linkedin.com/in/nathannfs
              </Link>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Github className="size-5 text-sky-600" />
              <Link
                href="https://github.com/nathannfs"
                target="_blank"
                className="hover:underline" rel="noreferrer"
              >
                github.com/nathannfs
              </Link>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="size-5 text-sky-600" />
              Sertãozinho, SP
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="h-full rounded-xl border border-border bg-background p-8 shadow-md"
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
        >
          <ContactForm />
        </motion.div>
      </div>

      <Footer />
    </Section.Root>
  )
}

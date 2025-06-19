import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { ContactForm } from '../form/contact-form'
import { Section } from '../section'

export function Contact() {
  return (
    <Section.Root id="contact">
      <div className="grid grid-cols-1 grid-rows-2 flex-col items-center justify-between gap-4 py-4 md:py-20 lg:grid-cols-[1fr_1fr] lg:grid-rows-1">
        <div className="flex h-full flex-col gap-6 rounded-xl border border-border bg-background p-8 shadow-md">
          <h2 className="mb-2 text-4xl font-bold">Entre em contato</h2>
          <p className="mb-4 text-lg text-muted-foreground">
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
                className="hover:underline"
              >
                linkedin.com/in/nathannfs
              </Link>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Github className="size-5 text-sky-600" />
              <Link
                href="https://github.com/nathannfs"
                target="_blank"
                className="hover:underline"
              >
                github.com/nathannfs
              </Link>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="size-5 text-sky-600" />
              Sertãozinho, SP
            </li>
          </ul>
        </div>

        <div className="h-full rounded-xl border border-border bg-background p-8 shadow-md">
          <ContactForm />
        </div>
      </div>
    </Section.Root>
  )
}

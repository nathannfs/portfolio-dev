'use client'

import { Mail, MessageCircle, UserIcon } from 'lucide-react'

import { Button } from '@/components/button'

import { Input } from '../input'
import { Separator } from '../separator'
import { Label } from '../ui/label'

export function ContactForm() {
  return (
    <form className="flex w-full flex-col justify-between space-y-6">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="name"
          className="text-sm font-medium text-muted-foreground"
        >
          Nome
        </Label>

        <Input.Root>
          <Input.Prefix>
            <UserIcon className="text-sky-600" />
          </Input.Prefix>
          <Input.Control
            id="name"
            name="name"
            placeholder="Digite seu nome"
            required
          />
        </Input.Root>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-muted-foreground"
        >
          Email
        </Label>

        <Input.Root>
          <Input.Prefix>
            <Mail className="text-sky-600" />
          </Input.Prefix>
          <Input.Control
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            required
          />
        </Input.Root>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Label
          htmlFor="message"
          className="text-sm font-medium text-muted-foreground"
        >
          Mensagem
        </Label>

        <div className="flex w-full items-start gap-2 rounded-lg border border-zinc-300 bg-background px-3 py-2 shadow-sm focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-500/20">
          <MessageCircle className="text-sky-600" />
          <textarea
            id="message"
            name="message"
            placeholder="Digite sua mensagem"
            required
            rows={4}
            className="flex-1 resize-none border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
          />
        </div>
      </div>

      <Separator />

      <Button type="submit" size="lg" className="mt-auto w-full">
        Enviar mensagem
      </Button>
    </form>
  )
}

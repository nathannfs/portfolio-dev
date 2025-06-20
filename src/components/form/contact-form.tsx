'use client'

import { Mail, MessageCircle, UserIcon } from 'lucide-react'

import { Button } from '@/components/button'

import { Input } from '../input'
import { Separator } from '../separator'
import { Textarea } from '../textarea'
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

        <Textarea.Root>
          <Textarea.Prefix>
            <MessageCircle className="text-sky-600" />
          </Textarea.Prefix>
          <Textarea.Control
            id="message"
            name="message"
            placeholder="Digite sua mensagem"
            required
            rows={4}
          />
        </Textarea.Root>
      </div>

      <Separator />

      <Button type="submit" size="lg" className="mt-auto w-full">
        Enviar mensagem
      </Button>
    </form>
  )
}

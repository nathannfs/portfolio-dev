'use client'

import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MessageCircle,
  UserIcon,
} from 'lucide-react'
import { type ChangeEvent, type FormEvent, useState } from 'react'

import { Button } from '@/components/button'

import { Input } from '../input'
import { Separator } from '../separator'
import { Textarea } from '../textarea'
import { Label } from '../ui/label'

type FormData = {
  name: string
  email: string
  message: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Erro ao enviar mensagem',
      )

      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  const isDisabled = status === 'loading'

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col justify-between space-y-6"
    >
      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-800 dark:bg-green-900/20 dark:text-green-200">
          <CheckCircle className="size-5" />
          <span className="text-sm font-medium">
            Mensagem enviada com sucesso!
          </span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-800 dark:bg-red-900/20 dark:text-red-200">
          <AlertCircle className="size-5" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

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
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite seu nome"
            required
            disabled={isDisabled}
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
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite seu email"
            required
            disabled={isDisabled}
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
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Digite sua mensagem"
            required
            rows={4}
            disabled={isDisabled}
          />
        </Textarea.Root>
      </div>

      <Separator />

      <Button
        type="submit"
        size="lg"
        className="mt-auto w-full"
        disabled={isDisabled}
      >
        {status === 'loading'
          ? (
            <Loader2 className="mr-2 animate-spin" />
            )
          : (
              'Enviar mensagem'
            )}
      </Button>
    </form>
  )
}

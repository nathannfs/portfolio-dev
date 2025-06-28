'use client'

import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { type FormEvent, useState } from 'react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Label } from '@/components/ui/label'

export function SignInForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (res?.error) {
      setError('Email ou senha inválidos')
    } else if (res?.ok) {
      router.push(res.url || '/')
    }
  }

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Entrar</h1>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>

          <Input.Root>
            <Input.Control
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="seu@email.com"
              disabled={loading}
            />
          </Input.Root>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Senha
          </Label>

          <Input.Root>
            <Input.Control
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Sua senha"
              disabled={loading}
            />
          </Input.Root>
        </div>

        {error && (
          <div className="rounded bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? <Loader2 className="size-4 animate-spin" />
            : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}

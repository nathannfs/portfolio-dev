"use client"

import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { type FormEvent, useState } from "react"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { AuroraCanvas } from "@/components/motion"
import { Label } from "@/components/ui/label"

export function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (res?.error) {
      setError("Invalid email or password")
    } else if (res?.ok) {
      router.push(res.url || "/")
    }
  }

  return (
    <div className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6">
      <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10 opacity-70" />

      <form
        className="w-full max-w-sm space-y-6 rounded-xl border bg-surface-1 p-8 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-center font-bold text-2xl tracking-tight">
          Entrar
        </h1>

        <div className="flex flex-col gap-2">
          <Label className="font-medium text-sm" htmlFor="email">
            Email
          </Label>

          <Input.Root className="bg-surface-2 focus-within:border-aurora-cyan focus-within:ring-4 focus-within:ring-aurora-cyan/20">
            <Input.Control
              autoComplete="email"
              disabled={loading}
              id="email"
              name="email"
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="seu@email.com"
              required
              type="email"
              value={form.email}
            />
          </Input.Root>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-medium text-sm" htmlFor="password">
            Senha
          </Label>

          <Input.Root className="bg-surface-2 focus-within:border-aurora-cyan focus-within:ring-4 focus-within:ring-aurora-cyan/20">
            <Input.Control
              autoComplete="current-password"
              disabled={loading}
              id="password"
              name="password"
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              placeholder="Your password"
              required
              type="password"
              value={form.password}
            />
          </Input.Root>
        </div>

        {error && (
          <div className="rounded bg-red-100 px-3 py-2 text-red-700 text-sm dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        <Button
          className="w-full focus-visible:ring-4 focus-visible:ring-aurora-cyan/30"
          disabled={loading}
          type="submit"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </div>
  )
}

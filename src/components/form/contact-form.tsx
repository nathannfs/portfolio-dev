"use client"

import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MessageCircle,
  UserIcon,
} from "lucide-react"
import { type ChangeEvent, type FormEvent, useState } from "react"

import { Button } from "@/components/button"

import { Input } from "../input"
import { Separator } from "../separator"
import { Textarea } from "../textarea"
import { Label } from "../ui/label"

interface FormData {
  email: string
  message: string
  name: string
}

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setStatus("idle")
      }, 3000)
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      )

      setTimeout(() => {
        setStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  const isDisabled = status === "loading"

  return (
    <form
      className="flex w-full flex-col justify-between space-y-6"
      onSubmit={handleSubmit}
    >
      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-800 dark:bg-green-900/20 dark:text-green-200">
          <CheckCircle className="size-5" />
          <span className="font-medium text-sm">
            Message sent successfully!
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-800 dark:bg-red-900/20 dark:text-red-200">
          <AlertCircle className="size-5" />
          <span className="font-medium text-sm">{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label
          className="font-medium text-muted-foreground text-sm"
          htmlFor="name"
        >
          Name
        </Label>

        <Input.Root>
          <Input.Prefix>
            <UserIcon className="text-sky-600" />
          </Input.Prefix>
          <Input.Control
            disabled={isDisabled}
            id="name"
            name="name"
            onChange={handleInputChange}
            placeholder="Your name"
            required
            value={formData.name}
          />
        </Input.Root>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className="font-medium text-muted-foreground text-sm"
          htmlFor="email"
        >
          Email
        </Label>

        <Input.Root>
          <Input.Prefix>
            <Mail className="text-sky-600" />
          </Input.Prefix>
          <Input.Control
            disabled={isDisabled}
            id="email"
            name="email"
            onChange={handleInputChange}
            placeholder="your@email.com"
            required
            type="email"
            value={formData.email}
          />
        </Input.Root>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Label
          className="font-medium text-muted-foreground text-sm"
          htmlFor="message"
        >
          Message
        </Label>

        <Textarea.Root>
          <Textarea.Prefix>
            <MessageCircle className="text-sky-600" />
          </Textarea.Prefix>
          <Textarea.Control
            disabled={isDisabled}
            id="message"
            name="message"
            onChange={handleInputChange}
            placeholder="Tell me about your project or idea..."
            required
            rows={4}
            value={formData.message}
          />
        </Textarea.Root>
      </div>

      <Separator />

      <Button
        className="mt-auto w-full"
        disabled={isDisabled}
        size="lg"
        type="submit"
      >
        {status === "loading" ? (
          <Loader2 className="mr-2 animate-spin" />
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  )
}

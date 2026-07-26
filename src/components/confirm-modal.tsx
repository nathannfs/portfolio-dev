"use client"

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from "@radix-ui/react-dialog"
import { AlertTriangle, Trash2, X } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "./button"

interface ConfirmModalProps {
  cancelText?: string
  confirmText?: string
  description: string
  icon?: ReactNode
  loading?: boolean
  onCancel?: () => void
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title: string
  variant?: "default" | "delete"
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  icon,
  loading = false,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const defaultIcon =
    variant === "delete" ? (
      <Trash2 className="size-6 text-red-500" />
    ) : (
      <AlertTriangle className="size-6 text-sky-500" />
    )

  return (
    <Root onOpenChange={onOpenChange} open={open}>
      <Portal>
        <Overlay className="fixed inset-0 z-50 bg-black/60" />

        <Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface-1 p-6 text-foreground shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">{icon || defaultIcon}</div>

            <div className="flex-1">
              <Title className="font-semibold text-foreground text-lg">
                {title}
              </Title>

              <Description className="mt-2 text-muted-foreground text-sm">
                {description}
              </Description>
            </div>

            <Close asChild>
              <button
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                type="button"
              >
                <X className="size-5" />
              </button>
            </Close>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              className="flex-1"
              disabled={loading}
              onClick={handleCancel}
              variant={variant === "default" ? "destructive" : "primary"}
            >
              {cancelText}
            </Button>

            <Button
              className="flex-1"
              disabled={loading}
              onClick={handleConfirm}
              variant={variant === "delete" ? "destructive" : "primary"}
            >
              {loading ? "Confirming..." : confirmText}
            </Button>
          </div>
        </Content>
      </Portal>
    </Root>
  )
}

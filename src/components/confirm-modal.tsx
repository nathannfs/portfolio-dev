'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AlertTriangle, Trash2, X } from 'lucide-react'
import { ReactNode } from 'react'

import { Button } from './button'

type ConfirmModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'delete'
  onConfirm: () => void
  onCancel?: () => void
  icon?: ReactNode
  loading?: boolean
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'default',
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

  const defaultIcon = variant === 'delete'
    ? (
      <Trash2 className="size-6 text-red-500" />
      )
    : (
      <AlertTriangle className="size-6 text-sky-500" />
      )

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {icon || defaultIcon}
            </div>

            <div className="flex-1">
              <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant={variant === 'default'
                ? 'destructive'
                : 'primary'}
              onClick={handleCancel}
              disabled={loading}
              className="flex-1"
            >
              {cancelText}
            </Button>

            <Button
              variant={variant === 'delete'
                ? 'destructive'
                : 'primary'}
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1"
            >
              {loading
                ? 'Confirmando...'
                : confirmText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

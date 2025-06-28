'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />

        <Dialog.Content
          className={twMerge([
            'fixed space-y-4 left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900',
            className,
          ])}
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              {title && (
                <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
              )}

              <Dialog.Close asChild>
                <button className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <X className="size-5" />
                </button>
              </Dialog.Close>
            </div>

            {description && (
              <Dialog.DialogDescription className="text-sm text-muted-foreground">{description}</Dialog.DialogDescription>
            )}
          </div>

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

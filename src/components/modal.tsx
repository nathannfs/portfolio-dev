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
import { X } from "lucide-react"
import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ModalProps {
  children: ReactNode
  className?: string
  description?: string
  footer?: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
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
    <Root onOpenChange={onOpenChange} open={open}>
      <Portal>
        <Overlay className="fixed inset-0 z-50 bg-black/40" />

        <Content
          className={twMerge([
            "fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900",
            "max-h-[90vh] overflow-y-auto",
            className,
          ])}
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between">
              {title && <Title className="font-bold text-2xl">{title}</Title>}

              <Close asChild>
                <button
                  className="rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  type="button"
                >
                  <X className="size-5" />
                </button>
              </Close>
            </div>

            {description && (
              <Description className="text-muted-foreground text-sm">
                {description}
              </Description>
            )}
          </div>

          <div className="max-h-[65vh] w-full overflow-y-auto">{children}</div>
        </Content>
      </Portal>
    </Root>
  )
}

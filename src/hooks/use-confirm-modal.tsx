"use client"

import type React from "react"
import { useState } from "react"

interface ConfirmModalConfig {
  cancelText?: string
  confirmText?: string
  description: string
  icon?: React.ReactNode
  title: string
  variant?: "default" | "delete"
}

interface UseConfirmModalReturn {
  close: () => void
  config: ConfirmModalConfig | null
  confirm: (config: ConfirmModalConfig) => Promise<boolean>
  handleConfirm: () => void
  isOpen: boolean
}

export function useConfirmModal(): UseConfirmModalReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ConfirmModalConfig | null>(null)
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  )

  const confirm = (config: ConfirmModalConfig): Promise<boolean> =>
    new Promise((resolve) => {
      setConfig(config)
      setResolve(() => resolve)
      setIsOpen(true)
    })

  const close = () => {
    setIsOpen(false)
    setConfig(null)
    if (resolve) {
      resolve(false)
      setResolve(null)
    }
  }

  const handleConfirm = () => {
    setIsOpen(false)
    setConfig(null)
    if (resolve) {
      resolve(true)
      setResolve(null)
    }
  }

  return {
    isOpen,
    config,
    confirm,
    close,
    handleConfirm,
  }
}

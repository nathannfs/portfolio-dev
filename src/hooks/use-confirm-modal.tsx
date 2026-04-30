'use client'

import React, { useState } from 'react'

type ConfirmModalConfig = {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'delete'
  icon?: React.ReactNode
}

type UseConfirmModalReturn = {
  isOpen: boolean
  config: ConfirmModalConfig | null
  confirm: (config: ConfirmModalConfig) => Promise<boolean>
  close: () => void
  handleConfirm: () => void
}

export function useConfirmModal(): UseConfirmModalReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ConfirmModalConfig | null>(null)
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null)

  const confirm = (config: ConfirmModalConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfig(config)
      setResolve(() => resolve)
      setIsOpen(true)
    })
  }

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

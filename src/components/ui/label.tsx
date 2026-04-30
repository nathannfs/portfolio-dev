"use client"

import { Root } from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = ({
  className,
  ...props
}: ComponentProps<typeof Root> & VariantProps<typeof labelVariants>) => (
  <Root className={cn(labelVariants(), className)} {...props} />
)
Label.displayName = Root.displayName

export { Label }

"use client"

import { Fallback, Image, Root } from "@radix-ui/react-avatar"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Avatar = ({ className, ...props }: ComponentProps<typeof Root>) => (
  <Root
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
)
Avatar.displayName = Root.displayName

const AvatarImage = ({ className, ...props }: ComponentProps<typeof Image>) => (
  <Image className={cn("aspect-square h-full w-full", className)} {...props} />
)
AvatarImage.displayName = Image.displayName

const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof Fallback>) => (
  <Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
)
AvatarFallback.displayName = Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }

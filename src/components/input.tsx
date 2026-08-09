import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

type PrefixProps = ComponentProps<"div">

export function Prefix({ ...props }: PrefixProps) {
  return <div {...props} />
}

type ControlProps = ComponentProps<"input">

export function Control({ ...props }: ControlProps) {
  return (
    <input
      className="flex-1 border-0 bg-transparent p-0 text-foreground outline-none placeholder:text-sm placeholder:text-muted-foreground"
      {...props}
    />
  )
}

const input = tv({
  base: "flex w-full items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 shadow-sm transition-colors",

  variants: {
    variant: {
      primary: [
        "focus-within:border-aurora-cyan focus-within:ring-2 focus-within:ring-aurora-cyan/25",
      ],
      error: [
        "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/25",
      ],
      none: "border-transparent bg-transparent shadow-none",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
})

type RootProps = ComponentProps<"div"> & VariantProps<typeof input>

export function Root({ variant, className, ...props }: RootProps) {
  return <div className={input({ variant, className })} {...props} />
}

export const Input = {
  Root,
  Control,
  Prefix,
}

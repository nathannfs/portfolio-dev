import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

export function Prefix({ ...props }: ComponentProps<"div">) {
  return <div {...props} />
}

export function Control(props: ComponentProps<"textarea">) {
  return (
    <textarea
      className="flex-1 resize-none border-0 bg-transparent p-0 text-foreground outline-none placeholder:text-muted-foreground"
      {...props}
    />
  )
}

const textarea = tv({
  base: "flex w-full items-start gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 shadow-sm transition-colors",
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

type RootProps = ComponentProps<"div"> & VariantProps<typeof textarea>

export function Root({ variant, className, ...props }: RootProps) {
  return <div className={textarea({ variant, className })} {...props} />
}

export const Textarea = {
  Root,
  Control,
  Prefix,
}

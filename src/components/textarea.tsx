import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

export function Prefix({ ...props }: ComponentProps<"div">) {
  return <div {...props} />
}

export function Control(props: ComponentProps<"textarea">) {
  return (
    <textarea
      className="flex-1 resize-none border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
      {...props}
    />
  )
}

const textarea = tv({
  base: "flex w-full items-start gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm",
  variants: {
    variant: {
      primary: [
        "focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100",
        "dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-500/20",
      ],
      error: [
        "border-red-500 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100",
        "dark:border-red-400 dark:focus-within:ring-red-400/20",
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

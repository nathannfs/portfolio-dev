import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const button = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-sm outline-none transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50",

  variants: {
    variant: {
      primary: [
        "bg-sky-100 text-zinc-800 hover:bg-sky-200 hover:text-zinc-950",
        "dark:bg-sky-700/80 dark:text-zinc-200 dark:hover:bg-sky-700 dark:hover:text-zinc-100",
      ],
      secondary: [
        "bg-zinc-950 text-zinc-100 hover:bg-zinc-800 hover:text-white",
        "dark:bg-white dark:text-black dark:hover:text-white",
      ],
      ghost: [
        "bg-transparent text-muted-foreground shadow-none hover:text-zinc-950",
        "dark:text-zinc-50/80 dark:hover:text-zinc-50",
      ],
      link: [
        "text-sky-700/80 underline hover:text-sky-700",
        "dark:text-sky-400/80 dark:hover:text-sky-400",
      ],
      icon: [
        "text-sky-700/80 hover:text-sky-700",
        "dark:text-sky-400/80 dark:hover:text-sky-400",
      ],
      destructive: [
        "bg-red-600 text-white hover:bg-red-700 hover:text-white",
        "dark:bg-red-700 dark:text-white dark:hover:bg-red-800 dark:hover:text-white",
      ],
      none: "bg-transparent shadow-none",
    },

    size: {
      default: "h-fit p-2 md:h-10 md:p-4",
      sm: "h-9 px-2 py-2",
      md: "h-10 px-3 py-3",
      lg: "h-11 px-4 py-4",
      icon: "h-6 w-6 px-0 py-0",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button {...props} className={button({ className, variant, size })} />
}

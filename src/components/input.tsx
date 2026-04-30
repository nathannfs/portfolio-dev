import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

type PrefixProps = ComponentProps<'div'>

export function Prefix({ ...props }: PrefixProps) {
  return <div {...props} />
}

type ControlProps = ComponentProps<'input'>

export function Control({ ...props }: ControlProps) {
  return (
    <input
      className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 placeholder:text-sm outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
      {...props}
    />
  )
}

const input = tv({
  base: 'flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm',

  variants: {
    variant: {
      primary: [
        'focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100',
        'dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-500/20',
      ],
      error: [
        'border-red-500 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100',
        'dark:border-red-400 dark:focus-within:ring-red-400/20',
      ],
      none: 'border-transparent bg-transparent shadow-none',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type RootProps = ComponentProps<'div'> & VariantProps<typeof input>

export function Root({ variant, className, ...props }: RootProps) {
  return <div className={input({ variant, className })} {...props} />
}

export const Input = {
  Root,
  Control,
  Prefix,
}

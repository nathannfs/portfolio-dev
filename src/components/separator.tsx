import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SeparatorProps = ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ orientation = 'horizontal' }: SeparatorProps) {
  return (
    <div
      className={twMerge([
        'bg-muted-foreground shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-5 w-[1px]',
      ])}
    />
  )
}

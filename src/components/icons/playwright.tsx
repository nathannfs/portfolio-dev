import type { ComponentProps } from 'react'

export function Playwright(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2EAD33"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01v0a2.83 2.83 0 0 1 0-4L17 3" />
      <path d="m16 2 5 5" />
      <path d="M12.23 7.77 15 5" />
      <path d="M8 12 5 9" />
    </svg>
  )
}

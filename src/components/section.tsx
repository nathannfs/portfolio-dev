import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type RootProps = ComponentProps<'div'>

function Root({ className, ...props }: RootProps) {
  return (
    <div
      {...props}
      className={twMerge([
        'mx-auto flex h-fit w-full flex-col items-center justify-center gap-10 px-4 py-10 md:h-[calc(100vh-80px)] md:snap-start md:py-4 lg:max-w-7xl',
        className,
      ])}
    />
  )
}

type HeaderProps = ComponentProps<'div'>

function Header({ className, ...props }: HeaderProps) {
  return (
    <div
      {...props}
      className={twMerge([
        'mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 px-2 md:px-4',
        className,
      ])}
    />
  )
}

type TitleProps = ComponentProps<'h1'>

function Title({ className, ...props }: TitleProps) {
  return (
    <h1
      {...props}
      className={twMerge([
        'text-center text-3xl font-bold md:text-4xl lg:text-5xl',
        className,
      ])}
    />
  )
}

type DescriptionProps = ComponentProps<'p'>

function Description({ className, ...props }: DescriptionProps) {
  return (
    <p
      {...props}
      className={twMerge([
        'text-center text-base text-muted-foreground md:text-lg',
        className,
      ])}
    />
  )
}

type ContentProps = ComponentProps<'div'>

function Content({ className, ...props }: ContentProps) {
  return (
    <div
      {...props}
      className={twMerge([
        'mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-2 md:px-4',
        className,
      ])}
    />
  )
}

type BlockProps = ComponentProps<'div'>

function Block({ className, ...props }: BlockProps) {
  return (
    <div
      {...props}
      className={twMerge([
        'flex flex-col items-center justify-center gap-6',
        className,
      ])}
    />
  )
}

type ListProps = ComponentProps<'ul'>

function List({ className, ...props }: ListProps) {
  return (
    <ul
      {...props}
      className={twMerge([
        'list-disc space-y-2 pl-5 text-base md:text-lg',
        className,
      ])}
    />
  )
}

export const Section = {
  Root,
  Header,
  Title,
  Description,
  Content,
  Block,
  List,
}

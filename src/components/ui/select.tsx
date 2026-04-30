"use client"

import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Select = Root

const SelectGroup = Group

const SelectValue = Value

const SelectTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Trigger>) => (
  <Trigger
    className={cn(
      "flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 placeholder-zinc-600 shadow-sm outline-none transition-all duration-150 focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-500/20 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Icon>
  </Trigger>
)
SelectTrigger.displayName = Trigger.displayName

const SelectScrollUpButton = ({
  className,
  ...props
}: ComponentProps<typeof ScrollUpButton>) => (
  <ScrollUpButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </ScrollUpButton>
)
SelectScrollUpButton.displayName = ScrollUpButton.displayName

const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof ScrollDownButton>) => (
  <ScrollDownButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </ScrollDownButton>
)
SelectScrollDownButton.displayName = ScrollDownButton.displayName

const SelectContent = ({
  className,
  children,
  position = "popper",
  ...props
}: ComponentProps<typeof Content>) => (
  <Portal>
    <Content
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-y-auto overflow-x-hidden rounded-lg border border-zinc-300 bg-white text-zinc-900 shadow-lg transition-all duration-150 data-[state=closed]:animate-out data-[state=open]:animate-in dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
        position === "popper" &&
          "data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </Viewport>
      <SelectScrollDownButton />
    </Content>
  </Portal>
)
SelectContent.displayName = Content.displayName

const SelectLabel = ({ className, ...props }: ComponentProps<typeof Label>) => (
  <Label
    className={cn("px-2 py-1.5 font-semibold text-sm", className)}
    {...props}
  />
)
SelectLabel.displayName = Label.displayName

const SelectItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Item>) => (
  <Item
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </span>
    <ItemText>{children}</ItemText>
  </Item>
)
SelectItem.displayName = Item.displayName

const SelectSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => (
  <Separator
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
)
SelectSeparator.displayName = Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

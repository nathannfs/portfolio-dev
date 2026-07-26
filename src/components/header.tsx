"use client"

import { motion } from "framer-motion"
import { ChevronDown, Code, List, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

import { useLenis } from "@/components/motion"

import { Button } from "./button"
import { Separator } from "./separator"
import { ThemeToggle } from "./theme/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

export function Header() {
  const { data: session } = useSession()
  const lenis = useLenis()

  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const [activeSection, setActiveSection] = useState<string>("home")
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    if (!isHomePage) {
      return
    }

    const sections = [
      "home",
      "about",
      "specialties",
      "techs",
      "project",
      "contact",
    ]
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      }
    }, observerOptions)

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        observer.observe(element)
      }
    }

    return () => {
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          observer.unobserve(element)
        }
      }
    }
  }, [isHomePage])

  function handleNavigation(id: string) {
    if (!isHomePage) {
      sessionStorage.setItem("scrollToSection", id)
      window.location.href = "/"
      return
    }

    const element = document.getElementById(id)
    if (!element) {
      return
    }

    setActiveSection(id)
    setIsSheetOpen(false)

    if (lenis) {
      lenis.scrollTo(element, { offset: -80 })
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (isHomePage) {
      const sectionToScroll = sessionStorage.getItem("scrollToSection")
      if (sectionToScroll) {
        const element = document.getElementById(sectionToScroll)
        if (element) {
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(element, { offset: -80 })
            } else {
              const top =
                element.getBoundingClientRect().top + window.scrollY - 80
              window.scrollTo({ top, behavior: "smooth" })
            }

            setActiveSection(sectionToScroll)
          }, 100)
        }
        sessionStorage.removeItem("scrollToSection")
      }
    }
  }, [isHomePage])

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "specialties", label: "Expertise" },
    { id: "project", label: "Projects" },
    { id: "techs", label: "Stack" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <motion.header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <div
        className={twMerge(
          "relative flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-3 py-2 transition-all duration-300 md:px-4",
          scrolled
            ? "border-border/60 bg-surface-1/70 shadow-black/5 shadow-lg backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <button
          className="group flex items-center gap-2.5"
          onClick={() => handleNavigation("home")}
          type="button"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-aurora-cyan/10 text-aurora-cyan ring-1 ring-aurora-cyan/20 transition-transform group-hover:scale-105">
            <Code className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">Nathan Santos</span>
        </button>

        {/* Desktop Navigation — centered floating pill */}
        <nav className="-translate-x-1/2 absolute left-1/2 hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isHomePage && activeSection === item.id
            return (
              <button
                className="relative rounded-full px-3.5 py-1.5 font-medium text-sm transition-colors"
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                type="button"
              >
                {active && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-aurora-cyan/[0.12]"
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={twMerge(
                    "relative z-10 transition-colors",
                    active
                      ? "text-aurora-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Right cluster (desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />

          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-auto p-0 hover:bg-transparent"
                  variant="ghost"
                >
                  <Avatar>
                    <AvatarImage
                      alt={session.user.name ?? "Avatar"}
                      src={session.user.image ?? undefined}
                    />
                    <AvatarFallback>
                      {session.user.name
                        ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown
                    aria-hidden="true"
                    className="opacity-60"
                    size={16}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="max-w-64">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                  <span className="truncate font-medium text-foreground text-sm">
                    {session.user.name}
                  </span>
                  <span className="truncate font-normal text-muted-foreground text-xs">
                    {session.user.email}
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut aria-hidden="true" className="opacity-60" size={16} />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <Sheet onOpenChange={setIsSheetOpen} open={isSheetOpen}>
          <SheetTrigger asChild>
            <Button aria-label="Abrir menu de navegação" variant="ghost">
              <List className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex w-fit flex-col items-center gap-2 px-6">
            <SheetTitle />
            <SheetDescription />

            {navItems.map((item, index) => (
              <div key={item.id}>
                <div className="relative w-full text-center">
                  <Button
                    className="w-full py-1"
                    onClick={() => handleNavigation(item.id)}
                    variant="ghost"
                  >
                    {item.label}
                  </Button>
                  {isHomePage && activeSection === item.id && (
                    <motion.div
                      className="absolute right-0 bottom-[-2px] left-0 h-0.5 bg-sky-500"
                      layoutId="active-pill-mobile"
                    />
                  )}
                </div>
                {index < navItems.length - 1 && <Separator />}
              </div>
            ))}

            <Separator />

            <ThemeToggle />

            {session?.user && (
              <div className="mt-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="h-auto p-0 hover:bg-transparent"
                      variant="ghost"
                    >
                      <Avatar>
                        <AvatarImage
                          alt={session.user.name ?? "Avatar"}
                          src={session.user.image ?? undefined}
                        />
                        <AvatarFallback>
                          {session.user.name
                            ? session.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "U"}
                        </AvatarFallback>
                      </Avatar>

                      <ChevronDown
                        aria-hidden="true"
                        className="opacity-60"
                        size={16}
                      />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="max-w-64">
                    <DropdownMenuLabel className="flex min-w-0 flex-col">
                      <span className="truncate font-medium text-foreground text-sm">
                        {session.user.name}
                      </span>
                      <span className="truncate font-normal text-muted-foreground text-xs">
                        {session.user.email}
                      </span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut
                        aria-hidden="true"
                        className="opacity-60"
                        size={16}
                      />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </nav>
      </div>
    </motion.header>
  )
}

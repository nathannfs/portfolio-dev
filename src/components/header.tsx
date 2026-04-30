"use client"

import { motion } from "framer-motion"
import { ChevronDown, Code, List, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

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
      window.location.href = "/"
      sessionStorage.setItem("scrollToSection", id)
      return
    }

    const element = document.getElementById(id)
    if (element) {
      setActiveSection(id)

      setIsSheetOpen(false)

      const isMobile = window.innerWidth < 768

      if (isMobile) {
        const headerHeight = 80
        const elementPosition = element.offsetTop - headerHeight

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        })
      } else {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        setTimeout(() => {
          window.scrollBy({
            top: -80,
            behavior: "smooth",
          })
        }, 100)
      }
    }
  }

  useEffect(() => {
    if (isHomePage) {
      const sectionToScroll = sessionStorage.getItem("scrollToSection")
      if (sectionToScroll) {
        const element = document.getElementById(sectionToScroll)
        if (element) {
          setTimeout(() => {
            const isMobile = window.innerWidth < 768

            if (isMobile) {
              const headerHeight = 80
              const elementPosition = element.offsetTop - headerHeight

              window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
              })
            } else {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })

              setTimeout(() => {
                window.scrollBy({
                  top: -80,
                  behavior: "smooth",
                })
              }, 100)
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
    <motion.header
      className={twMerge(
        "fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled
          ? "border-muted/20 border-b bg-background/80 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <Button
        className="flex items-center gap-3 p-0"
        onClick={() => handleNavigation("home")}
        variant="none"
      >
        <Code />

        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg">Nathan Santos</h1>
          <div className="h-4 w-px bg-muted-foreground/30" />
          <span className="text-muted-foreground text-sm">
            Product Engineer
          </span>
        </div>
      </Button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center justify-center gap-2 md:flex">
        {navItems.map((item, index) => (
          <div className="flex items-center gap-2" key={item.id}>
            <div className="relative">
              <Button onClick={() => handleNavigation(item.id)} variant="ghost">
                {item.label}
              </Button>
              {isHomePage && activeSection === item.id && (
                <motion.div
                  className="absolute right-0 bottom-[-4px] left-0 h-0.5 bg-sky-500"
                  layoutId="active-pill"
                />
              )}
            </div>
            {index < navItems.length - 1 && (
              <Separator orientation="vertical" />
            )}
          </div>
        ))}

        <Separator orientation="vertical" />

        <ThemeToggle />

        {session?.user && (
          <>
            <Separator orientation="vertical" />

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
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <Sheet onOpenChange={setIsSheetOpen} open={isSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost">
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
    </motion.header>
  )
}

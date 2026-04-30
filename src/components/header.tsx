'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Code, List, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from './button'
import { Separator } from './separator'
import { ThemeToggle } from './theme/theme-toggle'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function Header() {
  const { data: session } = useSession()

  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const [activeSection, setActiveSection] = useState<string>('home')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    if (!isHomePage) return

    const sections = [
      'home',
      'about',
      'specialties',
      'techs',
      'project',
      'contact',
    ]
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) observer.unobserve(element)
      })
    }
  }, [isHomePage])

  function handleNavigation(id: string) {
    if (!isHomePage) {
      window.location.href = '/'
      sessionStorage.setItem('scrollToSection', id)
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
          behavior: 'smooth',
        })
      } else {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

        setTimeout(() => {
          window.scrollBy({
            top: -80,
            behavior: 'smooth',
          })
        }, 100)
      }
    }
  }

  useEffect(() => {
    if (isHomePage) {
      const sectionToScroll = sessionStorage.getItem('scrollToSection')
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
                behavior: 'smooth',
              })
            } else {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })

              setTimeout(() => {
                window.scrollBy({
                  top: -80,
                  behavior: 'smooth',
                })
              }, 100)
            }

            setActiveSection(sectionToScroll)
          }, 100)
        }
        sessionStorage.removeItem('scrollToSection')
      }
    }
  }, [isHomePage])

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'specialties', label: 'Expertise' },
    { id: 'project', label: 'Projects' },
    { id: 'techs', label: 'Stack' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <motion.header
      className={twMerge(
        'fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300',
        scrolled
          ? 'border-b border-muted/20 bg-background/80 shadow-md backdrop-blur-sm'
          : 'bg-transparent',
      )}
    >
      <Button
        variant="none"
        className="flex items-center gap-3 p-0"
        onClick={() => handleNavigation('home')}
      >
        <Code />

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">Nathan Santos</h1>
          <div className="h-4 w-px bg-muted-foreground/30" />
          <span className="text-sm text-muted-foreground">
            Product Engineer
          </span>
        </div>
      </Button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center justify-center gap-2 md:flex">
        {navItems.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <div className="relative">
              <Button variant="ghost" onClick={() => handleNavigation(item.id)}>
                {item.label}
              </Button>
              {isHomePage && activeSection === item.id && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="active-pill"
                />
              )}
            </div>
            {index < navItems.length - 1 && <Separator orientation="vertical" />}
          </div>
        ))}

        <Separator orientation="vertical" />

        <ThemeToggle />

        {session?.user && (
          <>
            <Separator orientation="vertical" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                  <Avatar>
                    <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? 'Avatar'} />
                    <AvatarFallback>
                      {session.user.name
                        ? session.user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown size={16} className="opacity-60" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="max-w-64">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                  <span className="text-foreground truncate text-sm font-medium">
                    {session.user.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs font-normal">
                    {session.user.email}
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                  <LogOut size={16} className="opacity-60" aria-hidden="true" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
                    variant="ghost"
                    onClick={() => handleNavigation(item.id)}
                    className="w-full py-1"
                  >
                    {item.label}
                  </Button>
                  {isHomePage && activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-sky-500"
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
                    <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                      <Avatar>
                        <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? 'Avatar'} />
                        <AvatarFallback>
                          {session.user.name
                            ? session.user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
                            : 'U'}
                        </AvatarFallback>
                      </Avatar>

                      <ChevronDown size={16} className="opacity-60" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="max-w-64">
                    <DropdownMenuLabel className="flex min-w-0 flex-col">
                      <span className="text-foreground truncate text-sm font-medium">
                        {session.user.name}
                      </span>
                      <span className="text-muted-foreground truncate text-xs font-normal">
                        {session.user.email}
                      </span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                      <LogOut size={16} className="opacity-60" aria-hidden="true" />
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

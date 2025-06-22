'use client'

import { motion } from 'framer-motion'
import { Code, List } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from './button'
import { Separator } from './separator'
import { ThemeToggle } from './theme/theme-toggle'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [activeSection, setActiveSection] = useState<string>('home')

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
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  useEffect(() => {
    if (isHomePage) {
      const sectionToScroll = sessionStorage.getItem('scrollToSection')
      if (sectionToScroll) {
        const element = document.getElementById(sectionToScroll)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
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
            Full Stack Developer
          </span>
        </div>
      </Button>

      <nav className="hidden items-center justify-center gap-2 md:flex">
        <div className="relative">
          <Button variant="ghost" onClick={() => handleNavigation('home')}>
            Home
          </Button>
          {isHomePage && activeSection === 'home' && (
            <motion.div
              className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-sky-500"
              layoutId="active-pill"
            />
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="relative">
          <Button variant="ghost" onClick={() => handleNavigation('about')}>
            Sobre
          </Button>
          {isHomePage && activeSection === 'about' && (
            <motion.div
              className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-sky-500"
              layoutId="active-pill"
            />
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => handleNavigation('specialties')}
          >
            Especialidades
          </Button>
          {isHomePage && activeSection === 'specialties' && (
            <motion.div
              className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-sky-500"
              layoutId="active-pill"
            />
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="relative">
          <Button variant="ghost" onClick={() => handleNavigation('project')}>
            Projetos
          </Button>
          {isHomePage && activeSection === 'project' && (
            <motion.div
              className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-sky-500"
              layoutId="active-pill"
            />
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="relative">
          <Button variant="ghost" onClick={() => handleNavigation('techs')}>
            Tecnologias
          </Button>
          {isHomePage && activeSection === 'techs' && (
            <motion.div
              className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-sky-500"
              layoutId="active-pill"
            />
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="relative">
          <Button variant="ghost" onClick={() => handleNavigation('contact')}>
            Contato
          </Button>
          {isHomePage && activeSection === 'contact' && (
            <motion.div
              className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-sky-500"
              layoutId="active-pill"
            />
          )}
        </div>

        <Separator orientation="vertical" />

        <ThemeToggle />
      </nav>

      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <List className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex w-fit flex-col items-center gap-2 px-6">
            <SheetTitle />
            <SheetDescription />

            <div className="relative w-full text-center">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('home')}
                  className="w-full py-1"
                >
                  Home
                </Button>
              </SheetClose>
              {isHomePage && activeSection === 'home' && (
                <motion.div
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="active-pill-mobile"
                />
              )}
            </div>

            <Separator />

            <div className="relative w-full text-center">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('about')}
                  className="w-full py-1"
                >
                  Sobre
                </Button>
              </SheetClose>
              {isHomePage && activeSection === 'about' && (
                <motion.div
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="active-pill-mobile"
                />
              )}
            </div>

            <Separator />

            <div className="relative w-full text-center">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('specialties')}
                  className="w-full py-1"
                >
                  Especialidades
                </Button>
              </SheetClose>
              {isHomePage && activeSection === 'specialties' && (
                <motion.div
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="active-pill-mobile"
                />
              )}
            </div>

            <Separator />

            <div className="relative w-full text-center">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('project')}
                  className="w-full py-1"
                >
                  Projetos
                </Button>
              </SheetClose>
              {isHomePage && activeSection === 'project' && (
                <motion.div
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="active-pill-mobile"
                />
              )}
            </div>

            <Separator />

            <div className="relative w-full text-center">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('techs')}
                  className="w-full py-1"
                >
                  Tecnologias
                </Button>
              </SheetClose>
              {isHomePage && activeSection === 'techs' && (
                <motion.div
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="active-pill-mobile"
                />
              )}
            </div>

            <Separator />

            <div className="relative w-full text-center">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('contact')}
                  className="w-full py-1"
                >
                  Contato
                </Button>
              </SheetClose>
              {isHomePage && activeSection === 'contact' && (
                <motion.div
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-sky-500"
                  layoutId="active-pill-mobile"
                />
              )}
            </div>

            <Separator />

            <ThemeToggle />
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}

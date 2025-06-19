'use client'

import { Code, List } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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

    const sections = ['home', 'about', 'project', 'contact']
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
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

  return (
    <header className="flex w-full items-center justify-between border-b border-muted px-6 py-4 shadow-sm">
      <Button
        variant="none"
        className="flex items-center gap-3 p-0"
        onClick={() => handleNavigation('home')}
      >
        <Code />

        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Nathan Santos</h1>
          <span className="text-sm text-zinc-400">Full Stack Developer</span>
        </div>
      </Button>

      <nav className="hidden items-center justify-center gap-2 md:flex">
        <Button
          variant="ghost"
          onClick={() => handleNavigation('home')}
          className={
            isHomePage && activeSection === 'home'
              ? 'border-b-2 border-blue-500'
              : ''
          }
        >
          Home
        </Button>

        <Separator orientation="vertical" />

        <Button
          variant="ghost"
          onClick={() => handleNavigation('about')}
          className={
            isHomePage && activeSection === 'about'
              ? 'border-b-2 border-blue-500'
              : ''
          }
        >
          Sobre
        </Button>

        <Separator orientation="vertical" />

        <Button
          variant="ghost"
          onClick={() => handleNavigation('project')}
          className={
            isHomePage && activeSection === 'project'
              ? 'border-b-2 border-blue-500'
              : ''
          }
        >
          Projetos
        </Button>

        <Separator orientation="vertical" />

        <Button
          variant="ghost"
          onClick={() => handleNavigation('contact')}
          className={
            isHomePage && activeSection === 'contact'
              ? 'border-b-2 border-blue-500'
              : ''
          }
        >
          Contato
        </Button>

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

          <SheetContent className="flex w-fit flex-col items-center gap-2">
            <SheetTitle />
            <SheetDescription />

            <SheetClose asChild>
              <Button
                variant="ghost"
                onClick={() => handleNavigation('home')}
                className={
                  isHomePage && activeSection === 'home'
                    ? 'border-b-2 border-blue-500'
                    : ''
                }
              >
                Home
              </Button>
            </SheetClose>

            <Separator />

            <SheetClose asChild>
              <Button
                variant="ghost"
                className={
                  isHomePage && activeSection === 'about'
                    ? 'border-b-2 border-blue-500'
                    : ''
                }
                onClick={() => handleNavigation('about')}
              >
                Sobre
              </Button>
            </SheetClose>

            <Separator />

            <SheetClose asChild>
              <Button
                variant="ghost"
                className={
                  isHomePage && activeSection === 'project'
                    ? 'border-b-2 border-blue-500'
                    : ''
                }
                onClick={() => handleNavigation('project')}
              >
                Projetos
              </Button>
            </SheetClose>

            <Separator />

            <SheetClose asChild>
              <Button
                variant="ghost"
                className={
                  isHomePage && activeSection === 'contact'
                    ? 'border-b-2 border-blue-500'
                    : ''
                }
                onClick={() => handleNavigation('contact')}
              >
                Contato
              </Button>
            </SheetClose>

            <Separator />

            <ThemeToggle />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

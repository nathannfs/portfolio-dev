import Autoplay from 'embla-carousel-autoplay'
import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { techs } from '@/utils/techs'

import { Button } from '../button'
import { Section } from '../section'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

export function Hero() {
  function handleNavigation(id: string) {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <Section.Root id="home">
      <div className="mx-auto flex w-full max-w-[100vw] flex-col-reverse items-center justify-center gap-8 px-4 sm:px-6 md:px-8 lg:max-w-6xl lg:flex-row xl:max-w-7xl">
        <div className="flex w-full max-w-xl flex-col gap-4 text-center lg:text-start">
          <div className="flex flex-col gap-1">
            <span className="text-lg">Olá, Eu sou</span>
            <h2 className="text-5xl font-bold">Nathan Santos</h2>
          </div>

          <p className="text-lg text-muted-foreground">
            Desenvolvedor Full Stack, movido por café, tecnologia e desafios.
            Curioso por natureza e apaixonado por resolver problemas, estou
            sempre aprendendo e criando. Meu objetivo? Ajudar pessoas e empresas
            a tirarem projetos do papel e, de quebra, deixar minha marca no
            mundo da tecnologia.
          </p>

          <div className="flex items-center justify-center gap-2 lg:justify-start">
            <Button
              variant="primary"
              onClick={() => handleNavigation('contact')}
            >
              Entre em contato
              <ArrowUpRight className="size-4" />
            </Button>

            <Link href="https://instagram.com/nathannfs.dev" target="_blank">
              <Button variant="icon" size="icon">
                <Instagram className="size-5" />
              </Button>
            </Link>

            <Link href="https://linkedin.com/in/nathannfs" target="_blank">
              <Button variant="icon" size="icon">
                <Linkedin className="size-5" />
              </Button>
            </Link>

            <Link href="https://github.com/nathannfs" target="_blank">
              <Button variant="icon" size="icon">
                <Github className="size-5" />
              </Button>
            </Link>
          </div>

          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {techs.map((tech) => {
                return (
                  <CarouselItem key={tech.name} className="basis-1/5 pl-1">
                    <div className="p-1">
                      <div className="flex aspect-square items-center justify-center p-2">
                        <span className="text-2xl font-semibold">
                          {tech.icon}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex w-full items-center justify-center md:w-auto">
          <Image
            src="/nathan.jpeg"
            alt="Nathan Santos"
            width={400}
            height={400}
            className="h-44 max-h-[70vw] w-44 max-w-full rounded-xl object-cover shadow-lg sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-[22rem] lg:w-[22rem] xl:h-[26rem] xl:w-[26rem]"
            priority
          />
        </div>
      </div>
    </Section.Root>
  )
}

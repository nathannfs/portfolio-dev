import Autoplay from 'embla-carousel-autoplay'
import { motion, useAnimation, useInView, Variants } from 'framer-motion'
import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { techs } from '@/utils/techs'

import { Button } from '../button'
import { Section } from '../section'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60 } },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, delay: 0.3 },
  },
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: false })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [inView, controls])

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
      <motion.div
        ref={ref}
        className="mx-auto flex w-full max-w-[100vw] flex-col-reverse items-center justify-center gap-8 px-4 sm:px-6 md:px-8 lg:max-w-6xl lg:flex-row xl:max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div
          className="flex w-full max-w-xl flex-col gap-4 text-center lg:text-start"
          variants={itemVariants}
        >
          <motion.div className="flex flex-col gap-1" variants={itemVariants}>
            <span className="text-lg">Olá, Eu sou</span>
            <motion.h2 className="text-5xl font-bold" variants={itemVariants}>
              Nathan Santos
            </motion.h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Section.Description className="lg:text-start">
              Desenvolvedor Full Stack, movido por café, tecnologia e desafios.
              Curioso por natureza e apaixonado por resolver problemas, estou
              sempre aprendendo e criando. Meu objetivo? Ajudar pessoas e
              empresas a tirarem projetos do papel e, de quebra, deixar minha
              marca no mundo da tecnologia.
            </Section.Description>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-2 lg:justify-start"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="primary"
                onClick={() => handleNavigation('contact')}
              >
                Entre em contato
                <ArrowUpRight className="size-4" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="https://instagram.com/nathannfs.dev" target="_blank">
                <Button variant="icon" size="icon">
                  <Instagram className="size-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="https://linkedin.com/in/nathannfs" target="_blank">
                <Button variant="icon" size="icon">
                  <Linkedin className="size-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href="https://github.com/nathannfs" target="_blank">
                <Button variant="icon" size="icon">
                  <Github className="size-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
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
                      <motion.div
                        className="p-1"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="flex aspect-square items-center justify-center p-2">
                          <span className="text-2xl font-semibold">
                            {tech.icon}
                          </span>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex w-full items-center justify-center md:w-auto"
          variants={imageVariants}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/nathan.jpeg"
              alt="Nathan Santos"
              width={400}
              height={400}
              className="h-44 max-h-[70vw] w-44 max-w-full rounded-xl object-cover shadow-lg sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-[22rem] lg:w-[22rem] xl:h-[26rem] xl:w-[26rem]"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </Section.Root>
  )
}

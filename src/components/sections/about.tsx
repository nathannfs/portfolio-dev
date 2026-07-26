"use client"

import { easeInOut, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

import { Reveal } from "@/components/motion"
import { useCertifications, useDegrees } from "@/hooks/use-query-data"
import { statusColor, statusLabel } from "@/utils/status"

import { Button } from "../button"
import { Section } from "../section"
import { Separator } from "../separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
}

export function About() {
  const { data: certificates } = useCertifications()
  const { data: degrees } = useDegrees()

  return (
    <Section.Root className="scroll-mt-20 md:scroll-mt-0" id="about">
      <motion.div
        className="flex w-full flex-col items-center justify-center"
        exit="hidden"
        initial="hidden"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.2 }}
        whileInView="visible"
      >
        <Tabs
          className="items-center justify-center space-y-6"
          defaultValue="about"
        >
          <TabsList className="flex justify-center gap-1 bg-transparent">
            <TabsTrigger
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              value="about"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              value="degree"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              value="certifications"
            >
              Certifications
            </TabsTrigger>
          </TabsList>

          <div className="flex w-full flex-col items-center justify-start">
            <Section.Content>
              <TabsContent className="w-full" value="about">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  initial={{ opacity: 0, y: 20 }}
                  key="about-content"
                  transition={{ duration: 0.3 }}
                >
                  <Reveal>
                    <Section.Block>
                      <Section.Description>
                        Product Engineer with a track record of architecting
                        full-stack SaaS platforms that solve real business
                        problems. I specialize in the TypeScript ecosystem
                        (Next.js, React, Node.js, Supabase), building products
                        from zero to production with a focus on performance,
                        clean architecture, and developer experience.
                        <br />
                        <br />
                        <b>
                          I stay close to the frontier of the stack — shipping
                          production code with Next.js, React 19, Tailwind, and
                          Biome, and adopting new tools early when they earn
                          their place. Currently open to full-stack roles where
                          I can own features from API to UI.
                        </b>
                      </Section.Description>
                    </Section.Block>
                  </Reveal>
                </motion.div>
              </TabsContent>

              <TabsContent className="w-full" value="degree">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  initial={{ opacity: 0, y: 20 }}
                  key="degree-content"
                  transition={{ duration: 0.3 }}
                >
                  <Section.Block>
                    <div className="flex flex-col gap-4">
                      {degrees?.map((degree) => (
                        <div
                          className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                          key={degree.title}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground text-lg">
                              {degree.title}
                            </span>
                            <span
                              className={twMerge([
                                "ml-2 whitespace-nowrap rounded-full px-2 py-0.5 font-medium text-xs",
                                statusColor(degree.status),
                              ])}
                            >
                              {statusLabel(degree.status)}
                            </span>
                          </div>
                          <div className="flex flex-row items-center gap-2 text-muted-foreground text-sm">
                            <span className="font-medium">
                              {degree.institution}
                            </span>
                            <Separator className="h-3" orientation="vertical" />
                            <span className="text-xs text-zinc-400">
                              {degree.period}
                            </span>
                          </div>
                          {degree.description && (
                            <p className="mt-2 text-muted-foreground text-sm">
                              {degree.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section.Block>
                </motion.div>
              </TabsContent>

              <TabsContent className="w-full" value="certifications">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  initial={{ opacity: 0, y: 20 }}
                  key="certifications-content"
                  transition={{ duration: 0.3 }}
                >
                  <Section.Block>
                    <div className="flex flex-col gap-4">
                      {certificates?.slice(0, 2).map((certificate) => (
                        <div
                          className="flex max-w-lg flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                          key={certificate.title}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground text-lg">
                              {certificate.title}
                            </span>
                            <span
                              className={twMerge([
                                "ml-2 whitespace-nowrap rounded-full px-2 py-0.5 font-medium text-xs",
                                statusColor(certificate.status),
                              ])}
                            >
                              {statusLabel(certificate.status)}
                            </span>
                          </div>
                          {certificate.description && (
                            <div className="text-muted-foreground text-xs">
                              {certificate.description}
                            </div>
                          )}
                          <div className="flex flex-row items-center gap-2 text-muted-foreground text-sm">
                            <span className="font-medium">
                              {certificate.institution}
                            </span>
                            <Separator className="h-3" orientation="vertical" />
                            <span className="text-xs text-zinc-400">
                              {certificate.hours} hours
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section.Block>
                </motion.div>
              </TabsContent>

              <motion.div
                animate={{
                  translateY: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/about">
                  <Button>
                    Learn more
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </motion.div>
            </Section.Content>
          </div>
        </Tabs>
      </motion.div>
    </Section.Root>
  )
}

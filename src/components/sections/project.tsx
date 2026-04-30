import { easeInOut, motion } from "framer-motion"
import { ArrowRight, CheckIcon } from "lucide-react"
import Link from "next/link"

import { useProjects } from "@/hooks/use-query-data"

import { Button } from "../button"
import { Section } from "../section"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "../ui/timeline"

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function Project() {
  const { data: projects } = useProjects()

  return (
    <Section.Root className="scroll-mt-20 md:scroll-mt-0" id="project">
      <motion.div
        className="flex w-full flex-col items-center justify-center gap-6"
        exit="hidden"
        initial="hidden"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.2 }}
        whileInView="visible"
      >
        <Section.Header>
          <Section.Title>Featured Work</Section.Title>
          <Section.Description>
            Products I&apos;ve architected and shipped — from SaaS platforms to
            infrastructure tooling.
          </Section.Description>
        </Section.Header>

        <Section.Content className="items-center space-y-6 md:space-y-0">
          <ScrollArea className="h-fit w-full max-w-4xl md:h-[60vh]">
            <motion.div
              className="flex w-full items-center justify-center pr-4"
              variants={containerVariants}
            >
              <Timeline
                className="flex w-full max-w-3xl flex-col md:items-center"
                value={
                  projects
                    ? projects
                        .slice(0, 4)
                        .map((p, i) => (p.completed ? i + 1 : 0))
                        .filter(Boolean)
                        .pop()
                    : 1
                }
              >
                {projects?.slice(0, 4).map((project, idx) => (
                  <motion.div
                    className="w-full"
                    key={project.name}
                    variants={itemVariants}
                  >
                    <TimelineItem
                      className="py-4 transition-all duration-300 group-data-[orientation=vertical]/timeline:ms-10"
                      step={idx + 1}
                    >
                      <TimelineHeader>
                        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-full" />
                        <TimelineDate>{project.year ?? "2024"}</TimelineDate>
                        <TimelineTitle>{project.name}</TimelineTitle>
                        <TimelineIndicator className="flex size-6 items-center justify-center group-data-[orientation=vertical]/timeline:-left-7 group-data-completed/timeline-item:border-none group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground">
                          <CheckIcon
                            className="group-not-data-completed/timeline-item:hidden"
                            size={16}
                          />
                        </TimelineIndicator>
                      </TimelineHeader>
                      <TimelineContent className="flex w-full flex-col gap-2 md:w-[500px]">
                        <div className="w-full text-muted-foreground">
                          {project.description}
                        </div>
                        <div className="flex gap-2">
                          {project.techs.map((tech) => (
                            <Badge key={tech} variant="blue">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                ))}
              </Timeline>
            </motion.div>
          </ScrollArea>

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
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/projects">
              <Button>
                View all projects
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </Section.Content>
      </motion.div>
    </Section.Root>
  )
}

import { easeInOut, motion, spring } from "framer-motion"
import { twMerge } from "tailwind-merge"

import { techGroups } from "@/utils/techs"

import { Section } from "../section"

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
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: spring,
      stiffness: 100,
    },
  },
}

export function TechStack() {
  return (
    <Section.Root className="scroll-mt-20 md:scroll-mt-0" id="techs">
      <motion.div
        className="flex w-full flex-col items-center justify-center gap-6"
        exit="hidden"
        initial="hidden"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.2 }}
        whileInView="visible"
      >
        <Section.Header>
          <Section.Title>Tech Stack</Section.Title>
          <Section.Description>
            The core technologies I reach for to design, build, and ship
            production products. Highlighted tools are the ones I use every day.
          </Section.Description>
        </Section.Header>

        <Section.Content className="max-w-4xl items-stretch gap-8">
          <motion.div
            className="flex w-full flex-col gap-8"
            variants={containerVariants}
          >
            {techGroups.map((group) => (
              <motion.div
                className="flex w-full flex-col gap-4"
                key={group.category}
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-base">{group.category}</h3>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {group.items.map((tech) => (
                    <motion.div
                      className={twMerge(
                        "group flex items-center gap-2.5 rounded-lg border bg-background p-3 shadow-sm transition-all duration-300 hover:shadow-md",
                        tech.featured &&
                          "border-sky-500/40 bg-sky-500/[0.06] ring-1 ring-sky-500/20 dark:bg-sky-400/[0.06]"
                      )}
                      key={tech.name}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span
                        className={twMerge(
                          "shrink-0 text-2xl transition-colors",
                          tech.featured
                            ? "text-sky-600 dark:text-sky-400"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {tech.icon}
                      </span>
                      <span className="truncate font-medium text-sm">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section.Content>
      </motion.div>
    </Section.Root>
  )
}

import { easeInOut, motion, spring } from 'framer-motion'

import { techs } from '@/utils/techs'

import { Section } from '../section'

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
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: spring,
      stiffness: 100,
    },
  },
}

export function TechStack() {
  return (
    <Section.Root id="techs" className="scroll-mt-20 md:scroll-mt-0">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
        className="flex w-full flex-col items-center justify-center gap-6"
      >
        <Section.Header>
          <Section.Title>Tech Stack</Section.Title>
          <Section.Description>
            The technologies and tools I use daily to architect and ship
            production-grade products.
          </Section.Description>
        </Section.Header>

        <Section.Content className="max-w-5xl">
          <motion.div
            className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            variants={containerVariants}
          >
            {techs.map((tech) => (
              <motion.div
                key={tech.name}
                className="group flex flex-col items-center justify-center gap-1.5 rounded-lg border bg-background p-3 shadow-sm transition-all duration-300 hover:bg-muted/40 hover:shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl text-muted-foreground transition-colors group-hover:text-foreground">
                  {tech.icon}
                </div>
                <span className="text-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Section.Content>
      </motion.div>
    </Section.Root>
  )
}

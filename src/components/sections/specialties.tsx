import { easeInOut, motion, spring } from 'framer-motion'

import { specialties } from '@/utils/specialities'

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
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: spring, stiffness: 100 },
  },
}

export function Specialties() {
  return (
    <Section.Root id="specialties" className="scroll-mt-20 md:scroll-mt-0">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
        className="flex w-full flex-col items-center justify-center gap-6"
      >
        <Section.Header>
          <Section.Title>Core Expertise</Section.Title>
          <Section.Description>
            End-to-end product engineering — from system design to shipped
            pixels.
          </Section.Description>
        </Section.Header>

        <Section.Content className="max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specialties.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.03 }}
                className="flex flex-col gap-4 rounded-lg border bg-muted/20 p-6 shadow-sm transition-all duration-300 hover:bg-muted/40 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Section.Content>
      </motion.div>
    </Section.Root>
  )
}

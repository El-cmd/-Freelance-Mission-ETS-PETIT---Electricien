import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  bodyClassName,
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={cn('scroll-mt-28 py-16 sm:py-20', className)}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="max-w-3xl space-y-4">
          <span className="title-kicker">Expertise électrique</span>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p>
          ) : null}
          <div className="hairline max-w-sm" />
        </div>
        <div className={cn('mt-10', bodyClassName)}>{children}</div>
      </div>
    </motion.section>
  )
}

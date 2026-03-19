import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

import { getSiteConfig, getTrustHighlights, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const trustHighlights = getTrustHighlights(locale)
  const copy = getUiCopy(locale)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-16">
      <div className="hero-surface pointer-events-none" />
      <div className="container relative">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge
            variant="secondary"
            className="mb-6 border-border bg-card/90 text-xs font-semibold text-primary"
          >
            {copy.heroBadge}
          </Badge>

          <h1 className="font-heading text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {copy.heroTitleStart}
            <span className="text-primary">{copy.heroTitleHighlight}</span>
            {copy.heroTitleEnd}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {copy.heroDescription}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="shadow-soft">
              <a href={siteConfig.phoneHref}>
                <Phone className="mr-2 h-4 w-4" />
                {copy.callNow}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">
                {copy.requestQuote}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustHighlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="rounded-xl border border-border/70 bg-card/90 p-4 text-left shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
              >
                <Icon className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-foreground">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

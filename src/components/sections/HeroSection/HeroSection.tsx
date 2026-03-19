import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

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
    <section id="home" className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16">
      <div className="hero-surface pointer-events-none" />
      <div className="container relative">
        <div className="mx-auto mb-8 hidden max-w-4xl lg:block">
          <div className="electric-line" />
        </div>
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge
            variant="secondary"
            className="mb-6 border-primary/45 bg-background/85 px-4 py-1 text-xs font-semibold tracking-[0.1em] text-primary"
          >
            <Zap className="mr-1.5 h-3.5 w-3.5" />
            {copy.heroBadge}
          </Badge>

          <h1 className="font-heading text-balance text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {copy.heroTitleStart}
            <span className="text-primary [text-shadow:0_0_12px_rgba(255,217,0,0.22)]">
              {copy.heroTitleHighlight}
            </span>
            {copy.heroTitleEnd}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg">
            {copy.heroDescription}
          </p>

          <div className="electric-panel mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 rounded-xl p-4 sm:flex-row sm:rounded-2xl sm:p-5">
            <Button asChild size="lg" className="shadow-soft sm:flex-1">
              <a href={siteConfig.phoneHref}>
                <Phone className="mr-2 h-4 w-4" />
                {copy.callNow}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="sm:flex-1">
              <Link to="/contact">
                {copy.requestQuote}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustHighlights.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="electric-panel rounded-xl p-4 text-left"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

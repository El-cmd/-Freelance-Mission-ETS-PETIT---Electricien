import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import electricianPanelBg from '@/assets/electrician-panel-bg.png'
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
    <section
      id="home"
      className="relative overflow-hidden border-y border-border/40 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:min-h-[76vh]"
    >
      <img
        src={electricianPanelBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.62)_46%,rgba(255,255,255,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,29,0.28)_0%,rgba(8,17,29,0.12)_38%,rgba(8,17,29,0)_70%),radial-gradient(circle_at_14%_18%,rgba(247,198,0,0.18),transparent_30%)]" />
      <div className="container relative">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mx-auto max-w-5xl"
        >
          <div className="text-left lg:max-w-[760px]">
            <Badge
              variant="secondary"
              className="mb-6 border-border bg-white/78 px-4 py-1 text-xs font-semibold tracking-[0.08em] text-secondary-foreground backdrop-blur-sm"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5 text-primary" />
              {copy.heroBadge}
            </Badge>

            <h1 className="font-heading text-balance text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {copy.heroTitleStart}
              <span className="text-primary">
                {copy.heroTitleHighlight}
              </span>
              {copy.heroTitleEnd}
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base text-foreground/80 sm:text-lg">
              {copy.heroDescription}
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="sm:flex-1">
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  {copy.callNow}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="sm:flex-1"
              >
                <Link to="/contact">
                  {copy.requestQuote}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {trustHighlights.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="surface-soft rounded-2xl p-4 text-left"
                >
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import electricianPanelBg from '@/assets/electrician-panel-bg.webp'
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
      className="relative overflow-hidden border-y border-border/40 pb-8 pt-6 sm:pb-10 sm:pt-8 lg:pb-10 lg:pt-8"
    >
      <img
        src={electricianPanelBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-right"
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
          <div className="text-left lg:max-w-[740px]">
            <Badge
              variant="secondary"
              className="mb-4 border-border bg-white/78 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-secondary-foreground backdrop-blur-sm"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5 text-primary" />
              {copy.heroBadge}
            </Badge>

            <h1 className="font-heading text-balance text-3xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {copy.heroTitleStart}
              <span className="text-amber-700">
                {copy.heroTitleHighlight}
              </span>
              {copy.heroTitleEnd}
            </h1>

            <p className="mt-4 max-w-2xl text-pretty text-[15px] text-foreground/80 sm:text-base">
              {copy.heroDescription}
            </p>

            <div className="mt-6 flex max-w-xl flex-col gap-2.5 sm:flex-row">
              <Button asChild className="sm:flex-1">
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  {copy.callNow}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="sm:flex-1"
              >
                <Link to="/contact">
                  {copy.requestQuote}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
              {trustHighlights.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="surface-soft rounded-2xl p-3 text-left"
                >
                  <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-[15px] font-medium leading-snug text-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

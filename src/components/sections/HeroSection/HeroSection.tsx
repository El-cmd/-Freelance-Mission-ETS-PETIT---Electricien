import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import tableauImage from '@/assets/tableau.png'
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
      className="relative overflow-hidden border-y border-border/60 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:min-h-[84vh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#060607]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%]">
        <img
          src={tableauImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-right opacity-90"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/42" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_35%,rgba(255,200,0,0.12),transparent_38%),radial-gradient(circle_at_82%_60%,rgba(255,160,0,0.16),transparent_36%)]" />
      <div className="container relative">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="max-w-5xl"
        >
          <div className="text-left lg:max-w-[760px]">
            <Badge
              variant="secondary"
              className="mb-6 border-primary/45 bg-black/50 px-4 py-1 text-xs font-semibold tracking-[0.1em] text-primary backdrop-blur-sm"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              {copy.heroBadge}
            </Badge>

            <h1 className="font-heading text-balance text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.heroTitleStart}
              <span className="text-primary [text-shadow:0_0_16px_rgba(255,217,0,0.32)]">
                {copy.heroTitleHighlight}
              </span>
              {copy.heroTitleEnd}
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base text-white/84 sm:text-lg">
              {copy.heroDescription}
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="sm:flex-1">
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  {copy.callNow}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/25 bg-black/30 text-white hover:bg-black/45 hover:text-white sm:flex-1">
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
                  className="rounded-xl border border-white/18 bg-black/44 p-4 text-left backdrop-blur-[1px]"
                >
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-white">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

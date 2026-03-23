import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import electricianPanelBg from '@/assets/electrician-panel-bg.webp'
import partnerHager from '@/assets/partner-hager.webp'
import partnerLegrand from '@/assets/partner-legrand.webp'
import partnerSchneider from '@/assets/partner-schneider.webp'
import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)
  const shouldReduceMotion = useReducedMotion()
  const partnersLabel = locale === 'fr' ? 'Nos partenaires' : 'Our partners'
  const partnerLogos = [
    { name: 'Hager', image: partnerHager, width: 533, height: 178 },
    { name: 'Schneider Electric', image: partnerSchneider, width: 250, height: 76 },
    { name: 'Legrand', image: partnerLegrand, width: 1200, height: 300 },
  ]

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-4rem-5.5rem-env(safe-area-inset-bottom))] overflow-hidden border-y border-border/40 pb-9 pt-8 sm:pb-11 sm:pt-9 md:min-h-[calc(100svh-4rem)] md:pb-12 md:pt-10 lg:pb-14 lg:pt-12"
    >
      <img
        src={electricianPanelBg}
        alt=""
        aria-hidden="true"
        width={1507}
        height={1024}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-right"
      />
      <div className="container relative">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mx-auto max-w-6xl"
        >
          <div className="text-left lg:max-w-[920px]">
            <Badge
              variant="secondary"
              className="mb-4 border-border bg-white/78 px-4 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-[#081a42] backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[11px]"
            >
              <Zap className="mr-2 h-4 w-4 text-primary sm:mr-1.5 sm:h-3.5 sm:w-3.5" />
              {copy.heroBadge}
            </Badge>

            <h1
              className="font-heading text-balance text-4xl font-bold leading-[1.02] tracking-tight text-[#081a42] sm:text-5xl lg:text-6xl"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 8px 24px rgba(8,26,66,0.18)' }}
            >
              {copy.heroTitleStart}
              <span className="text-[#081a42]">
                {copy.heroTitleHighlight}
              </span>
              {copy.heroTitleEnd}
            </h1>

            <p className="mt-6 max-w-3xl text-pretty text-base font-semibold text-black sm:text-lg">
              {copy.heroDescription}
            </p>

            <div className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row">
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

            <div className="mt-9">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#081a42]">
                {partnersLabel}
              </p>
              <div className="relative overflow-hidden rounded-2xl bg-transparent py-3">
                <div className="partner-marquee-track flex w-max items-center gap-10 px-5">
                  {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex h-12 w-[160px] items-center justify-center"
                    >
                      <img
                        src={partner.image}
                        alt={`Logo ${partner.name}`}
                        width={partner.width}
                        height={partner.height}
                        loading="lazy"
                        decoding="async"
                        className="max-h-8 w-auto object-contain grayscale-[0.05]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

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
      <div className="relative w-full px-3 sm:px-5 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="max-w-none"
        >
          <div className="text-left lg:max-w-[1180px]">
            <Badge
              variant="secondary"
              className="mb-5 border-border bg-white/78 px-4 py-1.5 text-[13px] font-semibold tracking-[0.08em] text-[#081a42] backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-[12px]"
            >
              <Zap className="mr-2 h-4 w-4 text-primary sm:h-4 sm:w-4" />
              {copy.heroBadge}
            </Badge>

            <h1
              className="font-heading text-balance text-[2.75rem] font-bold leading-[1.02] tracking-tight text-[#081a42] sm:text-6xl lg:text-[4.75rem]"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 8px 24px rgba(8,26,66,0.18)' }}
            >
              {copy.heroTitleStart}
              <span className="text-[#081a42]">
                {copy.heroTitleHighlight}
              </span>
              {copy.heroTitleEnd}
            </h1>

            <div className="relative mt-5 max-w-4xl overflow-hidden rounded-2xl border border-[#274b90] bg-gradient-to-br from-[#0a2152] via-[#0b2a63] to-[#081c45] p-4 shadow-[0_14px_36px_rgba(8,26,66,0.34)] sm:mt-7 sm:p-5">
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
              <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/90 to-transparent" />
              <p className="relative text-pretty text-base font-semibold leading-relaxed text-[#ffd648] sm:text-lg lg:text-xl">
                {copy.heroDescription}
              </p>
            </div>

            <div className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
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

            <div className="mt-14 lg:mt-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#081a42]">
                {partnersLabel}
              </p>
              <div className="relative overflow-hidden rounded-3xl bg-transparent py-4 sm:py-5">
                <div className="partner-marquee-track flex w-max items-center gap-14 px-8">
                  {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex h-16 w-[210px] items-center justify-center"
                    >
                      <img
                        src={partner.image}
                        alt={`Logo ${partner.name}`}
                        width={partner.width}
                        height={partner.height}
                        loading="lazy"
                        decoding="async"
                        className="max-h-11 w-auto object-contain grayscale-[0.05]"
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

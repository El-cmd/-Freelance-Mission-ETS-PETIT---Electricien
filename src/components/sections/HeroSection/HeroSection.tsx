import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, Zap } from 'lucide-react'
import type { ReactNode } from 'react'
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
  const titleBlueStroke =
    '1px 0 0 #f7c600, -1px 0 0 #f7c600, 0 1px 0 #f7c600, 0 -1px 0 #f7c600, 0 8px 24px rgba(8,26,66,0.18)'
  const titleYellowStroke =
    '1px 0 0 #081a42, -1px 0 0 #081a42, 0 1px 0 #081a42, 0 -1px 0 #081a42, 0 8px 18px rgba(8,26,66,0.22)'
  const heroTitleNode =
    locale === 'fr' ? (
      <>
        Quentin{' '}
        <span className="text-primary" style={{ textShadow: titleYellowStroke }}>
          Petit
        </span>{' '}
        - votre{' '}
        <span className="text-primary" style={{ textShadow: titleYellowStroke }}>
          électricien
        </span>{' '}
        de confiance.
      </>
    ) : (
      <>
        {copy.heroTitleStart}
        <span className="text-[#081a42]">{copy.heroTitleHighlight}</span>
        {copy.heroTitleEnd}
      </>
    )
  const heroDescriptionNode: ReactNode =
    locale === 'fr' ? (
      <>
        ETS PETIT accompagne particuliers et professionnels pour le{' '}
        <span className="font-bold text-primary">dépannage</span>, la{' '}
        <span className="font-bold text-primary">rénovation</span>, les tableaux électriques et la
        mise en sécurité.
      </>
    ) : (
      copy.heroDescription
    )
  const partnerLogos = [
    { name: 'Hager', image: partnerHager, width: 533, height: 178 },
    { name: 'Schneider Electric', image: partnerSchneider, width: 250, height: 76 },
    { name: 'Legrand', image: partnerLegrand, width: 1200, height: 300 },
  ]

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-4rem-5.5rem-env(safe-area-inset-bottom))] overflow-hidden pb-9 pt-8 sm:pb-11 sm:pt-9 md:min-h-[calc(100svh-4rem)] md:pb-12 md:pt-10 lg:pb-14 lg:pt-12"
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
              style={{ textShadow: titleBlueStroke }}
            >
              {heroTitleNode}
            </h1>

            <div className="relative mt-5 max-w-4xl overflow-hidden rounded-[1.35rem] border border-white/25 bg-[#081a42] p-3 shadow-[0_14px_26px_rgba(8,26,66,0.3)] sm:mt-6 sm:rounded-[1.6rem] sm:p-6 sm:shadow-[0_18px_34px_rgba(8,26,66,0.34)]">
              <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-white/12 sm:rounded-[1.6rem]" />

              <div className="relative flex items-start gap-2.5 sm:gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/60 bg-[#081a42] sm:h-14 sm:w-14">
                  <Zap className="h-5 w-5 text-primary sm:h-7 sm:w-7" />
                </div>
                <p className="text-pretty text-[0.9rem] font-semibold leading-relaxed text-white sm:text-[2rem]">
                  {heroDescriptionNode}
                </p>
              </div>

              <div className="relative mt-3 grid gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-3">
                <Button
                  asChild
                  className="h-10 rounded-full bg-primary text-primary-foreground shadow-[0_8px_16px_rgba(247,198,0,0.25)] hover:brightness-[1.02] sm:h-11"
                >
                  <a href={siteConfig.phoneHref}>
                    <Phone className="mr-2 h-4 w-4" />
                    {copy.callNow}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-full border-white/55 bg-white text-[#081a42] shadow-[0_8px_16px_rgba(255,255,255,0.2)] hover:bg-white/90 sm:h-11"
                >
                  <Link to="/contact">
                    {copy.requestQuote}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
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

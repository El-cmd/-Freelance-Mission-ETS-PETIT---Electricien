import { CheckCircle2 } from 'lucide-react'

import googleAvisLogo from '@/assets/google-avis.jpg'
import logoAlloVoisins from '@/assets/logo-allovoisins-baseline.svg'
import logo from '@/assets/logo.webp'
import {
  getAboutPoints,
  getAboutStats,
  getUiCopy,
} from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Section } from '@/components/layout/Section'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { Card, CardContent } from '@/components/ui/card'

export function AboutSection() {
  const { locale } = useLocale()
  const aboutPoints = getAboutPoints(locale)
  const aboutStats = getAboutStats(locale)
  const copy = getUiCopy(locale)
  const testimonialsTitle = locale === 'fr' ? 'Avis clients' : 'Client reviews'

  return (
    <Section
      id="about"
      title={copy.sectionAboutTitle}
      subtitle={copy.sectionAboutSubtitle}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6 inline-flex rounded-[1.2rem] bg-[#081a42] px-4 py-3 shadow-[0_16px_30px_rgba(8,26,66,0.18)] sm:px-5 sm:py-4">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Logo ETS PETIT"
                  width={371}
                  height={122}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto rounded-lg object-contain sm:h-12"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.aboutDescription}
            </p>
            <div className="hairline mt-5 max-w-[180px]" />
            <ul className="mt-6 space-y-3">
              {aboutPoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="hidden gap-4 sm:grid">
          {aboutStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <p className="font-heading text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
          {testimonialsTitle}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <a
            href="https://www.allovoisins.com/p/quentinpetit-28"
            target="_blank"
            rel="noreferrer"
            aria-label="Voir le profil AlloVoisins"
            className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-4 shadow-[0_16px_30px_rgba(8,26,66,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_34px_rgba(8,26,66,0.14)]"
          >
            <img
              src={logoAlloVoisins}
              alt="AlloVoisins"
              loading="lazy"
              decoding="async"
              className="h-5 w-auto object-contain sm:h-6"
            />
          </a>
          <a
            href="https://share.google/NakEPS4fyz7yl2r5A"
            target="_blank"
            rel="noreferrer"
            aria-label="Voir les avis Google"
            className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-4 shadow-[0_16px_30px_rgba(8,26,66,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_34px_rgba(8,26,66,0.14)]"
          >
            <img
              src={googleAvisLogo}
              alt="Google Avis"
              loading="lazy"
              decoding="async"
              className="h-7 w-auto object-contain"
            />
          </a>
        </div>
        <TestimonialsSection />
      </div>

    </Section>
  )
}

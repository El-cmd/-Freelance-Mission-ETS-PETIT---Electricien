import { CheckCircle2 } from 'lucide-react'

import labelProfessionnelGaz from '@/assets/label-professionnel-du-gaz.webp'
import labelRgeQualibat from '@/assets/label-rge-qualibat.webp'
import labelRgeQualipac from '@/assets/label-rge-qualipac.webp'
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
  const labels =
    locale === 'fr'
      ? [
          { src: labelRgeQualibat, alt: 'Label RGE Qualibat' },
          { src: labelRgeQualipac, alt: 'Label RGE QualiPAC' },
          { src: labelProfessionnelGaz, alt: 'Label Professionnel du Gaz' },
        ]
      : [
          { src: labelRgeQualibat, alt: 'RGE Qualibat label' },
          { src: labelRgeQualipac, alt: 'RGE QualiPAC label' },
          { src: labelProfessionnelGaz, alt: 'Gas professional label' },
        ]
  const labelsTitle = locale === 'fr' ? 'Nos labels' : 'Our labels'
  const testimonialsTitle = locale === 'fr' ? 'Avis clients' : 'Client reviews'
  const reviewsSourceLabel = locale === 'fr' ? 'Voir le profil AlloVoisins' : 'View AlloVoisins profile'

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

        <div className="grid gap-4">
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
        <a
          href="https://www.allovoisins.com/p/quentinpetit-28"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-[0_16px_30px_rgba(8,26,66,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_34px_rgba(8,26,66,0.14)]"
        >
          <img
            src={logoAlloVoisins}
            alt="AlloVoisins"
            loading="lazy"
            decoding="async"
            className="h-5 w-auto object-contain sm:h-6"
          />
          <span>{reviewsSourceLabel}</span>
        </a>
        <TestimonialsSection />
      </div>

      <Card className="mt-6">
        <CardContent className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">{labelsTitle}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {labels.map((item) => (
              <div
                key={item.alt}
                className="rounded-xl bg-white/65 p-2 sm:p-3"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-full object-contain sm:h-16"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}

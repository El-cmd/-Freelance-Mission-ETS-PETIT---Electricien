import { CheckCircle2 } from 'lucide-react'

import labelProfessionnelGaz from '@/assets/label-professionnel-du-gaz.webp'
import labelRgeQualibat from '@/assets/label-rge-qualibat.webp'
import labelRgeQualipac from '@/assets/label-rge-qualipac.webp'
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

  return (
    <Section
      id="about"
      title={copy.sectionAboutTitle}
      subtitle={copy.sectionAboutSubtitle}
      className="bg-background"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border-[#081a42]/10 bg-[linear-gradient(180deg,rgba(8,26,66,0.04),rgba(255,255,255,0.96)_24%)] shadow-[0_18px_36px_rgba(8,26,66,0.10)]">
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
                  <span className="text-[#081a42]">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {aboutStats.map((stat) => (
            <Card
              key={stat.label}
              className="border-[#081a42]/12 bg-[#081a42] text-white shadow-[0_18px_34px_rgba(8,26,66,0.18)]"
            >
              <CardContent className="p-6">
                <p className="font-heading text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-white/78">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-6 border-[#081a42]/10 bg-[linear-gradient(180deg,rgba(8,26,66,0.05),rgba(255,255,255,0.96)_26%)] shadow-[0_18px_36px_rgba(8,26,66,0.10)]">
        <CardContent className="p-6 sm:p-8">
          <h3 className="font-heading text-xl font-semibold text-[#081a42] sm:text-2xl">{labelsTitle}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {labels.map((item) => (
              <div
                key={item.alt}
                className="rounded-xl border border-[#081a42]/10 bg-white/85 p-2 shadow-[0_10px_24px_rgba(8,26,66,0.08)] sm:p-3"
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

      <div className="mt-6">
        <h3 className="font-heading text-xl font-semibold text-[#081a42] sm:text-2xl">
          {testimonialsTitle}
        </h3>
        <TestimonialsSection />
      </div>
    </Section>
  )
}

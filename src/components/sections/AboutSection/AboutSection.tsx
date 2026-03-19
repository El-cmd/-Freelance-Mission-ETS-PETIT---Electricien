import { CheckCircle2 } from 'lucide-react'

import logo from '@/assets/logo.png'
import {
  getAboutPoints,
  getAboutStats,
  getUiCopy,
} from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Section } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/card'

export function AboutSection() {
  const { locale } = useLocale()
  const aboutPoints = getAboutPoints(locale)
  const aboutStats = getAboutStats(locale)
  const copy = getUiCopy(locale)

  return (
    <Section
      id="about"
      title={copy.sectionAboutTitle}
      subtitle={copy.sectionAboutSubtitle}
      className="bg-background"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="electric-panel border-primary/20 bg-card/95">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-4">
              <img
                src={logo}
                alt="Logo ETS PETIT"
                className="h-10 w-auto rounded-lg object-contain sm:h-12"
              />
              <div>
                <p className="font-heading text-xl font-semibold text-foreground">ETS PETIT</p>
                <p className="text-sm text-muted-foreground">{copy.aboutCardSubtitle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.aboutDescription}
            </p>
            <div className="electric-line mt-5 max-w-[180px]" />
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
            <Card key={stat.label} className="electric-panel border-primary/20 bg-card/95">
              <CardContent className="p-6">
                <p className="font-heading text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

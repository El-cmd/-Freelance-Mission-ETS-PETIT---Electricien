import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import tableauAfterImage from '@/assets/tableau-apres.jpg'
import tableauBeforeImage from '@/assets/tableau-avant.jpg'
import { getServices, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/layout/Section'

export function ServicesSection() {
  const { locale } = useLocale()
  const services = getServices(locale)
  const copy = getUiCopy(locale)
  const shouldReduceMotion = useReducedMotion()
  const [tableauSplit, setTableauSplit] = useState(50)
  const beforeLabel = locale === 'fr' ? 'Avant' : 'Before'
  const afterLabel = locale === 'fr' ? 'Après' : 'After'

  return (
    <Section
      id="services"
      title={copy.sectionServicesTitle}
      subtitle={copy.sectionServicesSubtitle}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.24, delay: index * 0.04 }}
            className="group"
          >
            <Card className="h-full transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <CardHeader className="p-5 pb-3 pt-4">
                <CardTitle>{service.title}</CardTitle>
                <div className="hairline mt-2 max-w-[140px]" />
              </CardHeader>
              <CardContent className="p-5 pt-0">
                {service.id === 'tableau' ? (
                  <div className="relative mb-3 aspect-[16/11] overflow-hidden rounded-xl border border-border/80">
                    <img
                      src={tableauAfterImage}
                      alt={locale === 'fr' ? 'Tableau électrique après intervention' : 'Electrical panel after intervention'}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <img
                      src={tableauBeforeImage}
                      alt={locale === 'fr' ? 'Tableau électrique avant intervention' : 'Electrical panel before intervention'}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        clipPath: `inset(0 ${100 - tableauSplit}% 0 0)`,
                        WebkitClipPath: `inset(0 ${100 - tableauSplit}% 0 0)`,
                      }}
                    />

                    <div className="pointer-events-none absolute inset-y-0" style={{ left: `calc(${tableauSplit}% - 1px)` }}>
                      <div className="h-full w-0.5 bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
                      <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/95 text-sm font-bold text-slate-900">
                        ◀▶
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between text-xs font-semibold text-white">
                      <span className="rounded-md bg-black/45 px-2 py-1">{beforeLabel}</span>
                      <span className="rounded-md bg-black/45 px-2 py-1">{afterLabel}</span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={tableauSplit}
                      onChange={(event) => setTableauSplit(Number(event.target.value))}
                      aria-label={locale === 'fr' ? 'Comparer avant et après' : 'Compare before and after'}
                      className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                    />
                  </div>
                ) : null}
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

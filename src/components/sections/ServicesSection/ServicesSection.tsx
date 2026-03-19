import { motion, useReducedMotion } from 'framer-motion'

import { getServices, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/layout/Section'

export function ServicesSection() {
  const { locale } = useLocale()
  const services = getServices(locale)
  const copy = getUiCopy(locale)
  const shouldReduceMotion = useReducedMotion()

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
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group"
          >
            <Card className="electric-panel h-full border-primary/20 bg-card/95 transition-transform duration-300 group-hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/45 bg-primary/10">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <div className="electric-line mt-2 max-w-[140px]" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

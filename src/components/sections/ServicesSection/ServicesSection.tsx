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
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.24, delay: index * 0.04 }}
            className="group"
          >
            <Card className="h-full transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <div className="hairline mt-2 max-w-[140px]" />
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

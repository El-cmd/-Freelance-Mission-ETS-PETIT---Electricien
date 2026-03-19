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
          >
            <Card className="h-full border-border/70 bg-card/90">
              <CardHeader>
                <service.icon className="mb-4 h-6 w-6 text-primary" />
                <CardTitle>{service.title}</CardTitle>
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

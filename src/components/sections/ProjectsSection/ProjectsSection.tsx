import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

import { getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Section } from '@/components/layout/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProjectsSection() {
  const { locale } = useLocale()
  const copy = getUiCopy(locale)
  const shouldReduceMotion = useReducedMotion()
  const tariffs =
    locale === 'fr'
      ? [
          {
            id: 'diagnostic',
            title: 'Déplacement + diagnostic',
            price: 'À partir de 45 €',
            details: [
              'Analyse de la panne sur place',
              'Conseils de mise en sécurité immédiats',
              'Devis validé avant toute intervention',
            ],
            note: 'Roubaix et métropole lilloise',
          },
          {
            id: 'depannage',
            title: 'Dépannage rapide (1ère heure)',
            price: 'À partir de 90 €',
            details: [
              'Recherche de panne électrique',
              'Remise en service si possible immédiatement',
              'Explication claire des travaux réalisés',
            ],
            note: 'Pièces non incluses',
          },
          {
            id: 'tableau',
            title: 'Tableau électrique',
            price: 'À partir de 690 €',
            details: [
              'Remplacement du tableau existant',
              'Mise aux normes des protections',
              'Repérage des circuits pour maintenance',
            ],
            note: 'Tarif ajusté selon installation',
          },
          {
            id: 'renovation',
            title: 'Rénovation installation',
            price: 'Sur devis',
            details: [
              'Visite technique préalable',
              'Chiffrage poste par poste',
              'Planning d intervention clair',
            ],
            note: 'Devis gratuit',
          },
        ]
      : [
          {
            id: 'diagnostic',
            title: 'Travel + diagnostic',
            price: 'From €45',
            details: [
              'On-site fault assessment',
              'Immediate safety guidance',
              'Quote confirmed before any work',
            ],
            note: 'Roubaix and Lille metro area',
          },
          {
            id: 'depannage',
            title: 'Rapid troubleshooting (first hour)',
            price: 'From €90',
            details: [
              'Electrical fault finding',
              'Power restoration when possible',
              'Clear explanation of completed work',
            ],
            note: 'Parts not included',
          },
          {
            id: 'tableau',
            title: 'Electrical panel replacement',
            price: 'From €690',
            details: [
              'Replacement of existing panel',
              'Safety/compliance protection setup',
              'Circuit labeling for easier maintenance',
            ],
            note: 'Final price depends on setup',
          },
          {
            id: 'renovation',
            title: 'Electrical renovation',
            price: 'On quote',
            details: [
              'Technical visit first',
              'Detailed itemized quotation',
              'Clear intervention schedule',
            ],
            note: 'Free quotation',
          },
        ]

  return (
    <Section
      id="projects"
      title={copy.sectionProjectsTitle}
      subtitle={copy.sectionProjectsSubtitle}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tariffs.map((tariff, index) => (
          <motion.div
            key={tariff.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.24, delay: index * 0.04 }}
          >
            <Card className="h-full">
              <CardHeader className="p-5 pb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {locale === 'fr' ? 'Tarif indicatif' : 'Indicative price'}
                </p>
                <CardTitle className="text-xl">{tariff.title}</CardTitle>
                <p className="font-heading text-2xl font-semibold text-foreground">{tariff.price}</p>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <ul className="space-y-2.5">
                  {tariff.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.06em] text-foreground/70">
                  {tariff.note}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

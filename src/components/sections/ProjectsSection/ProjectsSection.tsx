import { motion, useReducedMotion } from 'framer-motion'
import { Check, Clock3, RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import fondCardBorne from '@/assets/fond-card-borne.webp'
import { getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { cn } from '@/lib/utils'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type PricingOffer = {
  id: string
  tier: string
  title: string
  price: string
  summary: string
  details: string[]
  delivery: string
  revisions: string
}

type PricingCategory = {
  id: string
  title: string
  subtitle?: string
  footerNote?: string
  offers: PricingOffer[]
}

type PricingCategoryCardProps = {
  category: PricingCategory
  continueLabel: string
  locale: 'fr' | 'en'
  shouldReduceMotion: boolean
}

function PricingCategoryCard({
  category,
  continueLabel,
  locale,
  shouldReduceMotion,
}: PricingCategoryCardProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeOffer = category.offers[activeIndex]
  const hasTabs = category.offers.length > 1
  const isChargingCategory = category.id === 'borne' || category.id === 'charging'

  return (
    <motion.div
      className="h-full"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24 }}
    >
      <Card
        className={cn(
          'relative flex h-auto flex-col overflow-hidden rounded-xl shadow-none lg:h-[39rem]',
          isChargingCategory ? 'border-white/20 text-white' : 'border-border/80',
        )}
      >
        {isChargingCategory ? (
          <div className="absolute inset-0">
            <img
              src={fondCardBorne}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div
          className={cn(
            'relative z-10 border-b px-5 py-4',
            isChargingCategory ? 'border-white/15 bg-slate-900/35 backdrop-blur-[1px]' : 'border-border bg-muted/20',
          )}
        >
          <h3
            className={cn(
              'font-heading text-xl font-semibold',
              isChargingCategory ? 'text-white' : 'text-foreground',
            )}
          >
            {category.title}
          </h3>
          {category.subtitle ? (
            <p className={cn('mt-1 text-sm', isChargingCategory ? 'text-white/80' : 'text-muted-foreground')}>
              {category.subtitle}
            </p>
          ) : null}
        </div>

        {hasTabs ? (
          <div
            className={cn(
              'relative z-10 grid border-b',
              isChargingCategory ? 'border-white/15 bg-white/10 backdrop-blur-sm' : 'border-border bg-muted/30',
              category.offers.length === 2 ? 'grid-cols-2' : 'grid-cols-3',
            )}
          >
            {category.offers.map((offer, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={offer.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'border-r px-4 py-3 text-center text-base font-semibold transition-colors last:border-r-0',
                    isChargingCategory ? 'border-white/15' : 'border-border',
                    isActive
                      ? isChargingCategory
                        ? 'bg-white/12 text-white shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.9)]'
                        : 'bg-card text-foreground shadow-[inset_0_-2px_0_0_hsl(var(--foreground))]'
                      : isChargingCategory
                        ? 'text-white/75 hover:bg-white/10'
                        : 'text-muted-foreground hover:bg-muted/50',
                  )}
                  aria-label={`${locale === 'fr' ? 'Offre' : 'Offer'} ${offer.tier}`}
                >
                  {offer.tier}
                </button>
              )
            })}
          </div>
        ) : null}

        <CardContent className="relative z-10 flex h-full flex-col p-5">
          <div className="flex-1">
            {!hasTabs ? (
              <p
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.08em]',
                  isChargingCategory ? 'text-white/75' : 'text-muted-foreground',
                )}
              >
                {activeOffer.tier}
              </p>
            ) : null}

            <h4
              className={cn(
                'mt-1 font-heading text-xl font-semibold uppercase tracking-tight',
                isChargingCategory ? 'text-white' : 'text-foreground',
              )}
            >
              {activeOffer.title}
            </h4>
            <p
              className={cn(
                'mt-1 font-heading text-3xl font-semibold',
                isChargingCategory ? 'text-white' : 'text-foreground',
              )}
            >
              {activeOffer.price}
            </p>
            <p
              className={cn(
                'mt-4 text-base leading-relaxed',
                isChargingCategory ? 'text-slate-100' : 'text-muted-foreground',
              )}
            >
              {activeOffer.summary}
            </p>

            <div
              className={cn(
                'mt-4 flex flex-wrap gap-4 text-sm font-semibold',
                isChargingCategory ? 'text-white' : 'text-foreground/80',
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {activeOffer.delivery}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCcw className="h-4 w-4" />
                {activeOffer.revisions}
              </span>
            </div>

            <ul className="mt-4 space-y-2.5">
              {activeOffer.details.map((detail) => (
                <li
                  key={`${activeOffer.id}-${detail}`}
                  className={cn(
                    'flex items-start gap-2.5 text-sm',
                    isChargingCategory ? 'text-slate-100' : 'text-muted-foreground',
                  )}
                >
                  <Check className={cn('mt-0.5 h-4 w-4 shrink-0', isChargingCategory ? 'text-white' : 'text-foreground')} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            {category.footerNote ? (
              <p
                className={cn(
                  'mt-4 text-xs font-medium uppercase tracking-[0.06em]',
                  isChargingCategory ? 'text-white/80' : 'text-foreground/70',
                )}
              >
                {category.footerNote}
              </p>
            ) : null}
          </div>

          <Button
            asChild
            className="mt-6 h-11 w-full rounded-lg bg-foreground text-background shadow-none hover:bg-foreground/90"
          >
            <Link to="/contact">{continueLabel}</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ProjectsSection() {
  const { locale } = useLocale()
  const copy = getUiCopy(locale)
  const shouldReduceMotion = useReducedMotion()

  const categories: PricingCategory[] =
    locale === 'fr'
      ? [
          {
            id: 'depannage',
            title: 'Dépannage / Recherche de panne',
            subtitle: 'Intervention ponctuelle',
            offers: [
              {
                id: 'depannage-semaine',
                tier: 'Semaine',
                title: 'Forfait 1 heure',
                price: '50 € + 40 € déplacement',
                summary:
                  'Déplacement + première heure de dépannage incluse pour une intervention rapide.',
                delivery: 'Intervention rapide',
                revisions: 'Devis avant suite',
                details: [
                  'Recherche de panne électrique',
                  'Forfait dépannage 1 heure sur place',
                  'Explication claire avant travaux complémentaires',
                  'Intervention sur Hem et métropole lilloise',
                ],
              },
              {
                id: 'depannage-weekend',
                tier: 'Week-end',
                title: 'Intervention week-end',
                price: '80 € + 40 € déplacement',
                summary:
                  'Intervention ponctuelle le week-end avec diagnostic sur place et sécurisation si nécessaire.',
                delivery: 'Intervention rapide',
                revisions: 'Devis avant suite',
                details: [
                  'Recherche de panne électrique',
                  'Mise en sécurité immédiate si nécessaire',
                  'Explication claire avant travaux complémentaires',
                  'Intervention sur Hem et métropole lilloise',
                ],
              },
            ],
          },
          {
            id: 'borne',
            title: 'Installation borne de recharge',
            subtitle: 'Hauts-de-France',
            offers: [
              {
                id: 'pack-eco',
                tier: 'Basique',
                title: 'Pack Éco',
                price: 'À partir de 450 € TTC',
                summary: "Prise renforcée Green'up pour petits rouleurs et hybrides rechargeables.",
                delivery: 'Pose planifiée',
                revisions: 'Réglages inclus',
                details: [
                  "Prise Legrand Green'up",
                  'Disjoncteur différentiel dédié',
                  'Pose et mise en service',
                  'Puissance 3,7 kW (lente et sécurisée)',
                ],
              },
              {
                id: 'pack-confort',
                tier: 'Standard',
                title: 'Pack Confort',
                price: 'À partir de 1 290 € TTC',
                summary: 'Borne Wallbox 7,4 kW, la solution standard pour véhicule 100% électrique.',
                delivery: 'Pose certifiée IRVE',
                revisions: 'Paramétrage inclus',
                details: [
                  'Borne Wallbox, Hager ou Schneider',
                  'Protections électriques au tableau',
                  'Pose par technicien certifié IRVE',
                  "Recharge environ 3x plus rapide qu'une prise standard",
                ],
              },
              {
                id: 'pack-performance',
                tier: 'Premium',
                title: 'Pack Performance',
                price: 'À partir de 1 650 € TTC',
                summary:
                  'Borne triphasée 11 kW / 22 kW pour entreprises ou besoins de recharge rapide.',
                delivery: 'Installation renforcée',
                revisions: 'Équilibrage inclus',
                details: [
                  'Borne haute puissance',
                  'Câblage spécifique',
                  "Paramétrage de l'équilibrage de charge",
                  'Configuration adaptée au site',
                ],
              },
            ],
          },
          {
            id: 'tableau',
            title: 'Remplacement tableau électrique',
            subtitle: 'Nord / Hauts-de-France',
            footerNote: 'Norme NF C 15-100 sur chaque offre',
            offers: [
              {
                id: 'panel-basic',
                tier: 'Basique',
                title: 'Studio / T1',
                price: '700 € - 1 100 €',
                summary: '1 à 2 rangées (6-12 circuits).',
                delivery: 'Pose planifiée',
                revisions: 'Validation avant travaux',
                details: [
                  "Dépose de l'ancien matériel",
                  'Nouveau coffret Schneider, Legrand ou Hager',
                  'Mise en service et contrôles',
                  'Conformité NF C 15-100',
                ],
              },
              {
                id: 'panel-standard',
                tier: 'Standard',
                title: 'Appartement / Maison T2-T3',
                price: '1 100 € - 1 600 €',
                summary: '2 à 3 rangées (12-24 circuits).',
                delivery: 'Pose planifiée',
                revisions: 'Validation avant travaux',
                details: [
                  "Dépose de l'ancien matériel",
                  'Nouveau coffret Schneider, Legrand ou Hager',
                  'Mise en service et contrôles',
                  'Conformité NF C 15-100',
                ],
              },
              {
                id: 'panel-premium',
                tier: 'Premium',
                title: 'Maison familiale (T4+)',
                price: '1 600 € - 2 300 €+',
                summary: '3 à 4 rangées (24-36+ circuits).',
                delivery: 'Pose planifiée',
                revisions: 'Validation avant travaux',
                details: [
                  "Dépose de l'ancien matériel",
                  'Nouveau coffret Schneider, Legrand ou Hager',
                  'Mise en service et contrôles',
                  'Conformité NF C 15-100',
                ],
              },
            ],
          },
        ]
      : [
          {
            id: 'troubleshooting',
            title: 'Troubleshooting / Fault diagnosis',
            subtitle: 'One-time intervention',
            offers: [
              {
                id: 'troubleshooting-weekday',
                tier: 'Weekdays',
                title: '1-hour package',
                price: '€50 + €40 travel fee',
                summary: 'Travel + first hour of troubleshooting included for a quick intervention.',
                delivery: 'Fast intervention',
                revisions: 'Quote before extra work',
                details: [
                  'Electrical fault finding',
                  '1-hour on-site troubleshooting package',
                  'Clear explanation before additional work',
                  'Intervention in Hem and Lille metropolitan area',
                ],
              },
              {
                id: 'troubleshooting-weekend',
                tier: 'Weekend',
                title: 'Weekend intervention',
                price: '€80 + €40 travel fee',
                summary: 'Weekend intervention with on-site diagnosis and immediate safety actions when needed.',
                delivery: 'Fast intervention',
                revisions: 'Quote before extra work',
                details: [
                  'Electrical fault finding',
                  'Immediate safety actions when needed',
                  'Clear explanation before additional work',
                  'Intervention in Hem and Lille metropolitan area',
                ],
              },
            ],
          },
          {
            id: 'charging',
            title: 'EV charging station installation',
            subtitle: 'Hauts-de-France',
            offers: [
              {
                id: 'eco-pack',
                tier: 'Basic',
                title: 'Eco pack',
                price: 'From €450 VAT incl.',
                summary: "Green'up reinforced socket for low-mileage drivers and plug-in hybrids.",
                delivery: 'Scheduled install',
                revisions: 'Setup included',
                details: [
                  "Legrand Green'up socket",
                  'Dedicated differential breaker',
                  'Installation and commissioning',
                  '3.7 kW power (slow and safe)',
                ],
              },
              {
                id: 'comfort-pack',
                tier: 'Standard',
                title: 'Comfort pack',
                price: 'From €1,290 VAT incl.',
                summary: '7.4 kW Wallbox, standard setup for full electric vehicles.',
                delivery: 'IRVE-certified install',
                revisions: 'Setup included',
                details: [
                  'Wallbox, Hager or Schneider charger',
                  'Panel protections included',
                  'Installed by IRVE-certified technician',
                  'Around 3x faster than a standard outlet',
                ],
              },
              {
                id: 'performance-pack',
                tier: 'Premium',
                title: 'Performance pack',
                price: 'From €1,650 VAT incl.',
                summary: 'Three-phase 11 kW / 22 kW charger for fast charging needs.',
                delivery: 'Reinforced install',
                revisions: 'Load balancing included',
                details: [
                  'High power charging station',
                  'Dedicated cabling',
                  'Load balancing setup',
                  'Site-adapted configuration',
                ],
              },
            ],
          },
          {
            id: 'panel',
            title: 'Electrical panel replacement',
            subtitle: 'North / Hauts-de-France',
            footerNote: 'NF C 15-100 compliance on every offer',
            offers: [
              {
                id: 'panel-basic',
                tier: 'Basic',
                title: 'Studio / T1',
                price: '€700 - €1,100',
                summary: '1 to 2 rows (6-12 circuits).',
                delivery: 'Scheduled install',
                revisions: 'Validation before work',
                details: [
                  'Removal of existing hardware',
                  'New Schneider, Legrand or Hager panel',
                  'Commissioning and checks',
                  'NF C 15-100 compliance',
                ],
              },
              {
                id: 'panel-standard',
                tier: 'Standard',
                title: 'Apartment / House T2-T3',
                price: '€1,100 - €1,600',
                summary: '2 to 3 rows (12-24 circuits).',
                delivery: 'Scheduled install',
                revisions: 'Validation before work',
                details: [
                  'Removal of existing hardware',
                  'New Schneider, Legrand or Hager panel',
                  'Commissioning and checks',
                  'NF C 15-100 compliance',
                ],
              },
              {
                id: 'panel-premium',
                tier: 'Premium',
                title: 'Family house (T4+)',
                price: '€1,600 - €2,300+',
                summary: '3 to 4 rows (24-36+ circuits).',
                delivery: 'Scheduled install',
                revisions: 'Validation before work',
                details: [
                  'Removal of existing hardware',
                  'New Schneider, Legrand or Hager panel',
                  'Commissioning and checks',
                  'NF C 15-100 compliance',
                ],
              },
            ],
          },
        ]

  const continueLabel = locale === 'fr' ? 'Continuer' : 'Continue'

  return (
    <Section
      id="projects"
      title={copy.sectionProjectsTitle}
      subtitle={copy.sectionProjectsSubtitle}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {categories.map((category) => (
          <PricingCategoryCard
            key={category.id}
            category={category}
            continueLabel={continueLabel}
            locale={locale}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        ))}
      </div>
    </Section>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProjectsSection() {
  const { locale } = useLocale()
  const copy = getUiCopy(locale)
  const siteConfig = getSiteConfig(locale)
  const shouldReduceMotion = useReducedMotion()

  const troubleshootingCard =
    locale === 'fr'
      ? {
          title: 'Dépannage - recherche de panne',
          price: '80 € + 40 € déplacement',
          details: [
            'Diagnostic de panne sur place',
            'Mise en sécurité immédiate si nécessaire',
            'Explication claire avant intervention complémentaire',
          ],
          note: 'Hem et métropole lilloise',
        }
      : {
          title: 'Troubleshooting - fault diagnosis',
          price: '€80 + €40 travel fee',
          details: [
            'On-site fault diagnosis',
            'Immediate safety actions if needed',
            'Clear explanation before additional work',
          ],
          note: 'Hem and Lille metropolitan area',
        }

  const chargingPacks =
    locale === 'fr'
      ? [
          {
            id: 'pack-eco',
            tier: 'Basique',
            title: "Pack Éco : La Prise Renforcée (Green'up)",
            price: 'À partir de 450 € TTC',
            details: [
              'Idéal pour les petits rouleurs ou hybrides rechargeables',
              "Inclus : prise Legrand Green'up, disjoncteur différentiel dédié, pose et mise en service",
              'Puissance : 3,7 kW (recharge lente mais sécurisée)',
            ],
          },
          {
            id: 'pack-confort',
            tier: 'Standard',
            title: 'Pack Confort : La Borne Wallbox (7,4 kW)',
            price: 'À partir de 1 290 € TTC',
            details: [
              'Le standard pour les véhicules 100% électriques',
              'Inclus : borne Wallbox, Hager ou Schneider, protections au tableau, pose par technicien certifié IRVE',
              "Avantage : recharge 3 fois plus rapide qu'une prise standard",
            ],
          },
          {
            id: 'pack-performance',
            tier: 'Premium',
            title: 'Pack Performance : Borne Triphasée (11 kW / 22 kW)',
            price: 'À partir de 1 650 € TTC',
            details: [
              'Pour les entreprises ou les besoins de recharge ultra-rapide à domicile',
              'Inclus : borne haute puissance, câblage spécifique',
              "Paramétrage de l'équilibrage de charge inclus",
            ],
          },
        ]
      : [
          {
            id: 'pack-eco',
            tier: 'Basic',
            title: "Eco Pack: Reinforced socket (Green'up)",
            price: 'From €450 VAT included',
            details: [
              'Best for low-mileage and plug-in hybrid usage',
              "Legrand Green'up socket, dedicated RCD/MCB, installation and commissioning",
              '3.7 kW power (slow and safe charging)',
            ],
          },
          {
            id: 'pack-confort',
            tier: 'Standard',
            title: 'Comfort Pack: Wallbox charger (7.4 kW)',
            price: 'From €1,290 VAT included',
            details: [
              'Standard setup for full electric vehicles',
              'Wallbox, Hager or Schneider charger + panel protections + IRVE-certified installation',
              'Around 3x faster charging than a standard outlet',
            ],
          },
          {
            id: 'pack-performance',
            tier: 'Premium',
            title: 'Performance Pack: Three-phase charger (11 kW / 22 kW)',
            price: 'From €1,650 VAT included',
            details: [
              'For businesses or high-speed home charging needs',
              'High-power charger with dedicated cabling',
              'Load balancing setup included',
            ],
          },
        ]

  const panelCards =
    locale === 'fr'
      ? [
          {
            id: 'panel-basic',
            tier: 'Basique',
            housing: 'Studio / T1',
            config: '1 à 2 rangées (6-12 circuits)',
            price: '700 € - 1 100 €',
          },
          {
            id: 'panel-standard',
            tier: 'Standard',
            housing: 'Appartement / Maison T2-T3',
            config: '2 à 3 rangées (12-24 circuits)',
            price: '1 100 € - 1 600 €',
          },
          {
            id: 'panel-premium',
            tier: 'Premium',
            housing: 'Maison familiale (T4+)',
            config: '3 à 4 rangées (24-36+ circuits)',
            price: '1 600 € - 2 300 €+',
          },
        ]
      : [
          {
            id: 'panel-basic',
            tier: 'Basic',
            housing: 'Studio / T1',
            config: '1 to 2 rows (6-12 circuits)',
            price: '€700 - €1,100',
          },
          {
            id: 'panel-standard',
            tier: 'Standard',
            housing: 'Apartment / House T2-T3',
            config: '2 to 3 rows (12-24 circuits)',
            price: '€1,100 - €1,600',
          },
          {
            id: 'panel-premium',
            tier: 'Premium',
            housing: 'Family house (T4+)',
            config: '3 to 4 rows (24-36+ circuits)',
            price: '€1,600 - €2,300+',
          },
        ]

  const panelInclusions =
    locale === 'fr'
      ? [
          "Dépose de l'ancien tableau",
          'Coffret Schneider, Legrand ou Hager',
          'Mise en service norme NF C 15-100',
        ]
      : [
          'Removal of existing panel',
          'Schneider, Legrand or Hager equipment',
          'Commissioning according to NF C 15-100',
        ]

  const continueLabel = locale === 'fr' ? 'Continuer' : 'Continue'

  return (
    <Section
      id="projects"
      title={copy.sectionProjectsTitle}
      subtitle={copy.sectionProjectsSubtitle}
    >
      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.24 }}
      >
        <Card className="surface-soft border-border/70">
          <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {locale === 'fr' ? 'Dépannage' : 'Troubleshooting'}
            </p>
            <CardTitle className="text-xl">{troubleshootingCard.title}</CardTitle>
            <p className="font-heading text-2xl font-semibold text-foreground">{troubleshootingCard.price}</p>
          </CardHeader>
          <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
            <ul className="space-y-2.5">
              {troubleshootingCard.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.06em] text-foreground/70">
              {troubleshootingCard.note}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm" className="h-10 px-5">
                <a href={siteConfig.phoneHref}>{copy.callNow}</a>
              </Button>
              <Button asChild variant="outline" size="sm" className="h-10 px-5">
                <Link to="/contact">{copy.requestQuote}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-10">
        <h3 className="font-heading text-2xl font-semibold text-foreground">
          {locale === 'fr'
            ? 'Nos forfaits installation borne de recharge (Hauts-de-France)'
            : 'EV charging station installation packages (Hauts-de-France)'}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {locale === 'fr'
            ? '3 niveaux d’offre pour choisir la puissance et le confort adaptés à votre usage.'
            : '3 offer levels to match charging power and comfort to your needs.'}
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {chargingPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.24, delay: index * 0.04 }}
            >
              <Card className="h-full overflow-hidden rounded-xl border-border/80 shadow-none">
                <div className="border-b border-border bg-muted/35 px-4 py-3 text-center">
                  <p className="font-heading text-lg font-semibold text-foreground">{pack.tier}</p>
                </div>
                <CardHeader className="p-5 pb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {locale === 'fr' ? 'Forfait' : 'Package'}
                  </p>
                  <CardTitle className="text-xl">{pack.title}</CardTitle>
                  <p className="font-heading text-3xl font-semibold text-foreground">{pack.price}</p>
                </CardHeader>
                <CardContent className="flex h-[calc(100%-152px)] flex-col p-5 pt-0">
                  <ul className="space-y-2.5">
                    {pack.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-6 h-11 w-full rounded-lg bg-foreground text-background shadow-none hover:bg-foreground/90"
                  >
                    <Link to="/contact">{continueLabel}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-heading text-2xl font-semibold text-foreground">
          {locale === 'fr'
            ? 'Nos tarifs de remplacement de tableau électrique (Nord / Hauts-de-France)'
            : 'Electrical panel replacement pricing (North / Hauts-de-France)'}
        </h3>
        <p className="mt-3 max-w-4xl text-sm text-muted-foreground sm:text-base">
          {locale === 'fr'
            ? "Le tableau électrique est le cœur de votre sécurité. Nos tarifs incluent la dépose de l'ancien matériel, la fourniture du nouveau coffret et la mise en service selon la norme "
            : 'Your electrical panel is the core of your safety. Pricing includes removal of existing hardware, supply of the new panel and commissioning according to standard '}
          <span className="font-semibold text-foreground">NF C 15-100</span>.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {panelCards.map((panel, index) => (
            <motion.div
              key={panel.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.24, delay: index * 0.04 }}
            >
              <Card className="h-full overflow-hidden rounded-xl border-border/80 shadow-none">
                <div className="border-b border-border bg-muted/35 px-4 py-3 text-center">
                  <p className="font-heading text-lg font-semibold text-foreground">{panel.tier}</p>
                </div>
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-xl">{panel.housing}</CardTitle>
                  <p className="font-heading text-3xl font-semibold text-foreground">{panel.price}</p>
                </CardHeader>
                <CardContent className="flex h-[calc(100%-146px)] flex-col p-5 pt-0">
                  <p className="mb-3 text-sm font-medium text-foreground">{panel.config}</p>
                  <ul className="space-y-2.5">
                    {panelInclusions.map((detail) => (
                      <li key={`${panel.id}-${detail}`} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-6 h-11 w-full rounded-lg bg-foreground text-background shadow-none hover:bg-foreground/90"
                  >
                    <Link to="/contact">{continueLabel}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

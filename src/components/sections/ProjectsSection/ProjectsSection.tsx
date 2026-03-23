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
      : [
          {
            title: 'Troubleshooting - fault diagnosis',
            price: '€80 + €40 travel fee',
            details: [
              'On-site fault diagnosis',
              'Immediate safety actions if needed',
              'Clear explanation before additional work',
            ],
            note: 'Hem and Lille metropolitan area',
          },
        ][0]
  const chargingPacks =
    locale === 'fr'
      ? [
          {
            id: 'pack-eco',
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
            title: 'Performance Pack: Three-phase charger (11 kW / 22 kW)',
            price: 'From €1,650 VAT included',
            details: [
              'For businesses or high-speed home charging needs',
              'High-power charger with dedicated cabling',
              'Load balancing setup included',
            ],
          },
        ]
  const panelRows =
    locale === 'fr'
      ? [
          {
            housing: 'Studio / T1',
            config: '1 à 2 rangées (6-12 circuits)',
            price: '700 € - 1 100 €',
          },
          {
            housing: 'Appartement / Maison T2-T3',
            config: '2 à 3 rangées (12-24 circuits)',
            price: '1 100 € - 1 600 €',
          },
          {
            housing: 'Maison familiale (T4+)',
            config: '3 à 4 rangées (24-36+ circuits)',
            price: '1 600 € - 2 300 €+',
          },
        ]
      : [
          {
            housing: 'Studio / T1',
            config: '1 to 2 rows (6-12 circuits)',
            price: '€700 - €1,100',
          },
          {
            housing: 'Apartment / House T2-T3',
            config: '2 to 3 rows (12-24 circuits)',
            price: '€1,100 - €1,600',
          },
          {
            housing: 'Family house (T4+)',
            config: '3 to 4 rows (24-36+ circuits)',
            price: '€1,600 - €2,300+',
          },
        ]

  return (
    <Section
      id="projects"
      title={copy.sectionProjectsTitle}
      subtitle={copy.sectionProjectsSubtitle}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.24 }}
        >
          <Card className="h-full">
            <CardHeader className="p-5 pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {locale === 'fr' ? 'Dépannage' : 'Troubleshooting'}
              </p>
              <CardTitle className="text-xl">{troubleshootingCard.title}</CardTitle>
              <p className="font-heading text-2xl font-semibold text-foreground">{troubleshootingCard.price}</p>
            </CardHeader>
            <CardContent className="p-5 pt-0">
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
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-8">
        <h3 className="font-heading text-2xl font-semibold text-foreground">
          {locale === 'fr'
            ? 'Nos forfaits installation borne de recharge (Hauts-de-France)'
            : 'EV charging station installation packages (Hauts-de-France)'}
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {chargingPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.24, delay: index * 0.04 }}
            >
              <Card className="h-full">
                <CardHeader className="p-5 pb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {locale === 'fr' ? 'Forfait' : 'Package'}
                  </p>
                  <CardTitle className="text-xl">{pack.title}</CardTitle>
                  <p className="font-heading text-2xl font-semibold text-foreground">{pack.price}</p>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <ul className="space-y-2.5">
                    {pack.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-heading text-2xl font-semibold text-foreground">
          {locale === 'fr'
            ? 'Nos tarifs de remplacement de tableau électrique (Nord / Hauts-de-France)'
            : 'Electrical panel replacement pricing'}
        </h3>
        <p className="mt-3 max-w-4xl text-sm text-muted-foreground sm:text-base">
          {locale === 'fr'
            ? "Le tableau électrique est le cœur de la sécurité. Les prix incluent la dépose de l'ancien matériel, la fourniture du nouveau coffret (Schneider, Legrand ou Hager) et la mise en service selon la norme "
            : 'Your electrical panel is the core of safety. Pricing includes removal of existing hardware, supply of a new panel (Schneider, Legrand or Hager), and commissioning according to standard '}
          <span className="font-semibold text-foreground">NF C 15-100</span>.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-border bg-muted/35">
                <th className="px-4 py-3 text-sm font-semibold text-foreground">
                  {locale === 'fr' ? 'Type de logement' : 'Housing type'}
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-foreground">
                  {locale === 'fr' ? 'Configuration type' : 'Configuration type'}
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-foreground">
                  {locale === 'fr' ? 'Prix moyen (fourniture & pose)' : 'Average price (supply & installation)'}
                </th>
              </tr>
            </thead>
            <tbody>
              {panelRows.map((row) => (
                <tr key={row.housing} className="border-b border-border/70 last:border-b-0">
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{row.housing}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{row.config}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

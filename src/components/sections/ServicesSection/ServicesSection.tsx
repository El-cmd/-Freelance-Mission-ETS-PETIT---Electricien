import {
  BatteryCharging,
  ChevronDown,
  CircuitBoard,
  Fan,
  HousePlug,
  Lightbulb,
  ShieldAlert,
} from 'lucide-react'
import { useState } from 'react'

import { getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Section } from '@/components/layout/Section'

type ServiceGroup = {
  id: string
  title: string
  icon: typeof HousePlug
  sections: Array<{
    title: string
    items: string[]
  }>
}

const servicesFr: ServiceGroup[] = [
  {
    id: 'installation-renovation',
    title: "Travaux d'installation & rénovation",
    icon: HousePlug,
    sections: [
      {
        title: 'Installation électrique neuve',
        items: [
          'Installation électrique complète pour maison neuve',
          'Installation électrique complète pour appartement neuf',
          'Passage de gaines et de câbles',
          'Création de nouveaux circuits électriques',
        ],
      },
      {
        title: 'Rénovation & extension électrique',
        items: [
          'Rénovation électrique complète ou partielle',
          "Extension d'installation électrique existante",
          'Création de nouveaux circuits et saignées',
        ],
      },
    ],
  },
  {
    id: 'tableaux-normes',
    title: 'Tableaux électriques & normes',
    icon: CircuitBoard,
    sections: [
      {
        title: 'Remplacement & mise en conformité de tableau',
        items: [
          'Remplacement complet de tableau électrique vétuste',
          'Mise en conformité du tableau électrique actuel',
          'Ajout de disjoncteurs divisionnaires',
          "Installation d'interrupteurs différentiels pour la mise en sécurité",
          'Étiquetage précis et repérage complet des circuits',
          'Adaptation pour installation triphasée ou monophasée',
        ],
      },
      {
        title: 'Mise en sécurité & norme NF C 15-100',
        items: [
          "Mise en sécurité globale d'installation ancienne",
          'Remise aux normes réglementaires NF C 15-100',
          'Suppression des risques électriques et des points dangereux',
          'Création et raccordement de mise à la terre',
        ],
      },
    ],
  },
  {
    id: 'eclairage-prises',
    title: 'Équipements du quotidien',
    icon: Lightbulb,
    sections: [
      {
        title: "Solutions d'éclairage intérieur & extérieur",
        items: [
          'Pose de spots encastrés LED et orientables',
          "Installation d'éclairage intérieur stylisé et fonctionnel",
          "Installation d'éclairage extérieur pour façades et cheminements",
          "Éclairage d'ambiance et fonctionnel pour jardin et terrasse",
          'Pose de détecteurs de mouvement et projecteurs',
          'Relamping LED économique pour remplacement basse consommation',
        ],
      },
      {
        title: 'Prises, interrupteurs & appareillages',
        items: [
          'Installation et remplacement de prises électriques',
          'Ajout de prises modernes avec ports USB intégrés',
          "Pose d'interrupteurs simples et doubles",
          'Création de circuits va-et-vient',
          "Installation de télérupteurs et de variateurs d'intensité",
          "Remplacement d'appareillages vétustes ou jaunis",
        ],
      },
    ],
  },
  {
    id: 'chauffage-ventilation',
    title: 'Confort thermal & ventilation',
    icon: Fan,
    sections: [
      {
        title: 'Chauffage électrique & gestion connectée',
        items: [
          'Pose et raccordement de radiateurs électriques de nouvelle génération',
          'Mise en place de solutions de gestion de chauffage connecté',
        ],
      },
      {
        title: "Ventilation & qualité de l'air",
        items: [
          'Installation de VMC simple flux',
          "Pose d'extracteurs d'air indépendants pour salles de bain et WC",
        ],
      },
    ],
  },
  {
    id: 'domotique-irve',
    title: 'Maison connectée, réseaux & bornes IRVE',
    icon: BatteryCharging,
    sections: [
      {
        title: 'Domotique & sécurité connectée',
        items: [
          'Motorisation et centralisation de volets roulants électriques',
          "Installation d'éclairage connecté et intelligent",
          "Pose de visiophones et d'interphones connectés",
          'Installation de détecteurs de fumée obligatoires DAAF',
          'Déploiement de réseau informatique multimédia avec prises RJ45',
        ],
      },
      {
        title: 'Bornes de recharge pour véhicules électriques',
        items: [
          'Installation de bornes de recharge rapides Wallbox',
          "Pose de prises renforcées type Green'Up",
          'Mise en place de protections dédiées conformes IRVE',
        ],
      },
    ],
  },
  {
    id: 'depannage-maintenance',
    title: 'Maintenance & dépannage urgent',
    icon: ShieldAlert,
    sections: [
      {
        title: 'Dépannage électrique & recherche de panne',
        items: [
          'Dépannage électrique général',
          'Recherche de panne précise et diagnostic',
          'Résolution de disjoncteur qui saute de manière intempestive',
          "Dépannage de pannes d'éclairage",
          'Dépannage de pannes sur les prises électriques',
          'Remplacement de matériel défectueux en urgence',
          'Intervention pour dépannage urgent',
        ],
      },
    ],
  },
]

const servicesEn: ServiceGroup[] = [
  {
    id: 'installation-renovation',
    title: 'Installation & renovation work',
    icon: HousePlug,
    sections: [
      {
        title: 'New electrical installation',
        items: [
          'Complete electrical installation for new houses',
          'Complete electrical installation for new apartments',
          'Conduit and cable routing',
          'Creation of new electrical circuits',
        ],
      },
      {
        title: 'Electrical renovation & extension',
        items: [
          'Full or partial electrical renovation',
          'Extension of an existing electrical installation',
          'Creation of new circuits and wall chases',
        ],
      },
    ],
  },
  {
    id: 'tableaux-normes',
    title: 'Electrical panels & standards',
    icon: CircuitBoard,
    sections: [
      {
        title: 'Panel replacement & compliance upgrade',
        items: [
          'Complete replacement of outdated electrical panels',
          'Compliance upgrade of the current electrical panel',
          'Addition of branch circuit breakers',
          'Installation of residual current devices for safety',
          'Precise labeling and complete circuit identification',
          'Adaptation for three-phase or single-phase installation',
        ],
      },
      {
        title: 'Safety upgrade & NF C 15-100 standard',
        items: [
          'Global safety upgrade for older installations',
          'Regulatory compliance with NF C 15-100',
          'Removal of electrical risks and dangerous points',
          'Creation and connection of earthing systems',
        ],
      },
    ],
  },
  {
    id: 'eclairage-prises',
    title: 'Everyday electrical equipment',
    icon: Lightbulb,
    sections: [
      {
        title: 'Indoor & outdoor lighting solutions',
        items: [
          'Installation of recessed LED and adjustable spotlights',
          'Functional and stylish indoor lighting installation',
          'Outdoor lighting installation for facades and pathways',
          'Ambient and functional lighting for gardens and terraces',
          'Installation of motion sensors and floodlights',
          'Energy-saving LED relamping',
        ],
      },
      {
        title: 'Sockets, switches & fittings',
        items: [
          'Installation and replacement of electrical sockets',
          'Addition of modern sockets with integrated USB ports',
          'Installation of single and double switches',
          'Creation of two-way switch circuits',
          'Installation of impulse relays and dimmers',
          'Replacement of outdated or yellowed fittings',
        ],
      },
    ],
  },
  {
    id: 'chauffage-ventilation',
    title: 'Thermal comfort & ventilation',
    icon: Fan,
    sections: [
      {
        title: 'Electric heating & connected management',
        items: [
          'Installation and connection of new-generation electric radiators',
          'Setup of connected heating management solutions',
        ],
      },
      {
        title: 'Ventilation & air quality',
        items: [
          'Installation of single-flow mechanical ventilation',
          'Installation of independent extractor fans for bathrooms and toilets',
        ],
      },
    ],
  },
  {
    id: 'domotique-irve',
    title: 'Smart home, networks & EV charging',
    icon: BatteryCharging,
    sections: [
      {
        title: 'Smart home & connected security',
        items: [
          'Motorization and centralization of electric roller shutters',
          'Installation of connected and intelligent lighting',
          'Installation of connected videophones and intercoms',
          'Installation of mandatory smoke detectors',
          'Deployment of multimedia IT networks with RJ45 sockets',
        ],
      },
      {
        title: 'EV charging stations',
        items: [
          'Installation of fast Wallbox charging stations',
          "Installation of reinforced Green'Up sockets",
          'Setup of dedicated protections compliant with IRVE requirements',
        ],
      },
    ],
  },
  {
    id: 'depannage-maintenance',
    title: 'Maintenance & urgent troubleshooting',
    icon: ShieldAlert,
    sections: [
      {
        title: 'Electrical troubleshooting & fault finding',
        items: [
          'General electrical troubleshooting',
          'Precise fault finding and diagnosis',
          'Resolution of circuit breakers tripping repeatedly',
          'Troubleshooting lighting faults',
          'Troubleshooting socket faults',
          'Urgent replacement of defective equipment',
          'Emergency troubleshooting intervention',
        ],
      },
    ],
  },
]

export function ServicesSection() {
  const { locale } = useLocale()
  const copy = getUiCopy(locale)
  const services = locale === 'fr' ? servicesFr : servicesEn
  const [openServiceId, setOpenServiceId] = useState(services[0]?.id ?? '')

  return (
    <Section
      id="services"
      title={copy.sectionServicesTitle}
      subtitle={copy.sectionServicesSubtitle}
      bodyClassName="mt-8"
    >
      <div className="grid gap-3">
        {services.map((service, index) => {
          const Icon = service.icon
          const isOpen = openServiceId === service.id
          const contentId = `service-panel-${service.id}`

          return (
            <article
              key={service.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setOpenServiceId(isOpen ? '' : service.id)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/65 sm:px-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {locale === 'fr' ? `Service ${index + 1}` : `Service ${index + 1}`}
                  </span>
                  <span className="mt-0.5 block font-heading text-lg font-semibold leading-snug text-foreground sm:text-xl">
                    {service.title}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={contentId}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-5 border-t border-border bg-white px-4 py-5 sm:px-5 lg:grid-cols-2">
                    {service.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="font-heading text-base font-semibold text-foreground">
                          {section.title}
                        </h3>
                        <ul className="mt-3 space-y-2.5 text-sm leading-6 text-muted-foreground">
                          {section.items.map((item) => (
                            <li key={item} className="flex gap-2.5">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

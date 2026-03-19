import {
  Bolt,
  Cable,
  ClipboardCheck,
  Drill,
  Flashlight,
  ShieldCheck,
  Timer,
  Wrench,
} from 'lucide-react'

import project01 from '@/assets/images/project-01.webp'
import project02 from '@/assets/images/project-02.webp'
import project03 from '@/assets/images/project-03.webp'
import project04 from '@/assets/images/project-04.webp'
import project05 from '@/assets/images/project-05.webp'
import project06 from '@/assets/images/project-06.webp'
import project07 from '@/assets/images/project-07.webp'
import project08 from '@/assets/images/project-08.webp'
import project09 from '@/assets/images/project-09.webp'
import project10 from '@/assets/images/project-10.webp'
import project11 from '@/assets/images/project-11.webp'
import project12 from '@/assets/images/project-12.webp'
import type { Locale } from '@/i18n/locale'
import type {
  AboutStat,
  NavItem,
  ProjectItem,
  ServiceItem,
  SiteConfig,
} from '@/types/site'

type LocalizedString = Record<Locale, string>

type UiCopy = {
  skipToContent: string
  homeLinkAria: string
  mainNavigationAria: string
  menuAriaLabel: string
  menuTitle: string
  menuDescription: string
  callNow: string
  callNowAriaPrefix: string
  requestQuote: string
  sectionServicesTitle: string
  sectionServicesSubtitle: string
  sectionProjectsTitle: string
  sectionProjectsSubtitle: string
  sectionAboutTitle: string
  sectionAboutSubtitle: string
  sectionContactTitle: string
  sectionContactSubtitle: string
  heroBadge: string
  heroTitleStart: string
  heroTitleHighlight: string
  heroTitleEnd: string
  heroDescription: string
  aboutCardSubtitle: string
  aboutDescription: string
  contactDetailsTitle: string
  contactPhoneLabel: string
  contactEmailLabel: string
  contactZoneLabel: string
  contactOpeningHoursLabel: string
  contactQuickTitle: string
  formNameLabel: string
  formPhoneLabel: string
  formEmailLabel: string
  formMessageLabel: string
  formNamePlaceholder: string
  formPhonePlaceholder: string
  formEmailPlaceholder: string
  formMessagePlaceholder: string
  formSubmitLabel: string
  mailtoSubjectPrefix: string
  mailtoMessageLabel: string
  directCallLabel: string
  footerSubtitle: string
}

const t = (locale: Locale, value: LocalizedString): string => value[locale]

const baseSiteConfig: Omit<SiteConfig, 'addressLine' | 'interventionZone' | 'openingHours'> = {
  name: 'ETS PETIT',
  legalName: 'ETS PETIT',
  city: 'Roubaix',
  phoneDisplay: '03 20 00 00 00',
  phoneHref: 'tel:+33320000000',
  email: 'contact@ets-petit.fr',
  websiteUrl: 'https://ets-petit.fr',
  ctaChannel: 'call',
}

const localizedBusinessInfo = {
  fr: {
    addressLine: 'Roubaix et environs',
    interventionZone: 'Roubaix, Tourcoing, Croix, Wasquehal, Lille Métropole',
    openingHours: 'Lundi au samedi, 8h00 - 19h00',
  },
  en: {
    addressLine: 'Roubaix and surrounding area',
    interventionZone: 'Roubaix, Tourcoing, Croix, Wasquehal, Lille metropolitan area',
    openingHours: 'Monday to Saturday, 8:00 AM - 7:00 PM',
  },
} satisfies Record<Locale, Pick<SiteConfig, 'addressLine' | 'interventionZone' | 'openingHours'>>

const navItemsRaw: Array<{ href: string; label: LocalizedString }> = [
  { href: '#services', label: { fr: 'Services', en: 'Services' } },
  { href: '#projects', label: { fr: 'Réalisations', en: 'Projects' } },
  { href: '#about', label: { fr: 'À propos', en: 'About' } },
  { href: '#contact', label: { fr: 'Contact', en: 'Contact' } },
]

const trustHighlightsRaw = [
  {
    icon: ShieldCheck,
    text: {
      fr: 'Interventions soignées et sécurisées',
      en: 'Careful and safe interventions',
    },
  },
  {
    icon: Timer,
    text: {
      fr: 'Réponse rapide sur Roubaix et alentours',
      en: 'Fast response in Roubaix and nearby areas',
    },
  },
  {
    icon: ClipboardCheck,
    text: {
      fr: 'Devis clair avant travaux',
      en: 'Clear quote before any work',
    },
  },
]

const servicesRaw = [
  {
    id: 'depannage',
    title: { fr: 'Dépannage électrique', en: 'Electrical troubleshooting' },
    description: {
      fr: 'Recherche de panne, remise en service rapide et sécurisation immédiate.',
      en: 'Fault diagnosis, quick restoration, and immediate safety measures.',
    },
    icon: Wrench,
  },
  {
    id: 'tableau',
    title: { fr: 'Tableau électrique', en: 'Electrical panel' },
    description: {
      fr: 'Remplacement et mise aux normes de tableau pour une installation fiable.',
      en: 'Panel replacement and compliance upgrade for a reliable installation.',
    },
    icon: Bolt,
  },
  {
    id: 'renovation',
    title: { fr: 'Rénovation installation', en: 'Electrical renovation' },
    description: {
      fr: 'Reprise complète ou partielle du réseau électrique en logement ancien.',
      en: 'Full or partial rewiring for older homes and apartments.',
    },
    icon: Drill,
  },
  {
    id: 'mise-securite',
    title: { fr: 'Mise en sécurité', en: 'Safety upgrades' },
    description: {
      fr: 'Corrections ciblées des points à risque pour protéger occupants et biens.',
      en: 'Targeted risk corrections to protect occupants and property.',
    },
    icon: ShieldCheck,
  },
  {
    id: 'eclairage',
    title: { fr: 'Éclairage intérieur/extérieur', en: 'Indoor/outdoor lighting' },
    description: {
      fr: 'Pose de luminaires, éclairage LED et optimisation du confort visuel.',
      en: 'Fixture installation, LED lighting, and visual comfort optimization.',
    },
    icon: Flashlight,
  },
  {
    id: 'prises-cablage',
    title: { fr: 'Prises & câblage', en: 'Sockets & wiring' },
    description: {
      fr: 'Ajout de prises, circuits dédiés et câblage propre pour vos équipements.',
      en: 'New sockets, dedicated circuits, and clean wiring for your equipment.',
    },
    icon: Cable,
  },
]

const projectsRaw = [
  {
    id: 'project-01',
    image: project01,
    title: {
      fr: 'Mise en conformité appartement',
      en: 'Apartment compliance upgrade',
    },
    alt: {
      fr: 'Tableau électrique modernisé dans un appartement à Roubaix',
      en: 'Modernized electrical panel in an apartment in Roubaix',
    },
    category: { fr: 'Mise en conformité', en: 'Compliance' },
  },
  {
    id: 'project-02',
    image: project02,
    title: { fr: 'Rénovation circuit cuisine', en: 'Kitchen circuit renovation' },
    alt: {
      fr: 'Travaux de câblage électrique dans une cuisine rénovée',
      en: 'Electrical wiring work in a renovated kitchen',
    },
    category: { fr: 'Rénovation', en: 'Renovation' },
  },
  {
    id: 'project-03',
    image: project03,
    title: { fr: 'Création lignes dédiées', en: 'Dedicated line installation' },
    alt: {
      fr: 'Nouvelles lignes dédiées pour équipements électroménagers',
      en: 'New dedicated lines for household appliances',
    },
    category: { fr: 'Installation', en: 'Installation' },
  },
  {
    id: 'project-04',
    image: project04,
    title: { fr: 'Tableau neuf maison', en: 'New home panel' },
    alt: {
      fr: 'Nouveau tableau électrique installé dans une maison',
      en: 'New electrical panel installed in a house',
    },
    category: { fr: 'Tableau électrique', en: 'Electrical panel' },
  },
  {
    id: 'project-05',
    image: project05,
    title: { fr: 'Remise en service après panne', en: 'Power restoration after outage' },
    alt: {
      fr: 'Dépannage électrique et remise en service d un logement',
      en: 'Electrical repair and service restoration in a home',
    },
    category: { fr: 'Dépannage', en: 'Troubleshooting' },
  },
  {
    id: 'project-06',
    image: project06,
    title: { fr: 'Réfection colonnes montantes', en: 'Riser upgrade work' },
    alt: {
      fr: 'Intervention sur colonnes montantes en copropriété',
      en: 'Intervention on electrical risers in a shared building',
    },
    category: { fr: 'Rénovation', en: 'Renovation' },
  },
  {
    id: 'project-07',
    image: project07,
    title: { fr: 'Éclairage couloir et palier', en: 'Corridor and landing lighting' },
    alt: {
      fr: 'Installation d éclairage LED dans des parties communes',
      en: 'LED lighting installation in common areas',
    },
    category: { fr: 'Éclairage', en: 'Lighting' },
  },
  {
    id: 'project-08',
    image: project08,
    title: { fr: 'Protection différentielle', en: 'RCD protection upgrade' },
    alt: {
      fr: 'Ajout de protections différentielles sur une installation existante',
      en: 'Added residual current protection on an existing installation',
    },
    category: { fr: 'Sécurité', en: 'Safety' },
  },
  {
    id: 'project-09',
    image: project09,
    title: { fr: 'Réseau prise bureau', en: 'Office socket network' },
    alt: {
      fr: 'Création de prises électriques pour espace bureau',
      en: 'New electrical sockets for an office space',
    },
    category: { fr: 'Prises & câblage', en: 'Sockets & wiring' },
  },
  {
    id: 'project-10',
    image: project10,
    title: { fr: 'Reprise câblage cave', en: 'Basement rewiring' },
    alt: {
      fr: 'Remise en état du câblage électrique dans une cave',
      en: 'Electrical wiring restoration in a basement',
    },
    category: { fr: 'Rénovation', en: 'Renovation' },
  },
  {
    id: 'project-11',
    image: project11,
    title: { fr: 'Mise à la terre complète', en: 'Full grounding system' },
    alt: {
      fr: 'Travaux de mise à la terre pour sécurisation de maison',
      en: 'Grounding work to improve home safety',
    },
    category: { fr: 'Mise en sécurité', en: 'Safety upgrade' },
  },
  {
    id: 'project-12',
    image: project12,
    title: { fr: 'Éclairage extérieur façade', en: 'Exterior facade lighting' },
    alt: {
      fr: 'Pose d éclairage extérieur pour façade résidentielle',
      en: 'Exterior lighting installation for a residential facade',
    },
    category: { fr: 'Éclairage', en: 'Lighting' },
  },
]

const aboutStatsRaw = [
  {
    value: '10+',
    label: {
      fr: 'ans d expérience terrain',
      en: 'years of hands-on experience',
    },
  },
  {
    value: '100%',
    label: {
      fr: 'interventions sur mesure',
      en: 'tailored interventions',
    },
  },
  {
    value: 'Local',
    label: {
      fr: 'ancrage Roubaix et métropole lilloise',
      en: 'strong local presence in Roubaix area',
    },
  },
]

const aboutPointsRaw: LocalizedString[] = [
  {
    fr: 'Diagnostic précis avant chaque intervention',
    en: 'Accurate diagnosis before every intervention',
  },
  {
    fr: 'Travail propre, explications claires et finitions soignées',
    en: 'Clean work, clear explanations, and careful finishes',
  },
  {
    fr: 'Matériel fiable sélectionné pour durer',
    en: 'Reliable materials selected for long-term durability',
  },
]

const uiCopy: Record<Locale, UiCopy> = {
  fr: {
    skipToContent: 'Aller au contenu principal',
    homeLinkAria: 'Retour à l accueil',
    mainNavigationAria: 'Navigation principale',
    menuAriaLabel: 'Ouvrir le menu mobile',
    menuTitle: 'ETS PETIT',
    menuDescription: 'Navigation rapide',
    callNow: 'Appeler maintenant',
    callNowAriaPrefix: 'Appeler',
    requestQuote: 'Demander un devis',
    sectionServicesTitle: 'Services électriques',
    sectionServicesSubtitle:
      'Des interventions claires, adaptées à votre besoin et réalisées dans les règles de sécurité.',
    sectionProjectsTitle: 'Réalisations',
    sectionProjectsSubtitle:
      'Un aperçu de chantiers récents: rénovation, mise en sécurité, dépannage et éclairage.',
    sectionAboutTitle: 'À propos d ETS PETIT',
    sectionAboutSubtitle:
      'Entreprise de proximité à Roubaix, orientée qualité d exécution, sécurité et transparence.',
    sectionContactTitle: 'Contact',
    sectionContactSubtitle:
      'Besoin d une intervention ou d un devis ? Réponse rapide par téléphone ou email.',
    heroBadge: 'Électricien local à Roubaix et métropole lilloise',
    heroTitleStart: 'Installations électriques fiables,',
    heroTitleHighlight: ' interventions rapides',
    heroTitleEnd: ', résultats propres.',
    heroDescription:
      'ETS PETIT accompagne particuliers et professionnels pour le dépannage, la rénovation, les tableaux électriques et la mise en sécurité.',
    aboutCardSubtitle: 'Électricien à Roubaix',
    aboutDescription:
      'Nous intervenons sur les installations électriques résidentielles et petits locaux professionnels avec une approche simple: écouter le besoin, poser un diagnostic propre, proposer une solution fiable et livrer un chantier net.',
    contactDetailsTitle: 'Coordonnées',
    contactPhoneLabel: 'Téléphone',
    contactEmailLabel: 'Email',
    contactZoneLabel: 'Zone d intervention',
    contactOpeningHoursLabel: 'Horaires',
    contactQuickTitle: 'Demande rapide',
    formNameLabel: 'Nom',
    formPhoneLabel: 'Téléphone',
    formEmailLabel: 'Email',
    formMessageLabel: 'Message',
    formNamePlaceholder: 'Votre nom',
    formPhonePlaceholder: '06 00 00 00 00',
    formEmailPlaceholder: 'vous@email.fr',
    formMessagePlaceholder: 'Décris brièvement ton besoin (panne, rénovation, tableau...)',
    formSubmitLabel: 'Envoyer par email',
    mailtoSubjectPrefix: 'Demande de devis',
    mailtoMessageLabel: 'Message',
    directCallLabel: 'Appel direct',
    footerSubtitle: 'Électricien à Roubaix',
  },
  en: {
    skipToContent: 'Skip to main content',
    homeLinkAria: 'Back to home',
    mainNavigationAria: 'Main navigation',
    menuAriaLabel: 'Open mobile menu',
    menuTitle: 'ETS PETIT',
    menuDescription: 'Quick navigation',
    callNow: 'Call now',
    callNowAriaPrefix: 'Call',
    requestQuote: 'Request a quote',
    sectionServicesTitle: 'Electrical services',
    sectionServicesSubtitle:
      'Clear interventions tailored to your needs and carried out with strict safety standards.',
    sectionProjectsTitle: 'Projects',
    sectionProjectsSubtitle:
      'A selection of recent jobs: renovation, safety upgrades, troubleshooting, and lighting.',
    sectionAboutTitle: 'About ETS PETIT',
    sectionAboutSubtitle:
      'A local business in Roubaix focused on quality execution, safety, and transparency.',
    sectionContactTitle: 'Contact',
    sectionContactSubtitle:
      'Need an intervention or a quote? Fast response by phone or email.',
    heroBadge: 'Local electrician in Roubaix and Lille metropolitan area',
    heroTitleStart: 'Reliable electrical installations,',
    heroTitleHighlight: ' fast response',
    heroTitleEnd: ', clean results.',
    heroDescription:
      'ETS PETIT supports homeowners and professionals for troubleshooting, renovation, electrical panels, and safety upgrades.',
    aboutCardSubtitle: 'Electrician in Roubaix',
    aboutDescription:
      'We work on residential and small professional electrical installations with a simple approach: understand your need, diagnose clearly, propose a reliable solution, and deliver a clean job site.',
    contactDetailsTitle: 'Contact details',
    contactPhoneLabel: 'Phone',
    contactEmailLabel: 'Email',
    contactZoneLabel: 'Service area',
    contactOpeningHoursLabel: 'Opening hours',
    contactQuickTitle: 'Quick request',
    formNameLabel: 'Name',
    formPhoneLabel: 'Phone',
    formEmailLabel: 'Email',
    formMessageLabel: 'Message',
    formNamePlaceholder: 'Your name',
    formPhonePlaceholder: '+33 6 00 00 00 00',
    formEmailPlaceholder: 'you@email.com',
    formMessagePlaceholder: 'Briefly describe your need (outage, renovation, panel...)',
    formSubmitLabel: 'Send by email',
    mailtoSubjectPrefix: 'Quote request',
    mailtoMessageLabel: 'Message',
    directCallLabel: 'Direct call',
    footerSubtitle: 'Electrician in Roubaix',
  },
}

export function getSiteConfig(locale: Locale): SiteConfig {
  return {
    ...baseSiteConfig,
    ...localizedBusinessInfo[locale],
  }
}

export function getUiCopy(locale: Locale): UiCopy {
  return uiCopy[locale]
}

export function getNavItems(locale: Locale): NavItem[] {
  return navItemsRaw.map((item) => ({
    href: item.href,
    label: t(locale, item.label),
  }))
}

export function getTrustHighlights(locale: Locale) {
  return trustHighlightsRaw.map((item) => ({
    icon: item.icon,
    text: t(locale, item.text),
  }))
}

export function getServices(locale: Locale): ServiceItem[] {
  return servicesRaw.map((item) => ({
    id: item.id,
    title: t(locale, item.title),
    description: t(locale, item.description),
    icon: item.icon,
  }))
}

export function getProjects(locale: Locale): ProjectItem[] {
  return projectsRaw.map((item) => ({
    id: item.id,
    image: item.image,
    title: t(locale, item.title),
    alt: t(locale, item.alt),
    category: t(locale, item.category),
  }))
}

export function getAboutStats(locale: Locale): AboutStat[] {
  return aboutStatsRaw.map((item) => ({
    value: item.value,
    label: t(locale, item.label),
  }))
}

export function getAboutPoints(locale: Locale): string[] {
  return aboutPointsRaw.map((item) => t(locale, item))
}

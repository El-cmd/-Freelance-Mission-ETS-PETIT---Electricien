import type { Locale } from '@/i18n/locale'
import type { AboutStat, NavItem, SiteConfig } from '@/types/site'

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
  directCallLabel: string
  footerSubtitle: string
}

const t = (locale: Locale, value: LocalizedString): string => value[locale]

const baseSiteConfig: Omit<SiteConfig, 'addressLine' | 'interventionZone' | 'openingHours'> = {
  name: 'ETS PETIT',
  legalName: 'ETS PETIT',
  city: 'Hem',
  phoneDisplay: '07 60 02 87 23',
  phoneHref: 'tel:+33760028723',
  email: 'etspetitelec@gmail.com',
  websiteUrl: 'https://ets-petit.fr',
  ctaChannel: 'call',
}

const localizedBusinessInfo = {
  fr: {
    addressLine: 'Hem, région lilloise',
    interventionZone: 'Hem et région lilloise',
    openingHours: 'Lundi au samedi, 8h00 – 19h00',
  },
  en: {
    addressLine: 'Hem, Lille metropolitan area',
    interventionZone: 'Hem and the Lille metropolitan area',
    openingHours: 'Monday to Saturday, 8:00 AM - 7:00 PM',
  },
} satisfies Record<Locale, Pick<SiteConfig, 'addressLine' | 'interventionZone' | 'openingHours'>>

const navItemsRaw: Array<{ path: string; label: LocalizedString }> = [
  { path: '/', label: { fr: 'Accueil', en: 'Home' } },
  { path: '/services', label: { fr: 'Nos services', en: 'Our services' } },
  { path: '/projects', label: { fr: 'Nos tarifs', en: 'Our pricing' } },
  { path: '/about', label: { fr: 'À propos', en: 'About' } },
  { path: '/contact', label: { fr: 'Contact', en: 'Contact' } },
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
      fr: 'ancrage Hem et métropole lilloise',
      en: 'strong local presence in Hem area',
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
    sectionProjectsTitle: 'Nos tarifs',
    sectionProjectsSubtitle:
      'Des prix clairs pour les interventions courantes. Un devis précis est confirmé avant travaux.',
    sectionAboutTitle: 'À propos',
    sectionAboutSubtitle: '',
    sectionContactTitle: 'Contact',
    sectionContactSubtitle:
      'Besoin d une intervention ou d un devis ? Réponse rapide par téléphone ou email.',
    heroBadge: 'Électricien local à Hem et métropole lilloise',
    heroDescription:
      'ETS PETIT accompagne particuliers et professionnels pour le dépannage, la rénovation, les tableaux électriques et la mise en sécurité.',
    aboutCardSubtitle: 'Électricien à Hem',
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
    formSubmitLabel: 'Envoyer la demande',
    directCallLabel: 'Appel direct',
    footerSubtitle: 'Électricien à Hem et dans la région lilloise',
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
    sectionProjectsTitle: 'Our pricing',
    sectionProjectsSubtitle:
      'Clear pricing for common interventions. A precise quote is always confirmed before work starts.',
    sectionAboutTitle: 'About',
    sectionAboutSubtitle: '',
    sectionContactTitle: 'Contact',
    sectionContactSubtitle:
      'Need an intervention or a quote? Fast response by phone or email.',
    heroBadge: 'Local electrician in Hem and Lille metropolitan area',
    heroDescription:
      'ETS PETIT supports homeowners and professionals for troubleshooting, renovation, electrical panels, and safety upgrades.',
    aboutCardSubtitle: 'Electrician in Hem',
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
    formSubmitLabel: 'Send request',
    directCallLabel: 'Direct call',
    footerSubtitle: 'Electrician in Hem and the Lille metropolitan area',
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
    path: item.path,
    label: t(locale, item.label),
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

import { useEffect } from 'react'

import { useLocale, type Locale } from '@/i18n/locale'

type LocalizedSeo = Record<Locale, { title: string; description: string }>

const SITE_URL = 'https://ets-petit.fr'
const OG_IMAGE_URL = `${SITE_URL}/og-ets-petit.jpg`

const defaultSeo: LocalizedSeo = {
  fr: {
    title: 'ETS PETIT | Électricien à Hem et dans la région lilloise',
    description:
      'ETS PETIT intervient à Hem et dans la région lilloise pour le dépannage, la rénovation, les tableaux électriques, la mise en sécurité et l’éclairage.',
  },
  en: {
    title: 'ETS PETIT | Electrician in Hem and the Lille metropolitan area',
    description:
      'ETS PETIT serves Hem and the Lille metropolitan area for troubleshooting, renovation, electrical panels, safety upgrades and lighting.',
  },
}

const notFoundSeo: LocalizedSeo = {
  fr: {
    title: 'Page introuvable | ETS PETIT',
    description: 'La page demandée n’existe pas ou a été déplacée.',
  },
  en: {
    title: 'Page not found | ETS PETIT',
    description: 'The requested page does not exist or has been moved.',
  },
}

const seoByPath: Record<string, LocalizedSeo> = {
  '/': defaultSeo,
  '/services': {
    fr: {
      title: 'Services électriques à Hem et dans la région lilloise | ETS PETIT',
      description:
        'Installation, rénovation, dépannage, mise aux normes, éclairage, domotique et bornes de recharge à Hem et dans la région lilloise.',
    },
    en: {
      title: 'Electrical services in Hem and the Lille area | ETS PETIT',
      description:
        'Installation, renovation, troubleshooting, compliance, lighting, smart home and EV charging services in Hem and the Lille area.',
    },
  },
  '/projects': {
    fr: {
      title: 'Tarifs électricien à Hem et dans la région lilloise | ETS PETIT',
      description:
        'Consultez les tarifs indicatifs ETS PETIT pour le dépannage, les tableaux électriques et les bornes de recharge à Hem et dans la région lilloise.',
    },
    en: {
      title: 'Electrician pricing in Hem and the Lille area | ETS PETIT',
      description:
        'View indicative ETS PETIT pricing for troubleshooting, electrical panels and EV chargers in Hem and the Lille metropolitan area.',
    },
  },
  '/about': {
    fr: {
      title: 'À propos de votre électricien à Hem | ETS PETIT',
      description:
        'Découvrez ETS PETIT, artisan électricien au service des particuliers et professionnels de Hem et de la région lilloise.',
    },
    en: {
      title: 'About your electrician in Hem | ETS PETIT',
      description:
        'Meet ETS PETIT, a local electrician serving homeowners and professionals in Hem and the Lille metropolitan area.',
    },
  },
  '/contact': {
    fr: {
      title: 'Contacter un électricien à Hem | ETS PETIT',
      description:
        'Contactez ETS PETIT pour une intervention électrique ou un devis à Hem et dans la région lilloise.',
    },
    en: {
      title: 'Contact an electrician in Hem | ETS PETIT',
      description:
        'Contact ETS PETIT for electrical work or a quote in Hem and the Lille metropolitan area.',
    },
  },
  '/mentions-legales': {
    fr: {
      title: 'Mentions légales | ETS PETIT',
      description: 'Mentions légales du site ETS PETIT, électricien à Hem et dans la région lilloise.',
    },
    en: {
      title: 'Legal notice | ETS PETIT',
      description: 'Legal notice for the ETS PETIT electrician website.',
    },
  },
  '/politique-confidentialite': {
    fr: {
      title: 'Politique de confidentialité | ETS PETIT',
      description: 'Informations sur le traitement des données personnelles par ETS PETIT.',
    },
    en: {
      title: 'Privacy policy | ETS PETIT',
      description: 'Information about personal data processing by ETS PETIT.',
    },
  },
  '/conditions-utilisation': {
    fr: {
      title: 'Conditions d’utilisation | ETS PETIT',
      description: 'Conditions d’utilisation du site ETS PETIT.',
    },
    en: {
      title: 'Terms of use | ETS PETIT',
      description: 'Terms of use for the ETS PETIT website.',
    },
  },
}

function getOrCreateMeta(selector: string, attributes: Record<string, string>) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector)
  if (existing) {
    return existing
  }

  const meta = document.createElement('meta')
  Object.entries(attributes).forEach(([name, value]) => meta.setAttribute(name, value))
  document.head.append(meta)
  return meta
}

function getOrCreateCanonical() {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (existing) {
    return existing
  }

  const link = document.createElement('link')
  link.rel = 'canonical'
  document.head.append(link)
  return link
}

export function SeoManager() {
  const { locale } = useLocale()
  const pathname = window.location.pathname === '/index.html' ? '/' : window.location.pathname

  useEffect(() => {
    const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
    const seo = (seoByPath[normalizedPath] ?? notFoundSeo)[locale]
    const canonicalUrl = `${SITE_URL}${normalizedPath}`

    document.title = seo.title
    getOrCreateCanonical().href = canonicalUrl

    getOrCreateMeta('meta[name="description"]', { name: 'description' }).content = seo.description
    getOrCreateMeta('meta[property="og:title"]', { property: 'og:title' }).content = seo.title
    getOrCreateMeta('meta[property="og:description"]', { property: 'og:description' }).content =
      seo.description
    getOrCreateMeta('meta[property="og:url"]', { property: 'og:url' }).content = canonicalUrl
    getOrCreateMeta('meta[property="og:image"]', { property: 'og:image' }).content = OG_IMAGE_URL
    getOrCreateMeta('meta[property="og:locale"]', { property: 'og:locale' }).content =
      locale === 'fr' ? 'fr_FR' : 'en_GB'
    getOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).content = seo.title
    getOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).content =
      seo.description
    getOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image' }).content = OG_IMAGE_URL
  }, [locale, pathname])

  return null
}

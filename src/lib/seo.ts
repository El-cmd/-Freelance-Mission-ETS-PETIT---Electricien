import type { SiteConfig } from '@/types/site'

export function buildLocalBusinessJsonLd(site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: site.name,
    legalName: site.legalName,
    description:
      'Électricien à Roubaix: dépannage, rénovation, tableau électrique, mise en sécurité et éclairage.',
    telephone: site.phoneHref.replace('tel:', ''),
    email: site.email,
    areaServed: site.interventionZone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressCountry: 'FR',
    },
    url: site.websiteUrl,
    openingHours: 'Mo-Sa 08:00-19:00',
  }
}

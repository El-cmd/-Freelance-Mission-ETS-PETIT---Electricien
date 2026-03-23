import { Clock3, Mail, MapPin, Phone, ShieldCheck, Zap } from 'lucide-react'

import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'

export function Footer() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)
  const services =
    locale === 'fr'
      ? [
          'Électricité générale',
          'Remise aux normes',
          'Installation de tableaux électriques',
          'Rénovation électrique',
          'Domotique',
          'Bornes de recharge',
        ]
      : [
          'General electrical work',
          'Compliance upgrades',
          'Electrical panel installation',
          'Electrical renovation',
          'Home automation',
          'EV charging stations',
        ]
  const areas =
    locale === 'fr'
      ? ['Hem', "Villeneuve-d'Ascq", 'Wasquehal', 'Marcq-en-Baroeul', 'Croix', 'Métropole lilloise']
      : ['Hem', "Villeneuve-d'Ascq", 'Wasquehal', 'Marcq-en-Baroeul', 'Croix', 'Lille metropolitan area']
  const contactTitle = locale === 'fr' ? 'Contact' : 'Contact'
  const servicesTitle = locale === 'fr' ? 'Nos services' : 'Our services'
  const zonesTitle = locale === 'fr' ? "Zones d'intervention" : 'Service areas'
  const openingHours = locale === 'fr' ? 'Lun-Ven 08h-18h' : 'Mon-Fri 08:00-18:00'
  const insuranceLabel = locale === 'fr' ? 'Assurance garantie décennale' : '10-year liability insurance'

  return (
    <footer className="border-t border-white/12 bg-[#081a42] pt-10 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:py-10">
      <div className="w-full px-3 sm:px-5 lg:px-8">
        <div className="grid gap-8 border-b border-white/12 pb-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 font-heading text-2xl font-semibold text-white">{contactTitle}</h3>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={siteConfig.phoneHref} className="hover:text-primary">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>{siteConfig.addressLine}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock3 className="h-4 w-4 shrink-0 text-primary" />
                <span>{openingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                <span>{insuranceLabel}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-2xl font-semibold text-white">{servicesTitle}</h3>
            <ul className="space-y-2 text-sm text-white/85">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2.5">
                  <Zap className="h-4 w-4 shrink-0 text-primary" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-2xl font-semibold text-white">{zonesTitle}</h3>
            <ul className="space-y-2 text-sm text-white/85">
              {areas.map((area) => (
                <li key={area} className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} · {copy.footerSubtitle}
          </p>
          <div className="flex items-center gap-4">
            <a href={siteConfig.phoneHref} className="text-white/90 hover:text-primary">
              {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="text-white/90 hover:text-primary">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

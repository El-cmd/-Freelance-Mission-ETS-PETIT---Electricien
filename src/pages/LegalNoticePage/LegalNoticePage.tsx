import { getSiteConfig } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'

export function LegalNoticePage() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)

  return (
    <section className="py-10 sm:py-14">
      <div className="container max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="title-kicker">{locale === 'fr' ? 'Cadre légal' : 'Legal framework'}</p>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {locale === 'fr' ? 'Mentions légales' : 'Legal notice'}
          </h1>
        </header>

        <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            <span className="font-semibold text-foreground">{locale === 'fr' ? 'Éditeur du site :' : 'Website publisher:'}</span>{' '}
            {siteConfig.legalName}, {siteConfig.addressLine}, {siteConfig.phoneDisplay}, {siteConfig.email}.
          </p>
          <p>
            <span className="font-semibold text-foreground">{locale === 'fr' ? 'Activité :' : 'Activity:'}</span>{' '}
            {locale === 'fr'
              ? 'électricité générale, dépannage, rénovation, installation de tableaux électriques et bornes de recharge.'
              : 'general electrical work, troubleshooting, renovation, panel replacement and EV charger installation.'}
          </p>
          <p>
            <span className="font-semibold text-foreground">{locale === 'fr' ? 'Hébergeur :' : 'Hosting provider:'}</span>{' '}
            {locale === 'fr'
              ? `Serveur privé virtuel pour ${siteConfig.websiteUrl}. Les coordonnées légales de l’hébergeur doivent être complétées avant la mise en ligne.`
              : `Virtual private server for ${siteConfig.websiteUrl}. The hosting provider’s legal details must be completed before publication.`}
          </p>
          <p>
            {locale === 'fr'
              ? "Le contenu de ce site (textes, visuels, logo) est protégé. Toute reproduction sans autorisation est interdite."
              : 'Website content (text, visuals, logo) is protected. Any unauthorized reproduction is prohibited.'}
          </p>
          <p className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-foreground/80 sm:text-sm">
            {locale === 'fr'
              ? 'Note: ce contenu légal est une base informative et doit être validé/completé avec vos informations administratives officielles (SIRET, adresse complète, etc.).'
              : 'Note: this legal content is a starter draft and should be completed with your official business details (company registration, full address, etc.).'}
          </p>
        </div>
      </div>
    </section>
  )
}

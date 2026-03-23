import { getSiteConfig } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'

export function PrivacyPolicyPage() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)

  return (
    <section className="py-10 sm:py-14">
      <div className="container max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="title-kicker">{locale === 'fr' ? 'RGPD' : 'GDPR'}</p>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {locale === 'fr' ? 'Politique de confidentialité' : 'Privacy policy'}
          </h1>
        </header>

        <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            {locale === 'fr'
              ? 'ETS PETIT collecte uniquement les données nécessaires au traitement de vos demandes (nom, téléphone, email, message).'
              : 'ETS PETIT only collects data required to process your requests (name, phone, email, message).'}
          </p>
          <p>
            {locale === 'fr'
              ? "Ces données sont utilisées pour vous recontacter et établir un devis. Elles ne sont pas vendues ni cédées à des tiers."
              : 'This data is used to contact you back and prepare a quote. It is not sold or transferred to third parties.'}
          </p>
          <p>
            {locale === 'fr'
              ? 'Vous pouvez demander à tout moment la modification ou la suppression de vos données en écrivant à :'
              : 'You can request data update or deletion at any time by contacting:'}{' '}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-foreground hover:text-primary">
              {siteConfig.email}
            </a>
            .
          </p>
          <p>
            {locale === 'fr'
              ? "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'opposition et d'effacement de vos données."
              : 'In accordance with GDPR, you have rights of access, rectification, objection and erasure regarding your data.'}
          </p>
          <p className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-foreground/80 sm:text-sm">
            {locale === 'fr'
              ? 'Note: cette politique doit être adaptée à votre outil de formulaire final (mailto, Formspree, Web3Forms, etc.) et aux cookies réellement utilisés.'
              : 'Note: this policy should be adjusted to your final form tool (mailto, Formspree, Web3Forms, etc.) and actual cookies in use.'}
          </p>
        </div>
      </div>
    </section>
  )
}

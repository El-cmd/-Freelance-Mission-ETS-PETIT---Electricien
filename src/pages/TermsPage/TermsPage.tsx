import { useLocale } from '@/i18n/locale'

export function TermsPage() {
  const { locale } = useLocale()

  return (
    <section className="py-10 sm:py-14">
      <div className="container max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="title-kicker">{locale === 'fr' ? 'Conditions' : 'Terms'}</p>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {locale === 'fr' ? "Conditions d'utilisation" : 'Terms of use'}
          </h1>
        </header>

        <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            {locale === 'fr'
              ? "L'utilisation du site implique l'acceptation des présentes conditions d'utilisation."
              : 'Using this website implies acceptance of these terms of use.'}
          </p>
          <p>
            {locale === 'fr'
              ? 'Les informations tarifaires et prestations affichées sont indicatives et peuvent évoluer selon le diagnostic technique.'
              : 'Displayed prices and services are indicative and may change depending on technical diagnosis.'}
          </p>
          <p>
            {locale === 'fr'
              ? 'Toute demande de prestation fait l’objet d’un devis personnalisé avant intervention.'
              : 'Any service request is subject to a personalized quote before intervention.'}
          </p>
          <p>
            {locale === 'fr'
              ? "Le site ne peut être tenu responsable d'une indisponibilité temporaire ou d'erreurs involontaires de contenu."
              : 'The website cannot be held responsible for temporary unavailability or unintentional content errors.'}
          </p>
          <p className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-foreground/80 sm:text-sm">
            {locale === 'fr'
              ? 'Note: ce texte est une base standard. À compléter selon vos CGV/CGU officielles si vous en disposez.'
              : 'Note: this is a standard draft. Complete it with your official terms and conditions if available.'}
          </p>
        </div>
      </div>
    </section>
  )
}

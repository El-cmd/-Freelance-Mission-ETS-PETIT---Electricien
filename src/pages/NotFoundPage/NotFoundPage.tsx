import { ArrowLeft } from 'lucide-react'

import { useLocale } from '@/i18n/locale'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const { locale } = useLocale()

  return (
    <section className="container flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
      <p className="title-kicker">404</p>
      <h1 className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl">
        {locale === 'fr' ? 'Page introuvable' : 'Page not found'}
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        {locale === 'fr'
          ? 'La page demandée n’existe pas ou a été déplacée.'
          : 'The requested page does not exist or has been moved.'}
      </p>
      <Button asChild className="mt-7">
        <a href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {locale === 'fr' ? 'Retour à l’accueil' : 'Back to home'}
        </a>
      </Button>
    </section>
  )
}

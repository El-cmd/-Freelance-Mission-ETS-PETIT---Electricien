import { Phone } from 'lucide-react'

import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Button } from '@/components/ui/button'

export function MobileCallBar() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-2xl md:hidden">
      <Button asChild size="lg" className="h-12 w-full text-base">
        <a href={siteConfig.phoneHref} aria-label={`${copy.callNowAriaPrefix} ${siteConfig.phoneDisplay}`}>
          <Phone className="mr-2 h-4 w-4" />
          {copy.directCallLabel}: {siteConfig.phoneDisplay}
        </a>
      </Button>
    </div>
  )
}

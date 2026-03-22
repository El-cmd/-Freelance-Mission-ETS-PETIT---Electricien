import { MessageCircle, Phone } from 'lucide-react'

import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Button } from '@/components/ui/button'

export function MobileCallBar() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)
  const whatsappNumber = siteConfig.phoneHref.replace('tel:', '').replace(/\D/g, '')
  const whatsappHref = `https://wa.me/${whatsappNumber}`
  const callLabel = locale === 'fr' ? 'Appeler' : 'Call'
  const whatsappLabel = 'WhatsApp'
  const whatsappAriaLabel =
    locale === 'fr'
      ? `Contacter sur WhatsApp ${siteConfig.phoneDisplay}`
      : `Contact on WhatsApp ${siteConfig.phoneDisplay}`

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild size="lg" className="h-12 w-full text-base">
          <a href={siteConfig.phoneHref} aria-label={`${copy.callNowAriaPrefix} ${siteConfig.phoneDisplay}`}>
            <Phone className="mr-2 h-4 w-4" />
            {callLabel}
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          className="h-12 w-full border border-[#1f8f4e] bg-[#25D366] text-[#0b1f14] shadow-[0_8px_18px_rgba(37,211,102,0.28)] hover:brightness-105"
        >
          <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label={whatsappAriaLabel}>
            <MessageCircle className="mr-2 h-4 w-4" />
            {whatsappLabel}
          </a>
        </Button>
      </div>
    </div>
  )
}

import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'

export function Footer() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)

  return (
    <footer className="border-t border-white/12 bg-slate-950 py-10">
      <div className="container flex flex-col gap-3 text-sm text-white/72 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · {copy.footerSubtitle}
        </p>
        <div className="flex items-center gap-4">
          <a href={siteConfig.phoneHref} className="text-white/86 hover:text-primary">
            {siteConfig.phoneDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="text-white/86 hover:text-primary">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  )
}

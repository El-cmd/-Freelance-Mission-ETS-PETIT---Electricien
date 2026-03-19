import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'

export function Footer() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)

  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="container flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · {copy.footerSubtitle}
        </p>
        <div className="flex items-center gap-4">
          <a href={siteConfig.phoneHref} className="hover:text-foreground">
            {siteConfig.phoneDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  )
}

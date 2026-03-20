import { Menu, Phone } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import logo from '@/assets/logo.png'
import { getNavItems, getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Header() {
  const { locale, setLocale } = useLocale()
  const navItems = getNavItems(locale)
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label={copy.homeLinkAria}>
          <img src={logo} alt="Logo ETS PETIT" className="h-10 w-auto rounded-md object-contain sm:h-12" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label={copy.mainNavigationAria}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-border bg-muted text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            size="sm"
            variant={locale === 'fr' ? 'default' : 'outline'}
            onClick={() => setLocale('fr')}
            aria-label="Basculer en français"
            className="h-8 w-8 p-0 text-sm"
          >
            🇫🇷
          </Button>
          <Button
            size="sm"
            variant={locale === 'en' ? 'default' : 'outline'}
            onClick={() => setLocale('en')}
            aria-label="Switch to English"
            className="h-8 w-8 p-0 text-sm"
          >
            🇬🇧
          </Button>
          <Button asChild size="sm">
            <a href={siteConfig.phoneHref} aria-label={`${copy.callNowAriaPrefix} ${siteConfig.phoneDisplay}`}>
              <Phone className="mr-2 h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label={copy.menuAriaLabel}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-xs">
            <SheetHeader>
              <SheetTitle>{copy.menuTitle}</SheetTitle>
              <SheetDescription>{copy.menuDescription}</SheetDescription>
            </SheetHeader>
            <div className="mt-8 grid gap-2">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant={locale === 'fr' ? 'default' : 'outline'}
                  onClick={() => setLocale('fr')}
                  aria-label="Basculer en français"
                  className="h-8 w-full p-0 text-sm"
                >
                  🇫🇷
                </Button>
                <Button
                  size="sm"
                  variant={locale === 'en' ? 'default' : 'outline'}
                  onClick={() => setLocale('en')}
                  aria-label="Switch to English"
                  className="h-8 w-full p-0 text-sm"
                >
                  🇬🇧
                </Button>
              </div>
              {navItems.map((item) => (
                <SheetClose asChild key={item.path}>
                  <NavLink
                    to={item.path}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </NavLink>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button asChild className="mt-3 w-full">
                  <a href={siteConfig.phoneHref}>
                    <Phone className="mr-2 h-4 w-4" />
                    {copy.callNow}
                  </a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

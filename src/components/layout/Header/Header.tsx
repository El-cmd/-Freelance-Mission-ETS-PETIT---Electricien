import { BadgeEuro, Home, Mail, Menu, Phone, UserRound, Wrench } from 'lucide-react'

import logo from '@/assets/logo.webp'
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
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const navIcons = {
    '/': Home,
    '/services': Wrench,
    '/projects': BadgeEuro,
    '/about': UserRound,
    '/contact': Mail,
  } as const

  return (
    <header className="sticky top-0 z-40 bg-[#081a42]">
      <div className="flex h-16 items-center px-3 sm:px-5 lg:px-7">
        <a href="/" className="flex items-center" aria-label={copy.homeLinkAria}>
          <img
            src={logo}
            alt="Logo ETS PETIT"
            width={371}
            height={122}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-8 w-auto rounded-md object-contain sm:h-10"
          />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex" aria-label={copy.mainNavigationAria}>
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              aria-current={currentPath === item.path ? 'page' : undefined}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  currentPath === item.path
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-transparent text-white/80 hover:border-white/20 hover:text-white'
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:ml-4 md:flex md:shrink-0">
          <Button
            size="sm"
            variant={locale === 'fr' ? 'default' : 'outline'}
            onClick={() => setLocale('fr')}
            aria-label="Basculer en français"
            className={`h-8 w-8 p-0 text-sm ${locale === 'fr' ? '' : 'border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white'}`}
          >
            🇫🇷
          </Button>
          <Button
            size="sm"
            variant={locale === 'en' ? 'default' : 'outline'}
            onClick={() => setLocale('en')}
            aria-label="Switch to English"
            className={`h-8 w-8 p-0 text-sm ${locale === 'en' ? '' : 'border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white'}`}
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
          <SheetTrigger asChild className="ml-auto md:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label={copy.menuAriaLabel}
              className="border-[#f7c600]/45 bg-[#20263a]/70 text-[#f7c600] hover:bg-[#252d45]/80 hover:text-[#ffd84a]"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="h-[100dvh] w-screen max-w-none overflow-y-auto rounded-none border-0 bg-[#081a42] p-5 pt-[calc(env(safe-area-inset-top)+1.25rem)] text-white sm:p-6"
          >
            <div className="flex h-full flex-col">
              <SheetHeader className="pr-10">
                <SheetTitle className="sr-only">{copy.menuTitle}</SheetTitle>
                <div className="flex items-center gap-3 pb-4">
                  <img
                    src={logo}
                    alt="Logo ETS PETIT"
                    width={371}
                    height={122}
                    loading="eager"
                    decoding="async"
                    className="h-10 w-auto object-contain"
                  />
                  <SheetDescription className="sr-only">{copy.menuDescription}</SheetDescription>
                </div>
              </SheetHeader>

              <div className="mt-4 grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant={locale === 'fr' ? 'default' : 'outline'}
                    onClick={() => setLocale('fr')}
                    aria-label="Basculer en français"
                    className="h-11 w-full border-[#f7c600] bg-[#f7c600] p-0 text-base text-[#081a42] shadow-none hover:bg-[#ffd84a] hover:text-[#081a42]"
                  >
                    🇫🇷
                  </Button>
                  <Button
                    size="sm"
                    variant={locale === 'en' ? 'default' : 'outline'}
                    onClick={() => setLocale('en')}
                    aria-label="Switch to English"
                    className="h-11 w-full border-[#f7c600] bg-[#f7c600] p-0 text-base text-[#081a42] shadow-none hover:bg-[#ffd84a] hover:text-[#081a42]"
                  >
                    🇬🇧
                  </Button>
                </div>

                <nav className="grid gap-2" aria-label={copy.mainNavigationAria}>
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <a
                        href={item.path}
                        aria-current={currentPath === item.path ? 'page' : undefined}
                        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/6 px-4 py-4 text-base font-medium text-white/95 transition-colors hover:bg-white/12 active:scale-[0.99]"
                      >
                        {(() => {
                          const Icon = navIcons[item.path as keyof typeof navIcons] ?? Home
                          return <Icon className="h-5 w-5 shrink-0 text-[#f7c600]" aria-hidden="true" />
                        })()}
                        <span>{item.label}</span>
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </div>

              <div className="mt-auto pt-6">
                <Button asChild className="h-14 w-full rounded-2xl bg-[#f7c600] text-base text-[#081a42] hover:bg-[#ffd84a]">
                  <a href={siteConfig.phoneHref}>
                    <Phone className="mr-2 h-5 w-5" />
                    {copy.callNow}
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

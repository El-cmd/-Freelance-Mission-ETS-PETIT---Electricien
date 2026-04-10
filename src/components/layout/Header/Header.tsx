import { Menu, Phone } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

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

  return (
    <header className="sticky top-0 z-40 bg-[#081a42]">
      <div className="flex h-16 items-center px-3 sm:px-5 lg:px-7">
        <Link to="/" className="flex items-center" aria-label={copy.homeLinkAria}>
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
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex" aria-label={copy.mainNavigationAria}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-transparent text-white/80 hover:border-white/20 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
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
            className="h-[100dvh] w-screen max-w-none overflow-y-auto rounded-none border-0 bg-[linear-gradient(180deg,#f7f9fd_0%,#eef3fb_100%)] p-5 pt-[calc(env(safe-area-inset-top)+1.25rem)] sm:p-6"
          >
            <div className="flex h-full flex-col">
              <SheetHeader className="pr-10">
                <SheetTitle className="sr-only">{copy.menuTitle}</SheetTitle>
                <div className="rounded-[1.6rem] border border-white/15 bg-[linear-gradient(135deg,#081a42_0%,#0f2b66_55%,#153b8a_100%)] p-4 text-white shadow-[0_14px_32px_rgba(8,26,66,0.22)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                      <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        width={371}
                        height={122}
                        className="h-9 w-auto object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg font-semibold tracking-tight">{copy.menuDescription}</p>
                      <p className="mt-1 text-sm text-white/75">
                        {locale === 'fr'
                          ? 'Accès direct aux pages du site'
                          : 'Quick access to the site pages'}
                      </p>
                    </div>
                  </div>
                </div>
                <SheetDescription className="sr-only">{copy.menuDescription}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 grid gap-3">
                <div className="rounded-[1.4rem] border border-[#081a42]/10 bg-white/75 p-3 shadow-[0_10px_24px_rgba(8,26,66,0.06)] backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant={locale === 'fr' ? 'default' : 'outline'}
                      onClick={() => setLocale('fr')}
                      aria-label="Basculer en français"
                      className="h-11 w-full p-0 text-base shadow-none"
                    >
                      🇫🇷
                    </Button>
                    <Button
                      size="sm"
                      variant={locale === 'en' ? 'default' : 'outline'}
                      onClick={() => setLocale('en')}
                      aria-label="Switch to English"
                      className="h-11 w-full p-0 text-base shadow-none"
                    >
                      🇬🇧
                    </Button>
                  </div>
                </div>

                <nav className="grid gap-2" aria-label={copy.mainNavigationAria}>
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <NavLink
                        to={item.path}
                        className="group relative overflow-hidden rounded-[1.25rem] border border-[#081a42]/10 bg-white px-4 py-4 text-base font-semibold text-[#081a42] shadow-[0_8px_18px_rgba(8,26,66,0.05)] transition-all hover:-translate-y-px hover:border-[#f7c600]/35 hover:bg-[#f7c600]/10 active:scale-[0.99]"
                      >
                        <span className="absolute inset-y-0 left-0 w-1.5 bg-[linear-gradient(180deg,#f7c600_0%,#081a42_100%)]" />
                        <span className="pl-2">{item.label}</span>
                      </NavLink>
                    </SheetClose>
                  ))}
                </nav>
              </div>

              <div className="mt-auto pt-6">
                <div className="rounded-[1.4rem] border border-[#f7c600]/25 bg-[linear-gradient(135deg,#f7c600_0%,#ffd84a_100%)] p-3 shadow-[0_14px_28px_rgba(247,198,0,0.22)]">
                  <Button
                    asChild
                    className="h-14 w-full rounded-[1.1rem] border border-[#081a42]/10 bg-[#081a42] text-base text-white shadow-none hover:bg-[#10275f]"
                  >
                    <a href={siteConfig.phoneHref}>
                      <Phone className="mr-2 h-5 w-5" />
                      {copy.callNow}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileCallBar } from '@/components/layout/MobileCallBar'
import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { buildLocalBusinessJsonLd } from '@/lib/seo'

export function HomePage() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)
  const localBusinessJson = buildLocalBusinessJsonLd(siteConfig)

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        {copy.skipToContent}
      </a>
      <Header />
      <main className="pb-24 md:pb-0">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileCallBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
      />
    </>
  )
}

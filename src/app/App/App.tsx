import { Outlet, Route, Routes } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileCallBar } from '@/components/layout/MobileCallBar'
import { getSiteConfig, getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { buildLocalBusinessJsonLd } from '@/lib/seo'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ServicesPage } from '@/pages/ServicesPage'

function SiteLayout() {
  const { locale } = useLocale()
  const siteConfig = getSiteConfig(locale)
  const copy = getUiCopy(locale)
  const localBusinessJson = buildLocalBusinessJsonLd(siteConfig)

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        {copy.skipToContent}
      </a>
      <Header />
      <main id="main-content" className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
      />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App

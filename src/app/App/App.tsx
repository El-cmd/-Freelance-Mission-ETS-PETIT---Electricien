import { lazy, type ReactNode, Suspense } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileCallBar } from '@/components/layout/MobileCallBar'
import { getUiCopy } from '@/data/siteContent'
import { useLocale } from '@/i18n/locale'
import { SeoManager } from '@/components/layout/SeoManager'

const HomePage = lazy(() => import('@/pages/HomePage').then(({ HomePage: Page }) => ({ default: Page })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(({ ServicesPage: Page }) => ({ default: Page })))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then(({ ProjectsPage: Page }) => ({ default: Page })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(({ AboutPage: Page }) => ({ default: Page })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(({ ContactPage: Page }) => ({ default: Page })))
const LegalNoticePage = lazy(() =>
  import('@/pages/LegalNoticePage').then(({ LegalNoticePage: Page }) => ({ default: Page })),
)
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/PrivacyPolicyPage').then(({ PrivacyPolicyPage: Page }) => ({ default: Page })),
)
const TermsPage = lazy(() => import('@/pages/TermsPage').then(({ TermsPage: Page }) => ({ default: Page })))
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then(({ NotFoundPage: Page }) => ({ default: Page })),
)

function SiteLayout({ children }: { children: ReactNode }) {
  const { locale } = useLocale()
  const copy = getUiCopy(locale)

  return (
    <div className="flex min-h-screen flex-col">
      <SeoManager />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        {copy.skipToContent}
      </a>
      <Header />
      <main id="main-content" className="flex min-h-0 flex-1 flex-col">
        <Suspense
          fallback={
            <div className="container flex min-h-[40vh] items-center justify-center py-16 text-sm text-muted-foreground">
              {locale === 'fr' ? 'Chargement…' : 'Loading…'}
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  )
}

function App() {
  const pathname =
    window.location.pathname === '/index.html'
      ? '/'
      : window.location.pathname.replace(/\/+$/, '') || '/'

  const pageByPath: Record<string, ReactNode> = {
    '/': <HomePage />,
    '/services': <ServicesPage />,
    '/projects': <ProjectsPage />,
    '/about': <AboutPage />,
    '/contact': <ContactPage />,
    '/mentions-legales': <LegalNoticePage />,
    '/politique-confidentialite': <PrivacyPolicyPage />,
    '/conditions-utilisation': <TermsPage />,
  }

  return (
    <SiteLayout>
      {pageByPath[pathname] ?? <NotFoundPage />}
    </SiteLayout>
  )
}

export default App

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'

export type Locale = 'fr' | 'en'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LOCALE_STORAGE_KEY = 'ets-petit-locale'

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'fr'
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (savedLocale === 'fr' || savedLocale === 'en') {
    return savedLocale
  }

  return window.navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}

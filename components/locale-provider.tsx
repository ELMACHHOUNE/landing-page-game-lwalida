'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  defaultLocale,
  dirFor,
  LOCALE_COOKIE,
  type Locale,
} from '@/lib/i18n/config'
import { dictionaries, type Dictionary } from '@/lib/i18n/dictionaries'

type LocaleContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  initialLocale = defaultLocale,
  children,
}: {
  initialLocale?: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof document !== 'undefined') {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dirFor(locale)
    document.title = dictionaries[locale].meta.title
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: dirFor(locale),
      t: dictionaries[locale],
      setLocale,
    }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useI18n() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useI18n must be used within a LocaleProvider')
  }
  return context
}

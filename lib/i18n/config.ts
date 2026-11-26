export const locales = ['en', 'fr', 'ar'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr'
}

export const localeNames: Record<
  Locale,
  { native: string; english: string; code: string; short: string }
> = {
  en: { native: 'English', english: 'English', code: 'EN', short: 'EN' },
  fr: { native: 'Français', english: 'French', code: 'FR', short: 'FR' },
  ar: { native: 'العربية', english: 'Arabic', code: 'AR', short: 'ع' },
}

export const LOCALE_COOKIE = 'locale'

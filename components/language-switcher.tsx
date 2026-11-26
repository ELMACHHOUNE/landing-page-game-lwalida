'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Languages } from 'lucide-react'
import { localeNames, locales, type Locale } from '@/lib/i18n/config'
import { useI18n } from '@/components/locale-provider'

function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === 'fr') {
    return (
      <span className="lang-flag" aria-hidden="true">
        <svg viewBox="0 0 30 20" preserveAspectRatio="none">
          <rect width="10" height="20" fill="#0055A4" />
          <rect x="10" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" width="10" height="20" fill="#EF4135" />
        </svg>
      </span>
    )
  }

  if (locale === 'ar') {
    return (
      <span className="lang-flag" aria-hidden="true">
        <svg viewBox="0 0 30 20" preserveAspectRatio="none">
          <rect width="30" height="20" fill="#C1272D" />
          <g transform="translate(7 2) scale(0.66)" fill="none" stroke="#006233" strokeWidth="1.4">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.169L12 18.896l-7.335 3.858 1.401-8.169L.132 9.21l8.2-1.192z" />
          </g>
        </svg>
      </span>
    )
  }

  return (
    <span className="lang-flag" aria-hidden="true">
      <svg viewBox="0 0 30 20" preserveAspectRatio="none">
        <rect width="30" height="20" fill="#012169" />
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#C8102E" strokeWidth="1.6" />
        <path d="M15 0 V20 M0 10 H30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M15 0 V20 M0 10 H30" stroke="#C8102E" strokeWidth="3.2" />
      </svg>
    </span>
  )
}

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const choose = (next: Locale) => {
    setLocale(next)
    setOpen(false)
  }

  return (
    <div className={`lang-switch ${className}`.trim()} ref={containerRef}>
      <button
        type="button"
        className="lang-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.language.label}: ${localeNames[locale].native}`}
        title={t.language.label}
      >
        <Languages size={16} />
        <span className="lang-trigger-code">{localeNames[locale].short}</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label={t.language.label}>
          {locales.map((code) => {
            const active = code === locale
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={`lang-option${active ? ' is-active' : ''}`}
                  onClick={() => choose(code)}
                >
                  <FlagIcon locale={code} />
                  <span className="lang-native">{localeNames[code].native}</span>
                  <span className="lang-code">{localeNames[code].code}</span>
                  {active && <Check size={13} className="lang-check" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

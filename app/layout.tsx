import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/lib/site'
import { LocaleProvider } from '@/components/locale-provider'
import { dirFor } from '@/lib/i18n/config'
import { dictionaries } from '@/lib/i18n/dictionaries'
import { getLocale } from '@/lib/i18n/server'
import './globals.css'

const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
  : undefined

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const { meta } = dictionaries[locale]

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.description,
    applicationName: siteConfig.name,
    generator: 'Next.js',
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.author, url: siteConfig.links.github }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    category: 'games',
    classification: 'Narrative adventure',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      url: '/',
      siteName: siteConfig.name,
      title: meta.title,
      description: meta.description,
      locale: meta.locale,
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: meta.ogAlt,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.shortDescription,
      images: [
        {
          url: siteConfig.ogImage,
          alt: meta.ogAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: 'black-translucent',
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    other: {
      'msapplication-TileColor': '#0A0A0A',
    },
    ...(verification ? { verification } : {}),
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} dir={dirFor(locale)}>
      <body className="antialiased">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

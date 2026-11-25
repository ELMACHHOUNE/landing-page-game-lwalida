import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'L’Walida — Every Street Holds a Memory',
  description: 'Discover L’Walida, a Moroccan narrative adventure by PROJET_29, inspired by Rabat’s historical medina and created for Game Jam VGC.',
  generator: 'Next.js',
  openGraph: {
    title: 'L’Walida — Every Street Holds a Memory',
    description: 'A Moroccan narrative adventure by PROJET_29, inspired by Rabat’s historic medina.',
    type: 'website',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-png-K86J8SJQiMiSbG90QyUHjWBHKLbLle.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L’Walida — Every Street Holds a Memory',
    description: 'A Moroccan narrative adventure by PROJET_29.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-png-K86J8SJQiMiSbG90QyUHjWBHKLbLle.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0A272E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

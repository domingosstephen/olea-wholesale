import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const metropolis = localFont({
  src: [
    {
      path: '../public/fonts/Metropolis-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Metropolis-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-metropolis',
  display: 'swap',
  fallback: ['Inter', 'system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: 'Olea Wholesale — Industrial Excellence in Bulk Cooking Oils',
    template: '%s | Olea Wholesale',
  },
  description:
    'Premium-grade culinary oils supplied at scale. Bulk olive oil, sunflower, canola, and fryer blends for industrial food manufacturers and restaurant chains.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.megatitulocomercio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Olea Wholesale',
    images: [
      {
        url: '/images/site/hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Olea Wholesale — Industrial Excellence in Bulk Cooking Oils',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/site/hero.jpeg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${metropolis.variable}`}>
      <body className="font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}

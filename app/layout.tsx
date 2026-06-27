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
    'Premium-grade culinary oils supplied at scale. Bulk sunflower, canola, soybean, palm, and rapeseed oils for industrial food manufacturers and restaurant chains worldwide.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.megatitulocomercio.com'),
  keywords: [
    'bulk cooking oil',
    'wholesale cooking oil',
    'industrial cooking oil supplier',
    'bulk sunflower oil',
    'bulk canola oil',
    'bulk soybean oil',
    'bulk palm oil',
    'bulk rapeseed oil',
    'edible oil wholesale',
    'food grade oil supplier',
    'cooking oil distributor',
    'used cooking oil UCO',
    'RSPO certified palm oil',
    'non-GMO canola oil',
    'Olea Wholesale',
  ],
  authors: [{ name: 'Olea Wholesale', url: 'https://www.megatitulocomercio.com' }],
  creator: 'Olea Wholesale',
  publisher: 'Olea Wholesale',
  category: 'wholesale',
  icons: {
    icon: '/favicon.ico',
  },
  alternates: { canonical: 'https://www.megatitulocomercio.com' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Olea Wholesale',
    url: 'https://www.megatitulocomercio.com',
    images: [
      {
        url: '/images/site/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Olea Wholesale — Industrial Excellence in Bulk Cooking Oils',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olea Wholesale — Industrial Excellence in Bulk Cooking Oils',
    description: 'Premium-grade bulk cooking oils for industrial food manufacturers and restaurant chains. ISO 22000, RSPO certified.',
    images: ['/images/site/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google4eb14543200fea69',
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

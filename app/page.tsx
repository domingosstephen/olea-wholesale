import { Hero } from '@/components/marketing/hero'
import { ProductHighlights } from '@/components/marketing/product-highlights'
import { StandardsSection } from '@/components/marketing/standards-section'
import { LogisticsSection } from '@/components/marketing/logistics-section'
import { ClosingCTA } from '@/components/marketing/closing-cta'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Olea Wholesale Corp.',
  url: 'https://olea-wholesale.com',
  description: 'Premium-grade culinary oils supplied at scale for industrial food manufacturers and restaurant chains.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+351917379662',
    contactType: 'sales',
    availableLanguage: 'English',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <ProductHighlights />
      <StandardsSection />
      <LogisticsSection />
      <ClosingCTA />
    </>
  )
}

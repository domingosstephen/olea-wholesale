import { Hero } from '@/components/marketing/hero'
import { StandardsSection } from '@/components/marketing/standards-section'
import { LogisticsSection } from '@/components/marketing/logistics-section'
import { CTABanner } from '@/components/marketing/cta-banner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StandardsSection />
      <LogisticsSection />
      <CTABanner />
    </>
  )
}

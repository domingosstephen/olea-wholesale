import { Hero } from '@/components/marketing/hero'
import { ProductHighlights } from '@/components/marketing/product-highlights'
import { StandardsSection } from '@/components/marketing/standards-section'
import { LogisticsSection } from '@/components/marketing/logistics-section'
import { ClosingCTA } from '@/components/marketing/closing-cta'

const BASE = 'https://www.megatitulocomercio.com'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: 'Olea Wholesale Corp.',
  url: BASE,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE}/images/site/hero-bg.jpg`,
    width: 1200,
    height: 630,
  },
  description: 'Certified B2B supplier of premium bulk cooking oils — sunflower, canola, soybean, palm, rapeseed, corn, and used cooking oil (UCO). Serving industrial food manufacturers and restaurant chains across 40+ countries.',
  foundingDate: '2018',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+351917379662',
    email: 'infomegatitulocomerciotradelda@gmail.com',
    contactType: 'sales',
    availableLanguage: ['English', 'Portuguese'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PT',
  },
  areaServed: [
    { '@type': 'Continent', name: 'Europe' },
    { '@type': 'Continent', name: 'Africa' },
    { '@type': 'Continent', name: 'North America' },
    { '@type': 'Continent', name: 'South America' },
    { '@type': 'Place', name: 'Middle East' },
  ],
  knowsAbout: ['Bulk Cooking Oils', 'Edible Oils', 'Sunflower Oil', 'Canola Oil', 'Palm Oil', 'Soybean Oil', 'Used Cooking Oil', 'UCO'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  name: 'Olea Wholesale',
  url: BASE,
  description: 'Industrial bulk cooking oil supplier — sunflower, canola, soybean, palm, rapeseed, and UCO for food manufacturers worldwide.',
  inLanguage: 'en',
  publisher: { '@id': `${BASE}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE}/products?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Order Bulk Cooking Oils from Olea Wholesale',
  description: 'Step-by-step guide to sourcing industrial-grade cooking oils in bulk for food manufacturing and restaurant chains.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Browse the Product Catalogue', text: 'Explore our range of bulk cooking oils including refined sunflower, canola, soybean, palm, rapeseed, corn oil, and UCO. Each product page lists technical specifications, certifications, and available container sizes.', url: `${BASE}/products` },
    { '@type': 'HowToStep', position: 2, name: 'Request a Quote', text: 'Submit a quote request specifying the product, volume (liters), container preference (IBC, flexitank, ISO tank), and destination port. We respond within 24 hours with pricing.', url: `${BASE}/quote` },
    { '@type': 'HowToStep', position: 3, name: 'Review Your Quotation', text: 'Your quotation includes per-liter pricing, volume discounts, lead time, shipping terms (CIF or FOB), and required certifications (ISO 22000, COA, Bill of Lading).' },
    { '@type': 'HowToStep', position: 4, name: 'Confirm and Ship', text: 'Once confirmed, we process your order and arrange logistics. Every batch is lab-tested before shipment and ships with a full documentation package.' },
  ],
}

const speakableJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '[data-speakable]'],
  },
  url: BASE,
}

const homepageFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What bulk cooking oils does Olea Wholesale supply?', acceptedAnswer: { '@type': 'Answer', text: 'Olea Wholesale supplies refined sunflower oil, non-GMO canola oil, refined soybean oil, crude and refined palm oil, corn oil, rapeseed oil, and used cooking oil (UCO) for biodiesel. All products are available in industrial bulk quantities.' } },
    { '@type': 'Question', name: 'What is the minimum order quantity for bulk cooking oil?', acceptedAnswer: { '@type': 'Answer', text: 'Minimum order quantities start at 1,000 liters. Standard configurations include 200L drums, 1,000L IBC totes, 20,000L flexitanks, and full ISO tank containers. Contact us for specific MOQs per product.' } },
    { '@type': 'Question', name: 'Which countries does Olea Wholesale ship to?', acceptedAnswer: { '@type': 'Answer', text: 'We serve industrial buyers across 40+ countries worldwide, with logistics coverage across Europe, the Middle East, Africa, and the Americas. Shipping is arranged CIF or FOB depending on your preference.' } },
    { '@type': 'Question', name: 'What certifications do your bulk oils carry?', acceptedAnswer: { '@type': 'Answer', text: 'Our products are certified under ISO 22000 (Food Safety Management), RSPO (Roundtable on Sustainable Palm Oil), Non-GMO Project Verified, and EU Organic standards depending on the specific product. Every batch ships with a Certificate of Analysis (COA).' } },
    { '@type': 'Question', name: 'How long does delivery take?', acceptedAnswer: { '@type': 'Answer', text: 'Standard lead times range from 7 to 21 days depending on the product, origin country, and destination port. We maintain strategic stock positions to minimize delivery times for our most popular products.' } },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqJsonLd) }} />
      <Hero />
      <ProductHighlights />
      <StandardsSection />
      <LogisticsSection />
      <ClosingCTA />
    </>
  )
}

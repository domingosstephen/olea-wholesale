import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, Clock, Package, Anchor, ShieldCheck, FlaskConical, FileCheck } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ContainerSelector } from '@/components/product/container-selector'
import { PricingTiers } from '@/components/product/pricing-tiers'
import { SpecsTable } from '@/components/product/specs-table'
import { getProductBySlug, getProductContainers, getProductPricingTiers } from '@/lib/data/products'
import { formatCurrency } from '@/lib/utils'

const PRODUCT_FAQS: Record<string, { question: string; answer: string }[]> = {
  'refined-sunflower-oil-high-oleic': [
    { question: 'What is high-oleic sunflower oil used for?', answer: 'High-oleic sunflower oil is used primarily in industrial frying operations, snack food manufacturing, and commercial food processing. Its high oleic acid content (82%) provides superior oxidative stability, meaning it lasts longer in deep fryers and produces fewer off-flavours during extended use.' },
    { question: 'What is the smoke point of high-oleic sunflower oil?', answer: 'Our high-oleic refined sunflower oil has a smoke point of 232°C (450°F), making it suitable for high-temperature frying, baking, and roasting applications.' },
    { question: 'What certifications does this oil carry?', answer: 'This product is ISO 22000 certified and ships with a Certificate of Analysis (COA), Bill of Lading, and Health Certificate with every batch.' },
  ],
  'non-gmo-canola-oil-canadian': [
    { question: 'Is this canola oil verified non-GMO?', answer: 'Yes. This canola oil carries Non-GMO Project Verification and is sourced exclusively from verified non-GMO Canadian canola crops.' },
    { question: 'What makes expeller-pressed canola oil different?', answer: 'Expeller-pressed extraction uses mechanical pressure rather than chemical solvents (like hexane), preserving the natural nutritional profile including omega-3 fatty acids (11%) and keeping saturated fat low (7%).' },
    { question: 'What is the minimum order quantity?', answer: 'MOQ is 1,000 liters. Standard pallet configuration is 48 x 20L containers.' },
  ],
  'refined-soybean-oil': [
    { question: 'What industries use refined soybean oil?', answer: 'Refined soybean oil is used in commercial food manufacturing, industrial frying, margarine production, salad dressings, and bakery applications. It is one of the most widely consumed vegetable oils globally.' },
    { question: 'What is the shelf life of refined soybean oil?', answer: 'Properly stored in climate-controlled conditions, refined soybean oil has a shelf life of 12 to 18 months from the date of manufacture.' },
    { question: 'What shipping documentation is included?', answer: 'Every shipment includes a Certificate of Analysis, Bill of Lading, Packing List, Health Certificate, and EUR.1 Movement Certificate where applicable.' },
  ],
  'crude-sunflower-oil': [
    { question: 'What is the difference between crude and refined sunflower oil?', answer: 'Crude sunflower oil is extracted but not refined — it retains its natural colour, flavour, and impurities. It is typically purchased by refineries and food manufacturers who perform their own refining process to meet specific product specifications.' },
    { question: 'Who typically buys crude sunflower oil?', answer: 'Crude sunflower oil buyers include oil refineries, large-scale food manufacturers, and biodiesel producers who require unrefined feedstock for their own processing operations.' },
    { question: 'What is the free fatty acid content?', answer: 'Our crude sunflower oil has a free fatty acid content below 2%, which is within the standard range for crude vegetable oils destined for refining.' },
  ],
  'refined-corn-oil': [
    { question: 'What is refined corn oil used for in food manufacturing?', answer: 'Refined corn oil is widely used in commercial frying, snack food production, margarine manufacturing, and as an ingredient in baked goods. Its neutral flavour and high smoke point make it versatile for industrial food applications.' },
    { question: 'Is corn oil suitable for high-temperature frying?', answer: 'Yes. Refined corn oil has a smoke point of approximately 230°C (446°F), making it suitable for deep-frying and commercial food processing at high temperatures.' },
    { question: 'What container sizes are available?', answer: 'We supply refined corn oil in IBC totes (1,000L), flexitanks (20,000L), and ISO tank containers. Contact us for specific packaging requirements.' },
  ],
  'refined-palm-oil': [
    { question: 'Is your palm oil RSPO certified?', answer: 'Yes. Our refined palm oil carries RSPO (Roundtable on Sustainable Palm Oil) certification, ensuring it meets international sustainability standards for responsible palm oil production.' },
    { question: 'What is refined palm oil used for?', answer: 'Refined palm oil is used in food manufacturing (margarine, confectionery, baked goods), industrial applications (soaps, cosmetics), and as a cooking oil in commercial kitchens. Its semi-solid texture at room temperature makes it useful as a butter or shortening substitute.' },
    { question: 'What is the melting point of refined palm oil?', answer: 'Refined palm oil has a melting point of approximately 33-39°C (91-102°F), which gives it a semi-solid consistency at room temperature in temperate climates.' },
  ],
  'refined-rapeseed-oil': [
    { question: 'What is the difference between rapeseed oil and canola oil?', answer: 'Canola is a specific cultivar of rapeseed bred to have low erucic acid (below 2%) and low glucosinolates. Our refined rapeseed oil meets the same low erucic acid standard, making it suitable for food-grade applications.' },
    { question: 'What are the main applications for refined rapeseed oil?', answer: 'Refined rapeseed oil is used in commercial frying, food manufacturing, salad dressings, margarine production, and biodiesel feedstock. It has a neutral flavour and high smoke point.' },
    { question: 'What is the lead time for bulk orders?', answer: 'Standard lead time is 14 to 21 days from order confirmation, depending on quantity and shipping destination.' },
  ],
  'used-cooking-oil': [
    { question: 'What is used cooking oil (UCO) used for?', answer: 'Used cooking oil is primarily used as feedstock for biodiesel production and renewable fuel manufacturing. It is also used in animal feed production and industrial applications such as soap and lubricant manufacturing.' },
    { question: 'What quality standards does your UCO meet?', answer: 'Our used cooking oil is filtered, tested for free fatty acid content and moisture levels, and meets ISCC (International Sustainability and Carbon Certification) standards for biodiesel feedstock.' },
    { question: 'What is the minimum order for used cooking oil?', answer: 'MOQ is typically one flexitank (approximately 20,000 liters). Contact us for specific volume requirements and pricing.' },
  ],
  'crude-palm-oil': [
    { question: 'Who buys crude palm oil?', answer: 'Crude palm oil (CPO) is purchased by oil refineries, oleochemical manufacturers, biodiesel producers, and large-scale food companies that refine and fractionate the oil into various end products.' },
    { question: 'What is the difference between crude and refined palm oil?', answer: 'Crude palm oil retains its natural red-orange colour from carotenoids and has not undergone bleaching, deodorising, or fractionation. Refined palm oil is processed to remove colour, odour, and impurities for use in food manufacturing.' },
    { question: 'Is your crude palm oil RSPO certified?', answer: 'Yes. We source from RSPO-certified plantations to ensure sustainable and responsible palm oil production practices.' },
  ],
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} — Bulk Wholesale`,
    description: product.short_description || `Industrial wholesale ${product.name} from Olea Wholesale.`,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const [containers, pricingTiers] = await Promise.all([
    getProductContainers(product.id),
    getProductPricingTiers(product.id),
  ])

  const origin = [product.origin_region, product.origin_country].filter(Boolean).join(', ')

  const shippingDocs = [
    'Certificate of Analysis (COA) per batch',
    'Bill of Lading & Packing List',
    'Health Certificate / Phytosanitary Cert',
    'EUR.1 Movement Certificate (where applicable)',
  ]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Catalogue',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.megatitulocomercio.com'}/products`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.name,
      },
    ],
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description,
    sku: product.sku,
    image: product.hero_image_url ? `https://www.megatitulocomercio.com${product.hero_image_url}` : undefined,
    brand: { '@type': 'Brand', name: 'Olea Wholesale' },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.base_currency,
      price: (product.base_unit_price_cents / 100).toFixed(2),
      availability: product.status === 'active' ? 'https://schema.org/InStock' : product.status === 'backorder' ? 'https://schema.org/BackOrder' : 'https://schema.org/LimitedAvailability',
    },
  }

  const productFaqs = PRODUCT_FAQS[slug] || []
  const faqJsonLd = productFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: productFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <section className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Container>
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center gap-2 font-label text-[11px] text-on-surface-variant sm:mb-6 sm:text-label-sm">
          <Link href="/products" className="uppercase tracking-wider hover:text-on-surface">
            Catalogue
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate uppercase tracking-wider text-on-surface">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Image + info cards */}
          <div className="animate-fade-in space-y-4 sm:space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low sm:aspect-square">
              {product.hero_image_url && (
                <Image
                  src={product.hero_image_url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 sm:p-5">
                <ShieldCheck className="mb-2 h-5 w-5 text-secondary sm:mb-3 sm:h-6 sm:w-6" strokeWidth={1.5} />
                <h4 className="mb-1 text-xs font-semibold text-on-surface sm:text-sm">Quality Assurance</h4>
                <p className="text-[11px] leading-relaxed text-on-surface-variant sm:text-xs">
                  Processed at certified origin facility in {origin || 'origin'}.
                </p>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 sm:p-5">
                <FlaskConical className="mb-2 h-5 w-5 text-secondary sm:mb-3 sm:h-6 sm:w-6" strokeWidth={1.5} />
                <h4 className="mb-1 text-xs font-semibold text-on-surface sm:text-sm">Lab Certified</h4>
                <p className="text-[11px] leading-relaxed text-on-surface-variant sm:text-xs">
                  Every batch undergoes ISO 22000 laboratory testing.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Product info + configurator */}
          <div className="animate-fade-in-up space-y-4 sm:space-y-6">
            {origin && (
              <span className="inline-block rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold text-on-secondary-container">
                {product.origin_country?.toUpperCase()} ORIGIN
              </span>
            )}

            <h1 className="text-[28px] font-bold leading-tight text-on-surface sm:text-[36px] md:text-display-lg">{product.name}</h1>

            <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-lg">{product.short_description}</p>

            <div>
              <span className="text-[28px] font-bold text-on-surface sm:text-[36px]">
                {formatCurrency(product.base_unit_price_cents, product.base_currency)}
              </span>
              <span className="ml-2 text-sm text-on-surface-variant">
                / {product.base_unit} (Bulk Base)
              </span>
            </div>

            {/* Configurator */}
            {containers.length > 0 && (
              <ContainerSelector product={product} containers={containers} />
            )}

            {/* Logistics meta */}
            <div className="space-y-0 divide-y divide-outline-variant">
              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2 text-body-md text-on-surface-variant">
                  <Clock className="h-4 w-4" /> Lead Time
                </span>
                <span className="font-semibold text-on-surface">{product.lead_time_days} Days</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2 text-body-md text-on-surface-variant">
                  <Package className="h-4 w-4" /> Min. Order (MOQ)
                </span>
                <span className="font-semibold text-on-surface">
                  {product.moq_liters.toLocaleString()} Liters
                </span>
              </div>
              {product.port_of_origin && (
                <div className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2 text-body-md text-on-surface-variant">
                    <Anchor className="h-4 w-4" /> Port of Origin
                  </span>
                  <span className="font-semibold text-on-surface">{product.port_of_origin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        {product.specifications && (
          <section className="mt-10 sm:mt-16">
            <div className="mb-4 flex items-center gap-3 sm:mb-6">
              <div className="h-8 w-1 rounded-full bg-secondary" />
              <div>
                <h2 className="text-xl font-semibold text-on-surface sm:text-headline-lg">Technical Specifications</h2>
                <p className="text-xs text-on-surface-variant sm:text-body-md">
                  Chemical analysis verified by Independent COI Certified Laboratory.
                </p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <SpecsTable
                specifications={product.specifications as Record<string, { result: string; limit: string }>}
              />

              <div className="space-y-6">
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-on-surface-variant" strokeWidth={1.5} />
                    <h3 className="font-label text-label-md uppercase tracking-wider text-on-surface">
                      Shipping Documentation
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {shippingDocs.map((doc) => (
                      <li key={doc} className="flex items-center gap-2 text-body-md text-on-surface-variant">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-outline" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {product.certifications && product.certifications.length > 0 && (
                  <div className="flex gap-4">
                    {product.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex flex-1 flex-col items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-center"
                      >
                        <ShieldCheck className="mb-2 h-6 w-6 text-outline" strokeWidth={1.5} />
                        <span className="font-label text-label-sm text-on-surface-variant">{cert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tiers */}
        {pricingTiers.length > 0 && <PricingTiers product={product} tiers={pricingTiers} />}

        {/* FAQ */}
        {productFaqs.length > 0 && (
          <section className="mt-10 sm:mt-16">
            <div className="mb-4 flex items-center gap-3 sm:mb-6">
              <div className="h-8 w-1 rounded-full bg-secondary" />
              <h2 className="text-xl font-semibold text-on-surface sm:text-headline-lg">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {productFaqs.map((f) => (
                <div key={f.question} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
                  <h3 className="text-sm font-semibold text-on-surface sm:text-base">{f.question}</h3>
                  <p className="mt-2 text-body-md text-on-surface-variant">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </section>
  )
}

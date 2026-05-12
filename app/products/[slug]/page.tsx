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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description,
    sku: product.sku,
    image: product.hero_image_url ? `https://olea-wholesale.com${product.hero_image_url}` : undefined,
    brand: { '@type': 'Brand', name: 'Olea Wholesale' },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.base_currency,
      price: (product.base_unit_price_cents / 100).toFixed(2),
      availability: product.status === 'active' ? 'https://schema.org/InStock' : product.status === 'backorder' ? 'https://schema.org/BackOrder' : 'https://schema.org/LimitedAvailability',
    },
  }

  return (
    <section className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Container>
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 font-label text-label-sm text-on-surface-variant">
          <Link href="/products" className="uppercase tracking-wider hover:text-on-surface">
            Catalogue
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="uppercase tracking-wider text-on-surface">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Image + info cards */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
              {product.hero_image_url && (
                <Image
                  src={product.hero_image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
                <ShieldCheck className="mb-3 h-6 w-6 text-on-surface-variant" strokeWidth={1.5} />
                <h4 className="mb-1 font-label text-label-md text-on-surface">Quality Assurance</h4>
                <p className="text-label-sm text-on-surface-variant">
                  Cold-pressed within 24 hours of harvest in {origin || 'origin facility'}.
                </p>
              </div>
              <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
                <FlaskConical className="mb-3 h-6 w-6 text-on-surface-variant" strokeWidth={1.5} />
                <h4 className="mb-1 font-label text-label-md text-on-surface">Lab Certified</h4>
                <p className="text-label-sm text-on-surface-variant">
                  Every batch undergoes rigorous ISO 22000 laboratory testing.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Product info + configurator */}
          <div className="space-y-6">
            {origin && (
              <span className="inline-block rounded-lg bg-secondary-container px-3 py-1 font-label text-label-sm text-on-secondary-container">
                {product.origin_country?.toUpperCase()} ORIGIN
              </span>
            )}

            <h1 className="text-display-lg text-on-surface">{product.name}</h1>

            <p className="text-body-lg text-on-surface-variant">{product.short_description}</p>

            <div>
              <span className="text-display-lg text-on-surface">
                {formatCurrency(product.base_unit_price_cents, product.base_currency)}
              </span>
              <span className="ml-2 text-body-md text-on-surface-variant">
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
          <section className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-secondary" />
              <div>
                <h2 className="text-headline-lg text-on-surface">Technical Specifications</h2>
                <p className="text-body-md text-on-surface-variant">
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
      </Container>
    </section>
  )
}

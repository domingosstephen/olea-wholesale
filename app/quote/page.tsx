import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { QuoteForm } from '@/components/forms/quote-form'
import { getProductBySlug, getAllProducts } from '@/lib/data/products'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.megatitulocomercio.com/quote' },
  title: 'Request a Bulk Cooking Oil Quote — Olea Wholesale',
  description:
    'Request a wholesale price quote for bulk sunflower oil, canola oil, soybean oil, palm oil, rapeseed oil, or UCO. Specify your volume, container type, and destination port — we respond within 1 business day.',
}

interface Props {
  searchParams: Promise<{
    product?: string
    container?: string
    quantity?: string
    type?: string
    tier?: string
  }>
}

export default async function QuotePage({ searchParams }: Props) {
  const params = await searchParams
  const prefilledProduct = params.product ? await getProductBySlug(params.product) : null
  const allProducts = await getAllProducts()

  const inquiryType = params.type === 'specs_request' ? 'specs_request' : 'quote_request'

  return (
    <section className="py-12 md:py-16">
      <Container className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-display-lg text-on-surface">Request a Bulk Cooking Oil Quote</h1>
          <p className="mt-3 text-body-lg text-on-surface-variant">
            Fill out the form below with your product, volume, and destination port. Our supply team responds within 1 business day with pricing, lead time, and available container configurations.
          </p>
          <div className="mt-6 rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-3 font-label text-label-md font-semibold uppercase tracking-wider text-on-surface">What to include in your request</h2>
            <ul className="space-y-1.5 text-body-md text-on-surface-variant">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />Product type (sunflower, canola, soybean, palm, rapeseed, UCO, or other)</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />Volume required (liters or metric tonnes)</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />Preferred container: IBC (1,000L), flexitank (20,000L), or ISO tank</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />Destination port and preferred shipping terms (CIF or FOB)</li>
            </ul>
          </div>
        </div>

        <QuoteForm
          prefilledProduct={prefilledProduct}
          prefilledContainer={params.container}
          prefilledQuantity={params.quantity ? Number(params.quantity) : undefined}
          prefilledType={inquiryType as 'quote_request' | 'specs_request'}
          prefilledTier={params.tier}
          allProducts={allProducts.map((p) => ({ slug: p.slug, name: p.name }))}
        />
      </Container>
    </section>
  )
}

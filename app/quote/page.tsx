import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { QuoteForm } from '@/components/forms/quote-form'
import { getProductBySlug, getAllProducts } from '@/lib/data/products'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Get a customized quote for bulk cooking oils. Our team responds within 1 business day with pricing, availability, and logistics details.',
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
          <h1 className="text-display-lg text-on-surface">Request a Quote</h1>
          <p className="mt-3 text-body-lg text-on-surface-variant">
            Fill out the form below and our supply team will respond with a detailed quote within 1
            business day.
          </p>
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

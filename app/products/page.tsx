import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { ProductCard } from '@/components/catalog/product-card'
import { ProductFilters } from '@/components/catalog/product-filters'
import { Pagination } from '@/components/catalog/pagination'
import { EmptyState } from '@/components/catalog/empty-state'
import { getProducts } from '@/lib/data/products'

export const metadata: Metadata = {
  title: 'Industrial Supply Catalog',
  description:
    'Browse our full range of premium wholesale cooking oils. Extra virgin olive oil, sunflower, canola, and custom blends for industrial food manufacturing.',
}

interface Props {
  searchParams: Promise<{
    grade?: string
    origin?: string
    packaging?: string
    page?: string
  }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const grade = params.grade?.split(',').filter(Boolean)
  const origin = params.origin?.split(',').filter(Boolean)
  const page = Number(params.page || '1')

  const { products, total } = await getProducts({ grade, origin, page })

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <Suspense fallback={null}>
            <ProductFilters />
          </Suspense>

          {/* Main content */}
          <div>
            <div className="mb-8 flex items-baseline justify-between">
              <div>
                <h1 className="text-display-lg text-on-surface">Industrial Supply Catalog</h1>
                <p className="mt-2 text-body-lg text-on-surface-variant">
                  Premium vegetable and seed oils for industrial food processing and wholesale
                  distribution.
                </p>
              </div>
              <p className="hidden text-body-md text-on-surface-variant md:block">
                Showing {products.length} of {total} Products
              </p>
            </div>

            {products.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Suspense fallback={null}>
                  <Pagination total={total} />
                </Suspense>
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

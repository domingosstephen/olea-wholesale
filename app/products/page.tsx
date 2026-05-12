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
    <section className="py-8 sm:py-12 md:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Sidebar - collapsible on mobile */}
          <Suspense fallback={null}>
            <ProductFilters />
          </Suspense>

          {/* Main content */}
          <div>
            <div className="mb-6 sm:mb-8">
              <h1 className="text-[28px] font-bold leading-tight text-on-surface sm:text-[36px] md:text-display-lg">
                Industrial Supply Catalog
              </h1>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-sm text-on-surface-variant sm:text-body-lg">
                  Premium vegetable and seed oils for industrial food processing.
                </p>
                <p className="hidden text-sm text-on-surface-variant md:block">
                  {products.length} of {total} Products
                </p>
              </div>
            </div>

            {products.length > 0 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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

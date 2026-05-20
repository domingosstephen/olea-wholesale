import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { getAllProducts } from '@/lib/data/products'

export async function ProductHighlights() {
  const products = await getAllProducts()

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
            Our Products
          </p>
          <h2 className="text-[24px] font-semibold leading-tight text-on-surface sm:text-headline-lg">
            Oils for Every Industrial Application
          </h2>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.slug} className="group">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container">
                  <Image
                    src={product.hero_image_url || '/images/products/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Link>

              <div className="mt-4">
                <p className="font-label text-label-sm uppercase tracking-widest text-secondary">
                  {product.category}
                </p>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="mt-1 text-lg font-semibold text-on-surface transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Origin: {product.origin_country}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-3 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-label-md text-on-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

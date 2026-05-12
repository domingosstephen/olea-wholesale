import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'

export function Hero() {
  return (
    <section className="bg-surface-container-lowest py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-display-lg text-on-surface">
              Industrial Excellence in Every Drop
            </h1>
            <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
              Premium-grade culinary oils supplied at scale. Precision-engineered logistics for global
              food manufacturers and high-volume wholesale distributors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
              >
                View Wholesale Catalog
              </Link>
              <Link
                href="/quote"
                className="rounded-lg border border-outline px-6 py-3 text-label-md text-on-surface transition-colors hover:bg-surface-container"
              >
                Request Quote
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/site/hero.jpeg"
              alt="Premium cooking oils and raw ingredients"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

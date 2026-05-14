import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'

const highlights = [
  {
    name: 'Sunflower Oil',
    description:
      'High-oleic and crude grades sourced from Ukraine. Superior oxidative stability for industrial frying and food processing.',
    image: '/images/products/sunflower-oil.png',
    slug: 'refined-sunflower-oil-high-oleic',
    origin: 'Ukraine',
  },
  {
    name: 'Soybean Oil',
    description:
      'Fully refined, neutral-flavor soybean oil from Brazil. Ideal for commercial frying, margarine, and processed food manufacturing.',
    image: '/images/products/soybean-oil.png',
    slug: 'refined-soybean-oil',
    origin: 'Brazil',
  },
  {
    name: 'Palm Oil',
    description:
      'RBD and crude grades from RSPO-certified plantations. A staple for confectionery, bakery, and oleochemical production.',
    image: '/images/products/palm-oil.jpg',
    slug: 'refined-palm-oil',
    origin: 'Malaysia & Indonesia',
  },
  {
    name: 'Rapeseed Oil',
    description:
      'European-grade refined rapeseed oil with a low saturated fat profile. Preferred for frying, dressings, and margarine across the EU.',
    image: '/images/products/rapeseed-oil.webp',
    slug: 'refined-rapeseed-oil',
    origin: 'Germany',
  },
]

export function ProductHighlights() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="animate-fade-in-up mb-10 text-center md:mb-14">
          <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
            Our Products
          </p>
          <h2 className="text-[24px] font-semibold leading-tight text-on-surface sm:text-headline-lg">
            Oils for Every Industrial Application
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-body-lg">
            From seed oils to palm and recycled cooking oil, we supply the full spectrum of bulk
            vegetable oils — sourced globally, delivered reliably.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {highlights.map((product, i) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className={`animate-fade-in-up hover-lift group flex gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 transition-colors hover:border-primary/30 sm:p-5 delay-${(i + 1) * 100}`}
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-on-surface sm:text-lg">
                    {product.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-on-surface-variant opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
                <p className="text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                  {product.description}
                </p>
                <span className="mt-1.5 font-label text-[10px] uppercase tracking-widest text-secondary sm:text-label-sm">
                  Origin: {product.origin}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:mt-10">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:text-body-md"
          >
            View Full Catalog
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

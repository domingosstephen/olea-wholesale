import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'

export function Hero() {
  return (
    <section className="overflow-hidden bg-surface-container-lowest py-12 md:py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-secondary-container px-3 py-1 font-label text-label-sm text-on-secondary-container">
              Trusted by 450+ Industrial Partners
            </span>
            <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-on-surface sm:text-[40px] md:text-display-lg">
              Industrial Excellence in Every Drop
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-on-surface-variant sm:mt-6 sm:text-body-lg">
              Premium-grade culinary oils supplied at scale. Precision-engineered logistics for global
              food manufacturers and high-volume wholesale distributors.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-label-md text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                View Wholesale Catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-lg border border-outline px-6 py-3.5 text-label-md text-on-surface transition-all duration-200 hover:border-primary hover:bg-surface-container"
              >
                Request Quote
              </Link>
            </div>
          </div>

          <div className="animate-fade-in-up delay-200 relative aspect-[4/3] overflow-hidden rounded-2xl shadow-atmospheric lg:aspect-[3/4]">
            <Image
              src="/images/site/logistics.jpg"
              alt="Industrial oil bottling production line"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  )
}

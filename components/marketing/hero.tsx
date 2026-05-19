import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden md:min-h-[80vh]">
      <Image
        src="/images/site/hero-bg.jpg"
        alt="Premium culinary oils and raw ingredients"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex min-h-[70vh] items-center justify-center md:min-h-[80vh]">
        <div className="animate-fade-in-up mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 font-label text-label-sm text-white backdrop-blur-sm">
            Trusted by 450+ Industrial Partners
          </span>
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-white sm:text-[40px] md:text-display-lg">
            Industrial Excellence in Every Drop
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:mt-6 sm:text-body-lg">
            Premium-grade culinary oils supplied at scale. Precision-engineered logistics for global
            food manufacturers and high-volume wholesale distributors.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-label-md text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              View Wholesale Catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 text-label-md text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

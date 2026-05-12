import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { Container } from '@/components/layout/container'

export function CTABanner() {
  return (
    <section className="px-margin-mobile py-16 md:px-margin-desktop md:py-24">
      <Container className="px-0 md:px-0">
        <div className="animate-fade-in-up relative overflow-hidden rounded-2xl bg-primary-container px-6 py-12 text-center sm:px-10 md:px-16 md:py-20">
          {/* Decorative gradient circles */}
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />

          <div className="relative">
            <h2 className="text-[24px] font-bold leading-tight text-on-primary sm:text-[32px] md:text-display-lg">
              Ready to Scale Your Supply?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-on-primary-container sm:mt-4 sm:text-body-lg">
              Join over 450 industrial manufacturers and restaurant chains who trust Olea for their
              core supply needs. Partnership starts with a single consultation.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3.5 text-label-md text-on-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                Become a Partner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/catalog.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-on-primary-container/30 px-6 py-3.5 text-label-md text-on-primary transition-all duration-200 hover:border-on-primary-container/60 hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                Download Catalog
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

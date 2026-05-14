import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Container } from '@/components/layout/container'

export function ClosingCTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="animate-fade-in-up rounded-2xl bg-surface-container-low px-6 py-12 text-center sm:px-10 md:px-16 md:py-16">
          <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
            Get Started
          </p>
          <h2 className="text-[24px] font-bold leading-tight text-on-surface sm:text-[32px] md:text-headline-lg">
            Let&apos;s Talk About Your Supply Needs
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-on-surface-variant sm:mt-4 sm:text-body-lg">
            Whether you need a single flexitank or a recurring annual contract, our team will put
            together a custom quote within 24 hours. No commitments, no minimum order to get started.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href="/quote"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-label-md text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline px-6 py-3.5 text-label-md text-on-surface transition-all duration-200 hover:border-primary hover:bg-surface-container"
            >
              <Phone className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

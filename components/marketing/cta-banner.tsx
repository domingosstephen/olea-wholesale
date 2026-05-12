import Link from 'next/link'
import { Container } from '@/components/layout/container'

export function CTABanner() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="rounded-2xl bg-primary-container px-8 py-16 text-center md:px-16">
          <h2 className="text-headline-lg text-on-primary md:text-display-lg">
            Ready to Scale Your Supply?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-on-primary-container">
            Join over 450 industrial manufacturers and restaurant chains who trust Olea for their
            core supply needs. Partnership starts with a single consultation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="rounded-lg bg-secondary px-6 py-3 text-label-md text-on-secondary transition-opacity hover:opacity-90"
            >
              Become a Partner
            </Link>
            <Link
              href="/catalog.pdf"
              className="rounded-lg border border-on-primary-container px-6 py-3 text-label-md text-on-primary transition-colors hover:bg-primary-container/80"
            >
              Download Catalog (.PDF)
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

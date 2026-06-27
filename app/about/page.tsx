import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Globe, Users, Award, TrendingUp, Truck } from 'lucide-react'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'About Olea Wholesale — Certified Bulk Cooking Oil Supplier',
  description:
    'Olea Wholesale is a certified B2B supplier of premium bulk cooking oils, serving industrial food manufacturers and restaurant chains across 40+ countries. ISO 22000, RSPO certified.',
  alternates: { canonical: 'https://www.megatitulocomercio.com/about' },
}

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality First',
    description: 'Every batch is ISO 22000 certified and independently lab-tested before shipment.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Sourcing from 12+ origin countries with logistics coverage across 40+ markets.',
  },
  {
    icon: Users,
    title: 'Partnership-Driven',
    description: 'We build long-term supply relationships, not one-time transactions.',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    description: 'Real-time commodity insights help our clients make informed procurement decisions.',
  },
]

const stats = [
  { value: '450+', label: 'Active B2B Partners' },
  { value: '40+', label: 'Countries Served' },
  { value: '99.8%', label: 'On-Time Fulfillment' },
  { value: '12+', label: 'Source Origins' },
]

const leadership = [
  { name: 'Stephano Leonessi', role: 'Founder & Managing Director', description: '15+ years in international commodities trading and supply chain management.' },
  { name: 'Maria Santos', role: 'Head of Supply Chain', description: 'Former logistics director at a Fortune 500 food manufacturer.' },
  { name: 'Ahmed Al-Rashid', role: 'Head of Quality Assurance', description: 'PhD in Food Science, former ISO auditor with 10+ years in edible oils QA.' },
]

const certifications = [
  { name: 'ISO 22000', description: 'Food Safety Management' },
  { name: 'EU Organic', description: 'Organic Certification' },
  { name: 'RSPO', description: 'Sustainable Palm Oil' },
  { name: 'Non-GMO Verified', description: 'Project Verified' },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.megatitulocomercio.com' },
    { '@type': 'ListItem', position: 2, name: 'About Olea Wholesale', item: 'https://www.megatitulocomercio.com/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
                About Olea Wholesale
              </p>
              <h1 className="mb-6 text-display-lg text-on-surface">
                Industrial Excellence in Every Supply Chain
              </h1>
              <p className="mb-4 text-body-lg text-on-surface-variant">
                Olea Wholesale Corp. is a certified B2B supplier of premium bulk cooking oils,
                serving industrial food manufacturers, restaurant chains, and high-volume
                distributors across 40+ countries.
              </p>
              <p className="text-body-lg text-on-surface-variant">
                Founded with a mission to bring transparency, reliability, and quality assurance to
                the global edible oils supply chain, we bridge the gap between origin producers and
                industrial buyers through precision logistics and rigorous quality control.
              </p>
              <p className="mt-4 text-label-sm text-on-surface-variant">Last updated: June 2026</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/site/warehouse.jpeg"
                alt="Olea Wholesale processing facility"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-headline-lg text-on-surface">Our Values</h2>
            <p className="mt-2 text-body-lg text-on-surface-variant">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
                <v.icon className="mb-4 h-8 w-8 text-secondary" strokeWidth={1.5} />
                <h3 className="mb-2 text-headline-md text-on-surface">{v.title}</h3>
                <p className="text-body-md text-on-surface-variant">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-display-lg text-on-surface">{s.value}</p>
                <p className="mt-2 font-label text-label-md uppercase tracking-wider text-on-surface-variant">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section id="certifications" className="bg-surface-container-low py-16 md:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-headline-lg text-on-surface">Certifications & Standards</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center rounded-xl border border-outline-variant bg-surface-container-lowest p-6 text-center">
                <Award className="mb-3 h-8 w-8 text-outline" strokeWidth={1.5} />
                <h3 className="mb-1 font-label text-label-md text-on-surface">{cert.name}</h3>
                <p className="text-label-sm text-on-surface-variant">{cert.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-headline-lg text-on-surface">Leadership Team</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {leadership.map((person) => (
              <div key={person.name} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container">
                  <Users className="h-8 w-8 text-outline" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-headline-md text-on-surface">{person.name}</h3>
                <p className="mb-3 font-label text-label-md text-secondary">{person.role}</p>
                <p className="text-body-md text-on-surface-variant">{person.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <Container>
          <div className="rounded-2xl bg-primary-container px-8 py-16 text-center md:px-16">
            <Truck className="mx-auto mb-4 h-12 w-12 text-on-primary-container" strokeWidth={1.5} />
            <h2 className="text-headline-lg text-on-primary md:text-display-lg">
              Ready to Partner with Olea?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-on-primary-container">
              Whether you need a single IBC or a recurring flexitank supply, our team is ready to
              build a solution tailored to your operation.
            </p>
            <Link
              href="/quote"
              className="mt-8 inline-block rounded-lg bg-secondary px-6 py-3 text-label-md text-on-secondary transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

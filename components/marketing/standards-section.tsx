import { ShieldCheck, FlaskConical, Sprout } from 'lucide-react'
import { Container } from '@/components/layout/container'

const standards = [
  {
    icon: ShieldCheck,
    title: 'ISO 22000 Certified',
    description:
      'Stringent food safety management systems ensuring every liter meets international safety benchmarks.',
  },
  {
    icon: FlaskConical,
    title: 'Laboratory Tested',
    description:
      'Batch-tested for acidity levels, oxidation, and nutritional purity before every shipment leaves our facility.',
  },
  {
    icon: Sprout,
    title: 'Organic Integrity',
    description:
      'Sustainably sourced from certified growers, maintaining a fully traceable supply chain from grove to warehouse.',
  },
]

export function StandardsSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
            Quality Assurance
          </p>
          <h2 className="text-headline-lg text-on-surface">Our Purity Standards</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {standards.map((standard) => (
            <div
              key={standard.title}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest p-stack-lg"
            >
              <standard.icon className="mb-4 h-8 w-8 text-on-surface-variant" strokeWidth={1.5} />
              <h3 className="mb-2 text-headline-md text-on-surface">{standard.title}</h3>
              <p className="text-body-md text-on-surface-variant">{standard.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

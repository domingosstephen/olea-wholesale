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
    <section className="py-16 md:py-24">
      <Container>
        <div className="animate-fade-in-up mb-10 text-center md:mb-14">
          <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
            Quality Assurance
          </p>
          <h2 className="text-[24px] font-semibold leading-tight text-on-surface sm:text-headline-lg">
            Our Purity Standards
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {standards.map((standard, i) => (
            <div
              key={standard.title}
              className={`animate-fade-in-up hover-lift rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8 delay-${(i + 1) * 100}`}
            >
              <div className="mb-4 inline-flex rounded-xl bg-surface-container p-3">
                <standard.icon className="h-6 w-6 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-on-surface sm:text-headline-md">{standard.title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant sm:text-body-md">{standard.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { Container } from '@/components/layout/container'

const features = [
  'Real-time Shipment Tracking',
  'Multi-modal Transport Solutions',
  'Climate-Controlled Storage',
]

export function LogisticsSection() {
  return (
    <section className="bg-surface-container-low py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Images grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src="/images/site/warehouse.jpeg"
                alt="Industrial oil processing facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/images/site/logistics.jpg"
                  alt="Oil bottling production line"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-col items-start justify-center rounded-xl bg-primary-container p-6">
                <span className="text-display-lg text-on-primary">99.8%</span>
                <span className="font-label text-label-md uppercase tracking-widest text-on-primary-container">
                  On-Time Fulfillment Rate
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
              Supply Chain
            </p>
            <h2 className="mb-6 text-headline-lg text-on-surface">Bulk Logistics Redefined</h2>
            <p className="mb-8 text-body-lg text-on-surface-variant">
              From ISO-tanks to multi-ton palletized drums, our distribution network is optimized for
              zero-delay fulfillment. We manage the complexity of global trade so you can focus on
              production.
            </p>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-secondary" strokeWidth={1.5} />
                  <span className="text-body-md text-on-surface">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

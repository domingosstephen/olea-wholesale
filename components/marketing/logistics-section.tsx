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
    <section className="bg-surface-container-low py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
          {/* Images grid */}
          <div className="animate-slide-in-left grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/site/warehouse.jpeg"
                alt="Industrial oil processing facility"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/site/hero.jpeg"
                  alt="Premium cooking oil production"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-col items-start justify-center rounded-2xl bg-primary-container p-4 sm:p-6">
                <span className="text-[28px] font-bold leading-tight text-on-primary sm:text-[40px] md:text-display-lg">
                  99.8%
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-primary-container sm:text-label-sm">
                  On-Time Fulfillment
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-in-right">
            <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
              Supply Chain
            </p>
            <h2 className="mb-4 text-[24px] font-semibold leading-tight text-on-surface sm:mb-6 sm:text-headline-lg">
              Bulk Logistics Redefined
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant sm:mb-8 sm:text-body-lg">
              From ISO-tanks to multi-ton palletized drums, our distribution network is optimized for
              zero-delay fulfillment. We manage the complexity of global trade so you can focus on
              production.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {features.map((feature, i) => (
                <li key={feature} className={`animate-fade-in-up flex items-center gap-3 delay-${(i + 1) * 100}`}>
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
                    <CheckCircle className="h-4 w-4 text-secondary" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-on-surface sm:text-body-md">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

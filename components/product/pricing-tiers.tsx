import Link from 'next/link'
import type { Product, ProductPricingTier } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface PricingTiersProps {
  product: Product
  tiers: ProductPricingTier[]
}

export function PricingTiers({ product, tiers }: PricingTiersProps) {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-headline-lg text-on-surface">Tiered Wholesale Pricing</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier, index) => {
          const isGlobal = tier.is_inquiry_only
          const isPopular = tier.tier_name === 'Business'

          return (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-xl border p-6 ${
                isGlobal
                  ? 'border-primary-container bg-primary-container text-on-primary'
                  : isPopular
                    ? 'border-secondary bg-surface-container-lowest'
                    : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              {isPopular && (
                <span className="absolute -top-2.5 right-4 rounded-lg bg-secondary px-2 py-0.5 font-label text-label-sm text-on-secondary">
                  Popular
                </span>
              )}

              <h3
                className={`mb-1 font-label text-label-md uppercase tracking-wider ${
                  isGlobal ? 'text-on-primary-container' : 'text-on-surface-variant'
                }`}
              >
                {tier.tier_name}
              </h3>

              <p
                className={`mb-3 text-label-sm ${
                  isGlobal ? 'text-on-primary-container' : 'text-on-surface-variant'
                }`}
              >
                {tier.min_liters.toLocaleString()}L
                {tier.max_liters ? ` - ${tier.max_liters.toLocaleString()}L` : '+'}
              </p>

              {isGlobal ? (
                <p className="mb-4 mt-auto text-headline-lg text-on-primary">Inquiry</p>
              ) : (
                <p className="mb-4 text-headline-lg text-on-surface">
                  {formatCurrency(tier.unit_price_cents!, product.base_currency)}
                  <span className="text-body-md font-normal text-on-surface-variant">/L</span>
                </p>
              )}

              {tier.label && (
                <p
                  className={`mb-4 text-label-sm italic ${
                    isGlobal ? 'text-on-primary-container' : 'text-secondary'
                  }`}
                >
                  {tier.label}
                </p>
              )}

              <Link
                href={`/quote?product=${product.slug}&tier=${tier.tier_name.toLowerCase().replace(/\s+/g, '_')}&type=quote_request`}
                className={`mt-auto rounded-lg px-4 py-2.5 text-center text-label-md transition-opacity hover:opacity-90 ${
                  isGlobal
                    ? 'border border-on-primary-container text-on-primary'
                    : 'bg-primary text-on-primary'
                }`}
              >
                {isGlobal ? 'Contact Sales' : 'Request Quote'}
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

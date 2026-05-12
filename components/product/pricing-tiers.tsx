import Link from 'next/link'
import type { Product, ProductPricingTier } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface PricingTiersProps {
  product: Product
  tiers: ProductPricingTier[]
}

export function PricingTiers({ product, tiers }: PricingTiersProps) {
  return (
    <section className="py-8 sm:py-12">
      <h2 className="mb-6 text-xl font-semibold text-on-surface sm:mb-8 sm:text-headline-lg">Tiered Wholesale Pricing</h2>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {tiers.map((tier) => {
          const isGlobal = tier.is_inquiry_only
          const isPopular = tier.tier_name === 'Business'

          return (
            <div
              key={tier.id}
              className={`hover-lift relative flex flex-col rounded-2xl border p-5 sm:p-6 ${
                isGlobal
                  ? 'border-primary-container bg-primary-container text-on-primary'
                  : isPopular
                    ? 'border-secondary bg-surface-container-lowest shadow-sm'
                    : 'border-outline-variant bg-surface-container-lowest'
              }`}
            >
              {isPopular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-secondary">
                  Popular
                </span>
              )}

              <h3
                className={`mb-1 text-[11px] font-semibold uppercase tracking-widest ${
                  isGlobal ? 'text-on-primary-container' : 'text-on-surface-variant'
                }`}
              >
                {tier.tier_name}
              </h3>

              <p
                className={`mb-3 text-xs ${
                  isGlobal ? 'text-on-primary-container' : 'text-on-surface-variant'
                }`}
              >
                {tier.min_liters.toLocaleString()}L
                {tier.max_liters ? ` - ${tier.max_liters.toLocaleString()}L` : '+'}
              </p>

              {isGlobal ? (
                <p className="mb-3 mt-auto text-xl font-bold text-on-primary sm:text-2xl">Custom</p>
              ) : (
                <p className="mb-3 text-xl font-bold text-on-surface sm:text-2xl">
                  {formatCurrency(tier.unit_price_cents!, product.base_currency)}
                  <span className="text-sm font-normal text-on-surface-variant">/L</span>
                </p>
              )}

              {tier.label && (
                <p
                  className={`mb-4 text-xs italic ${
                    isGlobal ? 'text-on-primary-container' : 'text-secondary'
                  }`}
                >
                  {tier.label}
                </p>
              )}

              <Link
                href={`/quote?product=${product.slug}&tier=${tier.tier_name.toLowerCase().replace(/\s+/g, '_')}&type=quote_request`}
                className={`mt-auto rounded-lg px-4 py-2.5 text-center text-[13px] font-semibold transition-all duration-200 active:scale-[0.98] ${
                  isGlobal
                    ? 'border border-on-primary-container/30 text-on-primary hover:bg-white/5'
                    : 'bg-primary text-on-primary hover:-translate-y-0.5 hover:shadow-md'
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

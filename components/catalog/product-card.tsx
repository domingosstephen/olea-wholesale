import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

const statusConfig = {
  active: { label: 'In Stock', className: 'bg-green-50 text-green-700 ring-1 ring-green-200' },
  low_stock: { label: 'Low Stock', className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
  backorder: { label: 'On Backorder', className: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
  archived: { label: 'Archived', className: 'bg-gray-50 text-gray-600 ring-1 ring-gray-200' },
}

export function ProductCard({ product }: { product: Product }) {
  const status = statusConfig[product.status]
  const origin = [product.origin_region, product.origin_country].filter(Boolean).join(', ')
  const subtitle = [origin, product.grade].filter(Boolean).join(' \u00B7 ')

  return (
    <div className="hover-lift group flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
          {product.hero_image_url && (
            <Image
              src={product.hero_image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {/* Status badge overlay */}
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.className}`}>
            {status.label}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-1 font-label text-[11px] tracking-wider text-on-surface-variant">
          SKU: {product.sku}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 text-lg font-semibold leading-tight text-on-surface transition-colors group-hover:text-secondary sm:text-xl">
            {product.name}
          </h3>
        </Link>

        {subtitle && (
          <p className="mb-3 text-sm text-on-surface-variant">
            {subtitle}
          </p>
        )}

        <div className="mb-4 mt-auto border-t border-outline-variant/50 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-on-surface-variant">
              From
            </span>
            <span className="text-lg font-bold text-on-surface">
              {formatCurrency(product.base_unit_price_cents, product.base_currency)}
              <span className="ml-1 text-xs font-normal text-on-surface-variant">/ {product.base_unit}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/quote?product=${product.slug}&type=quote_request`}
            className="flex-1 rounded-lg bg-secondary px-3 py-2.5 text-center text-[13px] font-semibold text-on-secondary transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            {product.status === 'backorder' ? 'Request Availability' : 'Request Quote'}
          </Link>
          <Link
            href={`/quote?product=${product.slug}&type=specs_request`}
            className="flex-1 rounded-lg border border-outline px-3 py-2.5 text-center text-[13px] font-semibold text-on-surface transition-all duration-200 hover:border-primary hover:bg-surface-container active:scale-[0.98]"
          >
            Request Specs
          </Link>
        </div>
      </div>
    </div>
  )
}

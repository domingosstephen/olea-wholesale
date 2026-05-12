import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

const statusConfig = {
  active: { label: 'In Stock', className: 'bg-green-100 text-green-800' },
  low_stock: { label: 'Low Stock', className: 'bg-amber-100 text-amber-800' },
  backorder: { label: 'On Backorder', className: 'bg-red-100 text-red-800' },
  archived: { label: 'Archived', className: 'bg-gray-100 text-gray-800' },
}

export function ProductCard({ product }: { product: Product }) {
  const status = statusConfig[product.status]
  const origin = [product.origin_region, product.origin_country].filter(Boolean).join(', ')
  const subtitle = [origin, product.grade].filter(Boolean).join(' \u00B7 ')

  return (
    <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-0 transition-shadow hover:shadow-atmospheric">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-surface-container-low">
          {product.hero_image_url && (
            <Image
              src={product.hero_image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className={`inline-block rounded-lg px-2 py-0.5 font-label text-label-sm ${status.className}`}>
            {status.label}
          </span>
          <span className="font-label text-label-sm text-on-surface-variant">SKU: {product.sku}</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 text-headline-md text-on-surface hover:text-secondary">
            {product.name}
          </h3>
        </Link>

        {subtitle && (
          <p className="mb-3 text-body-md text-on-surface-variant">
            Origin: {subtitle}
          </p>
        )}

        <div className="mb-4 mt-auto space-y-1 border-t border-outline-variant pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-label-sm font-label text-on-surface-variant">
              Base price
            </span>
            <span className="text-body-md font-semibold text-on-surface">
              {formatCurrency(product.base_unit_price_cents, product.base_currency)}{' '}
              <span className="text-label-sm font-normal text-on-surface-variant">/ {product.base_unit}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/quote?product=${product.slug}&type=quote_request`}
            className="flex-1 rounded-lg bg-secondary px-4 py-2.5 text-center text-label-md text-on-secondary transition-opacity hover:opacity-90"
          >
            {product.status === 'backorder' ? 'Request Availability' : 'Request Quote'}
          </Link>
          <Link
            href={`/quote?product=${product.slug}&type=specs_request`}
            className="flex-1 rounded-lg border border-outline px-4 py-2.5 text-center text-label-md text-on-surface transition-colors hover:bg-surface-container"
          >
            Request Specs
          </Link>
        </div>
      </div>
    </div>
  )
}

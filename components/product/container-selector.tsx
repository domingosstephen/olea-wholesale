'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product, ProductContainer } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ContainerSelectorProps {
  product: Product
  containers: ProductContainer[]
}

export function ContainerSelector({ product, containers }: ContainerSelectorProps) {
  const defaultContainer = containers.find((c) => c.is_default) || containers[0]
  const [selectedContainer, setSelectedContainer] = useState<ProductContainer>(defaultContainer)
  const [quantity, setQuantity] = useState(1)

  const totalLiters = selectedContainer.volume_liters * quantity

  function getTierLabel(liters: number): string {
    if (liters >= 100000) return 'Global B2B'
    if (liters >= 20000) return 'Enterprise'
    if (liters >= 5000) return 'Business'
    return 'Standard'
  }

  const quoteUrl = `/quote?product=${product.slug}&container=${selectedContainer.container_type}&quantity=${quantity}&type=quote_request`

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
      <h3 className="mb-4 font-label text-label-md uppercase tracking-wider text-on-surface">
        Quote Configuration
      </h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Container Type
          </label>
          <select
            value={selectedContainer.id}
            onChange={(e) => {
              const c = containers.find((c) => c.id === e.target.value)
              if (c) setSelectedContainer(c)
            }}
            className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {containers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.display_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Quantity (Units)
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="rounded-lg bg-surface-container-low px-4 py-3">
          <p className="text-body-md text-on-surface">
            Total: <strong>{totalLiters.toLocaleString()} liters</strong>
            <span className="ml-2 text-label-sm text-secondary">
              — qualifies for {getTierLabel(totalLiters)} tier pricing
            </span>
          </p>
        </div>

        <Link
          href={quoteUrl}
          className="block w-full rounded-lg bg-secondary px-6 py-3 text-center text-label-md text-on-secondary transition-opacity hover:opacity-90"
        >
          Request Quote
        </Link>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-outline-variant px-4 py-3">
        <span className="mt-0.5 text-outline">ℹ</span>
        <p className="text-label-sm text-on-surface-variant">
          Bulk pricing is dynamic based on global commodities market. Final invoice will reflect the
          spot price at time of order confirmation.
        </p>
      </div>
    </div>
  )
}

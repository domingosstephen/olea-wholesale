import Link from 'next/link'
import { PackageSearch } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <PackageSearch className="mb-4 h-12 w-12 text-outline" strokeWidth={1.5} />
      <h3 className="mb-2 text-headline-md text-on-surface">No products match your filters</h3>
      <p className="mb-6 text-body-md text-on-surface-variant">
        Try adjusting your filter criteria or browse our full catalog.
      </p>
      <Link
        href="/products"
        className="rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
      >
        Clear Filters
      </Link>
    </div>
  )
}

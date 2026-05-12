'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export function Pagination({ total, perPage = 12 }: { total: number; perPage?: number }) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')
  const totalPages = Math.ceil(total / perPage)

  if (totalPages <= 1) return null

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    return `/products?${params.toString()}`
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border text-label-md transition-colors ${
            page === currentPage
              ? 'border-primary bg-primary text-on-primary'
              : 'border-outline text-on-surface hover:bg-surface-container'
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline text-on-surface transition-colors hover:bg-surface-container"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  )
}
